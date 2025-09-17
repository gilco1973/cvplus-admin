/**
 * CVPlus Admin Authentication Middleware
 *
 * Authentication and authorization middleware specifically for admin operations.
 * Extracted from the main authGuard to provide modular admin authentication.
 *
 * @author Gil Klainert
 * @version 1.0.0
  */
import { HttpsError } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions';
import * as admin from 'firebase-admin';
// ============================================================================
// ADMIN TYPES AND ENUMS
// ============================================================================
export var AdminRole;
(function (AdminRole) {
    AdminRole["SUPPORT"] = "support";
    AdminRole["MODERATOR"] = "moderator";
    AdminRole["ADMIN"] = "admin";
    AdminRole["SUPER_ADMIN"] = "super_admin";
    AdminRole["SYSTEM_ADMIN"] = "system_admin";
})(AdminRole || (AdminRole = {}));
export var AdminLevel;
(function (AdminLevel) {
    AdminLevel[AdminLevel["L1_SUPPORT"] = 1] = "L1_SUPPORT";
    AdminLevel[AdminLevel["L2_MODERATOR"] = 2] = "L2_MODERATOR";
    AdminLevel[AdminLevel["L3_ADMIN"] = 3] = "L3_ADMIN";
    AdminLevel[AdminLevel["L4_SUPER_ADMIN"] = 4] = "L4_SUPER_ADMIN";
    AdminLevel[AdminLevel["L5_SYSTEM_ADMIN"] = 5] = "L5_SYSTEM_ADMIN";
})(AdminLevel || (AdminLevel = {}));
// ============================================================================
// CORE AUTHENTICATION FUNCTIONS
// ============================================================================
/**
 * Basic authentication requirement
  */
export const requireAuth = async (request) => {
    if (!request.auth) {
        logger.error('Authentication failed: No auth context', {
            hasRawRequest: !!request.rawRequest,
            origin: request.rawRequest?.headers?.origin,
            userAgent: request.rawRequest?.headers?.['user-agent']
        });
        throw new HttpsError('unauthenticated', 'User must be authenticated');
    }
    const { uid, token } = request.auth;
    if (!uid || !token) {
        logger.error('Authentication failed: Invalid token', {
            uid: !!uid,
            token: !!token,
            hasEmail: !!token?.email
        });
        throw new HttpsError('unauthenticated', 'Invalid authentication token');
    }
    try {
        const currentTime = Math.floor(Date.now() / 1000);
        if (token.exp <= currentTime) {
            logger.error('Authentication failed: Token expired', {
                uid,
                exp: token.exp,
                currentTime,
                expired: currentTime - token.exp
            });
            throw new HttpsError('unauthenticated', 'Authentication token has expired');
        }
        const isProduction = process.env.NODE_ENV === 'production' || process.env.FUNCTIONS_EMULATOR !== 'true';
        if (!token.email_verified && token.email && isProduction) {
            logger.error('Authentication failed: Email verification required in production', {
                uid,
                email: token.email,
                emailVerified: token.email_verified,
                environment: process.env.NODE_ENV,
                isProduction
            });
            throw new HttpsError('permission-denied', 'Email verification is required. Please verify your email address before accessing this service.');
        }
        logger.info('Authentication successful', {
            uid,
            email: token.email,
            emailVerified: token.email_verified,
            provider: token.firebase?.sign_in_provider
        });
        return {
            ...request,
            auth: { uid, token }
        };
    }
    catch (error) {
        if (error instanceof HttpsError) {
            throw error;
        }
        logger.error('Authentication validation failed', {
            error: error instanceof Error ? error.message : error,
            uid,
            errorStack: error instanceof Error ? error.stack : undefined
        });
        throw new HttpsError('unauthenticated', 'Authentication validation failed');
    }
};
/**
 * Check if user has administrative privileges (legacy fallback)
  */
export const isAdmin = (request) => {
    const adminEmailsEnv = process.env.ADMIN_EMAILS || 'gil.klainert@gmail.com,admin@cvplus.ai';
    const adminEmails = adminEmailsEnv.split(',').map(email => email.trim());
    return adminEmails.includes(request.auth.token.email || '');
};
/**
 * Enhanced admin authentication with Firebase Custom Claims
  */
export const requireAdmin = async (request, minLevel = AdminLevel.L1_SUPPORT) => {
    const authenticatedRequest = await requireAuth(request);
    const { uid, token } = authenticatedRequest.auth;
    try {
        const customClaims = token.admin || null;
        if (!customClaims) {
            const isLegacyAdmin = isAdmin(authenticatedRequest);
            if (isLegacyAdmin) {
                logger.warn('Using legacy admin email check - custom claims needed', {
                    uid,
                    email: token.email
                });
                return {
                    ...authenticatedRequest,
                    admin: {
                        role: AdminRole.SUPER_ADMIN,
                        level: AdminLevel.L4_SUPER_ADMIN,
                        permissions: getDefaultAdminPermissions(AdminLevel.L4_SUPER_ADMIN),
                        profile: null
                    }
                };
            }
            logger.error('Admin access denied: No admin privileges', {
                uid,
                email: token.email,
                hasCustomClaims: !!customClaims
            });
            throw new HttpsError('permission-denied', 'Admin access required');
        }
        const userLevel = customClaims.level || AdminLevel.L1_SUPPORT;
        if (userLevel < minLevel) {
            logger.error('Admin access denied: Insufficient admin level', {
                uid,
                email: token.email,
                userLevel,
                minLevel
            });
            throw new HttpsError('permission-denied', `Admin level ${minLevel} or higher required`);
        }
        const adminProfile = await getAdminProfile(uid);
        logger.info('Admin authentication successful', {
            uid,
            email: token.email,
            role: customClaims.role,
            level: userLevel
        });
        return {
            ...authenticatedRequest,
            admin: {
                role: customClaims.role,
                level: userLevel,
                permissions: customClaims.permissions || getDefaultAdminPermissions(userLevel),
                profile: adminProfile
            }
        };
    }
    catch (error) {
        if (error instanceof HttpsError) {
            throw error;
        }
        logger.error('Admin authentication failed', {
            error: error instanceof Error ? error.message : error,
            uid,
            errorStack: error instanceof Error ? error.stack : undefined
        });
        throw new HttpsError('internal', 'Admin authentication validation failed');
    }
};
/**
 * Check specific admin permission
  */
export const requireAdminPermission = async (request, permission) => {
    const adminRequest = await requireAdmin(request, AdminLevel.L1_SUPPORT);
    if (!adminRequest.admin.permissions[permission]) {
        logger.error('Admin permission denied', {
            uid: adminRequest.auth.uid,
            permission,
            role: adminRequest.admin.role,
            level: adminRequest.admin.level
        });
        throw new HttpsError('permission-denied', `Admin permission '${permission}' required`);
    }
    return adminRequest;
};
// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
/**
 * Get admin profile from Firestore
  */
const getAdminProfile = async (uid) => {
    try {
        const adminDoc = await admin.firestore()
            .collection('adminProfiles')
            .doc(uid)
            .get();
        if (!adminDoc.exists) {
            logger.warn('Admin profile not found in Firestore', { uid });
            return null;
        }
        return adminDoc.data();
    }
    catch (error) {
        logger.error('Failed to fetch admin profile', {
            error: error instanceof Error ? error.message : error,
            uid
        });
        return null;
    }
};
/**
 * Get default permissions based on admin level
  */
const getDefaultAdminPermissions = (level) => {
    const basePermissions = {
        canAccessDashboard: true,
        canManageUsers: false,
        canModerateContent: false,
        canMonitorSystem: false,
        canViewAnalytics: false,
        canAuditSecurity: false,
        canManageSupport: false,
        canManageBilling: false,
        canConfigureSystem: false,
        canManageAdmins: false,
        canExportData: false,
        canManageFeatureFlags: false,
        userManagement: {
            canViewUsers: false,
            canEditUsers: false,
            canSuspendUsers: false,
            canDeleteUsers: false,
            canImpersonateUsers: false,
            canManageSubscriptions: false,
            canProcessRefunds: false,
            canMergeAccounts: false,
            canExportUserData: false,
            canViewUserAnalytics: false
        },
        contentModeration: {
            canReviewContent: false,
            canApproveContent: false,
            canRejectContent: false,
            canFlagContent: false,
            canHandleAppeals: false,
            canConfigureFilters: false,
            canViewModerationQueue: false,
            canAssignModerators: false,
            canExportModerationData: false
        },
        systemAdministration: {
            canViewSystemHealth: false,
            canManageServices: false,
            canConfigureFeatures: false,
            canViewLogs: false,
            canManageIntegrations: false,
            canDeployUpdates: false,
            canManageBackups: false,
            canConfigureSecurity: false
        },
        billing: {
            canViewBilling: false,
            canProcessPayments: false,
            canProcessRefunds: false,
            canManageSubscriptions: false,
            canViewFinancialReports: false,
            canConfigurePricing: false,
            canManageDisputes: false,
            canExportBillingData: false
        },
        analytics: {
            canViewBasicAnalytics: false,
            canViewAdvancedAnalytics: false,
            canExportAnalytics: false,
            canConfigureAnalytics: false,
            canViewCustomReports: false,
            canCreateCustomReports: false,
            canScheduleReports: false,
            canViewRealTimeData: false
        },
        security: {
            canViewSecurityEvents: false,
            canManageSecurityPolicies: false,
            canViewAuditLogs: false,
            canExportAuditData: false,
            canManageAccessControl: false,
            canConfigureCompliance: false,
            canInvestigateIncidents: false,
            canManageSecurityAlerts: false
        }
    };
    switch (level) {
        case AdminLevel.L5_SYSTEM_ADMIN:
            return {
                ...basePermissions,
                canManageUsers: true,
                canModerateContent: true,
                canMonitorSystem: true,
                canViewAnalytics: true,
                canAuditSecurity: true,
                canManageSupport: true,
                canManageBilling: true,
                canConfigureSystem: true,
                canManageAdmins: true,
                canExportData: true,
                canManageFeatureFlags: true,
                userManagement: {
                    canViewUsers: true,
                    canEditUsers: true,
                    canSuspendUsers: true,
                    canDeleteUsers: true,
                    canImpersonateUsers: true,
                    canManageSubscriptions: true,
                    canProcessRefunds: true,
                    canMergeAccounts: true,
                    canExportUserData: true,
                    canViewUserAnalytics: true
                },
                contentModeration: {
                    canReviewContent: true,
                    canApproveContent: true,
                    canRejectContent: true,
                    canFlagContent: true,
                    canHandleAppeals: true,
                    canConfigureFilters: true,
                    canViewModerationQueue: true,
                    canAssignModerators: true,
                    canExportModerationData: true
                },
                systemAdministration: {
                    canViewSystemHealth: true,
                    canManageServices: true,
                    canConfigureFeatures: true,
                    canViewLogs: true,
                    canManageIntegrations: true,
                    canDeployUpdates: true,
                    canManageBackups: true,
                    canConfigureSecurity: true
                },
                billing: {
                    canViewBilling: true,
                    canProcessPayments: true,
                    canProcessRefunds: true,
                    canManageSubscriptions: true,
                    canViewFinancialReports: true,
                    canConfigurePricing: true,
                    canManageDisputes: true,
                    canExportBillingData: true
                },
                analytics: {
                    canViewBasicAnalytics: true,
                    canViewAdvancedAnalytics: true,
                    canExportAnalytics: true,
                    canConfigureAnalytics: true,
                    canViewCustomReports: true,
                    canCreateCustomReports: true,
                    canScheduleReports: true,
                    canViewRealTimeData: true
                },
                security: {
                    canViewSecurityEvents: true,
                    canManageSecurityPolicies: true,
                    canViewAuditLogs: true,
                    canExportAuditData: true,
                    canManageAccessControl: true,
                    canConfigureCompliance: true,
                    canInvestigateIncidents: true,
                    canManageSecurityAlerts: true
                }
            };
        case AdminLevel.L4_SUPER_ADMIN:
            return {
                ...basePermissions,
                canManageUsers: true,
                canModerateContent: true,
                canMonitorSystem: true,
                canViewAnalytics: true,
                canAuditSecurity: true,
                canManageSupport: true,
                canManageBilling: true,
                canExportData: true,
                userManagement: {
                    ...basePermissions.userManagement,
                    canViewUsers: true,
                    canEditUsers: true,
                    canSuspendUsers: true,
                    canDeleteUsers: true,
                    canManageSubscriptions: true,
                    canProcessRefunds: true,
                    canExportUserData: true,
                    canViewUserAnalytics: true
                },
                contentModeration: {
                    ...basePermissions.contentModeration,
                    canReviewContent: true,
                    canApproveContent: true,
                    canRejectContent: true,
                    canFlagContent: true,
                    canHandleAppeals: true,
                    canViewModerationQueue: true,
                    canAssignModerators: true
                },
                billing: {
                    ...basePermissions.billing,
                    canViewBilling: true,
                    canProcessPayments: true,
                    canProcessRefunds: true,
                    canManageSubscriptions: true,
                    canViewFinancialReports: true,
                    canManageDisputes: true
                },
                analytics: {
                    ...basePermissions.analytics,
                    canViewBasicAnalytics: true,
                    canViewAdvancedAnalytics: true,
                    canExportAnalytics: true,
                    canViewCustomReports: true,
                    canCreateCustomReports: true,
                    canViewRealTimeData: true
                },
                security: {
                    ...basePermissions.security,
                    canViewSecurityEvents: true,
                    canViewAuditLogs: true,
                    canExportAuditData: true,
                    canInvestigateIncidents: true
                }
            };
        case AdminLevel.L3_ADMIN:
            return {
                ...basePermissions,
                canManageUsers: true,
                canModerateContent: true,
                canMonitorSystem: true,
                canViewAnalytics: true,
                canManageSupport: true,
                userManagement: {
                    ...basePermissions.userManagement,
                    canViewUsers: true,
                    canEditUsers: true,
                    canSuspendUsers: true,
                    canManageSubscriptions: true,
                    canViewUserAnalytics: true
                },
                contentModeration: {
                    ...basePermissions.contentModeration,
                    canReviewContent: true,
                    canApproveContent: true,
                    canRejectContent: true,
                    canFlagContent: true,
                    canViewModerationQueue: true
                },
                analytics: {
                    ...basePermissions.analytics,
                    canViewBasicAnalytics: true,
                    canViewAdvancedAnalytics: true,
                    canViewCustomReports: true
                },
                security: {
                    ...basePermissions.security,
                    canViewSecurityEvents: true,
                    canViewAuditLogs: true
                }
            };
        case AdminLevel.L2_MODERATOR:
            return {
                ...basePermissions,
                canModerateContent: true,
                canViewAnalytics: true,
                canManageSupport: true,
                userManagement: { ...basePermissions.userManagement, canViewUsers: true },
                contentModeration: {
                    ...basePermissions.contentModeration,
                    canReviewContent: true,
                    canApproveContent: true,
                    canRejectContent: true,
                    canViewModerationQueue: true
                },
                analytics: { ...basePermissions.analytics, canViewBasicAnalytics: true }
            };
        case AdminLevel.L1_SUPPORT:
        default:
            return {
                ...basePermissions,
                canManageSupport: true,
                userManagement: { ...basePermissions.userManagement, canViewUsers: true }
            };
    }
};
// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
/**
 * Extract user information from authenticated request
  */
export const getUserInfo = (request) => {
    return {
        uid: request.auth.uid,
        email: request.auth.token.email,
        emailVerified: request.auth.token.email_verified,
        provider: request.auth.token.firebase?.sign_in_provider,
        name: request.auth.token.name,
        picture: request.auth.token.picture
    };
};
/**
 * Rate limiting for admin functions
  */
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 20; // 20 requests per minute per admin
export const withAdminRateLimit = (maxRequests = RATE_LIMIT_MAX, windowMs = RATE_LIMIT_WINDOW) => {
    return (handler) => {
        return async (request) => {
            const { uid } = request.auth;
            const now = Date.now();
            const key = `admin_${uid}`;
            // Clean up expired entries
            for (const [k, v] of rateLimitMap.entries()) {
                if (now > v.resetTime) {
                    rateLimitMap.delete(k);
                }
            }
            // Check rate limit
            const userLimit = rateLimitMap.get(key);
            if (userLimit) {
                if (now < userLimit.resetTime) {
                    if (userLimit.count >= maxRequests) {
                        logger.warn('Admin rate limit exceeded', {
                            uid,
                            count: userLimit.count,
                            maxRequests,
                            resetTime: userLimit.resetTime
                        });
                        throw new HttpsError('resource-exhausted', 'Too many admin requests. Please try again later.');
                    }
                    userLimit.count++;
                }
                else {
                    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
                }
            }
            else {
                rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
            }
            return handler(request);
        };
    };
};
//# sourceMappingURL=admin-auth.middleware.js.map
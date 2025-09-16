/**
 * CVPlus Admin Authentication Middleware
 *
 * Authentication and authorization middleware specifically for admin operations.
 * Extracted from the main authGuard to provide modular admin authentication.
 *
 * @author Gil Klainert
 * @version 1.0.0
  */
import { CallableRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
export declare enum AdminRole {
    SUPPORT = "support",
    MODERATOR = "moderator",
    ADMIN = "admin",
    SUPER_ADMIN = "super_admin",
    SYSTEM_ADMIN = "system_admin"
}
export declare enum AdminLevel {
    L1_SUPPORT = 1,
    L2_MODERATOR = 2,
    L3_ADMIN = 3,
    L4_SUPER_ADMIN = 4,
    L5_SYSTEM_ADMIN = 5
}
export interface AdminPermissions {
    canAccessDashboard: boolean;
    canManageUsers: boolean;
    canModerateContent: boolean;
    canMonitorSystem: boolean;
    canViewAnalytics: boolean;
    canAuditSecurity: boolean;
    canManageSupport: boolean;
    canManageBilling: boolean;
    canConfigureSystem: boolean;
    canManageAdmins: boolean;
    canExportData: boolean;
    canManageFeatureFlags: boolean;
    userManagement: {
        canViewUsers: boolean;
        canEditUsers: boolean;
        canSuspendUsers: boolean;
        canDeleteUsers: boolean;
        canImpersonateUsers: boolean;
        canManageSubscriptions: boolean;
        canProcessRefunds: boolean;
        canMergeAccounts: boolean;
        canExportUserData: boolean;
        canViewUserAnalytics: boolean;
    };
    contentModeration: {
        canReviewContent: boolean;
        canApproveContent: boolean;
        canRejectContent: boolean;
        canFlagContent: boolean;
        canHandleAppeals: boolean;
        canConfigureFilters: boolean;
        canViewModerationQueue: boolean;
        canAssignModerators: boolean;
        canExportModerationData: boolean;
    };
    systemAdministration: {
        canViewSystemHealth: boolean;
        canManageServices: boolean;
        canConfigureFeatures: boolean;
        canViewLogs: boolean;
        canManageIntegrations: boolean;
        canDeployUpdates: boolean;
        canManageBackups: boolean;
        canConfigureSecurity: boolean;
    };
    billing: {
        canViewBilling: boolean;
        canProcessPayments: boolean;
        canProcessRefunds: boolean;
        canManageSubscriptions: boolean;
        canViewFinancialReports: boolean;
        canConfigurePricing: boolean;
        canManageDisputes: boolean;
        canExportBillingData: boolean;
    };
    analytics: {
        canViewBasicAnalytics: boolean;
        canViewAdvancedAnalytics: boolean;
        canExportAnalytics: boolean;
        canConfigureAnalytics: boolean;
        canViewCustomReports: boolean;
        canCreateCustomReports: boolean;
        canScheduleReports: boolean;
        canViewRealTimeData: boolean;
    };
    security: {
        canViewSecurityEvents: boolean;
        canManageSecurityPolicies: boolean;
        canViewAuditLogs: boolean;
        canExportAuditData: boolean;
        canManageAccessControl: boolean;
        canConfigureCompliance: boolean;
        canInvestigateIncidents: boolean;
        canManageSecurityAlerts: boolean;
    };
}
export interface AuthenticatedRequest extends CallableRequest {
    auth: {
        uid: string;
        token: admin.auth.DecodedIdToken;
    };
}
export interface AdminAuthenticatedRequest extends AuthenticatedRequest {
    admin: {
        role: AdminRole;
        level: AdminLevel;
        permissions: AdminPermissions;
        profile: any;
    };
}
/**
 * Basic authentication requirement
  */
export declare const requireAuth: (request: CallableRequest) => Promise<AuthenticatedRequest>;
/**
 * Check if user has administrative privileges (legacy fallback)
  */
export declare const isAdmin: (request: AuthenticatedRequest) => boolean;
/**
 * Enhanced admin authentication with Firebase Custom Claims
  */
export declare const requireAdmin: (request: CallableRequest, minLevel?: AdminLevel) => Promise<AdminAuthenticatedRequest>;
/**
 * Check specific admin permission
  */
export declare const requireAdminPermission: (request: CallableRequest, permission: keyof AdminPermissions) => Promise<AdminAuthenticatedRequest>;
/**
 * Extract user information from authenticated request
  */
export declare const getUserInfo: (request: AuthenticatedRequest) => {
    uid: string;
    email: string | undefined;
    emailVerified: boolean | undefined;
    provider: string;
    name: any;
    picture: string | undefined;
};
export declare const withAdminRateLimit: (maxRequests?: number, windowMs?: number) => (handler: (request: AdminAuthenticatedRequest) => Promise<any>) => (request: AdminAuthenticatedRequest) => Promise<any>;
//# sourceMappingURL=admin-auth.middleware.d.ts.map
/**
 * Admin Access Service
 *
 * Centralized service for admin authentication, authorization, and permission management.
 * Provides consistent admin access checking across all CVPlus admin functions.
 *
 * Features:
 * - Firebase Custom Claims integration
 * - Fallback email-based admin checking
 * - Granular permission management
 * - Role-based access control (RBAC)
 * - Comprehensive audit logging
 *
 * @author Gil Klainert
 * @version 1.0.0
 */
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { AdminRole, AdminLevel } from '../types';
export class AdminAccessService {
    /**
     * Check if user has basic admin access
     *
     * @param userId - Firebase user ID
     * @returns Promise<boolean> - True if user has admin access
     */
    static async checkAdminAccess(userId) {
        if (!userId) {
            return false;
        }
        try {
            // Get user record from Firebase Auth
            const user = await admin.auth().getUser(userId);
            // Check Firebase custom claims first (preferred method)
            const claims = user.customClaims;
            if (claims?.adminLevel && typeof claims.adminLevel === 'number' && claims.adminLevel >= 1) {
                return true;
            }
            if (claims?.isAdmin === true) {
                return true;
            }
            // Fallback to email-based check for initial setup
            const userEmail = user.email?.toLowerCase();
            if (userEmail && this.ADMIN_EMAILS.includes(userEmail)) {
                // Auto-upgrade to custom claims if user is in admin email list
                await this.upgradeToCustomClaims(userId, userEmail);
                return true;
            }
            return false;
        }
        catch (error) {
            console.error(`Admin access check failed for user ${userId}:`, error);
            return false;
        }
    }
    /**
     * Require admin access or throw error
     *
     * @param userId - Firebase user ID
     * @throws functions.https.HttpsError if user lacks admin access
     */
    static async requireAdminAccess(userId) {
        const hasAccess = await this.checkAdminAccess(userId);
        if (!hasAccess) {
            throw new functions.https.HttpsError('permission-denied', 'Administrative access required. Please contact support if you believe this is an error.');
        }
    }
    /**
     * Check if user has specific admin permission
     *
     * @param userId - Firebase user ID
     * @param permission - Specific permission to check
     * @returns Promise<boolean> - True if user has the permission
     */
    static async hasPermission(userId, permission) {
        try {
            const permissions = await this.getAdminPermissions(userId);
            return permissions[permission] === true;
        }
        catch (error) {
            console.error(`Permission check failed for user ${userId}, permission ${permission}:`, error);
            return false;
        }
    }
    /**
     * Require specific admin permission or throw error
     *
     * @param userId - Firebase user ID
     * @param permission - Required permission
     * @throws functions.https.HttpsError if user lacks the permission
     */
    static async requirePermission(userId, permission) {
        const hasPermission = await this.hasPermission(userId, permission);
        if (!hasPermission) {
            throw new functions.https.HttpsError('permission-denied', `Missing required permission: ${permission}`);
        }
    }
    /**
     * Get detailed admin permissions for user
     *
     * @param userId - Firebase user ID
     * @returns Promise<AdminPermissions> - Complete permissions object
     */
    static async getAdminPermissions(userId) {
        // Check basic admin access first
        const hasAccess = await this.checkAdminAccess(userId);
        if (!hasAccess) {
            return this.getEmptyPermissions();
        }
        try {
            const user = await admin.auth().getUser(userId);
            const claims = user.customClaims;
            // Extract admin level and roles from custom claims
            const adminLevel = claims?.adminLevel || 1;
            const adminRoles = claims?.adminRoles || ['support'];
            const userEmail = user.email?.toLowerCase();
            // Super admins get highest privileges
            if (userEmail && this.SUPER_ADMIN_EMAILS.includes(userEmail)) {
                return this.getSuperAdminPermissions();
            }
            // Calculate permissions based on level and roles
            return this.calculatePermissions(adminLevel, adminRoles, userId);
        }
        catch (error) {
            console.error(`Failed to get admin permissions for user ${userId}:`, error);
            return this.getEmptyPermissions();
        }
    }
    /**
     * Get admin user metadata
     *
     * @param userId - Firebase user ID
     * @returns Admin user information
     */
    static async getAdminUserInfo(userId) {
        try {
            const user = await admin.auth().getUser(userId);
            const permissions = await this.getAdminPermissions(userId);
            return {
                userId,
                email: user.email,
                displayName: user.displayName,
                adminLevel: permissions.adminLevel,
                roles: permissions.roles,
                permissions,
                lastSignIn: user.metadata.lastSignInTime,
                createdAt: user.metadata.creationTime
            };
        }
        catch (error) {
            console.error(`Failed to get admin user info for ${userId}:`, error);
            throw new functions.https.HttpsError('internal', 'Failed to retrieve admin user information');
        }
    }
    /**
     * Upgrade user to use Firebase Custom Claims instead of email-based checking
     *
     * @private
     * @param userId - Firebase user ID
     * @param email - User email address
     */
    static async upgradeToCustomClaims(userId, email) {
        try {
            // Determine admin level based on email
            const adminLevel = this.SUPER_ADMIN_EMAILS.includes(email) ? 5 : 3;
            const adminRoles = this.SUPER_ADMIN_EMAILS.includes(email)
                ? [AdminRole.SYSTEM_ADMIN, AdminRole.SUPER_ADMIN, AdminRole.ADMIN, AdminRole.MODERATOR, AdminRole.SUPPORT]
                : [AdminRole.ADMIN, AdminRole.MODERATOR, AdminRole.SUPPORT];
            // Set custom claims
            await admin.auth().setCustomUserClaims(userId, {
                isAdmin: true,
                adminLevel,
                adminRoles,
                upgradeDate: new Date().toISOString(),
                upgradeReason: 'email_based_fallback'
            });
            console.log(`Upgraded user ${userId} (${email}) to custom claims with admin level ${adminLevel}`);
        }
        catch (error) {
            console.error(`Failed to upgrade user ${userId} to custom claims:`, error);
            // Don't throw - fallback should still work
        }
    }
    /**
     * Get empty permissions object (no admin access)
     *
     * @private
     * @returns Empty AdminPermissions object
     */
    static getEmptyPermissions() {
        return {
            canManageUsers: false,
            canMonitorSystem: false,
            canViewAnalytics: false,
            canManageAdmins: false,
            canModerateContent: false,
            canAuditSecurity: false,
            canManageBilling: false,
            canAccessSupport: false,
            canViewReports: false,
            canManageContent: false,
            adminLevel: AdminLevel.L1_SUPPORT,
            roles: []
        };
    }
    /**
     * Get super admin permissions (highest level)
     *
     * @private
     * @returns Complete AdminPermissions with all permissions enabled
     */
    static getSuperAdminPermissions() {
        return {
            canManageUsers: true,
            canMonitorSystem: true,
            canViewAnalytics: true,
            canManageAdmins: true,
            canModerateContent: true,
            canAuditSecurity: true,
            canManageBilling: true,
            canAccessSupport: true,
            canViewReports: true,
            canManageContent: true,
            adminLevel: 5,
            roles: [AdminRole.SYSTEM_ADMIN, AdminRole.SUPER_ADMIN, AdminRole.ADMIN, AdminRole.MODERATOR, AdminRole.SUPPORT]
        };
    }
    /**
     * Calculate permissions based on admin level and roles
     *
     * @private
     * @param adminLevel - Admin level (1-5)
     * @param roles - Array of admin roles
     * @param userId - User ID for logging
     * @returns Calculated AdminPermissions object
     */
    static calculatePermissions(adminLevel, roles, userId) {
        const permissions = {
            canManageUsers: adminLevel >= 2 || roles.includes(AdminRole.ADMIN),
            canMonitorSystem: adminLevel >= 1 || roles.includes(AdminRole.SUPPORT),
            canViewAnalytics: adminLevel >= 2 || roles.includes(AdminRole.ADMIN),
            canManageAdmins: adminLevel >= 4 || roles.includes(AdminRole.SUPER_ADMIN),
            canModerateContent: adminLevel >= 2 || roles.includes(AdminRole.MODERATOR),
            canAuditSecurity: adminLevel >= 3 || roles.includes(AdminRole.ADMIN),
            canManageBilling: adminLevel >= 3 || roles.includes(AdminRole.ADMIN),
            canAccessSupport: adminLevel >= 1 || roles.includes(AdminRole.SUPPORT),
            canViewReports: adminLevel >= 2 || roles.includes(AdminRole.ADMIN),
            canManageContent: adminLevel >= 2 || roles.includes(AdminRole.MODERATOR),
            adminLevel,
            roles
        };
        // Log permission calculation for audit
        console.log(`Calculated permissions for user ${userId}: level ${adminLevel}, roles [${roles.join(', ')}]`);
        return permissions;
    }
    /**
     * Validate admin context from Firebase Functions call
     *
     * @param context - Firebase Functions CallableContext
     * @returns User ID if valid, throws error otherwise
     */
    static validateAdminContext(context) {
        if (!context.auth) {
            throw new functions.https.HttpsError('unauthenticated', 'Authentication required for admin functions');
        }
        return context.auth.uid;
    }
    /**
     * Log admin action for audit purposes
     *
     * @param action - Action performed
     * @param userId - Admin user ID
     * @param targetId - Target of the action (optional)
     * @param metadata - Additional metadata (optional)
     */
    static async logAdminAction(action, userId, targetId, metadata) {
        try {
            const adminInfo = await this.getAdminUserInfo(userId);
            const logEntry = {
                action,
                adminUserId: userId,
                adminEmail: adminInfo.email,
                adminLevel: adminInfo.adminLevel,
                targetId,
                metadata,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                source: 'admin_access_service'
            };
            await admin.firestore()
                .collection('admin_audit_log')
                .add(logEntry);
            console.log(`Admin action logged: ${action} by ${userId} (${adminInfo.email})`);
        }
        catch (error) {
            console.error(`Failed to log admin action ${action} by ${userId}:`, error);
            // Don't throw - logging failure shouldn't break functionality
        }
    }
}
/**
 * Admin email addresses for fallback authentication
 */
AdminAccessService.ADMIN_EMAILS = [
    'gil.klainert@gmail.com',
    'admin@cvplus.ai',
    'support@cvplus.ai'
];
/**
 * Super admin emails with highest privileges
 */
AdminAccessService.SUPER_ADMIN_EMAILS = [
    'gil.klainert@gmail.com'
];
//# sourceMappingURL=admin-access.service.js.map
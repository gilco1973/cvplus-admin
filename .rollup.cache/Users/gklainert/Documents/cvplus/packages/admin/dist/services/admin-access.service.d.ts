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
import * as functions from 'firebase-functions';
import { AdminPermissions, AdminRole, AdminLevel } from '../types';
export declare class AdminAccessService {
    /**
     * Admin email addresses for fallback authentication
     */
    private static readonly ADMIN_EMAILS;
    /**
     * Super admin emails with highest privileges
     */
    private static readonly SUPER_ADMIN_EMAILS;
    /**
     * Check if user has basic admin access
     *
     * @param userId - Firebase user ID
     * @returns Promise<boolean> - True if user has admin access
     */
    static checkAdminAccess(userId: string): Promise<boolean>;
    /**
     * Require admin access or throw error
     *
     * @param userId - Firebase user ID
     * @throws functions.https.HttpsError if user lacks admin access
     */
    static requireAdminAccess(userId: string): Promise<void>;
    /**
     * Check if user has specific admin permission
     *
     * @param userId - Firebase user ID
     * @param permission - Specific permission to check
     * @returns Promise<boolean> - True if user has the permission
     */
    static hasPermission(userId: string, permission: keyof AdminPermissions): Promise<boolean>;
    /**
     * Require specific admin permission or throw error
     *
     * @param userId - Firebase user ID
     * @param permission - Required permission
     * @throws functions.https.HttpsError if user lacks the permission
     */
    static requirePermission(userId: string, permission: keyof AdminPermissions): Promise<void>;
    /**
     * Get detailed admin permissions for user
     *
     * @param userId - Firebase user ID
     * @returns Promise<AdminPermissions> - Complete permissions object
     */
    static getAdminPermissions(userId: string): Promise<AdminPermissions>;
    /**
     * Get admin user metadata
     *
     * @param userId - Firebase user ID
     * @returns Admin user information
     */
    static getAdminUserInfo(userId: string): Promise<{
        userId: string;
        email: string | undefined;
        displayName: string | undefined;
        adminLevel: AdminLevel;
        roles: AdminRole[];
        permissions: AdminPermissions;
        lastSignIn: string;
        createdAt: string;
    }>;
    /**
     * Upgrade user to use Firebase Custom Claims instead of email-based checking
     *
     * @private
     * @param userId - Firebase user ID
     * @param email - User email address
     */
    private static upgradeToCustomClaims;
    /**
     * Get empty permissions object (no admin access)
     *
     * @private
     * @returns Empty AdminPermissions object
     */
    private static getEmptyPermissions;
    /**
     * Get super admin permissions (highest level)
     *
     * @private
     * @returns Complete AdminPermissions with all permissions enabled
     */
    private static getSuperAdminPermissions;
    /**
     * Calculate permissions based on admin level and roles
     *
     * @private
     * @param adminLevel - Admin level (1-5)
     * @param roles - Array of admin roles
     * @param userId - User ID for logging
     * @returns Calculated AdminPermissions object
     */
    private static calculatePermissions;
    /**
     * Validate admin context from Firebase Functions call
     *
     * @param context - Firebase Functions CallableContext
     * @returns User ID if valid, throws error otherwise
     */
    static validateAdminContext(context: functions.https.CallableContext): string;
    /**
     * Log admin action for audit purposes
     *
     * @param action - Action performed
     * @param userId - Admin user ID
     * @param targetId - Target of the action (optional)
     * @param metadata - Additional metadata (optional)
     */
    static logAdminAction(action: string, userId: string, targetId?: string, metadata?: Record<string, any>): Promise<void>;
}
//# sourceMappingURL=admin-access.service.d.ts.map
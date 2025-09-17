/**
 * CVPlus Admin Module
 *
 * A comprehensive administrative dashboard module for the CVPlus platform.
 * Provides user management, content moderation, system monitoring, analytics,
 * security auditing, and operational oversight capabilities.
 *
 * @author Gil Klainert
 * @version 1.0.0
 */
// ============================================================================
// TYPE EXPORTS
// ============================================================================
export * from './types';
export { AdminRole, AdminLevel } from './middleware/admin-auth.middleware';
export { requireAuth, isAdmin, requireAdmin, requireAdminPermission, getUserInfo, withAdminRateLimit } from './middleware/admin-auth.middleware';
// ============================================================================
// SERVICE EXPORTS (Refactored)
// ============================================================================
export { AdminDashboardService } from './services/admin-dashboard.service';
// ============================================================================
// CONSTANTS EXPORTS
// ============================================================================
export * from './constants';
// ============================================================================
// MODULE INFORMATION
// ============================================================================
export const ADMIN_MODULE_NAME = '@cvplus/admin';
export const VERSION = '1.0.0';
// ============================================================================
// MODULE DEPENDENCIES
// ============================================================================
export const MODULE_DEPENDENCIES = {
    required: [
        '@cvplus/core',
        '@cvplus/auth',
        '@cvplus/analytics',
        '@cvplus/public-profiles'
    ],
    optional: [
        'firebase-admin',
        'firebase'
    ]
};
// ============================================================================
// ERROR HANDLING
// ============================================================================
export class AdminModuleError extends Error {
    constructor(message, code, context) {
        super(message);
        this.code = code;
        this.context = context;
        this.name = 'AdminModuleError';
    }
}
export class AdminPermissionError extends AdminModuleError {
    constructor(message, context) {
        super(message, 'PERMISSION_DENIED', context);
        this.name = 'AdminPermissionError';
    }
}
export class AdminConfigurationError extends AdminModuleError {
    constructor(message, context) {
        super(message, 'CONFIGURATION_ERROR', context);
        this.name = 'AdminConfigurationError';
    }
}
export class AdminOperationError extends AdminModuleError {
    constructor(message, context) {
        super(message, 'OPERATION_FAILED', context);
        this.name = 'AdminOperationError';
    }
}
//# sourceMappingURL=index.js.map
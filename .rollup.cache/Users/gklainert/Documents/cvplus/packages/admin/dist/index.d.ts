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
export * from './types';
export type { AdminPermissions } from './middleware/admin-auth.middleware';
export { AdminRole, AdminLevel } from './middleware/admin-auth.middleware';
export { requireAuth, isAdmin, requireAdmin, requireAdminPermission, getUserInfo, withAdminRateLimit } from './middleware/admin-auth.middleware';
export { AdminDashboardService } from './services/admin-dashboard.service';
export * from './constants';
export declare const ADMIN_MODULE_NAME = "@cvplus/admin";
export declare const VERSION = "1.0.0";
export declare const MODULE_DEPENDENCIES: {
    required: string[];
    optional: string[];
};
export declare class AdminModuleError extends Error {
    code: string;
    context?: Record<string, any> | undefined;
    constructor(message: string, code: string, context?: Record<string, any> | undefined);
}
export declare class AdminPermissionError extends AdminModuleError {
    constructor(message: string, context?: Record<string, any>);
}
export declare class AdminConfigurationError extends AdminModuleError {
    constructor(message: string, context?: Record<string, any>);
}
export declare class AdminOperationError extends AdminModuleError {
    constructor(message: string, context?: Record<string, any>);
}
//# sourceMappingURL=index.d.ts.map
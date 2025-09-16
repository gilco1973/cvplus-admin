/**
 * CVPlus Admin Frontend Hooks
 *
 * React hooks for administrative operations and state management.
 *
 * @author Gil Klainert
 * @version 1.0.0
  */
export { useAdminAuth } from './useAdminAuth';
/**
 * Available admin hooks
  */
export declare const ADMIN_HOOKS: {
    readonly adminAuth: {
        readonly name: "useAdminAuth";
        readonly description: "Admin authentication and permission management";
        readonly category: "AUTHENTICATION";
        readonly dependencies: readonly ["react", "@cvplus/auth"];
        readonly returnType: "AdminAuthState";
    };
};
/**
 * Hook categories
  */
export declare const HOOK_CATEGORIES: {
    readonly AUTHENTICATION: "Authentication Hooks";
    readonly DATA_FETCHING: "Data Fetching Hooks";
    readonly STATE_MANAGEMENT: "State Management Hooks";
    readonly REAL_TIME: "Real-time Data Hooks";
    readonly PERMISSIONS: "Permission Management Hooks";
    readonly ANALYTICS: "Analytics Hooks";
};
export interface AdminHookOptions {
    enabled?: boolean;
    refreshInterval?: number;
    onError?: (error: Error) => void;
    onSuccess?: (data: any) => void;
}
export interface AdminAuthHookOptions extends AdminHookOptions {
    requirePermissions?: string[];
    redirectOnUnauthorized?: boolean;
}
/**
 * Hook utilities and helpers
  */
export declare const hookUtils: {
    /**
     * Default hook options
      */
    defaultOptions: AdminHookOptions;
    /**
     * Create error handler for admin hooks
      */
    createErrorHandler: (hookName: string) => (error: Error) => void;
    /**
     * Create success handler for admin hooks
      */
    createSuccessHandler: (hookName: string) => (data: any) => void;
};
//# sourceMappingURL=index.d.ts.map
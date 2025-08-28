/**
 * CVPlus Admin Frontend Hooks
 *
 * React hooks for administrative operations and state management.
 *
 * @author Gil Klainert
 * @version 1.0.0
 */
// ============================================================================
// HOOK EXPORTS
// ============================================================================
export { useAdminAuth } from './useAdminAuth';
// ============================================================================
// HOOK METADATA
// ============================================================================
/**
 * Available admin hooks
 */
export const ADMIN_HOOKS = {
    adminAuth: {
        name: 'useAdminAuth',
        description: 'Admin authentication and permission management',
        category: 'AUTHENTICATION',
        dependencies: ['react', '@cvplus/auth'],
        returnType: 'AdminAuthState'
    }
};
/**
 * Hook categories
 */
export const HOOK_CATEGORIES = {
    AUTHENTICATION: 'Authentication Hooks',
    DATA_FETCHING: 'Data Fetching Hooks',
    STATE_MANAGEMENT: 'State Management Hooks',
    REAL_TIME: 'Real-time Data Hooks',
    PERMISSIONS: 'Permission Management Hooks',
    ANALYTICS: 'Analytics Hooks'
};
// ============================================================================
// HOOK UTILITIES
// ============================================================================
/**
 * Hook utilities and helpers
 */
export const hookUtils = {
    /**
     * Default hook options
     */
    defaultOptions: {
        enabled: true,
        refreshInterval: 30000,
        onError: (error) => console.error('Admin hook error:', error),
        onSuccess: (data) => console.debug('Admin hook success:', data)
    },
    /**
     * Create error handler for admin hooks
     */
    createErrorHandler: (hookName) => (error) => {
        console.error(`[Admin Hook: ${hookName}]`, error);
        // Additional error handling logic can be added here
    },
    /**
     * Create success handler for admin hooks
     */
    createSuccessHandler: (hookName) => (data) => {
        console.debug(`[Admin Hook: ${hookName}] Success`, data);
        // Additional success handling logic can be added here
    }
};
//# sourceMappingURL=index.js.map
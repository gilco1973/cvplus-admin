/**
 * CVPlus Admin Middleware
 *
 * Middleware functions for admin operations including authentication,
 * authorization, rate limiting, and request validation.
 *
 * @author Gil Klainert
 * @version 1.0.0
  */
export * from './admin-auth.middleware';
/**
 * Available admin middleware functions
  */
export declare const ADMIN_MIDDLEWARE: {
    readonly authentication: {
        readonly requireAuth: "Basic authentication requirement";
        readonly requireAdmin: "Admin authentication with role-based access";
        readonly requireAdminPermission: "Specific admin permission requirement";
    };
    readonly rateLimit: {
        readonly withAdminRateLimit: "Rate limiting for admin operations";
    };
    readonly utils: {
        readonly getUserInfo: "Extract user information from authenticated request";
        readonly isAdmin: "Check if user has admin privileges (legacy)";
    };
};
/**
 * Middleware categories
  */
export declare const MIDDLEWARE_CATEGORIES: {
    readonly AUTHENTICATION: "Authentication Middleware";
    readonly AUTHORIZATION: "Authorization Middleware";
    readonly RATE_LIMITING: "Rate Limiting Middleware";
    readonly VALIDATION: "Request Validation Middleware";
    readonly LOGGING: "Audit Logging Middleware";
};
//# sourceMappingURL=index.d.ts.map
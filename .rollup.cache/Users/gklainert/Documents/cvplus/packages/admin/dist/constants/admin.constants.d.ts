/**
 * Admin Constants
 *
 * Core constants and configuration values for the admin module.
  */
import { AdminRole, AdminLevel, AdminSpecialization } from '../types/admin.types';
import type { AdminConfig, AdminFeature } from '../types/admin.types';
export declare const ADMIN_MODULE_NAME = "@cvplus/admin";
export declare const ADMIN_MODULE_VERSION = "1.0.0";
export declare const MODULE_INFO: {
    readonly name: "@cvplus/admin";
    readonly version: "1.0.0";
    readonly description: "Comprehensive admin dashboard module for CVPlus platform management";
    readonly author: "Gil Klainert";
    readonly license: "MIT";
};
/**
 * Admin role hierarchy (highest to lowest privilege)
  */
export declare const ADMIN_ROLE_HIERARCHY: readonly [AdminRole.SYSTEM_ADMIN, AdminRole.SUPER_ADMIN, AdminRole.ADMIN, AdminRole.MODERATOR, AdminRole.SUPPORT];
/**
 * Admin level mappings
  */
export declare const ADMIN_LEVEL_MAPPINGS: {
    readonly support: AdminLevel.L1_SUPPORT;
    readonly moderator: AdminLevel.L2_MODERATOR;
    readonly admin: AdminLevel.L3_ADMIN;
    readonly super_admin: AdminLevel.L4_SUPER_ADMIN;
    readonly system_admin: AdminLevel.L5_SYSTEM_ADMIN;
};
/**
 * Default specializations by role
  */
export declare const DEFAULT_SPECIALIZATIONS: {
    readonly support: readonly [AdminSpecialization.USER_SUPPORT, AdminSpecialization.BILLING_SUPPORT];
    readonly moderator: readonly [AdminSpecialization.CONTENT_MODERATION, AdminSpecialization.USER_SUPPORT];
    readonly admin: readonly [AdminSpecialization.DATA_ANALYSIS, AdminSpecialization.TECHNICAL_SUPPORT];
    readonly super_admin: readonly [AdminSpecialization.SYSTEM_ADMINISTRATION, AdminSpecialization.SECURITY_ANALYSIS, AdminSpecialization.COMPLIANCE];
    readonly system_admin: readonly [AdminSpecialization.SYSTEM_ADMINISTRATION, AdminSpecialization.SECURITY_ANALYSIS, AdminSpecialization.COMPLIANCE];
};
/**
 * Permission matrices by role
  */
export declare const ROLE_PERMISSIONS: {
    readonly support: {
        readonly canAccessDashboard: true;
        readonly canManageUsers: false;
        readonly canModerateContent: false;
        readonly canMonitorSystem: false;
        readonly canViewAnalytics: false;
        readonly canAuditSecurity: false;
        readonly canManageSupport: true;
        readonly canManageBilling: false;
        readonly canConfigureSystem: false;
        readonly canManageAdmins: false;
        readonly canExportData: false;
        readonly canManageFeatureFlags: false;
        readonly userManagement: {
            readonly canViewUsers: true;
            readonly canEditUsers: false;
            readonly canSuspendUsers: false;
            readonly canDeleteUsers: false;
            readonly canImpersonateUsers: false;
            readonly canManageSubscriptions: false;
            readonly canProcessRefunds: false;
            readonly canMergeAccounts: false;
            readonly canExportUserData: false;
            readonly canViewUserAnalytics: false;
        };
    };
    readonly moderator: {
        readonly canAccessDashboard: true;
        readonly canManageUsers: true;
        readonly canModerateContent: true;
        readonly canMonitorSystem: false;
        readonly canViewAnalytics: true;
        readonly canAuditSecurity: false;
        readonly canManageSupport: true;
        readonly canManageBilling: false;
        readonly canConfigureSystem: false;
        readonly canManageAdmins: false;
        readonly canExportData: true;
        readonly canManageFeatureFlags: false;
        readonly userManagement: {
            readonly canViewUsers: true;
            readonly canEditUsers: true;
            readonly canSuspendUsers: true;
            readonly canDeleteUsers: false;
            readonly canImpersonateUsers: false;
            readonly canManageSubscriptions: false;
            readonly canProcessRefunds: false;
            readonly canMergeAccounts: false;
            readonly canExportUserData: true;
            readonly canViewUserAnalytics: true;
        };
    };
    readonly admin: {
        readonly canAccessDashboard: true;
        readonly canManageUsers: true;
        readonly canModerateContent: true;
        readonly canMonitorSystem: true;
        readonly canViewAnalytics: true;
        readonly canAuditSecurity: true;
        readonly canManageSupport: true;
        readonly canManageBilling: true;
        readonly canConfigureSystem: false;
        readonly canManageAdmins: false;
        readonly canExportData: true;
        readonly canManageFeatureFlags: true;
        readonly userManagement: {
            readonly canViewUsers: true;
            readonly canEditUsers: true;
            readonly canSuspendUsers: true;
            readonly canDeleteUsers: true;
            readonly canImpersonateUsers: true;
            readonly canManageSubscriptions: true;
            readonly canProcessRefunds: true;
            readonly canMergeAccounts: true;
            readonly canExportUserData: true;
            readonly canViewUserAnalytics: true;
        };
    };
    readonly super_admin: {
        readonly canAccessDashboard: true;
        readonly canManageUsers: true;
        readonly canModerateContent: true;
        readonly canMonitorSystem: true;
        readonly canViewAnalytics: true;
        readonly canAuditSecurity: true;
        readonly canManageSupport: true;
        readonly canManageBilling: true;
        readonly canConfigureSystem: true;
        readonly canManageAdmins: true;
        readonly canExportData: true;
        readonly canManageFeatureFlags: true;
        readonly userManagement: {
            readonly canViewUsers: true;
            readonly canEditUsers: true;
            readonly canSuspendUsers: true;
            readonly canDeleteUsers: true;
            readonly canImpersonateUsers: true;
            readonly canManageSubscriptions: true;
            readonly canProcessRefunds: true;
            readonly canMergeAccounts: true;
            readonly canExportUserData: true;
            readonly canViewUserAnalytics: true;
        };
    };
    readonly system_admin: {
        readonly canAccessDashboard: true;
        readonly canManageUsers: true;
        readonly canModerateContent: true;
        readonly canMonitorSystem: true;
        readonly canViewAnalytics: true;
        readonly canAuditSecurity: true;
        readonly canManageSupport: true;
        readonly canManageBilling: true;
        readonly canConfigureSystem: true;
        readonly canManageAdmins: true;
        readonly canExportData: true;
        readonly canManageFeatureFlags: true;
        readonly userManagement: {
            readonly canViewUsers: true;
            readonly canEditUsers: true;
            readonly canSuspendUsers: true;
            readonly canDeleteUsers: true;
            readonly canImpersonateUsers: true;
            readonly canManageSubscriptions: true;
            readonly canProcessRefunds: true;
            readonly canMergeAccounts: true;
            readonly canExportUserData: true;
            readonly canViewUserAnalytics: true;
        };
    };
};
/**
 * Default admin configuration
  */
export declare const DEFAULT_ADMIN_CONFIG: AdminConfig;
/**
 * Admin features configuration
  */
export declare const ADMIN_FEATURES: AdminFeature[];
/**
 * Dashboard layout constants
  */
export declare const DASHBOARD_LAYOUTS: {
    readonly GRID: {
        readonly columns: 12;
        readonly rowHeight: 60;
        readonly margin: readonly [16, 16];
        readonly compactType: "vertical";
    };
    readonly MASONRY: {
        readonly columnWidth: 300;
        readonly gutter: 16;
        readonly fitWidth: true;
    };
    readonly FLUID: {
        readonly minItemWidth: 280;
        readonly maxItemWidth: 400;
        readonly itemHeight: "auto";
    };
};
/**
 * Widget size presets
  */
export declare const WIDGET_SIZES: {
    readonly SMALL: {
        readonly w: 3;
        readonly h: 2;
    };
    readonly MEDIUM: {
        readonly w: 6;
        readonly h: 3;
    };
    readonly LARGE: {
        readonly w: 9;
        readonly h: 4;
    };
    readonly EXTRA_LARGE: {
        readonly w: 12;
        readonly h: 6;
    };
};
/**
 * Color schemes for admin UI
  */
export declare const COLOR_SCHEMES: {
    readonly LIGHT: {
        readonly primary: "#2563eb";
        readonly secondary: "#7c3aed";
        readonly success: "#059669";
        readonly warning: "#d97706";
        readonly error: "#dc2626";
        readonly info: "#0891b2";
    };
    readonly DARK: {
        readonly primary: "#3b82f6";
        readonly secondary: "#8b5cf6";
        readonly success: "#10b981";
        readonly warning: "#f59e0b";
        readonly error: "#ef4444";
        readonly info: "#06b6d4";
    };
};
/**
 * API endpoints for admin operations
  */
export declare const ADMIN_API_ENDPOINTS: {
    readonly DASHBOARD: "/api/admin/dashboard";
    readonly HEALTH_CHECK: "/api/admin/health";
    readonly USERS: "/api/admin/users";
    readonly USER_DETAILS: (id: string) => string;
    readonly USER_ACTIONS: (id: string) => string;
    readonly USER_STATS: "/api/admin/users/stats";
    readonly BULK_OPERATIONS: "/api/admin/users/bulk";
    readonly MODERATION_QUEUE: "/api/admin/moderation/queue";
    readonly MODERATION_ITEM: (id: string) => string;
    readonly MODERATION_ACTIONS: "/api/admin/moderation/actions";
    readonly MODERATION_STATS: "/api/admin/moderation/statistics";
    readonly CONTENT_STATS: "/api/admin/moderation/content/stats";
    readonly SYSTEM_HEALTH: "/api/admin/system/health";
    readonly SYSTEM_METRICS: "/api/admin/system/metrics";
    readonly SYSTEM_ALERTS: "/api/admin/system/alerts";
    readonly SYSTEM_LOGS: "/api/admin/system/logs";
    readonly ANALYTICS: "/api/admin/analytics";
    readonly BUSINESS_METRICS: "/api/admin/analytics/business";
    readonly USER_ANALYTICS: "/api/admin/analytics/users";
    readonly REVENUE_ANALYTICS: "/api/admin/analytics/revenue";
    readonly CONTENT_ANALYTICS: "/api/admin/analytics/content";
    readonly SECURITY_OVERVIEW: "/api/admin/security/overview";
    readonly SECURITY_AUDIT: "/api/admin/security/audit";
    readonly AUDIT_LOGS: "/api/admin/security/audit";
    readonly COMPLIANCE: "/api/admin/security/compliance";
    readonly THREATS: "/api/admin/security/threats";
    readonly SUPPORT_TICKETS: "/api/admin/support/tickets";
    readonly SUPPORT_STATS: "/api/admin/support/statistics";
    readonly SUPPORT_ACTIONS: "/api/admin/support/actions";
    readonly FEATURE_FLAGS: "/api/admin/config/features";
    readonly SYSTEM_CONFIG: "/api/admin/config/system";
    readonly ADMIN_SETTINGS: "/api/admin/config/settings";
    readonly DATA_EXPORT: "/api/admin/export";
};
/**
 * HTTP status codes for admin operations
  */
export declare const ADMIN_HTTP_STATUS: {
    readonly OK: 200;
    readonly CREATED: 201;
    readonly NO_CONTENT: 204;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly CONFLICT: 409;
    readonly UNPROCESSABLE_ENTITY: 422;
    readonly TOO_MANY_REQUESTS: 429;
    readonly INTERNAL_SERVER_ERROR: 500;
    readonly SERVICE_UNAVAILABLE: 503;
};
/**
 * Request timeout configurations
  */
export declare const REQUEST_TIMEOUTS: {
    readonly QUICK_OPERATION: 5000;
    readonly STANDARD_OPERATION: 30000;
    readonly BULK_OPERATION: 120000;
    readonly REPORT_GENERATION: 300000;
    readonly DATA_EXPORT: 600000;
};
/**
 * Default pagination settings
  */
export declare const PAGINATION_DEFAULTS: {
    readonly PAGE_SIZE: 25;
    readonly MAX_PAGE_SIZE: 100;
    readonly MAX_ITEMS_BULK_OPERATION: 1000;
};
/**
 * Rate limiting configuration
  */
export declare const RATE_LIMITS: {
    readonly STANDARD_ADMIN: {
        readonly requests: 1000;
        readonly window: 3600000;
    };
    readonly BULK_OPERATIONS: {
        readonly requests: 100;
        readonly window: 3600000;
    };
    readonly DATA_EXPORT: {
        readonly requests: 10;
        readonly window: 3600000;
    };
    readonly SYSTEM_CONFIGURATION: {
        readonly requests: 50;
        readonly window: 3600000;
    };
};
/**
 * Field validation rules
  */
export declare const VALIDATION_RULES: {
    readonly ADMIN_EMAIL: {
        readonly required: true;
        readonly email: true;
        readonly maxLength: 255;
    };
    readonly ADMIN_NAME: {
        readonly required: true;
        readonly minLength: 2;
        readonly maxLength: 100;
        readonly pattern: RegExp;
    };
    readonly PASSWORD: {
        readonly minLength: 12;
        readonly requireUppercase: true;
        readonly requireLowercase: true;
        readonly requireNumbers: true;
        readonly requireSpecialChars: true;
        readonly maxAge: 90;
    };
    readonly BULK_OPERATION_REASON: {
        readonly required: true;
        readonly minLength: 10;
        readonly maxLength: 500;
    };
    readonly FEATURE_FLAG_NAME: {
        readonly required: true;
        readonly pattern: RegExp;
        readonly minLength: 3;
        readonly maxLength: 50;
    };
};
/**
 * Admin-specific error codes
  */
export declare const ADMIN_ERROR_CODES: {
    readonly INVALID_ADMIN_CREDENTIALS: "ADMIN_001";
    readonly INSUFFICIENT_PRIVILEGES: "ADMIN_002";
    readonly SESSION_EXPIRED: "ADMIN_003";
    readonly MFA_REQUIRED: "ADMIN_004";
    readonly IP_NOT_WHITELISTED: "ADMIN_005";
    readonly USER_NOT_FOUND: "ADMIN_101";
    readonly USER_ALREADY_SUSPENDED: "ADMIN_102";
    readonly USER_CANNOT_BE_DELETED: "ADMIN_103";
    readonly BULK_OPERATION_LIMIT_EXCEEDED: "ADMIN_104";
    readonly CONTENT_NOT_FOUND: "ADMIN_201";
    readonly MODERATION_QUEUE_FULL: "ADMIN_202";
    readonly INVALID_MODERATION_ACTION: "ADMIN_203";
    readonly SYSTEM_MAINTENANCE_MODE: "ADMIN_301";
    readonly SYSTEM_OVERLOADED: "ADMIN_302";
    readonly BACKUP_IN_PROGRESS: "ADMIN_303";
    readonly EXPORT_SIZE_LIMIT_EXCEEDED: "ADMIN_401";
    readonly IMPORT_FORMAT_INVALID: "ADMIN_402";
    readonly DATA_INTEGRITY_ERROR: "ADMIN_403";
    readonly FEATURE_FLAG_CONFLICT: "ADMIN_501";
    readonly INVALID_CONFIGURATION: "ADMIN_502";
    readonly CONFIGURATION_LOCKED: "ADMIN_503";
};
/**
 * Error messages for admin operations
  */
export declare const ADMIN_ERROR_MESSAGES: {
    readonly ADMIN_001: "Invalid admin credentials provided";
    readonly ADMIN_002: "Insufficient privileges for this operation";
    readonly ADMIN_003: "Admin session has expired";
    readonly ADMIN_004: "Multi-factor authentication is required";
    readonly ADMIN_005: "Access denied: IP address not whitelisted";
    readonly ADMIN_101: "User account not found";
    readonly ADMIN_102: "User account is already suspended";
    readonly ADMIN_103: "User account cannot be deleted due to business rules";
    readonly ADMIN_104: "Bulk operation exceeds maximum allowed items";
    readonly ADMIN_201: "Content item not found";
    readonly ADMIN_202: "Moderation queue is at capacity";
    readonly ADMIN_203: "Invalid moderation action specified";
    readonly ADMIN_301: "System is currently in maintenance mode";
    readonly ADMIN_302: "System is currently overloaded, please try again later";
    readonly ADMIN_303: "System backup in progress, some operations unavailable";
    readonly ADMIN_401: "Data export size exceeds maximum limit";
    readonly ADMIN_402: "Import file format is invalid or corrupted";
    readonly ADMIN_403: "Data integrity constraint violation";
    readonly ADMIN_501: "Feature flag configuration conflict detected";
    readonly ADMIN_502: "System configuration is invalid";
    readonly ADMIN_503: "Configuration is locked and cannot be modified";
};
/**
 * Default notification templates
  */
export declare const NOTIFICATION_TEMPLATES: {
    readonly SYSTEM_ALERT: {
        readonly email: {
            readonly subject: "System Alert: {{alertType}}";
            readonly template: "\n        <h2>System Alert</h2>\n        <p><strong>Alert Type:</strong> {{alertType}}</p>\n        <p><strong>Severity:</strong> {{severity}}</p>\n        <p><strong>Description:</strong> {{description}}</p>\n        <p><strong>Time:</strong> {{timestamp}}</p>\n        <p><strong>Action Required:</strong> {{actionRequired}}</p>\n      ";
        };
        readonly slack: {
            readonly template: "\n        🚨 *System Alert*\n        *Type:* {{alertType}}\n        *Severity:* {{severity}}\n        *Description:* {{description}}\n        *Time:* {{timestamp}}\n      ";
        };
    };
    readonly USER_ACTION_REQUIRED: {
        readonly email: {
            readonly subject: "Admin Action Required: {{actionType}}";
            readonly template: "\n        <h2>Admin Action Required</h2>\n        <p><strong>Action Type:</strong> {{actionType}}</p>\n        <p><strong>User:</strong> {{userEmail}}</p>\n        <p><strong>Description:</strong> {{description}}</p>\n        <p><strong>Priority:</strong> {{priority}}</p>\n        <p><strong>Due Date:</strong> {{dueDate}}</p>\n        <p><a href=\"{{actionUrl}}\">Take Action</a></p>\n      ";
        };
    };
};
/**
 * Audit event types
  */
export declare const AUDIT_EVENT_TYPES: {
    readonly ADMIN_LOGIN: "admin.login";
    readonly ADMIN_LOGOUT: "admin.logout";
    readonly ADMIN_MFA_ENABLED: "admin.mfa.enabled";
    readonly ADMIN_MFA_DISABLED: "admin.mfa.disabled";
    readonly USER_CREATED: "user.created";
    readonly USER_UPDATED: "user.updated";
    readonly USER_SUSPENDED: "user.suspended";
    readonly USER_DELETED: "user.deleted";
    readonly USER_IMPERSONATED: "user.impersonated";
    readonly CONTENT_APPROVED: "content.approved";
    readonly CONTENT_REJECTED: "content.rejected";
    readonly CONTENT_FLAGGED: "content.flagged";
    readonly CONFIG_UPDATED: "config.updated";
    readonly FEATURE_FLAG_CHANGED: "feature_flag.changed";
    readonly SYSTEM_MAINTENANCE_STARTED: "system.maintenance.started";
    readonly DATA_EXPORTED: "data.exported";
    readonly DATA_IMPORTED: "data.imported";
    readonly BULK_OPERATION: "bulk_operation.executed";
};
/**
 * Audit retention policies
  */
export declare const AUDIT_RETENTION_POLICIES: {
    readonly AUTHENTICATION_EVENTS: 1095;
    readonly USER_MANAGEMENT_EVENTS: 2555;
    readonly FINANCIAL_EVENTS: 2555;
    readonly SYSTEM_EVENTS: 365;
    readonly CONTENT_EVENTS: 730;
};
//# sourceMappingURL=admin.constants.d.ts.map
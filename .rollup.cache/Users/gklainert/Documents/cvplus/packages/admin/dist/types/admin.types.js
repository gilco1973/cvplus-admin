/**
 * Admin Interface Types
 *
 * Core administrative types for the CVPlus admin module.
 * Defines interfaces for admin users, permissions, and general admin functionality.
  */
// ============================================================================
// Admin Roles & Levels
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
    AdminLevel[AdminLevel["L5_SYSTEM_ADMIN"] = 5] = "L5_SYSTEM_ADMIN"; // System administration
})(AdminLevel || (AdminLevel = {}));
export var AdminSpecialization;
(function (AdminSpecialization) {
    AdminSpecialization["USER_SUPPORT"] = "user_support";
    AdminSpecialization["CONTENT_MODERATION"] = "content_moderation";
    AdminSpecialization["TECHNICAL_SUPPORT"] = "technical_support";
    AdminSpecialization["BILLING_SUPPORT"] = "billing_support";
    AdminSpecialization["SECURITY_ANALYSIS"] = "security_analysis";
    AdminSpecialization["DATA_ANALYSIS"] = "data_analysis";
    AdminSpecialization["SYSTEM_ADMINISTRATION"] = "system_administration";
    AdminSpecialization["COMPLIANCE"] = "compliance";
})(AdminSpecialization || (AdminSpecialization = {}));
export var UserManagementView;
(function (UserManagementView) {
    UserManagementView["TABLE"] = "table";
    UserManagementView["CARDS"] = "cards";
    UserManagementView["DETAILED"] = "detailed";
})(UserManagementView || (UserManagementView = {}));
export var ContentModerationView;
(function (ContentModerationView) {
    ContentModerationView["QUEUE"] = "queue";
    ContentModerationView["GRID"] = "grid";
    ContentModerationView["TIMELINE"] = "timeline";
})(ContentModerationView || (ContentModerationView = {}));
export var SystemMonitoringView;
(function (SystemMonitoringView) {
    SystemMonitoringView["DASHBOARD"] = "dashboard";
    SystemMonitoringView["METRICS"] = "metrics";
    SystemMonitoringView["LOGS"] = "logs";
})(SystemMonitoringView || (SystemMonitoringView = {}));
export var AnalyticsView;
(function (AnalyticsView) {
    AnalyticsView["OVERVIEW"] = "overview";
    AnalyticsView["DETAILED"] = "detailed";
    AnalyticsView["CUSTOM"] = "custom";
})(AnalyticsView || (AnalyticsView = {}));
export var WidgetSize;
(function (WidgetSize) {
    WidgetSize["SMALL"] = "small";
    WidgetSize["MEDIUM"] = "medium";
    WidgetSize["LARGE"] = "large";
    WidgetSize["EXTRA_LARGE"] = "extra_large";
})(WidgetSize || (WidgetSize = {}));
export var CertificationLevel;
(function (CertificationLevel) {
    CertificationLevel["BASIC"] = "basic";
    CertificationLevel["INTERMEDIATE"] = "intermediate";
    CertificationLevel["ADVANCED"] = "advanced";
    CertificationLevel["EXPERT"] = "expert";
})(CertificationLevel || (CertificationLevel = {}));
export var AdminAction;
(function (AdminAction) {
    // User Management
    AdminAction["USER_VIEW"] = "user:view";
    AdminAction["USER_EDIT"] = "user:edit";
    AdminAction["USER_SUSPEND"] = "user:suspend";
    AdminAction["USER_UNSUSPEND"] = "user:unsuspend";
    AdminAction["USER_DELETE"] = "user:delete";
    AdminAction["USER_IMPERSONATE"] = "user:impersonate";
    AdminAction["USER_EXPORT"] = "user:export";
    // Content Moderation
    AdminAction["CONTENT_REVIEW"] = "content:review";
    AdminAction["CONTENT_APPROVE"] = "content:approve";
    AdminAction["CONTENT_REJECT"] = "content:reject";
    AdminAction["CONTENT_FLAG"] = "content:flag";
    AdminAction["CONTENT_UNFLAG"] = "content:unflag";
    // System Administration
    AdminAction["SYSTEM_CONFIG"] = "system:config";
    AdminAction["SYSTEM_MONITOR"] = "system:monitor";
    AdminAction["SYSTEM_MAINTENANCE"] = "system:maintenance";
    // Billing
    AdminAction["BILLING_VIEW"] = "billing:view";
    AdminAction["BILLING_REFUND"] = "billing:refund";
    AdminAction["BILLING_DISPUTE"] = "billing:dispute";
    // Security
    AdminAction["SECURITY_AUDIT"] = "security:audit";
    AdminAction["SECURITY_INCIDENT"] = "security:incident";
    AdminAction["ACCESS_GRANT"] = "access:grant";
    AdminAction["ACCESS_REVOKE"] = "access:revoke";
})(AdminAction || (AdminAction = {}));
export var AdminAlertType;
(function (AdminAlertType) {
    AdminAlertType["SYSTEM"] = "system";
    AdminAlertType["SECURITY"] = "security";
    AdminAlertType["USER"] = "user";
    AdminAlertType["CONTENT"] = "content";
    AdminAlertType["BILLING"] = "billing";
    AdminAlertType["PERFORMANCE"] = "performance";
    AdminAlertType["COMPLIANCE"] = "compliance";
})(AdminAlertType || (AdminAlertType = {}));
export var AdminAlertSeverity;
(function (AdminAlertSeverity) {
    AdminAlertSeverity["INFO"] = "info";
    AdminAlertSeverity["WARNING"] = "warning";
    AdminAlertSeverity["ERROR"] = "error";
    AdminAlertSeverity["CRITICAL"] = "critical";
})(AdminAlertSeverity || (AdminAlertSeverity = {}));
//# sourceMappingURL=admin.types.js.map
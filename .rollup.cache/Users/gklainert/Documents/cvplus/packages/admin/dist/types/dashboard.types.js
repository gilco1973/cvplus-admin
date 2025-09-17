/**
 * Dashboard Types
 *
 * Types for the admin dashboard interface, widgets, and data visualization.
  */
export var DashboardLayoutType;
(function (DashboardLayoutType) {
    DashboardLayoutType["GRID"] = "grid";
    DashboardLayoutType["MASONRY"] = "masonry";
    DashboardLayoutType["FLUID"] = "fluid";
    DashboardLayoutType["TABBED"] = "tabbed";
})(DashboardLayoutType || (DashboardLayoutType = {}));
export var SystemStatus;
(function (SystemStatus) {
    SystemStatus["HEALTHY"] = "healthy";
    SystemStatus["WARNING"] = "warning";
    SystemStatus["CRITICAL"] = "critical";
    SystemStatus["MAINTENANCE"] = "maintenance";
})(SystemStatus || (SystemStatus = {}));
export var SystemEventType;
(function (SystemEventType) {
    SystemEventType["DEPLOYMENT"] = "deployment";
    SystemEventType["INCIDENT"] = "incident";
    SystemEventType["MAINTENANCE"] = "maintenance";
    SystemEventType["ALERT"] = "alert";
    SystemEventType["USER_ACTIVITY"] = "user_activity";
    SystemEventType["SYSTEM_CHANGE"] = "system_change";
})(SystemEventType || (SystemEventType = {}));
export var InsightType;
(function (InsightType) {
    InsightType["OPPORTUNITY"] = "opportunity";
    InsightType["RISK"] = "risk";
    InsightType["ANOMALY"] = "anomaly";
    InsightType["TREND"] = "trend";
    InsightType["RECOMMENDATION"] = "recommendation";
})(InsightType || (InsightType = {}));
export var InsightImpact;
(function (InsightImpact) {
    InsightImpact["LOW"] = "low";
    InsightImpact["MEDIUM"] = "medium";
    InsightImpact["HIGH"] = "high";
    InsightImpact["CRITICAL"] = "critical";
})(InsightImpact || (InsightImpact = {}));
export var InsightPriority;
(function (InsightPriority) {
    InsightPriority["LOW"] = "low";
    InsightPriority["MEDIUM"] = "medium";
    InsightPriority["HIGH"] = "high";
    InsightPriority["URGENT"] = "urgent";
})(InsightPriority || (InsightPriority = {}));
// ============================================================================
// Widget Types
// ============================================================================
export var WidgetType;
(function (WidgetType) {
    WidgetType["METRICS_CARD"] = "metrics_card";
    WidgetType["CHART"] = "chart";
    WidgetType["TABLE"] = "table";
    WidgetType["LIST"] = "list";
    WidgetType["MAP"] = "map";
    WidgetType["GAUGE"] = "gauge";
    WidgetType["PROGRESS"] = "progress";
    WidgetType["ALERT_LIST"] = "alert_list";
    WidgetType["ACTIVITY_FEED"] = "activity_feed";
    WidgetType["QUICK_ACTIONS"] = "quick_actions";
    WidgetType["SYSTEM_STATUS"] = "system_status";
    WidgetType["PERFORMANCE_MONITOR"] = "performance_monitor";
})(WidgetType || (WidgetType = {}));
export var AdminQuickActionType;
(function (AdminQuickActionType) {
    AdminQuickActionType["CREATE_USER"] = "create_user";
    AdminQuickActionType["SUSPEND_USER"] = "suspend_user";
    AdminQuickActionType["APPROVE_CONTENT"] = "approve_content";
    AdminQuickActionType["REJECT_CONTENT"] = "reject_content";
    AdminQuickActionType["RESTART_SERVICE"] = "restart_service";
    AdminQuickActionType["CLEAR_CACHE"] = "clear_cache";
    AdminQuickActionType["SEND_NOTIFICATION"] = "send_notification";
    AdminQuickActionType["EXPORT_DATA"] = "export_data";
    AdminQuickActionType["GENERATE_REPORT"] = "generate_report";
    AdminQuickActionType["SCHEDULE_MAINTENANCE"] = "schedule_maintenance";
})(AdminQuickActionType || (AdminQuickActionType = {}));
export var QuickActionCategory;
(function (QuickActionCategory) {
    QuickActionCategory["USER_MANAGEMENT"] = "user_management";
    QuickActionCategory["CONTENT_MODERATION"] = "content_moderation";
    QuickActionCategory["SYSTEM_ADMINISTRATION"] = "system_administration";
    QuickActionCategory["ANALYTICS"] = "analytics";
    QuickActionCategory["SECURITY"] = "security";
})(QuickActionCategory || (QuickActionCategory = {}));
export var RealtimeConnectionStatus;
(function (RealtimeConnectionStatus) {
    RealtimeConnectionStatus["CONNECTED"] = "connected";
    RealtimeConnectionStatus["CONNECTING"] = "connecting";
    RealtimeConnectionStatus["DISCONNECTED"] = "disconnected";
    RealtimeConnectionStatus["ERROR"] = "error";
})(RealtimeConnectionStatus || (RealtimeConnectionStatus = {}));
//# sourceMappingURL=dashboard.types.js.map
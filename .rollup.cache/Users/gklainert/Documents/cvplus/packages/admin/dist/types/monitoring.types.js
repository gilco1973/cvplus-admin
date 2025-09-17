/**
 * System Monitoring Types
 *
 * Types for system health monitoring, performance tracking, and alerting.
  */
export var HealthStatus;
(function (HealthStatus) {
    HealthStatus["HEALTHY"] = "healthy";
    HealthStatus["WARNING"] = "warning";
    HealthStatus["DEGRADED"] = "degraded";
    HealthStatus["CRITICAL"] = "critical";
    HealthStatus["MAINTENANCE"] = "maintenance";
    HealthStatus["OFFLINE"] = "offline";
})(HealthStatus || (HealthStatus = {}));
export var IssueSeverity;
(function (IssueSeverity) {
    IssueSeverity["INFO"] = "info";
    IssueSeverity["LOW"] = "low";
    IssueSeverity["MEDIUM"] = "medium";
    IssueSeverity["HIGH"] = "high";
    IssueSeverity["CRITICAL"] = "critical";
})(IssueSeverity || (IssueSeverity = {}));
export var ImpactLevel;
(function (ImpactLevel) {
    ImpactLevel["MINIMAL"] = "minimal";
    ImpactLevel["LOW"] = "low";
    ImpactLevel["MEDIUM"] = "medium";
    ImpactLevel["HIGH"] = "high";
    ImpactLevel["SEVERE"] = "severe";
})(ImpactLevel || (ImpactLevel = {}));
export var ResolutionStatus;
(function (ResolutionStatus) {
    ResolutionStatus["PENDING"] = "pending";
    ResolutionStatus["IN_PROGRESS"] = "in_progress";
    ResolutionStatus["RESOLVED"] = "resolved";
    ResolutionStatus["ESCALATED"] = "escalated";
})(ResolutionStatus || (ResolutionStatus = {}));
export var DependencyType;
(function (DependencyType) {
    DependencyType["DATABASE"] = "database";
    DependencyType["CACHE"] = "cache";
    DependencyType["QUEUE"] = "queue";
    DependencyType["STORAGE"] = "storage";
    DependencyType["EXTERNAL_API"] = "external_api";
    DependencyType["MICROSERVICE"] = "microservice";
    DependencyType["CDN"] = "cdn";
})(DependencyType || (DependencyType = {}));
export var ProcessStatus;
(function (ProcessStatus) {
    ProcessStatus["RUNNING"] = "running";
    ProcessStatus["SLEEPING"] = "sleeping";
    ProcessStatus["STOPPED"] = "stopped";
    ProcessStatus["ZOMBIE"] = "zombie";
})(ProcessStatus || (ProcessStatus = {}));
export var ReplicationStatus;
(function (ReplicationStatus) {
    ReplicationStatus["HEALTHY"] = "healthy";
    ReplicationStatus["LAGGING"] = "lagging";
    ReplicationStatus["DISCONNECTED"] = "disconnected";
    ReplicationStatus["ERROR"] = "error";
})(ReplicationStatus || (ReplicationStatus = {}));
export var ExternalServiceType;
(function (ExternalServiceType) {
    ExternalServiceType["ANTHROPIC_API"] = "anthropic_api";
    ExternalServiceType["STRIPE_API"] = "stripe_api";
    ExternalServiceType["GOOGLE_APIS"] = "google_apis";
    ExternalServiceType["CALENDLY_API"] = "calendly_api";
    ExternalServiceType["EMAIL_SERVICE"] = "email_service";
    ExternalServiceType["CDN"] = "cdn";
    ExternalServiceType["MONITORING_SERVICE"] = "monitoring_service";
    ExternalServiceType["LOGGING_SERVICE"] = "logging_service";
})(ExternalServiceType || (ExternalServiceType = {}));
export var BackoffStrategy;
(function (BackoffStrategy) {
    BackoffStrategy["FIXED"] = "fixed";
    BackoffStrategy["LINEAR"] = "linear";
    BackoffStrategy["EXPONENTIAL"] = "exponential";
    BackoffStrategy["JITTER"] = "jitter";
})(BackoffStrategy || (BackoffStrategy = {}));
export var AuthType;
(function (AuthType) {
    AuthType["API_KEY"] = "api_key";
    AuthType["OAUTH2"] = "oauth2";
    AuthType["JWT"] = "jwt";
    AuthType["BASIC_AUTH"] = "basic_auth";
})(AuthType || (AuthType = {}));
export var ErrorType;
(function (ErrorType) {
    ErrorType["HTTP_4XX"] = "http_4xx";
    ErrorType["HTTP_5XX"] = "http_5xx";
    ErrorType["TIMEOUT"] = "timeout";
    ErrorType["CONNECTION_ERROR"] = "connection_error";
    ErrorType["VALIDATION_ERROR"] = "validation_error";
    ErrorType["BUSINESS_LOGIC_ERROR"] = "business_logic_error";
    ErrorType["INFRASTRUCTURE_ERROR"] = "infrastructure_error";
})(ErrorType || (ErrorType = {}));
export var AlertType;
(function (AlertType) {
    AlertType["SYSTEM_HEALTH"] = "system_health";
    AlertType["PERFORMANCE"] = "performance";
    AlertType["ERROR_RATE"] = "error_rate";
    AlertType["RESOURCE_USAGE"] = "resource_usage";
    AlertType["DEPENDENCY_FAILURE"] = "dependency_failure";
    AlertType["SECURITY_EVENT"] = "security_event";
    AlertType["SLA_BREACH"] = "sla_breach";
    AlertType["CAPACITY_WARNING"] = "capacity_warning";
})(AlertType || (AlertType = {}));
export var AlertSeverity;
(function (AlertSeverity) {
    AlertSeverity["INFO"] = "info";
    AlertSeverity["WARNING"] = "warning";
    AlertSeverity["ERROR"] = "error";
    AlertSeverity["CRITICAL"] = "critical";
    AlertSeverity["EMERGENCY"] = "emergency";
})(AlertSeverity || (AlertSeverity = {}));
export var AlertStatus;
(function (AlertStatus) {
    AlertStatus["ACTIVE"] = "active";
    AlertStatus["ACKNOWLEDGED"] = "acknowledged";
    AlertStatus["RESOLVED"] = "resolved";
    AlertStatus["SUPPRESSED"] = "suppressed";
    AlertStatus["ESCALATED"] = "escalated";
})(AlertStatus || (AlertStatus = {}));
export var ThresholdOperator;
(function (ThresholdOperator) {
    ThresholdOperator["GREATER_THAN"] = "gt";
    ThresholdOperator["GREATER_EQUAL"] = "gte";
    ThresholdOperator["LESS_THAN"] = "lt";
    ThresholdOperator["LESS_EQUAL"] = "lte";
    ThresholdOperator["EQUALS"] = "eq";
    ThresholdOperator["NOT_EQUALS"] = "ne";
})(ThresholdOperator || (ThresholdOperator = {}));
export var AlertActionType;
(function (AlertActionType) {
    AlertActionType["ACKNOWLEDGE"] = "acknowledge";
    AlertActionType["RESOLVE"] = "resolve";
    AlertActionType["ESCALATE"] = "escalate";
    AlertActionType["SUPPRESS"] = "suppress";
    AlertActionType["RESTART_SERVICE"] = "restart_service";
    AlertActionType["SCALE_UP"] = "scale_up";
    AlertActionType["FAILOVER"] = "failover";
    AlertActionType["NOTIFY_ONCALL"] = "notify_oncall";
})(AlertActionType || (AlertActionType = {}));
export var HealthCheckType;
(function (HealthCheckType) {
    HealthCheckType["HTTP"] = "http";
    HealthCheckType["TCP"] = "tcp";
    HealthCheckType["DATABASE"] = "database";
    HealthCheckType["CUSTOM"] = "custom";
    HealthCheckType["SYNTHETIC"] = "synthetic";
})(HealthCheckType || (HealthCheckType = {}));
export var AggregationType;
(function (AggregationType) {
    AggregationType["AVERAGE"] = "avg";
    AggregationType["MINIMUM"] = "min";
    AggregationType["MAXIMUM"] = "max";
    AggregationType["SUM"] = "sum";
    AggregationType["COUNT"] = "count";
    AggregationType["PERCENTILE"] = "percentile";
})(AggregationType || (AggregationType = {}));
export var NotificationType;
(function (NotificationType) {
    NotificationType["EMAIL"] = "email";
    NotificationType["SMS"] = "sms";
    NotificationType["SLACK"] = "slack";
    NotificationType["WEBHOOK"] = "webhook";
    NotificationType["PAGERDUTY"] = "pagerduty";
})(NotificationType || (NotificationType = {}));
export var WidgetType;
(function (WidgetType) {
    WidgetType["LINE_CHART"] = "line_chart";
    WidgetType["BAR_CHART"] = "bar_chart";
    WidgetType["PIE_CHART"] = "pie_chart";
    WidgetType["GAUGE"] = "gauge";
    WidgetType["TABLE"] = "table";
    WidgetType["SINGLE_STAT"] = "single_stat";
    WidgetType["HEAT_MAP"] = "heat_map";
})(WidgetType || (WidgetType = {}));
export var TimeRangePreset;
(function (TimeRangePreset) {
    TimeRangePreset["LAST_5_MINUTES"] = "last_5m";
    TimeRangePreset["LAST_15_MINUTES"] = "last_15m";
    TimeRangePreset["LAST_HOUR"] = "last_1h";
    TimeRangePreset["LAST_4_HOURS"] = "last_4h";
    TimeRangePreset["LAST_24_HOURS"] = "last_24h";
    TimeRangePreset["LAST_7_DAYS"] = "last_7d";
    TimeRangePreset["LAST_30_DAYS"] = "last_30d";
})(TimeRangePreset || (TimeRangePreset = {}));
export var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "debug";
    LogLevel["INFO"] = "info";
    LogLevel["WARNING"] = "warning";
    LogLevel["ERROR"] = "error";
    LogLevel["CRITICAL"] = "critical";
})(LogLevel || (LogLevel = {}));
export var BackupStatusType;
(function (BackupStatusType) {
    BackupStatusType["SUCCESS"] = "success";
    BackupStatusType["FAILED"] = "failed";
    BackupStatusType["IN_PROGRESS"] = "in_progress";
    BackupStatusType["SCHEDULED"] = "scheduled";
})(BackupStatusType || (BackupStatusType = {}));
export var TrendDirection;
(function (TrendDirection) {
    TrendDirection["UP"] = "up";
    TrendDirection["DOWN"] = "down";
    TrendDirection["STABLE"] = "stable";
})(TrendDirection || (TrendDirection = {}));
//# sourceMappingURL=monitoring.types.js.map
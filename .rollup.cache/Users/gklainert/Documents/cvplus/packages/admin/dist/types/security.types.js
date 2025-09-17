/**
 * Security Types
 *
 * Types for security auditing, compliance monitoring, and threat detection.
  */
export var ComplianceStatus;
(function (ComplianceStatus) {
    ComplianceStatus["COMPLIANT"] = "compliant";
    ComplianceStatus["PARTIAL"] = "partial";
    ComplianceStatus["NON_COMPLIANT"] = "non_compliant";
    ComplianceStatus["PENDING_REVIEW"] = "pending_review";
    ComplianceStatus["EXPIRED"] = "expired";
})(ComplianceStatus || (ComplianceStatus = {}));
export var RequirementStatus;
(function (RequirementStatus) {
    RequirementStatus["IMPLEMENTED"] = "implemented";
    RequirementStatus["PARTIALLY_IMPLEMENTED"] = "partially_implemented";
    RequirementStatus["NOT_IMPLEMENTED"] = "not_implemented";
    RequirementStatus["NOT_APPLICABLE"] = "not_applicable";
    RequirementStatus["UNDER_REVIEW"] = "under_review";
})(RequirementStatus || (RequirementStatus = {}));
export var EvidenceType;
(function (EvidenceType) {
    EvidenceType["DOCUMENT"] = "document";
    EvidenceType["SCREENSHOT"] = "screenshot";
    EvidenceType["POLICY"] = "policy";
    EvidenceType["PROCEDURE"] = "procedure";
    EvidenceType["LOG"] = "log";
    EvidenceType["CERTIFICATE"] = "certificate";
    EvidenceType["REPORT"] = "report";
})(EvidenceType || (EvidenceType = {}));
export var RiskLevel;
(function (RiskLevel) {
    RiskLevel["VERY_LOW"] = "very_low";
    RiskLevel["LOW"] = "low";
    RiskLevel["MEDIUM"] = "medium";
    RiskLevel["HIGH"] = "high";
    RiskLevel["VERY_HIGH"] = "very_high";
    RiskLevel["CRITICAL"] = "critical";
})(RiskLevel || (RiskLevel = {}));
export var DeadlineStatus;
(function (DeadlineStatus) {
    DeadlineStatus["ON_TRACK"] = "on_track";
    DeadlineStatus["AT_RISK"] = "at_risk";
    DeadlineStatus["OVERDUE"] = "overdue";
    DeadlineStatus["COMPLETED"] = "completed";
})(DeadlineStatus || (DeadlineStatus = {}));
export var Priority;
(function (Priority) {
    Priority["LOW"] = "low";
    Priority["MEDIUM"] = "medium";
    Priority["HIGH"] = "high";
    Priority["CRITICAL"] = "critical";
})(Priority || (Priority = {}));
export var AuditStatus;
(function (AuditStatus) {
    AuditStatus["SCHEDULED"] = "scheduled";
    AuditStatus["IN_PROGRESS"] = "in_progress";
    AuditStatus["COMPLETED"] = "completed";
    AuditStatus["CANCELLED"] = "cancelled";
    AuditStatus["FOLLOW_UP_REQUIRED"] = "follow_up_required";
})(AuditStatus || (AuditStatus = {}));
export var FindingSeverity;
(function (FindingSeverity) {
    FindingSeverity["INFO"] = "info";
    FindingSeverity["LOW"] = "low";
    FindingSeverity["MEDIUM"] = "medium";
    FindingSeverity["HIGH"] = "high";
    FindingSeverity["CRITICAL"] = "critical";
})(FindingSeverity || (FindingSeverity = {}));
export var FindingCategory;
(function (FindingCategory) {
    FindingCategory["ACCESS_CONTROL"] = "access_control";
    FindingCategory["DATA_PROTECTION"] = "data_protection";
    FindingCategory["NETWORK_SECURITY"] = "network_security";
    FindingCategory["APPLICATION_SECURITY"] = "application_security";
    FindingCategory["PHYSICAL_SECURITY"] = "physical_security";
    FindingCategory["OPERATIONAL_SECURITY"] = "operational_security";
    FindingCategory["COMPLIANCE"] = "compliance";
})(FindingCategory || (FindingCategory = {}));
export var ImpactLevel;
(function (ImpactLevel) {
    ImpactLevel["NEGLIGIBLE"] = "negligible";
    ImpactLevel["MINOR"] = "minor";
    ImpactLevel["MODERATE"] = "moderate";
    ImpactLevel["MAJOR"] = "major";
    ImpactLevel["SEVERE"] = "severe";
})(ImpactLevel || (ImpactLevel = {}));
export var LikelihoodLevel;
(function (LikelihoodLevel) {
    LikelihoodLevel["VERY_LOW"] = "very_low";
    LikelihoodLevel["LOW"] = "low";
    LikelihoodLevel["MEDIUM"] = "medium";
    LikelihoodLevel["HIGH"] = "high";
    LikelihoodLevel["VERY_HIGH"] = "very_high";
})(LikelihoodLevel || (LikelihoodLevel = {}));
export var FindingStatus;
(function (FindingStatus) {
    FindingStatus["OPEN"] = "open";
    FindingStatus["IN_PROGRESS"] = "in_progress";
    FindingStatus["RESOLVED"] = "resolved";
    FindingStatus["ACCEPTED_RISK"] = "accepted_risk";
    FindingStatus["FALSE_POSITIVE"] = "false_positive";
})(FindingStatus || (FindingStatus = {}));
export var CertificateStatus;
(function (CertificateStatus) {
    CertificateStatus["VALID"] = "valid";
    CertificateStatus["EXPIRED"] = "expired";
    CertificateStatus["EXPIRING_SOON"] = "expiring_soon";
    CertificateStatus["REVOKED"] = "revoked";
    CertificateStatus["SUSPENDED"] = "suspended";
})(CertificateStatus || (CertificateStatus = {}));
export var ThreatLevel;
(function (ThreatLevel) {
    ThreatLevel["GREEN"] = "green";
    ThreatLevel["YELLOW"] = "yellow";
    ThreatLevel["ORANGE"] = "orange";
    ThreatLevel["RED"] = "red";
    ThreatLevel["BLACK"] = "black";
})(ThreatLevel || (ThreatLevel = {}));
export var ThreatType;
(function (ThreatType) {
    ThreatType["MALWARE"] = "malware";
    ThreatType["PHISHING"] = "phishing";
    ThreatType["DDOS"] = "ddos";
    ThreatType["SQL_INJECTION"] = "sql_injection";
    ThreatType["XSS"] = "xss";
    ThreatType["BRUTE_FORCE"] = "brute_force";
    ThreatType["DATA_BREACH"] = "data_breach";
    ThreatType["INSIDER_THREAT"] = "insider_threat";
    ThreatType["APT"] = "apt";
    ThreatType["SOCIAL_ENGINEERING"] = "social_engineering";
})(ThreatType || (ThreatType = {}));
export var TrendDirection;
(function (TrendDirection) {
    TrendDirection["INCREASING"] = "increasing";
    TrendDirection["DECREASING"] = "decreasing";
    TrendDirection["STABLE"] = "stable";
})(TrendDirection || (TrendDirection = {}));
export var IncidentStatus;
(function (IncidentStatus) {
    IncidentStatus["DETECTED"] = "detected";
    IncidentStatus["INVESTIGATING"] = "investigating";
    IncidentStatus["CONTAINED"] = "contained";
    IncidentStatus["MITIGATED"] = "mitigated";
    IncidentStatus["RESOLVED"] = "resolved";
    IncidentStatus["CLOSED"] = "closed";
})(IncidentStatus || (IncidentStatus = {}));
export var SourceType;
(function (SourceType) {
    SourceType["EXTERNAL"] = "external";
    SourceType["INTERNAL"] = "internal";
    SourceType["UNKNOWN"] = "unknown";
})(SourceType || (SourceType = {}));
export var ResponseRole;
(function (ResponseRole) {
    ResponseRole["INCIDENT_COMMANDER"] = "incident_commander";
    ResponseRole["SECURITY_ANALYST"] = "security_analyst";
    ResponseRole["SYSTEM_ADMINISTRATOR"] = "system_administrator";
    ResponseRole["LEGAL_COUNSEL"] = "legal_counsel";
    ResponseRole["PUBLIC_RELATIONS"] = "public_relations";
    ResponseRole["EXECUTIVE_SPONSOR"] = "executive_sponsor";
})(ResponseRole || (ResponseRole = {}));
export var ActionStatus;
(function (ActionStatus) {
    ActionStatus["PENDING"] = "pending";
    ActionStatus["IN_PROGRESS"] = "in_progress";
    ActionStatus["COMPLETED"] = "completed";
    ActionStatus["CANCELLED"] = "cancelled";
    ActionStatus["BLOCKED"] = "blocked";
})(ActionStatus || (ActionStatus = {}));
export var CommunicationType;
(function (CommunicationType) {
    CommunicationType["INTERNAL_UPDATE"] = "internal_update";
    CommunicationType["STAKEHOLDER_NOTIFICATION"] = "stakeholder_notification";
    CommunicationType["CUSTOMER_COMMUNICATION"] = "customer_communication";
    CommunicationType["REGULATORY_REPORT"] = "regulatory_report";
    CommunicationType["MEDIA_STATEMENT"] = "media_statement";
})(CommunicationType || (CommunicationType = {}));
export var CostCategory;
(function (CostCategory) {
    CostCategory["INVESTIGATION"] = "investigation";
    CostCategory["REMEDIATION"] = "remediation";
    CostCategory["NOTIFICATION"] = "notification";
    CostCategory["LEGAL_FEES"] = "legal_fees";
    CostCategory["REGULATORY_FINES"] = "regulatory_fines";
    CostCategory["BUSINESS_DISRUPTION"] = "business_disruption";
    CostCategory["REPUTATION_RECOVERY"] = "reputation_recovery";
})(CostCategory || (CostCategory = {}));
export var FeedType;
(function (FeedType) {
    FeedType["IOC"] = "ioc";
    FeedType["YARA_RULES"] = "yara_rules";
    FeedType["SIGNATURES"] = "signatures";
    FeedType["REPUTATION"] = "reputation";
    FeedType["BEHAVIORAL"] = "behavioral";
})(FeedType || (FeedType = {}));
export var FeedStatus;
(function (FeedStatus) {
    FeedStatus["ACTIVE"] = "active";
    FeedStatus["INACTIVE"] = "inactive";
    FeedStatus["ERROR"] = "error";
    FeedStatus["MAINTENANCE"] = "maintenance";
})(FeedStatus || (FeedStatus = {}));
export var IndicatorType;
(function (IndicatorType) {
    IndicatorType["IP_ADDRESS"] = "ip_address";
    IndicatorType["DOMAIN"] = "domain";
    IndicatorType["URL"] = "url";
    IndicatorType["FILE_HASH"] = "file_hash";
    IndicatorType["EMAIL"] = "email";
    IndicatorType["USER_AGENT"] = "user_agent";
    IndicatorType["REGISTRY_KEY"] = "registry_key";
    IndicatorType["MUTEX"] = "mutex";
})(IndicatorType || (IndicatorType = {}));
export var CampaignStatus;
(function (CampaignStatus) {
    CampaignStatus["ACTIVE"] = "active";
    CampaignStatus["DORMANT"] = "dormant";
    CampaignStatus["CONCLUDED"] = "concluded";
    CampaignStatus["MONITORING"] = "monitoring";
})(CampaignStatus || (CampaignStatus = {}));
export var ActorType;
(function (ActorType) {
    ActorType["NATION_STATE"] = "nation_state";
    ActorType["CRIMINAL"] = "criminal";
    ActorType["HACKTIVIST"] = "hacktivist";
    ActorType["INSIDER"] = "insider";
    ActorType["SCRIPT_KIDDIE"] = "script_kiddie";
    ActorType["UNKNOWN"] = "unknown";
})(ActorType || (ActorType = {}));
export var SophisticationLevel;
(function (SophisticationLevel) {
    SophisticationLevel["MINIMAL"] = "minimal";
    SophisticationLevel["INTERMEDIATE"] = "intermediate";
    SophisticationLevel["ADVANCED"] = "advanced";
    SophisticationLevel["EXPERT"] = "expert";
    SophisticationLevel["INNOVATOR"] = "innovator";
})(SophisticationLevel || (SophisticationLevel = {}));
export var RecommendationCategory;
(function (RecommendationCategory) {
    RecommendationCategory["PREVENTION"] = "prevention";
    RecommendationCategory["DETECTION"] = "detection";
    RecommendationCategory["RESPONSE"] = "response";
    RecommendationCategory["RECOVERY"] = "recovery";
    RecommendationCategory["TRAINING"] = "training";
})(RecommendationCategory || (RecommendationCategory = {}));
export var AccessAction;
(function (AccessAction) {
    AccessAction["LOGIN"] = "login";
    AccessAction["LOGOUT"] = "logout";
    AccessAction["ACCESS_GRANTED"] = "access_granted";
    AccessAction["ACCESS_DENIED"] = "access_denied";
    AccessAction["PERMISSION_GRANTED"] = "permission_granted";
    AccessAction["PERMISSION_REVOKED"] = "permission_revoked";
    AccessAction["PASSWORD_CHANGE"] = "password_change";
    AccessAction["MFA_ENABLED"] = "mfa_enabled";
    AccessAction["MFA_DISABLED"] = "mfa_disabled";
})(AccessAction || (AccessAction = {}));
export var DeviceType;
(function (DeviceType) {
    DeviceType["DESKTOP"] = "desktop";
    DeviceType["LAPTOP"] = "laptop";
    DeviceType["MOBILE"] = "mobile";
    DeviceType["TABLET"] = "tablet";
    DeviceType["SERVER"] = "server";
    DeviceType["UNKNOWN"] = "unknown";
})(DeviceType || (DeviceType = {}));
export var AccessResult;
(function (AccessResult) {
    AccessResult["SUCCESS"] = "success";
    AccessResult["FAILURE"] = "failure";
    AccessResult["BLOCKED"] = "blocked";
    AccessResult["CHALLENGED"] = "challenged";
})(AccessResult || (AccessResult = {}));
export var AnomalyType;
(function (AnomalyType) {
    AnomalyType["UNUSUAL_LOGIN_TIME"] = "unusual_login_time";
    AnomalyType["UNUSUAL_LOCATION"] = "unusual_location";
    AnomalyType["IMPOSSIBLE_TRAVEL"] = "impossible_travel";
    AnomalyType["UNUSUAL_ACTIVITY_VOLUME"] = "unusual_activity_volume";
    AnomalyType["PRIVILEGE_ESCALATION"] = "privilege_escalation";
    AnomalyType["SUSPICIOUS_RESOURCE_ACCESS"] = "suspicious_resource_access";
    AnomalyType["CONCURRENT_SESSIONS"] = "concurrent_sessions";
})(AnomalyType || (AnomalyType = {}));
export var AnomalyStatus;
(function (AnomalyStatus) {
    AnomalyStatus["DETECTED"] = "detected";
    AnomalyStatus["INVESTIGATING"] = "investigating";
    AnomalyStatus["CONFIRMED"] = "confirmed";
    AnomalyStatus["FALSE_POSITIVE"] = "false_positive";
    AnomalyStatus["RESOLVED"] = "resolved";
})(AnomalyStatus || (AnomalyStatus = {}));
export var InvestigationStatus;
(function (InvestigationStatus) {
    InvestigationStatus["OPEN"] = "open";
    InvestigationStatus["IN_PROGRESS"] = "in_progress";
    InvestigationStatus["COMPLETED"] = "completed";
    InvestigationStatus["ESCALATED"] = "escalated";
    InvestigationStatus["CLOSED"] = "closed";
})(InvestigationStatus || (InvestigationStatus = {}));
export var PolicyType;
(function (PolicyType) {
    PolicyType["AUTHENTICATION"] = "authentication";
    PolicyType["AUTHORIZATION"] = "authorization";
    PolicyType["PASSWORD"] = "password";
    PolicyType["SESSION"] = "session";
    PolicyType["API_ACCESS"] = "api_access";
    PolicyType["DATA_ACCESS"] = "data_access";
})(PolicyType || (PolicyType = {}));
export var PolicyStatus;
(function (PolicyStatus) {
    PolicyStatus["ACTIVE"] = "active";
    PolicyStatus["INACTIVE"] = "inactive";
    PolicyStatus["DRAFT"] = "draft";
    PolicyStatus["DEPRECATED"] = "deprecated";
})(PolicyStatus || (PolicyStatus = {}));
export var ConditionType;
(function (ConditionType) {
    ConditionType["USER"] = "user";
    ConditionType["GROUP"] = "group";
    ConditionType["ROLE"] = "role";
    ConditionType["RESOURCE"] = "resource";
    ConditionType["TIME"] = "time";
    ConditionType["LOCATION"] = "location";
    ConditionType["DEVICE"] = "device";
    ConditionType["RISK_SCORE"] = "risk_score";
})(ConditionType || (ConditionType = {}));
export var ConditionOperator;
(function (ConditionOperator) {
    ConditionOperator["EQUALS"] = "equals";
    ConditionOperator["NOT_EQUALS"] = "not_equals";
    ConditionOperator["IN"] = "in";
    ConditionOperator["NOT_IN"] = "not_in";
    ConditionOperator["CONTAINS"] = "contains";
    ConditionOperator["STARTS_WITH"] = "starts_with";
    ConditionOperator["GREATER_THAN"] = "greater_than";
    ConditionOperator["LESS_THAN"] = "less_than";
})(ConditionOperator || (ConditionOperator = {}));
export var LogicalOperator;
(function (LogicalOperator) {
    LogicalOperator["AND"] = "and";
    LogicalOperator["OR"] = "or";
    LogicalOperator["NOT"] = "not";
})(LogicalOperator || (LogicalOperator = {}));
export var ActionType;
(function (ActionType) {
    ActionType["ALLOW"] = "allow";
    ActionType["DENY"] = "deny";
    ActionType["CHALLENGE"] = "challenge";
    ActionType["LOG"] = "log";
    ActionType["ALERT"] = "alert";
})(ActionType || (ActionType = {}));
export var ReviewType;
(function (ReviewType) {
    ReviewType["USER_ACCESS"] = "user_access";
    ReviewType["ROLE_ASSIGNMENT"] = "role_assignment";
    ReviewType["PRIVILEGED_ACCESS"] = "privileged_access";
    ReviewType["SERVICE_ACCOUNT"] = "service_account";
    ReviewType["EMERGENCY_ACCESS"] = "emergency_access";
})(ReviewType || (ReviewType = {}));
export var ReviewStatus;
(function (ReviewStatus) {
    ReviewStatus["SCHEDULED"] = "scheduled";
    ReviewStatus["IN_PROGRESS"] = "in_progress";
    ReviewStatus["COMPLETED"] = "completed";
    ReviewStatus["OVERDUE"] = "overdue";
    ReviewStatus["CANCELLED"] = "cancelled";
})(ReviewStatus || (ReviewStatus = {}));
export var ReviewItemType;
(function (ReviewItemType) {
    ReviewItemType["USER_PERMISSION"] = "user_permission";
    ReviewItemType["ROLE_ASSIGNMENT"] = "role_assignment";
    ReviewItemType["GROUP_MEMBERSHIP"] = "group_membership";
    ReviewItemType["RESOURCE_ACCESS"] = "resource_access";
})(ReviewItemType || (ReviewItemType = {}));
export var UsageFrequency;
(function (UsageFrequency) {
    UsageFrequency["NEVER"] = "never";
    UsageFrequency["RARELY"] = "rarely";
    UsageFrequency["OCCASIONALLY"] = "occasionally";
    UsageFrequency["FREQUENTLY"] = "frequently";
    UsageFrequency["ALWAYS"] = "always";
})(UsageFrequency || (UsageFrequency = {}));
export var RecommendedAction;
(function (RecommendedAction) {
    RecommendedAction["RETAIN"] = "retain";
    RecommendedAction["REMOVE"] = "remove";
    RecommendedAction["REDUCE"] = "reduce";
    RecommendedAction["REVIEW_LATER"] = "review_later";
    RecommendedAction["ESCALATE"] = "escalate";
})(RecommendedAction || (RecommendedAction = {}));
export var ReviewAction;
(function (ReviewAction) {
    ReviewAction["APPROVED"] = "approved";
    ReviewAction["REVOKED"] = "revoked";
    ReviewAction["MODIFIED"] = "modified";
    ReviewAction["DEFERRED"] = "deferred";
    ReviewAction["ESCALATED"] = "escalated";
})(ReviewAction || (ReviewAction = {}));
export var LogSourceType;
(function (LogSourceType) {
    LogSourceType["APPLICATION"] = "application";
    LogSourceType["SYSTEM"] = "system";
    LogSourceType["DATABASE"] = "database";
    LogSourceType["NETWORK"] = "network";
    LogSourceType["SECURITY"] = "security";
})(LogSourceType || (LogSourceType = {}));
export var LogSourceStatus;
(function (LogSourceStatus) {
    LogSourceStatus["ACTIVE"] = "active";
    LogSourceStatus["INACTIVE"] = "inactive";
    LogSourceStatus["ERROR"] = "error";
})(LogSourceStatus || (LogSourceStatus = {}));
export var LogAlertType;
(function (LogAlertType) {
    LogAlertType["MISSING_LOGS"] = "missing_logs";
    LogAlertType["LOG_TAMPERING"] = "log_tampering";
    LogAlertType["UNUSUAL_VOLUME"] = "unusual_volume";
    LogAlertType["COMPLIANCE_VIOLATION"] = "compliance_violation";
    LogAlertType["SYSTEM_ERROR"] = "system_error";
})(LogAlertType || (LogAlertType = {}));
export var ResourceType;
(function (ResourceType) {
    ResourceType["PERSONNEL"] = "personnel";
    ResourceType["TECHNOLOGY"] = "technology";
    ResourceType["TRAINING"] = "training";
    ResourceType["CONSULTANT"] = "consultant";
    ResourceType["TOOL"] = "tool";
})(ResourceType || (ResourceType = {}));
//# sourceMappingURL=security.types.js.map
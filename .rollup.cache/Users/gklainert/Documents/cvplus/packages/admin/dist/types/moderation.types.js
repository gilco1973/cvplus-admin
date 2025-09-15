/**
 * Content Moderation Types
 *
 * Types for content moderation functionality in the admin dashboard.
 */
export var ContentType;
(function (ContentType) {
    ContentType["CV_PROFILE"] = "cv_profile";
    ContentType["PUBLIC_PROFILE"] = "public_profile";
    ContentType["USER_CONTENT"] = "user_content";
    ContentType["MEDIA_UPLOAD"] = "media_upload";
    ContentType["COMMENTS"] = "comments";
    ContentType["MESSAGES"] = "messages";
    ContentType["TESTIMONIALS"] = "testimonials";
    ContentType["PORTFOLIO_ITEMS"] = "portfolio_items";
})(ContentType || (ContentType = {}));
export var ContentSource;
(function (ContentSource) {
    ContentSource["USER_GENERATED"] = "user_generated";
    ContentSource["IMPORTED"] = "imported";
    ContentSource["AI_GENERATED"] = "ai_generated";
    ContentSource["BULK_UPLOAD"] = "bulk_upload";
    ContentSource["API_SUBMISSION"] = "api_submission";
})(ContentSource || (ContentSource = {}));
export var RiskLevel;
(function (RiskLevel) {
    RiskLevel["LOW"] = "low";
    RiskLevel["MEDIUM"] = "medium";
    RiskLevel["HIGH"] = "high";
    RiskLevel["CRITICAL"] = "critical";
})(RiskLevel || (RiskLevel = {}));
export var ModerationPriority;
(function (ModerationPriority) {
    ModerationPriority[ModerationPriority["LOW"] = 1] = "LOW";
    ModerationPriority[ModerationPriority["NORMAL"] = 2] = "NORMAL";
    ModerationPriority[ModerationPriority["HIGH"] = 3] = "HIGH";
    ModerationPriority[ModerationPriority["URGENT"] = 4] = "URGENT";
    ModerationPriority[ModerationPriority["CRITICAL"] = 5] = "CRITICAL";
})(ModerationPriority || (ModerationPriority = {}));
export var ContentSensitivity;
(function (ContentSensitivity) {
    ContentSensitivity["PUBLIC"] = "public";
    ContentSensitivity["INTERNAL"] = "internal";
    ContentSensitivity["SENSITIVE"] = "sensitive";
    ContentSensitivity["CONFIDENTIAL"] = "confidential";
})(ContentSensitivity || (ContentSensitivity = {}));
export var ReasonType;
(function (ReasonType) {
    ReasonType["SPAM_DETECTION"] = "spam_detection";
    ReasonType["PROFANITY_FILTER"] = "profanity_filter";
    ReasonType["CONTENT_QUALITY"] = "content_quality";
    ReasonType["POLICY_VIOLATION"] = "policy_violation";
    ReasonType["DUPLICATE_CONTENT"] = "duplicate_content";
    ReasonType["SUSPICIOUS_ACTIVITY"] = "suspicious_activity";
    ReasonType["MALWARE_DETECTION"] = "malware_detection";
    ReasonType["COPYRIGHT_VIOLATION"] = "copyright_violation";
})(ReasonType || (ReasonType = {}));
export var FlagType;
(function (FlagType) {
    FlagType["INAPPROPRIATE_CONTENT"] = "inappropriate_content";
    FlagType["SPAM"] = "spam";
    FlagType["FALSE_INFORMATION"] = "false_information";
    FlagType["COPYRIGHT_INFRINGEMENT"] = "copyright_infringement";
    FlagType["MALWARE"] = "malware";
    FlagType["PHISHING"] = "phishing";
    FlagType["HARASSMENT"] = "harassment";
    FlagType["HATE_SPEECH"] = "hate_speech";
    FlagType["VIOLENCE"] = "violence";
    FlagType["ADULT_CONTENT"] = "adult_content";
})(FlagType || (FlagType = {}));
export var FlagSeverity;
(function (FlagSeverity) {
    FlagSeverity["INFO"] = "info";
    FlagSeverity["LOW"] = "low";
    FlagSeverity["MEDIUM"] = "medium";
    FlagSeverity["HIGH"] = "high";
    FlagSeverity["CRITICAL"] = "critical";
})(FlagSeverity || (FlagSeverity = {}));
export var RiskImpact;
(function (RiskImpact) {
    RiskImpact["NEGLIGIBLE"] = "negligible";
    RiskImpact["LOW"] = "low";
    RiskImpact["MEDIUM"] = "medium";
    RiskImpact["HIGH"] = "high";
    RiskImpact["SEVERE"] = "severe";
})(RiskImpact || (RiskImpact = {}));
export var ModerationDecision;
(function (ModerationDecision) {
    ModerationDecision["APPROVE"] = "approve";
    ModerationDecision["REJECT"] = "reject";
    ModerationDecision["APPROVE_WITH_EDITS"] = "approve_with_edits";
    ModerationDecision["FLAG_FOR_REVIEW"] = "flag_for_review";
    ModerationDecision["ESCALATE"] = "escalate";
    ModerationDecision["PENDING"] = "pending";
    ModerationDecision["REQUIRE_ADDITIONAL_INFO"] = "require_additional_info";
})(ModerationDecision || (ModerationDecision = {}));
export var ReviewQualityRating;
(function (ReviewQualityRating) {
    ReviewQualityRating[ReviewQualityRating["EXCELLENT"] = 5] = "EXCELLENT";
    ReviewQualityRating[ReviewQualityRating["GOOD"] = 4] = "GOOD";
    ReviewQualityRating[ReviewQualityRating["SATISFACTORY"] = 3] = "SATISFACTORY";
    ReviewQualityRating[ReviewQualityRating["NEEDS_IMPROVEMENT"] = 2] = "NEEDS_IMPROVEMENT";
    ReviewQualityRating[ReviewQualityRating["POOR"] = 1] = "POOR";
})(ReviewQualityRating || (ReviewQualityRating = {}));
export var ModerationStatus;
(function (ModerationStatus) {
    ModerationStatus["PENDING_AUTOMATED_REVIEW"] = "pending_automated_review";
    ModerationStatus["PENDING_HUMAN_REVIEW"] = "pending_human_review";
    ModerationStatus["IN_HUMAN_REVIEW"] = "in_human_review";
    ModerationStatus["AWAITING_SECOND_OPINION"] = "awaiting_second_opinion";
    ModerationStatus["ESCALATED"] = "escalated";
    ModerationStatus["APPROVED"] = "approved";
    ModerationStatus["REJECTED"] = "rejected";
    ModerationStatus["NEEDS_REVISION"] = "needs_revision";
    ModerationStatus["APPEALED"] = "appealed";
    ModerationStatus["PERMANENTLY_BANNED"] = "permanently_banned";
})(ModerationStatus || (ModerationStatus = {}));
export var AppealReason;
(function (AppealReason) {
    AppealReason["FALSE_POSITIVE"] = "false_positive";
    AppealReason["POLICY_MISINTERPRETATION"] = "policy_misinterpretation";
    AppealReason["CONTEXT_MISSING"] = "context_missing";
    AppealReason["TECHNICAL_ERROR"] = "technical_error";
    AppealReason["NEW_EVIDENCE"] = "new_evidence";
    AppealReason["CHANGED_CIRCUMSTANCES"] = "changed_circumstances";
})(AppealReason || (AppealReason = {}));
export var EvidenceType;
(function (EvidenceType) {
    EvidenceType["DOCUMENTATION"] = "documentation";
    EvidenceType["SCREENSHOT"] = "screenshot";
    EvidenceType["VIDEO"] = "video";
    EvidenceType["WITNESS_STATEMENT"] = "witness_statement";
    EvidenceType["EXPERT_OPINION"] = "expert_opinion";
    EvidenceType["LEGAL_DOCUMENT"] = "legal_document";
})(EvidenceType || (EvidenceType = {}));
export var AppealStatus;
(function (AppealStatus) {
    AppealStatus["SUBMITTED"] = "submitted";
    AppealStatus["UNDER_REVIEW"] = "under_review";
    AppealStatus["ADDITIONAL_INFO_REQUIRED"] = "additional_info_required";
    AppealStatus["APPROVED"] = "approved";
    AppealStatus["DENIED"] = "denied";
    AppealStatus["WITHDRAWN"] = "withdrawn";
})(AppealStatus || (AppealStatus = {}));
export var AppealDecision;
(function (AppealDecision) {
    AppealDecision["OVERTURN_ORIGINAL"] = "overturn_original";
    AppealDecision["UPHOLD_ORIGINAL"] = "uphold_original";
    AppealDecision["MODIFY_DECISION"] = "modify_decision";
    AppealDecision["REQUIRE_CHANGES"] = "require_changes";
})(AppealDecision || (AppealDecision = {}));
export var FlagStatus;
(function (FlagStatus) {
    FlagStatus["OPEN"] = "open";
    FlagStatus["UNDER_REVIEW"] = "under_review";
    FlagStatus["RESOLVED"] = "resolved";
    FlagStatus["DISMISSED"] = "dismissed";
    FlagStatus["ESCALATED"] = "escalated";
})(FlagStatus || (FlagStatus = {}));
export var ResolutionAction;
(function (ResolutionAction) {
    ResolutionAction["NO_ACTION"] = "no_action";
    ResolutionAction["CONTENT_REMOVED"] = "content_removed";
    ResolutionAction["CONTENT_EDITED"] = "content_edited";
    ResolutionAction["USER_WARNING"] = "user_warning";
    ResolutionAction["USER_SUSPENDED"] = "user_suspended";
    ResolutionAction["FALSE_FLAG"] = "false_flag";
})(ResolutionAction || (ResolutionAction = {}));
export var ConditionOperator;
(function (ConditionOperator) {
    ConditionOperator["EQUALS"] = "equals";
    ConditionOperator["NOT_EQUALS"] = "not_equals";
    ConditionOperator["CONTAINS"] = "contains";
    ConditionOperator["NOT_CONTAINS"] = "not_contains";
    ConditionOperator["STARTS_WITH"] = "starts_with";
    ConditionOperator["ENDS_WITH"] = "ends_with";
    ConditionOperator["GREATER_THAN"] = "greater_than";
    ConditionOperator["LESS_THAN"] = "less_than";
    ConditionOperator["BETWEEN"] = "between";
    ConditionOperator["IN"] = "in";
    ConditionOperator["NOT_IN"] = "not_in";
    ConditionOperator["REGEX"] = "regex";
})(ConditionOperator || (ConditionOperator = {}));
export var LogicalOperator;
(function (LogicalOperator) {
    LogicalOperator["AND"] = "and";
    LogicalOperator["OR"] = "or";
    LogicalOperator["NOT"] = "not";
})(LogicalOperator || (LogicalOperator = {}));
export var ActionType;
(function (ActionType) {
    ActionType["AUTO_APPROVE"] = "auto_approve";
    ActionType["AUTO_REJECT"] = "auto_reject";
    ActionType["ASSIGN_QUEUE"] = "assign_queue";
    ActionType["ASSIGN_MODERATOR"] = "assign_moderator";
    ActionType["SET_PRIORITY"] = "set_priority";
    ActionType["ADD_FLAG"] = "add_flag";
    ActionType["SEND_NOTIFICATION"] = "send_notification";
    ActionType["ESCALATE"] = "escalate";
    ActionType["REQUIRE_HUMAN_REVIEW"] = "require_human_review";
})(ActionType || (ActionType = {}));
export var AlertType;
(function (AlertType) {
    AlertType["SLA_BREACH"] = "sla_breach";
    AlertType["QUALITY_DROP"] = "quality_drop";
    AlertType["VOLUME_SPIKE"] = "volume_spike";
    AlertType["ACCURACY_DECLINE"] = "accuracy_decline";
    AlertType["RESOURCE_SHORTAGE"] = "resource_shortage";
    AlertType["POLICY_VIOLATION_SPIKE"] = "policy_violation_spike";
})(AlertType || (AlertType = {}));
export var AlertSeverity;
(function (AlertSeverity) {
    AlertSeverity["INFO"] = "info";
    AlertSeverity["WARNING"] = "warning";
    AlertSeverity["ERROR"] = "error";
    AlertSeverity["CRITICAL"] = "critical";
})(AlertSeverity || (AlertSeverity = {}));
export var HistoryAction;
(function (HistoryAction) {
    HistoryAction["ITEM_SUBMITTED"] = "item_submitted";
    HistoryAction["AUTOMATED_REVIEW"] = "automated_review";
    HistoryAction["ASSIGNED_MODERATOR"] = "assigned_moderator";
    HistoryAction["HUMAN_REVIEW"] = "human_review";
    HistoryAction["DECISION_MADE"] = "decision_made";
    HistoryAction["APPEAL_SUBMITTED"] = "appeal_submitted";
    HistoryAction["APPEAL_REVIEWED"] = "appeal_reviewed";
    HistoryAction["STATUS_CHANGED"] = "status_changed";
    HistoryAction["FLAG_ADDED"] = "flag_added";
    HistoryAction["FLAG_RESOLVED"] = "flag_resolved";
})(HistoryAction || (HistoryAction = {}));
//# sourceMappingURL=moderation.types.js.map
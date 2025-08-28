/**
 * User Management Types
 *
 * Types for user management functionality in the admin dashboard.
 */
export var UserSegment;
(function (UserSegment) {
    UserSegment["NEW_USERS"] = "new_users";
    UserSegment["ACTIVE_USERS"] = "active_users";
    UserSegment["DORMANT_USERS"] = "dormant_users";
    UserSegment["CHURNED_USERS"] = "churned_users";
    UserSegment["FREE_USERS"] = "free_users";
    UserSegment["PREMIUM_USERS"] = "premium_users";
    UserSegment["ENTERPRISE_USERS"] = "enterprise_users";
    UserSegment["POWER_USERS"] = "power_users";
    UserSegment["AT_RISK_USERS"] = "at_risk_users";
})(UserSegment || (UserSegment = {}));
export var UserActionType;
(function (UserActionType) {
    UserActionType["VIEW_USER"] = "view_user";
    UserActionType["EDIT_USER"] = "edit_user";
    UserActionType["SUSPEND_ACCOUNT"] = "suspend_account";
    UserActionType["REACTIVATE_ACCOUNT"] = "reactivate_account";
    UserActionType["DELETE_ACCOUNT"] = "delete_account";
    UserActionType["RESET_PASSWORD"] = "reset_password";
    UserActionType["UPDATE_PERMISSIONS"] = "update_permissions";
    UserActionType["UPGRADE_SUBSCRIPTION"] = "upgrade_subscription";
    UserActionType["DOWNGRADE_SUBSCRIPTION"] = "downgrade_subscription";
    UserActionType["CANCEL_SUBSCRIPTION"] = "cancel_subscription";
    UserActionType["REFUND_PAYMENT"] = "refund_payment";
    UserActionType["MERGE_ACCOUNTS"] = "merge_accounts";
    UserActionType["IMPERSONATE_USER"] = "impersonate_user";
    UserActionType["SEND_NOTIFICATION"] = "send_notification";
    UserActionType["EXPORT_USER_DATA"] = "export_user_data";
})(UserActionType || (UserActionType = {}));
export var UserAccountStatus;
(function (UserAccountStatus) {
    UserAccountStatus["ACTIVE"] = "active";
    UserAccountStatus["PENDING"] = "pending";
    UserAccountStatus["SUSPENDED"] = "suspended";
    UserAccountStatus["DISABLED"] = "disabled";
    UserAccountStatus["DELETED"] = "deleted";
    UserAccountStatus["FLAGGED"] = "flagged";
})(UserAccountStatus || (UserAccountStatus = {}));
export var UserSource;
(function (UserSource) {
    UserSource["DIRECT"] = "direct";
    UserSource["GOOGLE"] = "google";
    UserSource["SOCIAL"] = "social";
    UserSource["REFERRAL"] = "referral";
    UserSource["AFFILIATE"] = "affiliate";
    UserSource["PAID_ADS"] = "paid_ads";
    UserSource["ORGANIC_SEARCH"] = "organic_search";
    UserSource["EMAIL_CAMPAIGN"] = "email_campaign";
})(UserSource || (UserSource = {}));
export var UserLifecycleStage;
(function (UserLifecycleStage) {
    UserLifecycleStage["TRIAL"] = "trial";
    UserLifecycleStage["ONBOARDING"] = "onboarding";
    UserLifecycleStage["ACTIVE"] = "active";
    UserLifecycleStage["ENGAGED"] = "engaged";
    UserLifecycleStage["AT_RISK"] = "at_risk";
    UserLifecycleStage["DORMANT"] = "dormant";
    UserLifecycleStage["CHURNED"] = "churned";
    UserLifecycleStage["REACTIVATED"] = "reactivated";
})(UserLifecycleStage || (UserLifecycleStage = {}));
export var UserNoteType;
(function (UserNoteType) {
    UserNoteType["GENERAL"] = "general";
    UserNoteType["SUPPORT"] = "support";
    UserNoteType["BILLING"] = "billing";
    UserNoteType["SECURITY"] = "security";
    UserNoteType["COMPLIANCE"] = "compliance";
})(UserNoteType || (UserNoteType = {}));
export var UserNoteVisibility;
(function (UserNoteVisibility) {
    UserNoteVisibility["INTERNAL"] = "internal";
    UserNoteVisibility["TEAM"] = "team";
    UserNoteVisibility["SUPPORT_ONLY"] = "support_only";
})(UserNoteVisibility || (UserNoteVisibility = {}));
export var SecurityRiskLevel;
(function (SecurityRiskLevel) {
    SecurityRiskLevel["LOW"] = "low";
    SecurityRiskLevel["MEDIUM"] = "medium";
    SecurityRiskLevel["HIGH"] = "high";
    SecurityRiskLevel["CRITICAL"] = "critical";
})(SecurityRiskLevel || (SecurityRiskLevel = {}));
export var SecurityEventType;
(function (SecurityEventType) {
    SecurityEventType["UNUSUAL_LOGIN"] = "unusual_login";
    SecurityEventType["PASSWORD_CHANGE"] = "password_change";
    SecurityEventType["MFA_DISABLED"] = "mfa_disabled";
    SecurityEventType["SUSPICIOUS_ACTIVITY"] = "suspicious_activity";
    SecurityEventType["ACCOUNT_LOCKOUT"] = "account_lockout";
    SecurityEventType["PERMISSION_CHANGE"] = "permission_change";
})(SecurityEventType || (SecurityEventType = {}));
export var PaymentMethodType;
(function (PaymentMethodType) {
    PaymentMethodType["CREDIT_CARD"] = "credit_card";
    PaymentMethodType["DEBIT_CARD"] = "debit_card";
    PaymentMethodType["PAYPAL"] = "paypal";
    PaymentMethodType["BANK_TRANSFER"] = "bank_transfer";
    PaymentMethodType["APPLE_PAY"] = "apple_pay";
    PaymentMethodType["GOOGLE_PAY"] = "google_pay";
})(PaymentMethodType || (PaymentMethodType = {}));
export var TransactionType;
(function (TransactionType) {
    TransactionType["CHARGE"] = "charge";
    TransactionType["REFUND"] = "refund";
    TransactionType["CHARGEBACK"] = "chargeback";
    TransactionType["CREDIT"] = "credit";
    TransactionType["ADJUSTMENT"] = "adjustment";
})(TransactionType || (TransactionType = {}));
export var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["PENDING"] = "pending";
    TransactionStatus["COMPLETED"] = "completed";
    TransactionStatus["FAILED"] = "failed";
    TransactionStatus["CANCELLED"] = "cancelled";
    TransactionStatus["REFUNDED"] = "refunded";
})(TransactionStatus || (TransactionStatus = {}));
export var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus["DRAFT"] = "draft";
    InvoiceStatus["OPEN"] = "open";
    InvoiceStatus["PAID"] = "paid";
    InvoiceStatus["VOID"] = "void";
    InvoiceStatus["UNCOLLECTIBLE"] = "uncollectible";
})(InvoiceStatus || (InvoiceStatus = {}));
export var PaymentRiskLevel;
(function (PaymentRiskLevel) {
    PaymentRiskLevel["LOW"] = "low";
    PaymentRiskLevel["MEDIUM"] = "medium";
    PaymentRiskLevel["HIGH"] = "high";
    PaymentRiskLevel["BLOCKED"] = "blocked";
})(PaymentRiskLevel || (PaymentRiskLevel = {}));
export var SupportTier;
(function (SupportTier) {
    SupportTier["BASIC"] = "basic";
    SupportTier["PREMIUM"] = "premium";
    SupportTier["PRIORITY"] = "priority";
    SupportTier["ENTERPRISE"] = "enterprise";
})(SupportTier || (SupportTier = {}));
export var SupportCategory;
(function (SupportCategory) {
    SupportCategory["TECHNICAL"] = "technical";
    SupportCategory["BILLING"] = "billing";
    SupportCategory["ACCOUNT"] = "account";
    SupportCategory["FEATURE_REQUEST"] = "feature_request";
    SupportCategory["BUG_REPORT"] = "bug_report";
    SupportCategory["GENERAL"] = "general";
})(SupportCategory || (SupportCategory = {}));
export var SupportPriority;
(function (SupportPriority) {
    SupportPriority["LOW"] = "low";
    SupportPriority["MEDIUM"] = "medium";
    SupportPriority["HIGH"] = "high";
    SupportPriority["URGENT"] = "urgent";
    SupportPriority["CRITICAL"] = "critical";
})(SupportPriority || (SupportPriority = {}));
export var SupportTicketStatus;
(function (SupportTicketStatus) {
    SupportTicketStatus["OPEN"] = "open";
    SupportTicketStatus["IN_PROGRESS"] = "in_progress";
    SupportTicketStatus["WAITING_CUSTOMER"] = "waiting_customer";
    SupportTicketStatus["RESOLVED"] = "resolved";
    SupportTicketStatus["CLOSED"] = "closed";
    SupportTicketStatus["ESCALATED"] = "escalated";
})(SupportTicketStatus || (SupportTicketStatus = {}));
export var ContactMethod;
(function (ContactMethod) {
    ContactMethod["EMAIL"] = "email";
    ContactMethod["PHONE"] = "phone";
    ContactMethod["CHAT"] = "chat";
    ContactMethod["SMS"] = "sms";
})(ContactMethod || (ContactMethod = {}));
export var ActivityLevel;
(function (ActivityLevel) {
    ActivityLevel["INACTIVE"] = "inactive";
    ActivityLevel["LOW"] = "low";
    ActivityLevel["MEDIUM"] = "medium";
    ActivityLevel["HIGH"] = "high";
    ActivityLevel["POWER_USER"] = "power_user";
})(ActivityLevel || (ActivityLevel = {}));
export var FeatureProficiency;
(function (FeatureProficiency) {
    FeatureProficiency["BEGINNER"] = "beginner";
    FeatureProficiency["INTERMEDIATE"] = "intermediate";
    FeatureProficiency["ADVANCED"] = "advanced";
    FeatureProficiency["EXPERT"] = "expert";
})(FeatureProficiency || (FeatureProficiency = {}));
export var SessionFrequency;
(function (SessionFrequency) {
    SessionFrequency["DAILY"] = "daily";
    SessionFrequency["WEEKLY"] = "weekly";
    SessionFrequency["MONTHLY"] = "monthly";
    SessionFrequency["QUARTERLY"] = "quarterly";
    SessionFrequency["RARELY"] = "rarely";
})(SessionFrequency || (SessionFrequency = {}));
export var ChurnRiskLevel;
(function (ChurnRiskLevel) {
    ChurnRiskLevel["LOW"] = "low";
    ChurnRiskLevel["MEDIUM"] = "medium";
    ChurnRiskLevel["HIGH"] = "high";
    ChurnRiskLevel["CRITICAL"] = "critical";
})(ChurnRiskLevel || (ChurnRiskLevel = {}));
export var ValueSegment;
(function (ValueSegment) {
    ValueSegment["LOW_VALUE"] = "low_value";
    ValueSegment["MEDIUM_VALUE"] = "medium_value";
    ValueSegment["HIGH_VALUE"] = "high_value";
    ValueSegment["VIP"] = "vip";
    ValueSegment["ENTERPRISE"] = "enterprise";
})(ValueSegment || (ValueSegment = {}));
export var DatePreset;
(function (DatePreset) {
    DatePreset["TODAY"] = "today";
    DatePreset["YESTERDAY"] = "yesterday";
    DatePreset["LAST_7_DAYS"] = "last_7_days";
    DatePreset["LAST_30_DAYS"] = "last_30_days";
    DatePreset["LAST_90_DAYS"] = "last_90_days";
    DatePreset["LAST_YEAR"] = "last_year";
    DatePreset["CUSTOM"] = "custom";
})(DatePreset || (DatePreset = {}));
export var BulkOperationType;
(function (BulkOperationType) {
    BulkOperationType["BULK_SUSPEND"] = "bulk_suspend";
    BulkOperationType["BULK_REACTIVATE"] = "bulk_reactivate";
    BulkOperationType["BULK_DELETE"] = "bulk_delete";
    BulkOperationType["BULK_UPDATE_PERMISSIONS"] = "bulk_update_permissions";
    BulkOperationType["BULK_SEND_NOTIFICATION"] = "bulk_send_notification";
    BulkOperationType["BULK_EXPORT"] = "bulk_export";
    BulkOperationType["BULK_TAG"] = "bulk_tag";
    BulkOperationType["BULK_UNTAG"] = "bulk_untag";
})(BulkOperationType || (BulkOperationType = {}));
export var BulkOperationStatus;
(function (BulkOperationStatus) {
    BulkOperationStatus["PENDING"] = "pending";
    BulkOperationStatus["IN_PROGRESS"] = "in_progress";
    BulkOperationStatus["COMPLETED"] = "completed";
    BulkOperationStatus["FAILED"] = "failed";
    BulkOperationStatus["CANCELLED"] = "cancelled";
    BulkOperationStatus["PARTIALLY_COMPLETED"] = "partially_completed";
})(BulkOperationStatus || (BulkOperationStatus = {}));
//# sourceMappingURL=user-management.types.js.map
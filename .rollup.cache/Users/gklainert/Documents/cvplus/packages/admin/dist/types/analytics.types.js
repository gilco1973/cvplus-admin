/**
 * Analytics Types
 *
 * Types for business analytics, reporting, and insights in the admin dashboard.
 */
export var TimeRangePreset;
(function (TimeRangePreset) {
    TimeRangePreset["TODAY"] = "today";
    TimeRangePreset["YESTERDAY"] = "yesterday";
    TimeRangePreset["LAST_7_DAYS"] = "last_7_days";
    TimeRangePreset["LAST_30_DAYS"] = "last_30_days";
    TimeRangePreset["LAST_90_DAYS"] = "last_90_days";
    TimeRangePreset["LAST_YEAR"] = "last_year";
    TimeRangePreset["MONTH_TO_DATE"] = "month_to_date";
    TimeRangePreset["QUARTER_TO_DATE"] = "quarter_to_date";
    TimeRangePreset["YEAR_TO_DATE"] = "year_to_date";
    TimeRangePreset["CUSTOM"] = "custom";
})(TimeRangePreset || (TimeRangePreset = {}));
export var ComparisonType;
(function (ComparisonType) {
    ComparisonType["PREVIOUS_PERIOD"] = "previous_period";
    ComparisonType["SAME_PERIOD_LAST_YEAR"] = "same_period_last_year";
    ComparisonType["CUSTOM"] = "custom";
})(ComparisonType || (ComparisonType = {}));
export var ChangeDirection;
(function (ChangeDirection) {
    ChangeDirection["UP"] = "up";
    ChangeDirection["DOWN"] = "down";
    ChangeDirection["STABLE"] = "stable";
})(ChangeDirection || (ChangeDirection = {}));
export var MetricStatus;
(function (MetricStatus) {
    MetricStatus["EXCELLENT"] = "excellent";
    MetricStatus["GOOD"] = "good";
    MetricStatus["AVERAGE"] = "average";
    MetricStatus["BELOW_TARGET"] = "below_target";
    MetricStatus["CONCERNING"] = "concerning";
})(MetricStatus || (MetricStatus = {}));
export var RevenueType;
(function (RevenueType) {
    RevenueType["SUBSCRIPTION"] = "subscription";
    RevenueType["ONE_TIME"] = "one_time";
    RevenueType["USAGE_BASED"] = "usage_based";
    RevenueType["COMMISSION"] = "commission";
    RevenueType["ADVERTISING"] = "advertising";
})(RevenueType || (RevenueType = {}));
export var ForecastModel;
(function (ForecastModel) {
    ForecastModel["LINEAR_REGRESSION"] = "linear_regression";
    ForecastModel["ARIMA"] = "arima";
    ForecastModel["EXPONENTIAL_SMOOTHING"] = "exponential_smoothing";
    ForecastModel["MACHINE_LEARNING"] = "machine_learning";
})(ForecastModel || (ForecastModel = {}));
export var OptimizationArea;
(function (OptimizationArea) {
    OptimizationArea["PRICING"] = "pricing";
    OptimizationArea["CONVERSION"] = "conversion";
    OptimizationArea["RETENTION"] = "retention";
    OptimizationArea["UPSELLING"] = "upselling";
    OptimizationArea["COST_REDUCTION"] = "cost_reduction";
})(OptimizationArea || (OptimizationArea = {}));
export var EffortLevel;
(function (EffortLevel) {
    EffortLevel["LOW"] = "low";
    EffortLevel["MEDIUM"] = "medium";
    EffortLevel["HIGH"] = "high";
})(EffortLevel || (EffortLevel = {}));
export var Priority;
(function (Priority) {
    Priority["LOW"] = "low";
    Priority["MEDIUM"] = "medium";
    Priority["HIGH"] = "high";
    Priority["CRITICAL"] = "critical";
})(Priority || (Priority = {}));
export var ExperimentStatus;
(function (ExperimentStatus) {
    ExperimentStatus["PLANNING"] = "planning";
    ExperimentStatus["RUNNING"] = "running";
    ExperimentStatus["COMPLETED"] = "completed";
    ExperimentStatus["PAUSED"] = "paused";
    ExperimentStatus["CANCELLED"] = "cancelled";
})(ExperimentStatus || (ExperimentStatus = {}));
export var RecommendationType;
(function (RecommendationType) {
    RecommendationType["PRICING_OPTIMIZATION"] = "pricing_optimization";
    RecommendationType["FEATURE_BUNDLING"] = "feature_bundling";
    RecommendationType["CUSTOMER_SEGMENTATION"] = "customer_segmentation";
    RecommendationType["RETENTION_IMPROVEMENT"] = "retention_improvement";
    RecommendationType["CONVERSION_OPTIMIZATION"] = "conversion_optimization";
})(RecommendationType || (RecommendationType = {}));
export var PathOutcome;
(function (PathOutcome) {
    PathOutcome["CONVERSION"] = "conversion";
    PathOutcome["BOUNCE"] = "bounce";
    PathOutcome["INCOMPLETE"] = "incomplete";
    PathOutcome["ERROR"] = "error";
})(PathOutcome || (PathOutcome = {}));
export var ContentType;
(function (ContentType) {
    ContentType["CV"] = "cv";
    ContentType["PORTFOLIO"] = "portfolio";
    ContentType["BLOG_POST"] = "blog_post";
    ContentType["TUTORIAL"] = "tutorial";
    ContentType["TEMPLATE"] = "template";
})(ContentType || (ContentType = {}));
export var ContentRecommendationType;
(function (ContentRecommendationType) {
    ContentRecommendationType["TOPIC_OPTIMIZATION"] = "topic_optimization";
    ContentRecommendationType["FORMAT_OPTIMIZATION"] = "format_optimization";
    ContentRecommendationType["DISTRIBUTION_OPTIMIZATION"] = "distribution_optimization";
    ContentRecommendationType["QUALITY_IMPROVEMENT"] = "quality_improvement";
})(ContentRecommendationType || (ContentRecommendationType = {}));
export var ExperimentType;
(function (ExperimentType) {
    ExperimentType["HEADLINE_TEST"] = "headline_test";
    ExperimentType["FORMAT_TEST"] = "format_test";
    ExperimentType["TIMING_TEST"] = "timing_test";
    ExperimentType["DISTRIBUTION_TEST"] = "distribution_test";
})(ExperimentType || (ExperimentType = {}));
export var MetricFormat;
(function (MetricFormat) {
    MetricFormat["NUMBER"] = "number";
    MetricFormat["PERCENTAGE"] = "percentage";
    MetricFormat["CURRENCY"] = "currency";
    MetricFormat["DURATION"] = "duration";
    MetricFormat["RATE"] = "rate";
})(MetricFormat || (MetricFormat = {}));
export var InsightType;
(function (InsightType) {
    InsightType["OPPORTUNITY"] = "opportunity";
    InsightType["RISK"] = "risk";
    InsightType["ANOMALY"] = "anomaly";
    InsightType["TREND"] = "trend";
    InsightType["OPTIMIZATION"] = "optimization";
})(InsightType || (InsightType = {}));
export var InsightCategory;
(function (InsightCategory) {
    InsightCategory["REVENUE"] = "revenue";
    InsightCategory["USER_BEHAVIOR"] = "user_behavior";
    InsightCategory["PRODUCT"] = "product";
    InsightCategory["MARKETING"] = "marketing";
    InsightCategory["OPERATIONS"] = "operations";
})(InsightCategory || (InsightCategory = {}));
export var InsightImpact;
(function (InsightImpact) {
    InsightImpact["LOW"] = "low";
    InsightImpact["MEDIUM"] = "medium";
    InsightImpact["HIGH"] = "high";
    InsightImpact["CRITICAL"] = "critical";
})(InsightImpact || (InsightImpact = {}));
export var ReportFrequency;
(function (ReportFrequency) {
    ReportFrequency["DAILY"] = "daily";
    ReportFrequency["WEEKLY"] = "weekly";
    ReportFrequency["MONTHLY"] = "monthly";
    ReportFrequency["QUARTERLY"] = "quarterly";
})(ReportFrequency || (ReportFrequency = {}));
export var ReportFormat;
(function (ReportFormat) {
    ReportFormat["PDF"] = "pdf";
    ReportFormat["CSV"] = "csv";
    ReportFormat["JSON"] = "json";
    ReportFormat["EMAIL"] = "email";
})(ReportFormat || (ReportFormat = {}));
export var IntegrationType;
(function (IntegrationType) {
    IntegrationType["GOOGLE_ANALYTICS"] = "google_analytics";
    IntegrationType["MIXPANEL"] = "mixpanel";
    IntegrationType["AMPLITUDE"] = "amplitude";
    IntegrationType["SEGMENT"] = "segment";
    IntegrationType["CUSTOM"] = "custom";
})(IntegrationType || (IntegrationType = {}));
//# sourceMappingURL=analytics.types.js.map
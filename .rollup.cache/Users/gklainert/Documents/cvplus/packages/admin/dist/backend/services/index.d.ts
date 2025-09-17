/**
 * CVPlus Admin Backend Services
 *
 * Service layer for admin operations, data aggregation, and business logic.
 *
 * @author Gil Klainert
 * @version 1.0.0
  */
export { AdminDashboardService } from '../../services/admin-dashboard.service';
export { PerformanceMonitorService, type SystemPerformanceMetrics, type ProviderMetrics } from './performance-monitor.service';
export { AlertManagerService } from './alert-manager.service';
export { type SystemAlert, type AlertDashboard, type PerformanceAlert } from './performance-monitor.service';
export { JobMonitoringService, type JobProcessingStats, type JobDetails } from './job-monitoring.service';
export { ConfigurationTestService, type SystemConfiguration } from './configuration-test.service';
export { WebSearchService } from './web-search.service';
export { ComprehensivePolicyEnforcementService } from './comprehensive-policy-enforcement.service';
export type { PolicyCheckRequest, PolicyCheckResult, PolicyViolation, PolicyWarning, PolicyAction, UsageStats } from './comprehensive-policy-enforcement.service';
export * from './security';
/**
 * Available admin services
  */
export declare const ADMIN_SERVICES: {
    readonly dashboard: "AdminDashboardService";
    readonly userManagement: "UserManagementService";
    readonly contentModeration: "ContentModerationService";
    readonly systemMonitoring: "SystemMonitoringService";
    readonly businessAnalytics: "BusinessAnalyticsService";
    readonly securityAudit: "SecurityAuditService";
    readonly performanceMonitor: "PerformanceMonitorService";
    readonly analyticsEngine: "AnalyticsEngineService";
    readonly alertManager: "AlertManagerService";
    readonly jobMonitoring: "JobMonitoringService";
    readonly configurationTest: "ConfigurationTestService";
    readonly webSearch: "WebSearchService";
};
/**
 * Service categories
  */
export declare const SERVICE_CATEGORIES: {
    readonly MONITORING: readonly ["PerformanceMonitorService", "AlertManagerService", "JobMonitoringService"];
    readonly ANALYTICS: readonly ["AnalyticsEngineService", "AdminDashboardService"];
    readonly CONFIGURATION: readonly ["ConfigurationTestService"];
    readonly EXTERNAL: readonly ["WebSearchService"];
};
/**
 * Service dependencies
  */
export declare const SERVICE_DEPENDENCIES: {
    readonly firebase: readonly ["firebase-admin", "firebase"];
    readonly core: readonly ["@cvplus/core"];
    readonly auth: readonly ["@cvplus/auth"];
    readonly analytics: readonly ["@cvplus/analytics"];
};
//# sourceMappingURL=index.d.ts.map
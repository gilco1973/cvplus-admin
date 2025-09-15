/**
 * CVPlus Admin Backend Services
 * 
 * Service layer for admin operations, data aggregation, and business logic.
 * 
 * @author Gil Klainert
 * @version 1.0.0
 */

// ============================================================================
// SERVICE EXPORTS
// ============================================================================

// Main admin services
export { AdminDashboardService } from '../../services/admin-dashboard.service';

// Performance and monitoring services
export { PerformanceMonitorService, type SystemPerformanceMetrics, type ProviderMetrics } from './performance-monitor.service';
// export { AnalyticsEngineService, type BusinessMetrics, type QualityInsights, type UserBehaviorInsights } from '@cvplus/analytics/admin/services/analytics-engine.service'; // MIGRATED
export { AlertManagerService } from './alert-manager.service';
export { type SystemAlert, type AlertDashboard, type PerformanceAlert } from './performance-monitor.service';

// Job and system management services
export { JobMonitoringService, type JobProcessingStats, type JobDetails } from './job-monitoring.service';

// Configuration and testing services
export { ConfigurationTestService, type SystemConfiguration } from './configuration-test.service';
export { WebSearchService } from './web-search.service'; // PLACEHOLDER - MIGRATED TO @cvplus/core

// Multimedia admin testing services (placeholders - migrated to multimedia submodule)
export { PodcastGenerationService } from './podcast-generation.service'; // PLACEHOLDER - MIGRATED TO @cvplus/multimedia
export { VideoGenerationService } from './video-generation.service'; // PLACEHOLDER - MIGRATED TO @cvplus/multimedia
// ============================================================================
// SERVICE REGISTRY
// ============================================================================

/**
 * Available admin services
 */
export const ADMIN_SERVICES = {
  dashboard: 'AdminDashboardService',
  userManagement: 'UserManagementService',
  contentModeration: 'ContentModerationService', 
  systemMonitoring: 'SystemMonitoringService',
  businessAnalytics: 'BusinessAnalyticsService',
  securityAudit: 'SecurityAuditService',
  performanceMonitor: 'PerformanceMonitorService',
  analyticsEngine: 'AnalyticsEngineService',
  alertManager: 'AlertManagerService',
  jobMonitoring: 'JobMonitoringService',
  configurationTest: 'ConfigurationTestService',
  webSearch: 'WebSearchService',
  podcastGeneration: 'PodcastGenerationService',
  videoGeneration: 'VideoGenerationService'
} as const;

/**
 * Service categories
 */
export const SERVICE_CATEGORIES = {
  MONITORING: ['PerformanceMonitorService', 'AlertManagerService', 'JobMonitoringService'],
  ANALYTICS: ['AnalyticsEngineService', 'AdminDashboardService'],
  CONFIGURATION: ['ConfigurationTestService'],
  EXTERNAL: ['WebSearchService', 'PodcastGenerationService', 'VideoGenerationService']
} as const;

/**
 * Service dependencies
 */
export const SERVICE_DEPENDENCIES = {
  firebase: ['firebase-admin', 'firebase'],
  core: ['@cvplus/core'],
  auth: ['@cvplus/auth'],
  analytics: ['@cvplus/analytics']
} as const;
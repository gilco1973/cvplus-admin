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

// Re-export the main admin dashboard service from the services directory
export { AdminDashboardService } from '../../services/admin-dashboard.service';

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
  securityAudit: 'SecurityAuditService'
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
/**
 * Admin Dashboard Service
 *
 * Central service for managing the admin dashboard, aggregating data from all admin modules,
 * and providing real-time updates and quick actions.
  */
import type { AdminDashboardState, AdminDashboardConfig } from '../types/dashboard.types';
export declare class AdminDashboardService {
    private realtimeUpdates;
    private eventListeners;
    /**
     * Initialize admin dashboard with user permissions and configuration
      */
    initializeDashboard(adminUserId: string, dashboardConfig: AdminDashboardConfig): Promise<AdminDashboardState>;
    /**
     * Refresh dashboard data
      */
    refreshDashboard(dashboardId: string, adminUserId: string): Promise<AdminDashboardState>;
    /**
     * Aggregate data from all admin modules based on permissions
      */
    private aggregateDashboardData;
    /**
     * Generate system overview data
      */
    private generateSystemOverview;
    /**
     * Get admin permissions for user
      */
    private getAdminPermissions;
    /**
     * Get active alerts based on permissions
      */
    private getActiveAlerts;
    /**
     * Generate quick actions based on permissions and data
      */
    private generateQuickActions;
    /**
     * Set up real-time updates configuration
      */
    private setupRealtimeUpdates;
    /**
     * Start real-time data updates
      */
    private startRealtimeUpdates;
    /**
     * Stop real-time updates for user
      */
    private stopRealtimeUpdates;
    /**
     * Fetch real-time data for specified modules
      */
    private fetchRealtimeData;
    /**
     * Helper methods for fetching specific data
      */
    private fetchUserManagementData;
    private fetchContentModerationData;
    private fetchSystemMonitoringData;
    private fetchAnalyticsData;
    private fetchSecurityAuditData;
    private fetchSupportTicketsData;
    private fetchSystemHealthSummary;
    private fetchBusinessMetricsSummary;
    private fetchRecentSystemEvents;
    private fetchResourceUtilization;
    private fetchActiveUsersCount;
    private fetchPendingModerationCount;
    private fetchSystemAlertsCount;
    /**
     * Generate trends and insights based on business metrics
      */
    private generateTrendsAndInsights;
    /**
     * Event emission methods
      */
    private emitDashboardUpdate;
    private emitRealtimeUpdate;
    /**
     * Event subscription methods
      */
    addEventListener(event: string, callback: (data: any) => void): void;
    removeEventListener(event: string, callback: (data: any) => void): void;
    /**
     * Utility methods
      */
    private generateDashboardId;
    private getDashboard;
    /**
     * Cleanup method
      */
    dispose(): void;
}
//# sourceMappingURL=admin-dashboard.service.d.ts.map
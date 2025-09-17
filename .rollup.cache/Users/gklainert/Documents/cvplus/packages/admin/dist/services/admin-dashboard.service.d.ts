/**
 * Admin Dashboard Service
 *
 * REFACTORED: Now uses orchestrator pattern with specialized services
 * Maintains backward compatibility while following 200-line compliance
 *
 * @author Gil Klainert
 * @version 2.0.0
 */
import type { AdminDashboardState, AdminDashboardConfig, AdminDashboardData, SystemOverviewData } from '../types/dashboard.types';
export declare class AdminDashboardService {
    private isInitialized;
    private dataAggregator;
    private permissionValidator;
    private realtimeManager;
    private logger;
    constructor();
    /**
     * Initialize the service
     */
    initialize(): Promise<void>;
    /**
     * Cleanup the service
     */
    cleanup(): Promise<void>;
    /**
     * Initialize admin dashboard with user permissions and configuration
     */
    initializeDashboard(adminUserId: string, dashboardConfig: AdminDashboardConfig): Promise<AdminDashboardState>;
    /**
     * Get system overview for admin dashboard
     */
    getSystemOverview(adminUserId: string): Promise<SystemOverviewData>;
    /**
     * Refresh dashboard data
     */
    refreshDashboard(adminUserId: string): Promise<AdminDashboardData>;
    /**
     * Subscribe to real-time dashboard updates
     */
    subscribeToUpdates(adminUserId: string, callback: (data: any) => void): () => void;
    /**
     * Perform quick action
     */
    executeQuickAction(adminUserId: string, actionType: string, parameters: any): Promise<any>;
}
export default AdminDashboardService;
//# sourceMappingURL=admin-dashboard.service.d.ts.map
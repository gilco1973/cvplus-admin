/**
 * Admin Dashboard Service
 *
 * Central service for managing the admin dashboard, aggregating data from all admin modules,
 * and providing real-time updates and quick actions.
 */
import { AdminQuickActionType, QuickActionCategory, RealtimeConnectionStatus } from '../types/dashboard.types';
import { ADMIN_API_ENDPOINTS } from '../constants/admin.constants';
export class AdminDashboardService {
    constructor() {
        this.realtimeUpdates = new Map();
        this.eventListeners = new Map();
    }
    /**
     * Initialize admin dashboard with user permissions and configuration
     */
    async initializeDashboard(adminUserId, dashboardConfig) {
        try {
            // Verify admin permissions
            const permissions = await this.getAdminPermissions(adminUserId);
            if (!permissions.canAccessDashboard) {
                throw new Error('Insufficient permissions to access admin dashboard');
            }
            // Aggregate dashboard data based on permissions
            const dashboardData = await this.aggregateDashboardData(permissions, dashboardConfig);
            // Set up real-time updates
            const realtimeConfig = await this.setupRealtimeUpdates(adminUserId, dashboardConfig.realtimeModules);
            // Get active alerts
            const activeAlerts = await this.getActiveAlerts(permissions);
            // Generate quick actions based on permissions
            const quickActions = await this.generateQuickActions(permissions, dashboardData);
            const dashboard = {
                id: this.generateDashboardId(adminUserId),
                adminUser: adminUserId,
                permissions,
                data: dashboardData,
                alerts: activeAlerts,
                quickActions,
                realtimeConfig,
                lastUpdated: new Date(),
                config: dashboardConfig
            };
            // Start real-time data updates
            await this.startRealtimeUpdates(adminUserId, realtimeConfig);
            return dashboard;
        }
        catch (error) {
            console.error('Failed to initialize admin dashboard:', error);
            throw new Error(`Dashboard initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Refresh dashboard data
     */
    async refreshDashboard(dashboardId, adminUserId) {
        try {
            const existingDashboard = await this.getDashboard(dashboardId);
            if (!existingDashboard) {
                throw new Error('Dashboard not found');
            }
            // Re-aggregate data with latest information
            const updatedData = await this.aggregateDashboardData(existingDashboard.permissions, existingDashboard.config);
            // Update alerts
            const updatedAlerts = await this.getActiveAlerts(existingDashboard.permissions);
            // Update quick actions
            const updatedQuickActions = await this.generateQuickActions(existingDashboard.permissions, updatedData);
            const refreshedDashboard = {
                ...existingDashboard,
                data: updatedData,
                alerts: updatedAlerts,
                quickActions: updatedQuickActions,
                lastUpdated: new Date()
            };
            // Emit update event for real-time subscribers
            this.emitDashboardUpdate(dashboardId, refreshedDashboard);
            return refreshedDashboard;
        }
        catch (error) {
            console.error('Failed to refresh dashboard:', error);
            throw new Error(`Dashboard refresh failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Aggregate data from all admin modules based on permissions
     */
    async aggregateDashboardData(permissions, config) {
        const data = {
            overview: await this.generateSystemOverview(),
            modules: {}
        };
        try {
            // User management data
            if (permissions.canManageUsers) {
                data.modules.userManagement = await this.fetchUserManagementData();
            }
            // Content moderation data
            if (permissions.canModerateContent) {
                data.modules.contentModeration = await this.fetchContentModerationData();
            }
            // System monitoring data
            if (permissions.canMonitorSystem) {
                data.modules.systemMonitoring = await this.fetchSystemMonitoringData();
            }
            // Business analytics data
            if (permissions.canViewAnalytics) {
                data.modules.analytics = await this.fetchAnalyticsData();
            }
            // Security audit data
            if (permissions.canAuditSecurity) {
                data.modules.security = await this.fetchSecurityAuditData();
            }
            // Support tickets data
            if (permissions.canManageSupport) {
                data.modules.support = await this.fetchSupportTicketsData();
            }
        }
        catch (error) {
            console.error('Error aggregating dashboard data:', error);
            // Continue with partial data rather than failing completely
        }
        return data;
    }
    /**
     * Generate system overview data
     */
    async generateSystemOverview() {
        try {
            const [systemHealth, businessMetrics, recentEvents, resourceUtilization] = await Promise.all([
                this.fetchSystemHealthSummary(),
                this.fetchBusinessMetricsSummary(),
                this.fetchRecentSystemEvents(),
                this.fetchResourceUtilization()
            ]);
            return {
                systemHealth,
                businessMetrics,
                systemMetrics: {
                    uptime: systemHealth.uptime,
                    responseTime: systemHealth.averageResponseTime,
                    errorRate: systemHealth.errorRate,
                    resourceUtilization
                },
                recentEvents,
                trendsAndInsights: await this.generateTrendsAndInsights(businessMetrics)
            };
        }
        catch (error) {
            console.error('Error generating system overview:', error);
            throw error;
        }
    }
    /**
     * Get admin permissions for user
     */
    async getAdminPermissions(adminUserId) {
        try {
            const response = await fetch(`${ADMIN_API_ENDPOINTS.DASHBOARD}/permissions/${adminUserId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch permissions: ${response.statusText}`);
            }
            return await response.json();
        }
        catch (error) {
            console.error('Error fetching admin permissions:', error);
            throw error;
        }
    }
    /**
     * Get active alerts based on permissions
     */
    async getActiveAlerts(permissions) {
        try {
            const response = await fetch(`${ADMIN_API_ENDPOINTS.DASHBOARD}/alerts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ permissions })
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch alerts: ${response.statusText}`);
            }
            return await response.json();
        }
        catch (error) {
            console.error('Error fetching active alerts:', error);
            return []; // Return empty array on error
        }
    }
    /**
     * Generate quick actions based on permissions and data
     */
    async generateQuickActions(permissions, dashboardData) {
        const quickActions = [];
        // User management quick actions
        if (permissions.canManageUsers) {
            quickActions.push({
                id: 'create_user',
                label: 'Create User',
                icon: 'user-plus',
                action: AdminQuickActionType.CREATE_USER,
                permissions: ['users:create'],
                category: QuickActionCategory.USER_MANAGEMENT,
                priority: 1
            }, {
                id: 'bulk_user_operation',
                label: 'Bulk Operation',
                icon: 'users-cog',
                action: AdminQuickActionType.SUSPEND_USER,
                permissions: ['users:bulk_edit'],
                category: QuickActionCategory.USER_MANAGEMENT,
                priority: 2
            });
        }
        // Content moderation quick actions
        if (permissions.canModerateContent) {
            quickActions.push({
                id: 'review_content',
                label: 'Review Queue',
                icon: 'clipboard-list',
                action: AdminQuickActionType.APPROVE_CONTENT,
                permissions: ['content:moderate'],
                category: QuickActionCategory.CONTENT_MODERATION,
                priority: 1
            });
        }
        // System administration quick actions
        if (permissions.canMonitorSystem) {
            quickActions.push({
                id: 'system_health',
                label: 'System Health',
                icon: 'heart-pulse',
                action: AdminQuickActionType.RESTART_SERVICE,
                permissions: ['system:monitor'],
                category: QuickActionCategory.SYSTEM_ADMINISTRATION,
                priority: 1
            }, {
                id: 'clear_cache',
                label: 'Clear Cache',
                icon: 'trash',
                action: AdminQuickActionType.CLEAR_CACHE,
                permissions: ['system:manage'],
                category: QuickActionCategory.SYSTEM_ADMINISTRATION,
                priority: 3
            });
        }
        // Analytics quick actions
        if (permissions.canViewAnalytics) {
            quickActions.push({
                id: 'generate_report',
                label: 'Generate Report',
                icon: 'chart-bar',
                action: AdminQuickActionType.GENERATE_REPORT,
                permissions: ['analytics:export'],
                category: QuickActionCategory.ANALYTICS,
                priority: 2
            });
        }
        // Security quick actions
        if (permissions.canAuditSecurity) {
            quickActions.push({
                id: 'security_audit',
                label: 'Security Audit',
                icon: 'shield-check',
                action: AdminQuickActionType.EXPORT_DATA,
                permissions: ['security:audit'],
                category: QuickActionCategory.SECURITY,
                priority: 1
            });
        }
        // Sort by priority
        return quickActions.sort((a, b) => a.priority - b.priority);
    }
    /**
     * Set up real-time updates configuration
     */
    async setupRealtimeUpdates(adminUserId, modules) {
        return {
            enabled: true,
            modules,
            updateInterval: 30000, // 30 seconds
            maxRetries: 3,
            connectionStatus: RealtimeConnectionStatus.CONNECTING,
            lastUpdate: new Date()
        };
    }
    /**
     * Start real-time data updates
     */
    async startRealtimeUpdates(adminUserId, config) {
        if (!config.enabled)
            return;
        // Clear any existing update timers
        this.stopRealtimeUpdates(adminUserId);
        // Set up periodic updates for each module
        const updateTimer = setInterval(async () => {
            try {
                // Emit periodic updates
                this.emitRealtimeUpdate(adminUserId, {
                    timestamp: new Date(),
                    modules: config.modules,
                    data: await this.fetchRealtimeData(config.modules)
                });
            }
            catch (error) {
                console.error('Real-time update error:', error);
            }
        }, config.updateInterval);
        this.realtimeUpdates.set(adminUserId, updateTimer);
    }
    /**
     * Stop real-time updates for user
     */
    stopRealtimeUpdates(adminUserId) {
        const timer = this.realtimeUpdates.get(adminUserId);
        if (timer) {
            clearInterval(timer);
            this.realtimeUpdates.delete(adminUserId);
        }
    }
    /**
     * Fetch real-time data for specified modules
     */
    async fetchRealtimeData(modules) {
        const data = {};
        for (const module of modules) {
            try {
                switch (module) {
                    case 'system_health':
                        data[module] = await this.fetchSystemHealthSummary();
                        break;
                    case 'active_users':
                        data[module] = await this.fetchActiveUsersCount();
                        break;
                    case 'pending_moderation':
                        data[module] = await this.fetchPendingModerationCount();
                        break;
                    case 'system_alerts':
                        data[module] = await this.fetchSystemAlertsCount();
                        break;
                    default:
                        console.warn(`Unknown real-time module: ${module}`);
                }
            }
            catch (error) {
                console.error(`Error fetching real-time data for ${module}:`, error);
                data[module] = null;
            }
        }
        return data;
    }
    /**
     * Helper methods for fetching specific data
     */
    async fetchUserManagementData() {
        const response = await fetch(`${ADMIN_API_ENDPOINTS.USERS}/summary`);
        return response.json();
    }
    async fetchContentModerationData() {
        const response = await fetch(`${ADMIN_API_ENDPOINTS.MODERATION_STATS}`);
        return response.json();
    }
    async fetchSystemMonitoringData() {
        const response = await fetch(`${ADMIN_API_ENDPOINTS.SYSTEM_HEALTH}`);
        return response.json();
    }
    async fetchAnalyticsData() {
        const response = await fetch(`${ADMIN_API_ENDPOINTS.BUSINESS_METRICS}`);
        return response.json();
    }
    async fetchSecurityAuditData() {
        const response = await fetch(`${ADMIN_API_ENDPOINTS.SECURITY_OVERVIEW}`);
        return response.json();
    }
    async fetchSupportTicketsData() {
        const response = await fetch(`${ADMIN_API_ENDPOINTS.SUPPORT_STATS}`);
        return response.json();
    }
    async fetchSystemHealthSummary() {
        const response = await fetch(`${ADMIN_API_ENDPOINTS.SYSTEM_HEALTH}/summary`);
        return response.json();
    }
    async fetchBusinessMetricsSummary() {
        const response = await fetch(`${ADMIN_API_ENDPOINTS.BUSINESS_METRICS}/summary`);
        return response.json();
    }
    async fetchRecentSystemEvents() {
        const response = await fetch(`${ADMIN_API_ENDPOINTS.SYSTEM_LOGS}/recent?limit=10`);
        return response.json();
    }
    async fetchResourceUtilization() {
        const response = await fetch(`${ADMIN_API_ENDPOINTS.SYSTEM_METRICS}/resources`);
        return response.json();
    }
    async fetchActiveUsersCount() {
        const response = await fetch(`${ADMIN_API_ENDPOINTS.USERS}/active/count`);
        return response.json();
    }
    async fetchPendingModerationCount() {
        const response = await fetch(`${ADMIN_API_ENDPOINTS.MODERATION_QUEUE}/count`);
        return response.json();
    }
    async fetchSystemAlertsCount() {
        const response = await fetch(`${ADMIN_API_ENDPOINTS.SYSTEM_ALERTS}/active/count`);
        return response.json();
    }
    /**
     * Generate trends and insights based on business metrics
     */
    async generateTrendsAndInsights(businessMetrics) {
        // This would implement trend analysis and insight generation
        // For now, returning a basic structure
        return {
            userGrowthTrend: {
                period: 'last30days',
                data: [],
                trend: 'up',
                changePercentage: 12.5
            },
            performanceTrend: {
                period: 'last30days',
                data: [],
                trend: 'stable',
                changePercentage: 0.5
            },
            errorRateTrend: {
                period: 'last30days',
                data: [],
                trend: 'down',
                changePercentage: -5.2
            },
            revenueGrowthTrend: {
                period: 'last30days',
                data: [],
                trend: 'up',
                changePercentage: 8.7
            },
            insights: []
        };
    }
    /**
     * Event emission methods
     */
    emitDashboardUpdate(dashboardId, dashboard) {
        const listeners = this.eventListeners.get(`dashboard:${dashboardId}`);
        if (listeners) {
            listeners.forEach(callback => callback(dashboard));
        }
    }
    emitRealtimeUpdate(adminUserId, data) {
        const listeners = this.eventListeners.get(`realtime:${adminUserId}`);
        if (listeners) {
            listeners.forEach(callback => callback(data));
        }
    }
    /**
     * Event subscription methods
     */
    addEventListener(event, callback) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, new Set());
        }
        this.eventListeners.get(event).add(callback);
    }
    removeEventListener(event, callback) {
        const listeners = this.eventListeners.get(event);
        if (listeners) {
            listeners.delete(callback);
            if (listeners.size === 0) {
                this.eventListeners.delete(event);
            }
        }
    }
    /**
     * Utility methods
     */
    generateDashboardId(adminUserId) {
        return `dashboard_${adminUserId}_${Date.now()}`;
    }
    async getDashboard(dashboardId) {
        // Implementation would fetch from cache or storage
        // For now, return null to indicate not found
        return null;
    }
    /**
     * Cleanup method
     */
    dispose() {
        // Clear all real-time update timers
        this.realtimeUpdates.forEach((timer, userId) => {
            clearInterval(timer);
        });
        this.realtimeUpdates.clear();
        // Clear all event listeners
        this.eventListeners.clear();
    }
}
//# sourceMappingURL=admin-dashboard.service.js.map
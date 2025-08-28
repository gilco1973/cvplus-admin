/**
 * Performance Monitor Service
 *
 * Service for monitoring system performance metrics, provider availability,
 * and generating performance analytics for the admin dashboard.
 *
 * @author Gil Klainert
 * @version 1.0.0
 */
export interface SystemPerformanceMetrics {
    timestamp: Date;
    successRate: number;
    averageResponseTime: number;
    errorRate: number;
    systemUptime: number;
    providerMetrics: Record<string, ProviderMetrics>;
}
export interface ProviderMetrics {
    successes: number;
    failures: number;
    averageResponseTime: number;
    availability: number;
    cost: number;
}
export interface PerformanceTrend {
    metric: string;
    period: string;
    trend: 'increasing' | 'decreasing' | 'stable';
    changePercentage: number;
    dataPoints: Array<{
        timestamp: Date;
        value: number;
    }>;
}
export declare class PerformanceMonitorService {
    private db;
    constructor();
    /**
     * Calculate current system performance metrics
     */
    calculateSystemMetrics(timeRange: string): Promise<SystemPerformanceMetrics>;
    /**
     * Get performance trends over time
     */
    getPerformanceTrends(hours: number, granularity: '1h' | '6h' | '24h'): Promise<PerformanceTrend[]>;
    /**
     * Monitor system health and record metrics
     */
    recordSystemMetrics(): Promise<void>;
    /**
     * Get system uptime percentage
     */
    private calculateSystemUptime;
    /**
     * Check for performance alerts
     */
    private checkPerformanceAlerts;
    /**
     * Helper methods
     */
    private parseTimeRange;
    private getIntervalMs;
    private groupDataByInterval;
    private calculateTrend;
    private getDefaultMetrics;
}
//# sourceMappingURL=performance-monitor.service.d.ts.map
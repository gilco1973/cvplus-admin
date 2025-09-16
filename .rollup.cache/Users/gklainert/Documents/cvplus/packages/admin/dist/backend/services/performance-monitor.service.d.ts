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
export interface PerformanceAlert {
    id: string;
    type: 'performance' | 'availability' | 'quality' | 'error_rate';
    severity: 'low' | 'medium' | 'high' | 'critical';
    title: string;
    message: string;
    metrics: Record<string, number>;
    threshold: number;
    currentValue: number;
    timestamp: Date;
    provider?: string;
    service?: string;
    resolvedAt?: Date;
}
export interface SystemAlert {
    id: string;
    type: 'system' | 'security' | 'performance' | 'error';
    severity: 'info' | 'warning' | 'error' | 'critical';
    title: string;
    message: string;
    source: string;
    timestamp: Date;
    isResolved: boolean;
    resolvedAt?: Date;
    resolvedBy?: string;
    metadata?: Record<string, any>;
}
export interface AlertDashboard {
    activeAlerts: SystemAlert[];
    recentAlerts: SystemAlert[];
    alertsByType: Record<string, number>;
    alertsBySeverity: Record<string, number>;
    totalAlerts: number;
    resolvedToday: number;
    averageResolutionTime: number;
    lastUpdated: Date;
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
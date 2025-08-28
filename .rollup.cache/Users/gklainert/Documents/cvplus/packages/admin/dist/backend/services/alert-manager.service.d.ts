/**
 * Alert Manager Service
 *
 * Service for managing system alerts, notifications, and alert dashboard data.
 * Handles alert creation, escalation, and administrative alert monitoring.
 *
 * @author Gil Klainert
 * @version 1.0.0
 */
export interface SystemAlert {
    id?: string;
    type: 'performance' | 'security' | 'system' | 'business' | 'quality';
    severity: 'low' | 'medium' | 'high' | 'critical';
    title: string;
    message: string;
    details: Record<string, any>;
    timestamp: Date;
    source: string;
    status: 'active' | 'acknowledged' | 'resolved';
    acknowledgedBy?: string;
    acknowledgedAt?: Date;
    resolvedBy?: string;
    resolvedAt?: Date;
}
export interface AlertDashboard {
    alertSummary: {
        total: number;
        bySeverity: Record<string, number>;
        byType: Record<string, number>;
        byStatus: Record<string, number>;
    };
    activeAlerts: SystemAlert[];
    recentHistory: SystemAlert[];
    trends: {
        alertFrequency: Array<{
            date: Date;
            count: number;
        }>;
        resolutionTime: {
            average: number;
            trend: 'improving' | 'declining' | 'stable';
        };
    };
}
export declare class AlertManagerService {
    private db;
    constructor();
    /**
     * Get comprehensive alert dashboard data
     */
    getAlertDashboard(): Promise<AlertDashboard>;
    /**
     * Create a new system alert
     */
    createAlert(alert: Omit<SystemAlert, 'id' | 'timestamp' | 'status'>): Promise<string>;
    /**
     * Acknowledge an alert
     */
    acknowledgeAlert(alertId: string, acknowledgedBy: string): Promise<void>;
    /**
     * Resolve an alert
     */
    resolveAlert(alertId: string, resolvedBy: string, resolution?: string): Promise<void>;
    /**
     * Get active alerts
     */
    getActiveAlerts(): Promise<SystemAlert[]>;
    /**
     * Get recent alert history
     */
    getRecentAlerts(limit?: number): Promise<SystemAlert[]>;
    /**
     * Get alerts by criteria
     */
    getAlertsByCriteria(criteria: {
        type?: string;
        severity?: string;
        status?: string;
        startDate?: Date;
        endDate?: Date;
        limit?: number;
    }): Promise<SystemAlert[]>;
    /**
     * Monitor system for alert conditions
     */
    monitorSystemAlerts(): Promise<void>;
    /**
     * Private helper methods
     */
    private getAlertStatistics;
    private calculateAlertSummary;
    private getAlertTrends;
    private escalateAlert;
    private updateAlertCounters;
    private checkPerformanceAlerts;
    private checkSystemHealthAlerts;
    private checkBusinessAlerts;
    private checkSecurityAlerts;
    private getDefaultDashboard;
}
//# sourceMappingURL=alert-manager.service.d.ts.map
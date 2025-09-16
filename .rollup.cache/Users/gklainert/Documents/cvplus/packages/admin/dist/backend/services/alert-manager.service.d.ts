/**
 * Alert Manager Service
 *
 * Intelligent alert system for CVPlus video generation platform.
 * Monitors performance thresholds, quality degradation, error patterns,
 * and business metrics with automated escalation and response procedures.
 *
 * @author Gil Klainert
 * @version 1.0.0
  */
import { BusinessMetrics, QualityInsights } from '../../types/analytics.types';
export interface AlertRule {
    ruleId: string;
    name: string;
    description: string;
    type: 'performance' | 'quality' | 'business' | 'system' | 'security';
    metric: string;
    condition: 'above' | 'below' | 'equals' | 'change_rate';
    threshold: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
    enabled: boolean;
    cooldownMinutes: number;
    escalationRules: EscalationRule[];
    autoActions: AutoAction[];
    notificationChannels: NotificationChannel[];
}
export interface EscalationRule {
    escalationId: string;
    triggerAfterMinutes: number;
    severity: 'medium' | 'high' | 'critical';
    notificationChannels: NotificationChannel[];
    autoActions: AutoAction[];
}
export interface AutoAction {
    actionId: string;
    type: 'restart_service' | 'scale_resources' | 'switch_provider' | 'throttle_requests' | 'notify_team';
    parameters: Record<string, any>;
    conditions: string[];
}
export interface NotificationChannel {
    channelId: string;
    type: 'email' | 'slack' | 'sms' | 'webhook' | 'pagerduty';
    configuration: Record<string, any>;
    severity: ('low' | 'medium' | 'high' | 'critical')[];
}
export interface AlertInstance {
    alertId: string;
    ruleId: string;
    triggeredAt: Date;
    resolvedAt?: Date;
    status: 'active' | 'acknowledged' | 'resolved' | 'suppressed';
    severity: 'low' | 'medium' | 'high' | 'critical';
    metric: string;
    currentValue: number;
    threshold: number;
    message: string;
    context: Record<string, any>;
    escalationLevel: number;
    lastEscalatedAt?: Date;
    acknowledgedBy?: string;
    resolvedBy?: string;
    suppressedUntil?: Date;
    notificationsSent: NotificationRecord[];
    actionsExecuted: ActionRecord[];
    id?: string;
}
export interface NotificationRecord {
    sentAt: Date;
    channel: string;
    type: string;
    recipient: string;
    success: boolean;
    errorMessage?: string;
}
export interface ActionRecord {
    executedAt: Date;
    actionType: string;
    parameters: Record<string, any>;
    success: boolean;
    result?: any;
    errorMessage?: string;
}
export declare class AlertManagerService {
    private firestore;
    private readonly alertRulesCollection;
    private readonly alertInstancesCollection;
    private readonly alertHistoryCollection;
    private readonly defaultRules;
    constructor();
    /**
     * Initialize default alert rules if they don't exist
      */
    private initializeDefaultRules;
    /**
     * Check metrics against alert rules and trigger alerts if necessary
      */
    checkAlerts(metrics: {
        performance?: any;
        quality?: QualityInsights;
        business?: BusinessMetrics;
        system?: any;
    }): Promise<AlertInstance[]>;
    /**
     * Process escalation for active alerts
      */
    processEscalations(): Promise<void>;
    /**
     * Acknowledge an alert
      */
    acknowledgeAlert(alertId: string, acknowledgedBy: string): Promise<void>;
    /**
     * Resolve an alert
      */
    resolveAlert(alertId: string, resolvedBy: string, resolution?: string): Promise<void>;
    /**
     * Suppress an alert for a specified duration
      */
    suppressAlert(alertId: string, suppressedBy: string, durationMinutes: number): Promise<void>;
    /**
     * Get alert dashboard data
      */
    getAlertDashboard(): Promise<{
        activeAlerts: AlertInstance[];
        alertSummary: {
            total: number;
            bySeverity: Record<string, number>;
            byType: Record<string, number>;
        };
        recentHistory: AlertInstance[];
    }>;
    /**
     * Private helper methods
      */
    private extractMetricValue;
    private evaluateCondition;
    private getActiveAlert;
    private isOutOfCooldown;
    private createAlert;
    private generateAlertMessage;
    private processAlert;
    private checkEscalation;
    private escalateAlert;
    private sendNotification;
    private executeAutoAction;
    private resolveActiveAlert;
    private getAlertRule;
    private groupAlertsBySeverity;
    private groupAlertsByType;
    private sendEmailNotification;
    private sendSlackNotification;
    private sendSMSNotification;
    private sendWebhookNotification;
    private switchProvider;
    private throttleRequests;
    private restartService;
}
//# sourceMappingURL=alert-manager.service.d.ts.map
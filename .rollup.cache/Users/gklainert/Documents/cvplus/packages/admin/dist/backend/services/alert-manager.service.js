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
import * as admin from 'firebase-admin';
export class AlertManagerService {
    constructor() {
        this.alertRulesCollection = 'alert_rules';
        this.alertInstancesCollection = 'alert_instances';
        this.alertHistoryCollection = 'alert_history';
        // Default alert rules
        this.defaultRules = [
            {
                ruleId: 'slow_generation',
                name: 'Slow Video Generation',
                description: 'Video generation taking longer than expected',
                type: 'performance',
                metric: 'average_generation_time',
                condition: 'above',
                threshold: 90000, // 90 seconds
                severity: 'medium',
                enabled: true,
                cooldownMinutes: 15,
                escalationRules: [
                    {
                        escalationId: 'slow_generation_high',
                        triggerAfterMinutes: 30,
                        severity: 'high',
                        notificationChannels: [{ channelId: 'tech_team_slack', type: 'slack', configuration: {}, severity: ['high'] }],
                        autoActions: [{ actionId: 'switch_provider', type: 'switch_provider', parameters: {}, conditions: [] }]
                    }
                ],
                autoActions: [],
                notificationChannels: [{ channelId: 'alerts_email', type: 'email', configuration: {}, severity: ['medium', 'high'] }]
            },
            {
                ruleId: 'low_success_rate',
                name: 'Low Generation Success Rate',
                description: 'Video generation success rate below threshold',
                type: 'performance',
                metric: 'success_rate',
                condition: 'below',
                threshold: 0.95, // 95%
                severity: 'high',
                enabled: true,
                cooldownMinutes: 10,
                escalationRules: [
                    {
                        escalationId: 'low_success_critical',
                        triggerAfterMinutes: 20,
                        severity: 'critical',
                        notificationChannels: [{ channelId: 'oncall_pager', type: 'pagerduty', configuration: {}, severity: ['critical'] }],
                        autoActions: [{ actionId: 'enable_fallback', type: 'switch_provider', parameters: { enableAllProviders: true }, conditions: [] }]
                    }
                ],
                autoActions: [{ actionId: 'throttle_requests', type: 'throttle_requests', parameters: { rate: 0.5 }, conditions: [] }],
                notificationChannels: [{ channelId: 'tech_team_slack', type: 'slack', configuration: {}, severity: ['high'] }]
            },
            {
                ruleId: 'quality_degradation',
                name: 'Video Quality Degradation',
                description: 'Average video quality score below acceptable threshold',
                type: 'quality',
                metric: 'average_quality_score',
                condition: 'below',
                threshold: 8.0, // 8.0/10
                severity: 'medium',
                enabled: true,
                cooldownMinutes: 20,
                escalationRules: [],
                autoActions: [],
                notificationChannels: [{ channelId: 'quality_team_email', type: 'email', configuration: {}, severity: ['medium'] }]
            },
            {
                ruleId: 'user_satisfaction_drop',
                name: 'User Satisfaction Drop',
                description: 'User satisfaction score below acceptable level',
                type: 'quality',
                metric: 'user_satisfaction_score',
                condition: 'below',
                threshold: 4.0, // 4.0/5
                severity: 'medium',
                enabled: true,
                cooldownMinutes: 30,
                escalationRules: [],
                autoActions: [],
                notificationChannels: [{ channelId: 'product_team_slack', type: 'slack', configuration: {}, severity: ['medium'] }]
            },
            {
                ruleId: 'conversion_rate_drop',
                name: 'Conversion Rate Drop',
                description: 'Premium conversion rate below baseline',
                type: 'business',
                metric: 'premium_conversion_rate',
                condition: 'below',
                threshold: 0.50, // 50%
                severity: 'medium',
                enabled: true,
                cooldownMinutes: 60,
                escalationRules: [],
                autoActions: [],
                notificationChannels: [{ channelId: 'business_team_email', type: 'email', configuration: {}, severity: ['medium'] }]
            }
        ];
        this.firestore = admin.firestore();
        this.initializeDefaultRules();
    }
    /**
     * Initialize default alert rules if they don't exist
     */
    async initializeDefaultRules() {
        try {
            const rulesSnapshot = await this.firestore
                .collection(this.alertRulesCollection)
                .get();
            if (rulesSnapshot.empty) {
                for (const rule of this.defaultRules) {
                    await this.firestore
                        .collection(this.alertRulesCollection)
                        .doc(rule.ruleId)
                        .set(rule);
                }
            }
        }
        catch (error) {
        }
    }
    /**
     * Check metrics against alert rules and trigger alerts if necessary
     */
    async checkAlerts(metrics) {
        try {
            const triggeredAlerts = [];
            // Get all enabled alert rules
            const rulesSnapshot = await this.firestore
                .collection(this.alertRulesCollection)
                .where('enabled', '==', true)
                .get();
            const rules = rulesSnapshot.docs.map(doc => doc.data());
            for (const rule of rules) {
                const metricValue = this.extractMetricValue(metrics, rule.metric, rule.type);
                if (metricValue !== null && this.evaluateCondition(metricValue, rule.condition, rule.threshold)) {
                    // Check if alert is already active or in cooldown
                    const existingAlert = await this.getActiveAlert(rule.ruleId);
                    if (!existingAlert && await this.isOutOfCooldown(rule)) {
                        const alert = await this.createAlert(rule, metricValue, metrics);
                        triggeredAlerts.push(alert);
                        // Send notifications and execute auto actions
                        await this.processAlert(alert);
                    }
                }
                else {
                    // Check if we should resolve any active alerts for this rule
                    await this.resolveActiveAlert(rule.ruleId, 'condition_resolved');
                }
            }
            return triggeredAlerts;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Process escalation for active alerts
     */
    async processEscalations() {
        try {
            const activeAlertsSnapshot = await this.firestore
                .collection(this.alertInstancesCollection)
                .where('status', 'in', ['active', 'acknowledged'])
                .get();
            const activeAlerts = activeAlertsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            for (const alert of activeAlerts) {
                await this.checkEscalation(alert);
            }
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Acknowledge an alert
     */
    async acknowledgeAlert(alertId, acknowledgedBy) {
        try {
            await this.firestore
                .collection(this.alertInstancesCollection)
                .doc(alertId)
                .update({
                status: 'acknowledged',
                acknowledgedBy,
                acknowledgedAt: new Date()
            });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Resolve an alert
     */
    async resolveAlert(alertId, resolvedBy, resolution) {
        try {
            const updateData = {
                status: 'resolved',
                resolvedBy,
                resolvedAt: new Date()
            };
            if (resolution) {
                updateData.resolution = resolution;
            }
            await this.firestore
                .collection(this.alertInstancesCollection)
                .doc(alertId)
                .update(updateData);
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Suppress an alert for a specified duration
     */
    async suppressAlert(alertId, suppressedBy, durationMinutes) {
        try {
            const suppressedUntil = new Date(Date.now() + (durationMinutes * 60 * 1000));
            await this.firestore
                .collection(this.alertInstancesCollection)
                .doc(alertId)
                .update({
                status: 'suppressed',
                suppressedBy,
                suppressedAt: new Date(),
                suppressedUntil
            });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Get alert dashboard data
     */
    async getAlertDashboard() {
        try {
            // Get active alerts
            const activeAlertsSnapshot = await this.firestore
                .collection(this.alertInstancesCollection)
                .where('status', 'in', ['active', 'acknowledged'])
                .orderBy('triggeredAt', 'desc')
                .get();
            const activeAlerts = activeAlertsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Get recent history (last 24 hours)
            const dayAgo = new Date(Date.now() - (24 * 60 * 60 * 1000));
            const historySnapshot = await this.firestore
                .collection(this.alertInstancesCollection)
                .where('triggeredAt', '>=', dayAgo)
                .orderBy('triggeredAt', 'desc')
                .limit(50)
                .get();
            const recentHistory = historySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Calculate summary statistics
            const alertSummary = {
                total: activeAlerts.length,
                bySeverity: this.groupAlertsBySeverity(activeAlerts),
                byType: this.groupAlertsByType(activeAlerts)
            };
            return {
                activeAlerts,
                alertSummary,
                recentHistory
            };
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Private helper methods
     */
    extractMetricValue(metrics, metricName, type) {
        try {
            switch (type) {
                case 'performance':
                    if (metrics.performance) {
                        switch (metricName) {
                            case 'average_generation_time':
                                return metrics.performance.averageGenerationTime;
                            case 'success_rate':
                                return metrics.performance.successRate;
                            case 'error_rate':
                                return metrics.performance.errorRate;
                            default:
                                return null;
                        }
                    }
                    break;
                case 'quality':
                    if (metrics.quality) {
                        switch (metricName) {
                            case 'average_quality_score':
                                return metrics.quality.overallQualityScore;
                            case 'user_satisfaction_score':
                                return metrics.quality.satisfactionAnalysis.averageRating;
                            default:
                                return null;
                        }
                    }
                    break;
                case 'business':
                    if (metrics.business) {
                        switch (metricName) {
                            case 'premium_conversion_rate':
                                return metrics.business.conversionRates.userToPremium;
                            case 'revenue_per_user':
                                return metrics.business.revenuePerUser;
                            default:
                                return null;
                        }
                    }
                    break;
                default:
                    return null;
            }
        }
        catch (error) {
            return null;
        }
        return null;
    }
    evaluateCondition(value, condition, threshold) {
        switch (condition) {
            case 'above':
                return value > threshold;
            case 'below':
                return value < threshold;
            case 'equals':
                return Math.abs(value - threshold) < 0.001;
            default:
                return false;
        }
    }
    async getActiveAlert(ruleId) {
        try {
            const alertSnapshot = await this.firestore
                .collection(this.alertInstancesCollection)
                .where('ruleId', '==', ruleId)
                .where('status', 'in', ['active', 'acknowledged'])
                .limit(1)
                .get();
            return alertSnapshot.empty ? null : alertSnapshot.docs[0].data();
        }
        catch (error) {
            return null;
        }
    }
    async isOutOfCooldown(rule) {
        try {
            const cooldownTime = new Date(Date.now() - (rule.cooldownMinutes * 60 * 1000));
            const recentAlertSnapshot = await this.firestore
                .collection(this.alertInstancesCollection)
                .where('ruleId', '==', rule.ruleId)
                .where('triggeredAt', '>', cooldownTime)
                .limit(1)
                .get();
            return recentAlertSnapshot.empty;
        }
        catch (error) {
            return true;
        }
    }
    async createAlert(rule, metricValue, context) {
        const alertId = `${rule.ruleId}_${Date.now()}`;
        const alert = {
            alertId,
            ruleId: rule.ruleId,
            triggeredAt: new Date(),
            status: 'active',
            severity: rule.severity,
            metric: rule.metric,
            currentValue: metricValue,
            threshold: rule.threshold,
            message: this.generateAlertMessage(rule, metricValue),
            context,
            escalationLevel: 0,
            notificationsSent: [],
            actionsExecuted: []
        };
        await this.firestore
            .collection(this.alertInstancesCollection)
            .doc(alertId)
            .set(alert);
        return alert;
    }
    generateAlertMessage(rule, value) {
        return `${rule.name}: ${rule.metric} is ${value.toFixed(2)}, ${rule.condition} threshold of ${rule.threshold}`;
    }
    async processAlert(alert) {
        try {
            const rule = await this.getAlertRule(alert.ruleId);
            if (!rule)
                return;
            // Send notifications
            for (const channel of rule.notificationChannels) {
                if (channel.severity.includes(alert.severity)) {
                    await this.sendNotification(alert, channel);
                }
            }
            // Execute auto actions
            for (const action of rule.autoActions) {
                await this.executeAutoAction(alert, action);
            }
        }
        catch (error) {
        }
    }
    async checkEscalation(alert) {
        try {
            const rule = await this.getAlertRule(alert.ruleId);
            if (!rule || rule.escalationRules.length === 0)
                return;
            const alertAge = Date.now() - alert.triggeredAt.getTime();
            for (const escalation of rule.escalationRules) {
                const triggerTime = escalation.triggerAfterMinutes * 60 * 1000;
                if (alertAge >= triggerTime &&
                    alert.escalationLevel < rule.escalationRules.indexOf(escalation) + 1) {
                    await this.escalateAlert(alert, escalation);
                    break;
                }
            }
        }
        catch (error) {
        }
    }
    async escalateAlert(alert, escalation) {
        try {
            // Update alert with escalation info
            await this.firestore
                .collection(this.alertInstancesCollection)
                .doc(alert.id)
                .update({
                escalationLevel: alert.escalationLevel + 1,
                lastEscalatedAt: new Date(),
                severity: escalation.severity
            });
            // Send escalation notifications
            for (const channel of escalation.notificationChannels) {
                await this.sendNotification(alert, channel);
            }
            // Execute escalation actions
            for (const action of escalation.autoActions) {
                await this.executeAutoAction(alert, action);
            }
        }
        catch (error) {
        }
    }
    async sendNotification(alert, channel) {
        try {
            const notification = {
                sentAt: new Date(),
                channel: channel.channelId,
                type: channel.type,
                recipient: channel.configuration.recipient || 'default',
                success: false
            };
            // Implement notification sending based on channel type
            switch (channel.type) {
                case 'email':
                    notification.success = await this.sendEmailNotification(alert, channel);
                    break;
                case 'slack':
                    notification.success = await this.sendSlackNotification(alert, channel);
                    break;
                case 'sms':
                    notification.success = await this.sendSMSNotification(alert, channel);
                    break;
                case 'webhook':
                    notification.success = await this.sendWebhookNotification(alert, channel);
                    break;
                default:
                    notification.success = false;
                    notification.errorMessage = `Unsupported notification type: ${channel.type}`;
            }
            // Update alert with notification record
            await this.firestore
                .collection(this.alertInstancesCollection)
                .doc(alert.alertId)
                .update({
                notificationsSent: admin.firestore.FieldValue.arrayUnion(notification)
            });
        }
        catch (error) {
        }
    }
    async executeAutoAction(alert, action) {
        try {
            const actionRecord = {
                executedAt: new Date(),
                actionType: action.type,
                parameters: action.parameters,
                success: false
            };
            // Implement auto action execution based on action type
            switch (action.type) {
                case 'switch_provider':
                    actionRecord.success = await this.switchProvider(action.parameters);
                    break;
                case 'throttle_requests':
                    actionRecord.success = await this.throttleRequests(action.parameters);
                    break;
                case 'restart_service':
                    actionRecord.success = await this.restartService(action.parameters);
                    break;
                default:
                    actionRecord.success = false;
                    actionRecord.errorMessage = `Unsupported action type: ${action.type}`;
            }
            // Update alert with action record
            await this.firestore
                .collection(this.alertInstancesCollection)
                .doc(alert.alertId)
                .update({
                actionsExecuted: admin.firestore.FieldValue.arrayUnion(actionRecord)
            });
        }
        catch (error) {
        }
    }
    async resolveActiveAlert(ruleId, resolution) {
        try {
            const activeAlert = await this.getActiveAlert(ruleId);
            if (activeAlert) {
                await this.resolveAlert(activeAlert.alertId, 'system', resolution);
            }
        }
        catch (error) {
        }
    }
    async getAlertRule(ruleId) {
        try {
            const ruleDoc = await this.firestore
                .collection(this.alertRulesCollection)
                .doc(ruleId)
                .get();
            return ruleDoc.exists ? ruleDoc.data() : null;
        }
        catch (error) {
            return null;
        }
    }
    groupAlertsBySeverity(alerts) {
        return alerts.reduce((acc, alert) => {
            acc[alert.severity] = (acc[alert.severity] || 0) + 1;
            return acc;
        }, {});
    }
    groupAlertsByType(alerts) {
        return alerts.reduce((acc, alert) => {
            // Extract type from ruleId or use default
            const type = alert.ruleId.split('_')[0] || 'unknown';
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});
    }
    // Notification implementation methods (simplified)
    async sendEmailNotification(alert, channel) {
        return true; // Would implement actual email sending
    }
    async sendSlackNotification(alert, channel) {
        return true; // Would implement actual Slack API call
    }
    async sendSMSNotification(alert, channel) {
        return true; // Would implement actual SMS sending
    }
    async sendWebhookNotification(alert, channel) {
        return true; // Would implement actual webhook call
    }
    // Auto action implementation methods (simplified)
    async switchProvider(parameters) {
        return true; // Would implement actual provider switching
    }
    async throttleRequests(parameters) {
        return true; // Would implement actual request throttling
    }
    async restartService(parameters) {
        return true; // Would implement actual service restart
    }
}
//# sourceMappingURL=alert-manager.service.js.map
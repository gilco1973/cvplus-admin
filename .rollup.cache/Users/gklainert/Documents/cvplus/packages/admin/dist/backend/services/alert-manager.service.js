/**
 * Alert Manager Service
 *
 * Service for managing system alerts, notifications, and alert dashboard data.
 * Handles alert creation, escalation, and administrative alert monitoring.
 *
 * @author Gil Klainert
 * @version 1.0.0
 */
import * as admin from 'firebase-admin';
export class AlertManagerService {
    constructor() {
        this.db = admin.firestore();
    }
    /**
     * Get comprehensive alert dashboard data
     */
    async getAlertDashboard() {
        try {
            const [activeAlerts, recentHistory, alertStats] = await Promise.all([
                this.getActiveAlerts(),
                this.getRecentAlerts(50),
                this.getAlertStatistics()
            ]);
            const alertSummary = this.calculateAlertSummary(activeAlerts, recentHistory);
            const trends = await this.getAlertTrends();
            return {
                alertSummary,
                activeAlerts,
                recentHistory,
                trends
            };
        }
        catch (error) {
            console.error('Error getting alert dashboard:', error);
            return this.getDefaultDashboard();
        }
    }
    /**
     * Create a new system alert
     */
    async createAlert(alert) {
        try {
            const newAlert = {
                ...alert,
                timestamp: new Date(),
                status: 'active'
            };
            const docRef = await this.db.collection('system_alerts').add({
                ...newAlert,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            });
            // Check if alert needs immediate escalation
            if (alert.severity === 'critical') {
                await this.escalateAlert(docRef.id, newAlert);
            }
            // Update alert counters
            await this.updateAlertCounters(alert.type, alert.severity);
            console.log(`Alert created: ${alert.title} (${alert.severity})`);
            return docRef.id;
        }
        catch (error) {
            console.error('Error creating alert:', error);
            throw error;
        }
    }
    /**
     * Acknowledge an alert
     */
    async acknowledgeAlert(alertId, acknowledgedBy) {
        try {
            await this.db.collection('system_alerts').doc(alertId).update({
                status: 'acknowledged',
                acknowledgedBy,
                acknowledgedAt: admin.firestore.FieldValue.serverTimestamp()
            });
            console.log(`Alert acknowledged: ${alertId} by ${acknowledgedBy}`);
        }
        catch (error) {
            console.error('Error acknowledging alert:', error);
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
                resolvedAt: admin.firestore.FieldValue.serverTimestamp()
            };
            if (resolution) {
                updateData.resolution = resolution;
            }
            await this.db.collection('system_alerts').doc(alertId).update(updateData);
            console.log(`Alert resolved: ${alertId} by ${resolvedBy}`);
        }
        catch (error) {
            console.error('Error resolving alert:', error);
            throw error;
        }
    }
    /**
     * Get active alerts
     */
    async getActiveAlerts() {
        try {
            const query = await this.db
                .collection('system_alerts')
                .where('status', 'in', ['active', 'acknowledged'])
                .orderBy('severity', 'desc')
                .orderBy('timestamp', 'desc')
                .limit(100)
                .get();
            return query.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate() || new Date(),
                acknowledgedAt: doc.data().acknowledgedAt?.toDate(),
                resolvedAt: doc.data().resolvedAt?.toDate()
            }));
        }
        catch (error) {
            console.error('Error getting active alerts:', error);
            return [];
        }
    }
    /**
     * Get recent alert history
     */
    async getRecentAlerts(limit = 50) {
        try {
            const query = await this.db
                .collection('system_alerts')
                .orderBy('timestamp', 'desc')
                .limit(limit)
                .get();
            return query.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate() || new Date(),
                acknowledgedAt: doc.data().acknowledgedAt?.toDate(),
                resolvedAt: doc.data().resolvedAt?.toDate()
            }));
        }
        catch (error) {
            console.error('Error getting recent alerts:', error);
            return [];
        }
    }
    /**
     * Get alerts by criteria
     */
    async getAlertsByCriteria(criteria) {
        try {
            let query = this.db.collection('system_alerts');
            // Apply filters
            if (criteria.type) {
                query = query.where('type', '==', criteria.type);
            }
            if (criteria.severity) {
                query = query.where('severity', '==', criteria.severity);
            }
            if (criteria.status) {
                query = query.where('status', '==', criteria.status);
            }
            if (criteria.startDate) {
                query = query.where('timestamp', '>=', criteria.startDate);
            }
            if (criteria.endDate) {
                query = query.where('timestamp', '<=', criteria.endDate);
            }
            // Order and limit
            query = query.orderBy('timestamp', 'desc');
            if (criteria.limit) {
                query = query.limit(criteria.limit);
            }
            const result = await query.get();
            return result.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate() || new Date(),
                acknowledgedAt: doc.data().acknowledgedAt?.toDate(),
                resolvedAt: doc.data().resolvedAt?.toDate()
            }));
        }
        catch (error) {
            console.error('Error getting alerts by criteria:', error);
            return [];
        }
    }
    /**
     * Monitor system for alert conditions
     */
    async monitorSystemAlerts() {
        try {
            // Check system performance metrics
            await this.checkPerformanceAlerts();
            // Check system health
            await this.checkSystemHealthAlerts();
            // Check business metrics
            await this.checkBusinessAlerts();
            // Check security events
            await this.checkSecurityAlerts();
        }
        catch (error) {
            console.error('Error monitoring system alerts:', error);
        }
    }
    /**
     * Private helper methods
     */
    async getAlertStatistics() {
        try {
            const startOfMonth = new Date();
            startOfMonth.setDate(1);
            startOfMonth.setHours(0, 0, 0, 0);
            const monthlyQuery = await this.db
                .collection('system_alerts')
                .where('timestamp', '>=', startOfMonth)
                .get();
            const stats = {
                monthly: monthlyQuery.size,
                bySeverity: {},
                byType: {}
            };
            monthlyQuery.docs.forEach(doc => {
                const data = doc.data();
                // Count by severity
                const severity = data.severity || 'unknown';
                stats.bySeverity[severity] = (stats.bySeverity[severity] || 0) + 1;
                // Count by type
                const type = data.type || 'unknown';
                stats.byType[type] = (stats.byType[type] || 0) + 1;
            });
            return stats;
        }
        catch (error) {
            console.error('Error getting alert statistics:', error);
            return { monthly: 0, bySeverity: {}, byType: {} };
        }
    }
    calculateAlertSummary(activeAlerts, recentHistory) {
        const summary = {
            total: activeAlerts.length,
            bySeverity: {},
            byType: {},
            byStatus: {}
        };
        activeAlerts.forEach(alert => {
            // Count by severity
            summary.bySeverity[alert.severity] = (summary.bySeverity[alert.severity] || 0) + 1;
            // Count by type
            summary.byType[alert.type] = (summary.byType[alert.type] || 0) + 1;
            // Count by status
            summary.byStatus[alert.status] = (summary.byStatus[alert.status] || 0) + 1;
        });
        return summary;
    }
    async getAlertTrends() {
        try {
            const last30Days = new Date(Date.now() - (30 * 24 * 60 * 60 * 1000));
            // Get daily alert counts for the last 30 days
            const trendsQuery = await this.db
                .collection('system_alerts')
                .where('timestamp', '>=', last30Days)
                .orderBy('timestamp', 'asc')
                .get();
            // Group by day
            const dailyCounts = {};
            let totalResolutionTime = 0;
            let resolvedAlerts = 0;
            trendsQuery.docs.forEach(doc => {
                const data = doc.data();
                const date = data.timestamp?.toDate() || new Date();
                const dateKey = date.toISOString().split('T')[0];
                dailyCounts[dateKey] = (dailyCounts[dateKey] || 0) + 1;
                // Calculate resolution time if resolved
                if (data.status === 'resolved' && data.resolvedAt && data.timestamp) {
                    const resolutionTime = data.resolvedAt.toDate().getTime() - data.timestamp.toDate().getTime();
                    totalResolutionTime += resolutionTime;
                    resolvedAlerts++;
                }
            });
            // Convert to array format
            const alertFrequency = Object.entries(dailyCounts).map(([date, count]) => ({
                date: new Date(date),
                count
            }));
            const averageResolutionTime = resolvedAlerts > 0
                ? totalResolutionTime / resolvedAlerts / (1000 * 60 * 60) // Convert to hours
                : 0;
            return {
                alertFrequency,
                resolutionTime: {
                    average: averageResolutionTime,
                    trend: 'stable' // Would calculate actual trend
                }
            };
        }
        catch (error) {
            console.error('Error getting alert trends:', error);
            return {
                alertFrequency: [],
                resolutionTime: { average: 0, trend: 'stable' }
            };
        }
    }
    async escalateAlert(alertId, alert) {
        try {
            // Create escalation record
            await this.db.collection('alert_escalations').add({
                alertId,
                alertType: alert.type,
                severity: alert.severity,
                escalatedAt: admin.firestore.FieldValue.serverTimestamp(),
                reason: 'Critical severity automatic escalation'
            });
            console.log(`Alert escalated: ${alertId} - ${alert.title}`);
        }
        catch (error) {
            console.error('Error escalating alert:', error);
        }
    }
    async updateAlertCounters(type, severity) {
        try {
            const today = new Date().toISOString().split('T')[0];
            const counterRef = this.db.collection('alert_counters').doc(today);
            await counterRef.set({
                [`${type}_${severity}`]: admin.firestore.FieldValue.increment(1),
                [`total_${type}`]: admin.firestore.FieldValue.increment(1),
                [`total_${severity}`]: admin.firestore.FieldValue.increment(1),
                total: admin.firestore.FieldValue.increment(1),
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        }
        catch (error) {
            console.error('Error updating alert counters:', error);
        }
    }
    async checkPerformanceAlerts() {
        // Implementation would check actual performance metrics
        // This is a simplified example
    }
    async checkSystemHealthAlerts() {
        // Implementation would check system health metrics
    }
    async checkBusinessAlerts() {
        // Implementation would check business metrics for anomalies
    }
    async checkSecurityAlerts() {
        // Implementation would check security events
    }
    getDefaultDashboard() {
        return {
            alertSummary: {
                total: 0,
                bySeverity: {},
                byType: {},
                byStatus: {}
            },
            activeAlerts: [],
            recentHistory: [],
            trends: {
                alertFrequency: [],
                resolutionTime: { average: 0, trend: 'stable' }
            }
        };
    }
}
//# sourceMappingURL=alert-manager.service.js.map
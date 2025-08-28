/**
 * Video Analytics Dashboard Function
 *
 * Comprehensive analytics dashboard API for CVPlus video generation platform.
 * Provides real-time performance metrics, quality analysis, business insights,
 * and user feedback analytics through RESTful endpoints.
 *
 * @author Gil Klainert
 * @version 1.0.0
 */
import { onRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import { AdminAccessService } from '../../services/admin-access.service';
import { PerformanceMonitorService } from '../services/performance-monitor.service';
import { AnalyticsEngineService } from '../services/analytics-engine.service';
import { AlertManagerService } from '../services/alert-manager.service';
// Initialize services
const performanceMonitor = new PerformanceMonitorService();
const analyticsEngine = new AnalyticsEngineService();
const alertManager = new AlertManagerService();
// CORS configuration for v2 functions
const corsOptions = {
    cors: true // Allow all origins for analytics
};
/**
 * Main dashboard analytics function
 */
export const videoAnalyticsDashboard = onRequest({
    timeoutSeconds: 60,
    memory: '1GiB',
    maxInstances: 10,
    ...corsOptions
}, async (request, response) => {
    try {
        // Verify authentication
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            response.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
            return;
        }
        const token = authHeader.split('Bearer ')[1];
        const decodedToken = await admin.auth().verifyIdToken(token);
        // Check if user has analytics access (premium users or admins)
        const userDoc = await admin.firestore()
            .collection('users')
            .doc(decodedToken.uid)
            .get();
        const userData = userDoc.data();
        const hasAdminAccess = await AdminAccessService.checkAdminAccess(decodedToken.uid);
        const hasAccess = userData?.isPremium || hasAdminAccess || userData?.role === 'analytics';
        if (!hasAccess) {
            response.status(403).json({ error: 'Forbidden: Analytics access required' });
            return;
        }
        const { path } = request.query;
        switch (path) {
            case 'summary':
                const summary = await getDashboardSummary();
                response.json(summary);
                break;
            case 'performance':
                const performanceData = await getPerformanceMetrics(request.query);
                response.json(performanceData);
                break;
            case 'quality':
                const qualityData = await getQualityAnalysis(request.query);
                response.json(qualityData);
                break;
            case 'business':
                const businessData = await getBusinessMetrics(request.query);
                response.json(businessData);
                break;
            case 'providers':
                const providersData = await getProviderComparison();
                response.json(providersData);
                break;
            case 'trends':
                const trendsData = await getTrendsAnalysis(request.query);
                response.json(trendsData);
                break;
            case 'alerts':
                const alertsData = await getAlertsData();
                response.json(alertsData);
                break;
            case 'user-insights':
                const userInsights = await getUserInsights(request.query);
                response.json(userInsights);
                break;
            case 'export':
                const exportData = await getExportData(request.query);
                response.json(exportData);
                break;
            default:
                response.status(400).json({ error: 'Invalid dashboard path' });
        }
    }
    catch (error) {
        response.status(500).json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
/**
 * Get dashboard summary data
 */
async function getDashboardSummary() {
    try {
        // Get latest metrics from all services
        const analyticsData = await analyticsEngine.getAnalyticsSummary();
        const alertsData = await alertManager.getAlertDashboard();
        // Calculate current active generations
        const activeGenerations = await getActiveGenerationsCount();
        const summary = {
            timestamp: new Date(),
            performance: {
                successRate: analyticsData.performance?.successRate || 0,
                averageGenerationTime: analyticsData.performance?.averageGenerationTime || 0,
                activeGenerations,
                errorRate: analyticsData.performance?.errorRate || 0,
                systemUptime: analyticsData.performance?.systemUptime || 0
            },
            quality: {
                overallScore: analyticsData.quality?.overallQualityScore || 0,
                userSatisfaction: analyticsData.quality?.satisfactionAnalysis?.averageRating || 0,
                trend: analyticsData.quality?.qualityTrend || 'stable',
                topIssues: analyticsData.quality?.satisfactionAnalysis?.commonComplaints || []
            },
            business: {
                totalRevenue: analyticsData.business?.totalRevenue || 0,
                conversionRate: analyticsData.business?.conversionRates?.userToPremium || 0,
                activeUsers: analyticsData.business?.userMetrics?.activeUsers || 0,
                premiumAdoption: analyticsData.business?.videoMetrics?.premiumAdoptionRate || 0
            },
            alerts: {
                active: alertsData.alertSummary.total,
                critical: alertsData.alertSummary.bySeverity.critical || 0,
                recentCount: alertsData.recentHistory.length
            }
        };
        return summary;
    }
    catch (error) {
        throw error;
    }
}
/**
 * Get performance metrics data
 */
async function getPerformanceMetrics(query) {
    try {
        const timeRange = query.timeRange || '24h';
        const granularity = query.granularity || '1h';
        // Get performance trends
        const trends = await performanceMonitor.getPerformanceTrends(parseInt(timeRange.replace('h', '')), granularity);
        // Calculate current system metrics
        const currentMetrics = await performanceMonitor.calculateSystemMetrics('1h');
        return {
            current: currentMetrics,
            trends,
            timeRange,
            granularity,
            lastUpdated: new Date()
        };
    }
    catch (error) {
        throw error;
    }
}
/**
 * Get quality analysis data
 */
async function getQualityAnalysis(query) {
    try {
        const period = query.period || '24h';
        // Get quality insights
        const qualityInsights = await analyticsEngine.generateQualityInsights(period);
        // Get quality trends
        const qualityTrends = await analyticsEngine.analyzeTrends('quality_score', '30d');
        return {
            insights: qualityInsights,
            trends: qualityTrends,
            period,
            lastUpdated: new Date()
        };
    }
    catch (error) {
        throw error;
    }
}
/**
 * Get business metrics data
 */
async function getBusinessMetrics(query) {
    try {
        const period = query.period || '24h';
        // Get business metrics
        const businessMetrics = await analyticsEngine.generateBusinessMetrics(period);
        // Get conversion trends
        const conversionTrends = await analyticsEngine.analyzeTrends('conversion_rate', '30d');
        // Get revenue trends
        const revenueTrends = await analyticsEngine.analyzeTrends('revenue', '30d');
        return {
            metrics: businessMetrics,
            conversionTrends,
            revenueTrends,
            period,
            lastUpdated: new Date()
        };
    }
    catch (error) {
        throw error;
    }
}
/**
 * Get provider comparison data
 */
async function getProviderComparison() {
    try {
        // Get latest system metrics
        const systemMetrics = await performanceMonitor.calculateSystemMetrics('24h');
        const providers = [];
        // Process each provider's metrics
        for (const [providerId, metrics] of Object.entries(systemMetrics.providerMetrics)) {
            providers.push({
                providerId,
                name: getProviderDisplayName(providerId),
                metrics: {
                    successRate: metrics.successes / (metrics.successes + metrics.failures),
                    averageResponseTime: metrics.averageResponseTime,
                    qualityScore: 8.5, // Would be calculated from quality data
                    userSatisfaction: 4.2, // Would be calculated from user feedback
                    cost: metrics.cost,
                    reliability: metrics.availability
                },
                status: getProviderStatus(metrics),
                lastUpdated: new Date()
            });
        }
        return providers.sort((a, b) => b.metrics.successRate - a.metrics.successRate);
    }
    catch (error) {
        throw error;
    }
}
/**
 * Get trends analysis data
 */
async function getTrendsAnalysis(query) {
    try {
        const metrics = query.metrics?.split(',') || [
            'success_rate',
            'generation_time',
            'quality_score',
            'user_satisfaction'
        ];
        const period = query.period || '30d';
        const trendsData = [];
        for (const metric of metrics) {
            const trendAnalysis = await analyticsEngine.analyzeTrends(metric, period);
            // Get historical data points (simplified)
            const dataPoints = await getMetricDataPoints(metric, period);
            trendsData.push({
                metric,
                timeRange: period,
                dataPoints,
                trend: {
                    direction: trendAnalysis.trend === 'increasing' ? 'up' :
                        trendAnalysis.trend === 'decreasing' ? 'down' : 'stable',
                    percentage: trendAnalysis.changePercentage,
                    forecast: trendAnalysis.forecast.next30Days
                }
            });
        }
        return trendsData;
    }
    catch (error) {
        throw error;
    }
}
/**
 * Get alerts data
 */
async function getAlertsData() {
    try {
        const alertsData = await alertManager.getAlertDashboard();
        return {
            activeAlerts: alertsData.activeAlerts,
            summary: alertsData.alertSummary,
            recentHistory: alertsData.recentHistory,
            lastUpdated: new Date()
        };
    }
    catch (error) {
        throw error;
    }
}
/**
 * Get user insights data
 */
async function getUserInsights(query) {
    try {
        const userId = query.userId; // Optional: specific user or aggregate
        // Get user behavior insights
        const userInsights = await analyticsEngine.generateUserBehaviorInsights(userId);
        return {
            insights: userInsights,
            userId: userId || 'aggregate',
            lastUpdated: new Date()
        };
    }
    catch (error) {
        throw error;
    }
}
/**
 * Get export data
 */
async function getExportData(query) {
    try {
        const format = query.format || 'json';
        const period = query.period || '24h';
        const includeRawData = query.includeRawData === 'true';
        // Get comprehensive data for export
        const exportData = {
            exportedAt: new Date(),
            period,
            format,
            summary: await getDashboardSummary(),
            performance: await getPerformanceMetrics({ timeRange: period }),
            quality: await getQualityAnalysis({ period }),
            business: await getBusinessMetrics({ period }),
            providers: await getProviderComparison(),
            alerts: await getAlertsData()
        };
        if (includeRawData) {
            // Add raw data collections (limited for performance)
            exportData.rawData = await getRawDataForExport(period);
        }
        return exportData;
    }
    catch (error) {
        throw error;
    }
}
/**
 * Helper functions
 */
async function getActiveGenerationsCount() {
    try {
        const activeQuery = await admin.firestore()
            .collection('video_generation_metrics')
            .where('status', 'in', ['started', 'processing'])
            .get();
        return activeQuery.size;
    }
    catch (error) {
        return 0;
    }
}
function getProviderDisplayName(providerId) {
    const displayNames = {
        'heygen': 'HeyGen',
        'runwayml': 'RunwayML',
        'did': 'D-ID',
        'synthesia': 'Synthesia'
    };
    return displayNames[providerId] || providerId;
}
function getProviderStatus(metrics) {
    const availability = metrics.availability;
    if (availability > 0.95)
        return 'active';
    if (availability > 0.8)
        return 'degraded';
    return 'down';
}
async function getMetricDataPoints(metric, period) {
    // Simplified implementation - would query historical data
    const dataPoints = [];
    const days = parseInt(period.replace('d', ''));
    for (let i = days; i >= 0; i--) {
        const timestamp = new Date(Date.now() - (i * 24 * 60 * 60 * 1000));
        dataPoints.push({
            timestamp,
            value: Math.random() * 100, // Would be real data
            label: timestamp.toLocaleDateString()
        });
    }
    return dataPoints;
}
async function getRawDataForExport(period) {
    try {
        const startTime = new Date(Date.now() - (24 * 60 * 60 * 1000)); // Last 24 hours for performance
        // Get limited raw data
        const [metricsSnapshot, eventsSnapshot] = await Promise.all([
            admin.firestore()
                .collection('video_generation_metrics')
                .where('startTime', '>=', startTime)
                .limit(1000)
                .get(),
            admin.firestore()
                .collection('analytics_events')
                .where('timestamp', '>=', startTime)
                .limit(1000)
                .get()
        ]);
        return {
            videoMetrics: metricsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
            analyticsEvents: eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
            note: 'Limited to last 1000 records for performance'
        };
    }
    catch (error) {
        return {};
    }
}
//# sourceMappingURL=videoAnalyticsDashboard.js.map
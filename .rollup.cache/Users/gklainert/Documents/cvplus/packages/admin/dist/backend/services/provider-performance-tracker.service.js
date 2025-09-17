/**
 * Provider Performance Tracker
 *
 * Real-time performance monitoring, metrics collection, and predictive
 * analytics for video generation providers.
 *
 * @author Gil Klainert
 * @version 1.0.0
  */
import * as admin from 'firebase-admin';
/**
 * Performance Metrics Collector
  */
class MetricsCollector {
    constructor() {
        this.metricsBuffer = new Map();
        this.bufferFlushInterval = null;
        this.BUFFER_SIZE = 100;
        this.FLUSH_INTERVAL = 30000; // 30 seconds
        this.db = admin.firestore();
        this.startBufferFlushing();
    }
    async recordMetric(snapshot) {
        const providerId = snapshot.providerId;
        // Add to buffer
        if (!this.metricsBuffer.has(providerId)) {
            this.metricsBuffer.set(providerId, []);
        }
        const buffer = this.metricsBuffer.get(providerId);
        buffer.push(snapshot);
        // Flush buffer if it's full
        if (buffer.length >= this.BUFFER_SIZE) {
            await this.flushBuffer(providerId);
        }
    }
    async flushBuffer(providerId) {
        const buffer = this.metricsBuffer.get(providerId);
        if (!buffer || buffer.length === 0)
            return;
        try {
            const batch = this.db.batch();
            const collection = this.db.collection('provider_metrics');
            buffer.forEach(snapshot => {
                const docRef = collection.doc();
                batch.set(docRef, {
                    ...snapshot,
                    timestamp: admin.firestore.Timestamp.fromDate(snapshot.timestamp)
                });
            });
            await batch.commit();
            // Clear buffer
            this.metricsBuffer.set(providerId, []);
        }
        catch (error) {
            // Keep buffer for retry
        }
    }
    startBufferFlushing() {
        this.bufferFlushInterval = setInterval(async () => {
            const providerIds = Array.from(this.metricsBuffer.keys());
            for (const providerId of providerIds) {
                await this.flushBuffer(providerId);
            }
        }, this.FLUSH_INTERVAL);
    }
    cleanup() {
        if (this.bufferFlushInterval) {
            clearInterval(this.bufferFlushInterval);
            this.bufferFlushInterval = null;
        }
        // Flush all remaining buffers
        const providerIds = Array.from(this.metricsBuffer.keys());
        providerIds.forEach(providerId => {
            this.flushBuffer(providerId).catch(error => {
            });
        });
    }
}
/**
 * Trend Analyzer for performance prediction
  */
class TrendAnalyzer {
    constructor() {
        this.db = admin.firestore();
    }
    async analyzeTrends(providerId, metric, timeframe = '24h') {
        try {
            const cutoffDate = this.getCutoffDate(timeframe);
            const snapshot = await this.db.collection('provider_metrics')
                .where('providerId', '==', providerId)
                .where('timestamp', '>=', cutoffDate)
                .orderBy('timestamp', 'asc')
                .get();
            const dataPoints = this.extractDataPoints(snapshot.docs, metric);
            if (dataPoints.length < 2) {
                return {
                    providerId,
                    metric,
                    direction: 'stable',
                    changePercentage: 0,
                    confidence: 0,
                    timeframe,
                    dataPoints
                };
            }
            const trend = this.calculateTrend(dataPoints);
            return {
                providerId,
                metric,
                direction: trend.direction,
                changePercentage: trend.changePercentage,
                confidence: trend.confidence,
                timeframe,
                dataPoints
            };
        }
        catch (error) {
            throw error;
        }
    }
    getCutoffDate(timeframe) {
        const now = new Date();
        const hours = timeframe === '24h' ? 24 : timeframe === '7d' ? 168 : 720;
        return new Date(now.getTime() - (hours * 60 * 60 * 1000));
    }
    extractDataPoints(docs, metric) {
        const hourlyBuckets = new Map();
        docs.forEach(doc => {
            const data = doc.data();
            const timestamp = data.timestamp.toDate();
            const hourKey = timestamp.toISOString().slice(0, 13); // Group by hour
            let value;
            switch (metric) {
                case 'responseTime':
                    value = data.responseTime;
                    break;
                case 'successRate':
                    value = data.success ? 1 : 0;
                    break;
                case 'quality':
                    value = data.videoQuality || 0;
                    break;
                case 'cost':
                    value = data.cost || 0;
                    break;
                default:
                    value = 0;
            }
            if (!hourlyBuckets.has(hourKey)) {
                hourlyBuckets.set(hourKey, { sum: 0, count: 0, timestamp });
            }
            const bucket = hourlyBuckets.get(hourKey);
            bucket.sum += value;
            bucket.count += 1;
        });
        return Array.from(hourlyBuckets.values()).map(bucket => ({
            timestamp: bucket.timestamp,
            value: bucket.count > 0 ? bucket.sum / bucket.count : 0
        })).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    }
    calculateTrend(dataPoints) {
        if (dataPoints.length < 2) {
            return { direction: 'stable', changePercentage: 0, confidence: 0 };
        }
        // Simple linear regression
        const n = dataPoints.length;
        const sumX = dataPoints.reduce((sum, point, index) => sum + index, 0);
        const sumY = dataPoints.reduce((sum, point) => sum + point.value, 0);
        const sumXY = dataPoints.reduce((sum, point, index) => sum + (index * point.value), 0);
        const sumXX = dataPoints.reduce((sum, point, index) => sum + (index * index), 0);
        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const avgY = sumY / n;
        // Calculate R-squared for confidence
        const yPredicted = dataPoints.map((_, index) => (sumY / n) + slope * (index - (sumX / n)));
        const ssRes = dataPoints.reduce((sum, point, index) => {
            const residual = point.value - yPredicted[index];
            return sum + (residual * residual);
        }, 0);
        const ssTot = dataPoints.reduce((sum, point) => {
            const deviation = point.value - avgY;
            return sum + (deviation * deviation);
        }, 0);
        const rSquared = ssTot > 0 ? 1 - (ssRes / ssTot) : 0;
        const confidence = Math.max(0, Math.min(1, rSquared));
        // Determine direction and percentage change
        const firstValue = dataPoints[0].value;
        const lastValue = dataPoints[dataPoints.length - 1].value;
        const changePercentage = firstValue > 0 ? ((lastValue - firstValue) / firstValue) * 100 : 0;
        let direction;
        if (Math.abs(changePercentage) < 5) { // Less than 5% change
            direction = 'stable';
        }
        else if (changePercentage > 0) {
            direction = 'improving';
        }
        else {
            direction = 'declining';
        }
        return {
            direction,
            changePercentage: Math.round(changePercentage * 100) / 100,
            confidence: Math.round(confidence * 100) / 100
        };
    }
}
/**
 * Predictive Analytics Engine
  */
class PredictiveAnalytics {
    constructor() {
        this.db = admin.firestore();
    }
    async generatePredictions(providerId) {
        try {
            // Get recent performance data
            const cutoffDate = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)); // 7 days
            const snapshot = await this.db.collection('provider_metrics')
                .where('providerId', '==', providerId)
                .where('timestamp', '>=', cutoffDate)
                .get();
            const metrics = snapshot.docs.map(doc => doc.data());
            if (metrics.length < 10) {
                // Not enough data for predictions
                return {
                    providerId,
                    predictions: {
                        nextHourFailureRate: 0,
                        nextDayAverageResponseTime: 60000, // Default 60 seconds
                        expectedQualityScore: 8.0, // Default quality
                        recommendedLoadDistribution: 0.25 // 25% load
                    },
                    confidence: 0,
                    lastTrainingTime: new Date(),
                    trainingDataSize: 0
                };
            }
            const predictions = {
                nextHourFailureRate: this.predictFailureRate(metrics),
                nextDayAverageResponseTime: this.predictResponseTime(metrics),
                expectedQualityScore: this.predictQualityScore(metrics),
                recommendedLoadDistribution: this.calculateOptimalLoad(metrics)
            };
            const confidence = Math.min(1, metrics.length / 100); // Higher confidence with more data
            return {
                providerId,
                predictions,
                confidence,
                lastTrainingTime: new Date(),
                trainingDataSize: metrics.length
            };
        }
        catch (error) {
            throw error;
        }
    }
    predictFailureRate(metrics) {
        const recentMetrics = metrics.slice(-24); // Last 24 data points
        const failures = recentMetrics.filter(m => !m.success).length;
        return recentMetrics.length > 0 ? failures / recentMetrics.length : 0;
    }
    predictResponseTime(metrics) {
        const recentTimes = metrics
            .filter(m => m.responseTime && m.responseTime > 0)
            .map(m => m.responseTime)
            .slice(-50); // Last 50 response times
        if (recentTimes.length === 0)
            return 60000;
        // Calculate weighted average (more recent = higher weight)
        let weightedSum = 0;
        let totalWeight = 0;
        recentTimes.forEach((time, index) => {
            const weight = index + 1; // Linear weighting
            weightedSum += time * weight;
            totalWeight += weight;
        });
        return totalWeight > 0 ? weightedSum / totalWeight : 60000;
    }
    predictQualityScore(metrics) {
        const qualityScores = metrics
            .filter(m => m.videoQuality && m.videoQuality > 0)
            .map(m => m.videoQuality)
            .slice(-30); // Last 30 quality scores
        if (qualityScores.length === 0)
            return 8.0;
        return qualityScores.reduce((sum, score) => sum + score, 0) / qualityScores.length;
    }
    calculateOptimalLoad(metrics) {
        const successRate = this.predictFailureRate(metrics);
        const avgResponseTime = this.predictResponseTime(metrics);
        const qualityScore = this.predictQualityScore(metrics);
        // Calculate load recommendation based on performance indicators
        let loadScore = 0.5; // Start with 50%
        // Adjust based on success rate
        if (successRate < 0.05)
            loadScore += 0.3; // Very reliable
        else if (successRate < 0.1)
            loadScore += 0.2; // Reliable
        else if (successRate > 0.2)
            loadScore -= 0.3; // Unreliable
        // Adjust based on response time
        if (avgResponseTime < 30000)
            loadScore += 0.2; // Fast
        else if (avgResponseTime > 90000)
            loadScore -= 0.2; // Slow
        // Adjust based on quality
        if (qualityScore > 9.0)
            loadScore += 0.1; // High quality
        else if (qualityScore < 7.0)
            loadScore -= 0.1; // Low quality
        return Math.max(0, Math.min(1, loadScore));
    }
}
/**
 * Provider Performance Tracker Service
  */
export class ProviderPerformanceTracker {
    constructor() {
        this.metricsCollector = new MetricsCollector();
        this.trendAnalyzer = new TrendAnalyzer();
        this.predictiveAnalytics = new PredictiveAnalytics();
        this.db = admin.firestore();
    }
    /**
     * Track a video generation operation
      */
    async trackVideoGeneration(providerId, options, result, responseTime, success, error) {
        try {
            const snapshot = {
                providerId,
                timestamp: new Date(),
                operationType: 'generation',
                success,
                responseTime,
                videoQuality: await this.estimateVideoQuality(result),
                cost: await this.estimateCost(providerId, options),
                errorType: error,
                metadata: {
                    duration: this.getDurationInSeconds(options.duration?.toString()),
                    resolution: result.metadata?.resolution || '1920x1080',
                    format: result.metadata?.format || 'mp4',
                    features: this.extractFeatures(options)
                }
            };
            await this.metricsCollector.recordMetric(snapshot);
        }
        catch (error) {
        }
    }
    /**
     * Track a status check operation
      */
    async trackStatusCheck(providerId, jobId, responseTime, success, error) {
        try {
            const snapshot = {
                providerId,
                timestamp: new Date(),
                operationType: 'status_check',
                success,
                responseTime,
                errorType: error,
                metadata: {
                    duration: 0,
                    resolution: '',
                    format: '',
                    features: []
                }
            };
            await this.metricsCollector.recordMetric(snapshot);
        }
        catch (error) {
        }
    }
    /**
     * Get aggregated performance metrics
      */
    async getPerformanceMetrics(providerId, period = '24h') {
        try {
            const cutoffDate = this.getCutoffDate(period);
            const snapshot = await this.db.collection('provider_metrics')
                .where('providerId', '==', providerId)
                .where('timestamp', '>=', cutoffDate)
                .get();
            const metrics = snapshot.docs.map(doc => doc.data());
            if (metrics.length === 0) {
                return this.getDefaultMetrics(providerId, period);
            }
            const aggregated = this.aggregateMetrics(metrics);
            return {
                providerId,
                totalRequests: aggregated.totalRequests,
                successfulRequests: aggregated.successfulRequests,
                failedRequests: aggregated.failedRequests,
                averageResponseTime: aggregated.averageResponseTime,
                availability: aggregated.availability,
                successRate: aggregated.successRate,
                errorRate: aggregated.errorRate,
                avgProcessingTime: aggregated.averageResponseTime,
                peakUsage: aggregated.peakUsage
            };
        }
        catch (error) {
            return this.getDefaultMetrics(providerId, period);
        }
    }
    /**
     * Aggregate raw metrics into performance summary
     */
    aggregateMetrics(metrics) {
        if (metrics.length === 0) {
            return {
                totalRequests: 0,
                successfulRequests: 0,
                failedRequests: 0,
                averageResponseTime: 0,
                availability: 0,
                successRate: 0,
                errorRate: 100,
                peakUsage: 0
            };
        }
        const totalRequests = metrics.reduce((sum, metric) => sum + (metric.requestCount || 0), 0);
        const successfulRequests = metrics.reduce((sum, metric) => sum + (metric.successCount || 0), 0);
        const failedRequests = totalRequests - successfulRequests;
        const totalResponseTime = metrics.reduce((sum, metric) => sum + ((metric.responseTime || 0) * (metric.requestCount || 1)), 0);
        const averageResponseTime = totalRequests > 0 ? totalResponseTime / totalRequests : 0;
        const successRate = totalRequests > 0 ? (successfulRequests / totalRequests) * 100 : 0;
        const errorRate = 100 - successRate;
        const uptimeMetrics = metrics.filter(m => typeof m.uptime === 'number');
        const availability = uptimeMetrics.length > 0
            ? uptimeMetrics.reduce((sum, m) => sum + m.uptime, 0) / uptimeMetrics.length
            : 100;
        const peakUsage = Math.max(...metrics.map(m => m.cpuUsage || 0), 0);
        return {
            totalRequests,
            successfulRequests,
            failedRequests,
            averageResponseTime,
            availability,
            successRate,
            errorRate,
            peakUsage
        };
    }
    /**
     * Get performance trends
      */
    async getPerformanceTrends(providerId, timeframe = '24h') {
        try {
            const trends = await Promise.all([
                this.trendAnalyzer.analyzeTrends(providerId, 'responseTime', timeframe),
                this.trendAnalyzer.analyzeTrends(providerId, 'successRate', timeframe),
                this.trendAnalyzer.analyzeTrends(providerId, 'quality', timeframe),
                this.trendAnalyzer.analyzeTrends(providerId, 'cost', timeframe)
            ]);
            return trends;
        }
        catch (error) {
            return [];
        }
    }
    /**
     * Get predictive analytics
      */
    async getPredictions(providerId) {
        try {
            return await this.predictiveAnalytics.generatePredictions(providerId);
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Get comprehensive performance dashboard data
      */
    async getDashboardData(providerId) {
        try {
            if (providerId) {
                const [metrics, trends, predictions] = await Promise.all([
                    this.getPerformanceMetrics(providerId, '24h'),
                    this.getPerformanceTrends(providerId, '24h'),
                    this.getPredictions(providerId)
                ]);
                return {
                    providerId,
                    metrics,
                    trends,
                    predictions,
                    generatedAt: new Date()
                };
            }
            // Get data for all providers
            const providerIds = await this.getAllProviderIds();
            const dashboardData = await Promise.all(providerIds.map(async (id) => {
                const [metrics, trends] = await Promise.all([
                    this.getPerformanceMetrics(id, '24h'),
                    this.getPerformanceTrends(id, '24h')
                ]);
                return { providerId: id, metrics, trends };
            }));
            return {
                providers: dashboardData,
                generatedAt: new Date()
            };
        }
        catch (error) {
            throw error;
        }
    }
    async estimateVideoQuality(result) {
        // This would integrate with a video quality assessment service
        // For now, return a base score that can be updated when user feedback is received
        if (result.status === 'completed' && result.videoUrl) {
            return 8.0; // Default quality score
        }
        return 0;
    }
    async estimateCost(providerId, options) {
        // This would calculate actual cost based on provider pricing
        // For now, return estimated costs
        const baseCost = 0.50;
        const duration = options.duration || 60;
        const durationMultiplier = duration > 90 ? 1.5 : duration < 45 ? 0.8 : 1.0;
        return baseCost * durationMultiplier;
    }
    getDurationInSeconds(duration) {
        switch (duration) {
            case 'short': return 30;
            case 'long': return 90;
            case 'medium':
            default: return 60;
        }
    }
    extractFeatures(options) {
        const features = [];
        if (options.includeSubtitles)
            features.push('subtitles');
        if (options.customAvatarId)
            features.push('customAvatar');
        if (options.customVoiceId)
            features.push('voiceCloning');
        if (options.emotion && options.emotion !== 'neutral')
            features.push('emotionControl');
        return features;
    }
    getCutoffDate(period) {
        const now = new Date();
        const hours = period === '1h' ? 1 : period === '24h' ? 24 : period === '7d' ? 168 : 720;
        return new Date(now.getTime() - (hours * 60 * 60 * 1000));
    }
    async aggregateMetrics(metrics) {
        const total = metrics.length;
        const successful = metrics.filter(m => m.success).length;
        const responseTimes = metrics.filter(m => m.responseTime > 0).map(m => m.responseTime);
        const qualityScores = metrics.filter(m => m.videoQuality > 0).map(m => m.videoQuality);
        const costs = metrics.filter(m => m.cost > 0).map(m => m.cost);
        const averageResponseTime = responseTimes.length > 0 ?
            responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length : 0;
        const averageVideoQuality = qualityScores.length > 0 ?
            qualityScores.reduce((sum, quality) => sum + quality, 0) / qualityScores.length : 0;
        const totalCost = costs.reduce((sum, cost) => sum + cost, 0);
        const averageCost = costs.length > 0 ? totalCost / costs.length : 0;
        return {
            providerId: '',
            period: '24h',
            startTime: new Date(),
            endTime: new Date(),
            totalOperations: total,
            successfulOperations: successful,
            failedOperations: total - successful,
            successRate: total > 0 ? successful / total : 0,
            averageResponseTime,
            p95ResponseTime: this.calculatePercentile(responseTimes, 95),
            p99ResponseTime: this.calculatePercentile(responseTimes, 99),
            averageVideoQuality,
            averageUserSatisfaction: 4.0, // Would come from user feedback
            totalCost,
            averageCost,
            errorBreakdown: this.calculateErrorBreakdown(metrics),
            uptimePercentage: total > 0 ? (successful / total) * 100 : 100,
            trendDirection: 'stable',
            lastUpdated: new Date()
        };
    }
    calculatePercentile(values, percentile) {
        if (values.length === 0)
            return 0;
        const sorted = values.sort((a, b) => a - b);
        const index = Math.ceil((percentile / 100) * sorted.length) - 1;
        return sorted[Math.max(0, index)];
    }
    calculateErrorBreakdown(metrics) {
        const breakdown = {};
        metrics.filter(m => !m.success && m.errorType).forEach(m => {
            breakdown[m.errorType] = (breakdown[m.errorType] || 0) + 1;
        });
        return breakdown;
    }
    getDefaultMetrics(providerId, period) {
        return {
            providerId,
            totalRequests: 0,
            successfulRequests: 0,
            failedRequests: 0,
            averageResponseTime: 60,
            availability: 100,
            successRate: 95,
            errorRate: 5,
            avgProcessingTime: 60,
            peakUsage: 100
        };
    }
    async getAllProviderIds() {
        try {
            const snapshot = await this.db.collection('provider_metrics')
                .select('providerId')
                .get();
            const providerIds = new Set();
            snapshot.docs.forEach(doc => {
                const data = doc.data();
                if (data.providerId) {
                    providerIds.add(data.providerId);
                }
            });
            return Array.from(providerIds);
        }
        catch (error) {
            return [];
        }
    }
    /**
     * Cleanup method for proper service shutdown
      */
    cleanup() {
        this.metricsCollector.cleanup();
    }
}
// Export singleton instance
export const providerPerformanceTracker = new ProviderPerformanceTracker();
//# sourceMappingURL=provider-performance-tracker.service.js.map
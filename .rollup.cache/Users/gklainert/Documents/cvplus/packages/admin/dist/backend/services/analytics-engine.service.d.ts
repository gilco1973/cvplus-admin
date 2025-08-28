/**
 * Analytics Engine Service
 *
 * Service for generating business analytics, quality insights, and user behavior analysis
 * for the admin dashboard and reporting systems.
 *
 * @author Gil Klainert
 * @version 1.0.0
 */
export interface BusinessMetrics {
    totalRevenue: number;
    conversionRates: {
        userToPremium: number;
        trialToSubscription: number;
        visitorToUser: number;
    };
    userMetrics: {
        totalUsers: number;
        activeUsers: number;
        newUsers: number;
        churned: number;
    };
    videoMetrics: {
        totalGenerated: number;
        averageQualityScore: number;
        premiumAdoptionRate: number;
    };
}
export interface QualityInsights {
    overallQualityScore: number;
    qualityTrend: 'improving' | 'declining' | 'stable';
    satisfactionAnalysis: {
        averageRating: number;
        responseRate: number;
        commonComplaints: string[];
        positivePoints: string[];
    };
    technicalMetrics: {
        averageGenerationTime: number;
        errorRate: number;
        retryRate: number;
    };
}
export interface UserBehaviorInsights {
    engagementMetrics: {
        averageSessionDuration: number;
        pagesPerSession: number;
        bounceRate: number;
    };
    featureUsage: {
        mostUsedFeatures: Array<{
            feature: string;
            usage: number;
        }>;
        leastUsedFeatures: Array<{
            feature: string;
            usage: number;
        }>;
    };
    userSegments: {
        newUsers: number;
        returningUsers: number;
        premiumUsers: number;
        activeUsers: number;
    };
    conversionFunnel: Array<{
        stage: string;
        users: number;
        conversionRate: number;
    }>;
}
export interface TrendAnalysis {
    trend: 'increasing' | 'decreasing' | 'stable';
    changePercentage: number;
    forecast: {
        next7Days: number;
        next30Days: number;
        confidence: number;
    };
}
export declare class AnalyticsEngineService {
    private db;
    constructor();
    /**
     * Get comprehensive analytics summary
     */
    getAnalyticsSummary(): Promise<{
        performance: any;
        quality: any;
        business: BusinessMetrics;
    }>;
    /**
     * Generate business metrics for specified period
     */
    generateBusinessMetrics(period: '1h' | '24h' | '7d' | '30d'): Promise<BusinessMetrics>;
    /**
     * Generate quality insights for specified period
     */
    generateQualityInsights(period: '1h' | '24h' | '7d' | '30d'): Promise<QualityInsights>;
    /**
     * Generate user behavior insights
     */
    generateUserBehaviorInsights(userId?: string): Promise<UserBehaviorInsights>;
    /**
     * Analyze trends for specific metric
     */
    analyzeTrends(metric: string, period: '7d' | '30d' | '90d'): Promise<TrendAnalysis>;
    /**
     * Private helper methods
     */
    private getPerformanceSummary;
    private getQualitySummary;
    private getUserMetrics;
    private getRevenueMetrics;
    private getConversionMetrics;
    private getVideoMetrics;
    private getUserSatisfactionData;
    private calculateQualityTrend;
    private getStartTime;
    private getDaysFromPeriod;
    private calculateEngagementMetrics;
    private getFeatureUsage;
    private getUserSegments;
    private getConversionFunnel;
    private getHistoricalMetricData;
    private calculateTrendDirection;
    private calculateChangePercentage;
    private generateSimpleForecast;
    private getDefaultBusinessMetrics;
    private getDefaultQualityInsights;
    private getDefaultUserBehaviorInsights;
}
//# sourceMappingURL=analytics-engine.service.d.ts.map
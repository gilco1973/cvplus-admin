/**
 * Provider Performance Tracker
 *
 * Real-time performance monitoring, metrics collection, and predictive
 * analytics for video generation providers.
 *
 * @author Gil Klainert
 * @version 1.0.0
  */
import { ProviderPerformanceMetrics, VideoGenerationResult, VideoGenerationOptions } from './video-providers/base-provider.interface';
interface PerformanceTrend {
    providerId: string;
    metric: 'responseTime' | 'successRate' | 'quality' | 'cost';
    direction: 'improving' | 'stable' | 'declining';
    changePercentage: number;
    confidence: number;
    timeframe: string;
    dataPoints: Array<{
        timestamp: Date;
        value: number;
    }>;
}
interface PredictionModel {
    providerId: string;
    predictions: {
        nextHourFailureRate: number;
        nextDayAverageResponseTime: number;
        expectedQualityScore: number;
        recommendedLoadDistribution: number;
    };
    confidence: number;
    lastTrainingTime: Date;
    trainingDataSize: number;
}
/**
 * Provider Performance Tracker Service
  */
export declare class ProviderPerformanceTracker {
    private metricsCollector;
    private trendAnalyzer;
    private predictiveAnalytics;
    private db;
    constructor();
    /**
     * Track a video generation operation
      */
    trackVideoGeneration(providerId: string, options: VideoGenerationOptions, result: VideoGenerationResult, responseTime: number, success: boolean, error?: string): Promise<void>;
    /**
     * Track a status check operation
      */
    trackStatusCheck(providerId: string, jobId: string, responseTime: number, success: boolean, error?: string): Promise<void>;
    /**
     * Get aggregated performance metrics
      */
    getPerformanceMetrics(providerId: string, period?: '1h' | '24h' | '7d' | '30d'): Promise<ProviderPerformanceMetrics>;
    /**
     * Get performance trends
      */
    getPerformanceTrends(providerId: string, timeframe?: '24h' | '7d' | '30d'): Promise<PerformanceTrend[]>;
    /**
     * Get predictive analytics
      */
    getPredictions(providerId: string): Promise<PredictionModel>;
    /**
     * Get comprehensive performance dashboard data
      */
    getDashboardData(providerId?: string): Promise<any>;
    private estimateVideoQuality;
    private estimateCost;
    private getDurationInSeconds;
    private extractFeatures;
    private getCutoffDate;
    private aggregateMetrics;
    private calculatePercentile;
    private calculateErrorBreakdown;
    private getDefaultMetrics;
    private getAllProviderIds;
    /**
     * Cleanup method for proper service shutdown
      */
    cleanup(): void;
}
export declare const providerPerformanceTracker: ProviderPerformanceTracker;
export {};
//# sourceMappingURL=provider-performance-tracker.service.d.ts.map
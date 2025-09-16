/**
 * Real-Time Performance Monitor Service - Phase 6.3.4
 *
 * Live performance monitoring with sub-second updates, predictive analytics,
 * and automated scaling intelligence for CVPlus Firebase Functions.
 * Monitors 127+ functions with intelligent anomaly detection.
 *
 * @author Gil Klainert
 * @version 1.0.0
  */
export interface RealTimeMetrics {
    timestamp: number;
    functionName: string;
    executionTime: number;
    memoryUsage: number;
    cpuUsage: number;
    errorRate: number;
    requestsPerSecond: number;
    concurrentExecutions: number;
    coldStartCount: number;
    retryCount: number;
}
export interface PerformanceAnomaly {
    anomalyId: string;
    functionName: string;
    metricName: string;
    actualValue: number;
    expectedValue: number;
    deviation: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
    timestamp: number;
    duration: number;
    affectedRequests: number;
    rootCause?: string;
    recommendedAction?: string;
}
export interface ScalingRecommendation {
    functionName: string;
    currentInstances: number;
    recommendedInstances: number;
    reason: string;
    confidenceScore: number;
    estimatedCostImpact: number;
    estimatedPerformanceImprovement: number;
    timestamp: number;
}
export interface PerformanceTrend {
    functionName: string;
    metric: string;
    trend: 'improving' | 'declining' | 'stable';
    changeRate: number;
    timeframe: string;
    predictedValues: number[];
    confidence: number;
}
declare class RealTimeMonitorService {
    private static instance;
    private metricsBuffer;
    private anomalyDetector;
    private scalingIntelligence;
    private trendAnalyzer;
    private isMonitoring;
    private monitoringInterval;
    private constructor();
    static getInstance(): RealTimeMonitorService;
    /**
     * Start real-time monitoring with sub-second updates
      */
    startMonitoring(updateIntervalMs?: number): void;
    /**
     * Stop monitoring
      */
    stopMonitoring(): void;
    /**
     * Collect metrics from all Firebase Functions
      */
    private collectMetrics;
    /**
     * Collect metrics for a specific function
      */
    private collectFunctionMetrics;
    /**
     * Get function statistics from monitoring APIs
      */
    private getFunctionStats;
    /**
     * Buffer metrics for analysis
      */
    private bufferMetrics;
    /**
     * Detect performance anomalies
      */
    private detectAnomalies;
    /**
     * Handle detected anomalies
      */
    private handleAnomalies;
    /**
     * Generate scaling recommendations
      */
    private generateScalingRecommendations;
    /**
     * Update performance trends
      */
    private updateTrends;
    /**
     * Get list of active Firebase Functions
      */
    private getActiveFunctions;
    /**
     * Store aggregated metrics
      */
    private storeAggregatedMetrics;
    /**
     * Store performance anomaly
      */
    private storeAnomaly;
    /**
     * Trigger anomaly alert
      */
    private triggerAnomalyAlert;
    /**
     * Execute auto-remediation
      */
    private executeAutoRemediation;
    /**
     * Store scaling recommendations
      */
    private storeScalingRecommendations;
    /**
     * Evaluate auto-scaling opportunities
      */
    private evaluateAutoScaling;
    /**
     * Apply scaling recommendation
      */
    private applyScaling;
    /**
     * Store performance trends
      */
    private storeTrends;
    /**
     * Get real-time dashboard data
      */
    getDashboardData(): any;
}
export default RealTimeMonitorService;
//# sourceMappingURL=realtime-monitor.service.d.ts.map
export interface CacheHealthReport {
    timestamp: number;
    stats: {
        hits: number;
        misses: number;
        invalidations: number;
        size: number;
    };
    performance: {
        hitRate: number;
        missRate: number;
        efficiency: string;
    };
    recommendations: string[];
}
export declare class CacheMonitorService {
    /**
     * Generate comprehensive cache health report
     */
    generateHealthReport(): Promise<CacheHealthReport>;
    /**
     * Log cache performance metrics
     */
    logPerformanceMetrics(): Promise<void>;
    /**
     * Check if cache performance is healthy
     */
    isCacheHealthy(): Promise<boolean>;
    /**
     * Perform cache maintenance operations
     */
    performMaintenance(): Promise<void>;
    private generateRecommendations;
}
export declare const cacheMonitor: CacheMonitorService;
//# sourceMappingURL=cache-monitor.service.d.ts.map
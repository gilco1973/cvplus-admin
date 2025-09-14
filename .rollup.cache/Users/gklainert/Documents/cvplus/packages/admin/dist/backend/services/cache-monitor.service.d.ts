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
    generateHealthReport(): CacheHealthReport;
    /**
     * Log cache performance metrics
     */
    logPerformanceMetrics(): void;
    /**
     * Check if cache performance is healthy
     */
    isCacheHealthy(): boolean;
    /**
     * Perform cache maintenance operations
     */
    performMaintenance(): void;
    private generateRecommendations;
}
export declare const cacheMonitor: CacheMonitorService;
//# sourceMappingURL=cache-monitor.service.d.ts.map
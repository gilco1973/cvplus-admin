/**
 * Get Cache Statistics - Redis Performance Monitoring
 *
 * Enhanced admin function to retrieve comprehensive cache performance
 * statistics from the Redis caching layer.
 *
 * @author Gil Klainert
 * @version 2.0.0
 * @updated 2025-08-28
 */
interface GetCacheStatsData {
    includeHealthReport?: boolean;
    includeDetailedMetrics?: boolean;
    includeHealthCheck?: boolean;
    includeRecommendations?: boolean;
    includeRedisMetrics?: boolean;
}
export declare const getCacheStats: import("firebase-functions/v2/https").CallableFunction<GetCacheStatsData, any>;
/**
 * Enhanced cache management endpoints
 */
/**
 * Warm cache endpoint for admin users
 */
export declare const warmCaches: import("firebase-functions/v2/https").CallableFunction<{
    services?: string[];
}, any>;
/**
 * Clear cache endpoint for admin users
 */
export declare const clearCaches: import("firebase-functions/v2/https").CallableFunction<{
    services?: ("pricing" | "subscription" | "featureAccess" | "analytics" | "all")[];
    pattern?: string;
}, any>;
export {};
//# sourceMappingURL=getCacheStats.d.ts.map
/**
 * Automated Optimization Engine Service - Phase 6.3.5
 *
 * Intelligent performance optimization recommendations and automated
 * improvements for CVPlus. Analyzes performance patterns and implements
 * optimization strategies across code, infrastructure, and database layers.
 *
 * @author Gil Klainert
 * @version 1.0.0
 */
export interface OptimizationRecommendation {
    recommendationId: string;
    type: 'code' | 'infrastructure' | 'database' | 'caching' | 'bundle';
    priority: 'low' | 'medium' | 'high' | 'critical';
    title: string;
    description: string;
    impact: {
        performanceImprovement: number;
        costReduction?: number;
        developmentEffort: 'low' | 'medium' | 'high';
        riskLevel: 'low' | 'medium' | 'high';
    };
    implementation: {
        automated: boolean;
        steps: string[];
        estimatedTimeHours: number;
        dependencies: string[];
    };
    metrics: {
        targetFunction?: string;
        affectedEndpoints: string[];
        expectedImprovement: Record<string, number>;
    };
    evidence: {
        performanceData: any;
        analysisConfidence: number;
        historicalTrend: string;
    };
}
export interface OptimizationResult {
    recommendationId: string;
    status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'rolled_back';
    appliedAt?: number;
    completedAt?: number;
    actualImprovement?: Record<string, number>;
    rollbackPlan?: string;
}
export interface BundleOptimization {
    type: 'code_splitting' | 'tree_shaking' | 'lazy_loading' | 'compression';
    module: string;
    currentSize: number;
    estimatedNewSize: number;
    savingsKB: number;
    implementation: string;
}
export interface DatabaseOptimization {
    type: 'index_creation' | 'query_optimization' | 'connection_pooling' | 'denormalization';
    collection: string;
    field?: string;
    query: string;
    currentPerformance: number;
    estimatedImprovement: number;
    implementation: string;
}
export interface CacheOptimization {
    type: 'memory_cache' | 'redis_cache' | 'cdn_cache' | 'browser_cache';
    target: string;
    currentHitRate: number;
    estimatedHitRate: number;
    implementation: string;
    ttl?: number;
}
declare class OptimizationEngineService {
    private static instance;
    private db;
    private recommendations;
    private results;
    private constructor();
    static getInstance(): OptimizationEngineService;
    /**
     * Analyze performance data and generate optimization recommendations
     */
    generateRecommendations(performanceData: any[], timeframe?: string): Promise<OptimizationRecommendation[]>;
    /**
     * Apply automated optimizations
     */
    applyAutomatedOptimizations(recommendations: OptimizationRecommendation[]): Promise<OptimizationResult[]>;
    /**
     * Analyze bundle optimization opportunities
     */
    private analyzeBundleOptimizations;
    /**
     * Analyze database optimization opportunities
     */
    private analyzeDatabaseOptimizations;
    /**
     * Analyze caching optimization opportunities
     */
    private analyzeCacheOptimizations;
    /**
     * Analyze infrastructure optimization opportunities
     */
    private analyzeInfrastructureOptimizations;
    /**
     * Create bundle optimization recommendations
     */
    private createBundleRecommendations;
    /**
     * Create database optimization recommendations
     */
    private createDatabaseRecommendations;
    /**
     * Create cache optimization recommendations
     */
    private createCacheRecommendations;
    /**
     * Create infrastructure optimization recommendations
     */
    private createInfrastructureRecommendations;
    /**
     * Prioritize recommendations based on impact and effort
     */
    private prioritizeRecommendations;
    /**
     * Calculate priority score for recommendation
     */
    private calculatePriorityScore;
    /**
     * Execute optimization recommendation
     */
    private executeOptimization;
    /**
     * Execute database optimization
     */
    private executeDatabaseOptimization;
    /**
     * Execute cache optimization
     */
    private executeCacheOptimization;
    /**
     * Execute infrastructure optimization
     */
    private executeInfrastructureOptimization;
    /**
     * Store recommendations in Firestore
     */
    private storeRecommendations;
    /**
     * Store optimization result
     */
    private storeOptimizationResult;
    /**
     * Get optimization dashboard data
     */
    getOptimizationDashboard(): Promise<any>;
}
export default OptimizationEngineService;
//# sourceMappingURL=optimization-engine.service.d.ts.map
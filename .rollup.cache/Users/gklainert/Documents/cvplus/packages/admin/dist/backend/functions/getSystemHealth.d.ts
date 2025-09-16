import * as admin from 'firebase-admin';
/**
 * Admin function to get comprehensive system health metrics
  */
export declare const getSystemHealth: import("firebase-functions/v2/https").CallableFunction<any, Promise<{
    success: boolean;
    data: {
        status: "healthy" | "degraded" | "unhealthy";
        timestamp: string;
        metrics: {
            database: {
                status: string;
                readLatency: number;
                collections: {
                    users: number;
                    jobs: number;
                };
                lastCheck: string;
                error?: undefined;
            } | {
                status: string;
                error: string;
                lastCheck: string;
                readLatency?: undefined;
                collections?: undefined;
            };
            functions: {
                totalExecutions: number;
                errors: number;
                avgDuration: number;
                timeouts: number;
                errorRate: number;
                successRate: number;
                error?: undefined;
            } | {
                error: string;
                totalExecutions?: undefined;
                errors?: undefined;
                avgDuration?: undefined;
                timeouts?: undefined;
                errorRate?: undefined;
                successRate?: undefined;
            };
            errors: {
                totalErrors: number;
                categories: any;
                recentErrors: admin.firestore.DocumentData[];
                errorRate: number;
                error?: undefined;
            } | {
                error: string;
                totalErrors?: undefined;
                categories?: undefined;
                recentErrors?: undefined;
                errorRate?: undefined;
            };
            performance: {
                avgResponseTime: number;
                p95ResponseTime: number;
                p99ResponseTime: number;
                throughput: number;
                memoryUsage: number;
                cpuUsage: number;
            };
            resources: {
                storage: {
                    used: string;
                    total: string;
                    percentage: number;
                };
                bandwidth: {
                    used: string;
                    limit: string;
                    percentage: number;
                };
                functions: {
                    invocations: number;
                    limit: number;
                    percentage: number;
                };
            };
            security: {
                totalEvents: number;
                suspiciousActivity: number;
                failedLogins: number;
                blockedRequests: number;
                error?: undefined;
            } | {
                error: string;
                totalEvents?: undefined;
                suspiciousActivity?: undefined;
                failedLogins?: undefined;
                blockedRequests?: undefined;
            };
            activity: {
                activeUsers: number;
                newRegistrations: number;
                cvGenerations: number;
                apiCalls: number;
                peakConcurrency: number;
                error?: undefined;
            } | {
                error: string;
                activeUsers?: undefined;
                newRegistrations?: undefined;
                cvGenerations?: undefined;
                apiCalls?: undefined;
                peakConcurrency?: undefined;
            };
        };
        alerts: admin.firestore.DocumentData[];
        recommendations: {
            type: string;
            priority: string;
            message: string;
        }[];
    };
}>>;
//# sourceMappingURL=getSystemHealth.d.ts.map
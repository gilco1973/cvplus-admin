/**
 * Admin function to get comprehensive business metrics and analytics
 */
export declare const getBusinessMetrics: import("firebase-functions/v2/https").CallableFunction<any, Promise<{
    success: boolean;
    data: {
        timeRange: any;
        period: {
            start: string;
            end: string;
            days: number;
        };
        metrics: {
            users: {
                total: number;
                new: number;
                active: number;
                premium: number;
                growthRate: number;
                conversionToPremium: number;
                retentionRate: number;
            };
            revenue: {
                total: number;
                subscription: number;
                oneTime: number;
                mrr: number;
                arr: number;
                arpu: number;
                transactionCount: number;
                averageTransactionValue: number;
                dailyTrend: {
                    [key: string]: number;
                };
            };
            usage: {
                totalJobs: number;
                completedJobs: number;
                failedJobs: number;
                successRate: number;
                averageJobsPerUser: number;
                templateUsage: {
                    [key: string]: number;
                };
                jobTypeUsage: {
                    [key: string]: number;
                };
                apiCalls: number;
                peakUsageDay: null;
            };
            conversion: {
                signupToPremium: number;
                trialToPaid: number;
                newPremiumUsers: number;
                paidConversions: number;
                freeToTrialRate: number;
                churnRate: number;
            };
            engagement: {
                pageViews: number;
                sessions: number;
                averageSessionDuration: number;
                bounceRate: number;
                pagesPerSession: number;
                returningVisitors: number;
                newVisitors: number;
            };
            performance: {
                averageResponseTime: number;
                p95ResponseTime: number;
                p99ResponseTime: number;
                errorRate: number;
                uptime: number;
                throughput: number;
            };
        };
        summary: {
            totalUsers: any;
            newUsers: any;
            totalRevenue: any;
            mrr: any;
            conversionRate: any;
            successRate: any;
            keyInsight: string;
        };
        insights: {
            type: string;
            priority: string;
            message: string;
            recommendation: string;
        }[];
        generatedAt: string;
    };
}>>;
//# sourceMappingURL=getBusinessMetrics.d.ts.map
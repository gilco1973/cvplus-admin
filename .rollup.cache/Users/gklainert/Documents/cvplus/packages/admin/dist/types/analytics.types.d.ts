/**
 * Analytics Types - Real CVPlus Analytics Integration
 *
 * Real analytics types imported from CVPlus analytics module.
 * Provides complete analytics functionality for admin dashboard.
  */
import type { BusinessMetrics as CVPlusBusinessMetrics, QualityInsights as CVPlusQualityInsights, UserBehaviorInsights as CVPlusUserBehaviorInsights, RevenueAnalytics as CVPlusRevenueAnalytics } from '@cvplus/analytics';
export type BusinessMetrics = CVPlusBusinessMetrics;
export type QualityInsights = CVPlusQualityInsights;
export type UserBehaviorInsights = CVPlusUserBehaviorInsights;
export type RevenueAnalytics = CVPlusRevenueAnalytics;
export interface AdminAnalyticsOverview extends BusinessMetrics {
    systemHealth: {
        uptime: number;
        responseTime: number;
        errorRate: number;
    };
    securityMetrics: {
        activeThreats: number;
        blockedAttempts: number;
        securityScore: number;
    };
}
export interface AdminRealtimeMetrics {
    currentActiveUsers: number;
    currentSystemLoad: number;
    realtimeEvents: Array<{
        timestamp: Date;
        type: string;
        severity: 'low' | 'medium' | 'high' | 'critical';
        message: string;
    }>;
}
export interface AdminAnalyticsService {
    getBusinessMetrics(timeRange: string): Promise<BusinessMetrics>;
    getQualityInsights(timeRange: string): Promise<QualityInsights>;
    getUserBehaviorInsights(timeRange: string): Promise<UserBehaviorInsights>;
    getRevenueAnalytics(timeRange: string): Promise<RevenueAnalytics>;
    getAdminOverview(timeRange: string): Promise<AdminAnalyticsOverview>;
    getRealtimeMetrics(): Promise<AdminRealtimeMetrics>;
}
export type BusinessAnalytics = BusinessMetrics;
//# sourceMappingURL=analytics.types.d.ts.map
/**
 * Analytics Types - Real CVPlus Analytics Integration
 *
 * Real analytics types imported from CVPlus analytics module.
 * Provides complete analytics functionality for admin dashboard.
  */

// Real analytics types from CVPlus analytics module
import type {
  BusinessMetrics as CVPlusBusinessMetrics,
  QualityInsights as CVPlusQualityInsights,
  UserBehaviorInsights as CVPlusUserBehaviorInsights,
  RevenueAnalytics as CVPlusRevenueAnalytics
} from '@cvplus/analytics';

// Re-export CVPlus analytics types for admin module compatibility
export type BusinessMetrics = CVPlusBusinessMetrics;
export type QualityInsights = CVPlusQualityInsights;
export type UserBehaviorInsights = CVPlusUserBehaviorInsights;
export type RevenueAnalytics = CVPlusRevenueAnalytics;

// Additional admin-specific analytics interfaces that extend CVPlus types
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

// Service interfaces for admin analytics functionality
export interface AdminAnalyticsService {
  getBusinessMetrics(timeRange: string): Promise<BusinessMetrics>;
  getQualityInsights(timeRange: string): Promise<QualityInsights>;
  getUserBehaviorInsights(timeRange: string): Promise<UserBehaviorInsights>;
  getRevenueAnalytics(timeRange: string): Promise<RevenueAnalytics>;
  getAdminOverview(timeRange: string): Promise<AdminAnalyticsOverview>;
  getRealtimeMetrics(): Promise<AdminRealtimeMetrics>;
}

// Type aliases for backward compatibility
export type BusinessAnalytics = BusinessMetrics;
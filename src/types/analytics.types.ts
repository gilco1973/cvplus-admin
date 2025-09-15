/**
 * Analytics Types - Admin Placeholder
 *
 * Placeholder types for analytics functionality that has been moved to @cvplus/analytics.
 * These types maintain compatibility while the analytics submodule is being integrated.
 */

// Temporary placeholder types for migrated analytics functionality
export interface BusinessMetrics {
  totalRevenue: number;
  conversionRates: {
    userToPremium: number;
    trialToSubscription: number;
    visitorToUser: number;
  };
  userMetrics: {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
    churned: number;
  };
  videoMetrics: {
    totalGenerated: number;
    averageQualityScore: number;
    premiumAdoptionRate: number;
  };
}

export interface QualityInsights {
  overallQualityScore: number;
  qualityTrend: 'improving' | 'declining' | 'stable';
  satisfactionAnalysis: {
    averageRating: number;
    responseRate: number;
    commonComplaints: string[];
    positivePoints: string[];
  };
  technicalMetrics: {
    averageGenerationTime: number;
    errorRate: number;
    retryRate: number;
  };
}

export interface UserBehaviorInsights {
  engagementMetrics: {
    averageSessionDuration: number;
    pagesPerSession: number;
    bounceRate: number;
  };
  featureUsage: {
    mostUsedFeatures: Array<{ feature: string; usage: number }>;
    leastUsedFeatures: Array<{ feature: string; usage: number }>;
  };
  userSegments: {
    newUsers: number;
    returningUsers: number;
    premiumUsers: number;
    activeUsers: number;
  };
  conversionFunnel: Array<{
    stage: string;
    users: number;
    conversionRate: number;
  }>;
}

// Type aliases for compatibility
export type BusinessAnalytics = BusinessMetrics;
export type RevenueAnalytics = {
  totalRevenue: number;
  monthlyRevenue: number;
  subscriptionRevenue: number;
  oneTimeRevenue: number;
  revenueGrowth: number;
  averageOrderValue: number;
};

// Note: Full analytics types have been moved to @cvplus/analytics/admin/types/analytics.types.ts
// These placeholders ensure admin module compilation while submodule integration is completed.
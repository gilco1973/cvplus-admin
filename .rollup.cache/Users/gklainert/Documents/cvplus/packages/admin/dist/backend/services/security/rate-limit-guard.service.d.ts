/**
 * Secure Rate Limiting Service with Fail-Closed Policy
 *
 * SECURITY POLICY: This service fails closed (deny access) by default
 * when rate limiting checks cannot be completed successfully.
 *
 * This is the CONSOLIDATED and SECURE implementation from the CVPlus Core Module.
 * All modules should use this implementation to ensure consistent security policies.
  */
export interface RateLimitResult {
    allowed: boolean;
    retryAfter?: number;
    currentCount?: number;
    reason?: string;
    securityEvent?: string;
}
export interface RateLimitConfig {
    limitPerMinute: number;
    burstLimit?: number;
    windowMinutes?: number;
}
export declare class SecureRateLimitGuard {
    private static instance;
    private db;
    private serviceHealth;
    private constructor();
    static getInstance(): SecureRateLimitGuard;
    /**
     * Check rate limits with fail-closed security policy
     *
     * @param userId - User identifier
     * @param featureId - Feature being accessed
     * @param config - Rate limiting configuration
     * @returns Rate limit result with secure defaults
      */
    checkRateLimit(userId: string, featureId: string, config: RateLimitConfig): Promise<RateLimitResult>;
    /**
     * Execute the actual rate limit check
      */
    private executeRateLimitCheck;
    /**
     * Track usage event with security logging
      */
    trackUsage(userId: string, featureId: string, metadata?: Record<string, any>): Promise<void>;
    /**
     * Get current usage statistics
      */
    getUsageStats(userId: string, featureId: string, windowMinutes?: number): Promise<{
        count: number;
        firstUsage?: Date;
        lastUsage?: Date;
    }>;
    /**
     * Security event logging with structured format
      */
    private logSecurityEvent;
    /**
     * Determine event severity for proper alerting
      */
    private getEventSeverity;
    /**
     * Send security events to external monitoring system
      */
    private sendToSecurityMonitoring;
    /**
     * Send event to webhook endpoint
     */
    private sendToWebhook;
    /**
     * Health check for the rate limiting service
      */
    healthCheck(): Promise<{
        healthy: boolean;
        details: Record<string, any>;
    }>;
}
export declare const secureRateLimitGuard: SecureRateLimitGuard;
//# sourceMappingURL=rate-limit-guard.service.d.ts.map
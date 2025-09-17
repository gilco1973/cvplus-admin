/**
 * LLM Security Monitor Service
 *
 * This service provides comprehensive security monitoring, threat detection,
 * and incident response for the LLM verification system.
  */
export interface SecurityEvent {
    id: string;
    type: 'verification_failure' | 'rate_limit_exceeded' | 'suspicious_activity' | 'pii_exposure' | 'injection_attempt' | 'unauthorized_access' | 'system_error';
    severity: 'low' | 'medium' | 'high' | 'critical';
    service: string;
    userId?: string;
    sessionId?: string;
    sourceIP?: string;
    userAgent?: string;
    details: Record<string, any>;
    timestamp: Date;
    resolved: boolean;
    resolutionNotes?: string;
}
export interface SecurityMetrics {
    totalEvents: number;
    eventsByType: Record<string, number>;
    eventsBySeverity: Record<string, number>;
    averageResolutionTime: number;
    activeIncidents: number;
    trendsLast24h: {
        verificationFailures: number;
        rateLimitExceeded: number;
        suspiciousActivity: number;
        piiExposures: number;
    };
}
export interface ThreatDetectionRule {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
    severity: 'low' | 'medium' | 'high' | 'critical';
    conditions: {
        eventType?: string;
        threshold?: number;
        timeWindow?: number;
        pattern?: RegExp;
        customLogic?: (event: SecurityEvent, history: SecurityEvent[]) => boolean;
    };
    actions: {
        alert: boolean;
        block: boolean;
        logLevel: 'info' | 'warn' | 'error';
        notification?: {
            email?: string[];
            slack?: string;
            webhook?: string;
        };
    };
}
export interface IncidentResponse {
    eventId: string;
    responseType: 'automated' | 'manual';
    actions: string[];
    timestamp: Date;
    success: boolean;
    notes?: string;
}
export declare class LLMSecurityMonitorService {
    private events;
    private incidents;
    private threatRules;
    private blockedIPs;
    private rateLimitTracking;
    constructor();
    /**
     * Log a security event and trigger threat detection
      */
    logSecurityEvent(event: Omit<SecurityEvent, 'id' | 'timestamp' | 'resolved'>): Promise<string>;
    /**
     * Check if an IP is currently blocked
      */
    isIPBlocked(ip: string): boolean;
    /**
     * Block an IP address temporarily
      */
    blockIP(ip: string, durationMinutes: number, reason: string): void;
    /**
     * Check rate limits for a service/IP combination
      */
    checkRateLimit(service: string, ip: string, limit?: number, windowMinutes?: number): boolean;
    /**
     * Detect potential security threats based on patterns
      */
    private processThreatDetection;
    /**
     * Evaluate if a threat detection rule is triggered
      */
    private evaluateThreatRule;
    /**
     * Handle threat detection trigger
      */
    private handleThreatDetection;
    /**
     * Send security alerts
      */
    private sendAlert;
    /**
     * Get security metrics and statistics
      */
    getSecurityMetrics(): SecurityMetrics;
    /**
     * Initialize default threat detection rules
      */
    private initializeDefaultThreatRules;
    /**
     * Utility methods
      */
    private getRecentEvents;
    private logEventBySeverity;
    private generateEventId;
    private startPeriodicCleanup;
    /**
     * Manual incident resolution
      */
    resolveSecurityEvent(eventId: string, notes?: string): boolean;
    /**
     * Add custom threat detection rule
      */
    addThreatRule(rule: ThreatDetectionRule): void;
    /**
     * Get recent security events
      */
    getRecentSecurityEvents(limit?: number): SecurityEvent[];
    /**
     * Get active incidents
      */
    getActiveIncidents(): SecurityEvent[];
    /**
     * Send email alert
     */
    private sendEmailAlert;
    /**
     * Send Slack alert
     */
    private sendSlackAlert;
    /**
     * Send webhook alert
     */
    private sendWebhookAlert;
}
export declare const llmSecurityMonitor: LLMSecurityMonitorService;
//# sourceMappingURL=llm-security-monitor.service.d.ts.map
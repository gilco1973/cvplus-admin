/**
 * Security Event Types for comprehensive monitoring
  */
export type SecurityEventType = 'RATE_LIMIT_EXCEEDED' | 'RATE_LIMIT_SERVICE_FAILURE' | 'USAGE_LIMIT_EXCEEDED' | 'USAGE_SERVICE_FAILURE' | 'UNAUTHORIZED_ACCESS_ATTEMPT' | 'AUTHENTICATION_FAILURE' | 'SUBSCRIPTION_BYPASS_ATTEMPT' | 'CIRCUIT_BREAKER_OPENED' | 'SERVICE_DEGRADATION' | 'SECURITY_POLICY_VIOLATION';
/**
 * Security Event Severity Levels
  */
export type SecurityEventSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
/**
 * Security Event Structure
  */
export interface SecurityEvent {
    id?: string;
    timestamp: string;
    eventType: SecurityEventType;
    severity: SecurityEventSeverity;
    userId?: string;
    sessionId?: string;
    ipAddress?: string;
    userAgent?: string;
    featureId?: string;
    service: string;
    message: string;
    details: Record<string, any>;
    resolved?: boolean;
    resolvedAt?: string;
    resolvedBy?: string;
}
/**
 * Security Alert Configuration
  */
export interface AlertConfig {
    eventType: SecurityEventType;
    threshold: number;
    windowMinutes: number;
    severity: SecurityEventSeverity;
    enabled: boolean;
}
/**
 * Security Monitoring Service with Real-time Alerting
 *
 * Provides comprehensive security event logging, monitoring, and alerting
 * for the CVPlus platform.
  */
export declare class SecurityMonitorService {
    private static instance;
    private db;
    private readonly defaultAlertConfigs;
    private constructor();
    static getInstance(): SecurityMonitorService;
    /**
     * Log a security event with automatic threat detection and alerting
      */
    logSecurityEvent(event: Omit<SecurityEvent, 'id' | 'timestamp'>): Promise<void>;
    /**
     * Check if security event triggers any alerts
      */
    private checkAlertConditions;
    /**
     * Trigger security alert with multiple notification channels
      */
    private triggerSecurityAlert;
    /**
     * Send critical security alerts (immediate notification)
      */
    private sendCriticalAlert;
    /**
     * Send high priority security alerts
      */
    private sendHighPriorityAlert;
    /**
     * Get security event statistics for monitoring dashboard
      */
    getSecurityStatistics(hours?: number): Promise<{
        totalEvents: number;
        eventsByType: Record<string, number>;
        eventsBySeverity: Record<string, number>;
        topUsers: Array<{
            userId: string;
            eventCount: number;
        }>;
        recentAlerts: number;
    }>;
    /**
     * Mark security event as resolved
      */
    resolveSecurityEvent(eventId: string, resolvedBy: string, notes?: string): Promise<void>;
    /**
     * Send security events to external monitoring system
      */
    private sendToExternalMonitoring;
    /**
     * Health check for security monitoring service
      */
    healthCheck(): Promise<{
        healthy: boolean;
        details: Record<string, any>;
    }>;
}
//# sourceMappingURL=security-monitor.service.d.ts.map
/**
 * CVPlus Admin Module
 *
 * A comprehensive administrative dashboard module for the CVPlus platform.
 * Provides user management, content moderation, system monitoring, analytics,
 * security auditing, and operational oversight capabilities.
 *
 * @author Gil Klainert
 * @version 1.0.0
 */
export * from './types';
export { AdminDashboardService } from './services/admin-dashboard.service';
export * from './backend';
export * from './frontend';
export * from './constants';
export declare const ADMIN_MODULE_NAME = "@cvplus/admin";
export declare const VERSION = "1.0.0";
export declare const MODULE_DEPENDENCIES: {
    readonly required: readonly ["@cvplus/core", "@cvplus/auth", "@cvplus/analytics", "@cvplus/public-profiles"];
    readonly optional: readonly ["firebase-admin", "firebase"];
};
export interface AdminModuleOptions {
    firebaseConfig?: {
        projectId: string;
        apiKey: string;
        authDomain: string;
        databaseURL?: string;
        storageBucket?: string;
    };
    apiConfig?: {
        baseUrl: string;
        timeout: number;
        retries: number;
    };
    features?: {
        realtimeUpdates: boolean;
        advancedAnalytics: boolean;
        automatedModeration: boolean;
        customDashboards: boolean;
    };
    security?: {
        mfaRequired: boolean;
        sessionTimeout: number;
        ipWhitelistEnabled: boolean;
        auditLogging: boolean;
    };
    ui?: {
        theme: 'light' | 'dark' | 'system';
        compactMode: boolean;
        enableAnimations: boolean;
    };
}
/**
 * Default module configuration
 */
export declare const DEFAULT_ADMIN_MODULE_OPTIONS: AdminModuleOptions;
/**
 * Module initialization function
 */
export declare function initializeAdminModule(options?: AdminModuleOptions): void;
export declare function checkAdminModuleHealth(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    version: string;
    dependencies: Record<string, boolean>;
    timestamp: Date;
}>;
export declare class AdminModuleError extends Error {
    code: string;
    context?: Record<string, any> | undefined;
    constructor(message: string, code: string, context?: Record<string, any> | undefined);
}
export declare class AdminPermissionError extends AdminModuleError {
    constructor(message: string, context?: Record<string, any>);
}
export declare class AdminConfigurationError extends AdminModuleError {
    constructor(message: string, context?: Record<string, any>);
}
export declare class AdminOperationError extends AdminModuleError {
    constructor(message: string, context?: Record<string, any>);
}
export declare const logger: {
    info: (message: string, context?: Record<string, any>) => void;
    warn: (message: string, context?: Record<string, any>) => void;
    error: (message: string, error?: Error, context?: Record<string, any>) => void;
    debug: (message: string, context?: Record<string, any>) => void;
};
export declare const FEATURE_FLAGS: {
    readonly ADVANCED_ANALYTICS: "admin.advanced_analytics";
    readonly REAL_TIME_MONITORING: "admin.real_time_monitoring";
    readonly AUTOMATED_MODERATION: "admin.automated_moderation";
    readonly PREDICTIVE_INSIGHTS: "admin.predictive_insights";
    readonly CUSTOM_DASHBOARDS: "admin.custom_dashboards";
    readonly WORKFLOW_AUTOMATION: "admin.workflow_automation";
    readonly MULTI_TENANT_SUPPORT: "admin.multi_tenant_support";
    readonly ADVANCED_SECURITY_AUDIT: "admin.advanced_security_audit";
};
export declare const performanceMonitor: {
    startTimer: (operation: string) => {
        end: () => number;
    };
    measureAsync: <T>(operation: string, fn: () => Promise<T>) => Promise<T>;
};
export declare class AdminCache {
    private cache;
    set(key: string, data: any, ttlMs?: number): void;
    get<T>(key: string): T | null;
    delete(key: string): boolean;
    clear(): void;
    size(): number;
    cleanup(): void;
}
export declare const adminCache: AdminCache;
//# sourceMappingURL=index.d.ts.map
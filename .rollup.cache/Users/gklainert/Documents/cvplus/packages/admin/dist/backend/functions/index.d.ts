/**
 * CVPlus Admin Backend Functions
 *
 * Firebase Functions for admin operations including user management,
 * system monitoring, business metrics, and administrative operations.
 *
 * @author Gil Klainert
 * @version 1.0.0
 */
export { getUserStats } from './getUserStats';
export { getSystemHealth } from './getSystemHealth';
export { manageUsers } from './manageUsers';
export { getBusinessMetrics } from './getBusinessMetrics';
export { getCacheStats, warmCaches, clearCaches } from './getCacheStats';
export { initializeAdmin } from './initializeAdmin';
export { videoAnalyticsDashboard } from './videoAnalyticsDashboard';
export { testConfiguration } from './testConfiguration';
export { monitorStuckJobs, triggerJobMonitoring, getJobDetails, getJobStats } from './monitorJobs';
export { cleanupTempFiles } from './cleanupTempFiles';
export { testCors, testCorsCall } from './corsTestFunction';
export { getUserPolicyViolations } from './getUserPolicyViolations';
export { getUserUsageStats } from './getUserUsageStats';
/**
 * Available admin functions and their permissions
 */
export declare const ADMIN_FUNCTIONS: {
    readonly getUserStats: {
        readonly name: "getUserStats";
        readonly description: "Get comprehensive user statistics and management data";
        readonly requiredPermissions: readonly ["canManageUsers"];
        readonly category: "USER_MANAGEMENT";
        readonly region: "us-central1";
    };
    readonly getSystemHealth: {
        readonly name: "getSystemHealth";
        readonly description: "Get system health monitoring and performance metrics";
        readonly requiredPermissions: readonly ["canMonitorSystem"];
        readonly category: "SYSTEM_MONITORING";
        readonly region: "us-central1";
    };
    readonly manageUsers: {
        readonly name: "manageUsers";
        readonly description: "Perform user management operations (create, update, delete, suspend)";
        readonly requiredPermissions: readonly ["canManageUsers"];
        readonly category: "USER_MANAGEMENT";
        readonly region: "us-central1";
    };
    readonly getBusinessMetrics: {
        readonly name: "getBusinessMetrics";
        readonly description: "Get business intelligence metrics and analytics data";
        readonly requiredPermissions: readonly ["canViewAnalytics"];
        readonly category: "BUSINESS_ANALYTICS";
        readonly region: "us-central1";
    };
    readonly getCacheStats: {
        readonly name: "getCacheStats";
        readonly description: "Get system cache statistics and performance metrics";
        readonly requiredPermissions: readonly ["canMonitorSystem"];
        readonly category: "SYSTEM_MONITORING";
        readonly region: "us-central1";
    };
    readonly initializeAdmin: {
        readonly name: "initializeAdmin";
        readonly description: "Initialize admin user account with proper permissions";
        readonly requiredPermissions: readonly ["canManageAdmins"];
        readonly category: "ADMIN_MANAGEMENT";
        readonly region: "us-central1";
    };
    readonly videoAnalyticsDashboard: {
        readonly name: "videoAnalyticsDashboard";
        readonly description: "Comprehensive video analytics dashboard with performance and business metrics";
        readonly requiredPermissions: readonly ["canViewAnalytics"];
        readonly category: "BUSINESS_ANALYTICS";
        readonly region: "us-central1";
    };
    readonly testConfiguration: {
        readonly name: "testConfiguration";
        readonly description: "Test system configuration and service availability";
        readonly requiredPermissions: readonly ["canMonitorSystem"];
        readonly category: "SYSTEM_MONITORING";
        readonly region: "us-central1";
    };
    readonly monitorStuckJobs: {
        readonly name: "monitorStuckJobs";
        readonly description: "Scheduled monitoring and recovery of stuck CV generation jobs";
        readonly requiredPermissions: readonly ["canMonitorSystem"];
        readonly category: "SYSTEM_MONITORING";
        readonly region: "us-central1";
    };
    readonly triggerJobMonitoring: {
        readonly name: "triggerJobMonitoring";
        readonly description: "Manual trigger for job monitoring and statistics";
        readonly requiredPermissions: readonly ["canMonitorSystem"];
        readonly category: "SYSTEM_MONITORING";
        readonly region: "us-central1";
    };
    readonly getJobDetails: {
        readonly name: "getJobDetails";
        readonly description: "Get detailed information about specific jobs for debugging";
        readonly requiredPermissions: readonly ["canMonitorSystem"];
        readonly category: "SYSTEM_MONITORING";
        readonly region: "us-central1";
    };
    readonly getJobStats: {
        readonly name: "getJobStats";
        readonly description: "Get comprehensive job processing statistics";
        readonly requiredPermissions: readonly ["canMonitorSystem"];
        readonly category: "SYSTEM_MONITORING";
        readonly region: "us-central1";
    };
    readonly cleanupTempFiles: {
        readonly name: "cleanupTempFiles";
        readonly description: "Scheduled cleanup of temporary files and failed jobs";
        readonly requiredPermissions: readonly ["canManageSystem"];
        readonly category: "SYSTEM_MAINTENANCE";
        readonly region: "us-central1";
    };
    readonly testCors: {
        readonly name: "testCors";
        readonly description: "Test CORS configuration for admin functions";
        readonly requiredPermissions: readonly ["canMonitorSystem"];
        readonly category: "SYSTEM_MONITORING";
        readonly region: "us-central1";
    };
    readonly testCorsCall: {
        readonly name: "testCorsCall";
        readonly description: "Test CORS configuration for callable functions";
        readonly requiredPermissions: readonly ["canMonitorSystem"];
        readonly category: "SYSTEM_MONITORING";
        readonly region: "us-central1";
    };
    readonly getUserPolicyViolations: {
        readonly name: "getUserPolicyViolations";
        readonly description: "Get user policy violations and warnings for review";
        readonly requiredPermissions: readonly ["canManageUsers"];
        readonly category: "POLICY_MANAGEMENT";
        readonly region: "us-central1";
    };
    readonly getUserUsageStats: {
        readonly name: "getUserUsageStats";
        readonly description: "Get user usage statistics and subscription limits";
        readonly requiredPermissions: readonly ["canManageUsers"];
        readonly category: "POLICY_MANAGEMENT";
        readonly region: "us-central1";
    };
};
/**
 * Function categories
 */
export declare const FUNCTION_CATEGORIES: {
    readonly USER_MANAGEMENT: "User Management";
    readonly SYSTEM_MONITORING: "System Monitoring";
    readonly BUSINESS_ANALYTICS: "Business Analytics";
    readonly ADMIN_MANAGEMENT: "Admin Management";
    readonly CONTENT_MODERATION: "Content Moderation";
    readonly SECURITY_AUDIT: "Security Audit";
    readonly SYSTEM_MAINTENANCE: "System Maintenance";
    readonly POLICY_MANAGEMENT: "Policy Management";
};
/**
 * Required permissions for admin functions
 */
export declare const ADMIN_PERMISSIONS: {
    readonly canManageUsers: "Can manage user accounts and permissions";
    readonly canMonitorSystem: "Can monitor system health and performance";
    readonly canViewAnalytics: "Can view business metrics and analytics";
    readonly canManageAdmins: "Can create and manage admin accounts";
    readonly canModerateContent: "Can moderate and review content";
    readonly canAuditSecurity: "Can perform security audits and reviews";
    readonly canManageSystem: "Can perform system maintenance operations";
};
/**
 * Function deployment configuration
 */
export declare const DEPLOYMENT_CONFIG: {
    readonly runtime: "nodejs18";
    readonly region: "us-central1";
    readonly timeoutSeconds: 540;
    readonly availableMemoryMb: 1024;
    readonly cors: true;
    readonly enforceAppCheck: false;
};
//# sourceMappingURL=index.d.ts.map
/**
 * CVPlus Admin Services
 *
 * Centralized exports for all admin-related services including
 * dashboard services, user management, system monitoring, and administrative operations.
 *
 * @author Gil Klainert
 * @version 1.0.0
  */
export { AdminAccessService } from './admin-access.service';
export { AdminDashboardService } from './admin-dashboard.service';
/**
 * Available admin services and their capabilities
  */
export declare const ADMIN_SERVICES: {
    readonly AdminAccessService: {
        readonly name: "AdminAccessService";
        readonly description: "Centralized admin authentication, authorization, and permission management";
        readonly category: "AUTHENTICATION";
        readonly capabilities: readonly ["Admin access verification", "Permission-based authorization", "Role-based access control", "Custom claims management", "Admin action audit logging"];
    };
    readonly AdminDashboardService: {
        readonly name: "AdminDashboardService";
        readonly description: "Comprehensive admin dashboard data aggregation and management";
        readonly category: "DASHBOARD";
        readonly capabilities: readonly ["User statistics aggregation", "System health monitoring", "Business metrics calculation", "Real-time dashboard updates", "Performance analytics"];
    };
};
/**
 * Service categories
  */
export declare const SERVICE_CATEGORIES: {
    readonly AUTHENTICATION: "Authentication & Authorization";
    readonly DASHBOARD: "Dashboard Services";
    readonly USER_MANAGEMENT: "User Management";
    readonly SYSTEM_MONITORING: "System Monitoring";
    readonly ANALYTICS: "Analytics & Reporting";
    readonly CONTENT_MODERATION: "Content Moderation";
};
//# sourceMappingURL=index.d.ts.map
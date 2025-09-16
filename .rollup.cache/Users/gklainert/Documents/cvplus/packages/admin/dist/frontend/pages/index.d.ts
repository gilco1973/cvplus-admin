/**
 * CVPlus Admin Frontend Pages
 *
 * React pages for administrative dashboard interfaces.
 *
 * @author Gil Klainert
 * @version 1.0.0
  */
export { AdminDashboard } from './AdminDashboard';
export { default as RevenueAnalyticsDashboard } from './RevenueAnalyticsDashboard';
/**
 * Available admin pages
  */
export declare const ADMIN_PAGES: {
    readonly dashboard: {
        readonly name: "AdminDashboard";
        readonly path: "/admin/dashboard";
        readonly description: "Main administrative dashboard with overview metrics";
        readonly category: "OVERVIEW";
        readonly permissions: readonly ["canAccessDashboard"];
        readonly dependencies: readonly ["react", "@cvplus/admin", "@cvplus/auth"];
    };
    readonly revenueAnalytics: {
        readonly name: "RevenueAnalyticsDashboard";
        readonly path: "/admin/revenue";
        readonly description: "Revenue analytics and business metrics dashboard";
        readonly category: "ANALYTICS";
        readonly permissions: readonly ["canViewAnalytics", "canViewFinancials"];
        readonly dependencies: readonly ["react", "@cvplus/admin", "@cvplus/analytics"];
    };
};
/**
 * Page categories
  */
export declare const PAGE_CATEGORIES: {
    readonly OVERVIEW: "Overview Pages";
    readonly ANALYTICS: "Analytics Pages";
    readonly USER_MANAGEMENT: "User Management Pages";
    readonly MONITORING: "System Monitoring Pages";
    readonly MODERATION: "Content Moderation Pages";
    readonly SECURITY: "Security Pages";
    readonly SETTINGS: "Settings Pages";
};
/**
 * Page routing configuration
  */
export declare const ADMIN_ROUTES: {
    readonly dashboard: "/admin/dashboard";
    readonly userManagement: "/admin/users";
    readonly contentModeration: "/admin/moderation";
    readonly systemMonitoring: "/admin/system";
    readonly businessAnalytics: "/admin/analytics";
    readonly revenueAnalytics: "/admin/revenue";
    readonly securityAudit: "/admin/security";
    readonly supportTickets: "/admin/support";
    readonly settings: "/admin/settings";
};
export interface AdminPageProps {
    className?: string;
    'data-testid'?: string;
}
export interface DashboardPageProps extends AdminPageProps {
    refreshInterval?: number;
    autoRefresh?: boolean;
}
/**
 * Page utilities and helpers
  */
export declare const pageUtils: {
    /**
     * Generate page title for admin pages
      */
    generatePageTitle: (pageName: string) => string;
    /**
     * Check if user has permission to access page
      */
    hasPagePermission: (userPermissions: string[], requiredPermissions: string[]) => boolean;
    /**
     * Generate breadcrumb for admin pages
      */
    generateBreadcrumb: (currentPage: string) => Array<{
        label: string;
        path: string;
    }>;
};
//# sourceMappingURL=index.d.ts.map
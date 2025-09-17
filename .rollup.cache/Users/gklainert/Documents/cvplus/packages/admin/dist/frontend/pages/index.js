/**
 * CVPlus Admin Frontend Pages
 *
 * React pages for administrative dashboard interfaces.
 *
 * @author Gil Klainert
 * @version 1.0.0
  */
// ============================================================================
// PAGE EXPORTS
// ============================================================================
export { AdminDashboard } from './AdminDashboard';
export { default as RevenueAnalyticsDashboard } from './RevenueAnalyticsDashboard';
// ============================================================================
// PAGE METADATA
// ============================================================================
/**
 * Available admin pages
  */
export const ADMIN_PAGES = {
    dashboard: {
        name: 'AdminDashboard',
        path: '/admin/dashboard',
        description: 'Main administrative dashboard with overview metrics',
        category: 'OVERVIEW',
        permissions: ['canAccessDashboard'],
        dependencies: ['react', '@cvplus/admin', '@cvplus/auth']
    },
    revenueAnalytics: {
        name: 'RevenueAnalyticsDashboard',
        path: '/admin/revenue',
        description: 'Revenue analytics and business metrics dashboard',
        category: 'ANALYTICS',
        permissions: ['canViewAnalytics', 'canViewFinancials'],
        dependencies: ['react', '@cvplus/admin', '@cvplus/analytics']
    }
};
/**
 * Page categories
  */
export const PAGE_CATEGORIES = {
    OVERVIEW: 'Overview Pages',
    ANALYTICS: 'Analytics Pages',
    USER_MANAGEMENT: 'User Management Pages',
    MONITORING: 'System Monitoring Pages',
    MODERATION: 'Content Moderation Pages',
    SECURITY: 'Security Pages',
    SETTINGS: 'Settings Pages'
};
/**
 * Page routing configuration
  */
export const ADMIN_ROUTES = {
    dashboard: '/admin/dashboard',
    userManagement: '/admin/users',
    contentModeration: '/admin/moderation',
    systemMonitoring: '/admin/system',
    businessAnalytics: '/admin/analytics',
    revenueAnalytics: '/admin/revenue',
    securityAudit: '/admin/security',
    supportTickets: '/admin/support',
    settings: '/admin/settings'
};
// ============================================================================
// PAGE UTILITIES
// ============================================================================
/**
 * Page utilities and helpers
  */
export const pageUtils = {
    /**
     * Generate page title for admin pages
      */
    generatePageTitle: (pageName) => {
        return `CVPlus Admin - ${pageName}`;
    },
    /**
     * Check if user has permission to access page
      */
    hasPagePermission: (userPermissions, requiredPermissions) => {
        return requiredPermissions.every(permission => userPermissions.includes(permission));
    },
    /**
     * Generate breadcrumb for admin pages
      */
    generateBreadcrumb: (currentPage) => {
        const breadcrumb = [
            { label: 'Admin', path: '/admin' }
        ];
        const pageConfig = Object.values(ADMIN_PAGES).find(page => page.name === currentPage);
        if (pageConfig) {
            breadcrumb.push({
                label: pageConfig.description,
                path: pageConfig.path
            });
        }
        return breadcrumb;
    }
};
//# sourceMappingURL=index.js.map
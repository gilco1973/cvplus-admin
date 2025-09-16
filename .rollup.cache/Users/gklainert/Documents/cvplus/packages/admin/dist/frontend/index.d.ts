/**
 * CVPlus Admin Frontend Module
 *
 * Frontend components, pages, and hooks for administrative interfaces.
 *
 * @author Gil Klainert
 * @version 1.0.0
  */
export * from './components';
export * from './pages';
export * from './hooks';
export declare const ADMIN_FRONTEND_MODULE: {
    readonly name: "@cvplus/admin/frontend";
    readonly version: "1.0.0";
    readonly description: "Frontend React components and pages for CVPlus admin operations";
    readonly author: "Gil Klainert";
};
/**
 * Frontend module capabilities
  */
export declare const FRONTEND_CAPABILITIES: {
    readonly dashboardComponents: "Comprehensive admin dashboard components";
    readonly userManagementUI: "User management interface components";
    readonly systemMonitoringUI: "System monitoring visualization components";
    readonly businessAnalyticsUI: "Business analytics dashboard components";
    readonly contentModerationUI: "Content moderation interface components";
    readonly securityAuditUI: "Security audit and compliance components";
    readonly realtimeUpdates: "Real-time data update components";
    readonly responsiveDesign: "Mobile-responsive admin interfaces";
};
/**
 * Frontend dependencies
  */
export declare const FRONTEND_DEPENDENCIES: {
    readonly core: {
        readonly react: "^18.0.0";
        readonly 'react-dom': "^18.0.0";
    };
    readonly packages: {
        readonly '@cvplus/core': "^1.0.0";
        readonly '@cvplus/auth': "^1.0.0";
        readonly '@cvplus/analytics': "^1.0.0";
    };
    readonly ui: {
        readonly tailwindcss: "^3.0.0";
    };
};
//# sourceMappingURL=index.d.ts.map
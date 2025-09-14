/**
 * CVPlus Admin Frontend Components
 *
 * React components for administrative dashboard interfaces.
 *
 * @author Gil Klainert
 * @version 1.0.0
 */
export { AdminLayout } from './AdminLayout';
export { BusinessMetricsCard } from './BusinessMetricsCard';
export { UserStatsCard } from './UserStatsCard';
export { SystemHealthCard } from './SystemHealthCard';
export { AnalyticsDashboard } from './AnalyticsDashboard';
/**
 * Available admin components
 */
export declare const ADMIN_COMPONENTS: {
    readonly layout: {
        readonly name: "AdminLayout";
        readonly description: "Main layout component for admin pages";
        readonly category: "LAYOUT";
        readonly dependencies: readonly ["react", "@cvplus/auth"];
    };
    readonly businessMetrics: {
        readonly name: "BusinessMetricsCard";
        readonly description: "Business metrics display card";
        readonly category: "ANALYTICS";
        readonly dependencies: readonly ["react", "@cvplus/analytics"];
    };
    readonly userStats: {
        readonly name: "UserStatsCard";
        readonly description: "User statistics display card";
        readonly category: "USER_MANAGEMENT";
        readonly dependencies: readonly ["react", "@cvplus/core"];
    };
    readonly systemHealth: {
        readonly name: "SystemHealthCard";
        readonly description: "System health monitoring card";
        readonly category: "MONITORING";
        readonly dependencies: readonly ["react", "@cvplus/core"];
    };
};
/**
 * Component categories
 */
export declare const COMPONENT_CATEGORIES: {
    readonly LAYOUT: "Layout Components";
    readonly ANALYTICS: "Analytics Components";
    readonly USER_MANAGEMENT: "User Management Components";
    readonly MONITORING: "System Monitoring Components";
    readonly MODERATION: "Content Moderation Components";
    readonly SECURITY: "Security Components";
};
export interface AdminComponentProps {
    className?: string;
    'data-testid'?: string;
}
export interface CardComponentProps extends AdminComponentProps {
    loading?: boolean;
    error?: string | null;
    refreshData?: () => void;
}
/**
 * Common component utilities and helpers
 */
export declare const componentUtils: {
    /**
     * Generate data-testid for admin components
     */
    generateTestId: (component: string, element?: string) => string;
    /**
     * Common loading states
     */
    loadingStates: {
        readonly IDLE: "idle";
        readonly LOADING: "loading";
        readonly SUCCESS: "success";
        readonly ERROR: "error";
    };
    /**
     * Common error handling
     */
    handleComponentError: (error: Error, componentName: string) => void;
};
//# sourceMappingURL=index.d.ts.map
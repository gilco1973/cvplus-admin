/**
 * CVPlus Admin Module - React Exports
 *
 * Centralized exports for React components, hooks, and providers for the admin module.
 * This file is designed to be imported by applications using the admin module with React.
 *
 * @author Gil Klainert
 * @version 1.0.0
 */
export { AdminLayout } from './frontend/components/AdminLayout';
export { SystemHealthCard } from './frontend/components/SystemHealthCard';
export { UserStatsCard } from './frontend/components/UserStatsCard';
export { BusinessMetricsCard } from './frontend/components/BusinessMetricsCard';
export { useAdminAuth } from './frontend/hooks/useAdminAuth';
export { AdminDashboard } from './frontend/pages/AdminDashboard';
export { default as RevenueAnalyticsDashboard } from './frontend/pages/RevenueAnalyticsDashboard';
export type { AdminPageProps, DashboardPageProps } from './frontend/pages';
export { pageUtils } from './frontend/pages';
//# sourceMappingURL=react-exports.d.ts.map
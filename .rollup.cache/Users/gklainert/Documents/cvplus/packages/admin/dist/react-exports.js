/**
 * CVPlus Admin Module - React Exports
 *
 * Centralized exports for React components, hooks, and providers for the admin module.
 * This file is designed to be imported by applications using the admin module with React.
 *
 * @author Gil Klainert
 * @version 1.0.0
 */
// ============================================================================
// REACT COMPONENTS EXPORTS
// ============================================================================
export { AdminLayout } from './frontend/components/AdminLayout';
export { SystemHealthCard } from './frontend/components/SystemHealthCard';
export { UserStatsCard } from './frontend/components/UserStatsCard';
export { BusinessMetricsCard } from './frontend/components/BusinessMetricsCard';
// ============================================================================
// REACT HOOKS EXPORTS
// ============================================================================
export { useAdminAuth } from './frontend/hooks/useAdminAuth';
// ============================================================================
// REACT PAGES EXPORTS
// ============================================================================
export { AdminDashboard } from './frontend/pages/AdminDashboard';
export { default as RevenueAnalyticsDashboard } from './frontend/pages/RevenueAnalyticsDashboard';
// ============================================================================
// REACT UTILITIES
// ============================================================================
export { pageUtils } from './frontend/pages';
//# sourceMappingURL=react-exports.js.map
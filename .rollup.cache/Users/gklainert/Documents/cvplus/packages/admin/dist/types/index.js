/**
 * CVPlus Admin Module - Type Definitions
 *
 * Comprehensive type system for the CVPlus admin dashboard module.
 * Provides type safety and consistency across all admin functionality.
 *
 * @author Gil Klainert
 * @version 1.0.0
 */
// ============================================================================
// CORE ADMIN TYPES
// ============================================================================
// Admin types (primary definitions)
export * from './admin.types';
// Export specific enums to avoid conflicts
export { AdminQuickActionType, QuickActionCategory, RealtimeConnectionStatus } from './dashboard.types';
// TODO: Fix type issues in other modules and re-enable these exports
// export type { ModerationQueue } from './moderation.types';
// export type { SystemHealthStatus } from './monitoring.types';
// export type { SecurityAuditRecord } from './security.types';
// export type { UserManagementAction } from './user-management.types';
//# sourceMappingURL=index.js.map
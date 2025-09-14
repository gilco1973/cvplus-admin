/**
 * T036: Admin package logging in packages/admin/src/logging/AdminLogger.ts
 *
 * Specialized logger for admin operations, system monitoring, and configuration events
 */

import { AdminLogger as BaseAdminLogger, adminLogger } from '@cvplus/core';

// Re-export the admin logger
export { adminLogger };
export default adminLogger;
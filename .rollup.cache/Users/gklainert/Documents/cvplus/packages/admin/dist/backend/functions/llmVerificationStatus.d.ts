export declare const llmVerificationStatus: import("firebase-functions/v2/https").HttpsFunction;
/**
 * Handle system health check
  */
declare function handleHealthCheck(res: any): Promise<any>;
/**
 * Handle metrics request
  */
declare function handleMetrics(res: any, timeRange: '1h' | '24h' | '7d'): Promise<any>;
/**
 * Handle dashboard data request
  */
declare function handleDashboard(res: any, timeRange: '1h' | '24h' | '7d'): Promise<any>;
export { handleHealthCheck, handleMetrics, handleDashboard };
//# sourceMappingURL=llmVerificationStatus.d.ts.map
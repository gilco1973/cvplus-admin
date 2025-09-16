/**
 * Job Monitoring Functions
 *
 * Administrative functions for monitoring and managing CV generation jobs.
 * Includes scheduled monitoring, manual triggers, and job statistics.
 *
 * @author Gil Klainert
 * @version 1.0.0
 */
/**
 * Scheduled function to monitor and recover stuck CV generation jobs
 * Runs every 10 minutes to check for stuck jobs
 */
export declare const monitorStuckJobs: import("firebase-functions/v2/scheduler").ScheduleFunction;
/**
 * Manual job monitoring trigger for admin use
 */
export declare const triggerJobMonitoring: import("firebase-functions/v2/https").CallableFunction<any, Promise<{
    success: boolean;
    message: string;
    stats: import("..").JobProcessingStats;
    timestamp: string;
    error?: undefined;
} | {
    success: boolean;
    error: any;
    timestamp: string;
    message?: undefined;
    stats?: undefined;
}>>;
/**
 * Get detailed information about a specific job for debugging
 */
export declare const getJobDetails: import("firebase-functions/v2/https").CallableFunction<any, Promise<{
    success: boolean;
    message: string;
    jobId: any;
    timestamp: string;
    error?: undefined;
} | {
    success: boolean;
    error: any;
    jobId: any;
    timestamp: string;
    message?: undefined;
}>>;
/**
 * Get job processing statistics
 */
export declare const getJobStats: import("firebase-functions/v2/https").CallableFunction<any, Promise<{
    success: boolean;
    stats: import("..").JobProcessingStats;
    timestamp: string;
    error?: undefined;
} | {
    success: boolean;
    error: any;
    timestamp: string;
    stats?: undefined;
}>>;
//# sourceMappingURL=monitorJobs.d.ts.map
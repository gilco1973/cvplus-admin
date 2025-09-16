/**
 * Job Monitoring Service
 *
 * Service for monitoring CV generation jobs, detecting stuck jobs,
 * and providing job statistics for administrative oversight.
 *
 * @author Gil Klainert
 * @version 1.0.0
  */
export interface JobProcessingStats {
    totalJobs: number;
    activeJobs: number;
    completedJobs: number;
    failedJobs: number;
    stuckJobs: number;
    averageProcessingTime: number;
    successRate: number;
    jobsByStatus: Record<string, number>;
    processingTimeDistribution: {
        under1min: number;
        under5min: number;
        under15min: number;
        over15min: number;
    };
}
export interface JobDetails {
    id: string;
    userId: string;
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'stuck';
    createdAt: Date;
    updatedAt: Date;
    completedAt?: Date;
    processingTime?: number;
    errorDetails?: any;
    metadata: Record<string, any>;
}
export declare class JobMonitoringService {
    private static db;
    /**
     * Monitor and recover stuck CV generation jobs
      */
    static monitorStuckJobs(): Promise<void>;
    /**
     * Get detailed information about a specific job
      */
    static logJobDetails(jobId: string): Promise<JobDetails | null>;
    /**
     * Get comprehensive job processing statistics
      */
    static getJobProcessingStats(): Promise<JobProcessingStats>;
    /**
     * Identify stuck jobs based on various criteria
      */
    private static identifyStuckJobs;
    /**
     * Handle a stuck job by attempting recovery or marking as failed
      */
    private static handleStuckJob;
    /**
     * Check if a stuck job can be recovered
      */
    private static canJobBeRecovered;
    /**
     * Attempt to recover a stuck job
      */
    private static recoverStuckJob;
    /**
     * Mark a stuck job as failed
      */
    private static markJobAsFailed;
    /**
     * Log related job documents for debugging
      */
    private static logRelatedJobDocuments;
    /**
     * Update monitoring statistics
      */
    private static updateMonitoringStats;
    /**
     * Get default statistics
      */
    private static getDefaultStats;
}
//# sourceMappingURL=job-monitoring.service.d.ts.map
/**
 * Video Analytics Dashboard Function
 *
 * Placeholder Firebase Function for video analytics dashboard.
 * Maintains API compatibility while analytics functionality is migrated.
  */
interface VideoAnalyticsRequest {
    timeRange?: string;
    userId?: string;
    videoType?: string;
}
interface VideoAnalyticsResponse {
    success: boolean;
    data?: {
        totalVideos: number;
        viewCount: number;
        engagementRate: number;
        topPerformingVideos: Array<{
            id: string;
            title: string;
            views: number;
            engagement: number;
        }>;
    };
    error?: string;
    timestamp: string;
}
export declare const videoAnalyticsDashboard: import("firebase-functions/v2/https").CallableFunction<VideoAnalyticsRequest, Promise<VideoAnalyticsResponse>>;
export {};
//# sourceMappingURL=videoAnalyticsDashboard.d.ts.map
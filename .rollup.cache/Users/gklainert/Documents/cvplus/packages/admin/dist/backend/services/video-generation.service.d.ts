/**
 * Video Generation Service - Admin Placeholder
 *
 * Placeholder service for video generation functionality that has been moved to @cvplus/multimedia.
 * This placeholder maintains compatibility while the multimedia submodule is being integrated.
 */
export declare class VideoGenerationService {
    private didApiKey;
    constructor();
    /**
     * Check if video generation service is available
     */
    isAvailable(): boolean;
    /**
     * Test video generation functionality
     */
    testVideoGeneration(): Promise<{
        success: boolean;
        responseTime?: number;
        error?: string;
        details?: any;
    }>;
    /**
     * Get service status information
     */
    getServiceStatus(): {
        name: string;
        available: boolean;
        configured: boolean;
        provider: string;
        lastTested?: Date;
    };
    /**
     * Get available avatars for testing
     */
    getAvailableAvatars(): Array<{
        type: string;
        name: string;
        configured: boolean;
        avatarId?: string;
        voiceId?: string;
    }>;
}
//# sourceMappingURL=video-generation.service.d.ts.map
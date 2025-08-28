/**
 * Video Generation Service
 *
 * Service for testing video generation functionality and API availability.
 * Used by admin configuration testing to verify video generation capabilities.
 *
 * @author Gil Klainert
 * @version 1.0.0
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
    /**
     * Test specific avatar configuration
     */
    testAvatarConfiguration(type: string): Promise<{
        success: boolean;
        configured: boolean;
        error?: string;
    }>;
}
//# sourceMappingURL=video-generation.service.d.ts.map
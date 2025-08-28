/**
 * Podcast Generation Service
 *
 * Service for testing podcast generation functionality and API availability.
 * Used by admin configuration testing to verify podcast generation capabilities.
 *
 * @author Gil Klainert
 * @version 1.0.0
 */
export declare class PodcastGenerationService {
    private elevenLabsApiKey;
    private openaiApiKey;
    constructor();
    /**
     * Check if podcast generation service is available
     */
    isAvailable(): boolean;
    /**
     * Test podcast generation functionality
     */
    testPodcastGeneration(): Promise<{
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
        dependencies: Array<{
            name: string;
            available: boolean;
        }>;
        lastTested?: Date;
    };
    /**
     * Get available voices for testing
     */
    getAvailableVoices(): Array<{
        id: string;
        name: string;
        configured: boolean;
    }>;
}
//# sourceMappingURL=podcast-generation.service.d.ts.map
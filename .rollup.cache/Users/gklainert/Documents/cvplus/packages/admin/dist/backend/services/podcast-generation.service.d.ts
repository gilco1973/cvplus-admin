/**
 * Podcast Generation Service - Admin Placeholder
 *
 * Placeholder service for podcast generation functionality that has been moved to @cvplus/multimedia.
 * This placeholder maintains compatibility while the multimedia submodule is being integrated.
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
}
//# sourceMappingURL=podcast-generation.service.d.ts.map
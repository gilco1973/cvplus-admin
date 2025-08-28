/**
 * Web Search Service
 *
 * Service for testing web search functionality and API availability.
 * Used by admin configuration testing to verify search capabilities.
 *
 * @author Gil Klainert
 * @version 1.0.0
 */
export declare class WebSearchService {
    private apiKey;
    constructor();
    /**
     * Check if web search service is available
     */
    isAvailable(): boolean;
    /**
     * Test search functionality
     */
    testSearch(query?: string): Promise<{
        success: boolean;
        responseTime?: number;
        error?: string;
    }>;
    /**
     * Get service status information
     */
    getServiceStatus(): {
        name: string;
        available: boolean;
        configured: boolean;
        lastTested?: Date;
    };
}
//# sourceMappingURL=web-search.service.d.ts.map
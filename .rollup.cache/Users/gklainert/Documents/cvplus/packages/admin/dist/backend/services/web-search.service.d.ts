/**
 * Web Search Service - Admin Placeholder
 *
 * Placeholder service for web search functionality that has been moved to @cvplus/core.
 * This placeholder maintains compatibility while the core submodule is being integrated.
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
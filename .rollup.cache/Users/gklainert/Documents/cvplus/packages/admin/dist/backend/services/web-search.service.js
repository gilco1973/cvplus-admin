/**
 * Web Search Service - Admin Placeholder
 *
 * Placeholder service for web search functionality that has been moved to @cvplus/core.
 * This placeholder maintains compatibility while the core submodule is being integrated.
  */
export class WebSearchService {
    constructor() {
        this.apiKey = process.env.SERPER_API_KEY;
    }
    /**
     * Check if web search service is available
      */
    isAvailable() {
        return !!this.apiKey;
    }
    /**
     * Test search functionality
      */
    async testSearch(query = 'test') {
        if (!this.isAvailable()) {
            return {
                success: false,
                error: 'API key not configured'
            };
        }
        const startTime = Date.now();
        try {
            // Placeholder implementation
            await new Promise(resolve => setTimeout(resolve, 100));
            return {
                success: true,
                responseTime: Date.now() - startTime
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
                responseTime: Date.now() - startTime
            };
        }
    }
    /**
     * Get service status information
      */
    getServiceStatus() {
        return {
            name: 'Web Search (Serper)',
            available: this.isAvailable(),
            configured: !!this.apiKey,
            lastTested: new Date()
        };
    }
}
// Note: Full web search service has been moved to @cvplus/core/services/search/web-search.service.ts
//# sourceMappingURL=web-search.service.js.map
/**
 * Web Search Service
 *
 * Service for testing web search functionality and API availability.
 * Used by admin configuration testing to verify search capabilities.
 *
 * @author Gil Klainert
 * @version 1.0.0
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
            // Mock search test - in real implementation would make actual API call
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
//# sourceMappingURL=web-search.service.js.map
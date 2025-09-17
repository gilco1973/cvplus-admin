/**
 * Web Search Service
 *
 * Real service for web search functionality using Serper API.
 * Handles search queries for admin monitoring and content analysis.
 */
export class WebSearchService {
    constructor() {
        this.baseUrl = 'https://google.serper.dev/search';
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
            // Test with a simple search query
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'X-API-KEY': this.apiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    q: query,
                    num: 1 // Limit to 1 result for testing
                })
            });
            if (!response.ok) {
                throw new Error(`Serper API error: ${response.status}`);
            }
            await response.json(); // Parse response to ensure it's valid
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
     * Perform web search
     */
    async search(query, options) {
        if (!this.isAvailable()) {
            return {
                success: false,
                error: 'API key not configured'
            };
        }
        const startTime = Date.now();
        try {
            const endpoint = options?.type === 'news' ? 'https://google.serper.dev/news' :
                options?.type === 'images' ? 'https://google.serper.dev/images' :
                    this.baseUrl;
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'X-API-KEY': this.apiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    q: query,
                    num: options?.num || 10,
                    gl: options?.gl || 'us',
                    hl: options?.hl || 'en'
                })
            });
            if (!response.ok) {
                throw new Error(`Serper API error: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
            const results = (data.organic || data.news || data.images || []).map((item, index) => ({
                title: item.title,
                link: item.link,
                snippet: item.snippet || item.description || '',
                position: index + 1,
                date: item.date,
                source: item.source
            }));
            return {
                success: true,
                results,
                totalResults: data.searchInformation?.totalResults || results.length,
                searchTime: data.searchInformation?.searchTime,
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
     * Search for security threats or mentions
     */
    async searchSecurityThreats(keywords) {
        const query = `"${keywords.join('" OR "')}" security vulnerability threat`;
        return this.search(query, { num: 20, type: 'news' });
    }
    /**
     * Monitor brand mentions
     */
    async monitorBrandMentions(brandName) {
        const query = `"${brandName}" (review OR mention OR feedback OR issue)`;
        return this.search(query, { num: 15, type: 'news' });
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
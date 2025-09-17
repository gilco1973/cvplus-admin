/**
 * Web Search Service
 *
 * Real service for web search functionality using Serper API.
 * Handles search queries for admin monitoring and content analysis.
 */
export interface SearchResult {
    title: string;
    link: string;
    snippet: string;
    position: number;
    date?: string;
    source?: string;
}
export interface SearchResponse {
    success: boolean;
    results?: SearchResult[];
    totalResults?: number;
    searchTime?: number;
    error?: string;
    responseTime?: number;
}
export declare class WebSearchService {
    private apiKey;
    private baseUrl;
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
     * Perform web search
     */
    search(query: string, options?: {
        num?: number;
        type?: 'search' | 'news' | 'images';
        gl?: string;
        hl?: string;
    }): Promise<SearchResponse>;
    /**
     * Search for security threats or mentions
     */
    searchSecurityThreats(keywords: string[]): Promise<SearchResponse>;
    /**
     * Monitor brand mentions
     */
    monitorBrandMentions(brandName: string): Promise<SearchResponse>;
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
/**
 * Configuration Test Service
 *
 * Service for testing and validating system configuration settings,
 * API keys, and service availability for administrative monitoring.
 *
 * @author Gil Klainert
 * @version 1.0.0
  */
export interface SystemConfiguration {
    firebase: {
        apiKey?: string;
        authDomain?: string;
        projectId?: string;
        messagingSenderId?: string;
        appId?: string;
    };
    storage: {
        bucketName?: string;
    };
    elevenLabs: {
        apiKey?: string;
        host1VoiceId?: string;
        host2VoiceId?: string;
    };
    openai: {
        apiKey?: string;
    };
    search: {
        serperApiKey?: string;
    };
    videoGeneration: {
        didApiKey?: string;
        avatars: {
            professional: {
                id?: string;
                voiceId?: string;
            };
            friendly: {
                id?: string;
                voiceId?: string;
            };
            energetic: {
                id?: string;
                voiceId?: string;
            };
        };
    };
    features: {
        enableVideoGeneration?: boolean;
        enablePodcastGeneration?: boolean;
        enablePublicProfiles?: boolean;
        enableRagChat?: boolean;
        publicProfiles?: {
            baseUrl?: string;
        };
    };
}
export declare class ConfigurationTestService {
    /**
     * Get system configuration with security-safe values
      */
    getConfiguration(): Promise<SystemConfiguration>;
    /**
     * Test configuration validity
      */
    testConfiguration(config: SystemConfiguration): Promise<{
        valid: boolean;
        issues: string[];
        warnings: string[];
    }>;
    /**
     * Get configuration health status
      */
    getConfigurationHealth(): Promise<{
        status: 'healthy' | 'warning' | 'critical';
        score: number;
        details: Record<string, any>;
    }>;
}
//# sourceMappingURL=configuration-test.service.d.ts.map
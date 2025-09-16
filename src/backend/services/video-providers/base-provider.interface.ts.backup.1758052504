/**
 * Base Provider Interface
 *
 * Interface definition for video generation providers.
 * Defines common contract for all video generation services.
 */

export interface VideoGenerationProvider {
  providerId: string;
  name: string;
  available: boolean;
  configured: boolean;
}

export interface VideoGenerationRequest {
  avatarId: string;
  voiceId: string;
  script: string;
  duration?: number;
  quality?: 'standard' | 'high' | 'premium';
}

export interface VideoGenerationResponse {
  success: boolean;
  videoUrl?: string;
  jobId?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
  metadata?: {
    duration: number;
    format: string;
    quality: string;
    provider: string;
    resolution?: string;
  };
}

export interface ProviderMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  lastRequestTime?: Date;
  availability: number;
}

export interface ProviderPerformanceMetrics extends ProviderMetrics {
  providerId?: string;
  successRate: number;
  errorRate: number;
  avgProcessingTime: number;
  peakUsage: number;
}

export interface VideoGenerationResult extends VideoGenerationResponse {
  processingTime: number;
  retryCount?: number;
}

export interface VideoGenerationOptions {
  priority?: 'low' | 'normal' | 'high';
  retryAttempts?: number;
  timeout?: number;
  webhookUrl?: string;
  duration?: number;
  includeSubtitles?: boolean;
  customAvatarId?: string;
  customVoiceId?: string;
  emotion?: string;
}

export abstract class BaseVideoProvider {
  abstract providerId: string;
  abstract name: string;

  /**
   * Check if provider is available and configured
   */
  abstract isAvailable(): boolean;

  /**
   * Generate video with given parameters
   */
  abstract generateVideo(request: VideoGenerationRequest): Promise<VideoGenerationResponse>;

  /**
   * Get provider status and metrics
   */
  abstract getProviderStatus(): Promise<{
    provider: VideoGenerationProvider;
    metrics: ProviderMetrics;
    lastHealthCheck: Date;
  }>;

  /**
   * Test provider connectivity
   */
  abstract testConnection(): Promise<{
    success: boolean;
    responseTime: number;
    error?: string;
  }>;
}
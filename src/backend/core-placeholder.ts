/**
 * Core Module Placeholder
 *
 * Temporary placeholder types and interfaces for @cvplus/core module.
 * This maintains compatibility while the core submodule is being integrated.
 */

export interface AuthenticatedUser {
  uid: string;
  email?: string;
  displayName?: string;
  role?: string;
  permissions?: string[];
  isPremium?: boolean;
  createdAt?: Date;
  lastActive?: Date;

  // Placeholder for missing methods
  getIdTokenResult: () => Promise<{
    token: string;
    expirationTime: string;
    authTime: string;
    issuedAtTime: string;
    signInProvider: string;
    claims: {
      [key: string]: any;
      role?: string;
      admin?: boolean;
    };
  }>;
}

export interface AdminLogger {
  info(message: string, metadata?: any): void;
  warn(message: string, metadata?: any): void;
  error(message: string, metadata?: any): void;
  debug(message: string, metadata?: any): void;
}

export const adminLogger: AdminLogger = {
  info: (message: string, metadata?: any) => console.log('[INFO]', message, metadata),
  warn: (message: string, metadata?: any) => console.warn('[WARN]', message, metadata),
  error: (message: string, metadata?: any) => console.error('[ERROR]', message, metadata),
  debug: (message: string, metadata?: any) => console.debug('[DEBUG]', message, metadata)
};

// Additional core types that might be needed
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface SystemConfig {
  environment: string;
  version: string;
  features: Record<string, boolean>;
}

// Placeholder for useAuth hook return type
export interface UseAuthReturn {
  user: AuthenticatedUser | null;
  loading: boolean;
  error: string | null;
  logout: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
}

// Note: Full core module types are available in @cvplus/core
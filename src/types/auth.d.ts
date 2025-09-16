/**
 * Temporary type declarations for @cvplus/auth module
 * This allows the admin module to compile while auth module is being fixed
 */

declare module '@cvplus/auth' {
  export interface User {
    uid: string;
    email?: string;
    displayName?: string;
    emailVerified?: boolean;
    photoURL?: string;
    disabled?: boolean;
    metadata?: {
      creationTime?: string;
      lastSignInTime?: string;
    };
    customClaims?: Record<string, any>;
    providerData?: Array<{
      uid: string;
      displayName?: string;
      email?: string;
      photoURL?: string;
      providerId: string;
    }>;
    role?: string;
    isPremium?: boolean;
    tier?: string;
  }

  export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
  }

  export interface AuthService {
    getCurrentUser(): Promise<User | null>;
    signInWithEmailAndPassword(email: string, password: string): Promise<User>;
    signOut(): Promise<void>;
    createUserWithEmailAndPassword(email: string, password: string): Promise<User>;
    sendPasswordResetEmail(email: string): Promise<void>;
    updateUserProfile(updates: Partial<User>): Promise<User>;
    deleteUser(uid: string): Promise<void>;
    verifyIdToken(token: string): Promise<User>;
    setCustomUserClaims(uid: string, claims: Record<string, any>): Promise<void>;
    listUsers(maxResults?: number, pageToken?: string): Promise<{ users: User[]; pageToken?: string }>;
  }

  export interface PermissionService {
    hasPermission(user: User, permission: string): boolean;
    checkRole(user: User, role: string): boolean;
    isPremiumUser(user: User): boolean;
    canAccessFeature(user: User, feature: string): boolean;
  }

  export const authService: AuthService;
  export const permissionService: PermissionService;

  // React hooks
  export function useAuth(): AuthState;
  export function usePermissions(user: User): {
    hasPermission: (permission: string) => boolean;
    checkRole: (role: string) => boolean;
    isPremium: boolean;
  };

  // Constants
  export const AUTH_CONSTANTS: {
    ROLES: {
      ADMIN: string;
      USER: string;
      PREMIUM: string;
      ENTERPRISE: string;
    };
    PERMISSIONS: {
      READ_ADMIN: string;
      WRITE_ADMIN: string;
      MANAGE_USERS: string;
      VIEW_ANALYTICS: string;
    };
  };

  // Components
  export interface AuthGuardProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    requiredRole?: string;
    fallback?: React.ReactNode;
  }

  export const AuthGuard: React.FC<AuthGuardProps>;
  export const AuthProvider: React.FC<{ children: React.ReactNode }>;
}
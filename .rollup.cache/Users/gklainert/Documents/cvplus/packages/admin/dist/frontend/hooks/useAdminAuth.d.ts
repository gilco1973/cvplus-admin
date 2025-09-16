/**
 * Admin Authentication Hook
 *
 * Provides admin-specific authentication state and methods.
 * Checks if the current user has admin privileges and loads their admin profile.
  */
interface AdminProfile {
    id: string;
    userId: string;
    role: string;
    level: number;
    email: string;
    adminSince: Date;
    specializations: string[];
    isActive: boolean;
    lastActivity: Date;
}
export declare const useAdminAuth: () => {
    initializeAdminSystem: () => Promise<boolean>;
    hasPermission: (permission: string) => boolean;
    hasMinLevel: (minLevel: number) => boolean;
    refreshAdminStatus: () => void;
    isAdmin: boolean;
    adminProfile: AdminProfile | null;
    loading: boolean;
    error: string | null;
};
export default useAdminAuth;
//# sourceMappingURL=useAdminAuth.d.ts.map
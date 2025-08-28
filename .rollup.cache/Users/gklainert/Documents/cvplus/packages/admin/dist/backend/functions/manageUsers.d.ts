import * as admin from 'firebase-admin';
/**
 * Admin function for comprehensive user management operations
 */
export declare const manageUsers: import("firebase-functions/v2/https").CallableFunction<any, Promise<{
    success: boolean;
    data: {
        auth: {
            uid: string;
            email: string | undefined;
            emailVerified: boolean;
            displayName: string | undefined;
            photoURL: string | undefined;
            disabled: boolean;
            metadata: {
                creationTime: string;
                lastSignInTime: string;
                lastRefreshTime: string | null | undefined;
            };
            providerData: import("firebase-admin/auth").UserInfo[];
            customClaims: {
                [key: string]: any;
            } | undefined;
        };
        profile: admin.firestore.DocumentData | undefined;
        jobs: {
            id: string;
        }[];
        subscription: admin.firestore.DocumentData | null | undefined;
        stats: {
            totalJobs: number;
            isPremium: any;
            isActive: boolean;
            status: any;
        };
    };
    error?: undefined;
} | {
    success: boolean;
    message: string;
} | {
    success: boolean;
    error: string;
}>>;
//# sourceMappingURL=manageUsers.d.ts.map
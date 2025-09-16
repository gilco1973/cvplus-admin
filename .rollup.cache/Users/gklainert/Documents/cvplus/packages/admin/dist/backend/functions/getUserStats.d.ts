/**
 * Admin function to get user statistics and management data
  */
export declare const getUserStats: import("firebase-functions/v2/https").CallableFunction<any, Promise<{
    success: boolean;
    data: {
        totalUsers: number;
        activeUsers: number;
        premiumUsers: number;
        suspendedUsers: number;
        recentRegistrations: number;
        userGrowthRate: string;
        premiumConversionRate: string;
        userDetails: {
            uid: string;
            email: any;
            displayName: any;
            isActive: any;
            isPremium: any;
            status: any;
            createdAt: any;
            lastLoginAt: any;
            cvCount: any;
            subscriptionStatus: any;
        }[];
        lastUpdated: string;
    };
}>>;
//# sourceMappingURL=getUserStats.d.ts.map
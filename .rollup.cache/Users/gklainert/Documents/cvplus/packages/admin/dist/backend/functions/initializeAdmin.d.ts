import { AdminRole, AdminLevel } from '../../middleware/admin-auth.middleware';
/**
 * Admin initialization function
 * Sets up admin custom claims for authorized users
  */
export declare const initializeAdmin: import("firebase-functions/v2/https").CallableFunction<any, Promise<{
    success: boolean;
    message: string;
    data: {
        uid: string;
        email: string;
        role: AdminRole;
        level: AdminLevel;
        status: string;
    };
}>>;
//# sourceMappingURL=initializeAdmin.d.ts.map
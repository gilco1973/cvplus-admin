/**
 * CORS Test Functions
 *
 * Administrative functions for testing CORS configuration.
 * Includes both onRequest and onCall function types for comprehensive testing.
 *
 * @author Gil Klainert
 * @version 1.0.0
 */
export declare const testCors: import("firebase-functions/v2/https").HttpsFunction;
export declare const testCorsCall: import("firebase-functions/v2/https").CallableFunction<any, Promise<{
    success: boolean;
    message: string;
    timestamp: string;
    auth: boolean;
}>>;
//# sourceMappingURL=corsTestFunction.d.ts.map
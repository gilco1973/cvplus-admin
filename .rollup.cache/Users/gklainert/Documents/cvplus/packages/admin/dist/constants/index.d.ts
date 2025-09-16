/**
 * Admin Constants - Main Export File
 *
 * Exports all admin constants and configuration values.
  */
export * from './admin.constants';
export declare const CONSTANTS_VERSION = "1.0.0";
export declare const LAST_UPDATED: Date;
export declare const FEATURE_FLAGS: {
    readonly ADVANCED_ANALYTICS: "advanced_analytics";
    readonly REAL_TIME_MONITORING: "real_time_monitoring";
    readonly AUTOMATED_MODERATION: "automated_moderation";
    readonly PREDICTIVE_INSIGHTS: "predictive_insights";
    readonly MULTI_TENANT_SUPPORT: "multi_tenant_support";
    readonly ADVANCED_SECURITY_AUDIT: "advanced_security_audit";
    readonly CUSTOM_DASHBOARDS: "custom_dashboards";
    readonly WORKFLOW_AUTOMATION: "workflow_automation";
};
export declare const ENVIRONMENT_CONFIGS: {
    readonly DEVELOPMENT: {
        readonly debug: true;
        readonly logLevel: "debug";
        readonly cacheEnabled: false;
        readonly rateLimitEnabled: false;
        readonly auditEnabled: true;
    };
    readonly STAGING: {
        readonly debug: false;
        readonly logLevel: "info";
        readonly cacheEnabled: true;
        readonly rateLimitEnabled: true;
        readonly auditEnabled: true;
    };
    readonly PRODUCTION: {
        readonly debug: false;
        readonly logLevel: "warn";
        readonly cacheEnabled: true;
        readonly rateLimitEnabled: true;
        readonly auditEnabled: true;
    };
};
export declare const INTEGRATION_ENDPOINTS: {
    readonly FIREBASE: {
        readonly FUNCTIONS_BASE: "https://us-central1-cvplus.cloudfunctions.net";
        readonly FIRESTORE_PROJECT: "cvplus";
        readonly STORAGE_BUCKET: "cvplus.appspot.com";
    };
    readonly EXTERNAL_APIS: {
        readonly STRIPE_API: "https://api.stripe.com/v1";
        readonly GOOGLE_APIS: "https://www.googleapis.com";
        readonly SENDGRID_API: "https://api.sendgrid.com/v3";
    };
};
//# sourceMappingURL=index.d.ts.map
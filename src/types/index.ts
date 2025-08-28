/**
 * CVPlus Admin Module - Type Definitions
 * 
 * Comprehensive type system for the CVPlus admin dashboard module.
 * Provides type safety and consistency across all admin functionality.
 * 
 * @author Gil Klainert
 * @version 1.0.0
 */

// ============================================================================
// CORE ADMIN TYPES
// ============================================================================
export * from './admin.types';
export * from './dashboard.types';
export * from './user-management.types';
export * from './moderation.types';
export * from './monitoring.types';
export * from './analytics.types';
export * from './security.types';

// ============================================================================
// COMMON UTILITY TYPES
// ============================================================================

/**
 * Generic API Response wrapper for admin operations
 */
export interface AdminApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: AdminApiError;
  metadata?: AdminApiMetadata;
  timestamp: Date;
}

/**
 * Standardized error structure for admin API responses
 */
export interface AdminApiError {
  code: string;
  message: string;
  details?: string;
  field?: string;
  retryable: boolean;
  retryAfter?: number;
}

/**
 * Additional metadata for admin API responses
 */
export interface AdminApiMetadata {
  requestId: string;
  version: string;
  processingTime: number;
  rateLimit?: RateLimitInfo;
  pagination?: PaginationInfo;
}

/**
 * Rate limiting information
 */
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetAt: Date;
  retryAfter?: number;
}

/**
 * Pagination information for list responses
 */
export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Common sorting options
 */
export interface SortOptions {
  field: string;
  direction: SortDirection;
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

/**
 * Common filtering options
 */
export interface FilterOptions {
  search?: string;
  filters: FilterCriteria[];
  sort?: SortOptions[];
  pagination?: PaginationOptions;
}

export interface FilterCriteria {
  field: string;
  operator: FilterOperator;
  value: any;
  logicalOperator?: LogicalOperator;
}

export enum FilterOperator {
  EQUALS = 'eq',
  NOT_EQUALS = 'ne',
  GREATER_THAN = 'gt',
  GREATER_EQUAL = 'gte',
  LESS_THAN = 'lt',
  LESS_EQUAL = 'lte',
  CONTAINS = 'contains',
  STARTS_WITH = 'starts_with',
  ENDS_WITH = 'ends_with',
  IN = 'in',
  NOT_IN = 'not_in',
  BETWEEN = 'between',
  IS_NULL = 'is_null',
  IS_NOT_NULL = 'is_not_null'
}

export enum LogicalOperator {
  AND = 'and',
  OR = 'or',
  NOT = 'not'
}

export interface PaginationOptions {
  page: number;
  pageSize: number;
  offset?: number;
}

// ============================================================================
// ADMIN OPERATION TYPES
// ============================================================================

/**
 * Generic admin operation result
 */
export interface AdminOperationResult<T = any> {
  success: boolean;
  operation: string;
  result?: T;
  error?: AdminOperationError;
  warnings?: AdminOperationWarning[];
  metadata?: AdminOperationMetadata;
  timestamp: Date;
}

export interface AdminOperationError {
  code: string;
  message: string;
  details?: string;
  remediation?: string;
  context?: Record<string, any>;
}

export interface AdminOperationWarning {
  code: string;
  message: string;
  severity: WarningSeverity;
}

export enum WarningSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export interface AdminOperationMetadata {
  duration: number;
  resources: ResourceUsage[];
  affectedItems: number;
  rollbackAvailable: boolean;
  auditTrail: string[];
}

export interface ResourceUsage {
  resource: string;
  consumed: number;
  unit: string;
  limit?: number;
}

// ============================================================================
// EXPORT & IMPORT TYPES
// ============================================================================

/**
 * Data export configuration
 */
export interface ExportConfiguration {
  format: ExportFormat;
  fields?: string[];
  filters?: FilterOptions;
  compression?: CompressionType;
  encryption?: EncryptionOptions;
  destination?: ExportDestination;
  schedule?: ExportSchedule;
}

export enum ExportFormat {
  CSV = 'csv',
  JSON = 'json',
  XML = 'xml',
  EXCEL = 'excel',
  PDF = 'pdf'
}

export enum CompressionType {
  NONE = 'none',
  GZIP = 'gzip',
  ZIP = 'zip'
}

export interface EncryptionOptions {
  enabled: boolean;
  algorithm?: string;
  keyId?: string;
}

export interface ExportDestination {
  type: DestinationType;
  configuration: Record<string, any>;
}

export enum DestinationType {
  DOWNLOAD = 'download',
  EMAIL = 'email',
  S3 = 's3',
  FTP = 'ftp',
  WEBHOOK = 'webhook'
}

export interface ExportSchedule {
  frequency: ScheduleFrequency;
  time?: string;
  dayOfWeek?: number;
  dayOfMonth?: number;
  timezone?: string;
}

export enum ScheduleFrequency {
  ONCE = 'once',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly'
}

/**
 * Data import configuration
 */
export interface ImportConfiguration {
  format: ImportFormat;
  mapping: FieldMapping[];
  validation: ValidationRule[];
  conflictResolution: ConflictResolution;
  batchSize?: number;
  dryRun?: boolean;
}

export enum ImportFormat {
  CSV = 'csv',
  JSON = 'json',
  XML = 'xml',
  EXCEL = 'excel'
}

export interface FieldMapping {
  sourceField: string;
  targetField: string;
  transformation?: TransformationFunction;
  required: boolean;
}

export interface TransformationFunction {
  type: TransformationType;
  parameters?: Record<string, any>;
}

export enum TransformationType {
  UPPERCASE = 'uppercase',
  LOWERCASE = 'lowercase',
  TRIM = 'trim',
  REGEX = 'regex',
  DATE_FORMAT = 'date_format',
  CUSTOM = 'custom'
}

export interface ValidationRule {
  field: string;
  rules: FieldValidationRule[];
}

export interface FieldValidationRule {
  type: ValidationType;
  parameters?: Record<string, any>;
  errorMessage?: string;
}

export enum ValidationType {
  REQUIRED = 'required',
  EMAIL = 'email',
  URL = 'url',
  PHONE = 'phone',
  DATE = 'date',
  NUMBER = 'number',
  REGEX = 'regex',
  LENGTH = 'length',
  RANGE = 'range',
  CUSTOM = 'custom'
}

export enum ConflictResolution {
  SKIP = 'skip',
  UPDATE = 'update',
  ERROR = 'error',
  CREATE_NEW = 'create_new'
}

// ============================================================================
// NOTIFICATION TYPES
// ============================================================================

/**
 * Admin notification system types
 */
export interface AdminNotification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  recipients: NotificationRecipient[];
  channels: NotificationChannel[];
  data?: Record<string, any>;
  scheduledAt?: Date;
  sentAt?: Date;
  status: NotificationStatus;
  retryCount: number;
  maxRetries: number;
}

export enum NotificationType {
  SYSTEM_ALERT = 'system_alert',
  USER_ACTION_REQUIRED = 'user_action_required',
  SECURITY_EVENT = 'security_event',
  COMPLIANCE_DEADLINE = 'compliance_deadline',
  MAINTENANCE_NOTICE = 'maintenance_notice',
  REPORT_READY = 'report_ready',
  THRESHOLD_EXCEEDED = 'threshold_exceeded'
}

export enum NotificationPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent',
  CRITICAL = 'critical'
}

export interface NotificationRecipient {
  id: string;
  type: RecipientType;
  address: string;
  preferences?: NotificationPreferences;
}

export enum RecipientType {
  USER = 'user',
  ROLE = 'role',
  GROUP = 'group',
  EMAIL = 'email',
  PHONE = 'phone'
}

export interface NotificationPreferences {
  channels: NotificationChannel[];
  quietHours?: QuietHours;
  frequency?: NotificationFrequency;
}

export interface QuietHours {
  enabled: boolean;
  startTime: string;
  endTime: string;
  timezone: string;
  emergencyOverride: boolean;
}

export enum NotificationFrequency {
  IMMEDIATE = 'immediate',
  BATCHED = 'batched',
  DAILY_DIGEST = 'daily_digest',
  WEEKLY_DIGEST = 'weekly_digest'
}

export enum NotificationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  SLACK = 'slack',
  WEBHOOK = 'webhook',
  IN_APP = 'in_app'
}

export enum NotificationStatus {
  PENDING = 'pending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

// ============================================================================
// WORKFLOW & AUTOMATION TYPES
// ============================================================================

/**
 * Admin workflow automation types
 */
export interface AdminWorkflow {
  id: string;
  name: string;
  description: string;
  trigger: WorkflowTrigger;
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
  status: WorkflowStatus;
  schedule?: WorkflowSchedule;
  metadata: WorkflowMetadata;
}

export interface WorkflowTrigger {
  type: TriggerType;
  configuration: Record<string, any>;
  conditions?: TriggerCondition[];
}

export enum TriggerType {
  EVENT = 'event',
  SCHEDULE = 'schedule',
  WEBHOOK = 'webhook',
  MANUAL = 'manual',
  API = 'api'
}

export interface TriggerCondition {
  field: string;
  operator: FilterOperator;
  value: any;
}

export interface WorkflowCondition {
  expression: string;
  evaluation: ConditionEvaluation;
}

export enum ConditionEvaluation {
  AND = 'and',
  OR = 'or',
  XOR = 'xor'
}

export interface WorkflowAction {
  id: string;
  type: ActionType;
  configuration: Record<string, any>;
  retryPolicy?: RetryPolicy;
  onFailure?: FailureAction;
}

export enum ActionType {
  SEND_NOTIFICATION = 'send_notification',
  UPDATE_RECORD = 'update_record',
  CREATE_TICKET = 'create_ticket',
  APPROVE_REQUEST = 'approve_request',
  DENY_REQUEST = 'deny_request',
  ESCALATE = 'escalate',
  ARCHIVE = 'archive',
  DELETE = 'delete',
  EXECUTE_FUNCTION = 'execute_function',
  WEBHOOK_CALL = 'webhook_call'
}

export interface RetryPolicy {
  maxRetries: number;
  retryDelay: number;
  backoffStrategy: BackoffStrategy;
}

export enum BackoffStrategy {
  FIXED = 'fixed',
  LINEAR = 'linear',
  EXPONENTIAL = 'exponential'
}

export interface FailureAction {
  type: ActionType;
  configuration: Record<string, any>;
}

export enum WorkflowStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PAUSED = 'paused',
  ERROR = 'error',
  DRAFT = 'draft'
}

export interface WorkflowSchedule {
  frequency: ScheduleFrequency;
  interval?: number;
  cron?: string;
  timezone?: string;
  nextRun?: Date;
}

export interface WorkflowMetadata {
  createdBy: string;
  createdAt: Date;
  lastModified: Date;
  version: number;
  executionCount: number;
  successRate: number;
  averageExecutionTime: number;
}

// ============================================================================
// SYSTEM INTEGRATION TYPES
// ============================================================================

/**
 * External system integration types
 */
export interface SystemIntegration {
  id: string;
  name: string;
  type: IntegrationType;
  status: IntegrationStatus;
  configuration: IntegrationConfiguration;
  healthCheck: HealthCheckConfiguration;
  metrics: IntegrationMetrics;
  lastSync?: Date;
  nextSync?: Date;
}

export enum IntegrationType {
  API = 'api',
  DATABASE = 'database',
  FILE_SYSTEM = 'file_system',
  MESSAGE_QUEUE = 'message_queue',
  WEBHOOK = 'webhook',
  FTP = 'ftp',
  EMAIL = 'email'
}

export enum IntegrationStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ERROR = 'error',
  SYNCING = 'syncing',
  MAINTENANCE = 'maintenance'
}

export interface IntegrationConfiguration {
  endpoint?: string;
  authentication: AuthenticationConfiguration;
  timeout: number;
  retryPolicy: RetryPolicy;
  rateLimiting?: RateLimitConfiguration;
  headers?: Record<string, string>;
  parameters?: Record<string, any>;
}

export interface AuthenticationConfiguration {
  type: AuthenticationType;
  credentials: Record<string, any>;
  tokenRefresh?: TokenRefreshConfiguration;
}

export enum AuthenticationType {
  NONE = 'none',
  BASIC = 'basic',
  BEARER_TOKEN = 'bearer_token',
  API_KEY = 'api_key',
  OAUTH2 = 'oauth2',
  CERTIFICATE = 'certificate'
}

export interface TokenRefreshConfiguration {
  enabled: boolean;
  refreshEndpoint?: string;
  refreshThreshold: number; // minutes before expiry
}

export interface RateLimitConfiguration {
  requestsPerSecond: number;
  burstLimit: number;
  backoffStrategy: BackoffStrategy;
}

export interface HealthCheckConfiguration {
  enabled: boolean;
  endpoint?: string;
  interval: number; // seconds
  timeout: number; // seconds
  healthyThreshold: number;
  unhealthyThreshold: number;
}

export interface IntegrationMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  lastRequestAt?: Date;
  uptime: number; // percentage
  errorRate: number; // percentage
}

// ============================================================================
// VERSIONING & CHANGE MANAGEMENT
// ============================================================================

/**
 * Change management and versioning types
 */
export interface ChangeRecord {
  id: string;
  type: ChangeType;
  title: string;
  description: string;
  requestedBy: string;
  requestedAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
  implementedBy?: string;
  implementedAt?: Date;
  status: ChangeStatus;
  priority: ChangePriority;
  risk: ChangeRisk;
  rollbackPlan?: string;
  testingPlan?: string;
  affectedSystems: string[];
  stakeholders: string[];
}

export enum ChangeType {
  CONFIGURATION = 'configuration',
  FEATURE = 'feature',
  BUG_FIX = 'bug_fix',
  SECURITY = 'security',
  MAINTENANCE = 'maintenance',
  EMERGENCY = 'emergency'
}

export enum ChangeStatus {
  REQUESTED = 'requested',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  IN_PROGRESS = 'in_progress',
  IMPLEMENTED = 'implemented',
  ROLLED_BACK = 'rolled_back',
  CLOSED = 'closed'
}

export enum ChangePriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface ChangeRisk {
  level: RiskLevel;
  assessment: string;
  mitigations: string[];
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high'
}

// ============================================================================
// MODULE CONFIGURATION TYPES
// ============================================================================

/**
 * Admin module configuration
 */
export interface AdminModuleConfig {
  version: string;
  features: FeatureConfig[];
  security: SecurityConfig;
  performance: PerformanceConfig;
  integrations: IntegrationConfig[];
  notifications: NotificationConfig;
  ui: UIConfig;
}

export interface FeatureConfig {
  name: string;
  enabled: boolean;
  configuration: Record<string, any>;
  permissions: string[];
}

export interface SecurityConfig {
  sessionTimeout: number;
  maxFailedAttempts: number;
  passwordPolicy: PasswordPolicy;
  mfaRequired: boolean;
  auditLogging: AuditLoggingConfig;
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  maxAge: number; // days
  historySize: number;
}

export interface AuditLoggingConfig {
  enabled: boolean;
  retentionDays: number;
  sensitiveDataMasking: boolean;
  realTimeAlerts: boolean;
}

export interface PerformanceConfig {
  caching: CachingConfig;
  pagination: PaginationConfig;
  queryOptimization: QueryOptimizationConfig;
}

export interface CachingConfig {
  enabled: boolean;
  ttl: number; // seconds
  maxSize: number; // MB
  strategy: CachingStrategy;
}

export enum CachingStrategy {
  LRU = 'lru',
  LFU = 'lfu',
  FIFO = 'fifo',
  TTL = 'ttl'
}

export interface PaginationConfig {
  defaultPageSize: number;
  maxPageSize: number;
  allowUnlimited: boolean;
}

export interface QueryOptimizationConfig {
  indexOptimization: boolean;
  queryPlan: boolean;
  slowQueryLogging: boolean;
  slowQueryThreshold: number; // milliseconds
}

export interface IntegrationConfig {
  id: string;
  enabled: boolean;
  configuration: Record<string, any>;
}

export interface NotificationConfig {
  channels: NotificationChannelConfig[];
  templates: NotificationTemplate[];
  throttling: ThrottlingConfig;
}

export interface NotificationChannelConfig {
  channel: NotificationChannel;
  enabled: boolean;
  configuration: Record<string, any>;
}

export interface NotificationTemplate {
  id: string;
  type: NotificationType;
  channel: NotificationChannel;
  subject?: string;
  template: string;
  variables: TemplateVariable[];
}

export interface TemplateVariable {
  name: string;
  type: VariableType;
  required: boolean;
  description?: string;
}

export enum VariableType {
  STRING = 'string',
  NUMBER = 'number',
  DATE = 'date',
  BOOLEAN = 'boolean',
  OBJECT = 'object'
}

export interface ThrottlingConfig {
  enabled: boolean;
  maxPerMinute: number;
  maxPerHour: number;
  maxPerDay: number;
}

export interface UIConfig {
  theme: ThemeConfig;
  layout: LayoutConfig;
  features: UIFeatureConfig[];
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  darkMode: boolean;
  fontFamily: string;
  fontSize: FontSizeConfig;
}

export interface FontSizeConfig {
  small: string;
  medium: string;
  large: string;
}

export interface LayoutConfig {
  sidebar: SidebarConfig;
  header: HeaderConfig;
  footer: FooterConfig;
}

export interface SidebarConfig {
  collapsible: boolean;
  defaultCollapsed: boolean;
  width: number;
  position: SidebarPosition;
}

export enum SidebarPosition {
  LEFT = 'left',
  RIGHT = 'right'
}

export interface HeaderConfig {
  showLogo: boolean;
  showUserMenu: boolean;
  showNotifications: boolean;
  height: number;
}

export interface FooterConfig {
  show: boolean;
  content: string;
  links: FooterLink[];
}

export interface FooterLink {
  label: string;
  url: string;
  external: boolean;
}

export interface UIFeatureConfig {
  name: string;
  enabled: boolean;
  configuration: Record<string, any>;
}
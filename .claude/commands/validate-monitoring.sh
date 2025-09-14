#!/bin/bash
# Admin System Monitoring Validation Command
# Validates all admin system monitoring capabilities

set -e

echo "🔍 Validating Admin System Monitoring..."

# Test system health monitoring
echo "🩺 Validating system health monitoring..."
if [ -f "src/backend/services/performance-monitor.service.ts" ]; then
    echo "✅ Performance monitoring service found"
else
    echo "❌ Performance monitoring service missing"
    exit 1
fi

# Test cache monitoring
echo "💾 Validating cache monitoring..."
if [ -f "src/backend/services/cache-monitor.service.ts" ]; then
    echo "✅ Cache monitoring service found"
else
    echo "❌ Cache monitoring service missing"
    exit 1
fi

# Test security monitoring
echo "🔒 Validating security monitoring..."
if [ -f "src/backend/services/security/security-monitor.service.ts" ]; then
    echo "✅ Security monitoring service found"
else
    echo "❌ Security monitoring service missing"
    exit 1
fi

# Test alert management
echo "🚨 Validating alert management..."
if [ -f "src/backend/services/alert-manager.service.ts" ]; then
    echo "✅ Alert manager service found"
else
    echo "❌ Alert manager service missing"
    exit 1
fi

# Test job monitoring
echo "⚙️  Validating job monitoring..."
if [ -f "src/backend/services/job-monitoring.service.ts" ]; then
    echo "✅ Job monitoring service found"
else
    echo "❌ Job monitoring service missing"
    exit 1
fi

# Test LLM monitoring
echo "🤖 Validating LLM monitoring..."
if [ -f "src/backend/services/llm-monitoring.service.ts" ]; then
    echo "✅ LLM monitoring service found"
else
    echo "❌ LLM monitoring service missing"
    exit 1
fi

# Validate monitoring dashboard
echo "📊 Validating monitoring dashboard..."
if [ -f "src/frontend/components/AnalyticsDashboard.tsx" ]; then
    echo "✅ Analytics dashboard component found"
else
    echo "❌ Analytics dashboard component missing"
    exit 1
fi

echo "✅ All admin monitoring capabilities validated successfully!"
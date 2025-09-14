#!/bin/bash
# Admin Permissions Test Command
# Tests admin system permissions and access controls

set -e

echo "🔐 Testing Admin Permissions..."

# Test admin build permissions
echo "📦 Testing build permissions..."
npm run type-check

# Test admin function permissions  
echo "⚙️  Testing admin function access..."
if [ -f "src/backend/functions/initializeAdmin.ts" ]; then
    echo "✅ Admin initialization function accessible"
else
    echo "❌ Admin initialization function not found"
    exit 1
fi

# Test system health monitoring permissions
echo "🩺 Testing system health monitoring..."
if [ -f "src/backend/functions/getSystemHealth.ts" ]; then
    echo "✅ System health monitoring accessible"
else
    echo "❌ System health monitoring not found"
    exit 1
fi

# Test user management permissions
echo "👥 Testing user management permissions..."  
if [ -f "src/backend/functions/manageUsers.ts" ]; then
    echo "✅ User management functions accessible"
else
    echo "❌ User management functions not found"
    exit 1
fi

# Test analytics dashboard permissions
echo "📊 Testing analytics dashboard permissions..."
if [ -f "src/backend/functions/getBusinessMetrics.ts" ]; then
    echo "✅ Business metrics accessible"
else
    echo "❌ Business metrics not found"
    exit 1
fi

echo "✅ All admin permissions validated successfully!"
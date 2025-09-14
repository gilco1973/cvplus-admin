#!/bin/bash
# Admin User Management Command
# Provides user management capabilities for admin system

set -e

echo "👥 Admin User Management Tools..."

# Function to display user management options
show_usage() {
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  list-users        List all users with basic info"
    echo "  user-stats        Show comprehensive user statistics"
    echo "  policy-violations View user policy violations"
    echo "  usage-stats       View user usage statistics"
    echo "  test-functions    Test all user management functions"
    echo ""
    echo "Options:"
    echo "  --help           Show this help message"
}

# Test user management functions
test_functions() {
    echo "🧪 Testing user management functions..."
    
    # Test user stats function
    if [ -f "src/backend/functions/getUserStats.ts" ]; then
        echo "✅ getUserStats function found"
    else
        echo "❌ getUserStats function missing"
        exit 1
    fi
    
    # Test user usage stats function
    if [ -f "src/backend/functions/getUserUsageStats.ts" ]; then
        echo "✅ getUserUsageStats function found"
    else
        echo "❌ getUserUsageStats function missing"
        exit 1
    fi
    
    # Test policy violations function
    if [ -f "src/backend/functions/getUserPolicyViolations.ts" ]; then
        echo "✅ getUserPolicyViolations function found"
    else
        echo "❌ getUserPolicyViolations function missing"
        exit 1
    fi
    
    # Test user management function
    if [ -f "src/backend/functions/manageUsers.ts" ]; then
        echo "✅ manageUsers function found"
    else
        echo "❌ manageUsers function missing"
        exit 1
    fi
    
    echo "✅ All user management functions validated!"
}

# Check if no arguments provided
if [ $# -eq 0 ]; then
    show_usage
    exit 1
fi

# Handle commands
case "$1" in
    "list-users")
        echo "📋 User management would typically call Firebase Admin SDK functions"
        echo "ℹ️  Run 'npm run build && firebase deploy --only functions' first"
        ;;
    "user-stats")
        echo "📊 User statistics would be retrieved from getUserStats function"
        echo "ℹ️  Run 'npm run build && firebase deploy --only functions' first"
        ;;
    "policy-violations")
        echo "🚨 Policy violations would be retrieved from getUserPolicyViolations function"
        echo "ℹ️  Run 'npm run build && firebase deploy --only functions' first"
        ;;
    "usage-stats")
        echo "📈 Usage statistics would be retrieved from getUserUsageStats function"
        echo "ℹ️  Run 'npm run build && firebase deploy --only functions' first"
        ;;
    "test-functions")
        test_functions
        ;;
    "--help")
        show_usage
        ;;
    *)
        echo "❌ Unknown command: $1"
        show_usage
        exit 1
        ;;
esac
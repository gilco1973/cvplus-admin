#!/bin/bash
# CVPlus Admin Build Script
# Builds the complete admin system with validation

set -e

echo "🏗️  Building CVPlus Admin System..."

# Change to admin directory
cd "/Users/gklainert/Documents/cvplus/packages/admin"

# Clean previous build artifacts
echo "🧹 Cleaning previous build..."
rm -rf dist/ build/ .rollup.cache/

# Install dependencies if needed
if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules/.package-lock.json" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# TypeScript type checking
echo "🔍 Running TypeScript type checking..."
npx tsc --noEmit

# Build with Rollup
echo "📦 Building admin modules..."
npm run build

# Validate build outputs
echo "✅ Validating build outputs..."
if [ ! -d "dist" ]; then
    echo "❌ Build failed: dist directory not found"
    exit 1
fi

# Check for critical admin files
if [ ! -f "dist/index.js" ]; then
    echo "❌ Build failed: main index file not found"
    exit 1
fi

# Validate admin services
echo "🔧 Validating admin services..."
if [ -f "dist/services/admin-dashboard.service.js" ]; then
    echo "✅ Admin dashboard service built successfully"
else
    echo "❌ Admin dashboard service missing"
    exit 1
fi

# Validate backend functions
echo "⚙️  Validating backend functions..."
if [ -f "dist/backend/functions/index.js" ]; then
    echo "✅ Backend functions built successfully"
else
    echo "❌ Backend functions missing"
    exit 1
fi

# Validate frontend components
echo "🎨 Validating frontend components..."
if [ -f "dist/frontend/components/index.js" ]; then
    echo "✅ Frontend components built successfully"
else
    echo "❌ Frontend components missing"
    exit 1
fi

# Run admin-specific validations
echo "🔐 Running admin-specific validations..."
.claude/commands/test-permissions.sh

echo "✅ CVPlus Admin system built successfully!"
echo "📁 Build artifacts available in dist/"
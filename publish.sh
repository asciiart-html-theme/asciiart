#!/bin/bash

# 1. Load the .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo "Error: .env file not found."
    exit 1
fi

# 2. Check if the token exists
if [ -z "$GITLAB_TOKEN" ]; then
    echo "Error: GITLAB_TOKEN is not set in .env"
    exit 1
fi

echo "🚀 Starting release process for @pc-magas/asciiart..."

# 3. Clean and Build
# This ensures you aren't publishing old or broken artifacts
echo "📦 Building assets..."
npm run release

# 4. Check if build succeeded
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Aborting publish."
    exit 1
fi

# 5. Publish to GitLab
# We pass the token via environment variable which .npmrc will pick up
echo "⬆️  Publishing to GitLab NPM Registry..."
GITLAB_TOKEN=$GITLAB_TOKEN npm publish

if [ $? -eq 0 ]; then
    echo "✅ Successfully published version $(node -p "require('./package.json').version")"
else
    echo "❌ Publish failed. Did you remember to bump the version?"
    exit 1
fi
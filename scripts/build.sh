#!/bin/bash
set -e

cd "${COZE_WORKSPACE_PATH:-$(pwd)}"

# Remove any babel config files that would force Next.js to use Babel instead of SWC
rm -f .babelrc .babelrc.js .babelrc.cjs .babelrc.mjs babel.config.js babel.config.cjs babel.config.mjs babel.config.json

# Remove .next cache to avoid stale Babel/inspector references
rm -rf .next

echo "Installing dependencies..."
pnpm install --prefer-frozen-lockfile --prefer-offline 2>&1

echo "Building Next.js project..."
./node_modules/.bin/next build --webpack

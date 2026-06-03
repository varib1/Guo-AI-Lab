#!/bin/bash
set -Eeuo pipefail

PORT=5000
DEPLOY_RUN_PORT="${DEPLOY_RUN_PORT:-${PORT}}"

cd "${COZE_WORKSPACE_PATH:-$(pwd)}"

echo "Starting Next.js production server on port ${DEPLOY_RUN_PORT}..."
./node_modules/.bin/next start -p ${DEPLOY_RUN_PORT}

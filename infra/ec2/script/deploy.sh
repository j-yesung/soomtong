#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/home/ubuntu/soomtong"
# DOMAIN="52.62.190.42.sslip.io"

cd "$APP_DIR"

echo "⬇️ Pull latest image"
docker compose pull web

echo "🔄 Restart container"
docker compose up -d --no-deps web

echo "🧹 Clean old images"
docker image prune -f || true

echo "✅ 배포완료"

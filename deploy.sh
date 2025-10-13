#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/home/ubuntu/soomtong"
# DOMAIN="52.62.190.42.sslip.io"

cd "$APP_DIR"

echo "Pull latest image"
docker compose pull web

echo "Restart container"
docker compose up -d --no-deps web

echo "Clean old images"
docker image prune -f || true

echo "배포완료"

# echo "헬스체크..."
# for i in {1..20}; do
#   if curl -fsSLI --max-time 5 "https://${DOMAIN}" >/dev/null 2>&1; then
#     echo "Service is UP (${i})"
#     exit 0
#   fi
#   sleep 3
# done

# echo "헬스체크 실패 for https://${DOMAIN}"
exit 1

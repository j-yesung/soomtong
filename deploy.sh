#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/home/ubuntu/soomtong"
DOMAIN="52.62.190.42.sslip.io"
HEALTH_MAX_TRY=24

echo "[0/5] Move to app dir: $APP_DIR"
cd "$APP_DIR"

echo "[1/5] Check .env.production exists"
if [ ! -f ".env.production" ]; then
  echo "[ERROR] .env.production not found in $APP_DIR"
  exit 1
fi

echo "[2/5] Ensure docker compose is available"
if ! docker compose version >/dev/null 2>&1; then
  if command -v docker-compose >/dev/null 2>&1; then
    echo "[WARN] docker compose plugin not found. Using docker-compose fallback"
    alias docker='docker-compose'
  else
    echo "[ERROR] docker compose not found"
    exit 1
  fi
fi

echo "[3/5] Pull latest images"
docker compose pull

echo "[4/5] Up (detached)"
docker compose up -d

echo "[5/5] Prune old images (optional)"
docker image prune -f || true

echo "[Healthcheck] Wait until https://${DOMAIN} responds"
for i in $(seq 1 ${HEALTH_MAX_TRY}); do
  if curl -fsSLI --max-time 5 "https://${DOMAIN}" >/dev/null 2>&1; then
    echo "✅ Service is up (try=${i})"
    exit 0
  fi
  sleep 5
done

echo "❌ Healthcheck failed for https://${DOMAIN}"
exit 1

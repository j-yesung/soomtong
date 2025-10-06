#!/bin/bash
set -e

APP_NAME=soomtong
IMAGE=ghcr.io/j-yesung/soomtong:latest

echo "[1/5] Docker 로그인"
echo $CR_PAT | docker login ghcr.io -u j-yesung --password-stdin

echo "[2/5] 최신 이미지 Pull"
docker pull $IMAGE

echo "[3/5] 기존 컨테이너 중단 및 제거"
if [ "$(docker ps -q -f name=$APP_NAME)" ]; then
  docker stop $APP_NAME
  docker rm $APP_NAME
fi

echo "[4/5] 새 컨테이너 실행"
docker run -d \
  --name $APP_NAME \
  --restart always \
  -p 80:80 \
  $IMAGE

echo "[5/5] 오래된 이미지 정리"
docker image prune -f

echo "✅ 배포 완료 $(date '+%Y-%m-%d %H:%M:%S')"
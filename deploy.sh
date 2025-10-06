#!/bin/bash

APP_NAME=soomtong
IMAGE=ghcr.io/j-yesung/soomtong:latest

echo "[1/5] Docker 로그인"
docker login ghcr.io -u j-yesung --password "$CR_PAT"

echo "[2/5] 최신 이미지 Pull"
docker pull $IMAGE

echo "[3/5] 기존 컨테이너 중단 및 제거"
docker stop $APP_NAME || true
docker rm $APP_NAME || true

echo "[4/5] 새 컨테이너 실행"
docker run -d \
  --name $APP_NAME \
  -p 80:80 \
  $IMAGE

echo "불필요한 이미지 정리"
docker image prune -f

echo "[5/5] ✅ 배포 완료"

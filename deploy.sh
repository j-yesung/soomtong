#!/bin/bash

APP_NAME=soomtong
IMAGE=ghcr.io/j-yesung/soomtong:latest

set -e # 오류 발생 시 스크립트 중단

echo "[1/4] 최신 이미지 Pull"
docker pull $IMAGE

echo "[2/4] 기존 컨테이너 중단 및 제거"
docker stop $APP_NAME || true
docker rm $APP_NAME || true

echo "[3/4] 새 컨테이너 실행"
docker run -d \
  --name $APP_NAME \
  -p 80:80 \
  $IMAGE

echo "불필요한 이미지 정리"
docker image prune -f

echo "[4/4] ✅ 배포 완료"


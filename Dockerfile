# --- 1단계: 빌드 스테이지 ---
FROM node:20-alpine AS builder
WORKDIR /app

# corepack으로 pnpm 설정
RUN corepack enable && corepack prepare pnpm@10 --activate

# 의존성 설치
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 소스 복사 후 빌드
COPY . .
RUN pnpm build

# --- 2단계: Nginx 배포 스테이지 ---
FROM nginx:1.27-alpine

# Nginx 설정 복사
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Next.js 정적 export 폴더(out 또는 dist) 복사
# ⚠️ out/ 폴더가 Next.js 기본 export 폴더입니다.
COPY --from=builder /app/out /usr/share/nginx/html

# 헬스체크 (Nginx가 정상적으로 실행되는지 확인)
HEALTHCHECK CMD wget -qO- http://127.0.0.1/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

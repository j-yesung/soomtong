# --- 1단계: 빌드 ---
# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@10 --activate

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_SITE_URL

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=$NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# (선택) 필수 인자 누락 시 빌드 실패
RUN test -n "$NEXT_PUBLIC_SUPABASE_URL" \
 && test -n "$NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY" \
 && test -n "$NEXT_PUBLIC_SITE_URL"

# 의존성 설치 레이어 캐시 최적화
COPY package.json pnpm-lock.yaml ./

# pnpm store 캐시 마운트 (BuildKit)
RUN --mount=type=cache,target=/root/.pnpm-store \
    pnpm fetch

# 소스 복사
COPY . .

# Next 빌드 캐시 마운트
RUN --mount=type=cache,target=/root/.pnpm-store \
    --mount=type=cache,target=/app/.next/cache \
    pnpm install --frozen-lockfile --prefer-offline && \
    pnpm build

# --- 2단계: 런타임 ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# standalone 번들 + 정적 리소스만 복사
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]

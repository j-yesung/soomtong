# --- 1단계: 빌드 ---
FROM node:20-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@10 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# --- 2단계: 런타임 ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
# 텔레메트리 끄기(선택)
ENV NEXT_TELEMETRY_DISABLED=1

# standalone 번들 + 정적 리소스만 복사
COPY --from=builder /app/.next/standalone ./ 
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
HEALTHCHECK CMD wget -qO- http://127.0.0.1:3000/ || exit 1

# Next의 서버 엔트리로 실행
CMD ["node", "server.js"]

# AGENTS.md

## 기본 원칙

- 기존 구조와 패턴을 먼저 확인한 뒤 변경합니다.
- 관련 없는 리팩터링이나 파일 정리는 하지 않습니다.
- 사용자 변경사항을 되돌리지 않습니다.
- 기능 변경 시 필요한 범위만 수정하고, 가능한 경우 `pnpm lint`, `pnpm typecheck`로 확인합니다.

## 프로젝트 요약

숨통(Soomtong)은 월수입 기준으로 이번 달에 실제로 사용할 수 있는 생활비를 계산하고 관리하는 모바일 우선 가계부 PWA입니다.

- Framework: Next.js 15 App Router, React 19
- Language: TypeScript
- Styling: styled-components v6, styled-system
- State/Data: Zustand, TanStack Query
- Backend: Supabase Auth, Postgres, RPC
- Deploy: Vercel

## 필요한 경우에만 읽기

- UI, 컴포넌트, 스타일, FSD 폴더 구조를 수정하는 작업이면 `docs/agents/frontend.md`를 읽습니다.
- DB, Supabase, RPC, SQL, migration을 수정하는 작업이면 `supabase/README.md`를 읽습니다.
- 그 외 작업에서는 위 세부 문서를 읽지 않아도 됩니다.

## 스킬 사용 안내

- 작업에 특정 Codex skill이 적용되는 경우, 작업 시작 전에 어떤 skill을 사용하는지 한 줄로 알립니다.
- UI/프론트엔드 작업에는 가능한 경우 frontend 관련 skill과 `docs/agents/frontend.md`를 함께 참고합니다.
- DB/Supabase 작업에는 skill보다 `supabase/README.md`와 MCP 도구 사용 규칙을 우선합니다.
- 스킬을 사용하지 않는 단순 작업은 별도 안내 없이 진행해도 됩니다.

## 주요 명령어

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```

Supabase CLI를 사용하는 경우:

```bash
pnpm db:migrations
pnpm db:push
```

Codex가 DB 변경을 맡는 경우에는 Supabase MCP `apply_migration`으로 원격 DB에 직접 적용할 수 있습니다.

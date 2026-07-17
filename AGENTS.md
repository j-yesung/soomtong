# AGENTS.md

## 기본 원칙

- 기존 구조와 패턴을 먼저 확인한 뒤 변경합니다.
- 관련 없는 리팩터링이나 파일 정리는 하지 않습니다.
- 구체적인 필요 없이 큰 추상화를 만들지 않는다.
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

## 커밋 / 브랜치

- 커밋과 브랜치 생성은 사용자가 직접 수행하고, Claude는 필요한 경우 메시지나 브랜치명만 추천합니다.
- Claude는 사용자의 명시적인 요청 없이 `git commit`, `git push`, `git checkout -b`를 실행하지 않습니다.
- 커밋 메시지는 `<type>: <subject>` 형태로 한국어로 작성합니다.
- type은 다음 중 하나를 사용합니다.
  - `feat`: 새로운 기능 추가
  - `fix`: 버그 수정
  - `hotfix`: 운영 긴급 수정
  - `refactor`: 기능 변화 없는 구조 개선
  - `style`: 포맷팅, 스타일 수정
  - `docs`: 문서 수정
  - `chore`: 빌드, 설정, 패키지, 기타 작업
- `subject`는 변경 내용을 짧고 명확하게 작성합니다.
- 하나의 커밋에는 가능한 한 하나의 목적만 담고 관련 없는 변경사항을 하나의 커밋에 섞지 않습니다

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

# AGENTS.md

## 기본 원칙

- 기존 구조와 패턴을 확인하고 필요한 범위만 변경합니다.
- 이 저장소는 작은 변경과 기존 구현 재사용을 선호합니다. 관련 없는 정리나 필요가 확인되지 않은 추상화는 만들지 않습니다.
- 컴포넌트는 관심사별로 분리하고, 한 파일에 UI·상태·비즈니스 로직이 과도하게 모이지 않도록 합니다.

## 프로젝트 요약

숨통(Soomtong)은 월수입 기준으로 이번 달에 실제로 사용할 수 있는 생활비를 계산하고 관리하는 모바일 우선 가계부 PWA입니다.

## 작업별 컨텍스트

- UI, 컴포넌트, 스타일, FSD 폴더 구조를 수정하는 작업이면 `docs/agents/frontend.md`를 읽습니다.
- DB, Supabase, RPC, SQL, migration을 수정하는 작업이면 `supabase/README.md`를 읽습니다.
- 그 외 작업에서는 위 문서를 미리 읽지 않습니다.

## 검증

- 변경 영향에 맞는 가장 작은 검증을 실행합니다.
- 문서만 수정했다면 별도 검증 명령을 실행하지 않습니다.
- TypeScript 또는 애플리케이션 코드를 수정했다면 기본적으로 `pnpm lint`와 `pnpm typecheck`를 실행합니다.
- `pnpm build`는 매번 실행하지 않습니다. 빌드 설정, 의존성, App Router 경계, 서버/클라이언트 컴포넌트 경계처럼 실제 빌드 결과에 영향을 주는 변경이나 사용자가 요청한 경우에 실행합니다.
- 검증을 실행하지 못했거나 실패했다면 완료 응답에 그 이유와 실패 내용을 남깁니다.

## 커밋 / 브랜치

- 커밋과 브랜치 생성은 사용자가 직접 수행합니다. Codex는 명시적인 요청 없이 `git commit`, `git push`, 브랜치 생성 명령을 실행하지 않습니다.
- 커밋 메시지는 `<type>: <subject>` 형태로 한국어로 작성합니다.
- type은 `feat`, `fix`, `hotfix`, `refactor`, `style`, `docs`, `chore` 중 하나를 사용합니다.
- 하나의 커밋에는 하나의 목적만 담습니다.

## 스킬 사용 안내

- 작업에 특정 Codex skill이 적용되는 경우, 작업 시작 전에 어떤 skill을 사용하는지 한 줄로 알립니다.
- UI/프론트엔드 작업에는 가능한 경우 frontend 관련 skill과 `docs/agents/frontend.md`를 함께 참고합니다.
- DB/Supabase 작업에는 skill보다 `supabase/README.md`와 MCP 도구 사용 규칙을 우선합니다.
- 스킬을 사용하지 않는 단순 작업은 별도 안내 없이 진행해도 됩니다.

Supabase CLI를 사용하는 경우:

```bash
pnpm db:migrations
pnpm db:push
```

원격 DB 변경을 맡은 경우에는 Supabase MCP `apply_migration`을 사용합니다.

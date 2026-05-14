# Supabase 데이터베이스 변경 관리

이 디렉터리는 Supabase 데이터베이스 변경 이력을 관리하는 기준 위치입니다.

## 작업 흐름

1. Supabase Dashboard에서 Database Functions를 직접 수정하지 않습니다.
2. `supabase/migrations` 아래에 새 SQL 파일을 추가합니다.
3. 해당 migration 파일에 `CREATE OR REPLACE FUNCTION public.function_name(...)` 전체 정의를 작성합니다.
4. Supabase MCP의 `apply_migration`으로 적용하거나, 로컬 프로젝트를 Supabase에 link한 뒤 `pnpm db:push`로 적용합니다.
5. RPC 인자와 반환 형태가 확정된 뒤 애플리케이션 코드를 수정합니다.

## 파일 이름 규칙

timestamp를 포함한 migration 이름을 사용합니다.

```txt
YYYYMMDDHHMMSS_describe_change.sql
```

예시:

```txt
20260514060632_baseline_rpc_functions.sql
20260515103000_update_amount_summary_window.sql
```

## 현재 baseline

`20260514060632_baseline_rpc_functions.sql`은 이 저장소에 migration 구조를 도입하기 전에 원격 Supabase 프로젝트에 이미 배포되어 있던 RPC 함수들을 기록한 baseline입니다.

앞으로 RPC를 변경할 때는 baseline 파일을 직접 수정하지 않고 새 migration 파일을 추가합니다.

## 적용 방식

Codex가 DB 변경을 맡는 경우에는 새 migration 파일을 작성한 뒤 Supabase MCP `apply_migration`으로 원격 DB에 직접 적용합니다. 이 경우 `pnpm db:push`를 직접 실행하지 않아도 Supabase의 Database Functions가 변경됩니다.

직접 터미널에서 적용하려면 Supabase CLI 설정이 필요하며, 로컬 프로젝트가 원격 Supabase 프로젝트에 link되어 있어야 합니다. 그 상태에서 아래 명령을 실행합니다.

```bash
pnpm db:push
```

Vercel 배포는 앱 빌드와 배포를 처리할 뿐, Supabase migration을 자동으로 적용하지 않습니다. 앱 코드가 DB 변경에 의존한다면 Vercel 배포 전에 migration을 먼저 적용합니다.

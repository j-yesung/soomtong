# 숨통 (Soomtong)

월수입 기준으로 "이번 달에 실제로 쓸 수 있는 생활비"를 계산하고 관리하는 모바일 우선 가계부 PWA  
Next.js App Router + Supabase(Anonymous Auth/DB) 기반으로 동작합니다.

## 주요 기능

- 로그인 화면 없는 Supabase 익명 인증
- 월수입/정산일 설정 및 사용 가능 금액 계산
- 고정지출 추가/수정/삭제
- 지출 등록 및 일자별 지출 내역 조회
- 월간 캘린더 지출 뷰 + 선택 날짜 상세 패널
- AI 지출 분석(코치형 텍스트 리포트)
- iOS PWA 설치 안내 및 홈 화면 실행 지원

## 기술 스택

| 영역       | 사용 기술                           |
| ---------- | ----------------------------------- |
| Framework  | Next.js 15 (App Router), React 19   |
| Language   | TypeScript                          |
| Styling    | styled-components v6, styled-system |
| State/Data | Zustand, TanStack Query v5          |
| Backend    | Supabase (Auth, Postgres, RPC)      |
| AI         | Google Gemini (`@google/genai`)     |
| PWA        | `next-pwa`                          |

## 프로젝트 구조

```text
.
├─ src
│  ├─ app                    # 라우트, API route, 레이아웃
│  ├─ features               # 도메인 기능 단위 UI/상태/쿼리
│  ├─ widgets                # 화면 단위 조합
│  ├─ shared                 # 공용 UI, 유틸, lib
│  └─ supabase               # Supabase 데이터 접근 로직
├─ public                    # 아이콘, 매니페스트, PWA 리소스
└─ infra                     # 과거 EC2/Docker CI/CD 실험용 파일(현재 운영 미사용)
```

## 시작하기

### 1) 요구 사항

- Node.js 20+
- pnpm 10+
- Supabase 프로젝트(Anonymous Sign-ins 활성화)

### 2) 설치

```bash
pnpm install
```

### 3) 환경 변수 설정

`.env.local` 파일에 아래 값을 설정합니다.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GEMINI_API_KEY=
```

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`는 필수입니다.
- `NEXT_PUBLIC_GEMINI_API_KEY`는 AI 분석 기능(`/api/ai/insight`) 사용 시 필요합니다.
- `NEXT_PUBLIC_SITE_URL`은 로컬/컨테이너 기반 실행 시 사용합니다.

### 4) 실행

```bash
pnpm dev
```

브라우저에서 `http://localhost:3000`을 열면 `/dashboard`로 리다이렉트됩니다.

## 스크립트

| 명령어           | 설명                      |
| ---------------- | ------------------------- |
| `pnpm dev`       | 개발 서버 실행(Turbopack) |
| `pnpm build`     | 프로덕션 빌드             |
| `pnpm start`     | 빌드 결과 실행            |
| `pnpm lint`      | ESLint 검사               |
| `pnpm typecheck` | 타입 검사                 |

## 라우트 요약

| 경로                              | 설명                       |
| --------------------------------- | -------------------------- |
| `/`                               | `/dashboard`로 리다이렉트  |
| `/login`                          | `/dashboard`로 리다이렉트  |
| `/dashboard`                      | 메인 대시보드              |
| `/dashboard?tab=home`             | 홈 요약                    |
| `/dashboard?tab=calendar`         | 달력 뷰                    |
| `/dashboard?tab=fixed`            | 고정지출 관리              |
| `/dashboard?tab=expense`          | 지출내역                   |
| `/dashboard?tab=expense-analysis` | AI 분석 결과               |
| `/prompt-information`             | iOS PWA 설치 안내          |
| `/api/ai/insight`                 | AI 분석 API(POST)          |

## Supabase 준비 체크리스트

### 인증

- Anonymous Sign-ins 활성화

### 데이터

코드에서 아래 리소스를 사용합니다.

- 테이블: `user_profile`, `fixed_expenses`, `expenses`
- RPC 함수:
  - `add_fixed_item`
  - `remove_fixed_item`
  - `update_fixed_item`
  - `get_current_month_amount_summary`
  - `add_expense`
  - `update_fixed_settings`

## 배포 참고

- 현재 운영 배포는 **Vercel**을 사용합니다.
- `infra` 폴더의 EC2/Docker/Caddy 및 워크플로우 파일은 CI/CD 구축 경험을 위해 잠깐 사용했던 실험/참고용 자료입니다.
- 앱은 `next.config.mjs`에서 `output: "standalone"`로 설정되어 있어 필요 시 컨테이너 배포 방식으로 다시 전환할 수 있습니다.

# Soomtong App (숨통)

### 내 생활비에 숨통이 트이다!

> 월급을 기준으로 "이번 달에 실제로 사용할 수 있는 돈"을 명확하게 보여주는 개인 재무 관리 서비스<br>
> 고정지출과 저축/투자를 먼저 분리한 뒤 남은 생활비를 기준으로 사용 흐름을 시각화해 "얼마를 쓰면 되는지"가 아니라 "얼마까지 써도 괜찮은지"를 직관적으로 이해할 수 있도록 제작<br>
> 단순한 기능 구현을 넘어 **확장성 있는 아키텍처**, **최적화된 사용자 경험**, **안정적인 인프라 구축**에 주안점을 두었다.

## 🏗 아키텍처 및 디자인 패턴 (Architecture)

이 프로젝트는 유지보수성과 확장성을 고려하여 **Feature-Sliced Design (FSD)** 과 유사한 도메인 주도 설계로 구현했습니다.

### 1. Domain-Driven Structure (`src/features`)

기능(Feature)을 기준으로 폴더를 격리하여 응집도를 높이고 결합도를 낮췄습니다. 각 기능 폴더는 UI, 데이터 로직, 상태 관리를 독립적으로 구현했습니다.

- **Dashboard**: 재무 상태 시각화 및 데이터 집계
- **Expense**: 지출 내역 CRUD 및 카테고리 관리
- **Salary**: 직원 급여 계산 및 명세서 관리
- **Auth**: Supabase 기반의 인증 세션 관리

### 2. Modern Tech Stack & Decision

| Category     | Stack                        | Decision Rationale                                                                                                    |
| ------------ | ---------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Core**     | **Next.js 15 (App Router)**  | 서버 컴포넌트(RSC)를 활용한 초기 로딩 최적화 및 SEO 강화. TurboPack 도입으로 빠른 개발 경험 확보.                     |
| **Language** | **TypeScript**               | 정적 타입을 통한 런타임 에러 방지 및 개발자 경험(DX) 향상.                                                            |
| **State**    | **Zustand & React Query**    | 클라이언트 상태(Zustand)와 서버 상태(TanStack Query)의 명확한 분리. Optimistic Update를 통한 즉각적인 UI 반응성 구현. |
| **UI/UX**    | **React 19 & Framer Motion** | React 19의 최신 기능 활용. Framer Motion을 이용한 부드러운 화면 전환 및 인터랙션.                                     |
| **Styling**  | **Styled Components**        | CSS-in-JS 방식을 통한 동적 스타일링 및 컴포넌트 단위 스타일 캡슐화.                                                   |

### 3. Mobile-First UX

모바일 환경에서의 사용성을 최우선으로 고려했습니다.

- **Custom Hooks**: `useBottomSheet` 등 모바일 네이티브 앱과 유사한 제스처 및 인터랙션을 웹에서 구현하기 위한 커스텀 훅 개발
- **Responsive Design**: 다양한 디바이스 크기에 대응하는 유연한 레이아웃 시스템 구축

## 🛠 백엔드 및 인프라 (Backend & Infra)

프론트엔드 개발자가 주도적으로 관리할 수 있는 **Serverless** 및 **Container** 기반 인프라 구축

### 🔐 Supabase (BaaS)

- **Authentication**: JWT 기반의 안전한 세션 관리 및 소셜 로그인 연동
- **Database**: PostgreSQL 기반의 강력한 관계형 데이터베이스 활용. Row Level Security (RLS) 정책을 통해 데이터 보안 강화
- **Edge Function**: 서버리스 환경에서의 가벼운 백엔드 로직 처리

### ☁️ Deployment & Infra

#### Current Deployment (Vercel)

- **Vercel**: Next.js에 최적화된 Vercel을 사용하여 CI/CD 및 호스팅을 관리하고 있어서 별도의 인프라 관리 비용 없이 고가용성과 성능 확보

#### Legacy / Knowledge (AWS EC2 & Docker)

> `infra` 폴더는 AWS EC2, Docker, Caddy를 활용한 **직접 배포 파이프라인 구축 경험**을 기록으로 남겨둔 것

- **Dockerization**: 애플리케이션을 컨테이너화하여 개발 및 배포 환경의 일관성 보장
- **Caddy Web Server**: 자동 HTTPS 인증서 발급 및 리버스 프록시(Reverse Proxy) 설정

## ✨ 기술적 도전 및 해결 (Technical Highlights)

### 🚀 성능 최적화 (Performance)

- **Code Splitting**: Next.js의 자동 코드 분할 및 Dynamic Import를 적극 활용하여 TTI 단축
- **Image Optimization**: `next/image` 컴포넌트를 사용하여 이미지 포맷 자동 변환(WebP/AVIF) 및 Lazy Loading 적용

### 🔄 데이터 동기화와 캐싱

- **Stale-While-Revalidate**: React Query의 캐싱 전략을 세밀하게 조정하여 서버 부하를 줄이면서도 최신 데이터를 유지하도록 설계
- **Prefetching**: 사용자가 다음 페이지로 이동할 확률이 높은 경우 데이터를 미리 로드하여 끊김 없는 사용자 경험 제공

### 🧩 컴포넌트 추상화

- **Headless UI Design**: 비즈니스 로직과 스타일을 분리하여 재사용 가능한 공통 컴포넌트(`src/components/common`) 라이브러리 구축

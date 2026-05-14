# Frontend 작업 규칙

이 문서는 UI, 컴포넌트, 스타일, FSD 폴더 구조를 수정하는 작업에서만 읽습니다.

## 기본 방향

- 이 프로젝트는 FSD 방식의 폴더 구조를 따릅니다.
- 기존 컴포넌트와 스타일 패턴을 먼저 확인한 뒤 구현합니다.
- 모바일 우선 가계부 PWA라는 제품 맥락에 맞춰, 과한 장식보다 반복 사용이 편한 UI를 우선합니다.
- 새 UI를 만들기 전에 `src/shared/ui`의 공통 UI 컴포넌트를 먼저 확인하고 재사용합니다.

## 공통 UI 사용

- 버튼, 입력, 카드, 레이아웃, 텍스트, 태그, 토스트, 바텀시트 등은 `src/shared/ui`에 있는 컴포넌트를 기준으로 구현합니다.
- 공통 UI로 해결 가능한 경우 새 컴포넌트를 만들지 않습니다.
- 새 공통 UI가 필요할 때만 `src/shared/ui`에 추가합니다.
- 공통 UI의 props는 꼭 필요한 것만 최소로 둡니다.
- 특정 도메인에서만 쓰는 props나 비즈니스 로직을 공통 UI에 넣지 않습니다.

## FSD 파일 위치

- 도메인 기능 단위 UI는 `src/features/{domain}` 아래에 둡니다.
- 화면을 구성하는 큰 단위 UI는 `src/widgets/{domain}Screen` 또는 기존 widgets 구조에 맞춰 둡니다.
- 여러 도메인에서 재사용하는 순수 UI만 `src/shared/ui`에 둡니다.
- Supabase 접근 로직은 `src/supabase/{domain}`에 둡니다.
- 전역 레이아웃은 `src/shared/layout`의 기존 구조를 우선합니다.

예시:

```txt
src/features/dashboard/home
src/features/dashboard/calendar
src/features/dashboard/expense
src/features/dashboard/fixed
src/widgets/homeScreen
src/widgets/calendarScreen
src/widgets/expenseScreen
src/shared/ui/button
```

## 함수 컨벤션

- 이벤트 핸들러 함수 이름은 반드시 `handle`로 시작합니다.
- 예: `handleClick`, `handleSubmit`, `handleChangeAmount`, `handleCloseBottomSheet`
- React 컴포넌트는 PascalCase를 사용합니다.
- hook은 `use`로 시작합니다.
- boolean 값은 의미가 드러나도록 `is`, `has`, `can`, `should` 계열 이름을 사용합니다.
- 비동기 함수는 동작이 드러나는 동사로 시작합니다.

## 컴포넌트 props 컨벤션

- props는 최소한으로 유지합니다.
- 현재 요구사항에 필요하지 않은 확장용 props를 미리 추가하지 않습니다.
- 도메인 상태 전체를 넘기기보다 컴포넌트가 실제로 사용하는 값만 넘깁니다.
- 이벤트 props는 의미가 드러나는 이름을 사용합니다.
- 예: `onClose`, `onSubmit`, `onSelectDate`, `onChangeAmount`

## 스타일 규칙

- 기존 styled-components, styled-system 사용 방식을 따릅니다.
- 레이아웃은 기존 `Box`, `Flex`, `Grid`, `Row`, `Column` 계열 공통 UI를 우선 사용합니다.
- 텍스트는 기존 heading/text 스타일 체계를 먼저 확인합니다.
- 모바일 화면에서 텍스트가 버튼이나 카드 밖으로 넘치지 않도록 확인합니다.
- 페이지 단위 작업 후에는 가능한 경우 실제 화면에서 레이아웃 깨짐을 확인합니다.

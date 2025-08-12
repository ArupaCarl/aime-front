# 프로젝트 관리 도구

React와 TypeScript로 구축된 현대적인 프로젝트 관리 웹 애플리케이션입니다.

## 주요 기능

- 📊 **대시보드**: 프로젝트 현황 및 통계 확인
- 📋 **작업 관리**: 티켓 및 작업 추적
- 📅 **미팅 관리**: 캘린더 및 일정 관리
- 👥 **팀 관리**: 팀원 및 권한 관리
- ⚙️ **설정**: 시스템 및 사용자 설정

## 기술 스택

- **Frontend**: React 18, TypeScript
- **UI Framework**: Tailwind CSS, Radix UI
- **Icons**: Lucide React
- **Build Tool**: Create React App

## 설치 및 실행

1. 의존성 설치:
```bash
npm install
```

2. 개발 서버 실행:
```bash
npm start
```

3. 빌드:
```bash
npm run build
```

## 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── ui/             # 재사용 가능한 UI 컴포넌트
│   └── ...             # 페이지별 컴포넌트
├── types/              # TypeScript 타입 정의
├── constants/          # 상수 및 데이터
├── utils/              # 유틸리티 함수
└── styles/             # 전역 스타일
```

## 개발 가이드라인

- TypeScript를 사용하여 타입 안정성 확보
- 컴포넌트 기반 아키텍처 적용
- 접근성(ARIA) 속성 포함
- 반응형 디자인 적용
- Tailwind CSS 클래스 우선 사용

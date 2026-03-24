# BiteLearn Frontend

<a href="https://www.bitelearn.site"><img src="https://img.shields.io/badge/🌐_BiteLearn_Service-배포_링크-5A58FF?style=for-the-badge" alt="Service Link" /></a>

<img width="700" alt="image" src="https://github.com/user-attachments/assets/00a29287-17ed-4f89-b659-94a17df7766a" />

## Table of Contents

- [Project Overview](#poject-verview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Routing](#routing)
- [Getting Started](#getting-started)
- [Current Status](#current-status)
- [Technical Challenges](#technical-challenges)
- [Next Steps](#next-steps)

## Project Overview

사회초년생을 위한 계약 지식 학습 서비스입니다.
부동산, 생활금융, 세무, 투자 같은 실생활 주제를 퀴즈와 아티클로 쉽고 가볍게 학습할 수 있도록 구성했습니다.

- **개발 기간**: 2026.02.24 - 2026.03.26
- **팀 구성**: FE 1명, BE 1명, PD 2명, PM 3명

프론트엔드 개발을 단독으로 담당하여 서비스 화면 설계 및 구현, 라우팅, 인증, API 연동, 상태관리 등의 전반을 수행했습니다.

## Key Features

### 1. 대시보드

- 비회원/회원 상태에 따라 다른 히어로 섹션을 보여줍니다.
- 오늘의 추천 학습과 유용한 아티클을 홈에서 바로 탐색할 수 있습니다.

### 2. 학습 로드맵

- 카테고리 > 토픽 > 챕터 흐름으로 학습 경로를 제공합니다.
- 단어 카드, 지문 보기, 객관식/OX/문서형 퀴즈, 결과 화면까지 이어지는 학습 플레이어를 포함합니다.

### 3. 아티클

- 대표 아티클과 카드 목록을 제공합니다.
- 상세 페이지에서 요약, 본문, 공유 기능을 확인할 수 있습니다.

### 4. 노트

- 오답노트를 카테고리별로 필터링해 복습할 수 있습니다.
- 북마크한 아티클을 별도 탭에서 모아볼 수 있습니다.

### 5. 인증 및 마이페이지

- 이메일 로그인/회원가입과 Google, Naver 소셜 로그인 진입점을 제공합니다.
- 닉네임 수정, 로그아웃, 이용약관/개인정보처리방침 링크를 지원합니다.

## Tech Stack

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=white)

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)

![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)

![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Project Structure

```text
src/
  api/                API 통신, 인증, 학습/노트 쿼리
  assets/             브랜드, 캐릭터, 카테고리, 아티클 이미지
  components/
    common/           공통 레이아웃/헤더/푸터/SEO
    features/         도메인별 UI 컴포넌트
    ui/               재사용 가능한 베이스 UI
  constants/          서비스 상수, 학습 메타데이터, 약관 링크
  hooks/              북마크, 그림자, URL 파라미터 등 커스텀 훅
  layouts/            루트/앱 레이아웃
  lib/                SEO, 에러 로깅, 학습 네비게이션 유틸
  mock/               대시보드, 학습, 아티클 목업 데이터
  pages/              라우트 단위 페이지
  router/             전체 라우팅 정의
  schemas/            폼 검증 스키마
  utils/              포맷팅 유틸
```

## Routing

- `/` : 홈 대시보드
- `/learning` : 학습 카테고리
- `/learning/:categoryId/topics/:topicId` : 학습 로드맵
- `/learning/:categoryId/:chapterId` : 학습 진행
- `/articles` : 아티클 목록
- `/articles/:articleId` : 아티클 상세
- `/notes` : 오답노트 / 북마크
- `/mypage` : 마이페이지
- `/login`, `/signup/terms`, `/signup` : 인증 관련 페이지

## Getting Started

```bash
# 프로젝트 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## Troubleshooting

### 1. 인증 안정화: refresh 중복 요청과 무한 루프 방지

- 문제: 여러 API 요청이 동시에 토큰 만료를 만나면 refresh 요청이 중복 실행되거나, refresh 실패 시 인증 흐름이 반복될 위험이 있었습니다.
- 해결: refresh 요청을 단일 Promise로 관리해 한 번만 실행되도록 제어하고, refresh 요청 자체는 interceptor의 재진입 대상에서 제외해 무한 루프를 방지했습니다.
- 결과: 동시 요청과 예외 상황에서도 토큰 재발급 흐름을 안정적으로 유지하고, 인증 실패 상황 역시 예측 가능한 방식으로 처리할 수 있게 했습니다.

### 2. 인증 UX 개선: 새로고침 이후 인증 상태 복구

- 문제: 메모리 기반 액세스 토큰 관리만 사용할 경우, 새로고침 시 토큰 정보가 사라져 로그인 유지 경험이 부자연스러웠습니다.
- 해결: persist 기반 저장 전략을 적용하고, 사용자 정보 재조회 흐름과 연결해 앱 재시작 이후에도 토큰 유효성 확인 뒤 사용자 상태를 복구하도록 구성했습니다.
- 결과: 새로고침 이후에도 인증 흐름이 매끄럽게 이어지도록 개선했습니다.

### 3. 조회 구조 개선: React Query 기반 조회 규칙 통일

- 문제: 학습 메인, 로드맵, 챕터 상세, 오답노트 등 여러 화면에서 로딩, 에러, fallback 처리 방식이 제각각이었습니다.
- 해결: 학습 메인, 로드맵, 챕터 상세, 오답노트, 사용자 정보 조회를 React Query 훅 중심으로 재구성했습니다.
- 결과: 화면은 렌더링에 집중하고 데이터 계층은 조회 규칙을 담당하도록 역할을 분리했으며, 유지보수성과 예외 처리 일관성을 높였습니다.

## Current Status

- 현재 프로젝트는 일부 화면에서 실제 API와 `mock` 데이터를 함께 사용합니다.
- 인증, 학습 카테고리/챕터, 오답노트는 API 연동 구조를 기준으로 작성되어 있습니다.
- 실제 학습 진행은 월세 토픽 챕터 1, 2 데이터만 연결되어 있어 해당 범위에서만 플레이 가능합니다.
- 오답노트는 복습용 조회와 문제 확인 중심으로 구현되어 있습니다.

## Next Steps

- 실제 API 기반 아티클 목록/상세 데이터 연동
- 추천 학습과 대시보드 데이터 개인화 고도화
- 액세스 토큰 검증 및 인증 예외 처리 로직 보강
- FAQ, 공지사항, 비밀번호 변경 등 마이페이지 미구현 기능 확장
- 온보딩 이후 사용자 맞춤 학습 흐름 개선

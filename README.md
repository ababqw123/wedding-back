# 예식 시스템 관리 및 키오스크 웹앱

- 배포 URL : https://wedding-app-delta.vercel.app

<br>

## 프로젝트 소개

- 웨딩 업체 등록부터 홀관리, 예식 일정까지 관리할 수 있는 시스템입니다.
- 예식 일정을 등록할 경우 자동으로 모바일 청접장이 생성되고, 청첩장을 공유할 수 있습니다.
- 모바일 청첩장에서 예비 등록을 할 시, QR코드가 생성되고 QR코드를 키오스크에 찍음으로써 편하게 결재와 식권을 받을 수 있습니다.

<br>

## 1. 개발 환경

- Front : HTML, NextJs(Typescript), MUI, PWA(앱으로 생성)
- Back-end : NestJs(Typescript)
- DB : MongoDB
- 버전 및 이슈관리 : Github
- 서비스 배포 환경 : Netlify, Oracle Cloud, Docker, Github Action
  <br>

## 2. 프로젝트 구조

```
wedding-app
├─ .DS_Store
├─ README.md
├─ docker-compose.yml
├─ wedding-backend
│  ├─ .dockerignore
│  ├─ .env
│  ├─ .eslintrc.js
│  ├─ .prettierrc
│  ├─ Dockerfile
│  ├─ README.md
│  ├─ ecosystem.config.cjs
│  ├─ nest-cli.json
│  ├─ package.json
│  ├─ src
│  │  ├─ app.controller.ts
│  │  ├─ app.module.ts
│  │  ├─ app.service.ts
│  │  ├─ controller
│  │  │  ├─ company.controller.ts
│  │  │  └─ login.controller.ts
│  │  ├─ function.ts
│  │  ├─ interface
│  │  │  ├─ companyInfo.ts
│  │  │  ├─ congratulatoryMoney.ts
│  │  │  ├─ hallInfo.ts
│  │  │  ├─ userInfo.ts
│  │  │  └─ weddingInfo.ts
│  │  ├─ main.ts
│  │  ├─ module
│  │  │  ├─ company.module.ts
│  │  │  └─ login.module.ts
│  │  ├─ schema
│  │  │  ├─ companyInfo.ts
│  │  │  ├─ congratulatoryMoney.ts
│  │  │  ├─ userInfo.ts
│  │  │  └─ weddingInfo.ts
│  │  ├─ secret
│  │  │  ├─ AES256.ts
│  │  │  └─ AESKeySetting.ts
│  │  └─ service
│  │     ├─ company.service.ts
│  │     └─ login.service.ts
│  ├─ test
│  │  ├─ app.e2e-spec.ts
│  │  └─ jest-e2e.json
│  ├─ tsconfig.build.json
│  ├─ tsconfig.json
│  └─ yarn.lock
└─ wedding-frontend
   ├─ .dockerignore
   ├─ .env
   ├─ Dockerfile
   ├─ README.md
   ├─ next-env.d.ts
   ├─ next.config.js
   ├─ package-lock.json
   ├─ package.json
   ├─ pages
   │  ├─ _app.tsx
   │  ├─ _document.tsx
   │  ├─ admin
   │  │  ├─ company.tsx
   │  │  ├─ index.tsx
   │  │  └─ wedding
   │  │     ├─ [token].tsx
   │  │     ├─ addWedding.tsx
   │  │     └─ index.tsx
   │  ├─ customer
   │  │  └─ [token].tsx
   │  ├─ index.tsx
   │  ├─ invitation
   │  │  └─ [token].tsx
   │  ├─ login.tsx
   │  ├─ qrscan
   │  │  └─ index.tsx
   │  └─ register
   │     └─ [token].tsx
   ├─ public
   │  ├─ assets
   │  │  ├─ BackgroundVideo.mp4
   │  │  ├─ Gallery_Photo_1.webp
   │  │  ├─ Gallery_Photo_2.webp
   │  │  ├─ Gallery_Photo_3.webp
   │  │  ├─ Gallery_Photo_4.webp
   │  │  ├─ Gallery_Photo_5.webp
   │  │  ├─ Gallery_Photo_6.webp
   │  │  ├─ GroovePaper.png
   │  │  ├─ LocationMap.png
   │  │  ├─ Quote.png
   │  │  ├─ flower1.png
   │  │  ├─ flower2.png
   │  │  ├─ flower3.png
   │  │  └─ song.mp3
   │  ├─ companent
   │  │  ├─ Appbar.tsx
   │  │  ├─ KakaoMap.tsx
   │  │  ├─ SnackBarCustom.tsx
   │  │  └─ copyClipboard.tsx
   │  ├─ favicon.ico
   │  ├─ fonts
   │  │  └─ SKYBORI.ttf
   │  ├─ icons
   │  │  ├─ icon-128x128.png
   │  │  ├─ icon-144x144.png
   │  │  ├─ icon-152x152.png
   │  │  ├─ icon-192x192.png
   │  │  ├─ icon-384x384.png
   │  │  ├─ icon-48x48.png
   │  │  ├─ icon-512x512.png
   │  │  ├─ icon-72x72.png
   │  │  └─ icon-96x96.png
   │  ├─ manifest.json
   │  ├─ next.svg
   │  ├─ photo
   │  │  └─ 45-degree-fabric-light.png
   │  ├─ sw.js
   │  ├─ sw.js.map
   │  ├─ types
   │  │  ├─ instascan.d.ts
   │  │  ├─ kakaoMap.d.ts
   │  │  └─ quagga.d.ts
   │  ├─ vercel.svg
   │  ├─ workbox-bd7e3b9b.js
   │  └─ workbox-bd7e3b9b.js.map
   ├─ styles
   │  ├─ Home.module.css
   │  └─ globals.css
   ├─ tsconfig.json
   └─ yarn.lock

```

## 3. 개발 기간 및 작업 관리

### 개발 기간

- 전체 개발 기간 : 2023-12 ~ 2024-04

<br>
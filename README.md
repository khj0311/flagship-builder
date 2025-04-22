# Flagship Builder

Vanilla JavaScript, SCSS, HTML 기반의 다중 프로젝트 빌드 시스템입니다. Vite를 사용하여 빠른 개발 및 빌드 환경을 제공합니다.

## 프로젝트 구조

```
flagship-builder/
├── src/
│   ├── projectA/                     # 프로젝트 A
│   │   ├── common/                  # 공통 파일
│   │   │   ├── styles/             # 스타일 파일
│   │   │   ├── scripts/            # 유틸리티 스크립트
│   │   │   └── sections/           # HTML 섹션 컴포넌트
│   │   ├── components/             # 컴포넌트
│   │   │   ├── componentA/         # 컴포넌트 A
│   │   │   │   ├── componentA.html # HTML 템플릿
│   │   │   │   ├── componentA.scss # 스타일
│   │   │   │   └── componentA.js   # 자바스크립트
│   │   │   └── componentB/         # 컴포넌트 B
│   │   └── projectA.js             # 프로젝트 A 진입점
│   ├── projectB/                     # 프로젝트 B (동일한 구조)
│   ├── styles/                       # 공유 스타일
│   └── main.js                       # 메인 진입점
├── public/                           # 정적 파일
├── index.html                        # 프로젝트 선택 페이지
├── projectA.html                     # 프로젝트 A 진입 HTML
├── projectB.html                     # 프로젝트 B 진입 HTML
├── vite.config.js                    # Vite 설정
└── package.json                      # 프로젝트 설정
```

## 기능

- **다중 프로젝트 지원**: 하나의 코드베이스에서 여러 프로젝트 관리
- **분리된 빌드 환경**: 각 프로젝트별로 독립적인 개발 및 빌드 환경
- **컴포넌트 기반 아키텍처**: HTML, SCSS, JS가 한 세트로 구성된 컴포넌트
- **Vanilla JS**: 외부 프레임워크 없이 순수 자바스크립트 사용
- **SCSS**: 고급 스타일링을 위한 SCSS 지원
- **Vite 빌드 시스템**: 빠른 개발 및 최적화된 빌드

## 설치 방법

1. 저장소 클론

```bash
git clone https://github.com/khj0311/flagship-builder.git
cd flagship-builder
```

2. 의존성 설치

```bash
npm install
```

## 개발 방법

### 프로젝트 선택기 실행

```bash
npm run dev
```

### 프로젝트 A 개발 서버 실행

```bash
npm run dev:projectA
```

이 명령은 3001 포트에서 프로젝트 A를 실행합니다.

### 프로젝트 B 개발 서버 실행

```bash
npm run dev:projectB
```

이 명령은 3002 포트에서 프로젝트 B를 실행합니다.

## 빌드 방법

### 모든 프로젝트 빌드

```bash
npm run build
```

### 프로젝트 A만 빌드

```bash
npm run build:projectA
```

빌드된 결과물은 `dist/projectA` 폴더에 생성됩니다.

### 프로젝트 B만 빌드

```bash
npm run build:projectB
```

빌드된 결과물은 `dist/projectB` 폴더에 생성됩니다.

## 빌드 결과물 미리보기

### 프로젝트 A 미리보기

```bash
npm run preview:projectA
```

### 프로젝트 B 미리보기

```bash
npm run preview:projectB
```

## 새 프로젝트 추가하기

1. `src` 폴더에 새 프로젝트 폴더 생성 (예: `projectC`)
2. 프로젝트 구조 생성 (common, components 등)
3. 루트에 새 프로젝트의 HTML 파일 생성 (예: `projectC.html`)
4. `package.json`에 새 프로젝트 스크립트 추가
5. `vite.config.js`의 input에 새 프로젝트 추가

예시:

```javascript
// vite.config.js
input: {
  main: resolve(__dirname, 'index.html'),
  projectA: resolve(__dirname, 'projectA.html'),
  projectB: resolve(__dirname, 'projectB.html'),
  projectC: resolve(__dirname, 'projectC.html') // 새 프로젝트 추가
}
```

## 새 컴포넌트 추가하기

1. 프로젝트의 components 폴더에 새 컴포넌트 폴더 생성
2. HTML, SCSS, JS 파일 생성
3. 프로젝트의 진입점 JS 파일에서 컴포넌트 import 및 초기화

## 기술 스택

- HTML5
- SCSS
- JavaScript (ES6+)
- Vite (빌드 툴)

## 라이센스

MIT
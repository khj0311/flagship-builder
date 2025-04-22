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
├── index.html                        # 메인 HTML
├── vite.config.js                    # Vite 설정
└── package.json                      # 프로젝트 설정
```

## 기능

- **다중 프로젝트 지원**: 하나의 코드베이스에서 여러 프로젝트 관리
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

3. 개발 서버 시작

```bash
npm run dev
```

## 프로젝트 사용 방법

### 개발 서버 실행

```bash
npm run dev
```

이후 브라우저에서 `http://localhost:3000`으로 접속하면 프로젝트 선택 화면이 표시됩니다.
특정 프로젝트를 직접 실행하려면 URL 파라미터를 사용할 수 있습니다:

- Project A: `http://localhost:3000/?project=projectA`
- Project B: `http://localhost:3000/?project=projectB`

### 빌드

프로덕션용 빌드:

```bash
npm run build
```

빌드된 결과물은 `dist` 폴더에 생성됩니다.

### 빌드 결과물 미리보기

```bash
npm run preview
```

## 새 프로젝트 추가하기

1. `src` 폴더에 새 프로젝트 폴더 생성 (예: `projectC`)
2. 프로젝트 구조 생성 (common, components 등)
3. 프로젝트 진입점 JS 파일 생성 (예: `projectC.js`)
4. `src/main.js`에 프로젝트 정보 추가
5. `vite.config.js`의 manualChunks에 프로젝트 추가

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
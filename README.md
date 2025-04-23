# Flagship Builder

Vanilla JavaScript, SCSS, HTML 기반의 다중 프로젝트 빌드 시스템입니다. Vite를 사용하여 빠른 개발 및 빌드 환경을 제공합니다.

## 프로젝트 구조

```
flagship-builder/
├── build-utils/                     # 빌드 유틸리티
│   └── project-builder.js          # 컴포넌트 통합 빌드 스크립트
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
│   │   ├── templates/              # HTML 템플릿
│   │   │   ├── index.html         # 기본 HTML 템플릿
│   │   │   ├── index-rtl.html     # RTL 용 HTML 템플릿
│   │   │   └── index-pim.html     # PIM 용 HTML 템플릿
│   │   ├── exports.js              # 컴포넌트 내보내기
│   │   └── projectA.js             # 프로젝트 A 진입점
│   ├── projectB/                     # 프로젝트 B (동일한 구조)
│   └── styles/                       # 공유 스타일
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
- **다양한 HTML 템플릿**: 프로젝트별로 index, index-rtl, index-pim 템플릿 지원
- **자동 통합 빌드**: 컴포넌트의 HTML, CSS, JS를 자동으로 통합하는 빌드 시스템
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

빌드된 결과물은 `dist/projectA` 폴더에 생성되며, 다음과 같은 파일이 포함됩니다:
- `index.html`: 기본 HTML 버전
- `index-rtl.html`: RTL(Right-to-Left) 버전
- `index-pim.html`: PIM(Product Information Management) 버전 

### 프로젝트 B만 빌드

```bash
npm run build:projectB
```

빌드된 결과물은 `dist/projectB` 폴더에 생성됩니다.

## HTML 템플릿 구조

각 프로젝트에는 세 가지 유형의 HTML 템플릿이 있습니다:

1. **index.html**: 기본 HTML 구조를 가진 템플릿
   - `<style>` 태그: 모든 컴포넌트의 SCSS가 통합됨
   - `<div id="contents">`: 모든 컴포넌트의 HTML이 순서대로 통합됨
   - `<script>`: 모든 컴포넌트의 JS가 통합됨

2. **index-rtl.html**: RTL 언어를 지원하는 템플릿 (아랍어, 히브리어 등)
   - 기본 구조는 index.html과 동일하나 dir="rtl" 속성과 RTL 스타일이 적용됨

3. **index-pim.html**: 순수 컨텐츠만 포함된 최소 버전
   - HTML 구조 없이 style, div#contents, script 태그만 포함
   - 다른 시스템에 통합하기 위한 용도

## 컴포넌트 빌드 프로세스

빌드 과정에서는 다음과 같은 작업이 자동으로 수행됩니다:

1. 각 컴포넌트의 SCSS 파일이 컴파일되어 하나의 스타일 시트로 통합
2. 각 컴포넌트의 HTML 파일이 순서대로 하나의 컨텐츠로 통합
3. 각 컴포넌트의 JS 파일이 하나의 스크립트로 통합
4. 프로젝트별로 세 가지 유형의 HTML 템플릿에 위 내용이 삽입됨

## 새 프로젝트 추가하기

1. `src` 폴더에 새 프로젝트 폴더 생성 (예: `projectC`)
2. 프로젝트 구조 생성 (common, components, templates 등)
3. `exports.js` 파일 생성하여 컴포넌트 내보내기 설정
4. 루트에 새 프로젝트의 HTML 파일 생성 (예: `projectC.html`)
5. `package.json`에 새 프로젝트 스크립트 추가
6. `vite.config.js`의 input에 새 프로젝트 추가

## 새 컴포넌트 추가하기

1. 프로젝트의 components 폴더에 새 컴포넌트 폴더 생성
2. HTML, SCSS, JS 파일 생성 (파일명은 컴포넌트 폴더명과 동일하게)
3. 프로젝트의 `exports.js` 파일에 새 컴포넌트 import 및 추가

## 기술 스택

- HTML5
- SCSS
- JavaScript (ES6+)
- Vite (빌드 툴)
- Node.js (빌드 스크립트)

## 라이센스

MIT
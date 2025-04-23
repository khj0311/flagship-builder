/**
 * ProjectA Component Exports
 * 
 * 이 파일은 projectA의 모든 컴포넌트를 export하고,
 * 빌드 시 HTML, CSS, JS를 적절히 결합하는 역할을 합니다.
 */

// 컴포넌트 import
import './components/componentA/componentA.scss';
import componentAHTML from './components/componentA/componentA.html?raw';
import { initComponentA } from './components/componentA/componentA.js';

import './components/componentB/componentB.scss';
import componentBHTML from './components/componentB/componentB.html?raw';
import { initComponentB } from './components/componentB/componentB.js';

// 모든 컴포넌트의 HTML을 순서대로 모음
export const componentHTMLs = [
  componentAHTML,
  componentBHTML
];

// 컴포넌트 초기화 함수들을 모음
export const initFunctions = [
  initComponentA,
  initComponentB
];

// 모든 컴포넌트를 초기화하는 함수
export function initAllComponents() {
  // 모든 초기화 함수 실행
  initFunctions.forEach(initFn => initFn());
}

// 빌드 시 사용되는 정보
export default {
  componentHTMLs,
  initFunctions,
  initAllComponents
};
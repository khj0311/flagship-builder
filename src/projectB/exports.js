/**
 * ProjectB Component Exports
 * 
 * 이 파일은 projectB의 모든 컴포넌트를 export하고,
 * 빌드 시 HTML, CSS, JS를 적절히 결합하는 역할을 합니다.
 */

// 컴포넌트 import
import './components/slider/slider.scss';
import sliderHTML from './components/slider/slider.html?raw';
import { initSliders } from './components/slider/slider.js';

import './components/card/card.scss';
import cardHTML from './components/card/card.html?raw';
import { initCards } from './components/card/card.js';

// 모든 컴포넌트의 HTML을 순서대로 모음
export const componentHTMLs = [
  sliderHTML,
  cardHTML
];

// 컴포넌트 초기화 함수들을 모음
export const initFunctions = [
  initSliders,
  initCards
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
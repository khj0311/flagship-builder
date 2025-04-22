/**
 * ProjectA Utility Functions
 */

// DOM Helper functions
export function selectElement(selector) {
  return document.querySelector(selector);
}

export function selectAllElements(selector) {
  return document.querySelectorAll(selector);
}

// Event handler helper
export function addEvent(element, event, handler) {
  if (element) {
    element.addEventListener(event, handler);
  }
}

// Animation utilities
export function fadeIn(element, duration = 500) {
  if (!element) return;
  
  element.style.opacity = 0;
  element.style.display = 'block';
  
  let start = null;
  
  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    
    element.style.opacity = Math.min(progress / duration, 1);
    
    if (progress < duration) {
      window.requestAnimationFrame(animate);
    }
  }
  
  window.requestAnimationFrame(animate);
}
/**
 * ProjectB Utility Functions
 */

// DOM Helper functions
export function $(selector) {
  return document.querySelector(selector);
}

export function $$(selector) {
  return Array.from(document.querySelectorAll(selector));
}

// Event helpers
export function on(element, event, handler) {
  if (element) {
    element.addEventListener(event, handler);
    return () => element.removeEventListener(event, handler); // Return a cleanup function
  }
  return () => {}; // Return empty function if element doesn't exist
}

// Local storage helpers
export const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Error getting item from localStorage', e);
      return defaultValue;
    }
  },
  
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Error setting item in localStorage', e);
      return false;
    }
  },
  
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Error removing item from localStorage', e);
      return false;
    }
  }
};
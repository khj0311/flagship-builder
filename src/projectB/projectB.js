/**
 * Main entry file for ProjectB
 */

// Import styles
import './common/styles/style.scss';

// Import utility functions
import { $, $$ } from './common/scripts/utils.js';

// Import components
import { initSliders } from './components/slider/slider.js';
import { initCards } from './components/card/card.js';

// Initialize ProjectB
document.addEventListener('DOMContentLoaded', () => {
  console.log('ProjectB initialized');
  
  // Add projectB class to body for scoped styling
  document.body.classList.add('projectB');
  
  // Initialize components
  initSliders();
  initCards();
  
  // Register event listeners for card actions
  document.addEventListener('card:action', (event) => {
    const { type, text, cardElement } = event.detail;
    console.log(`Card action: ${type} - ${text}`);
    
    // Example of handling card events at the project level
    if (type === 'primary') {
      // Handle primary card action
    } else if (type === 'secondary') {
      // Handle secondary card action
    }
  });
});
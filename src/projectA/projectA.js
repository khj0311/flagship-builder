/**
 * Main entry file for ProjectA
 */

// Import styles
import './common/styles/style.scss';

// Import utility functions
import { selectElement, selectAllElements } from './common/scripts/utils.js';

// Import components
import { initComponentA } from './components/componentA/componentA.js';
import { initComponentB } from './components/componentB/componentB.js';

// Initialize ProjectA
document.addEventListener('DOMContentLoaded', () => {
  console.log('ProjectA initialized');
  
  // Add projectA class to body for scoped styling
  document.body.classList.add('projectA');
  
  // Initialize components
  initComponentA();
  initComponentB();
  
  // Additional initialization code for ProjectA
});
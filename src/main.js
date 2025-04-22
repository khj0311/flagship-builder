// Import SCSS styles
import './styles/style.scss';

// Your JavaScript code starts here
document.addEventListener('DOMContentLoaded', () => {
  console.log('Flagship Builder loaded!');
  
  // Initialize the application
  init();
});

// Main initialization function
function init() {
  // Add your initialization code here
  const app = document.getElementById('app');
  if (app) {
    app.classList.add('loaded');
  }
}

// Export any necessary functions or objects
export { init };
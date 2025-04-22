/**
 * Flagship Builder - Main Entry Point
 * 
 * This file serves as the main entry point for loading different projects
 * within the Flagship Builder framework.
 */

// Import project styles (will be dynamically loaded based on selected project)
import './styles/core.scss';

// Project imports
import './projectA/projectA.js';
import './projectB/projectB.js';

// Available projects
const PROJECTS = {
  'projectA': {
    name: 'Project A',
    description: 'A showcase of component-based architecture with vanilla JS'
  },
  'projectB': {
    name: 'Project B',
    description: 'A modern UI with responsive design and interactive components'
  }
};

// Main initialization function
function init() {
  console.log('Flagship Builder initialized');
  
  // Check if a project is specified in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const projectParam = urlParams.get('project');
  
  if (projectParam && PROJECTS[projectParam]) {
    // Load specified project
    loadProject(projectParam);
  } else {
    // Show project selector if no project specified
    showProjectSelector();
  }
}

// Load a specific project
function loadProject(projectId) {
  console.log(`Loading project: ${projectId}`);
  
  // Clear any existing project classes from body
  document.body.classList.remove('projectA', 'projectB');
  
  // Add the selected project class to body
  document.body.classList.add(projectId);
  
  // Update page title
  document.title = `${PROJECTS[projectId].name} | Flagship Builder`;
  
  // Show project UI (this is handled by the individual project files)
  // The project's JS file will initialize when imported above
}

// Show the project selector UI
function showProjectSelector() {
  console.log('Showing project selector');
  
  // Clear body classes and add selector class
  document.body.classList.remove('projectA', 'projectB');
  document.body.classList.add('project-selector');
  
  // Update page title
  document.title = 'Project Selector | Flagship Builder';
  
  // Create selector UI
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = `
      <div class="selector-container">
        <header>
          <h1>Flagship Builder</h1>
          <p>Select a project to view</p>
        </header>
        
        <div class="project-grid">
          ${Object.entries(PROJECTS).map(([id, project]) => `
            <div class="project-card" data-project="${id}">
              <h2>${project.name}</h2>
              <p>${project.description}</p>
              <button class="select-project-btn" data-project="${id}">View Project</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    // Add event listeners to project cards
    const projectButtons = document.querySelectorAll('.select-project-btn');
    projectButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const projectId = e.target.dataset.project;
        
        // Update URL with project parameter
        const url = new URL(window.location);
        url.searchParams.set('project', projectId);
        window.history.pushState({}, '', url);
        
        // Load the selected project
        loadProject(projectId);
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Handle browser back/forward navigation
window.addEventListener('popstate', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectParam = urlParams.get('project');
  
  if (projectParam && PROJECTS[projectParam]) {
    loadProject(projectParam);
  } else {
    showProjectSelector();
  }
});

// Export any necessary functions or objects
export { loadProject, showProjectSelector };
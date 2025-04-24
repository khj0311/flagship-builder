/**
 * ProjectA - ComponentA Script
 */
import { addEvent, selectElement } from '../../common/scripts/utils.js';

class ComponentA {
  constructor(element) {
    this.element = element;
    this.button = this.element.querySelector('.componentA-btn');
    this.initialize();
  }
  
  initialize() {
    if (this.button) {
      addEvent(this.button, 'click', this.handleClick.bind(this));
    }
  }
  
  handleClick(event) {
    console.log('ComponentA button clicked!');
    // Add your click handler functionality here
    this.element.classList.toggle('active');
  }
}

// Initialize all componentA instances on the page
export function initComponentA() {
  const components = document.querySelectorAll('.componentA');
  
  components.forEach(component => {
    new ComponentA(component);
  });
}

export default ComponentA;
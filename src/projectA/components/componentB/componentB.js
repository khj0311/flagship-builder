/**
 * ProjectA - ComponentB Script
 */
import { addEvent, selectElement } from '../../common/scripts/utils.js';

class ComponentB {
  constructor(element) {
    this.element = element;
    this.link = this.element.querySelector('.componentB-link');
    this.image = this.element.querySelector('img');
    this.initialize();
  }
  
  initialize() {
    if (this.link) {
      addEvent(this.link, 'click', this.handleLinkClick.bind(this));
    }
    
    if (this.image) {
      addEvent(this.image, 'click', this.handleImageClick.bind(this));
    }
  }
  
  handleLinkClick(event) {
    event.preventDefault();
    console.log('ComponentB link clicked!');
    // Add your link click handler functionality here
  }
  
  handleImageClick(event) {
    console.log('ComponentB image clicked!');
    // Add your image click handler functionality here
    // For example, open a lightbox or modal
  }
}

// Initialize all componentB instances on the page
export function initComponentB() {
  const components = document.querySelectorAll('.componentB');
  
  components.forEach(component => {
    new ComponentB(component);
  });
}

export default ComponentB;
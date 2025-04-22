/**
 * ProjectB - Card Component
 */
import { $$, on } from '../../common/scripts/utils.js';

class Card {
  constructor(element) {
    this.element = element;
    this.buttons = element.querySelectorAll('.card-button');
    this.image = element.querySelector('.card-image img');
    
    this.init();
  }
  
  init() {
    // Add click event to buttons
    this.buttons.forEach(button => {
      on(button, 'click', this.handleButtonClick.bind(this, button));
    });
    
    // Add image load error handling
    if (this.image) {
      this.image.addEventListener('error', this.handleImageError.bind(this));
    }
    
    // Add card hover effects
    on(this.element, 'mouseenter', this.handleMouseEnter.bind(this));
    on(this.element, 'mouseleave', this.handleMouseLeave.bind(this));
  }
  
  handleButtonClick(button, event) {
    const isPrimary = button.classList.contains('primary');
    const buttonText = button.textContent;
    
    console.log(`Card button clicked: ${buttonText} (${isPrimary ? 'Primary' : 'Secondary'})`);
    
    // Custom event that can be listened to by parent components
    const customEvent = new CustomEvent('card:action', {
      bubbles: true,
      detail: {
        type: isPrimary ? 'primary' : 'secondary',
        text: buttonText,
        cardElement: this.element
      }
    });
    
    this.element.dispatchEvent(customEvent);
  }
  
  handleImageError() {
    // Replace with fallback image if loading fails
    this.image.src = '/fallback-image.jpg';
    console.warn('Card image failed to load, using fallback');
  }
  
  handleMouseEnter() {
    this.element.classList.add('card-hover');
  }
  
  handleMouseLeave() {
    this.element.classList.remove('card-hover');
  }
}

// Initialize all card instances on the page
export function initCards() {
  const cards = $$('.card');
  
  cards.forEach(card => {
    new Card(card);
  });
}

export default Card;
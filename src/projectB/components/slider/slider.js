/**
 * ProjectB - Slider Component
 */
import { $, $$, on } from '../../common/scripts/utils.js';

class Slider {
  constructor(element) {
    this.element = element;
    this.track = element.querySelector('.slider-track');
    this.slides = element.querySelectorAll('.slider-slide');
    this.dots = element.querySelectorAll('.slider-dot');
    this.prevBtn = element.querySelector('.slider-prev');
    this.nextBtn = element.querySelector('.slider-next');
    
    this.currentSlide = 0;
    this.slideCount = this.slides.length;
    this.isAnimating = false;
    
    this.autoplayInterval = null;
    this.autoplayDelay = 5000; // 5 seconds
    
    this.init();
  }
  
  init() {
    // Add event listeners
    if (this.prevBtn) {
      on(this.prevBtn, 'click', () => this.prevSlide());
    }
    
    if (this.nextBtn) {
      on(this.nextBtn, 'click', () => this.nextSlide());
    }
    
    // Add dot click listeners
    this.dots.forEach((dot, index) => {
      on(dot, 'click', () => this.goToSlide(index));
    });
    
    // Add touch support
    this.addTouchSupport();
    
    // Start autoplay
    this.startAutoplay();
    
    // Pause autoplay on hover
    on(this.element, 'mouseenter', () => this.pauseAutoplay());
    on(this.element, 'mouseleave', () => this.startAutoplay());
  }
  
  goToSlide(index) {
    if (this.isAnimating || index === this.currentSlide) return;
    
    this.isAnimating = true;
    
    // Update current slide
    this.currentSlide = index;
    
    // Update slide track position
    this.track.style.transform = `translateX(-${index * (100 / this.slideCount)}%)`;
    
    // Update active dot
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    // Reset animation flag after transition completes
    setTimeout(() => {
      this.isAnimating = false;
    }, 500); // Match the transition duration in CSS
  }
  
  nextSlide() {
    const next = (this.currentSlide + 1) % this.slideCount;
    this.goToSlide(next);
  }
  
  prevSlide() {
    const prev = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
    this.goToSlide(prev);
  }
  
  startAutoplay() {
    this.pauseAutoplay(); // Clear any existing interval
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoplayDelay);
  }
  
  pauseAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
  
  addTouchSupport() {
    let startX, endX;
    const minSwipeDistance = 50;
    
    on(this.element, 'touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    
    on(this.element, 'touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      
      const distance = endX - startX;
      
      if (Math.abs(distance) >= minSwipeDistance) {
        if (distance > 0) {
          // Swipe right, go to previous slide
          this.prevSlide();
        } else {
          // Swipe left, go to next slide
          this.nextSlide();
        }
      }
    });
  }
}

// Initialize all slider instances on the page
export function initSliders() {
  const sliders = $$('.slider');
  
  sliders.forEach(slider => {
    new Slider(slider);
  });
}

export default Slider;
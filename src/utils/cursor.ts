export class CustomCursor {
  private cursorDot: HTMLElement | null = null;
  private cursorOutline: HTMLElement | null = null;
  private cursorWrapper: HTMLElement | null = null;
  private isActive = false;

  constructor() {
    this.init();
  }

  private init(): void {
    // Initialize cursor elements
    this.cursorWrapper = document.querySelector('.custom-cursor');
    this.cursorDot = document.querySelector('.cursor-dot');
    this.cursorOutline = document.querySelector('.cursor-outline');

    if (!this.cursorWrapper || !this.cursorDot || !this.cursorOutline) return;

    // Add active class to body
    document.body.classList.add('custom-cursor-active');

    // Bind event listeners
    this.bindEvents();
  }

  private bindEvents(): void {
    // Mouse move event
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));

    // Mouse enter/leave events
    document.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    document.addEventListener('mouseleave', this.handleMouseLeave.bind(this));

    // Add hover effects for interactive elements
    this.addInteractiveEffects();
  }

  private handleMouseMove(e: MouseEvent): void {
    if (!this.isActive) {
      this.isActive = true;
      this.cursorWrapper?.classList.add('active');
    }

    requestAnimationFrame(() => {
      this.updatePosition(e.clientX, e.clientY);
    });
  }

  private handleMouseEnter(): void {
    this.cursorWrapper?.classList.add('active');
  }

  private handleMouseLeave(): void {
    this.isActive = false;
    this.cursorWrapper?.classList.remove('active');
  }

  private updatePosition(x: number, y: number): void {
    const transform = `translate(${x}px, ${y}px)`;
    
    if (this.cursorDot) {
      this.cursorDot.style.transform = transform;
    }
    
    if (this.cursorOutline) {
      // Add slight delay to outline for smooth effect
      setTimeout(() => {
        if (this.cursorOutline) {
          this.cursorOutline.style.transform = transform;
        }
      }, 50);
    }
  }

  private addInteractiveEffects(): void {
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }
}
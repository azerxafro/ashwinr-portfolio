import { Particle } from './particle';

export class ParticleField {
  private particles: Particle[] = [];
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private animationFrame: number | null = null;
  private resizeObserver: ResizeObserver;
  private isDark: boolean;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.isDark = document.documentElement.classList.contains('theme-dark');
    
    // Initialize ResizeObserver
    this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
    this.resizeObserver.observe(canvas);
    
    // Watch for theme changes
    this.observeThemeChanges();
    
    this.init();
  }

  private init(): void {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  private observeThemeChanges(): void {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const newIsDark = document.documentElement.classList.contains('theme-dark');
          if (this.isDark !== newIsDark) {
            this.isDark = newIsDark;
            this.createParticles(); // Recreate particles with new theme colors
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  private createParticles(): void {
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent-regular')
      .trim();

    this.particles = [];
    const density = Math.min(this.canvas.width, this.canvas.height) * 0.15;
    const particleCount = Math.floor((this.canvas.width * this.canvas.height) / (density * density));
    
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      this.particles.push(new Particle(x, y, accent));
    }
  }

  private handleResize(entries: ResizeObserverEntry[]): void {
    const entry = entries[0];
    if (entry) {
      this.resize();
      this.createParticles();
    }
  }

  private resize(): void {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  private bindEvents(): void {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.addEventListener('mousemove', this.handleMouseMove.bind(this));
      heroSection.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }
  }

  private handleMouseMove(e: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = (e.clientX - rect.left) * (this.canvas.width / rect.width);
    this.mouseY = (e.clientY - rect.top) * (this.canvas.height / rect.height);
  }

  private handleMouseLeave(): void {
    this.mouseX = this.canvas.width / 2;
    this.mouseY = this.canvas.height / 2;
  }

  private animate(): void {
    // Clear canvas with theme-aware background
    this.ctx.fillStyle = this.isDark ? 'rgba(9, 11, 17, 0.1)' : 'rgba(255, 255, 255, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    this.particles.forEach(particle => {
      particle.update(this.mouseX, this.mouseY, this.ctx);
    });

    this.animationFrame = requestAnimationFrame(this.animate.bind(this));
  }

  public destroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.resizeObserver.disconnect();
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.removeEventListener('mousemove', this.handleMouseMove);
      heroSection.removeEventListener('mouseleave', this.handleMouseLeave);
    }
  }
}
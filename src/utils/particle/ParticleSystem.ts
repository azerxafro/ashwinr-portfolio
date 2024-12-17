import { Particle } from './Particle';
import { Vector2D, MouseState } from './types';

export class ParticleSystem {
  private particles: Particle[] = [];
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private mouse: MouseState;
  private lastTime: number = 0;
  private animationFrame: number | null = null;

  constructor(canvas: HTMLCanvasElement, particleColor: string) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: true })!;
    
    this.mouse = {
      position: { x: 0, y: 0 },
      radius: 100,
      strength: 5
    };

    this.init(particleColor);
  }

  private init(color: string): void {
    this.createParticles(color);
    this.bindEvents();
    this.animate();
  }

  private createParticles(color: string): void {
    const density = Math.min(this.canvas.width, this.canvas.height) * 0.15;
    const particleCount = Math.floor((this.canvas.width * this.canvas.height) / (density * density));

    this.particles = Array.from({ length: particleCount }, () => {
      return new Particle({
        position: {
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height
        },
        color
      });
    });
  }

  private bindEvents(): void {
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
  }

  private handleMouseMove(e: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.position = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  private handleMouseLeave(): void {
    this.mouse.position = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2
    };
  }

  private animate(timestamp: number = 0): void {
    const deltaTime = (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;

    // Clear canvas with trail effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw particles
    this.particles.forEach(particle => {
      particle.update(this.mouse, deltaTime);
      particle.draw(this.ctx);
    });

    this.animationFrame = requestAnimationFrame(this.animate.bind(this));
  }

  public resize(width: number, height: number): void {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.ctx.scale(dpr, dpr);
    this.createParticles(this.particles[0]?.color ?? '#ffffff');
  }

  public destroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
    this.canvas.removeEventListener('mouseleave', this.handleMouseLeave);
  }
}
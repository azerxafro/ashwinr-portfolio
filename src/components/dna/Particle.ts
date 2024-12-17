import { calculateDistance, mapRange, clamp } from '../../utils/backgroundEffects';

export class Particle {
  private x: number;
  private y: number;
  private baseX: number;
  private baseY: number;
  private size: number;
  private density: number;

  constructor(x: number, y: number, size: number = 3) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.size = size;
    this.density = (Math.random() * 30) + 1;
  }

  update(mouseX: number, mouseY: number, ctx: CanvasRenderingContext2D): void {
    const distance = calculateDistance(mouseX, mouseY, this.x, this.y);
    const forceDirectionX = mouseX - this.x;
    const forceDirectionY = mouseY - this.y;
    const force = clamp(120 - distance, 0, 120);
    
    const directionX = (forceDirectionX / distance) * force;
    const directionY = (forceDirectionY / distance) * force;

    if (distance < 120) {
      this.x -= directionX / this.density;
      this.y -= directionY / this.density;
    } else {
      if (this.x !== this.baseX) {
        const dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        const dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }

    this.draw(ctx);
  }

  private draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent-regular').trim();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}
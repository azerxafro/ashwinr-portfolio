import { ParticleConfig, Vector2D, OscillationConfig } from './types';
import { calculateRepulsion, lerp, createOscillation } from './physics';

export class Particle {
  private pos: Vector2D;
  private basePos: Vector2D;
  private velocity: Vector2D;
  private size: number;
  private color: string;
  private alpha: number;
  private oscillation: OscillationConfig;

  constructor(config: ParticleConfig) {
    this.pos = { ...config.position };
    this.basePos = { ...config.position };
    this.velocity = { x: 0, y: 0 };
    this.size = config.size ?? Math.random() * 2 + 1;
    this.color = config.color;
    this.alpha = config.alpha ?? Math.random() * 0.5 + 0.2;
    this.oscillation = {
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.01,
      radius: Math.random() * 20 + 10
    };
  }

  update(mousePos: Vector2D): void {
    // Apply repulsion force
    const repulsion = calculateRepulsion(this.pos, mousePos);
    this.velocity.x += repulsion.x;
    this.velocity.y += repulsion.y;

    // Update oscillation
    this.oscillation.angle += this.oscillation.speed;
    const oscillation = createOscillation(this.oscillation.radius);

    // Apply velocity and oscillation
    this.pos.x += this.velocity.x + oscillation.x * 0.01;
    this.pos.y += this.velocity.y + oscillation.y * 0.01;

    // Apply friction
    this.velocity.x *= 0.95;
    this.velocity.y *= 0.95;

    // Return to base position
    const returnSpeed = 0.05;
    this.pos.x = lerp(this.pos.x, this.basePos.x + oscillation.x, returnSpeed);
    this.pos.y = lerp(this.pos.y, this.basePos.y + oscillation.y, returnSpeed);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
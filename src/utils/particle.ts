export class Particle {
  private x: number;
  private y: number;
  private baseX: number;
  private baseY: number;
  private size: number;
  private color: string;
  private alpha: number;
  private vx: number = 0;
  private vy: number = 0;
  private angle: number;
  private angleSpeed: number;
  private oscillationRadius: number;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.size = Math.random() * 2 + 1;
    this.color = color;
    this.alpha = Math.random() * 0.5 + 0.2;
    this.angle = Math.random() * Math.PI * 2;
    this.angleSpeed = Math.random() * 0.02 + 0.01;
    this.oscillationRadius = Math.random() * 20 + 10;
  }

  update(mouseX: number, mouseY: number, ctx: CanvasRenderingContext2D): void {
    // Calculate distance to mouse
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxForce = 150; // Increased interaction radius

    if (distance < maxForce) {
      // Calculate repulsion force
      const force = (maxForce - distance) / maxForce;
      const angle = Math.atan2(dy, dx);
      
      // Apply stronger force
      this.vx -= Math.cos(angle) * force * 3;
      this.vy -= Math.sin(angle) * force * 3;
    }

    // Update angle for natural movement
    this.angle += this.angleSpeed;
    const oscillationX = Math.cos(this.angle) * this.oscillationRadius;
    const oscillationY = Math.sin(this.angle) * this.oscillationRadius;

    // Apply velocity and oscillation
    this.x += this.vx + oscillationX * 0.01;
    this.y += this.vy + oscillationY * 0.01;

    // Apply friction
    this.vx *= 0.95;
    this.vy *= 0.95;

    // Return to base position with smooth interpolation
    const returnSpeed = 0.05;
    this.x += (this.baseX + oscillationX - this.x) * returnSpeed;
    this.y += (this.baseY + oscillationY - this.y) * returnSpeed;

    this.draw(ctx);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
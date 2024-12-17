import { Vector2D } from './types';

export function calculateDistance(p1: Vector2D, p2: Vector2D): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function calculateRepulsion(
  position: Vector2D,
  mousePos: Vector2D,
  maxForce: number = 150,
  strength: number = 3
): Vector2D {
  const dx = mousePos.x - position.x;
  const dy = mousePos.y - position.y;
  const distance = calculateDistance(position, mousePos);

  if (distance < maxForce) {
    const force = (maxForce - distance) / maxForce;
    const angle = Math.atan2(dy, dx);
    return {
      x: -Math.cos(angle) * force * strength,
      y: -Math.sin(angle) * force * strength
    };
  }

  return { x: 0, y: 0 };
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function createOscillation(radius: number): { x: number; y: number } {
  const angle = Math.random() * Math.PI * 2;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius
  };
}
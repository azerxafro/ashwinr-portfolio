// Utility functions for background effects
export function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function mapRange(value: number, low1: number, high1: number, low2: number, high2: number): number {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
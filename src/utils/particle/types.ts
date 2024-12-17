export interface Vector2D {
  x: number;
  y: number;
}

export interface ParticleConfig {
  position: Vector2D;
  color: string;
  size?: number;
  alpha?: number;
}

export interface MouseState {
  position: Vector2D;
  radius: number;
  strength: number;
}

export interface OscillationConfig {
  angle: number;
  speed: number;
  radius: number;
}
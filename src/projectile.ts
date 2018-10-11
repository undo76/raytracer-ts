import { Vector, Point, add, normalize, Color, smul } from './types';
import Canvas from './canvas';

interface World {
  gravity: Vector;
  wind: Vector;
}

interface Projectile {
  velocity: Vector;
  position: Point;
}

function tick(w: World, p: Projectile): Projectile {
  return {
    position: add(p.position, p.velocity),
    velocity: add(add(p.velocity, w.gravity), w.wind),
  };
}

const w = {
  wind: Vector(-0.01, 0, 0),
  gravity: Vector(0, -0.1, 0),
};

let p = {
  position: Point(0, 1, 0),
  velocity: smul(normalize(Vector(1, 1, 0)), 7),
};

const canvas = new Canvas(500, 500);
while (p.position[1] >= 0) {
  p = tick(w, p);
  canvas.setPixel(Math.floor(p.position[0]), 500 - Math.floor(p.position[1]), Color(1, 0, 0));
  // console.log(p.position);
}

console.log(canvas.toPpmString(10));

export type Tuple = number[];
export const Tuple = (x: number, y: number, z: number, w: number): Tuple => [
  x,
  y,
  z,
  w,
];

export type Vector = Tuple;
export const Vector = (x: number, y: number, z: number): Tuple => [x, y, z, 0];

export type Point = Tuple;
export const Point = (x: number, y: number, z: number): Tuple => [x, y, z, 1];

export type Color = [number, number, number];
export const Color = (r: number, g: number, b: number): Color => [r, g, b];

export const mapTuple = (f: (value: number) => number) => (t: Tuple) =>
  t.map(f) as Tuple;

export const zipTupleWith = (f: (a: number, b: number) => number) => (
  t1: Tuple,
  t2: Tuple
) => t1.map((x, i) => f(x, t2[i])) as Tuple;

export const add = zipTupleWith((x, y) => x + y);
export const sub = zipTupleWith((x, y) => x - y);
export const mul = zipTupleWith((x, y) => x * y); // Hadamard product
export const div = zipTupleWith((x, y) => x / y);
export const neg = mapTuple(x => -x);

export const smul = (t: Tuple, s: number) => mapTuple(x => x * s)(t);
export const sdiv = (t: Tuple, s: number) => mapTuple(x => x / s)(t);

export const magnitude = (t: Tuple): number =>
  Math.sqrt(t.reduce((acc, x) => acc + x * x, 0));

export const normalize = (t: Tuple): Tuple => sdiv(t, magnitude(t));

export const areClose = (
  t1: Tuple,
  t2: Tuple,
  epsilon: number = 1e-5
): Boolean => magnitude(sub(t1, t2)) < epsilon;

export const dot = (t1: Tuple, t2: Tuple): number =>
  mul(t1, t2).reduce((acc, x) => acc + x, 0);

export const cross = (t1: Vector, t2: Vector): Vector =>
  Vector(
    t1[1] * t2[2] - t1[2] * t2[1],
    t1[2] * t2[0] - t1[0] * t2[2],
    t1[0] * t2[1] - t1[1] * t2[0]
  );

export const clamp = (min: number, max: number) => {
  return (v: number) => Math.max(Math.min(v, max), min);
};

export const clampTuple = (min: number, max: number) =>
  mapTuple(clamp(min, max));

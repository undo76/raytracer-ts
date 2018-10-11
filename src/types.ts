export type tuple = number[];
export const tuple = (x: number, y: number, z: number, w: number): tuple => [
  x,
  y,
  z,
  w,
];

export type vector = tuple;
export const vector = (x: number, y: number, z: number): tuple => [x, y, z, 0];

export type point = tuple;
export const point = (x: number, y: number, z: number): tuple => [x, y, z, 1];

export type color = [number, number, number];
export const color = (r: number, g: number, b: number): color => [r, g, b];

export const mapTuple = (f: (value: number) => number) => (t: tuple) =>
  t.map(f) as tuple;

export const zipTupleWith = (f: (a: number, b: number) => number) => (
  t1: tuple,
  t2: tuple
) => t1.map((x, i) => f(x, t2[i])) as tuple;

export const add = zipTupleWith((x, y) => x + y);
export const sub = zipTupleWith((x, y) => x - y);
export const mul = zipTupleWith((x, y) => x * y); // Hadamard product
export const div = zipTupleWith((x, y) => x / y);
export const neg = mapTuple(x => -x);

export const smul = (t: tuple, s: number) => mapTuple(x => x * s)(t);
export const sdiv = (t: tuple, s: number) => mapTuple(x => x / s)(t);

export const magnitude = (t: tuple): number =>
  Math.sqrt(t.reduce((acc, x) => acc + x * x, 0));

export const normalize = (t: tuple): tuple => sdiv(t, magnitude(t));

export const areClose = (
  t1: tuple,
  t2: tuple,
  epsilon: number = 1e-5
): Boolean => magnitude(sub(t1, t2)) < epsilon;

export const dot = (t1: tuple, t2: tuple): number =>
  mul(t1, t2).reduce((acc, x) => acc + x, 0);

export const cross = (t1: vector, t2: vector): vector =>
  vector(
    t1[1] * t2[2] - t1[2] * t2[1],
    t1[2] * t2[0] - t1[0] * t2[2],
    t1[0] * t2[1] - t1[1] * t2[0]
  );

export const clamp = (min: number, max: number) => {
  return (v: number) => Math.max(Math.min(v, max), min);
};

export const clampTuple = (min: number, max: number) =>
  mapTuple(clamp(min, max));
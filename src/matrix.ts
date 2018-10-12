import { Tuple } from './types';

export type Matrix = Float64Array;

// prettier-ignore
export const eye: Matrix = Float64Array.from([
  1,0,0,0,
  0,1,0,0,
  0,0,1,0,
  0,0,0,1,
]);

// prettier-ignore
export const zero: Matrix = Float64Array.from([
  0,0,0,0,
  0,0,0,0,
  0,0,0,0,
  0,0,0,0,
]);

// prettier-ignore
export const translate = (x:number, y:number, z:number): Matrix => Float64Array.from([
  1,0,0,x,
  0,1,0,y,
  0,0,1,z,
  0,0,0,1,
]);

// prettier-ignore
export const scale = (x:number, y:number, z:number): Matrix => Float64Array.from([
  x,0,0,0,
  0,y,0,0,
  0,0,z,0,
  0,0,0,1,
]);

export const transpose = (a: Matrix): Matrix => {
  const ret = new Float64Array(4 * 4);
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      ret[row * 4 + col] = a[col * 4 + row];
    }
  }
  return ret;
};

export const matrixMul = (a: Matrix, b: Matrix): Matrix => {
  const ret = new Float64Array(4 * 4);
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      ret[row * 4 + col] =
        a[row * 4 + 0] * b[0 * 4 + col] +
        a[row * 4 + 1] * b[1 * 4 + col] +
        a[row * 4 + 2] * b[2 * 4 + col] +
        a[row * 4 + 3] * b[3 * 4 + col];
    }
  }
  return ret;
};

export const tupleMul = (a: Matrix, b: Tuple): Tuple => {
  const ret = new Float64Array(4);
  for (let row = 0; row < 4; row++) {
    ret[row] =
      a[row * 4 + 0] * b[0] +
      a[row * 4 + 1] * b[1] +
      a[row * 4 + 2] * b[2] +
      a[row * 4 + 3] * b[3];
  }
  return ret;
};

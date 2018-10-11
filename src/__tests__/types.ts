import {
  Vector,
  Point,
  mapTuple,
  add,
  sub,
  mul,
  div,
  neg,
  smul,
  sdiv,
  magnitude,
  normalize,
  areClose,
  dot,
  cross,
  Tuple,
} from '../types';

describe('Vector creation', () => {
  test('Returns a Tuple with last component 0', () => {
    const v = Vector(1, 2, 3);
    expect(v).toEqual([1, 2, 3, 0]);
  });
});

describe('Point creation', () => {
  test('Returns a Tuple with last component 1', () => {
    const v = Point(1, 2, 3);
    expect(v).toEqual([1, 2, 3, 1]);
  });
});

describe('Map Tuple', () => {
  const a = Tuple(1, 2, 3, 4);
  test('Identity', () => {
    const identity = (x: number) => x;
    expect(mapTuple(identity)(a)).toEqual(a);
  });


  test('Double', () => {
    const double = (x: number) => 2 * x;
    expect(mapTuple(double)(a)).toEqual([2, 4, 6, 8]);
  });
});

describe('Tuple operations', () => {
  const a = [10, 20, 0, 0] as Tuple,
    b = [1, 2, 0, 0] as Tuple;

  test('add', () => expect(add(a, b)).toEqual([11, 22, 0, 0]));
  test('sub', () => expect(sub(a, b)).toEqual([9, 18, 0, 0]));
  test('mul', () => expect(mul(a, b)).toEqual([10, 40, 0, 0]));
  test('div', () => expect(div(a, b)).toEqual([10, 10, NaN, NaN]));
  test('neg', () => expect(neg(a)).toEqual([-10, -20, -0, -0]));
  test('smul', () => expect(smul(a, 2)).toEqual([20, 40, 0, 0]));
  test('neg', () => expect(sdiv(a, 2)).toEqual([5, 10, 0, 0]));
  test('magnitude', () => expect(magnitude([0, 0, 0, 0])).toEqual(0));
  test('magnitude', () => expect(magnitude(Vector(3, 4, 0))).toEqual(5));
  test('normalize', () =>
    expect(
      areClose(normalize(Vector(1, 2, 3)), Vector(0.26726, 0.53452, 0.80178))
    ).toBe(true));
  test('normalize', () =>
    expect(magnitude(normalize(Vector(1, 2, 3)))).toBeCloseTo(1));
  test('dot', () => expect(dot(Vector(1, 2, 3), Vector(2, 3, 4))).toEqual(20));
  test('cross', () =>
    expect(cross(Vector(1, 2, 3), Vector(2, 3, 4))).toEqual(Vector(-1, 2, -1)));
  test('cross', () =>
    expect(cross(Vector(2, 3, 4), Vector(1, 2, 3))).toEqual(Vector(1, -2, 1)));
});

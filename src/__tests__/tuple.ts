import {
  vector,
  point,
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
} from '../tuple';

describe('Vector creation', () => {
  test('Returns a tuple with last component 0', () => {
    const v = vector(1, 2, 3);
    expect(v).toEqual([1, 2, 3, 0]);
  });
});

describe('Point creation', () => {
  test('Returns a tuple with last component 1', () => {
    const v = point(1, 2, 3);
    expect(v).toEqual([1, 2, 3, 1]);
  });
});

describe('Map tuple', () => {
  const a = [1, 2, 3, 4];
  test('Identity', () => {
    const identity = (x: number) => x;
    expect(mapTuple(identity)(a)).toEqual(a);
  });

  test('Double', () => {
    const double = (x: number) => 2 * x;
    expect(mapTuple(double)(a)).toEqual([2, 4, 6, 8]);
  });

  test('Double/empty', () => {
    const double = (x: number) => 2 * x;
    expect(mapTuple(double)([])).toEqual([]);
  });
});

describe('Tuple operations', () => {
  const a = [10, 20],
    b = [1, 2];

  test('add', () => expect(add(a, b)).toEqual([11, 22]));
  test('sub', () => expect(sub(a, b)).toEqual([9, 18]));
  test('mul', () => expect(mul(a, b)).toEqual([10, 40]));
  test('div', () => expect(div(a, b)).toEqual([10, 10]));
  test('neg', () => expect(neg(a)).toEqual([-10, -20]));
  test('smul', () => expect(smul(a, 2)).toEqual([20, 40]));
  test('neg', () => expect(sdiv(a, 2)).toEqual([5, 10]));
  test('magnitude', () => expect(magnitude([0, 0, 0])).toEqual(0));
  test('magnitude', () => expect(magnitude(vector(3, 4, 0))).toEqual(5));
  test('normalize', () =>
    expect(
      areClose(normalize(vector(1, 2, 3)), vector(0.26726, 0.53452, 0.80178))
    ).toBe(true));
  test('normalize', () =>
    expect(magnitude(normalize(vector(1, 2, 3)))).toBeCloseTo(1));
  test('dot', () => expect(dot(vector(1, 2, 3), vector(2, 3, 4))).toEqual(20));
  test('cross', () => expect(cross(vector(1, 2, 3), vector(2, 3, 4))).toEqual(vector(-1, 2, -1)));
  test('cross', () => expect(cross(vector(2, 3, 4), vector(1, 2, 3))).toEqual(vector(1, -2, 1)));
});

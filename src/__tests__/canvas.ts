import { Color } from '../types';

import Canvas from '../canvas';

describe('Canvas', () => {
  let myCanvas: Canvas;
  const black = Color(0, 0, 0);
  const blue = Color(0, 0, 1);
  const red = Color(1, 0, 0);
  const green = Color(0, 1, 0);
  const white = Color(1, 1, 1);

  beforeEach(() => {
    myCanvas = new Canvas(10, 20);
  });

  test('Dimensions are set', () => {
    expect(myCanvas.width).toEqual(10);
    expect(myCanvas.height).toEqual(20);
  });

  test('Every pixel is black by default', () => {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 20; y++) {
        expect(myCanvas.pixelAt(x, y)).toEqual(black);
      }
    }
  });

  test.each`
    x    | y    | c
    ${0} | ${0} | ${green}
    ${1} | ${2} | ${red}
    ${2} | ${1} | ${black}
    ${2} | ${1} | ${blue}
    ${2} | ${2} | ${white}
  `('Setting pixel ($x, $y) to Color $c', ({ x, y, c }) => {
    myCanvas.setPixel(x, y, c);
    expect(myCanvas.pixelAt(x, y)).toEqual(c);
  });

  test('Setting a Color out of bounds', () => {
    myCanvas.setPixel(10, 1, blue);
    myCanvas.setPixel(1, 20, red);
    myCanvas.setPixel(-1, 20, green);
    myCanvas.setPixel(1, -1, white);
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 20; y++) {
        expect(myCanvas.pixelAt(x, y)).toEqual(black);
      }
    }
  });

  test('PPM conversion', () => {
    const red = Color(2, 0.1, -1);
    const canvas = new Canvas(4, 3, red);
    const ppm = canvas.toPpmString(9);
    expect(ppm).toMatchSnapshot();
  });
});

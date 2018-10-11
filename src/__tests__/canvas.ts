import { color } from '../types';

import Canvas from '../canvas';

describe('Canvas', () => {
  let myCanvas: Canvas;
  const black = color(0, 0, 0);
  const blue = color(0, 0, 1);

  beforeEach(() => {
    myCanvas = new Canvas(10, 20);
  });

  test('Dimensions are set', () => {
    expect(myCanvas.width).toEqual(10);
    expect(myCanvas.height).toEqual(20);
  });

  test('Every pixel is black by default', () => {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        expect(myCanvas.pixelAt(x, y)).toEqual(black);
      }
    }
  });

  test('Setting a color', () => {
    myCanvas.setPixel(3, 5, blue);
    expect(myCanvas.pixelAt(0, 0)).toEqual(black);
    expect(myCanvas.pixelAt(3, 5)).toEqual(blue);
  });

  test('Setting a color out of bounds', () => {
    myCanvas.setPixel(10, 20, blue);
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        expect(myCanvas.pixelAt(x, y)).toEqual(black);
      }
    }
  });

  test('PPM conversion', () => {
    const red = color(2, 0.1, -1);
    const canvas = new Canvas(4, 3, red);
    const ppm = canvas.toPpmString(9);
    expect(ppm).toMatchSnapshot();
  });
});

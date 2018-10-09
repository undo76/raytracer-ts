import {
  color,
} from '../tuple';

import Canvas from '../canvas';

describe('Canvas', () => {
  const myCanvas = new Canvas(10, 20);
  const black = color(0, 0, 0);
  const blue = color(0, 0, 1);

  test('Dimensions are set', () => {
    expect(myCanvas.width).toEqual(10);
    expect(myCanvas.height).toEqual(20);
  });

  test('Every pixel is black by default', () => {
    expect(myCanvas.pixelAt(0, 0)).toEqual(black);
    expect(myCanvas.pixelAt(5, 5)).toEqual(black);
  });

  test('Setting a color', () => {    
    myCanvas.setPixel(3, 5, blue);
    expect(myCanvas.pixelAt(0, 0)).toEqual(black);
    expect(myCanvas.pixelAt(3, 5)).toEqual(blue);
  });
});

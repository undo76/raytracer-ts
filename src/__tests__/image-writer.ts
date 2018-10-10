import Canvas from '../canvas';
import { color } from '../tuple';

describe('Image writer', () => {  
  test('canvas_to_ppm', () => {
    const red = color(2, 0.1, -1);
    const canvas = new Canvas(4, 3, red);
    const ppm = canvas.toPpmString();
    expect(ppm).toMatchSnapshot();
  });
});

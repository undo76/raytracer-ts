import { color } from './tuple';

export default class Canvas {
  public readonly width: number;
  public readonly height: number;
  private readonly pixels: color[];

  constructor(width: number, height: number, fillColor = color(0, 0, 0)) {
    this.width = width;
    this.height = height;
    this.pixels = new Array<color>(width * height);
    this.fill(fillColor);
  }

  public fill(c: color) {
    for (let i = 0; i < this.width * this.height; i++) {
      this.pixels[i] = c;
    }
  }

  public setPixel(x: number, y: number, c: color) {
    this.pixels[y * this.width + x] = c;
  }

  public pixelAt(x: number, y: number) {
    return this.pixels[y * this.width + x];
  }
}

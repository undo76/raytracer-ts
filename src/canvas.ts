import { Color, clamp } from './types';

export default class Canvas {
  public readonly width: number;
  public readonly height: number;
  private readonly pixels: Float64Array;

  constructor(width: number, height: number, fillColor = Color(0, 0, 0)) {
    this.width = width;
    this.height = height;
    this.pixels = new Float64Array(width * height * 3);
    this.fill(fillColor);
  }

  public fill(c: Color): void {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.setPixel(j, i, c);
      }
    }
  }

  public setPixel(x: number, y: number, c: Color): void {
    if (x < this.width && y < this.height) {
      const start = 3 * (y * this.width + x);
      for (let i = 0; i < 3; i++) {
        this.pixels[start + i] = c[i];
      }
    }
  }

  public pixelAt(x: number, y: number): Color {
    const start = 3 * (y * this.width + x);
    return this.pixels.slice(start, start + 3) as Color;
  }

  public toPpmString(chunkSize = 60): string {
    return this.ppmHeader() + this.ppmContents(chunkSize) + '\n';
  }

  private ppmHeader(): string {
    return `P3\n${this.width} ${this.height}\n255\n`;
  }

  private ppmContents(chunkSize: number): string {
    const contents: string[] = [];
    const clampChannel = (c: number) => clamp(0, 255)(Math.floor(c * 255));

    for (let i = 0, l = this.pixels.length; i < l; i += chunkSize) {
      const chunk = this.pixels
        .slice(i, i + chunkSize)
        .map(clampChannel)
        .join(' ');
      contents.push(chunk);
    }
    return contents.join('\n');
  }
}

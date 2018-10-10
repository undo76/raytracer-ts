import { color, clamp, clampTuple } from './tuple';

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
    for (let i = 0; i < this.pixels.length; i++) {
      this.pixels[i] = c;
    }
  }

  public setPixel(x: number, y: number, c: color) {
    this.pixels[y * this.width + x] = c;
  }

  public pixelAt(x: number, y: number): color {
    return this.pixels[y * this.width + x];
  }

  public toPpmString(chunkSize = 10): string {
    return this.ppmHeader() + this.ppmContents(chunkSize) + '\n';
  }

  private ppmHeader(): string {
    return `P3\n${this.width} ${this.height}\n255\n`;
  }

  private ppmContents(chunkSize: number): string {
    const contents: string[] = [];
    const clampPixel = clampTuple(0, 1.0);

    for (let i = 0, l = this.pixels.length; i < l; i += chunkSize) {
      const chunk = this.pixels
        .slice(i, i + chunkSize)
        .map(c =>
          clampPixel(c)
            .map(v => Math.floor(v * 255))
            .join(' ')
        )
        .join(' ');
      contents.push(chunk);
    }
    return contents.join('\n');
  }
}

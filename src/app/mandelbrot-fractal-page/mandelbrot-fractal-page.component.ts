import { Component, OnInit } from '@angular/core';

interface Complex {
    x: number;
    y: number;
}

@Component({
  selector: 'app-mandelbrot-fractal-page',
  templateUrl: './mandelbrot-fractal-page.component.html',
  styleUrls: ['./mandelbrot-fractal-page.component.sass']
})
export class MandelbrotFractalPageComponent implements OnInit {
  private canvas!: HTMLCanvasElement;
  private canvasJulia!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private ctxJulia!: CanvasRenderingContext2D;
  private colorSchem!: string;
  private MAX_ITERATION: number = 80;
  private complexX!: number;
  private complexY!: number;
  private WIDTH: number = 800;
  private HEIGHT: number = 600;

  ngOnInit(): void {
    this.canvas = document.querySelector("#Mandelbrot-set-canvas") as HTMLCanvasElement;
    this.canvasJulia = document.querySelector("#Julia-set-canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.ctxJulia = this.canvasJulia.getContext('2d') as CanvasRenderingContext2D;
    const colorSchemInput = document.querySelector("#color-scheme") as HTMLInputElement;
    this.colorSchem = colorSchemInput.value;
    this.ctx.canvas.width = this.WIDTH;
    this.ctx.canvas.height = this.HEIGHT;
    this.ctxJulia.canvas.width = 600;
    this.ctxJulia.canvas.height = 450;
    //this.ctxJulia.canvas.width = 

    this.canvas.addEventListener('click', (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Calculate complex number from click coordinates for Julia set
      const cX = this.complexX + (x / this.WIDTH) * (1 - this.complexX);
      const cY = this.complexY + (y / this.HEIGHT) * (1 - this.complexY);

      // Draw the Julia set based on the clicked coordinates
      this.drawJuliaSet(cX, cY);
    });

  }
  
  private mandelbrot(c: Complex): [number, boolean] {
    let z: Complex = { x: 0, y: 0 };
    let n: number = 0;
    let p: Complex, d: number;

    do {
        p = {
            x: Math.pow(z.x, 2) - Math.pow(z.y, 2),
            y: 2 * z.x * z.y
        };

        z = {
            x: p.x + c.x,
            y: p.y + c.y
        };

        d = Math.sqrt(Math.pow(z.x, 2) + Math.pow(z.y, 2));
        n += 1;
    } while (d <= 2 && n < this.MAX_ITERATION);

    return [n, d <= 2];
  }

  private drawMandelbrotSet(colorSchem: string): void {
    const REAL_SET: { start: number; end: number } = { start: this.complexX, end: 1 };
    const IMAGINARY_SET: { start: number; end: number } = { start: this.complexY, end: 1 }; 
    const colors: string[] = new Array(16).fill(0).map((_, i) => i === 0 ? `#${colorSchem}` : `#${((1 << 24) * Math.random() | 0).toString(16)}`);
    for (let i = 0; i < this.WIDTH; i++) {
      for (let j = 0; j < this.HEIGHT; j++) {
        const complex: Complex = {
          x: REAL_SET.start + (i / this.WIDTH) * (REAL_SET.end - REAL_SET.start),
          y: IMAGINARY_SET.start + (j / this.HEIGHT) * (IMAGINARY_SET.end - IMAGINARY_SET.start)
        };
    
        const [m, isMandelbrotSet] = this.mandelbrot(complex);
        this.ctx.fillStyle = colors[isMandelbrotSet ? 0 : (m % (colors.length - 1)) + 1];
        this.ctx.fillRect(i, j, 1, 1);
      }
    }
  }

  onDrawClick() {
    const XInput = document.querySelector("#constant-number-x") as HTMLInputElement;
    const YInput = document.querySelector("#constant-number-y") as HTMLInputElement;
    this.complexX = parseInt(XInput.value);
    this.complexY = parseInt(YInput.value);

    const colorSchemInput = document.querySelector("#color-scheme") as HTMLInputElement;
    this.colorSchem = colorSchemInput.value;
    this.drawMandelbrotSet(this.colorSchem);
  }

  private drawJuliaSet(cX: number, cY: number) {
    const REAL_SET: { start: number; end: number } = { start: -1.5, end: 1.5 };
    const IMAGINARY_SET: { start: number; end: number } = { start: -0.5, end: 1.0 };
    const colors: string[] = this.createColorGradient('#ff0000', '#0000ff', this.MAX_ITERATION);
  
    for (let i = 0; i < this.WIDTH; i++) {
      for (let j = 0; j < this.HEIGHT; j++) {
        const complex: Complex = {
          x: REAL_SET.start + (i / this.WIDTH) * (REAL_SET.end - REAL_SET.start),
          y: IMAGINARY_SET.start + (j / this.HEIGHT) * (IMAGINARY_SET.end - IMAGINARY_SET.start)
        };
  
        let z: Complex = {
          x: complex.x,
          y: complex.y
        };
        let n: number = 0;
  
        let d = Math.sqrt(Math.pow(z.x, 2) + Math.pow(z.y, 2));
  
        do {
          const p = {
            x: Math.pow(z.x, 2) - Math.pow(z.y, 2),
            y: 2 * z.x * z.y
          };
  
          z = {
            x: p.x + cX,
            y: p.y + cY
          };
  
          d = Math.sqrt(Math.pow(z.x, 2) + Math.pow(z.y, 2));
          n += 1;
          if (n === this.MAX_ITERATION) break;
        } while (d <= 2);
  
        this.ctxJulia.fillStyle = colors[n % (colors.length - 1)];
        this.ctxJulia.fillRect(i, j, 1, 1);
      }
    }
  }
  
  // Function to generate a color gradient between two hex colors
  private createColorGradient(startColor: string, endColor: string, steps: number): string[] {
    const start = this.hexToRgb(startColor);
    const end = this.hexToRgb(endColor);
  
    const gradientColors = [];
  
    for (let i = 0; i < steps; i++) {
      const r = Math.round(start.r + ((end.r - start.r) * i) / steps);
      const g = Math.round(start.g + ((end.g - start.g) * i) / steps);
      const b = Math.round(start.b + ((end.b - start.b) * i) / steps);
  
      const color = this.rgbToHex(r, g, b);
      gradientColors.push(`#${color}`);
    }
  
    return gradientColors;
  }
  
  
  
  // Function to convert hex color to RGB
  private hexToRgb(hex: string) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 14) & 255;
    const g = (bigint >> 16) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }
  
  // Function to convert RGB to hex color
  private rgbToHex(r: number, g: number, b: number) {
    return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
  }
  
}
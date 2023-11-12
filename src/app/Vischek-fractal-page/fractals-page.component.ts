import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-fractals-page',
  templateUrl: './fractals-page.component.html',
  styleUrls: ['./fractals-page.component.sass']
})
export class VischekFractalsPageComponent implements OnInit {
  private canvas! : HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private iterNum! : number;

  ngOnInit() {
    console.log("onInit");
    const inputElement = document.querySelector("#iteration-number") as HTMLInputElement;
    var iterNum = parseInt(inputElement.value);
    this.canvas = document.querySelector("#fractal-canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.fillStyle = 'white';
    this.canvas.width = 600;
    this.canvas.height = 600;
  }
  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d')!;
      this.ctx.fillStyle = 'white';
    }
  }

  drawFractal(iterations: number) {
    console.log("drawFractal");
    if (this.ctx) {
      console.log("draw fractal method");
      this.clearCanvas();
      this.ctx.fillStyle = 'white';
      
      const canvasSize = this.canvas.width;
      this.clearCanvas();
      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;
      this.drawVicsekFractal(0, 0, this.canvas.width, iterations);
    }
  }

  drawVicsekFractal( x: number, y: number, size: number, iterations: number) {
    console.log("drawVischekFractal iteration:" + iterations);
    if(iterations === 0) {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(x, y, size, size);
      return;
    } else {
      const newSize = size/3;
      for(let i = 0; i < 3; ++i) {
        for(let j = 0; j < 3; ++j) {
          if((i + j)%2 !== 0 || (i==1 && j==1)) {
            this.drawVicsekFractal(x+i*newSize, y + j*newSize, newSize, iterations-1);
          }
        }
      }
    }
  }
  clearCanvas() {
    console.log("clear canvas");
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  onDrawClick() {
    console.log('Button clicked!');
    const iterationInput = document.getElementById('iteration-number') as HTMLInputElement;
    const iterations = parseInt(iterationInput.value, 10);
    this.drawFractal(iterations);
  }

  onSaveClick() {
    const imgData = this.canvas.toDataURL("image/png");
    const a = document.createElement('a');
    a.href = imgData;
    a.download = 'vischek_fractal.png';
    if(window.confirm("Do you want to download this image?")) {
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
}

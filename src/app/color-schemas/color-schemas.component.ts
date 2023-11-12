import { Component, ElementRef, ViewChild } from '@angular/core';
import * as chroma from "chroma-js";

@Component({
  selector: 'app-color-schemas',
  templateUrl: './color-schemas.component.html',
  styleUrls: ['./color-schemas.component.sass']
})

export class ColorSchemasComponent {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef<HTMLInputElement>;

  originalImage: HTMLImageElement | undefined;

  rgbArray: number[] = []
  hsvArray: number[] = []
  cmykArray: number[] = []
  saturation: number = 50;
  value: number = 50;

  openFileExplorer() {
    this.fileInput.nativeElement.click();
  }

  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (files && files.length > 0) {
      const selectedFile = files[0];
      this.loadImageAndDraw(selectedFile);
    }
  }

  loadImageAndDraw(file: File) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => 
      {
        this.originalImage = img;
        this.drawOnCanvas(img);
      }
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  // Load the original image when the "Load Original" button is clicked
  loadOriginalImage() {
    if (this.originalImage) {
      this.drawOnCanvas(this.originalImage);
    }
  }

  drawOnCanvas(image: HTMLImageElement) {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx?.drawImage(image, 0, 0);
  }

  saveImage() {
    const canvas = this.canvas.nativeElement;
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas_image.png';
    link.click();
  }

  handleCanvasClick(event: MouseEvent) {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    const x = event.offsetX;
    const y = event.offsetY;

    const pixel = ctx?.getImageData(x, y, 1, 1).data;
    if(pixel == null || pixel == undefined)
      return;
    this.rgbArray = Array.from(pixel) as number[];
    this.hsvArray = this.rgbToHsv(this.rgbArray[0], this.rgbArray[1], this.rgbArray[2])
    this.cmykArray = this.rgbToCmyk(this.rgbArray[0], this.rgbArray[1], this.rgbArray[2])
  }

  onSaturationChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.saturation = parseInt(target.value, 10);
    const ctx = this.canvas.nativeElement.getContext('2d');

    const imageData = ctx?.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    if(imageData == undefined)
    {
      return;
    }
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      
      const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
      const hsvValues = chroma(r, g, b).hsv();

      if (hsvValues[0] > 210 && hsvValues[0] < 270) {
        hsvValues[1] = this.saturation/100;

        const rgbValues = chroma(hsvValues[0], hsvValues[1], hsvValues[2], 'hsv').rgb();

        data[i] = rgbValues[0]; 
        data[i+1] = rgbValues[1]; 
        data[i+2] = rgbValues[2]; 
      }
    }

    ctx?.putImageData(imageData, 0, 0);
  }

  onValueChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = parseInt(target.value, 10);
    const ctx = this.canvas.nativeElement.getContext('2d');

    const imageData = ctx?.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    if(imageData == undefined)
    {
      return;
    }
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      
      const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
      const hsvValues = chroma(r, g, b).hsv();

      if (hsvValues[0] > 210 && hsvValues[0] < 270) {
        hsvValues[2] = this.value/100;

        const rgbValues = chroma(hsvValues[0], hsvValues[1], hsvValues[2], 'hsv').rgb();

        data[i] = rgbValues[0]; 
        data[i+1] = rgbValues[1]; 
        data[i+2] = rgbValues[2]; 
      }
    }

    ctx?.putImageData(imageData, 0, 0);
  }





  hsvToRgb(h: number, s: number, v: number): number[] {
    if (h === undefined || s === undefined || v === undefined) {
      return [0, 0, 0];
    }
  
    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
  
    switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
    }
  
    return [
      Math.round((r !== undefined ? r : 0) * 255),
      Math.round((g !== undefined ? g : 0) * 255),
      Math.round((b !== undefined ? b : 0) * 255)
    ];
  }
  
  
  rgbToHsv(r: number, g: number, b: number): number[] {
    r /= 255;
    g /= 255;
    b /= 255;
  
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
  
    let h = 0, s = 0, v = max;
  
    const d = max - min;
    s = max === 0 ? 0 : d / max;
  
    if (max !== min) {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
  
    return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)];
  }

  rgbToCmyk(r: number, g: number, b: number): number[] {
    r /= 255;
    g /= 255;
    b /= 255;

    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y = (1 - b - k) / (1 - k);

    return [Math.round(c * 255), Math.round(m * 255), Math.round(y * 255), Math.round(k * 255)];
  }
}

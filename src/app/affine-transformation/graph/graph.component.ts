import { Component, ElementRef, Input, Output, EventEmitter, OnChanges, ViewChild, AfterViewInit, OnInit, OnDestroy, SimpleChanges, HostListener } from '@angular/core';
import * as p5 from 'p5';
import { Observable, Subscription } from 'rxjs';

export interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'graph',
  template: '<div #graphContainer></div>',
  styleUrls: ['./graph.component.sass']
})
export class GraphComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @ViewChild('graphContainer') graphContainer!: ElementRef;

  @Input() p1: Point = { x: 0, y: 0 };
  @Input() p2: Point = { x: 0, y: 0 };
  @Input() landslideX: number = 0;
  @Input() landslideY: number = 0;
  @Input() rotate: number = 0;
  @Input() scale: number = 1;
  @Output() transformationsApplied: EventEmitter<void> = new EventEmitter<void>();
  @Input() events?: Observable<void>;
  @Input() saveEvents?: Observable<void>;


  private eventsSubscription?: Subscription;
  private saveEventsSubscription?: Subscription;


  private p5Instance!: p5;
  private container!: any;
  private p3: Point = { x: 0, y: 0 };
  private p4: Point = { x: 0, y: 0 };

  constructor() {
  }
  ngOnInit(): void {
    this.eventsSubscription = this.events?.subscribe(() => this.applyAffineTransformation());
    this.saveEventsSubscription = this.saveEvents?.subscribe(() => this.save());
    this.container = this.graphContainer.nativeElement;
    this.calculateThirdAndFourthPoint();
    this.createCanvas();
    this.handleResize();
  }
  ngAfterViewInit() {
    this.container = this.graphContainer.nativeElement;
    this.calculateThirdAndFourthPoint();
    this.createCanvas();
    this.handleResize();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('p1' in changes || 'p2' in changes || 'p3' in changes || 'p4' in changes || 'landslide' in changes || 'rotate' in changes || 'scale' in changes) {
      console.log(this.p1.x + " " + this.p2.x)
      this.p1 = changes['p1'].currentValue;
      this.p2 = changes['p2'].currentValue;
      console.log(this.p1.x + " " + this.p2.x)
      // this.calculateThirdAndFourthPoint();
      // this.applyAffineTransformation();
      // this.p5Instance.redraw();
      // this.handleResize();
    }
  }

  ngOnDestroy() {
    this.p5Instance.remove();
    this.eventsSubscription?.unsubscribe();
    this.saveEventsSubscription?.unsubscribe();
  }

  save() {
    //Save
    this.p5Instance.save("affine.png");
  }

  private applyAffineTransformation() {
    // var xc = (this.p1.x + this.p2.x) / 2;
    // var yc = (this.p1.y + this.p2.y) / 2;

    // // Half diagonal
    // var xd = (this.p2.x - this.p1.x) / 2;
    // var yd = (this.p2.y - this.p1.y) / 2;

    // // Apply landslide transformation
    // xd *= this.landslide;
    // yd *= this.landslide;

    // // Third corner
    // this.p3.x = xc - yd;
    // this.p3.y = yc + xd;

    // // Fourth corner
    // this.p4.x = xc + yd;
    // this.p4.y = yc - xd;

    this.calculateThirdAndFourthPoint();
    console.log(this.p1.x + " " + this.p1.y + " " + this.p2.x + " " + this.p2.y + " " + this.p3.x + " " + this.p3.y + " " + this.p4.x + " " + this.p4.y + " ")
    //Landslide
    this.p1.x += this.landslideX
    this.p2.x += this.landslideX
    this.p3.x += this.landslideX
    this.p4.x += this.landslideX
    this.p1.y += this.landslideY
    this.p2.y += this.landslideY
    this.p3.y += this.landslideY
    this.p4.y += this.landslideY

    //Rotate
    const rotatePoint = (point: Point): Point => {
      const relativeX = point.x;
      const relativeY = point.y;
  
      const rotatedX =
        relativeX * Math.cos(this.rotate) - relativeY * Math.sin(this.rotate);
      const rotatedY =
        relativeX * Math.sin(this.rotate) + relativeY * Math.cos(this.rotate);
  
      return {
        x: rotatedX,
        y: rotatedY,
      };
    };
    this.p1 = rotatePoint(this.p1);
    this.p2 = rotatePoint(this.p2);
    this.p3 = rotatePoint(this.p3);
    this.p4 = rotatePoint(this.p4);

    //Scale
    const scalePoint = (point: Point): Point => {
      return {
        x: point.x * this.scale,
        y: point.y * this.scale,
      };
    }
    this.p1 = scalePoint(this.p1);
    this.p2 = scalePoint(this.p2);
    this.p3 = scalePoint(this.p3);
    this.p4 = scalePoint(this.p4);


    this.p5Instance.redraw();
    this.handleResize();
  }

  private calculateThirdAndFourthPoint() {
    //canter point
    var xc = (this.p1.x + this.p2.x) / 2;
    var yc = (this.p1.y + this.p2.y) / 2;
    //half diagonal
    var xd = (this.p1.x - this.p2.x) / 2;
    var yd = (this.p1.y - this.p2.y) / 2;
    //third corner
    this.p3.x = xc - yd;
    this.p3.y = yc + xd;
    //fourth corner
    this.p4.x = xc + yd;
    this.p4.y = yc - xd;
  }

  private createCanvas() {
    this.p5Instance = new p5(this.sketch, this.container);
  }


  private sketch = (p: p5) => {
    p.setup = () => {
      p.createCanvas(this.container.offsetWidth, this.container.offsetWidth);
      p.noLoop();
    };
    p.draw = () => {
      p.background(255);

      // Draw axes
      this.drawAxes(p);

      // Draw points
      this.drawPoints(p, this.p1, this.p2, this.p3, this.p4);

      // Draw square
      this.drawSquare(p, this.p2, this.p3, this.p1, this.p4);
    };

  }

  private drawAxes(p: p5) {
    const centerX = p.width / 2;
    const centerY = p.height / 2;

    // Draw X-axis arrow
    p.stroke(0);
    p.strokeWeight(1);
    p.line(0, centerY, p.width - 10, centerY); // X-axis line
    p.line(p.width - 10, centerY, p.width - 20, centerY - 5); // Arrowhead part 1
    p.line(p.width - 10, centerY, p.width - 20, centerY + 5); // Arrowhead part 2
    p.text('X', p.width - 20, centerY - 20);

    // Draw Y-axis arrow
    p.line(centerX, p.height, centerX, 10); // Y-axis line
    p.line(centerX, 10, centerX - 5, 20); // Arrowhead part 1
    p.line(centerX, 10, centerX + 5, 20); // Arrowhead part 2
    p.text('Y', centerX - 20, 20);

    // Draw ticks and labels along the X-axis
    for (let i = -p.width / 2; i <= p.width / 2; i += p.width / 10) {
      const roundedLabel = Math.round(i); // Round to the nearest whole number
      p.line(centerX + i, centerY - 5, centerX + i, centerY + 5); // Tick
      p.text(roundedLabel.toString(), centerX + i - 10, centerY + 20); // Label
    }

    // Draw ticks and labels along the Y-axis
    for (let i = -p.height / 2; i <= p.height / 2; i += p.height / 10) {
      const roundedLabel = Math.round(i); // Round to the nearest whole number
      p.line(centerX - 5, centerY - i, centerX + 5, centerY - i); // Tick
      p.text(roundedLabel.toString(), centerX - 30, centerY - i - 5); // Label
    }
  }

  private drawPoints(p: p5, ...points: Point[]) {
    const centerX = p.width / 2;
    const centerY = p.height / 2;

    p.stroke(0, 0, 255); // Blue color for points
    p.strokeWeight(5); // Adjust the size of the points

    points.forEach(point => {
      p.point(centerX + point.x, centerY - point.y);
    });
  }

  private drawSquare(p: p5, ...points: Point[]) {
    const centerX = p.width / 2;
    const centerY = p.height / 2;

    // Draw the parallelogram
    for (let i = 0; i < points.length; i++) {
      const nextIndex = (i + 1) % points.length;
      p.line(centerX + points[i].x, centerY - points[i].y, centerX + points[nextIndex].x, centerY - points[nextIndex].y);
    }
  }
  @HostListener('window:resize')
  private handleResize() {
    if (this.p5Instance) {
      const container = this.graphContainer.nativeElement;
      this.p5Instance.resizeCanvas(container.offsetWidth, container.offsetWidth);
    }
  }
}

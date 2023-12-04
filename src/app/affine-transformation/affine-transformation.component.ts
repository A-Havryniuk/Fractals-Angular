import { Component, NgModule } from '@angular/core';
import { GraphComponent } from './graph/graph.component';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-affine-transformation',
  templateUrl: './affine-transformation.component.html',
  styleUrls: ['./affine-transformation.component.sass']
})
export class AffineTransformationComponent {
  p1 = { x: 100, y: 100 };
  p2 = { x: 200, y: 200 };
  landslideX = 0;
  landslideY = 0;
  rotate = 0;
  scale = 1;

  eventsSubject: Subject<void> = new Subject<void>();

  emitEventToChild() {
    this.eventsSubject.next();
  }
}

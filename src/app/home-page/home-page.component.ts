import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent {
  constructor(private router: Router) { }

  redirectToColorSchemas() {
    this.router.navigate(['/color-schemas']);
  }

  redirectToMandelbrot() {
    this.router.navigate(['/Mandelbrot-set']);
  }
}

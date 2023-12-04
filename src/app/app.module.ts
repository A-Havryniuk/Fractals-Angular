import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import { AppComponent } from './app.component'
import { HomePageComponent } from './home-page/home-page.component';
import { VischekFractalsPageComponent } from './Vischek-fractal-page/fractals-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component'
import { ColorSchemasComponent } from './color-schemas/color-schemas.component';
import { MandelbrotFractalPageComponent } from './mandelbrot-fractal-page/mandelbrot-fractal-page.component';
import { AffineTransformationComponent } from './affine-transformation/affine-transformation.component';
import { GraphComponent } from './affine-transformation/graph/graph.component'
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  {path: 'home', component:HomePageComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'Vischek-fractal', component: VischekFractalsPageComponent},
  {path: 'color-schemas', component: ColorSchemasComponent},
  {path: 'Mandelbrot-set', component: MandelbrotFractalPageComponent},
  {path: 'affine-transformation', component: AffineTransformationComponent}
];

@NgModule({
  declarations: [AppComponent, HomePageComponent, VischekFractalsPageComponent, HeaderComponent, FooterComponent, MandelbrotFractalPageComponent, AffineTransformationComponent, GraphComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  bootstrap: [AppComponent]
})
export class AppModule {}
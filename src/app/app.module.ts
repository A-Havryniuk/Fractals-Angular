import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import { AppComponent } from './app.component'
import { HomePageComponent } from './home-page/home-page.component';
import { VischekFractalsPageComponent } from './Vischek-fractal-page/fractals-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component'
import { ColorSchemasComponent } from './color-schemas/color-schemas.component';
import { MandelbrotFractalPageComponent } from './mandelbrot-fractal-page/mandelbrot-fractal-page.component'

const routes: Routes = [
  {path: 'home', component:HomePageComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'Vischek-fractal', component: VischekFractalsPageComponent},
  {path: 'v', component: VischekFractalsPageComponent},
  {path: 'color-schemas', component: ColorSchemasComponent}
  {path: 'Mandelbrot-set', component: MandelbrotFractalPageComponent}
];

@NgModule({
  declarations: [AppComponent, HomePageComponent, VischekFractalsPageComponent, HeaderComponent, FooterComponent, MandelbrotFractalPageComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  bootstrap: [AppComponent]
})
export class AppModule {}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AnalisisTextoComponent } from './analisis-texto/analisis-texto.component';
import { RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component'
import { pathToFileURL } from 'url';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AnalisisTextoComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'analisis-texto', component: AnalisisTextoComponent},
      {path: 'inicio', component: InicioComponent},
      {path: '', redirectTo: '/inicio', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { AuthenticationComponent } from './authentication/authentication.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AnalisisTextoComponent,
    InicioComponent,
    AuthenticationComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'analisis-texto', component: AnalisisTextoComponent},
      {path: 'inicio', component: InicioComponent},
      {path: 'authentication', component: AuthenticationComponent},
      {path: '404', component: NotFoundComponent},
      {path: '**', redirectTo: '/404', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

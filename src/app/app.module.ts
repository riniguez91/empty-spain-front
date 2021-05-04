import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AnalisisTextoComponent } from './components/analisis-texto/analisis-texto.component';
import { RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component'
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AuthorizedGuard } from './guards/authorized.guard';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AnalisisTextoComponent,
    InicioComponent,
    AuthenticationComponent,
    NotFoundComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'analisis-texto', component: AnalisisTextoComponent},
      {path: 'inicio', component: InicioComponent},
      {path: 'authentication', component: AuthenticationComponent},
      {path: 'perfil', component: PerfilComponent, canActivate: [AuthorizedGuard]},
      {path: '404', component: NotFoundComponent},
      {path: '', redirectTo: '/inicio', pathMatch: 'full'},
      {path: '**', redirectTo: '/404', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AnalisisTextoComponent } from './components/analisis-texto/analisis-texto.component';
import { RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PueblosComponent } from './components/pueblos/pueblos.component'
import { PerfilGuard } from './guards/perfil.guard';
import {AuthenticationGuard} from './guards/authentication.guard';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { AppHttpInterceptor } from './interceptors/app-http.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AnalisisTextoComponent,
    InicioComponent,
    AuthenticationComponent,
    NotFoundComponent,
    PerfilComponent,
    PueblosComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'analisis-texto', component: AnalisisTextoComponent},
      {path: 'inicio', component: InicioComponent},
      {path: 'authentication', component: AuthenticationComponent, canActivate: [AuthenticationGuard]},
      {path: 'perfil', component: PerfilComponent, canActivate: [PerfilGuard]},
      {path: '404', component: NotFoundComponent},
      {path: 'pueblos', component: PueblosComponent},
      {path: '', redirectTo: '/inicio', pathMatch: 'full'},
      {path: '**', redirectTo: '/404', pathMatch: 'full'}
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

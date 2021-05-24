import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnalisisTextoComponent } from './components/analisis-texto/analisis-texto.component';
import { InicioComponent } from './components/inicio/inicio.component'
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PueblosComponent } from './components/pueblos/pueblos.component'
import { PerfilGuard } from './guards/perfil.guard';
import { AuthenticationGuard } from './guards/authentication.guard';



const appRoutes: Routes = [
    {path: 'analisis-texto', component: AnalisisTextoComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'authentication', component: AuthenticationComponent, canActivate: [AuthenticationGuard]},
    {path: 'perfil', component: PerfilComponent, canActivate: [PerfilGuard]},
    {path: '404', component: NotFoundComponent},
    {path: 'pueblos', component: PueblosComponent},
    {path: '', redirectTo: '/inicio', pathMatch: 'full'},
    {path: '**', redirectTo: '/404', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
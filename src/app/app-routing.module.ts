import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnalisisTextoComponent } from './components/analisis-texto/analisis-texto.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FAQComponent } from './components/faq/faq.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PerfilGuard } from './guards/perfil.guard';
import { AuthenticationGuard } from './guards/authentication.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardGuard } from './guards/dashboard.guard';
import { ExamenPc3Component } from './components/examen-pc3/examen-pc3.component';



const appRoutes: Routes = [
    //{path: 'analisis-texto', component: AnalisisTextoComponent},
    //{path: 'inicio', component: InicioComponent},
    {path: 'preguntas-frecuentes', component: FAQComponent},
    {path: 'authentication', component: AuthenticationComponent, canActivate: [AuthenticationGuard]},
    {path: 'perfil', component: PerfilComponent, canActivate: [PerfilGuard]},
    {path: 'dashboard', component: DashboardComponent, canActivate: [DashboardGuard]},
    {path: 'examen-pc3', component: ExamenPc3Component},
    {path: '404', component: NotFoundComponent},
    {path: '', redirectTo: '/pueblos', pathMatch: 'full'},
    {path: '**', redirectTo: '/404', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only (set to true)
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
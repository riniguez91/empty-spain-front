import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AnalisisTextoComponent } from './components/analisis-texto/analisis-texto.component';
import { InicioComponent } from './components/inicio/inicio.component'
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AppHttpInterceptor } from './interceptors/app-http.interceptor';
import { TownModule } from './town/town.module';
import { SpinnerModule } from './shared/components/spinner/spinner.module';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { EditService, ToolbarService, PageService, GridModule, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { TooltipService, LegendService, CategoryService, ChartModule, AccumulationChartModule, 
  PieSeriesService, AccumulationLegendService, AccumulationTooltipService, AccumulationAnnotationService,
  AccumulationDataLabelService, BarSeriesService, DataLabelService, LineSeriesService } from '@syncfusion/ej2-angular-charts';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';
import { ColumnSeriesService, MultiLevelLabelService, SelectionService} from '@syncfusion/ej2-angular-charts';
import { FAQComponent } from './components/faq/faq.component';

  
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
    DashboardComponent,
    FAQComponent,
  ],
  imports: [
    BrowserModule,
    DashboardLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TownModule,
    SpinnerModule,
    AppRoutingModule,
    ChartModule,
    AccumulationChartModule,
    GridModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    CategoryService, LegendService, TooltipService, DataLabelService, LineSeriesService,PieSeriesService, 
    AccumulationLegendService, AccumulationTooltipService, AccumulationDataLabelService,
    AccumulationAnnotationService, BarSeriesService, EditService, ToolbarService, PageService, SortService, FilterService, GroupService,
    ColumnSeriesService, MultiLevelLabelService, SelectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

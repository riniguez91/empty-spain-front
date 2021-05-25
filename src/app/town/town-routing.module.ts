import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TownDetailComponent } from './town-detail/town-detail.component';
import { TownSearchComponent } from './town-search/town-search.component';

const townRoutes: Routes = [
  { path: 'pueblos', component: TownSearchComponent },
  { path: 'pueblos/:id', component: TownDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(townRoutes)],
  exports: [RouterModule]
})
export class TownRoutingModule { }

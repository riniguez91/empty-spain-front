import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TownRoutingModule } from './town-routing.module';
import { TownDetailComponent } from './town-detail/town-detail.component';
import { TownSearchComponent } from './town-search/town-search.component';

@NgModule({
  declarations: [
    TownDetailComponent
  ],
  imports: [
    CommonModule,
    TownRoutingModule
  ]
})
export class TownModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TownRoutingModule } from './town-routing.module';
import { TownDetailComponent } from './town-detail/town-detail.component';
import { TownSearchComponent } from './town-search/town-search.component';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';

@NgModule({
  declarations: [
    TownDetailComponent,
    TownSearchComponent,
    SearchFilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    TownRoutingModule
  ]
})
export class TownModule { }

import { Component, OnInit } from '@angular/core';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';
import { TownService } from '../town.service'

@Component({
  selector: 'app-town-search',
  templateUrl: './town-search.component.html',
  styleUrls: ['./town-search.component.scss']
})
export class TownSearchComponent implements OnInit {

  searchText = '';
  characters: Object;

  constructor(private townService: TownService) { }

  ngOnInit(): void { this.characters = this.townService.getMunicipios().subscribe(result => this.characters = result) }

}

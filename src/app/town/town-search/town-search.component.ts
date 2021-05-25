import { Component, OnInit } from '@angular/core';
import { Town } from 'src/app/models/town.model';
import { TownService } from '../town.service'

@Component({
  selector: 'app-town-search',
  templateUrl: './town-search.component.html',
  styleUrls: ['./town-search.component.scss']
})
export class TownSearchComponent implements OnInit {

  searchText = '';
  towns: Town;

  constructor(private townService: TownService) { }

  ngOnInit(): void { this.townService.getMunicipios().subscribe(result => this.towns = result ) 
  }

}

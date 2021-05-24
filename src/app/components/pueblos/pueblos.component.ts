import { Component, OnInit } from '@angular/core';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-pueblos',
  templateUrl: './pueblos.component.html',
  styleUrls: ['./pueblos.component.scss']
})
export class PueblosComponent implements OnInit {

  searchText = '';
  /* characters = [
    'Ant-Man',
    'Aquaman',
    'Asterix',
    'The Atom',
    'The Avengers',
    'Batgirl',
    'Batman',
    'Batwoman'
  ] */
  characters: Object;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void { this.characters = this.searchService.getMunicipios().subscribe(result => this.characters = result) }

}

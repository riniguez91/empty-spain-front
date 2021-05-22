import { Component, OnInit } from '@angular/core';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';

@Component({
  selector: 'app-pueblos',
  templateUrl: './pueblos.component.html',
  styleUrls: ['./pueblos.component.scss']
})
export class PueblosComponent implements OnInit {

  searchText = '';
  characters = [
    'Ant-Man',
    'Aquaman',
    'Asterix',
    'The Atom',
    'The Avengers',
    'Batgirl',
    'Batman',
    'Batwoman'
  ]

  constructor() { }

  ngOnInit(): void { }

}

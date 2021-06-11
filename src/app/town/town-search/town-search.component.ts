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
  unfocusList = false;
  highlightedTowns: object;

  constructor(private townService: TownService) { }

  ngOnInit(): void { 
    this.townService.getMunicipios().subscribe(result => this.towns = result );
    this.townService.getHighlightedMunicipios().subscribe( result => {
      this.highlightedTowns = result
      // Parse each wiki JSON
      for (let i = 0; i < 4; i++) {
        let wikiJson = JSON.parse(this.highlightedTowns[i].wiki_info);
        this.highlightedTowns[i] = wikiJson;
      }
    });
  }

  unfocusSearchResults() { this.unfocusList = true }

  focusSearchResults() { this.unfocusList = false }

  // Scroll down when u click "flecha.gif"
  scrollDown($element): void{ $element.scrollIntoView({behaviour: "smooth", block: "start", inline: "nearest"}); }

}

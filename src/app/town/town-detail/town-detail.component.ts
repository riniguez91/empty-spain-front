import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';

import { TownService } from '../town.service';

@Component({
  selector: 'app-town-detail',
  templateUrl: './town-detail.component.html',
  styleUrls: ['./town-detail.component.scss']
})
export class TownDetailComponent implements OnInit {

  town$: Observable<any>;
  town: object;
  townId: number;
  userId: number;
  townName: string;

  constructor(private route: ActivatedRoute, private townService: TownService, private storageService: StorageService) { }

  // ! operator is part of TypeScript as a non-null assertion operator which avoids void or null errors popping
  // $ operator marks the variable as an observable type (Angular naming convention)
  ngOnInit(): void {
    this.townId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.townName = this.route.snapshot.paramMap.get('municipio');
    let session = this.storageService.loadSessionData();
    this.userId = session ? jwtDecode(session['access_token'])['sub'] : null;

    this.town$ = this.townService.getTown(this.townId);
    this.town$
    .subscribe( result => {
      // Check if the town has already been scraped
      if (result['scraped']) this.town = result;
      // If not call the scrapers depending if the user has logged in or not
      else {
        if (this.userId) this.addSearch(this.townName, this.townId, this.userId)
        else this.addSearch(this.townName, this.townId)
      }
      result['tiempo_info'] = JSON.parse(result['tiempo_info']);
      result['tripadvisor_info'] = JSON.parse(result['tripadvisor_info']);
      result['twitter_info'] = JSON.parse(result['twitter_info']);
      result['wiki_info'] = JSON.parse(result['wiki_info']);
      this.town = result;
      console.log(this.town)
    });
  }

  /**
   * Adds all the scrapper info in the db
   * 
   * @param municipio_id number
   * @param usuario_id number {optional}
   * @return void
   */
   addSearch(municipioName: string, municipioId: number, userId?: number): void {
    this.townService.getTripAdvisorJsonV2(municipioName).subscribe(result => {
      var json = {
        "tripadvisor_info": JSON.stringify(result),
        "municipio_id": municipioId
      }
      if (userId) json['usuario_id'] = userId;
      this.townService.getTwitterJson(municipioName).subscribe(result => {
        json["twitter_info"] = JSON.stringify(result);
        this.townService.getTiempoJson(municipioName).subscribe(result => {
          json["tiempo_info"] = JSON.stringify(result);
          this.townService.getWikiJson(municipioName).subscribe(result => {
            json["wiki_info"] = JSON.stringify(result);
            this.townService.addScrapersTown(json).subscribe(
              err => throwError(err)
            );
          })
        })
      })
    })


  }

}


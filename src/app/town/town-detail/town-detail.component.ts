import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable, throwError } from 'rxjs';
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
      if (result['scraped']) {
        const actual_date = new Date().getTime();
        const past_date = new Date(result['updated_at']).getTime();
        // If difference between 'updated_at' and actual time is more than 1 day
        if (actual_date - past_date >= 86400000){
          //Call scraper tiempo here
        }
        this.town = this.parseScraperJsons(result);
        if (this.userId) {
          let body = {"user_id" : this.userId, "busqueda_id": result["busqueda_id"]}
          this.townService.insertUserSearch(body).subscribe(err => console.log(err))
        }
      }  
       // If not call the scrapers depending if the user has logged in or not
      // Pass along the json obtained from the API endpoint
      else {
        if (this.userId) this.addSearch(this.townName, this.townId, result, this.userId)
        else this.addSearch(this.townName, this.townId, result)
      } 
    });
  }

  /**
   * Parses the JSONs obtained from the different scrapers
   * 
   * @param jsonToParse object 
   * @return object
   */
   parseScraperJsons(jsonToParse: object) {
     jsonToParse['tiempo_info'] = JSON.parse(jsonToParse['tiempo_info']);
     jsonToParse['tripadvisor_info'] = JSON.parse(jsonToParse['tripadvisor_info']);
     jsonToParse['twitter_info'] = JSON.parse(jsonToParse['twitter_info']);
     jsonToParse['wiki_info'] = JSON.parse(jsonToParse['wiki_info']);

     return jsonToParse;
   }

  /**
   * Adds all the scrapper info in the db
   * 
   * @param municipio_id number
   * @param userId number {optional}
   * @return void
   */
   addSearch(municipioName: string, municipioId: number, json: object, userId?: number): void {
    this.townService.getTripAdvisorJsonV2(municipioName).subscribe(result => {
      // Add the following fields to our pre-fetched json from our API endpoint
      json['tripadvisor_info'] = JSON.stringify(result);
      json['municipio_id'] = municipioId;
      this.townService.getTwitterJson_old(municipioName).subscribe(result => {
        json["twitter_info"] = JSON.stringify(result);
        this.townService.getTiempoJson(municipioName).subscribe(result => {
          json["tiempo_info"] = JSON.stringify(result);
          this.townService.getWikiJson(municipioName).subscribe(result => {
            json["wiki_info"] = JSON.stringify(result);
            this.townService.getModelResult(municipioName).subscribe(result => {
              json["municipio_state"] = result['result'];
              this.townService.addScrapersTown(json).subscribe(
                // If the use is logged in insert it into its search history
                success => {
                  if (userId) {
                    let body = {"user_id" : userId, "busqueda_id": success["busqueda_id"]}
                    this.townService.insertUserSearch(body).subscribe(err => console.log(err))
                  }
                  // Parse the scraper jsons
                  this.town = this.parseScraperJsons(json)
                },
                err => throwError(err)
              );
            })
          })
        })
      })
    })
  }

  /**
   * Insert search in user search history
   *
   * @param json
   * @returns void 
   */
  insertUserSearch() {

  }


  /**
   * Parse str to float
   * 
   * @param input string
   * @return float
   */
  convertStringToFloat(input: string) {
    var numeric = parseFloat(input);
    return numeric;
  }

}


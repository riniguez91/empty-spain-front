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
        // Si la diferencia de dias de la ultima modificacion y la actual es mayor que 1dia
        if (actual_date - past_date >= 86400000){
          if (this.userId) this.addSearch(this.townName, this.townId, result, this.userId)
          else this.addSearch(this.townName, this.townId, result)
        }
        this.town = this.parseScraperJsons(result);
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
      if (userId) json['usuario_id'] = userId;
      this.townService.getTwitterJson(municipioName).subscribe(result => {
        json["twitter_info"] = JSON.stringify(result);
        this.townService.getTiempoJson(municipioName).subscribe(result => {
          json["tiempo_info"] = JSON.stringify(result);
          this.townService.getWikiJson(municipioName).subscribe(result => {
            json["wiki_info"] = JSON.stringify(result);
            this.townService.getModelResult(municipioName).subscribe(result => {
              json["municipio_state"] = result['result'];
              this.townService.addScrapersTown(json).subscribe(
                // Parse the scraper jsons
                success => this.town = this.parseScraperJsons(json),
                err => throwError(err)
              );
            })
          })
        })
      })
    })
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

  /* cardCarouselHandler(){
    Allows for multi-carrousels to work without disturbing each other  
    $(() => function() {
      $("#carouselExampleControls").on("slide.bs.carousel", function(e) {
        var $e = $(e.relatedTarget); ///relatedTarget
        var idx = $e.index();
        var curr_id = e.currentTarget.id;
        var itemsPerSlide = 4;
        var totalItems = $("#" + curr_id + " .carousel-item").length;

        if (idx >= totalItems - (itemsPerSlide - 1)) {
          var it = itemsPerSlide - (totalItems - idx);
          for (var i = 0; i < it; i++) {
            // Append slides to end
            if ($e.direction == "left") {
              $("#" + curr_id + " .carousel-item")
                .eq(i)
                .appendTo("#" + curr_id + " .carousel-inner");
            } else {
              $("#" + curr_id + " .carousel-item")
                .eq(0)
                .appendTo("#" + curr_id + " .carousel-inner");
            }
          }
        }
      });
    });
    } */

}


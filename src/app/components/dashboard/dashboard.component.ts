import { Component, OnInit, ViewChild } from '@angular/core';
import { EditSettingsModel, ToolbarItems, SelectionSettingsModel, GridComponent, IEditCell ,GridLine,PageSettingsModel} from '@syncfusion/ej2-angular-grids';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TownService } from 'src/app/town/town.service';
import { TownDetailComponent } from 'src/app/town/town-detail/town-detail.component';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { LoginService } from '../../services/login.service';
import { throwError } from 'rxjs';
import { Town } from 'src/app/models/town.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  // Dashboard panel layout options
  public allowDragging: boolean = false;
  public cellAspectRatio: number = 65 / 50;
  public cellSpacing: number[] = [10, 10];

  // Change top picks grid
  @ViewChild('topPicksGrid') public topPicksGrid: GridComponent;
  public topPicksPageSettings = { pageSize: 8 };
  public topPickSelectionOptions: SelectionSettingsModel;
  public rowIndexes: number[] = [];
  public topPicksData: object[];
  //define the country DropDownList data
  public ddParams: IEditCell = { params: { value: '0' } };
  public topPicksEditOptions: EditSettingsModel = { allowEditing: true, mode: 'Normal'}
  public topPicksToolbarOptions: ToolbarItems[] = ['Edit', 'Update', 'Cancel']

  // Top 10 municipios piechart options
  public searchpiechart: any[];
  public tooltip: Object = {
    enable: true
  };
  public legendSettings: Object = {
    visible: true
  };

  // User table options
  public tableData: object[];
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[] | object;
  public userPageSettings;
  tablaAdmin() {
    this.tableData = [{ OrderID: 1, CustomerID: 'asdf', Freight: 123, ShipCountry: 'asdf' }, { OrderID: 2, CustomerID: 'asdf', Freight: 123, ShipCountry: 'asdf' }];
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.userPageSettings = { pageSize: 10 };
  }

  
  public townsData;
  public townPageSettings;
  tablaPueblos() {
    this.townService.getMunicipios().subscribe(result => this.townsData = result);
    this.editSettings = { allowEditing: false, allowAdding: false, allowDeleting: false };
    this.toolbar = ['Search'];
    this.townPageSettings = { pageSize: 5 };
  }
  rowSelected(args){ 
    //console.log(args.data.id);  // you can get the selected record in the below argument 
    this.townName = args.data.municipio;
    this.townId = args.data.id;
  } 
  
  constructor(private dashboardService: DashboardService, private townService: TownService, private storageService: StorageService, private route: ActivatedRoute) { }


  towns: Town;
  ngOnInit(): void {
    // Get municipios + highlighted column for highlighted towns grid
    this.dashboardService.municipiosWithHighlighted().subscribe( result => {
      this.topPicksData = result
    });

    // Get top searches piechart data
    this.dashboardService.topSearches().subscribe(
      result => this.searchpiechart = result
    );

    // Get user grid data
    this.dashboardService.getUsers().subscribe(
      result => this.tableData = result
    );

    // Initialize admin table settings
    this.tablaAdmin();

    // Get top picks grid data
    this.topPickSelectionOptions = { type: 'Multiple' }
  }

  /**
   * Executed after the "update" button is clicked changes highlighted column in the db with the value from the grid
   * 
   * @param args 
   */
  topPicksActionComplete(args: any) {
    if (args.requestType === 'save') {
        // Change the highlighted column in the db updating it as well in every other component
        let body = {"municipio_id" : args.data.id, "highlighted": args.data.highlighted };
        this.dashboardService.updateHighlighted(body).subscribe( result => console.log(result) );
    }
}

  /**
   * asd
   * 
   * @param args 
   * @return void
   */
  public topPicksRowSelected(args): void {
    /* if (args.rowIndexes.length > 4) {
      this.topPicksGrid.clearRowSelection()
      alert('Mi pana ya has seleccionado 4');
      this.topPicksGrid.selectRows(this.rowIndexes)
    }
    else
      this.rowIndexes = args.rowIndexes; */
  }

  /**
   * This will be triggered before the row element is appended to the Grid element.
   * 
   * @param args 
   * @return void
   */
  public topPicksRowDataBound(args): void {
    if (args.data['highlighted'] == 1) {
      let rowIndex = parseInt(args.row.getAttribute('aria-rowindex'), 10);
      this.rowIndexes.push(rowIndex);
    } 
  }

  /**
   * Triggers when data source is populated in the Grid.
   * 
   * @param args 
   * @return void
   */
  public topPicksDataBound(args): void {
    if (this.rowIndexes.length) 
      this.topPicksGrid.selectRows(this.rowIndexes);
      this.rowIndexes = []

    this.tablaPueblos();

  }

  /**
   * Calls the function that uses the command php artisan db:seed to restore db rows
   * 
   * @return void
   */
  reset_locality() {
    this.dashboardService.reset().subscribe(
      result => alert(JSON.stringify(result))
    );
  }

  townName: string;
  townId: number;
  userId: number;
  town: object;

  
  /** 
   * Call the scrpers when needed if the town its not scraped or update a specific field in the database
   * @param choice the value that  
   * 
  */
  notScraped(choice: number){
    let townDetail = new TownDetailComponent(this.route, this.townService, this.storageService);
    this.townService.getTown(this.townId).subscribe(result=>{
      console.log(result);
      //if town is not scraped, then call all scrapers
      if (!result['scraped']) {
        townDetail.addSearch(this.townName, this.townId, result);
      }
      //If its already scraped update the value of the selected
      else if (choice == 0) { this.tripadvisorLaunch(); }
      else if (choice == 1) { this.twitterLaunch(); }
      else if (choice == 2) { this.tiempoLaunch(); }
      else if (choice == 3) { this.wikiLaunch(); }
    });
  }
  
  /**
   * Call the scraper of tripadvisor and update the database
   */
  tripadvisorLaunch() {
    this.townService.getTripAdvisorJsonV2(this.townName).subscribe(
      result => {
        let body = { "townId": this.townId, "field": "tripadvisor_info", "content": JSON.stringify(result) };
        this.dashboardService.updateSearch(body).subscribe(
          result => {
            console.log(result);
            alert('se ha ejecutado TripadvisorScraper');
          }
        );
      }
    );
  }

  /**
   * Call the scraper of twitter and update the database
   */
  twitterLaunch() {
    this.townService.getTwitterJson(this.townName).subscribe(
      result => {
        let body = { "townId": this.townId, "field": "twitter_info", "content": JSON.stringify(result) };
        this.dashboardService.updateSearch(body).subscribe(
          result => {
            console.log(result);
            alert('se ha ejecutado Twitter Scraper');
          }
        );
      }
    );
  }

  /**
   * Call the scraper of tiempo and update the database
   */
  tiempoLaunch() {
    this.townService.getTiempoJson(this.townName).subscribe(
      result => {
        let body = { "townId": this.townId, "field": "tiempo_info", "content": JSON.stringify(result) };
        this.dashboardService.updateSearch(body).subscribe(
          result => {
            console.log(result);
            alert('se ha ejecutado Tiempo Scraper');
          }
        );
      }
    );
  }

  /**
   * Call the scraper of wiki and update the database
   */
  wikiLaunch() {
    this.townService.getWikiJson(this.townName).subscribe(
      result => {
        let body = { "townId": this.townId, "field": "wiki_info", "content": JSON.stringify(result) };
        this.dashboardService.updateSearch(body).subscribe(
          result => {
            console.log(result);
            alert('se ha ejecutado WIKI Scraper');
          }
        );
      }
    );
  }
}




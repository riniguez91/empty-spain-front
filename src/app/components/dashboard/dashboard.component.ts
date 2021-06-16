import { Component, OnInit, ViewChild } from '@angular/core';
import { EditSettingsModel, ToolbarItems, SelectionSettingsModel, GridComponent, IEditCell} from '@syncfusion/ej2-angular-grids';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TownService } from 'src/app/town/town.service';
import { TownDetailComponent } from 'src/app/town/town-detail/town-detail.component';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage.service';
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
  public topPicksPageSettings = { pageSize: 18 };
  public topPickSelectionOptions: SelectionSettingsModel;
  public rowIndexes: number[] = [];
  public topPicksData: object[];
  //define the country DropDownList data
  public ddParams: IEditCell = { params: { value: '0' } };
  public topPicksEditOptions: EditSettingsModel = { allowEditing: true, mode: 'Normal'}
  public topPicksToolbarOptions: ToolbarItems[] = ['Edit', 'Update', 'Cancel']

  // Top 10 municipios piechart options
  /* public searchpiechart: any[];
  public tooltip: Object = {
    enable: true
  };
  public legendSettings: Object = {
    visible: true
  }; */

  // User table options
  public tableData: object[];
  public userGridEditSettings: EditSettingsModel;
  public userGridToolbar: ToolbarItems[];
  public requiredField: object;
  public userPageSettings;
  tablaAdmin() {
    this.userGridEditSettings = { showDeleteConfirmDialog: true, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.userGridToolbar = ['Edit', 'Delete', 'Cancel', 'Search'];
    this.userPageSettings = { pageSize: 9 };
    this.requiredField = { required: true, minLength: 3 };
  }

  // Scraper grid options
  public townsData;
  public townPageSettings;
  public toolbar: ToolbarItems[];
  tablaPueblos() {
    this.townService.getMunicipios().subscribe(result => this.townsData = result);
    this.toolbar = ['Search'];
    this.townPageSettings = { pageSize: 8 };
  }

  
  // Top 10 Searches config
  public primaryXAxisTop: Object;
  public primaryYAxisTop: Object;
  public topData: Object;
  public titleTop: string;
  public paletteTop: string[];
  chartTop(){
    //this.despoblacionData = [{ categoria: "Despoblación", cantidad: 10 },{ categoria: "No Despoblación", cantidad: 20 }]
    this.dashboardService.topSearches().subscribe( result=> {this.topData = result; console.log('top data');console.log(this.topData)});
    this.primaryXAxisTop = {valueType: 'Category', title: 'Categoria'};
    this.primaryYAxisTop = {minimum: 0, interval: 10, title: 'Busquedas'};
    this.titleTop = 'Top 10 Pueblos';
    this.paletteTop = ["#3F84E5"]; // color var(--azure)
  }

   // Despo vs No Despo PieChart config
   public palettePie: string[];
   public despopiechart: any[];
   public tooltipDespo: Object
   public legendSettingsDespo: Object;
   despoPieChart(){
     this.palettePie = ['#bf6d85','#f47382','#f7b198']
     this.dashboardService.getDespoblacion().subscribe(result => this.despopiechart = result);
     this.legendSettingsDespo = {visible: true};
     this.tooltipDespo= {enable: true};
   }
  constructor(private dashboardService: DashboardService, private townService: TownService, private storageService: StorageService, private route: ActivatedRoute) { }

  towns: Town;
  ngOnInit(): void {
    // Get municipios + highlighted column for highlighted towns grid
    this.dashboardService.municipiosWithHighlighted().subscribe( result => {
      this.topPicksData = result
    });

    // Get user grid data
    this.dashboardService.getUsers().subscribe(
      result => this.tableData = result
    );

    // Initialize admin table settings
    this.tablaAdmin();

    // Get top picks grid data
    this.topPickSelectionOptions = { type: 'Multiple' }
    
    //show the data of despo vs no despo PieChart
    this.despoPieChart();

    //show the columns chart of top 10 searches
    this.chartTop();
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
   * Executed after the "update" button is clicked changes highlighted column in the db with the value from the grid
   * 
   * @param args 
   */
   userGridActionComplete(args: any) {
    // Update user records in the db
    if (args.requestType === 'save') {
      let body = { "user_id": args.data.id, "email": args.data.email, "name": args.data.name, "surnames": args.data.surnames, "role": args.data.role, "is_disabled": args.data.is_disabled };
      this.dashboardService.updateUser(body).subscribe( result => console.log(result) );
    }
    // PERMANENTLY delete user from table
    else if (args.requestType === 'delete') {
      let body = { "user_id": args.data[0].id };
      this.dashboardService.deleteUser(body).subscribe( result => console.log(result) );
    }
  }

  /**
   * Obtain town name and town id from scraper grid
   * 
   * @param args 
   * @return void 
   */
   scraperGridRowSelected(args) { 
    this.townName = args.data.municipio;
    this.townId = args.data.id;
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
    var body = { "townId": this.townId, "field": "twitter_info"};
    this.townService.getTwitterJson_old(this.townName).subscribe(
      result => {
        body["content"] =  JSON.stringify(result);
        this.townService.getTwitterJson(this.townName).subscribe(
          result => {
            body["content_new"] = JSON.stringify(result);
            this.dashboardService.updateSearch(body).subscribe(
              result => {
                console.log(result);
                alert('se ha ejecutado Twitter Scraper');
              }
            );
          }
        )
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




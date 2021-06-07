import { Component, OnInit, ViewChild } from '@angular/core';
import { EditSettingsModel, ToolbarItems, SelectionSettingsModel, GridComponent, IEditCell } from '@syncfusion/ej2-angular-grids';
import { DashboardService } from 'src/app/services/dashboard.service';


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

  constructor(private dashboardService: DashboardService) { }

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

}

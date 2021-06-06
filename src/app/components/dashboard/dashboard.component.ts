import { Component, OnInit } from '@angular/core';
import { EditSettingsModel, ToolbarItems, IEditCell, GridLine, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DashboardService } from 'src/app/services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public allowDragging: boolean = false;
  public cellAspectRatio: number = 65 / 50;
  public cellSpacing: number[] = [10, 10];
  public tooltip: Object = {
    enable: true
  };
  public legendSettings: Object = {
    visible: true
  };
  
  public lineData: any[] = [
    { x: 2013, y: 28 }, { x: 2014, y: 25 }, { x: 2015, y: 26 }, { x: 2016, y: 27 },
    { x: 2017, y: 32 }, { x: 2018, y: 35 }
  ];

  public searchpiechart: any[];
  public tableData: object[];
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[] | object;
  public pageSettings;
  tablaAdmin() {
    this.tableData = [{ OrderID: 1, CustomerID: 'asdf', Freight: 123, ShipCountry: 'asdf' }, { OrderID: 2, CustomerID: 'asdf', Freight: 123, ShipCountry: 'asdf' }];
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.pageSettings = { pageSize: 5 };
  }

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.topSearches().subscribe(
      result => 
        this.searchpiechart = result
    );
    this.dashboardService.getUsers().subscribe(
      result =>
        this.tableData = result
    );
    this.tablaAdmin();
  }

  reset_locality() {
    this.dashboardService.reset().subscribe(
      result => {
        alert(result);
      }
    );
  }

}

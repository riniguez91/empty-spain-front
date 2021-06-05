import { Component, OnInit } from '@angular/core';
import { EditSettingsModel, ToolbarItems, IEditCell, GridLine, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DashboardService } from 'src/app/services/dashboard.service';
//import * as Chart from 'chart.js';


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
  public chartData: Object[] = [
    { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
    { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
    { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
    { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
    { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
    { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
  ];
  public primaryXAxis: Object = {
    valueType: 'Category'
  }
  public lineData: any[] = [
    { x: 2013, y: 28 }, { x: 2014, y: 25 }, { x: 2015, y: 26 }, { x: 2016, y: 27 },
    { x: 2017, y: 32 }, { x: 2018, y: 35 }
  ];
  public piechart: any[] = [{ x: 'TypeScript', y: 13, text: 'TS 13%' }, { x: 'React', y: 12.5, text: 'Reat 12.5%' }, { x: 'MVC', y: 12, text: 'MVC 12%' }, { x: 'Core', y: 12.5, text: 'Core 12.5%' }, { x: 'Vue', y: 10, text: 'Vue 10%' }, { x: 'Angular', y: 40, text: 'Angular 40%' }];
  public piechart1: any[];
  public legendSettings: Object = {
    visible: false
  };


  /* chart: Chart;
  chartData = [{ data: [], backgroundColor: [] }];
  chartLabels = [];
  chartOptions = { responsive: true, event: ['clck'] }; */

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
      result => {
        console.log(result);
        this.piechart1 = result
        console.log('pieChart1 ' + this.piechart1)


      }
    );
    this.dashboardService.getUsers().subscribe(
      result => {
        this.tableData = result
        console.log('tableData '+result);
      }
    );

    this.tablaAdmin();
  }

  reset_locality() {
    this.dashboardService.reset().subscribe(
      result => {
        console.log(result);
      }
    );
  }

}

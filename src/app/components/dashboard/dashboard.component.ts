import { Component, OnInit } from '@angular/core';
import { EditSettingsModel, ToolbarItems, IEditCell, GridLine, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
//import * as Chart from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  /* chart: Chart;
  chartData = [{ data: [], backgroundColor: [] }];
  chartLabels = [];
  chartOptions = { responsive: true, event: ['clck'] }; */

  constructor() { }

  ngOnInit(): void {
    this.graph();
    this.pie();
    this.tablaAdmin();
  }

  public primaryXAxis: Object;
  public chartData: Object[];
  graph(): void {
    //sobreescribir la variable chartdata con los datos por parametro que se quieren mostrar

    let chartdata = [ //valores por defecto
      { month: 'Jan', busquedas: 35 }, { month: 'Feb', busquedas: 28 },
      { month: 'Mar', busquedas: 34 }, { month: 'Apr', busquedas: 32 },
      { month: 'May', busquedas: 40 }, { month: 'Jun', busquedas: 32 },
      { month: 'Jul', busquedas: 35 }, { month: 'Aug', busquedas: 55 },
      { month: 'Sep', busquedas: 38 }, { month: 'Oct', busquedas: 30 },
      { month: 'Nov', busquedas: 25 }, { month: 'Dec', busquedas: 32 }
    ];
    this.chartData = chartdata;
    this.primaryXAxis = {
      valueType: 'Category'
    };

  }

  public piedata: Object[];
  public datalabel: Object;
  public legendSettings: Object;
  public enableBorderOnMouseMove: boolean;
  public tooltip: Object;
  pie(): void {

    //sobreescribir la variable dataMapping con los datos por parametro que se quieren mostrar
    let dataMapping = [//valores por defecto
      { x: 'Barcelona', y: 35 }, { x: 'Villaviciosa de Odón', y: 28 },
      { x: 'Madrid', y: 43 }, { x: 'Boadilla del Monte', y: 32 },
      { x: 'Navacerrada', y: 40 }, { x: 'Humada', y: 32 },
      { x: 'Sigüenza', y: 35 }, { x: 'Barbate', y: 55 },
      { x: 'Tortonda', y: 38 }, { x: 'Granada', y: 30 },
      { x: 'Cariño', y: 25 }, { x: 'Jaén', y: 32 }];

    this.enableBorderOnMouseMove = false;
    this.piedata = dataMapping;
    this.datalabel = { visible: true, name: 'y', position: 'Inside' };
    this.legendSettings = { visible: true };
  }

  //onHover mostrar los datos de porcentaje de cada uno //https://ej2.syncfusion.com/angular/documentation/chart/how-to/percentage-tool-tip/
  /* public tooltipRender(args: IAccTooltipRenderEventArgs): void {
    let value  = args.point.y / args.series.sumOfPoints * 100;
    args["text"] = args.point.x + ' : ' + Math.ceil(value) + '' + '%';
  }; */


  public data: object[];
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[] | object;
  public pageSettings = { pageSize: 6 };
  tablaAdmin() {
    this.data = [{ OrderID: 1, CustomerID: 'asdf', Freight: 123, ShipCountry: 'asdf' }, { OrderID: 2, CustomerID: 'asdf', Freight: 123, ShipCountry: 'asdf' }];
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.pageSettings = { pageSize: 6 };

  }
  
  public grid:any;
  clickHandler(args: ClickEventArgs): void {
    if (args.item.id == 'grid_2099639708_0_update') { // grid_2099639708_0_update es el id de la tabla del campo update
      console.log('Se deberia actualizar la base de datos')

      //ahora hay que actulalizar la tabla con los nuevos campos
      args.item.id
    }
    if (args.item.id == 'grid_2099639708_0_delete') {
    
    }
  }
}

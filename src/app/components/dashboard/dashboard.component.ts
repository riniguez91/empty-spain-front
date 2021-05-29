import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';


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
    pie():void {

      //sobreescribir la variable dataMapping con los datos por parametro que se quieren mostrar
      let dataMapping = [//valores por defecto
        { x: 'Barcelona', y: 35 }, { x: 'Villaviciosa de Odón', y: 28 },
        { x: 'Madrid', y: 43 }, { x: 'Boadilla del Monte', y: 32 },
        { x: 'Navacerrada',y : 40 }, { x: 'Humada', y: 32 },
        { x: 'Sigüenza', y: 35 }, { x: 'Barbate', y: 55 },
        { x: 'Tortonda', y: 38 }, { x: 'Granada', y: 30 },
        { x: 'Cariño', y: 25 }, { x: 'Jaén', y: 32 }];

      this.enableBorderOnMouseMove = false;
      this.piedata = dataMapping;
      this.datalabel = { visible: true, name: 'y', position: 'Inside' };
      this.legendSettings = {visible: true};
    }

    //onHover mostrar los datos de porcentaje de cada uno //https://ej2.syncfusion.com/angular/documentation/chart/how-to/percentage-tool-tip/
    /* public tooltipRender(args: IAccTooltipRenderEventArgs): void {
      let value  = args.point.y / args.series.sumOfPoints * 100;
      args["text"] = args.point.x + ' : ' + Math.ceil(value) + '' + '%';
   }; */

}
//LIBRERIA ADICIONAL PARA PIECHARTS
 /*  addData() {
    //this.clearData() // limpia el grafico antes de insertar los nuevos datos
    var valores = [521, 456, 789]
    var colors = ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"]
    var chartLabels2 = [
      'Madrid ',
      'Barcelona ',
      'Sigüenza ',
    ];

    this.chartData[0]['data'] = this.chartData[0]['data'].concat(valores);//[0]['data'] porque es un { ['data'], } 
    this.chartData[0]['backgroundColor'] = this.chartData[0]['backgroundColor'].concat(colors)
    this.chartLabels = this.chartLabels.concat(chartLabels2);
  }
  clearData() {
    this.chartData[0]['data'] = [];//[0]['data'] porque es un { ['data'], } 
    this.chartLabels = [];
  } */
  
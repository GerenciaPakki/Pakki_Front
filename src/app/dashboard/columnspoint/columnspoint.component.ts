import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'app-columnspoint',
  templateUrl: './columnspoint.component.html',
  styleUrls: ['./columnspoint.component.css'],
})
export class ColumnspointComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let chart = am4core.create('pointcolumns', am4charts.XYChart);

    // Configuración del gráfico
    chart.data = [
      {
        category: 'Category 1',
        value: 10,
      },
      {
        category: 'Category 2',
        value: 20,
      },
      {
        category: 'Category 3',
        value: 15,
      },
      {
        category: 'Category 4',
        value: 1,
      },
      {
        category: 'Category 5',
        value: 23,
      },
      {
        category: 'Category 6',
        value: 20,
      },
      {
        category: 'Category 7',
        value: 22,
      },
    ];

    // Ejes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.grid.template.location = 0;

    categoryAxis.renderer.cellStartLocation = 0.1; // Ajusta la ubicación de inicio de la celda
    categoryAxis.renderer.cellEndLocation = 0.9;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Series de puntos (LineSeries con marcadores personalizados)
    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.categoryX = 'category';
    series.name = 'Value';

    categoryAxis.renderer.minGridDistance = 30;

    // Cambiar color de la línea y de los marcadores
    series.stroke = am4core.color('#ff8000'); // Cambia '#ff0000' al color que desees
    series.strokeWidth = 2;

    const bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 6;
    bullet.circle.stroke = am4core.color('#ff8000');
    bullet.circle.strokeWidth = 2;

    // Leyenda
    chart.legend = new am4charts.Legend();

    // Responsiveness
    chart.responsive.enabled = true;
  }
}

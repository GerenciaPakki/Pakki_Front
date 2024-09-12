import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css'],
})
export class ColumnsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let chart = am4core.create('bardiv', am4charts.XYChart);

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
    ];

    // Ejes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Series de barras
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.columns.template.fill = am4core.color('#ff8000');
    series.dataFields.valueY = 'value';
    series.dataFields.categoryX = 'category';
    series.name = 'Value';
    series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]';
    series.columns.template.fillOpacity = 0.8;

    // Leyenda
    chart.legend = new am4charts.Legend();

    // Responsiveness
    chart.responsive.enabled = true;
  }
}

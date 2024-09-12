import {
  Component,
  OnInit,
  AfterViewInit,
  Injector,
  ViewContainerRef,
} from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';

import * as Chartist from 'chartist';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, AfterViewInit {
  private chart: am4charts.PieChart;
  readonly viewContainerRef: ViewContainerRef;

  // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }
  public tableData: TableData;
  startAnimationForLineChart(chart: any) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;
    chart.on('draw', function (data: any) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease',
          },
        });
      }
    });

    seq = 0;
  }
  startAnimationForBarChart(chart: any) {
    let seq2: any, delays2: any, durations2: any;
    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data: any) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease',
          },
        });
      }
    });

    seq2 = 0;
  }

  single = [
    {
      name: 'ENERO',
      value: 60,
    },
    {
      name: 'FEBRERO',
      value: 80,
    },
    {
      name: 'MARZO',
      value: 200,
    },
    {
      name: 'ABRIL',
      value: 120,
    },
  ];

  // constructor(private navbarTitleService: NavbarTitleService) { }
  public ngOnInit() {
    this.chart = am4core.create('chartdiv', am4charts.PieChart);

    // Add data
    this.chart.data = [
      {
        category: 'ENERO',
        value: 10,
        color: am4core.color('#FF5733'),
      },
      {
        category: 'FEBRERO',
        value: 20,
        color: am4core.color('#33FF57'),
      },
      {
        category: 'MARZO',
        value: 15,
        color: am4core.color('#5733FF'),
      },
      {
        category: 'ABRIL',
        value: 10,
        color: am4core.color('#FF33E8'),
      },
    ];

    // Create series
    const series = this.chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = 'value';
    series.dataFields.category = 'category';

    // Add labels
    series.slices.template.propertyFields.isActive = 'pulled';
    series.slices.template.propertyFields.fill = 'color';

    series.labels.template.propertyFields.disabled = 'disabled';
    series.labels.template.propertyFields.text = 'category';
    series.labels.template.propertyFields.fill = 'color';

    series.ticks.template.propertyFields.fill = 'color';

    // Add legend
    this.chart.legend = new am4charts.Legend();

    this.tableData = {
      headerRow: ['ID', 'Name', 'Salary', 'Country', 'City'],
      dataRows: [
        ['US', 'USA', '2.920	', '53.23%'],
        ['DE', 'Germany', '1.300', '20.43%'],
        ['AU', 'Australia', '760', '10.35%'],
        ['GB', 'United Kingdom	', '690', '7.87%'],
        ['RO', 'Romania', '600', '5.94%'],
        ['BR', 'Brasil', '550', '4.34%'],
      ],
    };
    /* ----------==========     Daily Sales Chart initialization    ==========---------- */

    const dataDailySalesChart = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [[12, 17, 7, 17, 23, 18, 38]],
    };

    const optionsDailySalesChart = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    const dailySalesChart = new Chartist.Line(
      '#dailySalesChart',
      dataDailySalesChart,
      optionsDailySalesChart
    );

    this.startAnimationForLineChart(dailySalesChart);
    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart = {
      labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
      series: [[230, 750, 450, 300, 280, 240, 200, 190]],
    };

    const optionsCompletedTasksChart = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better
      // look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    const completedTasksChart = new Chartist.Line(
      '#completedTasksChart',
      dataCompletedTasksChart,
      optionsCompletedTasksChart
    );

    this.startAnimationForLineChart(completedTasksChart);

    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    const dataWebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]],
    };
    const optionsWebsiteViewsChart = {
      axisX: {
        showGrid: false,
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
    };
    const responsiveOptions: any = [
      [
        'screen and (max-width: 640px)',
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            },
          },
        },
      ],
    ];
    const websiteViewsChart = new Chartist.Bar(
      '#websiteViewsChart',
      dataWebsiteViewsChart,
      optionsWebsiteViewsChart,
      responsiveOptions
    );

    this.startAnimationForBarChart(websiteViewsChart);

    $('#worldMap').vectorMap({
      map: 'world_en',
      backgroundColor: 'transparent',
      borderColor: '#818181',
      borderOpacity: 0.25,
      borderWidth: 1,
      color: '#b3b3b3',
      enableZoom: true,
      hoverColor: '#eee',
      hoverOpacity: null,
      normalizeFunction: 'linear',
      scaleColors: ['#b6d6ff', '#005ace'],
      selectedColor: '#c9dfaf',
      selectedRegions: null,
      showTooltip: true,
      onRegionClick: function (element, code, region) {
        var message =
          'You clicked "' +
          region +
          '" which has the code: ' +
          code.toUpperCase();

        alert(message);
      },
    });
  }
  ngAfterViewInit() {
    const breakCards = true;
    if (breakCards === true) {
      // We break the cards headers if there is too much stress on them :-)
      $('[data-header-animation="true"]').each(function () {
        const $fix_button = $(this);
        const $card = $(this).parent('.card');
        $card.find('.fix-broken-card').click(function () {
          const $header = $(this)
            .parent()
            .parent()
            .siblings('.card-header, .card-image');
          $header.removeClass('hinge').addClass('fadeInDown');

          $card.attr('data-count', 0);

          setTimeout(function () {
            $header.removeClass('fadeInDown animate');
          }, 480);
        });

        $card.mouseenter(function () {
          const $this = $(this);
          const hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
          $this.attr('data-count', hover_count);
          if (hover_count >= 20) {
            $(this)
              .children('.card-header, .card-image')
              .addClass('hinge animated');
          }
        });
      });
    }
  }
}

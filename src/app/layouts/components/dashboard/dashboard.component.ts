import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }


  public lineChartType: ChartType = 'line';
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [10, 30, 50, 19, 25, 44, -10, 80],
        label: 'Series A',
        // backgroundColor: 'red',
        borderColor: '#6c5ffc',
        pointBackgroundColor: '#6c5ffc',
        pointBorderColor: '#6c5ffc',
        pointHoverBackgroundColor: '#6c5ffc',
        pointHoverBorderColor: '#6c5ffc',
        // fill: 'origin',
      },
      {
        data: [100, 33, 22, 19, 11, 49, 30, 75],
        label: 'Series B',
        // backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: '#2fc3fb',
        pointBackgroundColor: '#2fc3fb',
        pointBorderColor: '#2fc3fb',
        pointHoverBackgroundColor: '#2fc3fb',
        pointHoverBorderColor: '#2fc3fb',
        // fill: 'origin',
      },
    ],
    labels: ['March', 'April', 'May', 'June', 'July', 'August', 'September', 'October']
  };



  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top"
      }
    },
    animations: {
      tension: {
        duration: 4000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    }
  };


  // PolarArea
  public polarAreaChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData: ChartData<'polarArea'> = {
    labels: this.polarAreaChartLabels,
    datasets: [{
      data: [11, 16, 7, 3, 14],
      backgroundColor: [
        'rgb(46, 193, 232)',
        'rgb(94, 114, 228)',
        'rgb(58, 65, 111)',
        'rgb(168, 184, 216)',
        'rgb(130, 214, 23)'
      ],
      label: 'Series 1'
    }]
  };
  public polarAreaLegend = false;

  public polarAreaChartType: ChartType = 'polarArea';
  public polarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    }
  }

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }



  //Bar Chart 

  public barChartOptions: ChartConfiguration['options'] = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    elements: {
      bar: {
        borderWidth: 0,
      }
    },
    responsive: true,

    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: false,
      }
    }
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: ["WON", "OPEN", "SUSPENDED", "LOST", "ABANDONED"],
    datasets: [{
      label: 'Opportunity value',
      backgroundColor: 'rgba(63, 81, 181, 1)',
      borderColor: 'rgb(47, 128, 237)',
      barPercentage: 1,
      barThickness: 15,
      maxBarThickness: 15,
      minBarLength: 2,
      data: [700, 400, 200, 500, 400],
    }]
  };


  // Doughnut
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ["Prospecting $1.30M 51%",
      "Qualification $0.80M 33%",
      "Needs Analysis $0.10M 4%",
      "Proposal $0.10M 4%",
      "Negotiation $0.10M 6%"
    ],
    datasets: [{
      data: [51, 33, 4, 4, 6],
      backgroundColor: [
        'rgb(63, 81, 181)',
        'rgb(40, 169, 244)',
        'rgb(98, 185, 102)',
        'rgb(249, 206, 29)',
        'rgb(251, 152, 2)'
      ],
    }]
  };
  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    },
    // scales: {
    //   xAxes: [{
    //     gridLines: {
    //       display: false
    //     }
    //   }],
    //   yAxes: [{
    //     gridLines: {
    //       display: false
    //     }
    //   }],
    // }
    // }
  };

  ngOnInit(): void {
  }

}

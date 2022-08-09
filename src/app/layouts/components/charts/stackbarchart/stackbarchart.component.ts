import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {ChartConfiguration} from "chart.js";
import {DashboardService} from "../../../../services/dashboard.service";

@Component({
  selector: 'app-stackbarchart',
  templateUrl: './stackbarchart.component.html',
  styleUrls: ['./stackbarchart.component.css']
})
export class StackbarchartComponent implements OnInit, OnChanges {

  @ViewChild('myCanvas') mycanvas: any;
  @Input() dataset: any = [];
  @Input() valueLabels: any = [];
  @Input() customFilter: any = [];
  @Input() title = '';
  @Input() isLegendShow = false;
  @Input() subtitle = '';
  @Input() totalAmount = 0;
  @Input() indexAxis = 'x';
  @Input() graphId = '';
  @Input() extraKey = '';
  @Input() extraString = '';
  @Input() directString = '';
  @Input() exportType = '';
  @Input() isExport = false;
  @Input() onChartFilter = true;
  @Output() onExport: EventEmitter<any> = new EventEmitter();
  @Output() dayViewChanged: EventEmitter<any> = new EventEmitter();
  @Output() customFilterChanged: EventEmitter<any> = new EventEmitter();
  selectFlag = 0;
  loaderSup: any;
  isLoader = true;
  barChartPlugins: any = [];
  barChartData: any = [];
  barChartLegend = true;
  barChartLabels: any = [];

  lightColor: any = ['#8E2DE2', '#00F260'];
  darkColor: any = ['#4A00E0', '#0575E6'];

  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    indexAxis: 'x',
    maintainAspectRatio: false,
    animations: {
      tension: {
        duration: 4000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          /*labelColor: function(context) {
            return {
              borderColor: 'rgb(0, 0, 255)',
              backgroundColor: 'rgb(255, 0, 0)',
              borderWidth: 2,
              borderDash: [2, 2],
              borderRadius: 2,
            };
          },
          labelTextColor: function(context) {
            return '#543453';
          }*/
          // label: (tooltipItem) => {
          //     console.log(tooltipItem);
          //     // console.log(tooltipItem.dataIndex);
          //     return 'dd'
          // }
        }
      }
    }
  };

  barChartColors = [
    {
      backgroundColor: 'red',
      borderColor: 'red'
    }
  ];
  selectedFilter = '';
  filterList: any = this.dashboardService.filterList;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    const color = this.getRandomColor();
    this.barChartColors = [
      {
        backgroundColor: color,
        borderColor: color
      }
    ];
    /*setTimeout(() => {
      const gradient = this.mycanvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 600);
      gradient.addColorStop(0, '#11998e');
      gradient.addColorStop(1, '#38ef7d');
      const gradient1 = this.mycanvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 600);
      gradient1.addColorStop(0, '#4286f4');
      gradient1.addColorStop(1, '#373B44');
      this.barChartData = {
        labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
        datasets: [
          { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A', backgroundColor: gradient},
          { data: [ 30, 29, 60, 71, 36, 25, 80 ], label: 'Series B', backgroundColor: gradient1}
        ]
      };
    }, 1000)*/
  }

  ngOnDestroy(): void {
    if (this.loaderSup) {
      this.loaderSup.unsubscribe();
    }
  }

  onCallTypeChange(callType: string): void {
    this.dayViewChanged.emit(callType);
  }

  filterChanged(flag: number, filter: string): any {
    this.selectFlag = flag;
    this.selectedFilter = filter;
    this.dayViewChanged.emit(filter)
  }

  getRandomColor(flag = 0) {
    /*const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;*/
    let items = [];
    if (flag === 0) {
      items = this.lightColor;
    } else {
      items = this.darkColor;
    }
    const item = items[Math.floor(Math.random()*items.length)];
    return item;
  }

  getVal(label: string) {
    for (const obj of this.dataset) {
      if (obj.label === label) {
        return obj[this.extraKey]
      }
    }
  }

  setChartData(): void {
    const data = [];
    const labels: any = [];
    const dataset: any = [];
    this.barChartData = [];
    for (const obj of this.dataset) {
      labels.push(obj.label);
      for (const l of this.valueLabels) {
        l.data.push(obj[l.name])
      }
    }
    for (const [index, l] of this.valueLabels.entries()) {
      const gradient = this.mycanvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 600);
      gradient.addColorStop(0, this.lightColor[index]);
      gradient.addColorStop(1, this.darkColor[index]);
      dataset.push({
        label: l.label,
        data: l.data,
        borderWidth: 2,
        fill: false,
        backgroundColor: gradient,
        borderColor: gradient,
        barPercentage: 0.3,
        borderRadius: 5
      });
    }
    this.barChartLabels = labels;
    this.barChartData = {
      labels: labels,
      datasets: dataset
    }
  }

  onCheckBoxChange(obj: any) {
    for (const d of this.customFilter) {
      if (obj.name != d.name) {
        d.isCheck = false;
      }
    }
    if (obj.isCheck) {
      this.customFilterChanged.emit(obj.name);
    }
  }

  ngOnChanges(changes: any) {
    if (changes.dataset) {
      this.dataset = [];
      this.dataset = JSON.parse(JSON.stringify(changes.dataset.currentValue));
      for (const l of this.valueLabels) {
        l.data = [];
      }
    }
    this.setChartData();
  }

}

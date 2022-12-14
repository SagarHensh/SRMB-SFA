import {Component, EventEmitter, OnInit, Output, Input, OnChanges} from '@angular/core';
import {ChartConfiguration} from "chart.js";
import {DashboardService} from "../../../../services/dashboard.service";

@Component({
    selector: 'app-linechart',
    templateUrl: './linechart.component.html',
    styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit, OnChanges {

    @Input() dataset: any = [];
    @Input() valueLabels: any = [];
    @Input() customFilter: any = [];
    @Input() title = '';
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

    chartOptions: ChartConfiguration<'line'>['options'] = {
        responsive: true,
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
            y: {
                // the data minimum used for determining the ticks is Math.min(dataMin, suggestedMin)
                suggestedMin: 30,

                // the data maximum used for determining the ticks is Math.max(dataMax, suggestedMax)
                suggestedMax: 50,
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
                    //   console.log(tooltipItem);
                    //   // console.log(tooltipItem.dataIndex);
                    //   return 'dd'
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

    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit(): void {
        const color = this.getRandomColor();
        this.barChartColors = [
            {
                backgroundColor: color,
                borderColor: color
            }
        ];
        /*setTimeout(() => {
          this.barChartData = {
            labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
            datasets: [
              { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A'},
              { data: [ 30, 29, 60, 71, 36, 25, 80 ], label: 'Series B'}
            ]
          };
        }, 2000)*/
    }

    ngOnDestroy(): void {
        if (this.loaderSup) {
            this.loaderSup.unsubscribe();
        }
    }

    onCallTypeChange(callType: string): void {
        this.dayViewChanged.emit(callType);
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    setChartData(): void {
        const data = [];
        const labels = [];
        const dataset = [];
        this.barChartData = [];
        for (const obj of this.dataset) {
            labels.push(obj.label);
            for (const l of this.valueLabels) {
                l.data.push(obj[l.name])
            }
        }
        for (const l of this.valueLabels) {
            if (!l.isHide) {
                dataset.push({
                    label: l.label,
                    data: l.data,
                    borderWidth: 2,
                    fill: false,
                    backgroundColor: l.backgroundColor,
                    borderColor: l.backgroundColor,
                    type: l.type
                });
            }
        }
        this.barChartLabels = labels;
        this.barChartData = {
            labels: labels,
            datasets: dataset
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

    onCheckBoxChange(obj: any) {
        for (const l of this.valueLabels) {
            l.data = [];
            if (obj.name == l.label) {
                l.isHide = !obj.isCheck;
            }
        }
        this.setChartData();
    }

}

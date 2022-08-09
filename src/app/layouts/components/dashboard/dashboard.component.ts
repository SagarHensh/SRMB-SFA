import {Component, OnInit} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {DashboardService} from "../../../services/dashboard.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    isAutoCompleteHide = true;
    filterList: any = [];
    startDate = '2022-07-01';
    endDate = '2022-08-20';
    nextChartSub = new Subject<any>();
    nextChartSubsp: Subscription = new Subscription();
    totalVisit = 0;
    totalVisitGrowth = 0;
    totalBranding = 0;
    brandingGrowth = 0;
    targetVisit = 0;
    targetVisitGrowth = 0;
    uniqueVisit = 0;
    uniqueVisitGrowth = 0;
    targetAchievementData: any = [];
    monthlyVisitData: any = [];
    targetAchievementDataLabels: any = [{
        name: 'Achievement',
        data: [],
        label: 'Achievement',
        backgroundColor: 'green'
    }, {
        name: 'value',
        data: [],
        label: 'Target',
        backgroundColor: 'blue'
    }];
    monthlyVisitDataLabels: any = [{
        name: 'value',
        data: [],
        label: 'Customer',
        backgroundColor: '#FF5C5C',
        type: 'line',
        isHide: false
    }, {
        name: 'influencer',
        data: [],
        label: 'Influencer',
        backgroundColor: '#4A00E0',
        type: 'line',
        isHide: false
    }, {
        name: 'tvisit',
        data: [],
        label: 'Target',
        backgroundColor: '#726E76',
        type: 'bar',
        isHide: false
    }];
    targetAchievementFilter: any = [{
        isCheck: true,
        name: 'Sales'
    }, {
        isCheck: false,
        name: 'Visit'
    }];
    monthlyVisitFilter: any = [{
        isCheck: true,
        name: 'Customer'
    }, {
        isCheck: true,
        name: 'Influencer'
    }, {
        isCheck: true,
        name: 'Target'
    }];
    targetAchievementFilterVal: any = 'Sales';
    monthlyVisitFilterVal: any = 'CUSTOMER';
    product = '';
    productList: any = [];
    memberList: any = [];
    member = '';
    userId = 7;
    isLoading = false;
    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit(): void {
        window.addEventListener('click', (event: any) => {
            if (!(<HTMLInputElement>event.target).matches('.auto-search')) {
                try {
                    this.onFocusOutSearch();
                } catch (e) {
                    // console.log(e);
                }
            }
        });
        const initDate: any = this.dashboardService.getInitialDate();
        this.startDate = initDate.startDate;
        this.endDate = initDate.endDate;
        this.getProductData();
        this.getMinMaxOfLastMonth();
        this.getDashboardData('totalVisit');
        this.nextChartSubsp = this.nextChartSub.asObservable().subscribe((res: any) => {
            this.getDashboardData('branding');
            this.getDashboardData('targetVisit');
            this.getDashboardData('uniqueVisit');
            this.getDashboardData('targetAchievement');
            this.getDashboardData('monthlyVisit');
        });
    }

    ngOnDestroy(): void {
        if (this.nextChartSubsp) {
            this.nextChartSubsp.unsubscribe();
        }
    }

    getMinMaxOfLastMonth(): void {
        this.dashboardService.getMinMaxOfLastMonth().subscribe((res: any) => {
            if (res.success) {
                this.startDate = res.response.startDate;
                this.endDate = res.response.endDate;
            }
        })
    }

    onCallTypeChange(callType: string, chartType: string): void {
        this.getDashboardData(chartType, callType, 1);
    }

    submitFilter(): any {
        if (this.startDate != '' && this.endDate != '' && new Date(this.startDate).getTime() > new Date(this.endDate).getTime()) {
            return false;
        }
        this.getDashboardData('totalVisit');
    }

    getDashboardData(chartType: string, callType: string = '', flag: number = 0): void {
        let radioBtn = '';
        if (chartType == 'targetAchievement') {
            radioBtn = this.targetAchievementFilterVal.toUpperCase()
        } else if (chartType == 'monthlyVisit') {
            radioBtn = this.monthlyVisitFilterVal.toUpperCase()
        }
        const data = {
            type: chartType,
            startDate: this.startDate,
            endDate: this.endDate,
            calType: callType,
            radioButton: radioBtn,
            userId: this.userId
        };
        if (callType !== '') {
            data.startDate = '';
            data.endDate = '';
        }
        this.dashboardService.getDashboardData(data).subscribe((res: any) => {
            if (res.success) {
                // console.log(JSON.stringify(res));
                if (chartType === 'totalVisit') {
                    this.totalVisit = res.response.data;
                    this.totalVisitGrowth = res.response.Growth;
                    if (flag == 0) {
                        this.nextChartSub.next({success: true});
                    }
                } else if (chartType === 'branding') {
                    this.totalBranding = res.response.data;
                    this.brandingGrowth = res.response.Growth;
                } else if (chartType === 'targetVisit') {
                    this.targetVisit = res.response.data;
                    this.targetVisitGrowth = res.response.Growth;
                } else if (chartType === 'uniqueVisit') {
                    this.uniqueVisit = res.response.data;
                    this.uniqueVisitGrowth = res.response.Growth;
                } else if (chartType === 'targetAchievement') {
                    this.targetAchievementData = res.response.data;
                } else if (chartType === 'monthlyVisit') {
                    this.monthlyVisitData = res.response.data;
                }
            } else {
            }
        })
    }

    customFilterChanged(event: any, flag: number) {
        if (flag === 1) {
            this.targetAchievementFilterVal = event;
            this.getDashboardData('targetAchievement');
        } else if (flag === 2) {
            this.monthlyVisitFilterVal = event;
            this.getDashboardData('monthlyVisit');
            this.monthlyVisitDataLabels[0].label = event;
        }
    }

    getProductData() {
        this.dashboardService.getProductData().subscribe((res: any) => {
            if (res.success) {
                this.productList = res.response;
            }
        });
    }

    selectMemberEvent(event: any) {
        this.userId = event.userId;
        this.member = event.name;
        this.onFocusOutSearch();
    }

    onChangeSearch(event: any) {
        const searchText = event.target.value;
        this.isLoading = true;
        const data = {
            type: "memberName",
            member: searchText,
            clientId: this.dashboardService.getClientId()
        };
        this.dashboardService.getMemberData(data).subscribe((res: any) => {
          if (res.success) {
              this.isLoading = false;
             /* for (const obj of res.response.data) {
                  obj.search = event
              }*/
            this.memberList = res.response.data;
          }
        }, (err: any) => {
            this.isLoading = false;
        })
    }

    onFocusInSearch() {
        this.isAutoCompleteHide = false;
    }

    onFocusOutSearch() {
        this.isAutoCompleteHide = true;
    }

}

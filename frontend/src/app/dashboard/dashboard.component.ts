import { Component, AfterViewInit } from '@angular/core';
import {DashboardService} from '../services/dashboard.service';
import {ScnackbarService} from '../services/scnackbar.service';
import {GlobalConstants} from '../shared/global-constants';

@Component({
  // tslint:disable-next-line:indent
	selector: 'app-dashboard',
  // tslint:disable-next-line:indent
	templateUrl: './dashboard.component.html',
  // tslint:disable-next-line:indent
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  responseMessage: any;
  data: any;
  // tslint:disable-next-line:indent
	ngAfterViewInit(): any { }

  // tslint:disable-next-line:indent
	constructor(
    private dashboardService: DashboardService,
    private snackbarService: ScnackbarService
  ) {
    this.dashboardData();
    // tslint:disable-next-line:indent
	}
  // tslint:disable-next-line:typedef
  dashboardData(){
    this.dashboardService.getDetails().subscribe((response: any) => {
        this.data = response;
      // tslint:disable-next-line:no-shadowed-variable
      }, (error: any) => {
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }

}

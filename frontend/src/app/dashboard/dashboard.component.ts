import { Component, AfterViewInit } from '@angular/core';
import {DashboardService} from '../services/dashboard.service';
import {ScnackbarService} from '../services/scnackbar.service';
import {GlobalConstants} from '../shared/global-constants';
import {MenuItems} from "../shared/menu-items";
import {DashboardItems} from "../shared/dashboard-items";
import {jwtDecode} from "jwt-decode";

@Component({
  // tslint:disable-next-line:indent
	selector: 'app-dashboard',
  // tslint:disable-next-line:indent
	templateUrl: './dashboard.component.html',
  // tslint:disable-next-line:indent
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  token: any = localStorage.getItem('token');
  tokenPayLoad: any;
  responseMessage: any;
  data: any;
  // tslint:disable-next-line:indent
	ngAfterViewInit(): any { }

  // tslint:disable-next-line:indent
	constructor(
    private dashboardService: DashboardService,
    private snackbarService: ScnackbarService,
    public dashboardItems: DashboardItems
  ) {
    this.tokenPayLoad = jwtDecode(this.token);
    // tslint:disable-next-line:triple-equals
    if (this.tokenPayLoad.user_type == '3') { this.dashboardData(); }
    // tslint:disable-next-line:triple-equals
    if (this.tokenPayLoad.user_type == '1') { this.dashboardDataForStudent(); }
    // tslint:disable-next-line:triple-equals
    if (this.tokenPayLoad.user_type == '2') { this.dashboardDataForTeacher(); }
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

  dashboardDataForStudent(): any{
    const email = this.tokenPayLoad .login;
    const data = {
      login: email
    };
    this.dashboardService.getDetailsForStudent(data).subscribe((response: any) => {
      console.log(response);
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

  dashboardDataForTeacher(): any{
    const email = this.tokenPayLoad .login;
    const data = {
      login: email
    };
    this.dashboardService.getDetailsForTeacher(data).subscribe((response: any) => {
      console.log(response);
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

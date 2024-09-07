import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {ScnackbarService} from './scnackbar.service';
import {jwtDecode} from 'jwt-decode';
import {GlobalConstants} from '../shared/global-constants';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(public auth: AuthService,
              public router: Router,
              public snackbarService: ScnackbarService) { }

  // @ts-ignore
  canActivate(route: ActivatedRouteSnapshot): boolean{
    let expectedRoleArray = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole;

    const token: any = localStorage.getItem('token');
    let tokenPayLoad: any;
    try {
      tokenPayLoad = jwtDecode(token);
      console.log(tokenPayLoad);
    } catch (err) {
      localStorage.clear();
      this.router.navigate(['/']);
    }

    let checkRole = false;


    for(const key in GlobalConstants.roleDependency){
      // tslint:disable-next-line:triple-equals
      if (tokenPayLoad.user_type == key) { // @ts-ignore
        tokenPayLoad.role = GlobalConstants.roleDependency[key];
      }
    }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < expectedRoleArray.length; i++) {
      // tslint:disable-next-line:triple-equals
      if (expectedRoleArray[i] == tokenPayLoad.role) {
        // tslint:disable-next-line:no-unused-expression triple-equals
        checkRole = true;
      }
    }
    // tslint:disable-next-line:triple-equals
    if (tokenPayLoad.role == 'student' || tokenPayLoad.role == 'teacher' || tokenPayLoad.role == 'admin') {
      if (this.auth.isAuthenticated() && checkRole) {
        return true;
      }
      this.snackbarService.openSnackBar(GlobalConstants.unathorizaed, GlobalConstants.error);
      this.router.navigate(['/main/dashboard']);
      return false;
    } else {
      this.router.navigate(['/']);
      localStorage.clear();
      return false;
    }
  }
}

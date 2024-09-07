import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddUserComponent} from '../add-user/add-user.component';
import {ForgotPasswordComponent} from "../forgot-password/forgot-password.component";
import {LoginComponent} from "../login/login.component";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {error} from "protractor";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null){
      this.userService.checkToken().subscribe(
        (response: any) => {
          return this.router.navigate(['/main/dashboard']);
        }
        // tslint:disable-next-line:no-shadowed-variable no-unused-expression
      ), (error: any) => {
        console.log(error);
      };
    }
  }

  addUserAction(): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(AddUserComponent, dialogConfig);
  }

  forgotPassword(): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(ForgotPasswordComponent, dialogConfig);
  }

  login(): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(LoginComponent, dialogConfig);
  }

}

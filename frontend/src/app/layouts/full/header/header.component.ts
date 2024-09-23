import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {ConfirmationComponent} from '../../../material-component/dialog/confirmation/confirmation.component';
import {ChangePasswordComponent} from "../../../material-component/dialog/change-password/change-password.component";
import {jwtDecode} from "jwt-decode";
import {ChatViewComponent} from "../../../material-component/chat-view/chat-view.component";
import {ChatToAdminsComponent} from "../../../material-component/dialog/chat-to-admins/chat-to-admins.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  role: any;
  login = '';
  style: any;
  // tslint:disable-next-line:variable-name
  user_type: any;
  constructor(private router: Router,
              private dialog: MatDialog) {
    const token: any = localStorage.getItem('token');
    const tokenPayLoad: any = jwtDecode(token);
    // @ts-ignore
    const email = tokenPayLoad.login;
    this.login = email;
    this.user_type = tokenPayLoad.user_type;
  }

  logout(): any{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Розлогінитись'
    };
    const dialogrefopen = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogrefopen.componentInstance.onEmitStatusChange.subscribe((user) => {
      dialogrefopen.close();
      localStorage.clear();
      this.router.navigate(['/']);
    });
  }

  // tslint:disable-next-line:typedef
  changePassword(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }

  openChat(): any{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80%';
    const dialogRef = this.dialog.open(ChatViewComponent, dialogConfig);
    this.router.events.subscribe((): any => {
      dialogRef.close();
    });
  }

  openChatToAdmins(): any{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    const dialogRef = this.dialog.open(ChatToAdminsComponent, dialogConfig);
    this.router.events.subscribe((): any => {
      dialogRef.close();
    });
  }

}

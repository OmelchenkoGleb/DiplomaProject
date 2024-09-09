import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {ConfirmationComponent} from '../../../material-component/dialog/confirmation/confirmation.component';
import {ChangePasswordComponent} from "../../../material-component/dialog/change-password/change-password.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  role: any;
  constructor(private router: Router,
              private dialog: MatDialog) {

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

  changePassword(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }

}

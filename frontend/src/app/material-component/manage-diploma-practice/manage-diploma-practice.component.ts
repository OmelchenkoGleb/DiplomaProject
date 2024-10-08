import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ScnackbarService} from '../../services/scnackbar.service';
import {MatTableDataSource} from '@angular/material/table';
import {GlobalConstants} from '../../shared/global-constants';
import {ConfirmationComponent} from '../dialog/confirmation/confirmation.component';
import {DiplomaPracticeService} from '../../services/diploma-practice.service';
import {DiplomaPracticeComponent} from '../dialog/diploma-practice/diploma-practice.component';
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-manage-diploma-practice',
  templateUrl: './manage-diploma-practice.component.html',
  styleUrls: ['./manage-diploma-practice.component.scss']
})
export class ManageDiplomaPracticeComponent implements OnInit {

  displayedColumns: string[] = ['group_name', 'directionofthesis_name', 'description', 'edit'];

  dataSource: any;
  responseMesssage: any;
  teacherLogin: any;
  constructor(private dialog: MatDialog,
              private router: Router,
              private diplomapracticeService: DiplomaPracticeService,
              private scnackbarService: ScnackbarService) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData(): any {
    const token: any = localStorage.getItem('token');
    const tokenPayLoad = jwtDecode(token);
    // @ts-ignore
    const email = tokenPayLoad.login;
    this.teacherLogin = email;
    const data = {
      login: email
    };
    // @ts-ignore
    this.diplomapracticeService.get(data).subscribe(
      (response: any): any => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
      },
      // tslint:disable-next-line:no-shadowed-variable
      (error: { error: { message: any; }; }) => {
        if (error.error?.message) {
          this.responseMesssage = error.error?.message;
        } else {
          this.responseMesssage = GlobalConstants.genericError;
        }
        this.scnackbarService.openSnackBar(this.responseMesssage, GlobalConstants.error);
      }
    );
  }

  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction(): any{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '850px';
    dialogConfig.data = {
      action: 'Add',
      label_name: 'Створення нової теми'
    };
    const dialogRef = this.dialog.open(DiplomaPracticeComponent, dialogConfig);
    this.router.events.subscribe((): any => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddUser.subscribe(
      (response): any => {
        this.tableData();
      }
    );
  }

  handleEditAction(value: any): any{
    const dialogConfig = new MatDialogConfig();
    value.name = value.directionofthesis_name;
    dialogConfig.width = '850px';
    dialogConfig.data = {
      action: 'Edit',
      label_name: 'Редагувати Тему',
      data: value
    };
    console.log(value);
    const dialogRef = this.dialog.open(DiplomaPracticeComponent, dialogConfig);
    this.router.events.subscribe((): any => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditUser.subscribe(
      (response): any => {
        this.tableData();
      }
    );
  }

  handleDeleteAction(element: any): any{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Видалити'
    };
    const dialogrefopen = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogrefopen.componentInstance.onEmitStatusChange.subscribe((user) => {
      dialogrefopen.close();
      const data = {
        id: element.ID
      };
      this.diplomapracticeService.delete(data).subscribe(
        (response: any): any => {
          this.responseMesssage = response?.message;
          this.scnackbarService.openSnackBar(this.responseMesssage, '');
          this.tableData();
        },
        // tslint:disable-next-line:no-shadowed-variable
        (error: { error: { message: any; }; }) => {
          if (error.error?.message) {
            this.responseMesssage = error.error?.message;
          } else {
            this.responseMesssage = GlobalConstants.genericError;
          }
          this.scnackbarService.openSnackBar(this.responseMesssage, GlobalConstants.error);
        }
      );
    });
  }

}

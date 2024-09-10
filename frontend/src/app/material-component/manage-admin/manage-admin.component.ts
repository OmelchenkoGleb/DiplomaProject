import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ScnackbarService} from '../../services/scnackbar.service';
import {MatTableDataSource} from '@angular/material/table';
import {GlobalConstants} from '../../shared/global-constants';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddUserComponent} from '../../add-user/add-user.component';
import {ConfirmationComponent} from '../dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.scss']
})
export class ManageAdminComponent implements OnInit {

  displayedColumns: string[] = ['name', 'contactNumber', 'email', 'password', 'edit'];

  dataSource: any;
  responseMesssage: any;
  constructor(private dialog: MatDialog,
              private router: Router,
              private userService: UserService,
              private scnackbarService: ScnackbarService) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData(): any {

    // @ts-ignore
    this.userService.getAdmin().subscribe(
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
    dialogConfig.width = '550px';
    dialogConfig.data = {
      action: 'Add',
      label_name: 'Додати Адміністратора',
      user_type: '3'
    };
    const dialogRef = this.dialog.open(AddUserComponent, dialogConfig);
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
    dialogConfig.width = '550px';
    dialogConfig.data = {
      action: 'Edit',
      label_name: 'Редагувати дані про Адміністратора',
      user_type: '3',
      data: value
    };
    const dialogRef = this.dialog.open(AddUserComponent, dialogConfig);
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
        id: element.id
      };
      this.userService.delete(data).subscribe(
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

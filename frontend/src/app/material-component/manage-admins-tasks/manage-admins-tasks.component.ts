import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {TasksService} from "../../services/tasks.service";
import {ScnackbarService} from "../../services/scnackbar.service";
import {DiplomaPracticeService} from "../../services/diploma-practice.service";
import {jwtDecode} from "jwt-decode/build/esm";
import {GlobalConstants} from "../../shared/global-constants";
import {MatTableDataSource} from "@angular/material/table";
import {ManageTasksComponent} from "../dialog/manage-tasks/manage-tasks.component";
import {ConfirmationComponent} from "../dialog/confirmation/confirmation.component";
import {AdminsTasksComponent} from "../dialog/admins-tasks/admins-tasks.component";

@Component({
  selector: 'app-manage-admins-tasks',
  templateUrl: './manage-admins-tasks.component.html',
  styleUrls: ['./manage-admins-tasks.component.scss']
})
export class ManageAdminsTasksComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private router: Router,
              private tasksService: TasksService,
              private scnackbarService: ScnackbarService,
              private diplomapracticeService: DiplomaPracticeService) { }

  displayedColumns: string[] = ['name', 'from_date', 'to_date', 'edit'];

  dataSource: any;
  responseMesssage: any;

  // tslint:disable-next-line:variable-name
  user_type: any;
  isPractice = false;

  ngOnInit(): void {
    const token: any = localStorage.getItem('token');
    const tokenPayLoad = jwtDecode(token);
    // @ts-ignore
    this.user_type = tokenPayLoad.user_type;
    console.log(this.user_type);
    this.tableData();
  }

  tableData(): any {
    // @ts-ignore
    this.tasksService.getTasksFromAdmins().subscribe(
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
      label_name: 'Додати Етап'
    };
    const dialogRef = this.dialog.open(AdminsTasksComponent, dialogConfig);
    this.router.events.subscribe((): any => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddTasks.subscribe(
      (response): any => {
        this.tableData();
      }
    );
  }

  handleEditAction(value: any): any{
    const dialogConfig = new MatDialogConfig();
    console.log(value);
    dialogConfig.width = '550px';
    dialogConfig.data = {
      action: 'Edit',
      label_name: 'Редагувати Етап',
      data: value
    };
    console.log(value);
    const dialogRef = this.dialog.open(AdminsTasksComponent, dialogConfig);
    this.router.events.subscribe((): any => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditTasks.subscribe(
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
      this.tasksService.deleteTasksForAdmins(data).subscribe(
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

import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {TasksService} from '../../services/tasks.service';
import {ScnackbarService} from '../../services/scnackbar.service';
import {jwtDecode} from 'jwt-decode';
import {MatTableDataSource} from '@angular/material/table';
import {GlobalConstants} from '../../shared/global-constants';
import {ResultfileService} from '../../services/resultfile.service';
import {ConfirmationComponent} from "../dialog/confirmation/confirmation.component";
import {UploadFileDocxComponent} from "../dialog/upload-file-docx/upload-file-docx.component";

@Component({
  selector: 'app-student-view-resultfile',
  templateUrl: './student-view-resultfile.component.html',
  styleUrls: ['./student-view-resultfile.component.scss']
})
export class StudentViewResultfileComponent implements OnInit {

  displayedColumns: string[] = ['file', 'edit'];

  dataSource: any;
  responseMesssage: any;
  email: any;
  constructor(private dialog: MatDialog,
              private router: Router,
              private resultfile: ResultfileService,
              private scnackbarService: ScnackbarService,
              @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData(): any {
    let data: any;
    if (this.dialogData?.email) {
      this.email = this.dialogData?.email;
      data = {
        login: this.dialogData?.email
      };
    } else {
      const token: any = localStorage.getItem('token');
      const tokenPayLoad = jwtDecode(token);
      // @ts-ignore
      const email = tokenPayLoad.login;
      this.email = email;
      data = {
        login: email
      };
    }
    console.log(data);
    // @ts-ignore
    this.resultfile.get(data).subscribe(
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
      file_type: '2',
      label_name: 'Додати Звіт',
      login: this.email
    };
    const dialogRef = this.dialog.open(UploadFileDocxComponent, dialogConfig);
    this.router.events.subscribe((): any => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddFile.subscribe(
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
      this.resultfile.delete(data).subscribe(
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

  download(element: any): any{
    console.log(element);
    this.resultfile.getFile(element.ID).subscribe((blob: any): any => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = element.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ResultfileService} from "../../services/resultfile.service";
import {ScnackbarService} from "../../services/scnackbar.service";
import {jwtDecode} from "jwt-decode";
import {MatTableDataSource} from "@angular/material/table";
import {GlobalConstants} from "../../shared/global-constants";
import {UploadFileDocxComponent} from "../dialog/upload-file-docx/upload-file-docx.component";
import {ConfirmationComponent} from "../dialog/confirmation/confirmation.component";

@Component({
  selector: 'app-student-view-diary',
  templateUrl: './student-view-diary.component.html',
  styleUrls: ['./student-view-diary.component.scss']
})
export class StudentViewDiaryComponent implements OnInit {

  displayedColumns: string[] = ['file', 'edit'];

  dataSource: any;
  responseMesssage: any;
  email: any;
  constructor(private dialog: MatDialog,
              private router: Router,
              private resultfile: ResultfileService,
              private scnackbarService: ScnackbarService) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData(): any {
    const token: any = localStorage.getItem('token');
    const tokenPayLoad = jwtDecode(token);
    // @ts-ignore
    const email = tokenPayLoad.login;
    this.email = email;
    const data = {
      login: email
    };
    // @ts-ignore
    this.resultfile.getDiary(data).subscribe(
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
      file_type: '1',
      label_name: 'Додати Щоденник',
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

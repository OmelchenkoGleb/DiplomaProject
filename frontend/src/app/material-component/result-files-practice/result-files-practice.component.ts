import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ResultfileService} from "../../services/resultfile.service";
import {ScnackbarService} from "../../services/scnackbar.service";
import {DiplomaPracticeService} from "../../services/diploma-practice.service";
import {jwtDecode} from "jwt-decode/build/esm";
import {GlobalConstants} from "../../shared/global-constants";
import {MatTableDataSource} from "@angular/material/table";
import {UploadFileDocxComponent} from "../dialog/upload-file-docx/upload-file-docx.component";
import {ConfirmationComponent} from "../dialog/confirmation/confirmation.component";

@Component({
  selector: 'app-result-files-practice',
  templateUrl: './result-files-practice.component.html',
  styleUrls: ['./result-files-practice.component.scss']
})
export class ResultFilesPracticeComponent implements OnInit {

  displayedColumns: string[] = ['group_name', `student_name`, 'file', 'edit'];

  dataSource: any;
  responseMesssage: any;
  email: any;
  studentLogin: any;
  isPractice = false;
  // tslint:disable-next-line:variable-name
  user_type: any;
  constructor(private dialog: MatDialog,
              private router: Router,
              private resultfile: ResultfileService,
              private scnackbarService: ScnackbarService,
              private diplomapracticeService: DiplomaPracticeService,
              @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit(): void {
    this.tableData();
    if (!this.dialogData?.email && this.user_type == 1) { this.checkPracticeStudent(); }
  }
  checkPracticeStudent(): any {
    const token: any = localStorage.getItem('token');
    const tokenPayLoad = jwtDecode(token);
    // @ts-ignore
    const email = tokenPayLoad.login;
    this.studentLogin = email;
    const data = {
      login: this.studentLogin
    };
    console.log(data);
    // @ts-ignore
    this.diplomapracticeService.checkPracticeForStudent(data).subscribe(
      (response: any): any => {
        console.log(response[0]?.ID);
        if (response[0]?.ID) {
          this.isPractice = true;
        }
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

  tableData(): any {
    let data: any;
    const token: any = localStorage.getItem('token');
    const tokenPayLoad: any = jwtDecode(token);
    // @ts-ignore
    const email = tokenPayLoad.login;
    const user_type = tokenPayLoad.user_type;
    this.email = email;
    this.user_type = user_type;
    data = {
      login: email
    };
    if (user_type == 1) {
      // @ts-ignore
      this.resultfile.getStudentAllResultFiles(data).subscribe(
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
    if (user_type == 3) {
      // @ts-ignore
      this.resultfile.getAllResultFiles().subscribe(
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
  }

  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction(): any{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.data = {
      file_type: '4',
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

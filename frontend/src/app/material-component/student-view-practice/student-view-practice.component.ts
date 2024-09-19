import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {DiplomaPracticeService} from "../../services/diploma-practice.service";
import {ScnackbarService} from "../../services/scnackbar.service";
import {jwtDecode} from "jwt-decode/build/esm";
import {MatTableDataSource} from "@angular/material/table";
import {GlobalConstants} from "../../shared/global-constants";
import {ConfirmationComponent} from "../dialog/confirmation/confirmation.component";


@Component({
  selector: 'app-student-view-practice',
  templateUrl: './student-view-practice.component.html',
  styleUrls: ['./student-view-practice.component.scss']
})
export class StudentViewPracticeComponent implements OnInit {

  displayedColumns: string[] = ['teacher_name', 'directionofthesis_name', 'description', 'edit'];

  dataSource: any;
  responseMesssage: any;
  studentLogin: any;
  isPractice = false;
  dataPracticeStudent: any;
  constructor(private dialog: MatDialog,
              private router: Router,
              private diplomapracticeService: DiplomaPracticeService,
              private scnackbarService: ScnackbarService) { }

  ngOnInit(): void {
    this.tableData();
    this.checkPracticeStudent();
  }
  checkPracticeStudent(): any {
    const data = {
      login: this.studentLogin
    };
    // @ts-ignore
    this.diplomapracticeService.checkPracticeForStudent(data).subscribe(
      (response: any): any => {
        console.log(response[0]?.ID);
        if (response[0]?.ID) {
          this.isPractice = true;
          this.dataPracticeStudent = response[0];
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
    const token: any = localStorage.getItem('token');
    const tokenPayLoad = jwtDecode(token);
    // @ts-ignore
    const email = tokenPayLoad.login;
    this.studentLogin = email;
    const data = {
      login: email
    };
    // @ts-ignore
    this.diplomapracticeService.getForStudent(data).subscribe(
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

  handleChoose(element: any): any{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Прив\'язати студента'
    };
    const dialogrefopen = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogrefopen.componentInstance.onEmitStatusChange.subscribe((user) => {
      console.log(element);
      dialogrefopen.close();
      const data = {
        id: element.ID,
        student_email: this.studentLogin
      };
      this.diplomapracticeService.setStudent(data).subscribe(
        (response: any): any => {
          this.responseMesssage = response?.message;
          this.scnackbarService.openSnackBar(this.responseMesssage, '');
          this.checkPracticeStudent();
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

import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DiplomaPracticeService} from '../../services/diploma-practice.service';
import {ScnackbarService} from '../../services/scnackbar.service';
import {MatTableDataSource} from '@angular/material/table';
import {GlobalConstants} from '../../shared/global-constants';
import {DiplomaPracticeComponent} from '../dialog/diploma-practice/diploma-practice.component';
import {ConfirmationComponent} from '../dialog/confirmation/confirmation.component';
import {jwtDecode} from 'jwt-decode';
import {UploadFileDocxComponent} from "../dialog/upload-file-docx/upload-file-docx.component";
import {
  TeacherPracticeMoreInformationComponent
} from "../dialog/teacher-practice-more-information/teacher-practice-more-information.component";
import {StudentViewTasksComponent} from "../student-view-tasks/student-view-tasks.component";
import {StudentViewResultfileComponent} from "../student-view-resultfile/student-view-resultfile.component";
import {StudentViewDiaryComponent} from "../student-view-diary/student-view-diary.component";
import {ChatViewComponent} from "../chat-view/chat-view.component";

@Component({
  selector: 'app-teacher-view-practice',
  templateUrl: './teacher-view-practice.component.html',
  styleUrls: ['./teacher-view-practice.component.scss']
})
export class TeacherViewPracticeComponent implements OnInit {

  displayedColumns: string[] = ['student_name', 'directionofthesis_name', 'description', 'edit'];

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
    this.diplomapracticeService.getForTeacher(data).subscribe(
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


  handleViewInformation(element: any): any{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80%';
    dialogConfig.data = element;
    const dialogRef = this.dialog.open(TeacherPracticeMoreInformationComponent, dialogConfig);
    this.router.events.subscribe((): any => {
      dialogRef.close();
    });
  }

  handleViewTasks(element: any): any {
    console.log(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80%';
    dialogConfig.data = {
      email: element.student_email
    };
    const dialogRef = this.dialog.open(StudentViewTasksComponent, dialogConfig);
    this.router.events.subscribe((): any => {
      dialogRef.close();
    });
  }

  handleViewReport(element: any): any{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80%';
    dialogConfig.data = {
      email: element.student_email
    };
    const dialogRef = this.dialog.open(StudentViewResultfileComponent, dialogConfig);
    this.router.events.subscribe((): any => {
      dialogRef.close();
    });
  }

  handleViewDiary(element: any): any{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80%';
    dialogConfig.data = {
      email: element.student_email
    };
    const dialogRef = this.dialog.open(StudentViewDiaryComponent, dialogConfig);
    this.router.events.subscribe((): any => {
      dialogRef.close();
    });
  }

  handleViewChat(element: any): any{
    console.log(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80%';
    dialogConfig.data = {
      studentEmail: element.student_email,
      teacherLogin: this.teacherLogin,
      practice_id: element.practice_id
    };
    console.log(dialogConfig.data);
    const dialogRef = this.dialog.open(ChatViewComponent, dialogConfig);
    this.router.events.subscribe((): any => {
      dialogRef.close();
    });
  }

  handleRemoveStudent(element: any): any{
    console.log(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Видалити'
    };
    const dialogrefopen = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogrefopen.componentInstance.onEmitStatusChange.subscribe((user) => {
      dialogrefopen.close();
      const data = {
        id: element.practice_id,
        student_email: element.student_email
      };
      this.diplomapracticeService.setNullForTeacher(data).subscribe(
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

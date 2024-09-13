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

@Component({
  selector: 'app-teacher-view-practice',
  templateUrl: './teacher-view-practice.component.html',
  styleUrls: ['./teacher-view-practice.component.scss']
})
export class TeacherViewPracticeComponent implements OnInit {

  displayedColumns: string[] = ['student_name', 'directionofthesis_name', 'edit'];

  dataSource: any;
  responseMesssage: any;
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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80%';
    dialogConfig.data = {
      email: element.email
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
      email: element.email
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
      email: element.email
    };
    const dialogRef = this.dialog.open(StudentViewDiaryComponent, dialogConfig);
    this.router.events.subscribe((): any => {
      dialogRef.close();
    });
  }

  handleViewChat(element: any): any{

  }
}

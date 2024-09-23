import { Component, OnInit } from '@angular/core';
import {DiplomaPracticeService} from '../../services/diploma-practice.service';
import {ScnackbarService} from '../../services/scnackbar.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {GlobalConstants} from '../../shared/global-constants';
import {jwtDecode} from 'jwt-decode';
import {ConfirmationComponent} from '../dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-teacher-view-topic-proposal',
  templateUrl: './teacher-view-topic-proposal.component.html',
  styleUrls: ['./teacher-view-topic-proposal.component.scss']
})
export class TeacherViewTopicProposalComponent implements OnInit {

  displayedColumns: string[] = ['student_name', 'group_name', 'directionofthesis_name', 'description', 'edit'];

  dataSource: any;
  responseMesssage: any;
  // tslint:disable-next-line:variable-name
  teacher_login: any;
  constructor(private dialog: MatDialog,
              private router: Router,
              private diplomaSerice: DiplomaPracticeService,
              private scnackbarService: ScnackbarService) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData(): any {
    const token: any = localStorage.getItem('token');
    const tokenPayLoad = jwtDecode(token);
    // @ts-ignore
    const email = tokenPayLoad.login;
    this.teacher_login = email;
    const data = {
      login: this.teacher_login
    };
    // @ts-ignore
    this.diplomaSerice.getTopicProposal(data).subscribe(
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
  handleApproveAction(element: any): any{
    console.log(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Підтвердити'
    };
    const dialogrefopen = this.dialog.open(ConfirmationComponent, dialogConfig);
    // @ts-ignore
    const sub = dialogrefopen.componentInstance.onEmitStatusChange.subscribe((user) => {
      dialogrefopen.close();
      const data = {
        id: element.practice_id,
        student_email: element.student_email,
        directionofthesis_name: element.directionofthesis_name,
        description: element.description,
        teacher_name: element.teacher_name,
        direction_id: element.direction_id,
        student_id: element.student_id
      };
      this.diplomaSerice.approveTopicProposole(data).subscribe(
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

  handleDeleteAction(element: any): any{
    console.log(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Видалити'
    };
    const dialogrefopen = this.dialog.open(ConfirmationComponent, dialogConfig);
    // @ts-ignore
    const sub = dialogrefopen.componentInstance.onEmitStatusChange.subscribe((user) => {
      dialogrefopen.close();
      const data = {
        id: element.practice_id,
        student_email: element.student_email,
        directionofthesis_name: element.directionofthesis_name,
        description: element.description,
        teacher_name: element.teacher_name
      };
      this.diplomaSerice.deleteTopicProposole(data).subscribe(
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

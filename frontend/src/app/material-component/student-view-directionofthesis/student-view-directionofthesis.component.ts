import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {DirectionofthesisService} from "../../services/directionofthesis.service";
import {ScnackbarService} from "../../services/scnackbar.service";
import {MatTableDataSource} from "@angular/material/table";
import {GlobalConstants} from "../../shared/global-constants";
import {DirectionofthesisComponent} from "../dialog/directionofthesis/directionofthesis.component";
import {ConfirmationComponent} from "../dialog/confirmation/confirmation.component";
import {jwtDecode} from "jwt-decode";
import {TopicProposalComponent} from "../dialog/topic-proposal/topic-proposal.component";
import {DiplomaPracticeService} from "../../services/diploma-practice.service";

@Component({
  selector: 'app-student-view-directionofthesis',
  templateUrl: './student-view-directionofthesis.component.html',
  styleUrls: ['./student-view-directionofthesis.component.scss']
})
export class StudentViewDirectionofthesisComponent implements OnInit {

  displayedColumns: string[] = ['user_name', 'name', 'edit'];
  dataSource: any;
  responseMesssage: any;
  // tslint:disable-next-line:variable-name
  student_login: any;
  isPractice = false;
  constructor(private dialog: MatDialog,
              private router: Router,
              private directionService: DirectionofthesisService,
              private diplomapracticeService: DiplomaPracticeService,
              private scnackbarService: ScnackbarService) { }

  ngOnInit(): void {
    this.checkPracticeStudent();
    this.tableData();

  }

  checkPracticeStudent(): any {
    const token: any = localStorage.getItem('token');
    const tokenPayLoad = jwtDecode(token);
    // @ts-ignore
    const email = tokenPayLoad.login;
    this.student_login = email;
    const data = {
      login: this.student_login
    };
    // @ts-ignore
    this.diplomapracticeService.checkPracticeForStudent(data).subscribe(
      (response: any): any => {
        console.log(response[0]?.ID);
        if (response[0]?.ID) {
          this.isPractice = true;
          console.log(this.isPractice);
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
    this.student_login = email;
    const data = {
      login: email
    };
    // @ts-ignore
    this.directionService.getForStudent(data).subscribe(
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
  handleEditAction(value: any): any{
    console.log(value);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.data = {
      direction_id: value.id,
      student_login: this.student_login
    };
    const dialogRef = this.dialog.open(TopicProposalComponent, dialogConfig);
    this.router.events.subscribe((): any => {
      dialogRef.close();
    });
  }

}

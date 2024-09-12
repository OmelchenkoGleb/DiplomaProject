import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {DiplomaPracticeService} from "../../services/diploma-practice.service";
import {ScnackbarService} from "../../services/scnackbar.service";
import {MatTableDataSource} from "@angular/material/table";
import {GlobalConstants} from "../../shared/global-constants";
import {DiplomaPracticeComponent} from "../dialog/diploma-practice/diploma-practice.component";
import {ConfirmationComponent} from "../dialog/confirmation/confirmation.component";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-teacher-view-practice',
  templateUrl: './teacher-view-practice.component.html',
  styleUrls: ['./teacher-view-practice.component.scss']
})
export class TeacherViewPracticeComponent implements OnInit {

  displayedColumns: string[] = ['student_name', 'directionofthesis_name', 'description', 'edit'];

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


}

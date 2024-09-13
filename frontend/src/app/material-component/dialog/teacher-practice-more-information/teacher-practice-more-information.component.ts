import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TeacherViewPracticeComponent} from "../../teacher-view-practice/teacher-view-practice.component";

@Component({
  selector: 'app-teacher-practice-more-information',
  templateUrl: './teacher-practice-more-information.component.html',
  styleUrls: ['./teacher-practice-more-information.component.scss']
})
export class TeacherPracticeMoreInformationComponent implements OnInit {
  displayColumns = ['student_name', 'specialty_name', 'directionofthesis_name', 'description', 'contact_number', 'email'];
  dataSource: any;
  data: any;
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
              public dialogRef: MatDialogRef<TeacherViewPracticeComponent>) {
    console.log(this.dialogData);
  }

  ngOnInit(): void {
    this.data = this.dialogData;
  }

}

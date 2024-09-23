import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChatService} from "../../../services/chat.service";
import {ScnackbarService} from "../../../services/scnackbar.service";
import {MatDialogRef} from "@angular/material/dialog";
import {jwtDecode} from "jwt-decode";
import {GlobalConstants} from "../../../shared/global-constants";
import {SpecialityService} from "../../../services/speciality.service";
import {DiplomaPracticeService} from "../../../services/diploma-practice.service";

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss']
})
export class CreateReportComponent implements OnInit {

  createReportForm: any = FormGroup;
  responseMesssage: any;
  groups: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private scnackbarService: ScnackbarService,
    private dialogRef: MatDialogRef<CreateReportComponent>,
    private specialityService: SpecialityService,
    private diplomaService: DiplomaPracticeService) {

  }

  ngOnInit(): void {
    this.createReportForm = this.formBuilder.group({
      groupID: [null, [Validators.required]],
      typeReport: [null, [Validators.required]]
    });
    this.getGroups();
  }

  getGroups(): any {
    // @ts-ignore
    this.specialityService.get().subscribe(
      (response: any): any => {
        this.groups = response;
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

  handleSubmit(): any {
    const createReportForm = this.createReportForm.value;
    const data = {
      group_id: createReportForm.groupID,
      typeReport: createReportForm.typeReport
    };
    console.log(data);
    this.diplomaService.getReport(data);
  }

}

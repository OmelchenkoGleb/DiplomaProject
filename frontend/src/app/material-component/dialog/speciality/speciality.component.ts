import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ScnackbarService} from '../../../services/scnackbar.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GlobalConstants} from '../../../shared/global-constants';
import {SpecialityService} from '../../../services/speciality.service';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss']
})
export class SpecialityComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  label_name: any;
  addSpecialityForm: any = FormGroup;
  responseMesssage: any;
  dialogAction: any = 'Add';
  action: any = 'Add';
  // tslint:disable-next-line:variable-name
  id_speciality: any;

  onAddUser = new EventEmitter();
  onEditUser = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private specialityService: SpecialityService,
    private scnackbarService: ScnackbarService,
    private dialogRef: MatDialogRef<SpecialityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.label_name = this.data.label_name;
    if (this.data?.data?.ID) { this.id_speciality = this.data.data.ID; }
  }

  ngOnInit(): void {
    this.addSpecialityForm = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
    if (this.data.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.addSpecialityForm.patchValue(this.data.data);
    }
  }

  handleSubmit(): any{
    if (this.dialogAction === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  add(): any{
    const formData = this.addSpecialityForm.value;
    const data = {
      name: formData.name
    };
    this.specialityService.add(data).subscribe(
      (response: any): any => {
        this.dialogRef.close();
        this.onAddUser.emit();
        this.responseMesssage = response?.message;
        this.scnackbarService.openSnackBar(this.responseMesssage, '');
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

  edit(): any{
    const formData = this.addSpecialityForm.value;
    const data = {
      name: formData.name,
      id: this.id_speciality
    };
    this.specialityService.update(data).subscribe(
      (response: any): any => {
        this.dialogRef.close();
        this.onEditUser.emit();
        this.responseMesssage = response?.message;
        this.scnackbarService.openSnackBar(this.responseMesssage, '');
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

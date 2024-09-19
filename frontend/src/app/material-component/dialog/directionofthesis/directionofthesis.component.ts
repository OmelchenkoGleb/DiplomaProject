import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {DirectionofthesisService} from '../../../services/directionofthesis.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ScnackbarService} from '../../../services/scnackbar.service';
import {GlobalConstants} from '../../../shared/global-constants';
import {SpecialityService} from "../../../services/speciality.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-directionofthesis',
  templateUrl: './directionofthesis.component.html',
  styleUrls: ['./directionofthesis.component.scss']
})
export class DirectionofthesisComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  label_name: any;
  addDirectionForm: any = FormGroup;
  responseMesssage: any;
  dialogAction: any = 'Add';
  action: any = 'Add';
  // tslint:disable-next-line:variable-name
  id_direction: any;

  onAddUser = new EventEmitter();
  onEditUser = new EventEmitter();

  groups: any = [];
  teachers: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private directionService: DirectionofthesisService,
    private specialityService: SpecialityService,
    private userService: UserService,
    private scnackbarService: ScnackbarService,
    private dialogRef: MatDialogRef<DirectionofthesisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.label_name = this.data.label_name;
    if (this.data?.data?.id) { this.id_direction = this.data.data.id; }
  }

  ngOnInit(): void {
    this.addDirectionForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      user_id: [null, [Validators.required]],
      group_id: [null, [Validators.required]]
    });
    if (this.data.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.addDirectionForm.patchValue(this.data.data);
    }
    this.getGroups();
    this.getTeachers();
  }

  handleSubmit(): any{
    if (this.dialogAction === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  add(): any{
    const formData = this.addDirectionForm.value;
    console.log(formData);
    const data = {
      name: formData.name,
      teacher_id: formData.user_id,
      group_id: formData.group_id
    };
    this.directionService.add(data).subscribe(
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
    const formData = this.addDirectionForm.value;
    const data = {
      name: formData.name,
      id: this.id_direction,
      teacher_id: formData.user_id,
      group_id: formData.group_id
    };
    this.directionService.update(data).subscribe(
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

  getTeachers(): any {
    // @ts-ignore
    this.userService.getTeacher().subscribe(
      (response: any): any => {
        this.teachers = response;
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

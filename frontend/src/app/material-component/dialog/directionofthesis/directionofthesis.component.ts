import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {DirectionofthesisService} from '../../../services/directionofthesis.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ScnackbarService} from '../../../services/scnackbar.service';
import {GlobalConstants} from '../../../shared/global-constants';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private directionService: DirectionofthesisService,
    private scnackbarService: ScnackbarService,
    private dialogRef: MatDialogRef<DirectionofthesisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.label_name = this.data.label_name;
    if (this.data?.data?.ID) { this.id_direction = this.data.data.ID; }
  }

  ngOnInit(): void {
    this.addDirectionForm = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
    if (this.data.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.addDirectionForm.patchValue(this.data.data);
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
    const formData = this.addDirectionForm.value;
    const data = {
      name: formData.name
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
      id: this.id_direction
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

}

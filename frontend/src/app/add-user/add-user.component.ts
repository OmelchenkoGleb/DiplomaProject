import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {ScnackbarService} from '../services/scnackbar.service';
import {MatDialogRef} from '@angular/material/dialog';
import {GlobalConstants} from '../shared/global-constants';
import {error} from "protractor";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addUserForm: any = FormGroup;
  responseMesssage: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private scnackbarService: ScnackbarService,
    private dialogRef: MatDialogRef<AddUserComponent>) { }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
      password: [null, [Validators.required]]
    });
  }

  handleSubmit(): any{
    const formData = this.addUserForm.value;
    const data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      password: formData.password
    };
    this.userService.addAdmin(data).subscribe(
      (response: any): any => {
      this.dialogRef.close();
      this.responseMesssage = response?.message;
      this.scnackbarService.openSnackBar(this.responseMesssage, '');
      this.router.navigate(['/']);
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

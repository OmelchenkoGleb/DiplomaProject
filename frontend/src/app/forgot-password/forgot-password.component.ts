// @ts-ignore

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {ScnackbarService} from '../services/scnackbar.service';
import {MatDialogRef} from '@angular/material/dialog';
import {GlobalConstants} from '../shared/global-constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  addUserForm: any = FormGroup;
  responseMesssage: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private scnackbarService: ScnackbarService,
    private dialogRef: MatDialogRef<ForgotPasswordComponent>) { }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]]
    });
  }

  handleSubmit(): any{
    const formData = this.addUserForm.value;
    const data = {
      email: formData.email
    };
    this.userService.forgotPassword(data).subscribe(
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

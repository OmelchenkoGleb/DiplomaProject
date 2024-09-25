import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {ScnackbarService} from "../../../services/scnackbar.service";
import {MatDialogRef} from "@angular/material/dialog";
import {GlobalConstants} from "../../../shared/global-constants";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: any = FormGroup;
  responseMesssage: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private scnackbarService: ScnackbarService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
  }

  validateSubmit(){
    if(this.changePasswordForm.controls.newPassword.value != this.changePasswordForm.controls.confirmPassword.value) {
      return true;
    } else { return false; }
  }
  handleSubmit(): any{
    const formData = this.changePasswordForm.value;
    const token: any = localStorage.getItem('token');
    const tokenPayLoad = jwtDecode(token);
    // @ts-ignore
    const email = tokenPayLoad.login;

    const data = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
      login: email
    };
    this.userService.changePassword(data).subscribe(
      (response: any): any => {
        this.dialogRef.close();
        this.responseMesssage = 'Успішно!';
        this.scnackbarService.openSnackBar(this.responseMesssage, '');
        this.router.navigate(['/main/dashboard']);
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

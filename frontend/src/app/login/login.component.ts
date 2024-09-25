import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {ScnackbarService} from '../services/scnackbar.service';
import {MatDialogRef} from '@angular/material/dialog';
import {GlobalConstants} from '../shared/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any = FormGroup;
  responseMesssage: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private scnackbarService: ScnackbarService,
    private dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null, [Validators.required]]
    });
  }

  handleSubmit(): any{
    const formData = this.loginForm.value;
    const data = {
      email: formData.email,
      password: formData.password
    };
    this.userService.login(data).subscribe(
      (response: any): any => {
        this.dialogRef.close();
        this.responseMesssage = 'Успішно!';
        localStorage.setItem('token', response.token);
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

import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ScnackbarService} from '../../../services/scnackbar.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GlobalConstants} from '../../../shared/global-constants';
import {SpecialityService} from '../../../services/speciality.service';
import {DiplomaPracticeService} from '../../../services/diploma-practice.service';
import {UserService} from '../../../services/user.service';
import {DirectionofthesisService} from '../../../services/directionofthesis.service';

@Component({
  selector: 'app-diploma-practice',
  templateUrl: './diploma-practice.component.html',
  styleUrls: ['./diploma-practice.component.scss']
})
export class DiplomaPracticeComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  label_name: any;
  addDiplomaPracticeForm: any = FormGroup;
  responseMesssage: any;
  dialogAction: any = 'Add';
  action: any = 'Add';
  // tslint:disable-next-line:variable-name
  id_diplomapractice: any;
  speciality: any = [];
  students: any = [];
  teachers: any = [];
  direction: any = [];

  onAddUser = new EventEmitter();
  onEditUser = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private diplomapracticeService: DiplomaPracticeService,
    private scnackbarService: ScnackbarService,
    private dialogRef: MatDialogRef<DiplomaPracticeComponent>,
    private specialityService: SpecialityService,
    private userService: UserService,
    private directionofthesis: DirectionofthesisService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.label_name = this.data.label_name;
    if (this.data?.data?.ID) { this.id_diplomapractice = this.data.data.ID; }
  }

  ngOnInit(): void {
    this.addDiplomaPracticeForm = this.formBuilder.group({
      description: [null, [Validators.required]],
      specialityId: [null, Validators.required],
      directionId: [null, Validators.required],
      studentID: [null, Validators.required],
      teacherID: [null, Validators.required]
    });
    if (this.data.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.addDiplomaPracticeForm.patchValue(this.data.data);
    }
    this.getSpeaciality();
    this.getDirectionOfThesis();
    this.getStudents();
    this.getTeachers();
  }

  getSpeaciality(): any {
    // @ts-ignore
    this.specialityService.get().subscribe(
      (response: any): any => {
        this.speciality = response;
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

  getStudents(): any {
    // @ts-ignore
    this.userService.getStudent().subscribe(
      (response: any): any => {
        this.students = response;
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

  getDirectionOfThesis(): any {
    // @ts-ignore
    this.directionofthesis.get().subscribe(
      (response: any): any => {
        this.direction = response;
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

  handleSubmit(): any{
    if (this.dialogAction === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  add(): any{
    const formData = this.addDiplomaPracticeForm.value;
    const data = {
      description: formData.description,
      speciality_id: formData.specialityId,
      directionofthesis_id: formData.directionId,
      student_id: formData.studentID,
      teacher_id: formData.teacherID
    };
    this.diplomapracticeService.add(data).subscribe(
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
    const formData = this.addDiplomaPracticeForm.value;
    const data = {
      id: this.id_diplomapractice,
      description: formData.description,
      speciality_id: formData.specialityId,
      directionofthesis_id: formData.directionId,
      student_id: formData.studentID,
      teacher_id: formData.teacherID
    };
    console.log(data);
    this.diplomapracticeService.update(data).subscribe(
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

  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Сбрасываем высоту
    textarea.style.height = `${textarea.scrollHeight}px`; // Устанавливаем высоту в соответствии с содержимым
  }
}

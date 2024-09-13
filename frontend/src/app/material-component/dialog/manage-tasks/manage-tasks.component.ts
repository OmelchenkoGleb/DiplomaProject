import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ScnackbarService} from '../../../services/scnackbar.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GlobalConstants} from '../../../shared/global-constants';
import {SpecialityService} from '../../../services/speciality.service';
import {StudentViewTasksComponent} from "../../student-view-tasks/student-view-tasks.component";
import {TasksService} from "../../../services/tasks.service";

@Component({
  selector: 'app-manage-tasks',
  templateUrl: './manage-tasks.component.html',
  styleUrls: ['./manage-tasks.component.scss']
})
export class ManageTasksComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  label_name: any;
  addTasksForm: any = FormGroup;
  responseMesssage: any;
  dialogAction: any = 'Add';
  action: any = 'Add';
  // tslint:disable-next-line:variable-name
  id_tasks: any;

  onAddTasks = new EventEmitter();
  onEditTasks = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tasksService: TasksService,
    private scnackbarService: ScnackbarService,
    private dialogRef: MatDialogRef<StudentViewTasksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.label_name = this.data.label_name;
    if (this.data?.data?.ID) { this.id_tasks = this.data.data.ID; }
  }

  ngOnInit(): void {
    this.addTasksForm = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
    if (this.data.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.addTasksForm.patchValue(this.data.data);
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
    const formData = this.addTasksForm.value;
    const data = {
      name: formData.name,
      email: this.data.email
    };
    this.tasksService.add(data).subscribe(
      (response: any): any => {
        this.dialogRef.close();
        this.onAddTasks.emit();
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
    const formData = this.addTasksForm.value;
    const data = {
      name: formData.name,
      id: this.id_tasks
    };
    console.log(data);
    this.tasksService.update(data).subscribe(
      (response: any): any => {
        this.dialogRef.close();
        this.onEditTasks.emit();
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

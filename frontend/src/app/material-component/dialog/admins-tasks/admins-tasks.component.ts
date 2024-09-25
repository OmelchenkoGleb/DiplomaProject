import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {GlobalConstants} from "../../../shared/global-constants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TasksService} from "../../../services/tasks.service";
import {Router} from "@angular/router";
import {ScnackbarService} from "../../../services/scnackbar.service";
import {ManageAdminsTasksComponent} from "../../manage-admins-tasks/manage-admins-tasks.component";

@Component({
  selector: 'app-admins-tasks',
  templateUrl: './admins-tasks.component.html',
  styleUrls: ['./admins-tasks.component.scss']
})
export class AdminsTasksComponent implements OnInit {

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
    private dialogRef: MatDialogRef<ManageAdminsTasksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.label_name = this.data.label_name;
    if (this.data?.data?.ID) { this.id_tasks = this.data.data.ID; }
  }

  ngOnInit(): void {
    this.addTasksForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      from_date: [null, [Validators.required]],
      to_date: [null, [Validators.required]]
    });
    if (this.data.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      console.log(this.data.data);
      this.addTasksForm.patchValue(this.data.data);
      console.log(this.addTasksForm);
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
      from_date: formData.from_date,
      to_date: formData.to_date
    };
    this.tasksService.addAdminsTask(data).subscribe(
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
      id: this.id_tasks,
      from_date: formData.from_date,
      to_date: formData.to_date
    };
    console.log(data);
    this.tasksService.updateForAdminsTasks(data).subscribe(
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

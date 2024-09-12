import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ResultfileService} from '../../../services/resultfile.service';
import {ScnackbarService} from '../../../services/scnackbar.service';
import {SpecialityComponent} from '../speciality/speciality.component';
import {GlobalConstants} from '../../../shared/global-constants';

@Component({
  selector: 'app-upload-file-docx',
  templateUrl: './upload-file-docx.component.html',
  styleUrls: ['./upload-file-docx.component.scss']
})
export class UploadFileDocxComponent implements OnInit {

  filetype: any;
  // tslint:disable-next-line:variable-name
  label_name: any;
  login: any;
  addFile: any = FormGroup;
  responseMesssage: any;
  selectedFile: File | null = null;
  selectedFileName = '';


  onAddFile = new EventEmitter();

  // @ts-ignore
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private resultfileServise: ResultfileService,
    private scnackbarService: ScnackbarService,
    private dialogRef: MatDialogRef<SpecialityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.label_name = this.data.label_name;
    this.filetype = this.data.file_type;
    this.login = this.data.login;
  }

  ngOnInit(): void {
    this.addFile = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
    } else {
      this.scnackbarService.openSnackBar('Оберіть лише файл формату doc, docx', GlobalConstants.error);
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.resultfileServise.uploadFileDoc(this.filetype, this.login, this.selectedFile, this.selectedFileName).subscribe(
        (response: any): any => {
          this.dialogRef.close();
          this.onAddFile.emit();
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
    } else {
      this.scnackbarService.openSnackBar('Спочатку оберіть файл', GlobalConstants.error);
    }
  }

  // handleSubmit(): any{
  //   const formData = this.addFile.value;
  //   const data = {
  //     name: formData.name
  //   };
  //   this.addFile.add(data).subscribe(
  //     (response: any): any => {
  //       this.dialogRef.close();
  //       this.onAddFile.emit();
  //       this.responseMesssage = response?.message;
  //       this.scnackbarService.openSnackBar(this.responseMesssage, '');
  //     },
  //     // tslint:disable-next-line:no-shadowed-variable
  //     (error: { error: { message: any; }; }) => {
  //       if (error.error?.message) {
  //         this.responseMesssage = error.error?.message;
  //       } else {
  //         this.responseMesssage = GlobalConstants.genericError;
  //       }
  //       this.scnackbarService.openSnackBar(this.responseMesssage, GlobalConstants.error);
  //     }
  //   );
  // }

}

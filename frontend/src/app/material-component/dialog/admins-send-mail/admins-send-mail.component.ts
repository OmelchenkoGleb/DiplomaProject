import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChatService} from '../../../services/chat.service';
import {ScnackbarService} from '../../../services/scnackbar.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {jwtDecode} from 'jwt-decode/build/esm';
import {GlobalConstants} from '../../../shared/global-constants';

@Component({
  selector: 'app-admins-send-mail',
  templateUrl: './admins-send-mail.component.html',
  styleUrls: ['./admins-send-mail.component.scss']
})
export class AdminsSendMailComponent implements OnInit {

  messageToAdminForm: any = FormGroup;
  email: any;
  responseMesssage: any;
  constructor(private formBuilder: FormBuilder,
              private chatService: ChatService,
              private scnackbarService: ScnackbarService,
              private dialogRef: MatDialogRef<AdminsSendMailComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit(): void {
    this.email = this.dialogData.mail;
    console.log(this.email);
    this.messageToAdminForm = this.formBuilder.group({
      description: [null, [Validators.required]]
    });
  }
  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Сбрасываем высоту
    textarea.style.height = `${textarea.scrollHeight}px`; // Устанавливаем высоту в соответствии с содержимым
  }

  handleSubmit(): any{
    const formData = this.messageToAdminForm.value;
    const data = {
      content: formData.description,
      email: this.email
    };
    this.chatService.sendMessageFromAdmins(data).subscribe(
      (response: any): any => {
        this.scnackbarService.openSnackBar('Лист успішно надіслано', '');
        this.dialogRef.close();
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

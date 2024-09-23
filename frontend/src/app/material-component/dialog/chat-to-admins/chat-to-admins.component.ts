import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {jwtDecode} from 'jwt-decode';
import {GlobalConstants} from "../../../shared/global-constants";
import {ChatService} from "../../../services/chat.service";
import {ScnackbarService} from "../../../services/scnackbar.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-chat-to-admins',
  templateUrl: './chat-to-admins.component.html',
  styleUrls: ['./chat-to-admins.component.scss']
})
export class ChatToAdminsComponent implements OnInit {

  messageToAdminForm: any = FormGroup;
  teacherLogin: any;
  responseMesssage: any;
  constructor(private formBuilder: FormBuilder, private chatService: ChatService, private scnackbarService: ScnackbarService, private dialogRef: MatDialogRef<ChatToAdminsComponent>,) { }

  ngOnInit(): void {
    const token: any = localStorage.getItem('token');
    const tokenPayLoad = jwtDecode(token);
    // @ts-ignore
    const email = tokenPayLoad.login;
    this.teacherLogin = email;
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
      teacherLogin: this.teacherLogin
    };
    this.chatService.sendMessageToAdmins(data).subscribe(
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

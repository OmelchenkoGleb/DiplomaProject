import {Component, Inject, OnInit, Optional} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {jwtDecode} from 'jwt-decode/build/esm';
import {GlobalConstants} from "../../shared/global-constants";
import {ScnackbarService} from "../../services/scnackbar.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DiplomaPracticeService} from "../../services/diploma-practice.service";

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {

  messages: any[] = [];
  newMessage = '';
  studentLogin = '1'; // Задай нужный ID чата
  conversationId = '1';
  // tslint:disable-next-line:variable-name
  sender_email: any;
  responseMesssage: any;

  isPractice = false;
  idPracticeStudent: any;
  tokenPayLoad: any;

  // tslint:disable-next-line:max-line-length
  constructor(private scnackbarService: ScnackbarService, private chatService: ChatService,
              private diplomapracticeService: DiplomaPracticeService,
              @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any) {}

  ngOnInit(): void {
    console.log('dialogData')
    console.log(this.dialogData);
    const token: any = localStorage.getItem('token');
    const tokenPayLoad: any = jwtDecode(token);
    this.tokenPayLoad = tokenPayLoad;
    // @ts-ignore
    const email = tokenPayLoad.login;
    // tslint:disable-next-line:triple-equals
    if (tokenPayLoad.user_type == 1) {
      this.studentLogin = email;
      this.checkPracticeStudent();
    }
    else this.studentLogin = this.dialogData.studentEmail;
    console.log(this.studentLogin);
    this.sender_email = email;
    // this.chatService.joinConversation(this.conversationId);
    if (tokenPayLoad.user_type == 2) this.loadMessages(this.dialogData.practice_id);
    // this.chatService.onNewMessage().subscribe((message) => {
    //   this.messages.push(message);
    // });
  }

  checkPracticeStudent(): any {
    const data = {
      login: this.studentLogin
    };
    // @ts-ignore
    this.diplomapracticeService.checkPracticeForStudent(data).subscribe(
      (response: any): any => {
        console.log(response[0]?.ID);
        if (response[0]?.ID) {
          console.log('rere');
          this.isPractice = true;
          this.idPracticeStudent = response[0]?.ID;
          this.loadMessages(response[0]?.ID);
        }
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
  // tslint:disable-next-line:variable-name
  loadMessages(practice_id: any): any{
    this.chatService.getMessages(practice_id).subscribe((data) => {
      this.messages = data;
    });
  }

  sendMessage(): any{
    if (this.newMessage.trim()) {
      // tslint:disable-next-line:variable-name
      var practice_id: any;
      if (this.tokenPayLoad.user_type == 1) practice_id = this.idPracticeStudent;
      else practice_id = this.dialogData.practice_id;
      const data = {
        practice_id: practice_id,
        senderLogin: this.sender_email,
        content: this.newMessage
      };
      this.chatService.setMessages(data).subscribe(
        (response: any): any => {
          if (this.tokenPayLoad.user_type == 1 && this.isPractice) this.loadMessages(this.idPracticeStudent);
          else this.loadMessages(this.dialogData.practice_id);
          this.scnackbarService.openSnackBar('Reload Chat', '');
          this.newMessage = '';
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

}

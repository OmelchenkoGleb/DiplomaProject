import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  url = environment.apiUrl;
  constructor(
    private httpClient: HttpClient
    // , private socket: Socket
  ) { }

  // Получить сообщения чата
  // tslint:disable-next-line:variable-name
  getMessages(practice_id: any): Observable<any> {
    console.log('email: ' + practice_id);
    const data = {
      practice_id: practice_id
    };
    return this.httpClient.post(this.url + '/chat/messagesFromChat', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  // get(data: any): any{
  //   return this.httpClient.post(this.url + '/tasks/get', data,
  //     {headers: new HttpHeaders().set('Content-Type', 'application/json')
  //     });
  // }

  // Отправить сообщение

  setMessages(data: any): Observable<any> {
    console.log(data);
    return this.httpClient.post(this.url + '/chat/sendmessage', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }
  sendMessageToAdmins(data: any): Observable<any> {
    console.log(data);
    return this.httpClient.post(this.url + '/chat/sendMessageToAdmins', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  // // Получать сообщения через сокет
  // onNewMessage(): Observable<any> {
  //   return this.socket.fromEvent('newMessage');
  // }
  //
  // // Присоединиться к чату
  // joinConversation(conversationId: any): any{
  //   this.socket.emit('joinConversation', conversationId);
  // }

  // getDetails(): any{
  //   return this.httpClient.get(this.url + '/dashboard/info');
  // }
  //
  // getDetailsForStudent(data: any): any{
  //   return this.httpClient.post(this.url + '/dashboard/infoForStudent', data,
  //     {headers: new HttpHeaders().set('Content-Type', 'application/json')
  //     });
  // }
  //
  // getDetailsForTeacher(data: any): any{
  //   return this.httpClient.post(this.url + '/dashboard/infoForTeacher', data,
  //     {headers: new HttpHeaders().set('Content-Type', 'application/json')
  //     });
  // }
}

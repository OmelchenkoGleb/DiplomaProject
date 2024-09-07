import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  addAdmin(data: any): any{
    return this.httpClient.post(this.url + '/user/addAdmin', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  forgotPassword(data: any): any{
    return this.httpClient.post(this.url + '/user/forgotPasssword', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  login(data: any): any{
    return this.httpClient.post(this.url + '/user/login', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  checkToken(): any{
    return this.httpClient.get(this.url + '/user/checkToken');
  }
}

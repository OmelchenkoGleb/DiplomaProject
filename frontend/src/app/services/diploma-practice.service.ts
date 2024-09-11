import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiplomaPracticeService {

  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  get(data: any): any{
    return this.httpClient.get(this.url + '/diploma_practice/get');
  }

  add(data: any): any{
    return this.httpClient.post(this.url + '/diploma_practice/add', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  update(data: any): any{
    return this.httpClient.patch(this.url + '/diploma_practice/update', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  delete(data: any): any{
    return this.httpClient.post(this.url + '/diploma_practice/delete', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }
}

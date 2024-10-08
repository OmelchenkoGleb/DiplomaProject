import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DirectionofthesisService {

  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  get(data: any): any{
    return this.httpClient.get(this.url + '/directionofthesis/get');
  }

  getForStudent(data: any): any{
    return this.httpClient.post(this.url + '/directionofthesis/getForStudent', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }
  getDirectionForTeacher(data: any): any{
    return this.httpClient.post(this.url + '/directionofthesis/getDirectionForTeacher', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  add(data: any): any{
    return this.httpClient.post(this.url + '/directionofthesis/add', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  update(data: any): any{
    return this.httpClient.patch(this.url + '/directionofthesis/update', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  delete(data: any): any{
    return this.httpClient.post(this.url + '/directionofthesis/delete', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }
}

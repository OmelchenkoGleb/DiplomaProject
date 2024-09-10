import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  get(data: any): any{
    return this.httpClient.get(this.url + '/speciality/get');
  }

  add(data: any): any{
    return this.httpClient.post(this.url + '/speciality/add', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  update(data: any): any{
    return this.httpClient.patch(this.url + '/speciality/update', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  delete(data: any): any{
    return this.httpClient.post(this.url + '/speciality/delete', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }
}

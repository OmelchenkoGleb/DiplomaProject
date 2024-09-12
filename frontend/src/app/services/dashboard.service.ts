import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = environment.apiUrl;
  constructor(
    private httpClient: HttpClient
  ) { }

  getDetails(): any{
    return this.httpClient.get(this.url + '/dashboard/info');
  }

  getDetailsForStudent(data: any): any{
    return this.httpClient.post(this.url + '/dashboard/infoForStudent', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  getDetailsForTeacher(data: any): any{
    return this.httpClient.post(this.url + '/dashboard/infoForTeacher', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }
}

import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  get(data: any): any{
    return this.httpClient.post(this.url + '/tasks/get', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  getTasksFromAdmins(): any{
    return this.httpClient.post(this.url + '/tasks/getTasksFromAdmins',
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  add(data: any): any{
    return this.httpClient.post(this.url + '/tasks/add', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  addAdminsTask(data: any): any{
    console.log(data);
    return this.httpClient.post(this.url + '/tasks/addAdminsTask', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  update(data: any): any{
    return this.httpClient.patch(this.url + '/tasks/update', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  updateForAdminsTasks(data: any): any{
    return this.httpClient.patch(this.url + '/tasks/updateForAdminsTasks', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  delete(data: any): any{
    return this.httpClient.post(this.url + '/tasks/delete', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  deleteTasksForAdmins(data: any): any{
    return this.httpClient.post(this.url + '/tasks/deleteTasksForAdmins', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  changeStatus(data: any): any{
    return this.httpClient.patch(this.url + '/tasks/changeStatus', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }
}

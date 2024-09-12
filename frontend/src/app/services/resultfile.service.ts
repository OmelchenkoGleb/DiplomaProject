import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResultfileService {

  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  get(data: any): any{
    return this.httpClient.post(this.url + '/resultfile/getReport', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  getDiary(data: any): any{
    return this.httpClient.post(this.url + '/resultfile/getDiary', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  getFile(id: number): Observable<Blob> {
    return this.httpClient.get(`${this.url}/resultfile/getFile/${id}`, { responseType: 'blob' });
  }

  delete(data: any): any{
    return this.httpClient.post(this.url + '/resultfile/delete', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  uploadFileDoc(filetype: any, login: any, file: File, filename: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // Додаємо файл до formData
    formData.append('filetype', filetype);
    formData.append('login', login);
    formData.append('filename', filename);
    return this.httpClient.post(this.url + '/resultfile/uploadDoc', formData);
  }
}

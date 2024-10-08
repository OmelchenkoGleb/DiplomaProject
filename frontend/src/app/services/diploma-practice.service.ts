import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

// @ts-ignore
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DiplomaPracticeService {

  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  get(data: any): any{
    return this.httpClient.post(this.url + '/diploma_practice/get', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }
  checkPracticeForStudent(data: any): any{
    return this.httpClient.post(this.url + '/diploma_practice/checkPracticeForStudent', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  setStudent(data: any): any{
    return this.httpClient.post(this.url + '/diploma_practice/setStudent', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  setNullForTeacher(data: any): any{
    return this.httpClient.post(this.url + '/diploma_practice/setNullForTeacher', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  getForStudent(data: any): any{
    return this.httpClient.post(this.url + '/diploma_practice/getForStudent', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }


  getForTeacher(data: any): any{
    return this.httpClient.post(this.url + '/diploma_practice/getForTeacher', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
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

  getTopicProposal(data: any): any{
    console.log(data);
    return this.httpClient.post(this.url + '/diploma_practice/getTopicProposal', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  topicProposal(data: any): any{
    return this.httpClient.post(this.url + '/diploma_practice/setTopicProposal', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  deleteTopicProposole(data: any): any{
    console.log(data);
    return this.httpClient.post(this.url + '/diploma_practice/deleteTopicProposole', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  approveTopicProposole(data: any): any{
    console.log(data);
    return this.httpClient.post(this.url + '/diploma_practice/approveTopicProposole', data,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  getReport(data: any): any{
    console.log(data)
    this.httpClient.post(this.url + '/diploma_practice/generateReport', data, { responseType: 'blob' }).subscribe((blob) => {
      saveAs(blob, 'звіт.xlsx');
    });
  }

}

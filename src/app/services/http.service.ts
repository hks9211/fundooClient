import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url = 'http://localhost:3000/';
  constructor(
    private http: HttpClient
  ) { }

  post(data: object, purpose: string) {
    return this.http.post(this.url + purpose, data);
  }

  postVerifyMail(data, purpose: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: localStorage.getItem('auth')
    });
    return this.http.post(this.url + purpose, data, { headers });
  }

  postResetPassword(data, purpose: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: localStorage.getItem('authPassword')
    });
    return this.http.post(this.url + purpose, data, { headers });
  }

  postRequest(data , purpose) {
    return this.http.post('http://localhost:3000/addnote' , data);
  }

  postRequestt(purpose , data) {
    return this.http.post(this.url + purpose , data);
  }

  get(purpose){
    var userId = localStorage.getItem('userId');
    return this.http.get(this.url + purpose+ "/" + userId);
  }
}

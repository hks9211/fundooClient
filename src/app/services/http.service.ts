import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = "http://localhost:3000/"
  constructor(
    private http: HttpClient
  ) { }

  post(data: object, purpose: string) {
    return this.http.post(this.url + purpose, data);
  }


  // headers.append("Authorization","Basic YW5ndWxhci13YXJlaG91c2Utc2VydmljZXM6MTIzNDU2");


  postVerifyMail(data, purpose: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': localStorage.getItem('auth')
    });
    return this.http.post(this.url + purpose, data, { headers: headers })
  }
}

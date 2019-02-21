import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  constructor(private http: HttpService) { }

  postHttpRequest(data , purpose) {
    return this.http.postRequest(data , purpose);
  }

  getCards(data) {
    return this.http.postRequestt('getNotes', data);
  }
}

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

  updateColor(data){
    return this.http.postRequestt('updateColor',data);
  }

  postUpdateNote(data){
    return this.http.postRequestt('updateNote',data);
  }

  getArchives(){
    return this.http.get('getArchives');
  }

  getTrash(){
    return this.http.get('getTrash');
  }

  getRelatedUsers(key){
    return this.http.getUsers('getAllUsers', key);
  }
}

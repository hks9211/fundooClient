import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  postRequest(data, purpose) {
    return this.http.post('http://localhost:3000/addnote', data);
  }

  postRequestt(purpose, data) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: localStorage.getItem('token')
    });
    return this.http.post(this.url + purpose, data ,{headers});
  }

  get(purpose) {
    var userId = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: localStorage.getItem('token')
    });
    return this.http.get(this.url + purpose + "/" + userId , {headers});
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
  uploadImage(image : File , purpose)  {
    const formData = new FormData();
    formData.append('image',image);
  
    return this.http.post(this.url + purpose  , formData);
  }

  updateProfilePic(imageUrl){
    var userId = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: localStorage.getItem('token')
    });
    var updateData = {
      'userId' : userId,
      'imgUrl' : imageUrl
    }
   return this.http.post(this.url + "updateImage" ,updateData , {headers})
  }

  getProfilePic(){
    var userId = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: localStorage.getItem('token')
    });
    return this.http.get(this.url + 'getProfilePic' + "/" + userId , {headers});
  }

  getUsers(purpose , key){
    return this.http.get(this.url + purpose + "/" + key );
  }

  addCollaborators(purpose , data){

    return this.http.post(this.url + purpose , data);
  }

  deleteNote(data , purpose){
    return this.http.get(this.url + purpose + "/" + data);
  }

  emptyTrash(purpose){
    var userId = localStorage.getItem('userId');
    return this.http.get(this.url + purpose + "/" + userId );
  }

  addLabel(data , purpose){
    return this.http.post(this.url + purpose , data );
  }

  getLabels(purpose) {
    var userId = localStorage.getItem('userId');
    return this.http.get(this.url + purpose + "/" + userId);
  }

  addLabelToNote(data , purpose){
    return this.http.post(this.url + purpose , data);
  }
}

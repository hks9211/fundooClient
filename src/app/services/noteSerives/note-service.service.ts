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
  addCollaborator(data){
    console.log("data at note Service",data);
    
    return this.http.addCollaborators('addCollaborator', data);
  }

  getReminders(){
    return this.http.get('getAllReminders');
  }

  deleteNoteForver(data){
    return this.http.deleteNote(data ,'deleteNoteForever');
  }

  emptyTrash(){
    return this.http.emptyTrash('emptyTrash');
  }

  addLabel(data){
    return this.http.addLabel(data ,'addLabel');
  }

  addLabelToNote(data){
  return this.http.addLabelToNote(data , 'updateLabel');
  }

  deleteLabel(id){
    return this.http.deleteLabel(id , 'deleteLabel');
  }

  restore(data){
    return this.http.restore(data , 'restore');
  }

  removeLabel(data){
    return this.http.removeLabel(data , 'removeLabelFromCard');
  }
}

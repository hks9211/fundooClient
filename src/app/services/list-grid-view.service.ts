import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListGridViewService {
  //  noteId : string = localStorage.getItem('noteId');

  private messageSource = new BehaviorSubject('row wrap');
  currentMessage = this.messageSource.asObservable();
  private noteIdSource = new BehaviorSubject("");
  currentNoteId = this.noteIdSource.asObservable();
  
  constructor() { 

   }

  changeMessage(message: string) {
    console.log("message at service: ",message);
    // localStorage.removeItem('noteId');

    this.messageSource.next(message);
  }

  toggleNoteId(noteId : string){
    console.log("noteId at service: ",noteId);
    this.noteIdSource.next(noteId);
    
  }
}

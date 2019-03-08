import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListGridViewService {

  private messageSource = new BehaviorSubject('row wrap');
  currentMessage = this.messageSource.asObservable();
  
  constructor() { }

  changeMessage(message: string) {
    console.log("message at service: ",message);
    
    this.messageSource.next(message);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteSerives/note-service.service';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  parentSubject: Subject<any>;
  items: any = [];
  noteId: any;
  updateColor: any;
  constructor(
    private noteServices: NoteServiceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getCards();
    this.parentSubject.subscribe(event => {
      this.items.push(event);
    });
  }

  receiveUpdateColorEvent($event){
    this.updateColor = $event;
    console.log("update color",this.updateColor);
  
  } 
  openUpdatePopup(item){
    this.noteId = item._id;
    console.log("note Id",this.noteId)
  }

  updateNoteColor(){
      const updateColorData = {
      'noteId': this.noteId,
      'color':this.updateColor
    }
    console.log(updateColorData);
    this.noteServices.updateColor(updateColorData ).subscribe(
      data => {
        this.snackBar.open('data updated', '', { duration: 2000 });
        console.log(' response: ', data);
        this.getCards();
      },
      error => {
        this.snackBar.open('data updation failed', '', { duration: 2000 });
        console.log('error response: ', error);
      }
    );
  }
  getCards() {
    if(this.noteId == null){
    console.log("note id:",this.noteId);
      
    const reqData = {
      userId: localStorage.getItem('userId')
    };
    this.noteServices.getCards(reqData).subscribe(
      data => {
        this.snackBar.open('All your notes are displayed here', '', { duration: 2000 });
        console.log(' response: ', data);
        this.items = data['response'];
        console.log(this.items);
      },
      error => {
        this.snackBar.open('Unable to display notes', '', { duration: 2000 });
        console.log('error response: ', error);
      }
    );
    }else{
      this.updateNoteColor()
    }
  }

}

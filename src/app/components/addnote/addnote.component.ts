import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { NoteServiceService } from 'src/app/services/noteSerives/note-service.service';
import { MatSnackBar } from '@angular/material';
import { CardComponent } from '../card/card.component'
@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.scss']
})
export class AddnoteComponent implements OnInit {
  reminderData: any = "";
  setColor = '#FFFFF';
  isArchive: any = false;

  constructor(private noteService: NoteServiceService ,
              private router: Router,
              private snackBar: MatSnackBar,
              ) { }
              
  @Output() childEvent = new EventEmitter<any>();

  flag = true;
  bgColor = '#FFFFF';
  message: string;

  noteTitle = new FormControl('',
   );
  noteContent = new FormControl('',
  ) ;
  ngOnInit() {
  }

  receiveMessage($event) {
    this.message = $event;
    this.bgColor = $event.color;
  }

  receiveReminderEvent($event){
    console.log("event received")
    this.reminderData = $event;
    console.log(this.reminderData.time)
  }

  receiveSetColorEvent($event){
    console.log("change color event received");
    this.setColor = $event;
    console.log(this.setColor);
  }

  receiveArchiveEvent($event){
    this.isArchive = $event;
    this.snackBar.open("archived","",{duration:1000})

    
    
  }
  reverseFlag() {
    this.flag = !this.flag;
  }

   addNote() {
    this.flag = !this.flag;
    try {

      if (this.noteTitle.value == '' || this.noteContent.value == '' ) {throw new Error('Note must contain a title and content'); }

      const newNoteData = {
      userId: localStorage.getItem('userId'),
      noteTitle: this.noteTitle.value,
      noteContent: this.noteContent.value,
      reminder: this.reminderData.time,
      color: this.setColor,
      isPined : false,
      isArchived : this.isArchive.isArchived,
      isDeleted : false
    };
      this.childEvent.emit(newNoteData);
      this.noteService.postHttpRequest(newNoteData , 'addNote').subscribe(
      data => {
        this.snackBar.open('Your note has been saved successfully', '', { duration: 2000 });
      },
      error => {
        this.snackBar.open('Note not saved', '', { duration: 2000 });
        console.log('error response: ', error);
      }
    );
     } catch (err) {
       this.snackBar.open(err, '', {duration: 1000});
     }
   }
  }

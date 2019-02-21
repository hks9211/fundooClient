import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { NoteServiceService } from 'src/app/services/noteSerives/note-service.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.scss']
})
export class AddnoteComponent implements OnInit {
  reminderData: any;

  constructor(private noteService: NoteServiceService ,
              private router: Router,
              private snackBar: MatSnackBar) { }
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
    this.reminderData = $event
    console.log(this.reminderData.time)
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
      reminder: '',
      color: '',
      isPined : false,
      isArchived : false,
      isDeleted : false
    };
      this.childEvent.emit(newNoteData);
      this.noteService.postHttpRequest(newNoteData , 'addNote').subscribe(
      data => {
        this.snackBar.open('Your note has been saved successfully', '', { duration: 2000 });

        console.log(' response: ', data);
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

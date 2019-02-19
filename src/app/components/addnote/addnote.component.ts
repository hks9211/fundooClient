import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
  }

  constructor(private noteService:NoteServiceService ,
     private router: Router,
     private snackBar : MatSnackBar) { }

  flag : boolean = true;
  bgColor : string ='#FFFFF';
  message:string;

  noteTitle = new FormControl('',
   );
  noteContent = new FormControl('',
  ) ;

  receiveMessage($event) {
    this.message = $event
    this.bgColor=$event.color;
  }

  reverseFlag() {
    this.flag = !this.flag;
  }

   addNote(){
    this.flag = !this.flag;

    var newNoteData = {
      'userId': localStorage.getItem('userId'),
      'noteTitle': this.noteTitle.value,
      'noteContent': this.noteContent.value,
      'reminder': '',
      'color': '',
      'isPined' : false,
      'isArchived' : false,
      'isDeleted' : false
    }
     this.noteService.postHttpRequest(newNoteData , "addNote").subscribe(
      data => {
        this.snackBar.open("Your note has been saved successfully", "", { duration: 2000 });

        console.log(" response: ", data);
      },
      error => {
        this.snackBar.open("Note not saved", "", { duration: 2000 });
        console.log("error response: ", error);
      }
    )


     }
     
   }



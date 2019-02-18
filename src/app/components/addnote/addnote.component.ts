import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.scss']
})
export class AddnoteComponent implements OnInit {

  flag = true;
  noteTitle: any;
  noteContent: any;
  model : any;
  constructor(private httpService: HttpService, private router: Router) { }



  ngOnInit() {
  }
 
  reverseFlag() {
    this.flag = !this.flag;
  }



   addNote(){
     this.flag = !this.flag;
     this.noteTitle=document.getElementById('noteTitle').innerHTML;
     this.noteContent = document.getElementById('noteContent').innerHTML;

     //console.log()
     if(this.noteTitle || this.noteContent)
     {
      this.model= {
         title : this.noteTitle,
         description : this.noteContent,
         labelIdList	: '',
         checklist   : '',
         isPined   : false,
         isArchived : false,
          color  : '',
          reminder : '',
          collaberators : ''
       }
     }
     
   }

}

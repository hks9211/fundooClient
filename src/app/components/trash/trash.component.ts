import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteSerives/note-service.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  items: any = [];

  constructor(
    private noteServices: NoteServiceService
  ) { }

  ngOnInit() {
    this.getTrash();
  }
 
  getTrash(){
    this.noteServices.getTrash().subscribe(
      data => {
       console.log("data at archive component",data);
       this.items = data['result'];
       console.log(this.items)

      },
      error => {
       console.log("error at archive component",error);   
      }
    )
  }
}
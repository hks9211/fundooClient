import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteSerives/note-service.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  constructor(
    private noteServices : NoteServiceService
  ) { }

  ngOnInit() {
    this.getArchives();
  } 
 
  getArchives(){
    this.noteServices.getArchives().subscribe(
      data => {
       console.log("data at archive component",data);
      },
      error => {
       console.log("error at archive component",error);   
      }
    )
  }
}

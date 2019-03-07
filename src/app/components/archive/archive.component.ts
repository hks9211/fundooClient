import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteSerives/note-service.service';
import { ListGridViewService } from 'src/app/services/list-grid-view.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  items: any = [];
  chooseView : String = "row wrap";

  constructor(
    private noteServices : NoteServiceService,
    private changeViewData : ListGridViewService

  ) { }

  ngOnInit() {
    this.getArchives();
    this.changeViewData.currentMessage.subscribe(message =>   this.chooseView = message);
  } 
 
  getArchives(){
    this.noteServices.getArchives().subscribe(
      data => {
       console.log("data at archive component",data);
       this.items = data['result'];

      },
      error => {
       console.log("error at archive component",error);   
      }
    )
  }
}

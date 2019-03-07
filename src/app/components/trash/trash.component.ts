import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteSerives/note-service.service';
import { ListGridViewService } from 'src/app/services/list-grid-view.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  items: any = [];
  chooseView : String = "row wrap";

  constructor(
    private noteServices: NoteServiceService,
    private changeViewData : ListGridViewService

  ) { }

  ngOnInit() {
    this.getTrash();
    this.changeViewData.currentMessage.subscribe(message =>   this.chooseView = message);

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

import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteSerives/note-service.service';
import { ListGridViewService } from 'src/app/services/list-grid-view.service';
import { MatSnackBar } from '@angular/material';

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
    private changeViewData : ListGridViewService,
    private snackBar : MatSnackBar

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

  unarchive(item){
    console.log(item);
    try{
   if(item._id == undefined || item._id == "") throw "note data missing"
   var unarchiveData = {
     '_id':item._id,
     'isArchived':false
   }
   this.noteServices.postUpdateNote(unarchiveData).subscribe(
     data => {
      console.log("post update archive data: ", data);
      this.snackBar.open("Unarchived successful" , "" , {duration : 2000});  
      this.getArchives();
     },
     error => {
      console.log("post update archive error: ", error);
      this.snackBar.open("Unarchived unsuccessful" , "" , {duration : 2000});  
     }
   )
    }catch(err){
      this.snackBar.open(err , "" , {duration : 2000});  
    }
    
  }
}

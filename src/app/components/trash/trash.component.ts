import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteSerives/note-service.service';
import { ListGridViewService } from 'src/app/services/list-grid-view.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  items: any = [];
  chooseView : String = "row wrap";
  noteId: any;

  constructor(
    private noteServices: NoteServiceService,
    private changeViewData : ListGridViewService,
    private snackBar : MatSnackBar

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

  getItemDetails(item){
    this.noteId = item._id;
    console.log(this.noteId);
    
  }

  deleteForever(){
   try{
   if(this.noteId == undefined || this.noteId == null  )throw "note id missing"
    this.noteServices.deleteNoteForver(this.noteId).subscribe(
      data => {
       this.getTrash();
       console.log("data after delelte",data);
       
      },
      error => {
       console.log("error");
       
      }
    )
    }catch(err){
      this.snackBar.open(err , "", {duration : 2000});
    }
  }

  emptyTrash(){    
    this.noteServices.emptyTrash().subscribe(
      data => {
       console.log("data at trash", data);
       this.getTrash();
      },
      error => {
        console.log("error at trash", error);
      }
    )
  }

  restore(){
    const updateData = {
      'noteId':this.noteId,
      'isDeleted':false
    }
   this.noteServices.restore(updateData).subscribe(
     data => {
       this.snackBar.open("Note Restored" , "" , {duration : 2000});
       this.getTrash();
     },
     error => {
      this.snackBar.open("Note Restorion Failed" , "" , {duration : 2000})
     }
   )
  }
}

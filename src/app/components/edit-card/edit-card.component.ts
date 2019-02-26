import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {

  noteTitle: any;
  noteContent: any;
  color: any;
  noteId : any;
  isDeleted : any = false;
  isArchived: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log("data at edit component:", data);
    this.noteTitle = new FormControl(data.noteTitle);
    this.noteContent = new FormControl(data.noteContent);
    this.noteId = data._id;
  }

  ngOnInit() { }

  receiveChangeColorEvent($event){    
    this.color = $event;
    this.data.color = this.color;
  }

  receiveDeletedNoteInfoEvent($event){
    console.log("received delete request event",$event);
    this.isDeleted = true;
  }

  getArchiveFromCardEvent($event){
    console.log("received archive",$event);
    this.isArchived = true;
  }
  save() {
    this.data.noteTitle=this.noteTitle.value;
    this.data.noteContent=this.noteContent.value;
    this.data.isDeleted= this.isDeleted;
    this.data.isArchived=this.isArchived;

    this.dialogRef.close({ data: this.data });
  }
}

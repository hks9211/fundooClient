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

  constructor(
    public dialogRef: MatDialogRef<EditCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log("data at edit component:", data);
    this.noteTitle = new FormControl(data.noteTitle);
    this.noteContent = new FormControl(data.noteContent);
  }

  ngOnInit() { }

  receiveChangeColorEvent($event){

    console.log("received color change event at edit card component",$event);
    
    this.color = $event;
    this.data.color = this.color;
  }

  save() {
    this.data.noteTitle=this.noteTitle.value;
    this.data.noteContent=this.noteContent.value;
    this.dialogRef.close({ data: this.data });
  }


}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NoteServiceService } from 'src/app/services/noteSerives/note-service.service';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent implements OnInit {
  value = ' ';

  constructor(
    private http: HttpService,
    private snackBar: MatSnackBar,
    private noteServices: NoteServiceService,
    public dialogRef: MatDialogRef<EditLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log("data at edit label" , data);
    
  }

  ngOnInit() {
  }
 
  addLabel(){
    try{
      if(this.value == "")throw "Label value csnt be empty"
      var userId = localStorage.getItem('userId');
      var labelData = {
        'userId': userId , 
        'labelName': this.value
      }
      this.noteServices.addLabel(labelData).subscribe(
        data => {
          this.snackBar.open("Label added " , "Done" , {duration : 2000});
         console.log("data after label added" , data);
         this.getLabels();
        },
        error => {
          this.snackBar.open("Label not added " , "" , {duration : 2000});
         console.log("error after label added" , error);
        }
      )
    }catch(err){
       this.snackBar.open(err , "" , {duration : 2000});
    }
    
  }

  getLabels(){

    this.http.getLabels('getLabels').subscribe(
     data => {
      console.log("getLabel data: ",(data as any).response);
      this.data = (data as any).response;
     },
     error => {
     console.log(error);
     
     }
    )
  }

 
}

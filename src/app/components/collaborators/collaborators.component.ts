import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { NoteServiceService } from 'src/app/services/noteSerives/note-service.service';
import { ListGridViewService } from 'src/app/services/list-grid-view.service';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.scss']
})
export class CollaboratorsComponent implements OnInit {
  picLink: any = "";
  email: any = "";
  firstName: any = "";
  lastName: any = "";
  count: Number = 0;
  noteData : any ;
  collabData : any;

  constructor(public dialogRef: MatDialogRef<CollaboratorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private noteService: NoteServiceService,
    private collabService : ListGridViewService,
    private snackBar : MatSnackBar
    ) {
    var user = JSON.parse(localStorage.getItem('loginUserData'));
    // console.log("data at collab: ", user)
    this.picLink = user.img;
    console.log("piclink: ", this.picLink);
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.noteData = data;
    console.log("data at collab: ",data.collab);
    this.collabData = data.collab;
  }

  ngOnInit() {
    
   }

  key = new FormControl();
  options: any = "";

  findSuggestions(count) {
    if (count > 2 && this.key.value) {
      this.noteService.getRelatedUsers(this.key.value).subscribe(
        data => {
          console.log("received response: ", data);
          this.options = (data as any).message;
        },
        error => {
          console.log("received error: ", error);
        }
      )
    }
  }

  selectedData(option){
    // console.log("note data is" , this.noteData);
    console.log("user: ",option);
   const addCollaboratorData = {
   'noteId' : this.noteData.note._id,
   'collaboratorId' :option._id,
   'ownerId': localStorage.getItem('userId')
   }
   const addDataToArray = {
     'firstName':option.firstName,
     'lastName':option.lastName,
     'email':option.email
   }
   this.noteService.addCollaborator(addCollaboratorData).subscribe(
     data => {
         console.log(data);
         this.collabData.push(addDataToArray);
         this.collabService.updateCollab(" ");
     },
     error => {
      console.log(error);
     }
   )
  }

  removeCollab(item){  
    // console.log("collab data: ",this.collabData);
    // console.log("at collab",this.noteData.note._id);
    var removeCollabData = {
      'collaboratorId':item._id,
      'noteId':this.noteData.note._id
    }
    this.noteService.removeCollab(removeCollabData).subscribe(
      data => {
     this.snackBar.open("Collaborator Removed","done",{duration : 2000})
     var index;
     for(let i = 0; i < this.collabData.length ; i++){
       if(this.collabData[i]._id == item._id){
        index = this.collabData[i]._id.indexOf(this.collabData[i]._id);  
       }
     }
    //  console.log(this.collabData.length);     
     this.collabData.splice(index, 1);
      },
      error => {
        this.snackBar.open("Collaborator not Removed","",{duration : 2000})
      }
    )
  }
}

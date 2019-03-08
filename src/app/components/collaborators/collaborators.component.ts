import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { NoteServiceService } from 'src/app/services/noteSerives/note-service.service';

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

  constructor(public dialogRef: MatDialogRef<CollaboratorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private noteService: NoteServiceService) {
    var user = JSON.parse(localStorage.getItem('loginUserData'));
    console.log("data at collab: ", user)
    this.picLink = user.img;
    console.log("piclink: ", this.picLink);
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }

  ngOnInit() { }

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
}

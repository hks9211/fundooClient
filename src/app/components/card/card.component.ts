import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteSerives/note-service.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  
  items : any = [];
  constructor(
    private noteServices : NoteServiceService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    this.getCards()
  }
 
  getCards(){
    var reqData = {
      'userId': localStorage.getItem('userId')
    }
    this.noteServices.getCards(reqData).subscribe(
      data => {
        this.snackBar.open("All your notes are displayed here", "", { duration: 2000 });
        console.log(" response: ", data);
        
        this.items = data['response'];
        console.log(this.items);
      },
      error => {
        this.snackBar.open("Unable to display notes", "", { duration: 2000 });
        console.log("error response: ", error);
      }
    )
  }
}

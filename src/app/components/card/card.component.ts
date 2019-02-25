import { Component, OnInit, Input } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteSerives/note-service.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  parentSubject: Subject<any>;
  items: any = [];
  noteId: any;
  updateColor: any;
  constructor(
    private noteServices: NoteServiceService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCards();
    this.parentSubject.subscribe(event => {
      this.items.push(event);
    });
  }

  receiveUpdateColorEvent($event) {
    this.updateColor = $event;
    console.log("update color on card", this.updateColor);
    this.getCards();
  }
  openUpdatePopup(item) {
    this.noteId = item._id;
    console.log("note Id", this.noteId)
  }

  // updateNoteColor(){
  //     const updateColorData = {
  //     'noteId': this.noteId,
  //     'color':this.updateColor
  //   }


  //   console.log(updateColorData);
  //   this.noteServices.updateColor(updateColorData ).subscribe(
  //     data => {
  //       this.snackBar.open('data updated', '', { duration: 2000 });
  //       console.log(' response: ', data);
  //       this.getCards();
  //     },
  //     error => {
  //       this.snackBar.open('data updation failed', '', { duration: 2000 });
  //       console.log('error response: ', error);
  //     }
  //   );
  // }
  getCards() {
    console.log("note id:", this.noteId);

    const reqData = {
      userId: localStorage.getItem('userId')
    };
    this.noteServices.getCards(reqData).subscribe(
      data => {
        this.items = data['response'];
        console.log(this.items);
      },
      error => {
        console.log('error response: ', error);
      }
    );
  }

  editCard(item) {
    const dialogRef = this.dialog.open(EditCardComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog updated content :', result, '\n updated data', item);
      this.noteServices.postUpdateNote(item).subscribe(
        data => {
        this.snackBar.open('Your note has been update successfully', '', { duration: 2000 });

        console.log(' response: ', data);
      },
      error => {
        this.snackBar.open('Note not updated', '', { duration: 2000 });
        console.log('error response: ', error);
      }
      )
    })

  }


}

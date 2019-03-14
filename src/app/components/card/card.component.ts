import { Component, OnInit, Input } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteSerives/note-service.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { ListGridViewService } from 'src/app/services/list-grid-view.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  parentSubject: Subject<any>;

  @Input() Search: string;


  items: any = [];
  noteId: any;
  updateColor: any;
  isArchived: boolean = false;
  chooseView : string = "row wrap";
  flag: string;
  userData: any = "";
  
  constructor(
    private noteServices: NoteServiceService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private changeViewData : ListGridViewService

  ) { }

  ngOnInit() {

    this.getCards();
    this.parentSubject.subscribe(event => {
      this.items.push(event);
    });
    this.changeViewData.currentMessage.subscribe(message =>   this.chooseView = message);
    console.log("flag value: ", this.flag);
    // this.chooseView = !!this.flag
    console.log("chooseview: ",this.chooseView);
    
  }

  receiveUpdateColorEvent($event) {
    this.updateColor = $event;
    console.log("update color on card", this.updateColor);
    this.getCards();
  }
  openUpdatePopup(item) {
    this.noteId = item._id;
    console.log("note Id", this.noteId);
   this.userData = item;
    // localStorage.setItem('noteId',this.noteId);
    this.changeViewData.toggleNoteId(this.noteId);



  }

  receiveDeletedNoteToTrashEvent($event) {
    console.log("delete note event received", $event);
    this.getCards();
  }

  receiveArchiveFromCard($event) {
    console.log("event at card for archive",$event);
    this.isArchived = true;
    this.updateArchive();
  }

  saveReminderOnCardEvent($event){
    console.log("event on card for reminder",$event);

    const item = {
      '_id':this.noteId,
      'reminder':$event
    }
    this.noteServices.postUpdateNote(item).subscribe(
      data => {
        this.getCards();
        this.snackBar.open('Reminder Added', '', { duration: 2000 });

      },
      error => {
        this.snackBar.open('Note not updated', '', { duration: 2000 });
        console.log('error response: ', error);
      }
    ) 
  }  


  updateArchive(){
    const updateArchiveData = {
      '_id' : this.noteId,
      'isArchived':this.isArchived
    }

  
    this.noteServices.postUpdateNote(updateArchiveData).subscribe(
      data => {
        this.snackBar.open("Archived","",{duration:1000})
        console.log("data after archive at card component",data);
        this.getCards();
      },
      error => {
        this.snackBar.open("Archived failed","",{duration:1000})
        console.log("Error after archive at card component",error);
      }
    )
  }

  getCards() {
    const reqData = {
      userId: localStorage.getItem('userId')
    };
    this.noteServices.getCards(reqData).subscribe(
      data => {
        this.items = data['response'];
        console.log("response for get all cards",data);
        
      },
      error => {
        this.snackBar.open("error occured while loading cards","",{duration:2000});
        console.log("error while loading cards",error);
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
          this.getCards();
        },
        error => {
          this.snackBar.open('Note not updated', '', { duration: 2000 });
          console.log('error response: ', error);
        }
      )
    })
  }

  removeReminder(item){
    console.log(item);
    item.reminder = "";
    this.noteServices.postUpdateNote(item).subscribe(
      data => {
        this.getCards();
        this.snackBar.open('Reminder Removed', '', { duration: 2000 });
      },
      error => {
        this.snackBar.open('Note not updated', '', { duration: 2000 });
        console.log('error response: ', error);
      }
    )
  }
}

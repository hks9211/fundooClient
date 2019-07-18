import { Component, OnInit, Input } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteSerives/note-service.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { ListGridViewService } from 'src/app/services/list-grid-view.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';


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
  noteData: any = "";
  labels : any;
  value: boolean = false;
  cards: any;
  pinedCards: any;
  unPinedCards: any;
  note:any = []

  
  constructor(
    private noteServices: NoteServiceService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private changeViewData : ListGridViewService,
    private http : HttpService,
    private router : Router

  ) { }

  ngOnInit() {

    this.getCards();
    this.parentSubject.subscribe(event => {
      console.log(event);
      
      if(event.isPined == false){
        var data = {
          note : event
        }
        this.unPinedCards.push(data);
        this.router.navigateByUrl('dashboard');

      }else{
        var data = {
          note : event
        }
        // this.note.push(data);
        this.pinedCards.push(data);
        // console.log("pinned cards: ",this.pinedCards);
      }  
      
    });
    this.changeViewData.currentMessage.subscribe(message =>   this.chooseView = message);
    // console.log("flag value: ", this.flag);
    // this.chooseView = !!this.flag
    // this.getLabels()
    this.changeViewData.collab.subscribe(message => this.getCards());
    
  }

  receiveUpdateColorEvent($event) {
    this.updateColor = $event;
    // console.log("update color on card", this.updateColor);
    this.getCards();
  }
  openUpdatePopup(item) {
    console.log(item._id);
    
    this.noteId =item._id;
    console.log("note Id", this.noteId);
   this.userData = item;
    this.changeViewData.toggleNoteId(this.noteId);
  }

  receiveDeletedNoteToTrashEvent($event) {
    // console.log("delete note event received", $event);
    this.getCards();
  }

  receiveArchiveFromCard($event) {
    // console.log("event at card for archive",$event);
     this.getCards();
  }

  saveReminderOnCardEvent($event){
    // console.log("event on card for reminder",$event);

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
  }

  getCards() {
    const reqData = {
      userId: localStorage.getItem('userId')
    };
    this.noteServices.getCards(reqData).subscribe(
      data => {
         this.items = data['response'];
        // console.log("response for get all cards",(data as any).response);
        // this.labels = (data as any).response[0].labels
        // console.log("labels on cards: ", this.labels);
       this.cards = (data as any).response; 
       this.pinedCards = this.cards.filter(function (el) {
        return (el.note.isPined === true);
        });

        this.unPinedCards = this.cards.filter(function (el) {
          return (el.note.isPined === false);
          });

        console.log("pinned cards: ",this.pinedCards);
        console.log("unpinned cards: ",this.unPinedCards);

        
        
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
      // console.log('dialog updated content :', result, '\n updated data', item);
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

  drop(event: CdkDragDrop<any[]>){
    moveItemInArray(this.items, event.previousIndex , event.currentIndex)
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(event.previousContainer.data,
  //                       event.container.data,
  //                       event.previousIndex,
  //                       event.currentIndex);
  //   }
  getSelectedLabels(item){
    let userId =  localStorage.getItem('userId');
    
    const userData = {
        'userId' : userId,
        'noteId' : item._id    
    }
// console.log("user data: ",userData);
  }

  receiveUpdateLabelsEvent($event){
    console.log($event);
    this.getCards();
  }

  removeLabel(label , item){
    console.log("label: ",label);
    console.log("item: ",item);

    var removeLabelData = {
      'noteId':item._id,
      'labelName':label.labelName
    }

    this.noteServices.removeLabel(removeLabelData).subscribe(
      data => {
       this.snackBar.open("Label removed", "" , {duration : 2000});
       this.getCards();
      },
      error => {
      this.snackBar.open("Label not removed", "" , {duration : 2000});  
      console.log(error); 
      }
    )
  }

  receiveImageUpdateEvent($event){
    // console.log($event);
    this.getCards();
    
  }
  reverseValue() {
    this.value = !this.value;
  }

  changePin(item){
    try{
     if(item._id == undefined) throw "unable to perform this operation";
     var updatePinData = {
       '_id':item._id,
       'isPined':!item.isPined
     }

     this.noteServices.postUpdateNote(updatePinData).subscribe(
       data => {
        this.snackBar.open("Done" , "", {duration : 1000});
        this.getCards();        
       },
       error => {
        this.snackBar.open("Failed" , "", {duration : 1000});
        console.log("after reesponse data: ",error);
       }
     )
    }catch(err){
      this.snackBar.open(err , "" , {duration : 1000});
    }
  }

}

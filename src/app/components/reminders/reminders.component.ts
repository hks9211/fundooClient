import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteSerives/note-service.service';
import { MatSnackBar } from '@angular/material';
import { ListGridViewService } from 'src/app/services/list-grid-view.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {
  items : any = [];
  chooseView : string = "row wrap"
  constructor(
    private noteServices : NoteServiceService,
    private snackBar: MatSnackBar,
    private changeViewData : ListGridViewService
  ) { }

  ngOnInit() {
    this.getReminders();
    this.changeViewData.currentMessage.subscribe(message =>   this.chooseView = message);

  }
  getReminders(){
    this.noteServices.getReminders().subscribe(
      data => {
       console.log("data at reminders component",data);
       this.items = data['result'];

      },
      error => {
       console.log("error at archive component",error);   
      }
    )
  }
  removeReminder(item){
    console.log(item);
    item.reminder = "";
    this.noteServices.postUpdateNote(item).subscribe(
      data => {
        this.getReminders();
        this.snackBar.open('Reminder Removed', '', { duration: 2000 });
      },
      error => {
        this.snackBar.open('Note not updated', '', { duration: 2000 });
        console.log('error response: ', error);
      }
    )
  }
}

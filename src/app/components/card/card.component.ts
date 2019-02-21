import { Component, OnInit, Input } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteSerives/note-service.service';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  parentSubject: Subject<any>;
  items: any = [];
  constructor(
    private noteServices: NoteServiceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getCards();

    this.parentSubject.subscribe(event => {
      this.items.push(event);
    });
  }

  getCards() {
    const reqData = {
      userId: localStorage.getItem('userId')
    };
    this.noteServices.getCards(reqData).subscribe(
      data => {
        this.snackBar.open('All your notes are displayed here', '', { duration: 2000 });
        console.log(' response: ', data);
        this.items = data['response'];
        console.log(this.items);
      },
      error => {
        this.snackBar.open('Unable to display notes', '', { duration: 2000 });
        console.log('error response: ', error);
      }
    );
  }
}

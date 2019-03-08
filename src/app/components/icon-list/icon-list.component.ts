import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { RecursiveTemplateAstVisitor } from '@angular/compiler';
import { FormControl, Validators } from '@angular/forms';
import { NoteServiceService } from 'src/app/services/noteSerives/note-service.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { CollaboratorsComponent } from '../collaborators/collaborators.component';


@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})
export class IconListComponent implements OnInit {

  constructor(
    private noteServices: NoteServiceService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  isMenuOpen = false;
  open = false;
  date = new FormControl('');
  time = new FormControl('');

  @Input() childMessage: any = "";
  @Input() noteIdForChild: any = "";

  @Output() messageEvent = new EventEmitter<any>();
  @Output() reminderEvent = new EventEmitter<any>();
  @Output() setColorEvent = new EventEmitter<any>();
  @Output() updateColorEvent = new EventEmitter<any>();
  @Output() archiveEvent = new EventEmitter<any>();
  @Output() changeColorForEditCard = new EventEmitter<any>();
  @Output() sendDeletedNoteToTrashEvent = new EventEmitter<any>();
  @Output() sendDeletedNoteInfoEvent = new EventEmitter<any>();
  @Output() archiveFromCardEvent = new EventEmitter<any>();
  @Output() archiveFromCard = new EventEmitter<any>();

  ngOnInit() { }

  colorArray = [[
    { 'color': 'rgb(255, 255, 255)', 'name': 'White' },
    { 'color': 'rgb(242, 139, 130)', 'name': 'Red' },
    { 'color': 'rgb(251, 188, 4)', 'name': 'Orange' },
    { 'color': 'rgb(255, 244, 117)', 'name': 'Yellow' }],

  [{ 'color': 'rgb(204, 255, 144)', 'name': 'Green' },
  { 'color': 'rgb(167, 255, 235)', 'name': 'Teal' },
  { 'color': 'rgb(203, 240, 248)', 'name': 'Blue' },
  { 'color': 'rgb(174, 203, 250)', 'name': 'Darkblue' }],

  [{ 'color': 'rgb(215, 174, 251)', 'name': 'Purple' },
  { 'color': 'rgb(253, 207, 232)', 'name': 'Pink' },
  { 'color': 'rgb(230, 201, 168)', 'name': 'Brown' },
  { 'color': 'rgb(232, 234, 237)', 'name': 'Gray' }
  ]]


  addReminder() {
    const reminderData = {
      'date': this.date.value,
      'time': this.time.value
    }
    console.log("reminder: ", reminderData)
    // this.reminderEvent.emit(reminderData);
  }

  archiveNewNote() {
    const archiveData = {
      'isArchived': true
    }
    this.archiveEvent.emit(archiveData);
    this.archiveFromCardEvent.emit(archiveData);
    this.archiveFromCard.emit(archiveData);
  }

  setColor(colorId) {
    this.setColorEvent.emit(colorId);
    this.changeColorForEditCard.emit(colorId);

    if (this.childMessage != "") {
      const updateColorData = {
        'noteId': this.childMessage,
        'color': colorId
      }
      this.noteServices.updateColor(updateColorData).subscribe(
        data => {
          console.log(' response: ', data);
          this.updateColorEvent.emit(colorId);
        },
        error => {
          console.log('error response: ', error);
        }
      );
    } else {
      console.log("not an update request");

    }
  }

  deleteNote() {
    var updateTrash = {};
    if (this.childMessage == "") {
      updateTrash = {
        '_id': this.noteIdForChild,
        'isDeleted': true
      }
    } else {
      updateTrash = {
        '_id': this.childMessage,
        'isDeleted': true
      }
    }
    this.noteServices.postUpdateNote(updateTrash).subscribe(
      data => {
        console.log(' response: ', data);
        this.snackBar.open("Note Deleted", "", { duration: 1000 });
        this.sendDeletedNoteToTrashEvent.emit("done");
        this.sendDeletedNoteInfoEvent.emit("done");
      },
      error => {
        console.log('error response: ', error);
        this.snackBar.open("Note not Deleted", "", { duration: 1000 })
      }
    );
  }

  openCollabWindow(){
    const dialogRef = this.dialog.open(CollaboratorsComponent, {
      autoFocus: false
    });
  }
}

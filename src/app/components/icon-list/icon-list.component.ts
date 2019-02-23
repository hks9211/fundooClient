import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { RecursiveTemplateAstVisitor } from '@angular/compiler';
import { FormControl, Validators } from '@angular/forms';
import { NoteServiceService } from 'src/app/services/noteSerives/note-service.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})
export class IconListComponent implements OnInit {

  constructor(
    private noteServices: NoteServiceService,
    private snackBar: MatSnackBar

  ) { }
  // object = { color: '#FFFFF' };

  message = 'Hola Mundo!';
  isMenuOpen = false;


  time = new FormControl('');

  @Input() childMessage: any = "";

  @Output() messageEvent = new EventEmitter<any>();
  @Output() reminderEvent = new EventEmitter<any>();
  @Output() setColorEvent = new EventEmitter<any>();
  @Output() updateColorEvent = new EventEmitter<any>();
  @Output() archiveEvent = new EventEmitter<any>();
  ngOnInit() {

  }

  // sendMessage() {
  //   this.messageEvent.emit(this.message);
  // }
  // color(value) {
  //   this.object.color = value;
  //   this.messageEvent.emit(this.object);
  // }
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
      'time': this.time
    }
    this.reminderEvent.emit(reminderData);
  }

  archiveNewNote() {
    const archiveData = {
      'isArchived': true
    }
    this.archiveEvent.emit(archiveData);
  }

  setColor(colorId) {
    this.setColorEvent.emit(colorId);
    console.log("set color", colorId)

    if (this.childMessage != "") {
      const updateColorData = {
        'noteId': this.childMessage,
        'color': colorId
      }
      console.log(updateColorData);
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


  printId() {
    console.log(this.childMessage);

  }
}

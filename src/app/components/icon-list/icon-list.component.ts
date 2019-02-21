import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RecursiveTemplateAstVisitor } from '@angular/compiler';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})
export class IconListComponent implements OnInit {

  constructor() { }
  object = { color: '#FFFFF' };

  message = 'Hola Mundo!';
  isMenuOpen = false;


  time = new FormControl('');


  @Output() messageEvent = new EventEmitter<any>();
  @Output() reminderEvent = new EventEmitter<any>();
  ngOnInit() {
  }

  // sendMessage() {
  //   this.messageEvent.emit(this.message);
  // }
  // color(value) {
  //   this.object.color = value;
  //   this.messageEvent.emit(this.object);
  // }

  addReminder() {
    const reminderData = {
      'time': this.time
    }
    this.reminderEvent.emit(reminderData);
  }
}

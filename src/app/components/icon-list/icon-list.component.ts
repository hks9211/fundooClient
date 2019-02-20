import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RecursiveTemplateAstVisitor } from '@angular/compiler';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})
export class IconListComponent implements OnInit {

  constructor() { }
object={color:"#FFFFF"}

  ngOnInit() {
  }
  
  showReminder : boolean;
  reminder : boolean = true; 

  message: string = "Hola Mundo!"

  @Output() messageEvent = new EventEmitter<any>();


  sendMessage() {
    this.messageEvent.emit(this.message)
  }
  color(value){
    this.object.color=value;
   this.messageEvent.emit(this.object)
  }

  toShowReminder(){
    this.showReminder = !this.showReminder;
  }
  toggleReminder(){
  this.reminder = !this.reminder;
  }
}

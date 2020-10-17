import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {
  value: boolean = false;
  @Input() noteData;

  constructor() { }

  ngOnInit() {
    console.log("noteData at pin: ",this.noteData);
    
  }
  reverseValue() {
    this.value = !this.value;
  }
}

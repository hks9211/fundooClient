import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {
  value: boolean = false;

  constructor() { }

  ngOnInit() {
  }
  reverseValue() {
    this.value = !this.value;
  }
}

import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-testcropper',
  templateUrl: './testcropper.component.html',
  styleUrls: ['./testcropper.component.scss']
})
export class TestcropperComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

    imageChangedEvent: any = '';
    croppedImage: any = '';
    imageFileChanged: any = '';
    
    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event) {
      console.log("event at 23: ", event);
      
        this.croppedImage = event.base64;
    }
    addImage(croppedImage){
      console.log(croppedImage);
    }

    imageLoaded() {
        // show cropper
    }

    cropperReady() {
        // cropper ready
    }

    loadImageFailed() {
        // show message
    }
}

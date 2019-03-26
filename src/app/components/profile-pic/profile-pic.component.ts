import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { HttpService } from 'src/app/services/http.service';
import { MatSnackBar } from '@angular/material';
import { ListGridViewService } from 'src/app/services/list-grid-view.service';

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss']
})
export class ProfilePicComponent implements OnInit {
  
  picLink : any;
  imageChangedEvent: any = '';
 flag : boolean = false;
croppedImage: any = '';
  constructor(private http : HttpService, private snackBar:MatSnackBar,
    private data : ListGridViewService) { }

  ngOnInit() {
  }

  onSelectedFile(event) {
    this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.file;
    }

    changeFlag(){
      this.flag = true;
    }

    addImage(croppedImage){
       console.log("cropped image: ",croppedImage);
      // try{
        // if(croppedImage == undefined || croppedImage.trim() == "") throw "error"
        
      this.http.uploadImage(croppedImage, 'image-upload').subscribe(
        data => {
          // console.log("data got after image upload", data)
           this.picLink = data['imgUrl'];
            // console.log("link: ", this.picLink);
          // this.showProfilepic(this.picLink);
          this.showProfilepic(this.picLink);
          this.data.updateProfilePic(this.picLink);
        },
        error => {
          // console.log("error after image upload: ", error);
          this.snackBar.open("Error in uploading profile pic","",{duration: 2000});
        }
      )
      // }catch(err){
      //   this.snackBar.open("Error in uploading profile pic","",{duration: 2000});
      // }
    }

    showProfilepic(imageUrl) {
      //  try{
      //  if(imageUrl == undefined || imageUrl == "") throw "error"
      this.http.updateProfilePic(imageUrl).subscribe(
        data => {
          this.picLink = data['message']['img'];
          this.snackBar.open("Profile picture uploaded","done",{duration: 2000});
          // console.log("after save link: ", this.picLink);
          // this.getProfilePic();
        },
        error => {
          // console.log(error);
          this.snackBar.open("Error in uploading profile pic","",{duration: 2000});
        }
      )
      //  }catch(err){
      //    this.snackBar.open("Error in uploading profile pic","No image found",{duration: 2000});
      //  }
     }

}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  mobileQuery: MediaQueryList;
  fillerNav = Array.from({ length: 5 }, (_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;
  parentSubject: Subject<any> = new Subject();
  picLink: any = "";
  display: any;
  userData: any;


  constructor
    (
      private spinnerService: Ng4LoadingSpinnerService,
      changeDetectorRef: ChangeDetectorRef,
      media: MediaMatcher,
      private router: Router,
      public dialog: MatDialog,
      private http : HttpService

    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.spinnerService.show();
    this.getProfilePic();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  addNote(event) {
    console.log('event occur', event);
    this.parentSubject.next(event);
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }
  
  openEditLabelDialog(){
    const dialogRef = this.dialog.open(EditLabelComponent, {
    }); 
  }

  uploadImage(imageInput){
    // debugger;
    const file : File = imageInput.files[0];
    console.log("sdsdsdsdsdsdsd",file);
// console.log(imageInput.files[0]);    
    this.http.uploadImage(file, 'image-upload').subscribe(
      data => {
        console.log("data got after image upload",data)
        this.picLink = data['imgUrl'];
        console.log("link: ", this.picLink);
         this.showProfilepic(this.picLink);

        
      },
      error => {
       console.log("error after image upload: ",error);
        
      }
    )
   }

   showProfilepic(imageUrl){
    this.http.updateProfilePic(imageUrl).subscribe(
      data => {
      this.picLink =  data['message']['img'];
      console.log("after save link: ",this.picLink);
      // this.getProfilePic();
      },
      error => {
        console.log(error);
      }
    )
   }

   getProfilePic(){
      this.http.getProfilePic().subscribe(
        data => {
          this.picLink =  (data as any).message[0].img;
          this.userData = (data as any).message[0];
          console.log(this.userData);
          
          },
          error => {
            console.log(error);
          }
      )
   }
}

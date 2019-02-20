import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  mobileQuery: MediaQueryList;
  fillerNav = Array.from({length: 5}, (_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;
  parentSubject:Subject<any> = new Subject();
 

  constructor
  (
    private spinnerService: Ng4LoadingSpinnerService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
  ) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.spinnerService.show();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
addNote(event){
console.log('event occur',event);
this.parentSubject.next(event);
}


 


}

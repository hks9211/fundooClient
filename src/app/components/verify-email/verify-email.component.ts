import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private HttpService: HttpService,
    private snackBar: MatSnackBar


  ) { }

  ngOnInit() {
    let tokens = this.route.snapshot.params['token'];
    console.log(tokens);
    
    localStorage.setItem('auth',tokens);
    
    var obj = {};
    // const token = localStorage.getItem('auth');
    this.HttpService.postVerifyMail(obj, "verifyEmail" ).subscribe(
      data => {
        this.snackBar.open("Sign up completed successfully. Please proceed Sign In" , "",{duration : 5000});
        console.log(" response: ",data);
  
      },
      error => {
        this.snackBar.open("email verification failed" , "",{duration : 5000});
        console.log("error response: ",error);
        
  })
    
 
    
    // let userToken: string;
    // this.sub = this.router
    //   .routerState
    //   .queryParams
    //     userToken = params['token'];
    //     params['token'].remove();
      

}
}
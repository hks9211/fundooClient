import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormControl } from '@angular/forms';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor
  (
    private route: ActivatedRoute,
    private HttpService: HttpService,
    private snackBar: MatSnackBar
  ) { }

  newPassword = new FormControl('',
  [Validators.required,
  Validators.minLength(8),
  Validators.maxLength(25)
  ]);

  ngOnInit() {
    let tokens = this.route.snapshot.params['token'];
    console.log(tokens);
    
    localStorage.setItem('authPassword',tokens);

    
  }

   resetPassword(){
       
    var resetPasswordData = {
      'password': this.newPassword.value
    }
    this.HttpService.postVerifyMail(resetPasswordData, "verifyEmail" ).subscribe(
      data => {
        this.snackBar.open("reset password successfully. Please proceed Sign In" , "",{duration : 5000});
        console.log(" response: ",data);
  
      },
      error => {
        this.snackBar.open("reset password failed" , "",{duration : 5000});
        console.log("error response: ",error);
        
  })


  }

  errorMessageForPassword() {
    return this.newPassword.hasError('required') ? 'You must enter a password' :
      this.newPassword.hasError('pattern') ? 'Your first name should only have alphabets' :
        this.newPassword.hasError('minlength') ? 'Your password should be between 4-25 characters' :
          this.newPassword.hasError('maxlength') ? 'Your password should be between 4-25 characters' :
            '';
  }

  

}

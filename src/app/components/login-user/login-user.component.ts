import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {

  constructor
  (  
     private HttpService: HttpService,
    private router: Router,
    private snackBar: MatSnackBar
    ) {}

  ngOnInit() {
  }

  email = new FormControl('',
  [Validators.required, Validators.minLength(12),
  Validators.maxLength(25),
  Validators.email
  ]);

  password = new FormControl('',
    [Validators.required,
    Validators.minLength(8),
    Validators.maxLength(25)
    ]);

    errorMessageForEmail() {
      return this.email.hasError('required') ? 'You must enter an email' :
        this.email.hasError('email') ? 'invalid email' :
          // this.email.hasError('minlength') ? 'Your email name should be between 4-25 characters' :
          // this.email.hasError('maxlength') ? 'Your email should be between 4-25 characters' : 
          '';
    }
    errorMessageForPassword() {
      return this.password.hasError('required') ? 'You must enter a password' :
        this.password.hasError('pattern') ? 'Your first name should only have alphabets' :
          this.password.hasError('minlength') ? 'Your password should be between 4-25 characters' :
            this.password.hasError('maxlength') ? 'Your password should be between 4-25 characters' :
              '';
    }

    loginUser(){
       
      var newLogin = {
        'email': this.email.value,
        'password': this.password.value
      }

      this.HttpService.post(newLogin, "login").subscribe(
        data => {
          this.snackBar.open("Signed in successfully " , "",{duration : 5000});
          console.log(" response: ",data);
  
        },
        error => {
          this.snackBar.open("Sign in failed. check your credentials " , "",{duration : 5000});
          console.log("error response: ",error);
          
        }
  
      )
    }

}

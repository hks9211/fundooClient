import { Component, OnInit } from '@angular/core';
import { Register } from '../../../models/registerModel'
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { error } from '@angular/compiler/src/util';
import { SimpleSnackBar, MatSnackBar , ErrorStateMatcher } from '@angular/material';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {



  ngOnInit() {
  }

  constructor(
    private HttpService: HttpService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }
  // newUser: Register = new Register();

  firstName = new FormControl('',
    [Validators.required, Validators.minLength(4),
    Validators.pattern(new RegExp(/^[a-z ,.'-]+$/i)),
    Validators.maxLength(25)
    ]);

  lastName = new FormControl('',
    [Validators.required, Validators.minLength(4),
    Validators.maxLength(25)
    ]);

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

  confirmPassowrd = new FormControl('',
    [Validators.required,
    Validators.minLength(8),
    Validators.maxLength(25)
    ]);

  errorMessageForFirstName() {
    console.log(this.firstName.errors);
    
    return this.firstName.hasError('required') ? 'You must enter a First Name' :
      this.firstName.hasError('pattern') ? 'Your first name should only have alphabets' :
        this.firstName.hasError('minlength') ? 'Your first name should be between 4-25 characters' :
          this.firstName.hasError('maxlength') ? 'Your first name should be between 4-25 characters' :
            '';
  }

  errorMessageForLastName() {
    return this.lastName.hasError('required') ? 'You must enter a last Name' :
      //  this.firstName.hasError('pattern') ? 'Your first name should only have alphabets' :
      this.lastName.hasError('minlength') ? 'Your first name should be between 4-25 characters' :
        this.lastName.hasError('maxlength') ? 'Your first name should be between 4-25 characters' :
          '';
  }
  errorMessageForEmail() {
    return this.email.hasError('required') ? 'You must enter an email' :
      this.email.hasError('email') ? 'invalid email' :
        // this.email.hasError('minlength') ? 'Your email name should be between 4-25 characters' :
        // this.email.hasError('maxlength') ? 'Your email should be between 4-25 characters' : 
        '';
  }
  errorMessageForPassword() {
    return this.password.hasError('required') ? 'You must enter a password' :
      this.firstName.hasError('pattern') ? 'Your first name should only have alphabets' :
        this.password.hasError('minlength') ? 'Your password should be between 4-25 characters' :
          this.password.hasError('maxlength') ? 'Your password should be between 4-25 characters' :
            '';
  }

  registerNewUser() {
    var newUser = {
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'email': this.email.value,
      'password': this.password.value
    }
    console.log("userdata = ", newUser)

    this.HttpService.post(newUser, "register").subscribe(
      data => {
        this.snackBar.open("Sign up completed successfully. Now verify your Email to Sign In" , "",{duration : 5000});
        console.log(" response: ",data);

      },
      error => {
        this.snackBar.open("Sign up failed. check your inputs please" , "",{duration : 5000});
        console.log("error response: ",error);
        
      }

    )
  }




}

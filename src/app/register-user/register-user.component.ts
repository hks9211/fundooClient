import { Component, OnInit } from '@angular/core';
import { Register } from '../../../models/registerModel';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { error } from '@angular/compiler/src/util';
import { SimpleSnackBar, MatSnackBar, ErrorStateMatcher } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';



@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  constructor(
    private HttpService: HttpService,
    private router: Router,
    private snackBar: MatSnackBar,
    private spinnerService: Ng4LoadingSpinnerService

  ) { }

  errorMessageForEmptyField = '';
  // newUser: Register = new Register();

  firstName = new FormControl('',
    [Validators.required, Validators.minLength(4),
    Validators.pattern(new RegExp(/^[a-z ,.'-]+$/i)),
    Validators.maxLength(25)
    ]);

  lastName = new FormControl('',
    [Validators.required, Validators.minLength(4),
    Validators.pattern(new RegExp(/^[a-z ,.'-]+$/i)),
    Validators.maxLength(25)
    ]);

  email = new FormControl('',
    [Validators.required, Validators.minLength(12),
    Validators.maxLength(55),
    Validators.email
    ]);

  password = new FormControl('',
    [Validators.required,
    Validators.pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/)),
    Validators.minLength(8),
    Validators.maxLength(25)
    ]);

  confirmPassword = new FormControl('',
    [Validators.required,
    Validators.pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/)),
    Validators.minLength(8),
    Validators.maxLength(25)
    ]);
  ngOnInit() {
  }


  errorMessageForFirstName() {
    return this.firstName.hasError('required') ? 'Enter first Name' :
      this.firstName.hasError('pattern') ? 'First name should only have alphabets' :
        this.firstName.hasError('minlength') ? 'First name limit is 8-25 characters' :
          this.firstName.hasError('maxlength') ? 'First name limit is 8-25 characters' :
            '';
  }

  errorMessageForLastName() {
    return this.lastName.hasError('required') ? 'Enter last Name' :
      this.firstName.hasError('pattern') ? 'Last name should only have alphabets' :
        this.lastName.hasError('minlength') ? 'Last limit is 8-25 characters' :
          this.lastName.hasError('maxlength') ? 'Last limit is 8-25 characters' :
            '';
  }
  errorMessageForEmail() {
    return this.email.hasError('required') ? 'Enter an email' :
      this.email.hasError('email') ? 'Invalid email' :
        // this.email.hasError('minlength') ? 'Your email name should be between 4-25 characters' :
        // this.email.hasError('maxlength') ? 'Your email should be between 4-25 characters' :
        '';
  }
  errorMessageForPassword() {
    return this.password.hasError('required') ? 'Enter a password' :
      this.password.hasError('pattern') ? 'Password should be alphanumeric' :
        this.password.hasError('minlength') ? 'Password limit is 8-25 characters' :
          this.password.hasError('maxlength') ? 'Password limit is 8-25 characters' :
            '';
  }

  errorMessageForConfirmPassword() {
    return this.confirmPassword.hasError('required') ? 'Enter a password' :
      this.confirmPassword.hasError('pattern') ? 'Password should be alphanumeric' :
        this.confirmPassword.hasError('minlength') ? 'Password limit is 8-25 characters' :
          this.confirmPassword.hasError('maxlength') ? 'Password limit is 8-25 characters' :
            '';
  }

  registerNewUser() {
    this.spinnerService.show();
    try {
      if (this.firstName.value == '' || this.lastName.value == '' || this.password.value == '' || this.email.value == '') { throw new Error('Any field cant be left empty'); }
      if (this.confirmPassword.value != this.password.value) { throw new Error('Password and Confirm Password do not match'); }


      const newUser = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        password: this.password.value,
        cardId:"",
        service:"advance"
      };

      this.HttpService.post(newUser, '/user/userSignUp').subscribe(
        data => {
          this.snackBar.open('Sign up completed successfully.', '', { duration: 3000 });
          this.router.navigateByUrl('login')

          console.log(' response: ', data);
        },
        error => {
          this.snackBar.open('Sign up failed. check your inputs please', '', { duration: 5000 });
          console.log('error response: ', error);
        }
      );
    } catch (err) {
      this.snackBar.open(err, '', { duration: 5000 });
    }
  }




}
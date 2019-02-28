import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Validators, FormControl } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


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
      private snackBar: MatSnackBar,
      private spinnerService: Ng4LoadingSpinnerService
    ) { }

  email = new FormControl('',
    [Validators.required, Validators.minLength(12),
    Validators.maxLength(25),
    Validators.email
    ]);

  password = new FormControl('',
    [Validators.required,
    Validators.pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/)),
    Validators.minLength(8),
    Validators.maxLength(25)
    ]);

  ngOnInit() {
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
      this.password.hasError('pattern') ? 'Password must be alphanumeric' :
        this.password.hasError('minlength') ? 'Password limit - 4-25 characters' :
          this.password.hasError('maxlength') ? 'Password limit - 4-25 characters' :
            '';
  }
  loginUser() {
    this.spinnerService.show();

    try {
      if (this.email.value == '' || this.password.value == '') { throw new Error('Any field can\'t be left empty'); }

      const newLogin = {
        email: this.email.value,
        password: this.password.value
      };
      this.HttpService.post(newLogin, 'login').subscribe(
        data => {
          this.snackBar.open('Signed in successfully ', '', { duration: 5000 });
          console.log(' response: ', data);
          let response: any = {};
          response = data;
          localStorage.setItem('userId', response.message.userId);
          localStorage.setItem('token',response.tokens);
          this.router.navigateByUrl('dashboard');

        },
        error => {
          this.snackBar.open('Sign in failed. check your credentials ', '', { duration: 5000 });
          console.log('error response: ', error);
        }
      );
    } catch (err) {
      this.snackBar.open(err, '', { duration: 3000 });
    }
  }
}

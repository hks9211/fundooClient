import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Validators, FormControl } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
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

  ngOnInit() {
  }

  errorMessageForEmail() {
    return this.email.hasError('required') ? 'You must enter an email' :
      this.email.hasError('email') ? 'invalid email' :
        // this.email.hasError('minlength') ? 'Your email name should be between 4-25 characters' :
        // this.email.hasError('maxlength') ? 'Your email should be between 4-25 characters' :
        '';
  }

  verifyUser() {
    this.spinnerService.show();
    try {
  if (this.email.value == '') {throw new Error('Please , enter your registered Email to proceed'); }

  const toVerifyEmail = {
      email: this.email.value,
    };
  this.HttpService.post(toVerifyEmail, 'userVerification').subscribe(
      data => {
        this.snackBar.open('Reset password link has been sent to your registered Email Id ' , '', {duration : 5000});
        console.log(' response: ', data);
      },
      error => {
        this.snackBar.open('Mail not sent , Please try again ' , '', {duration : 5000});
        console.log('error response: ', error);
      }
    );
  } catch (err) {
    this.snackBar.open(err, '', {duration: 3000});
  }
}
}

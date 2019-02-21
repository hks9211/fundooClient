import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormControl } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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
      private snackBar: MatSnackBar,
      private spinnerService: Ng4LoadingSpinnerService
    ) { }

  newPassword = new FormControl('',
    [Validators.required,
    Validators.pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/)),
    Validators.minLength(8),
    Validators.maxLength(25)
    ]);

  ngOnInit() {
    const tokens = this.route.snapshot.params.token;
    console.log(tokens);
    localStorage.setItem('authPassword', tokens);
  }

  resetPassword() {
    this.spinnerService.show();
    try {
      if (this.newPassword.value == '') { throw new Error('Please , enter new password to update'); }
      const resetPasswordData = {
        newPassword: this.newPassword.value
      };
      this.HttpService.postResetPassword(resetPasswordData, 'resetPassword').subscribe(
        data => {
          this.snackBar.open('reset password successfully. Please proceed Sign In', '', { duration: 5000 });
          console.log(' response: ', data);
        },
        error => {
          this.snackBar.open('reset password failed', '', { duration: 5000 });
          console.log('error response: ', error);
        });
    } catch (err) {
      this.snackBar.open(err, '', { duration: 3000 });
    }
  }

  errorMessageForPassword() {
    return this.newPassword.hasError('required') ? 'Enter a password' :
      this.newPassword.hasError('pattern') ? 'Password must be alphanumeric' :
        this.newPassword.hasError('minlength') ? 'Password limit - 4-25 characters' :
          this.newPassword.hasError('maxlength') ? 'Password limit - 4-25 characters' :
            '';
  }
}





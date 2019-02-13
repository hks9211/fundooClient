import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterUserComponent  } from "./register-user/register-user.component";
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { InvalidUrlComponent } from './components/invalid-url/invalid-url.component';

const routes: Routes = [  
{
  path:'',
  redirectTo : '/login',
  pathMatch : 'full'
}, 
{
  path:'register',
  component:RegisterUserComponent
},

{
  path:'emailVerificaton/:token' ,
  component:VerifyEmailComponent
},
{
  path:'login',
  component:LoginUserComponent
},
{
  path:'forgotpassword',
  component:ForgotPasswordComponent
},
{
  path:'resetPassword/:token',
  component:ResetPasswordComponent
},
{
  path:'**',
  component:InvalidUrlComponent
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterUserComponent  } from "./register-user/register-user.component";
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { LoginUserComponent } from './components/login-user/login-user.component';

const routes: Routes = [
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
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

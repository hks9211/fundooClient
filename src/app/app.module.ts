import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { NgModule } from '@angular/core';
// import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppMaterial } from './app.material.module';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpService } from './services/http.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { InvalidUrlComponent } from './components/invalid-url/invalid-url.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddnoteComponent } from './components/addnote/addnote.component';
import { NoteComponent } from './components/note/note.component';




@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    VerifyEmailComponent,
    LoginUserComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    InvalidUrlComponent,
    DashboardComponent,
    AddnoteComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // MatCheckboxModule,
    BrowserAnimationsModule,
    AppMaterial,
    MatFormFieldModule,
    FlexLayoutModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule
   

  ],
  providers: [
    HttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

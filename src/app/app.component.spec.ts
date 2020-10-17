// import { TestBed, async } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AppComponent } from './app.component';

// describe('AppComponent', () => {
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule
//       ],
//       declarations: [
//         AppComponent
//       ],
//     }).compileComponents();
//   }));

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   });

//   it(`should have as title 'fundoo'`, () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app.title).toEqual('fundoo');
//   });

//   it('should render title in a h1 tag', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('h1').textContent).toContain('Welcome to fundoo!');
//   });
// });


import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { AddnoteComponent } from './components/addnote/addnote.component';
import { EditCardComponent } from './components/edit-card/edit-card.component';
import { EditLabelComponent } from './components/edit-label/edit-label.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { APP_BASE_HREF } from '@angular/common';
import { AppMaterial } from './app.material.module';
import { MatFormFieldModule } from '@angular/material';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ImageCropperModule } from 'ngx-image-cropper';
import { RegisterUserComponent } from './register-user/register-user.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { InvalidUrlComponent } from './components/invalid-url/invalid-url.component';
import { IconListComponent } from './components/icon-list/icon-list.component';
import { CardComponent } from './components/card/card.component';
import { CollaboratorsComponent } from './components/collaborators/collaborators.component';
import { SearchPipe } from './search.pipe';
import { SearchComponent } from './components/search/search.component';
import { ProfilePicComponent } from './components/profile-pic/profile-pic.component';
import { PinComponent } from './components/pin/pin.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        // MatCheckboxModule,
        BrowserAnimationsModule,
        AppMaterial,
        MatFormFieldModule,
        FlexLayoutModule,
        HttpClientModule,
        Ng4LoadingSpinnerModule,
        NgxMaterialTimepickerModule.forRoot(),
        ImageCropperModule
      ],
      providers:[{
        provide:APP_BASE_HREF,usevalue:"/"
      }],
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
        IconListComponent,
        CardComponent,
        EditCardComponent,
        TrashComponent,
        ArchiveComponent,
        EditLabelComponent,
        CollaboratorsComponent,
        RemindersComponent,
        SearchPipe,
        SearchComponent,
        ProfilePicComponent,
        PinComponent,
        
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
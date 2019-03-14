import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterUserComponent  } from './register-user/register-user.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { InvalidUrlComponent } from './components/invalid-url/invalid-url.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddnoteComponent } from './components/addnote/addnote.component';
import { IconListComponent } from './components/icon-list/icon-list.component';
import { CardComponent } from './components/card/card.component';
import { EditCardComponent } from './components/edit-card/edit-card.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { AuthGuard } from './services/auth.guard';
import { EditLabelComponent } from './components/edit-label/edit-label.component';
import { CollaboratorsComponent } from './components/collaborators/collaborators.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
{
  path: '',
  redirectTo : '/login',
  pathMatch : 'full'
},
{
  path: 'register',
  component: RegisterUserComponent
},

{
  path: 'emailVerificaton/:token' ,
  component: VerifyEmailComponent
},
{
  path: 'login',
  component: LoginUserComponent
},
{
  path: 'forgotpassword',
  component: ForgotPasswordComponent
},
{
  path: 'resetPassword/:token',
  component: ResetPasswordComponent
},
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard],
  children: [

  {
    path:'',
    component:AddnoteComponent
  } , 

  {
    path: 'notes',
    component: AddnoteComponent
  },
  {
    path: 'reminders',
    component: RemindersComponent
  },
  {
    path:'archives',
    component:ArchiveComponent
  },
  {
    path:'trash',
    component:TrashComponent
  },
  {
    path: 'Search',
    component: SearchComponent
  },

  ]

},
{
  path:'edit',
  component:EditCardComponent
},
{
  path:'collab',
  component:CollaboratorsComponent
},
{
    path:'editt',
    component:EditLabelComponent
},

{
  path: '**',
  component: InvalidUrlComponent
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

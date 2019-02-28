import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree ,CanActivate,Router} from '@angular/router';
import { HttpService } from './http.service'
import { MatSnackBar } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  
  constructor(
    private httpService:HttpService,
    private router : Router,
    private snackBar : MatSnackBar

  ){}
  canActivate() : boolean {
    if(this.httpService.loggedIn()){
      return true
    }else{
      this.snackBar.open("Login first to open dashboard","",{duration:2000});
      this.router.navigate(['login']);
      return false;
    }
  }
}

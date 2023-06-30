import { Injectable } from '@angular/core';
import { GlobalConstants } from '../global/global-constants';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  GlobalConstants = GlobalConstants
  
  constructor(private router:Router) { }
  
  hasAccess():boolean {
    if (GlobalConstants.loginStatus) {
      return true;
    }
    return false
    
  }

  login() {
    this.router.navigate(['/login'])
  }

}

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './AuthService';
import firebase from 'firebase/compat/app';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return new Promise(
        (resolve, reject) => {
          firebase.auth().onAuthStateChanged(
            (user) => {
              if(user) {
                resolve(true);
              } else {
                this.router.navigate(['/auth']);
                resolve(false);
              }
            }
          );
        }
      );
  }

}

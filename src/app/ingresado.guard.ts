// ingresado.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class IngresadoGuard implements CanActivate {

  constructor(private auth: Auth, public navCtrl: NavController) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean | UrlTree>(observer => {
      const unsubscribe = onAuthStateChanged(this.auth, user => {
        if (user) {
          
          observer.next(true);
        } else {
          
          this.navCtrl.navigateRoot('login');
          observer.next(false);
        }
        observer.complete();
      });

      
      return () => unsubscribe();
    });
  }
}

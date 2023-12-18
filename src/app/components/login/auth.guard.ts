// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.userRole$.pipe(
      map((role: any) => {
        let currentUserRole = sessionStorage.getItem('Role');
        // console.log(state.url);
        if (currentUserRole === 'Admin') {
          return true; // Allow access for admin
        }
        else if ((state.url === '/home' || state.url==='/report' || state.url==='/home/change-password' || state.url==='/home/profile') && currentUserRole == 'User') {
          return true;
        }
        else {
          // Redirect to the login page if not an admin
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}

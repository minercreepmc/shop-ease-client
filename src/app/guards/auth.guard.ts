import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@shared/services';
import {  map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}
  canActivate() {
    return this.authService.isLoggedIn$().pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          return true;
        }
        return false;
      }),
      catchError((err) => {
        this.router.navigate(['/home']);
        return of(false);
      })
    );
  }
}

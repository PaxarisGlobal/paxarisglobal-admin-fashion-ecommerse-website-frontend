import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** Keeps logged-in users off login/signup pages (Yatrify-style). */
@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}

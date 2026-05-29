import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService, AuthUser } from '../../../core/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private authSub?: Subscription;

  user: AuthUser | null = null;

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.authSub = this.authService.currentUser$.subscribe(u => {
      this.user = u;
    });
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

  displayName(user: AuthUser): string {
    return this.authService.displayName(user);
  }

  signOut(): void {
    this.authService.logout();
  }
}

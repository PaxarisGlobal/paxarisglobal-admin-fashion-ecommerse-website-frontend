import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResponse, AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  isLoading = false;
  errorMessage = '';
  returnUrl = '/';

  constructor() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogin(): void {
    if (this.loginForm.invalid || this.isLoading) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login({ email, password }).subscribe({
      next: (response: AuthResponse) => {
        this.authService.persistSession(response);
        this.isLoading = false;
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (error: unknown) => {
        this.isLoading = false;
        this.errorMessage = AuthService.readErrorMessage(error);
      }
    });
  }
}

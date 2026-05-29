import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResponse, AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly registerForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  isLoading = false;
  errorMessage = '';
  returnUrl = '/';

  constructor() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onRegister(): void {
    if (this.registerForm.invalid || this.isLoading) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { firstName, lastName, email, phone, password } = this.registerForm.getRawValue();

    this.isLoading = true;
    this.errorMessage = '';

    this.authService
      .signup({ firstName, lastName, email, phone, password })
      .subscribe({
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
}

export interface AuthResponse {
  token: string;
  expiresAt: string;
  user: AuthUser;
}

export interface SignupPayload {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = environment.apiBaseUrl.replace(/\/$/, '');
  private readonly userSubject = new BehaviorSubject<AuthUser | null>(null);

  /** Same pattern as Yatrify {@code currentUser$} */
  readonly currentUser$ = this.userSubject.asObservable();
  readonly user$ = this.currentUser$;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    this.loadStoredUser();
  }

  get currentUser(): AuthUser | null {
    return this.userSubject.value;
  }

  get isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getCurrentUser(): AuthUser | null {
    return this.userSubject.value;
  }

  signup(payload: SignupPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/signup`, payload);
  }

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, payload);
  }

  persistSession(response: AuthResponse): void {
    this.applyAuthResponse(response);
  }

  applyAuthResponse(response: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    this.userSubject.next(response.user);
  }

  clearSession(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.userSubject.next(null);
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/']);
  }

  displayName(user: AuthUser | null): string {
    if (!user) {
      return '';
    }
    if (user.fullName?.trim()) {
      return user.fullName.trim();
    }
    if (user.firstName?.trim()) {
      return user.firstName.trim();
    }
    return user.email;
  }

  static readErrorMessage(error: unknown): string {
    if (error && typeof error === 'object' && 'error' in error) {
      const body = (error as { error?: { message?: string } }).error;
      if (body?.message) {
        return body.message;
      }
    }
    return 'Something went wrong. Please try again.';
  }

  private loadStoredUser(): void {
    const token = this.getToken();
    const raw = localStorage.getItem(USER_KEY);
    if (!token || !raw) {
      this.userSubject.next(null);
      return;
    }
    try {
      this.userSubject.next(JSON.parse(raw) as AuthUser);
    } catch {
      this.clearSession();
    }
  }
}

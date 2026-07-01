import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, JwtPayload, LoginRequest, RegisterRequest, UserRole } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = 'http://localhost:8080/api/auth';
  private readonly TOKEN_KEY = 'medicare_token';

  private http = inject(HttpClient);
  private router = inject(Router);

  private isLoggedIn$ = new BehaviorSubject<boolean>(this.hasValidToken());

  get isAuthenticated$(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API}/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        this.isLoggedIn$.next(true);
      })
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API}/register`, data).pipe(
      tap(res => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        this.isLoggedIn$.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return this.hasValidToken();
  }

  getRole(): UserRole | null {
    const payload = this.decodeToken();
    return payload ? (payload.role as UserRole) : null;
  }

  getEmail(): string | null {
    const payload = this.decodeToken();
    return payload ? payload.sub : null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isDoctor(): boolean {
    return this.getRole() === 'DOCTOR';
  }

  isPatient(): boolean {
    return this.getRole() === 'PATIENT';
  }

  private hasValidToken(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) return false;
    const payload = this.decodeToken();
    if (!payload) return false;
    return payload.exp * 1000 > Date.now();
  }

  private decodeToken(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const payload = JSON.parse(atob(parts[1]));
      return payload as JwtPayload;
    } catch {
      return null;
    }
  }
}

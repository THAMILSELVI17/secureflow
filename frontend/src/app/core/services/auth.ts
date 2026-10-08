import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  userId: string;
  password: string;
  role: 'admin' | 'user';
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      userId: string;
      name: string;
      email: string;
      role: string;
      accessLevel: string;
      status: string;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl = 'https://secureflow-api-1lhe.onrender.com/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      credentials
    );
  }

  saveSession(response: LoginResponse): void {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem(
      'user',
      JSON.stringify(response.data.user)
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

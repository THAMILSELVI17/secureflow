import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  _id: string;
  userId: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  accessLevel: 'full' | 'limited';
  status: 'active' | 'inactive';
}

export interface UsersResponse {
  success: boolean;
  count: number;
  data: User[];
}

@Injectable({
  providedIn: 'root'
})
export class User {
  private apiUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(delay: number = 0): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(
      `${this.apiUrl}?delay=${delay}`
    );
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }

  updateUser(id: string, userData: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      userData
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}

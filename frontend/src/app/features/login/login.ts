import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  userId = '';
  password = '';
  role: 'admin' | 'user' = 'user';

  loading = false;
  errorMessage = '';

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  login(): void {

    // Clear previous error
    this.errorMessage = '';

    // Trim user ID
    this.userId = this.userId.trim();

    // Validate User ID
    if (!this.userId) {
      this.errorMessage = 'Please enter your User ID.';
      return;
    }

    // Validate password
    if (!this.password) {
      this.errorMessage = 'Please enter your password.';
      return;
    }

    this.loading = true;

    this.authService.login({
      userId: this.userId,
      password: this.password,
      role: this.role
    }).subscribe({

      next: (response) => {

        this.loading = false;

        // Save JWT + user details
        this.authService.saveSession(response);

        // Redirect based on role
        this.router.navigate(['/dashboard']);
      },

      error: (error) => {

        this.loading = false;

        this.errorMessage =
          error.error?.message ||
          'Login failed. Please check your credentials.';
      }
    });
  }
}

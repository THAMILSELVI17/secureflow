import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Auth } from '../../core/services/auth';

import {
  Record,
  RecordItem
} from '../../core/services/record';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  // Logged-in user details
  user: any = null;

  // Records received from backend
  records: RecordItem[] = [];

  // UI states
  loading = true;
  errorMessage = '';

  constructor(
    private authService: Auth,
    private recordService: Record,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    // Get logged-in user
    this.user = this.authService.getUser();

    // If no user is logged in, redirect to login
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    // Load records
    this.loadRecords();
  }

  loadRecords(): void {

    // Start loading
    this.loading = true;
    this.errorMessage = '';

    this.recordService.getRecords().subscribe({

      next: (response) => {

        console.log('Records API response:', response);

        // Store records
        this.records = response.data || [];

        // Stop loading
        this.loading = false;

        console.log('Records loaded:', this.records);
        console.log('Record count:', this.records.length);

        // Force Angular UI update
        this.changeDetectorRef.detectChanges();
      },

      error: (error) => {

        console.error('Records API error:', error);

        // Stop loading
        this.loading = false;

        // Display backend error
        this.errorMessage =
          error.error?.message ||
          'Unable to load records.';

        // Force Angular UI update
        this.changeDetectorRef.detectChanges();
      }

    });
  }

  // Navigate to Admin User Management
  goToUsers(): void {
    this.router.navigate(['/users']);
  }

  // Logout
  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);
  }
}

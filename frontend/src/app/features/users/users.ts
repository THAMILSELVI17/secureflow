import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  User as UserModel,
  User as UserService,
  UsersResponse
} from '../../core/services/user';

import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {

  users: UserModel[] = [];

  loading = true;
  saving = false;

  errorMessage = '';
  successMessage = '';

  showForm = false;
  editingUser: UserModel | null = null;

  formData = {
    userId: '',
    name: '',
    email: '',
    password: '',
    role: 'user' as 'admin' | 'user',
    accessLevel: 'limited' as 'full' | 'limited',
    status: 'active' as 'active' | 'inactive'
  };

  constructor(
    private userService: UserService,
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {

    const currentUser = this.authService.getUser();

    if (!currentUser || currentUser.role !== 'admin') {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.loadUsers();
  }

  loadUsers(): void {

    this.loading = true;
    this.errorMessage = '';

    // Demonstrates asynchronous API processing
    this.userService.getUsers(3000).subscribe({

      next: (response: UsersResponse) => {
        this.users = response.data;
        this.loading = false;
      },

      error: (error) => {
        this.loading = false;

        this.errorMessage =
          error.error?.message ||
          'Unable to load users.';
      }

    });
  }

  openCreateForm(): void {

    this.editingUser = null;

    this.formData = {
      userId: '',
      name: '',
      email: '',
      password: '',
      role: 'user',
      accessLevel: 'limited',
      status: 'active'
    };

    this.errorMessage = '';
    this.successMessage = '';
    this.showForm = true;
  }

  openEditForm(user: UserModel): void {

    this.editingUser = user;

    this.formData = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      accessLevel: user.accessLevel,
      status: user.status
    };

    this.errorMessage = '';
    this.successMessage = '';
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.editingUser = null;
  }

  saveUser(): void {

    this.errorMessage = '';
    this.successMessage = '';

    if (
      !this.formData.userId ||
      !this.formData.name ||
      !this.formData.email
    ) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    if (!this.editingUser && !this.formData.password) {
      this.errorMessage = 'Password is required for a new user.';
      return;
    }

    this.saving = true;

    if (this.editingUser) {

      const updateData = {
        name: this.formData.name,
        email: this.formData.email,
        role: this.formData.role,
        accessLevel: this.formData.accessLevel,
        status: this.formData.status
      };

      this.userService
        .updateUser(this.editingUser._id, updateData)
        .subscribe({

          next: () => {
            this.saving = false;
            this.successMessage = 'User updated successfully.';
            this.closeForm();
            this.loadUsers();
          },

          error: (error) => {
            this.saving = false;

            this.errorMessage =
              error.error?.message ||
              'Unable to update user.';
          }

        });

    } else {

      this.userService
        .createUser(this.formData)
        .subscribe({

          next: () => {
            this.saving = false;
            this.successMessage = 'User created successfully.';
            this.closeForm();
            this.loadUsers();
          },

          error: (error) => {
            this.saving = false;

            this.errorMessage =
              error.error?.message ||
              'Unable to create user.';
          }

        });
    }
  }

  deleteUser(user: UserModel): void {

    const confirmed = confirm(
      `Delete user "${user.name}"?`
    );

    if (!confirmed) {
      return;
    }

    this.userService
      .deleteUser(user._id)
      .subscribe({

        next: () => {
          this.successMessage = 'User deleted successfully.';
          this.loadUsers();
        },

        error: (error) => {
          this.errorMessage =
            error.error?.message ||
            'Unable to delete user.';
        }

      });
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
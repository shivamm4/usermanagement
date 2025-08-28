import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.snackbar.open(' Please fill all fields correctly!', 'Close', { duration: 3000 });
      return;
    }

    this.loading = true;
    this.authService.signup(this.signupForm.value).subscribe({
      next: (res: any) => {
        this.snackbar.open('Signup Successful! Please login.', 'Close', { duration: 3000 });
        this.signupForm.reset();
        this.router.navigate(['/login']);
        this.loading = false;
      },
      error: (err) => {
        this.snackbar.open(`${err.error.error}`, 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }
}

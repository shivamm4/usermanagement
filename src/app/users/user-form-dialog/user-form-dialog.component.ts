import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { UsersService } from '../../services/users.service';
import { LoadingService } from '../../ui/loading.service';
import { SnackbarService } from '../../ui/snackbar.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.css']
})
export class UserFormDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: UsersService,
    public ref: MatDialogRef<UserFormDialogComponent>,   // ✅ public रखा
    @Inject(MAT_DIALOG_DATA) public data: User | null,
    private loading: LoadingService,
    private snack: SnackbarService
  ) {
    this.form = this.fb.group({
      first_name: [data?.first_name || '', Validators.required],
      last_name: [data?.last_name || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      avatar: [data?.avatar || '']
    });
  }

  saveUser() {
    if (this.form.invalid) return;

    const userData: User = this.form.value;

    if (this.data?.id) {
      this.api.updateUser(this.data.id, userData).subscribe(() => {
        this.snack.success('User updated successfully');
        this.ref.close(true);
      });
    } else {
      this.api.createUser(userData).subscribe(() => {
        this.snack.success('User created successfully');
        this.ref.close(true);
      });
    }
  }
}

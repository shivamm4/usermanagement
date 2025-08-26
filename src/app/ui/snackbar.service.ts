import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  constructor(private snack: MatSnackBar) {}
  success(message: string) { this.snack.open(message, 'OK', { duration: 3000, panelClass: ['snack-success'] }); }
  error(message: string) { this.snack.open(message, 'OK', { duration: 4000, panelClass: ['snack-error'] }); }
  info(message: string) { this.snack.open(message, 'OK', { duration: 2500, panelClass: ['snack-info'] }); }
}


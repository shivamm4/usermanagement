import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-simple-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{data?.title || 'Info'}}</h2>
    <div mat-dialog-content>{{data?.message || ''}}</div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close cdkFocusInitial>OK</button>
    </div>
  `
})
export class SimpleDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

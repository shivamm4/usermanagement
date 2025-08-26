import { Component } from '@angular/core';
import { LoadingService } from '../loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="backdrop" *ngIf="(loading.isLoading$ | async)">
      <div class="spinner"></div>
    </div>
  `,
  styles: [`
    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.35);
      display: grid;
      place-items: center;
      z-index: 1500;
    }
    .spinner {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      border: 6px solid #fff;
      border-top-color: transparent;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg) }
    }
  `]
})
export class LoaderComponent {
  constructor(public loading: LoadingService) {}
}


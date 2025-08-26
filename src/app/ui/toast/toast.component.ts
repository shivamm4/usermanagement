import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';
import { ToastMessage } from './toast-message';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],   
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  messages: ToastMessage[] = [];

  constructor(private toastService: ToastService) {
    this.toastService.messages$.subscribe(msgs => {
      this.messages = msgs;
    });
  }
}

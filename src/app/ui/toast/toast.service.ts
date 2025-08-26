import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastMessage } from './toast-message';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private messagesSource = new BehaviorSubject<ToastMessage[]>([]);
  messages$ = this.messagesSource.asObservable();

  private messages: ToastMessage[] = [];

  show(text: string, type: ToastMessage['type'] = 'info') {
    const msg: ToastMessage = { text, type };
    this.messages.push(msg);
    this.messagesSource.next(this.messages);

    // Auto remove after 3 sec
    setTimeout(() => this.remove(msg), 3000);
  }

  private remove(msg: ToastMessage) {
    this.messages = this.messages.filter(m => m !== msg);
    this.messagesSource.next(this.messages);
  }
}

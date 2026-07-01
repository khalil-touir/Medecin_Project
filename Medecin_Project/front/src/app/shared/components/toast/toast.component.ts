import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Toast } from '../../../core/services/notification.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  notifications = inject(NotificationService);

  remove(id: string): void {
    this.notifications.remove(id);
  }

  trackById(_: number, toast: Toast): string {
    return toast.id;
  }
}

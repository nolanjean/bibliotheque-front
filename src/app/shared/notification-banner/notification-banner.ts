import { Component, inject } from '@angular/core';
import { NotificationService } from '../../core/notification';

@Component({
  imports: [],
  selector: 'app-notification-banner',
  styleUrl: './notification-banner.css',
  templateUrl: './notification-banner.html',
})
export class NotificationBanner {
  protected notificationService = inject(NotificationService);
}
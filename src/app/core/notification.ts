import { Injectable, signal } from '@angular/core';

export type TypeNotification = 'succes' | 'erreur';

export interface NotificationMessage {
  message: string;
  type: TypeNotification;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly _notification = signal<NotificationMessage | null>(null);
  readonly notification = this._notification.asReadonly();

  private minuteur?: ReturnType<typeof setTimeout>;

  succes(message: string): void {
    this.afficher({ message, type: 'succes' });
  }

  erreur(message: string): void {
    this.afficher({ message, type: 'erreur' });
  }

  fermer(): void {
    clearTimeout(this.minuteur);
    this._notification.set(null);
  }

  private afficher(notification: NotificationMessage): void {
    clearTimeout(this.minuteur);
    this._notification.set(notification);
    this.minuteur = setTimeout(() => this._notification.set(null), 4000);
  }
}
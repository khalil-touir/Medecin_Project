import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() pageTitle = 'Dashboard';
  @Input() pageSubtitle = '';
  @Output() menuToggle = new EventEmitter<void>();

  auth = inject(AuthService);
  router = inject(Router);

  get currentDate(): string {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  get userEmail(): string {
    return this.auth.getEmail() ?? 'Admin';
  }

  get userInitials(): string {
    return this.userEmail.slice(0, 2).toUpperCase();
  }

  onMenuToggle(): void {
    this.menuToggle.emit();
  }

  logout(): void {
    this.auth.logout();
  }
}

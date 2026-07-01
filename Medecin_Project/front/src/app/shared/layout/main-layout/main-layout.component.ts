import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  sidebarCollapsed = false;
  mobileMenuOpen = false;
  pageTitle = 'Dashboard';
  pageSubtitle = '';

  private pageTitles: Record<string, { title: string; subtitle: string }> = {
    '/dashboard': { title: 'Dashboard', subtitle: 'Welcome back! Here\'s what\'s happening today.' },
    '/doctors': { title: 'Doctors', subtitle: 'Manage your medical staff' },
    '/patients': { title: 'Patients', subtitle: 'Manage patient records' },
    '/appointments': { title: 'Appointments', subtitle: 'Schedule and manage appointments' }
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e) => {
      const nav = e as NavigationEnd;
      const info = this.pageTitles[nav.urlAfterRedirects] ?? { title: 'Page', subtitle: '' };
      this.pageTitle = info.title;
      this.pageSubtitle = info.subtitle;
    });

    // Set initial title
    const current = this.pageTitles[this.router.url];
    if (current) {
      this.pageTitle = current.title;
      this.pageSubtitle = current.subtitle;
    }
  }

  onSidebarToggle(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  onMobileMenuToggle(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}

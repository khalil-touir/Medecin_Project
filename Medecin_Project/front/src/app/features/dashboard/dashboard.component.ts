import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../core/services/dashboard.service';
import { AppointmentService } from '../../core/services/appointment.service';
import { DashboardStats, DoctorStats } from '../../core/models/dashboard.model';
import { Appointment } from '../../core/models/appointment.model';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private appointmentService = inject(AppointmentService);
  private notifications = inject(NotificationService);

  stats: DashboardStats | null = null;
  doctorStats: DoctorStats[] = [];
  recentAppointments: Appointment[] = [];
  loading = true;

  statCards = [
    { key: 'totalDoctors', title: 'Total Doctors', color: 'primary' as const, delay: 0,
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>` },
    { key: 'totalPatients', title: 'Total Patients', color: 'sky' as const, delay: 100,
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>` },
    { key: 'totalAppointments', title: 'Total Appointments', color: 'warning' as const, delay: 200,
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>` },
    { key: 'todayAppointments', title: "Today's Appointments", color: 'success' as const, delay: 300,
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>` },
    { key: 'scheduledAppointments', title: 'Scheduled', color: 'secondary' as const, delay: 400,
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>` },
    { key: 'completedAppointments', title: 'Completed', color: 'success' as const, delay: 500,
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>` }
  ];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    this.dashboardService.getStats().subscribe({
      next: (stats) => { this.stats = stats; },
      error: () => { this.notifications.error('Failed to load stats'); }
    });

    this.dashboardService.getDoctorStats().subscribe({
      next: (data) => { this.doctorStats = data.slice(0, 8); },
      error: () => {}
    });

    this.appointmentService.getAll().subscribe({
      next: (data) => {
        this.recentAppointments = data
          .sort((a, b) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime())
          .slice(0, 5);
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  getStatValue(key: string): number {
    if (!this.stats) return 0;
    return (this.stats as unknown as Record<string, number>)[key] ?? 0;
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      SCHEDULED: 'badge-primary',
      COMPLETED: 'badge-success',
      CANCELED: 'badge-danger'
    };
    return map[status] ?? 'badge-secondary';
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  getMaxCount(): number {
    if (!this.doctorStats.length) return 1;
    return Math.max(...this.doctorStats.map(d => d.appointmentCount), 1);
  }

  getBarWidth(count: number): number {
    return (count / this.getMaxCount()) * 100;
  }
}

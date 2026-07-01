import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../core/services/appointment.service';
import { DoctorService } from '../../core/services/doctor.service';
import { PatientService } from '../../core/services/patient.service';
import { Appointment, AppointmentStatus } from '../../core/models/appointment.model';
import { Doctor } from '../../core/models/doctor.model';
import { Patient } from '../../core/models/patient.model';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  private appointmentService = inject(AppointmentService);
  private doctorService = inject(DoctorService);
  private patientService = inject(PatientService);
  private notifications = inject(NotificationService);
  private fb = inject(FormBuilder);

  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  doctors: Doctor[] = [];
  patients: Patient[] = [];
  loading = false;
  showModal = false;
  saving = false;
  confirmDeleteId: number | null = null;
  statusFilter: string = '';
  searchTerm = '';
  minDate = new Date().toISOString().split('T')[0];

  appointmentForm: FormGroup = this.fb.group({
    patientId: ['', Validators.required],
    doctorId: ['', Validators.required],
    appointmentDate: ['', Validators.required],
    appointmentTime: ['', Validators.required],
    status: ['SCHEDULED', Validators.required]
  });

  statuses: AppointmentStatus[] = ['SCHEDULED', 'COMPLETED', 'CANCELED'];

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loading = true;
    this.appointmentService.getAll().subscribe({
      next: (data) => {
        this.appointments = data.sort((a, b) =>
          new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime()
        );
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.notifications.error('Failed to load appointments');
        this.loading = false;
      }
    });

    this.doctorService.getAll().subscribe({ next: (d) => { this.doctors = d; } });
    this.patientService.getAll().subscribe({ next: (p) => { this.patients = p; } });
  }

  applyFilters(): void {
    let result = [...this.appointments];

    if (this.statusFilter) {
      result = result.filter(a => a.status === this.statusFilter);
    }

    if (this.searchTerm.trim()) {
      const q = this.searchTerm.toLowerCase();
      result = result.filter(a =>
        a.patient.firstName.toLowerCase().includes(q) ||
        a.patient.lastName.toLowerCase().includes(q) ||
        a.doctor.firstName.toLowerCase().includes(q) ||
        a.doctor.lastName.toLowerCase().includes(q) ||
        a.doctor.speciality.toLowerCase().includes(q)
      );
    }

    this.filteredAppointments = result;
  }

  onStatusFilter(status: string): void {
    this.statusFilter = status;
    this.applyFilters();
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.applyFilters();
  }

  openModal(): void {
    this.appointmentForm.reset({ status: 'SCHEDULED' });
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.appointmentForm.reset({ status: 'SCHEDULED' });
  }

  saveAppointment(): void {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    const formValue = this.appointmentForm.value;

    this.appointmentService.create({
      patientId: +formValue.patientId,
      doctorId: +formValue.doctorId,
      appointmentDate: formValue.appointmentDate,
      appointmentTime: formValue.appointmentTime,
      status: formValue.status
    }).subscribe({
      next: (appt) => {
        this.appointments.unshift(appt);
        this.applyFilters();
        this.closeModal();
        this.notifications.success('Appointment created!', `Appointment scheduled for ${appt.appointmentDate}.`);
        this.saving = false;
      },
      error: () => {
        this.notifications.error('Failed to create appointment');
        this.saving = false;
      }
    });
  }

  confirmDelete(id: number): void {
    this.confirmDeleteId = id;
  }

  cancelDelete(): void {
    this.confirmDeleteId = null;
  }

  deleteAppointment(id: number): void {
    this.appointmentService.delete(id).subscribe({
      next: () => {
        this.appointments = this.appointments.filter(a => a.id !== id);
        this.applyFilters();
        this.confirmDeleteId = null;
        this.notifications.success('Appointment deleted', 'The appointment has been removed.');
      },
      error: () => {
        this.notifications.error('Failed to delete appointment');
        this.confirmDeleteId = null;
      }
    });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      SCHEDULED: 'badge-primary',
      COMPLETED: 'badge-success',
      CANCELED: 'badge-danger'
    };
    return map[status] ?? 'badge-secondary';
  }

  getStatusIcon(status: string): string {
    const icons: Record<string, string> = {
      SCHEDULED: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
      COMPLETED: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
      CANCELED: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`
    };
    return icons[status] ?? '';
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  formatTime(time: string): string {
    if (!time) return '—';
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${m} ${ampm}`;
  }

  get scheduledCount(): number { return this.appointments.filter(a => a.status === 'SCHEDULED').length; }
  get completedCount(): number { return this.appointments.filter(a => a.status === 'COMPLETED').length; }
  get canceledCount(): number { return this.appointments.filter(a => a.status === 'CANCELED').length; }
}

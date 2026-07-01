import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../core/services/patient.service';
import { Patient } from '../../core/models/patient.model';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  private patientService = inject(PatientService);
  private notifications = inject(NotificationService);
  private fb = inject(FormBuilder);

  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  loading = false;
  showModal = false;
  saving = false;
  searchTerm = '';
  today = new Date().toISOString().split('T')[0];

  patientForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^[\d\s\-\+\(\)]{7,15}$/)]],
    dateOfBirth: ['', Validators.required]
  });

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.loading = true;
    this.patientService.getAll().subscribe({
      next: (patients) => {
        this.patients = patients;
        this.applyFilter();
        this.loading = false;
      },
      error: () => {
        this.notifications.error('Failed to load patients');
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    if (!this.searchTerm.trim()) {
      this.filteredPatients = [...this.patients];
      return;
    }
    const q = this.searchTerm.toLowerCase();
    this.filteredPatients = this.patients.filter(p =>
      p.firstName.toLowerCase().includes(q) ||
      p.lastName.toLowerCase().includes(q) ||
      p.phone.includes(q)
    );
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    if (term.length >= 2 || term.length === 0) {
      this.applyFilter();
    }
  }

  openModal(): void {
    this.patientForm.reset();
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.patientForm.reset();
  }

  savePatient(): void {
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.patientService.create(this.patientForm.value).subscribe({
      next: (patient) => {
        this.patients.unshift(patient);
        this.applyFilter();
        this.closeModal();
        this.notifications.success('Patient added!', `${patient.firstName} ${patient.lastName} has been added.`);
        this.saving = false;
      },
      error: () => {
        this.notifications.error('Failed to add patient');
        this.saving = false;
      }
    });
  }

  getInitials(patient: Patient): string {
    return `${patient.firstName.slice(0, 1)}${patient.lastName.slice(0, 1)}`.toUpperCase();
  }

  getAvatarColor(patient: Patient): string {
    const colors = ['#2563EB', '#0EA5E9', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
    const idx = (patient.firstName.charCodeAt(0) + patient.lastName.charCodeAt(0)) % colors.length;
    return colors[idx];
  }

  formatDate(date: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  calculateAge(dob: string): number {
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }
}

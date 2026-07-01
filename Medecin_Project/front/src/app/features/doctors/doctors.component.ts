import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DoctorService } from '../../core/services/doctor.service';
import { AppointmentService } from '../../core/services/appointment.service';
import { Doctor, SPECIALITIES } from '../../core/models/doctor.model';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {
  private doctorService = inject(DoctorService);
  private appointmentService = inject(AppointmentService);
  private notifications = inject(NotificationService);
  private fb = inject(FormBuilder);

  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  loading = false;
  showModal = false;
  saving = false;
  searchTerm = '';
  selectedSpeciality = '';
  specialities = SPECIALITIES;

  doctorForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    speciality: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^[\d\s\-\+\(\)]{7,15}$/)]]
  });

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.loading = true;
    this.doctorService.getAll().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.notifications.error('Failed to load doctors');
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    let result = [...this.doctors];

    if (this.searchTerm.trim()) {
      const q = this.searchTerm.toLowerCase();
      result = result.filter(d =>
        d.firstName.toLowerCase().includes(q) ||
        d.lastName.toLowerCase().includes(q) ||
        d.speciality.toLowerCase().includes(q) ||
        d.phone.includes(q)
      );
    }

    if (this.selectedSpeciality) {
      result = result.filter(d => d.speciality === this.selectedSpeciality);
    }

    this.filteredDoctors = result;
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.applyFilters();
  }

  onFilterSpeciality(spec: string): void {
    this.selectedSpeciality = spec;
    this.applyFilters();
  }

  openModal(): void {
    this.doctorForm.reset();
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.doctorForm.reset();
  }

  saveDoctor(): void {
    if (this.doctorForm.invalid) {
      this.doctorForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.doctorService.create(this.doctorForm.value).subscribe({
      next: (doctor) => {
        this.doctors.unshift(doctor);
        this.applyFilters();
        this.closeModal();
        this.notifications.success('Doctor added!', `Dr. ${doctor.firstName} ${doctor.lastName} has been added.`);
        this.saving = false;
      },
      error: () => {
        this.notifications.error('Failed to add doctor');
        this.saving = false;
      }
    });
  }

  getInitials(doctor: Doctor): string {
    return `${doctor.firstName.slice(0, 1)}${doctor.lastName.slice(0, 1)}`.toUpperCase();
  }

  getSpecialityColor(speciality: string): string {
    const colors: Record<string, string> = {
      'Cardiology': '#EF4444', 'Dermatology': '#F59E0B', 'Neurology': '#8B5CF6',
      'Pediatrics': '#10B981', 'Orthopedics': '#0EA5E9', 'Surgery': '#6366F1',
      'General Practice': '#2563EB', 'Psychiatry': '#EC4899', 'Radiology': '#14B8A6',
      'Oncology': '#F97316', 'Gynecology': '#E879F9', 'Ophthalmology': '#06B6D4',
      'Urology': '#84CC16', 'Gastroenterology': '#A78BFA', 'Rheumatology': '#FB923C',
      'Pulmonology': '#34D399', 'Endocrinology': '#FCD34D'
    };
    return colors[speciality] ?? '#64748B';
  }

  getAvatarBg(doctor: Doctor): string {
    const color = this.getSpecialityColor(doctor.speciality);
    return color + '20';
  }
}

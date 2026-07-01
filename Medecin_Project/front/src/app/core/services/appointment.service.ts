import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment, CreateAppointmentRequest } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private readonly API = 'http://localhost:8080/api/appointments';
  private http = inject(HttpClient);

  getAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.API);
  }

  create(data: CreateAppointmentRequest): Observable<Appointment> {
    return this.http.post<Appointment>(this.API, data);
  }

  getById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.API}/${id}`);
  }

  getByDoctor(doctorId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.API}/doctor/${doctorId}`);
  }

  getByPatient(patientId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.API}/patient/${patientId}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}

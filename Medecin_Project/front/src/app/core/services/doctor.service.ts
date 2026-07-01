import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private readonly API = 'http://localhost:8080/api/doctors';
  private http = inject(HttpClient);

  getAll(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.API);
  }

  create(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.API, doctor);
  }

  getBySpeciality(speciality: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.API}/speciality/${speciality}`);
  }

  getByPhone(phone: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.API}/phone/${phone}`);
  }

  getCount(): Observable<number> {
    return this.http.get<number>(`${this.API}/count`);
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private readonly API = 'http://localhost:8080/api/patients';
  private http = inject(HttpClient);

  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.API);
  }

  create(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.API, patient);
  }

  getByLastName(lastName: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.API}/lastname/${lastName}`);
  }
}

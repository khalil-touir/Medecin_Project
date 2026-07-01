import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardStats, DoctorStats } from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly API = 'http://localhost:8080/api/admin';
  private http = inject(HttpClient);

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.API}/stats`);
  }

  getDoctorStats(): Observable<DoctorStats[]> {
    return this.http.get<DoctorStats[]>(`${this.API}/doctor-stats`);
  }
}

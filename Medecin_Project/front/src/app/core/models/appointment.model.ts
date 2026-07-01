import { Doctor } from './doctor.model';
import { Patient } from './patient.model';

export type AppointmentStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELED';

export interface Appointment {
  id?: number;
  appointmentDate: string;
  appointmentTime: string;
  status: AppointmentStatus;
  patient: Patient;
  doctor: Doctor;
}

export interface CreateAppointmentRequest {
  appointmentDate: string;
  appointmentTime: string;
  status: AppointmentStatus;
  patientId: number;
  doctorId: number;
}

export interface DashboardStats {
  totalDoctors: number;
  totalPatients: number;
  totalAppointments: number;
  scheduledAppointments: number;
  canceledAppointments: number;
  completedAppointments: number;
  todayAppointments: number;
  appointmentsThisWeek: number;
  appointmentsThisMonth: number;
  activeDoctors: number;
  newPatientsThisMonth: number;
}

export interface DoctorStats {
  doctorId: number;
  doctorName: string;
  appointmentCount: number;
  speciality?: string;
}

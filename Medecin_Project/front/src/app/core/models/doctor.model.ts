export interface Doctor {
  id?: number;
  firstName: string;
  lastName: string;
  speciality: string;
  phone: string;
}

export interface DoctorStats {
  doctorId: number;
  doctorName: string;
  appointmentCount: number;
  speciality?: string;
}

export const SPECIALITIES = [
  'Cardiology',
  'Dermatology',
  'Endocrinology',
  'Gastroenterology',
  'General Practice',
  'Gynecology',
  'Neurology',
  'Oncology',
  'Ophthalmology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
  'Pulmonology',
  'Radiology',
  'Rheumatology',
  'Surgery',
  'Urology'
];

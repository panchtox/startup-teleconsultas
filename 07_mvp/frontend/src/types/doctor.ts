/**
 * Doctor-related types
 */

export type Specialty = 
  | 'Medicina General'
  | 'Cardiología'
  | 'Pediatría'
  | 'Psicología'
  | 'Dermatología'
  | 'Ginecología'
  | 'Traumatología'
  | 'Oftalmología'
  | 'Nutrición'
  | 'Kinesiología';

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialty: Specialty;
  secondarySpecialties?: Specialty[];
  licenseNumber: string;
  email: string;
  phone: string;
  avatar?: string;
  bio?: string;
  education: {
    degree: string;
    institution: string;
    year: number;
  }[];
  experience: number; // years
  languages: string[];
  consultationFee?: number;
  availability: {
    dayOfWeek: number; // 0-6 (Sunday-Saturday)
    startTime: string; // HH:mm
    endTime: string;   // HH:mm
  }[];
  rating: number; // 0-5
  totalReviews: number;
  status: 'active' | 'inactive' | 'on-leave';
  joinedAt: Date;
}

export interface DoctorStats {
  totalDoctors: number;
  activeDoctors: number;
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  noShows: number;
  averageRating: number;
  patientSatisfaction: number; // percentage
  specialtyDistribution: Record<Specialty, number>;
}

export interface DoctorFilters {
  search?: string;
  specialty?: Specialty[];
  status?: Doctor['status'][];
  availableOn?: Date;
  ratingMin?: number;
}

export interface DoctorAvailability {
  doctorId: string;
  date: Date;
  slots: {
    time: string;
    available: boolean;
    booked?: boolean;
    appointmentId?: string;
  }[];
}

/**
 * Patient-related types
 */

export type PatientLevel = 'elite' | 'premium' | 'standard' | 'new' | 'at-risk';

export type HealthInsurance = 
  | 'OSDE' 
  | 'Swiss Medical' 
  | 'Galeno' 
  | 'Medicus' 
  | 'IOMA' 
  | 'PAMI'
  | 'Particular'
  | 'Otro';

export interface PatientScore {
  total: number; // 0-100
  level: PatientLevel;
  attendanceRate: number; // 0-100
  punctualityRate: number; // 0-100
  cancellationRate: number; // 0-100
  responseRate: number; // 0-100
  consecutiveAttendances: number;
  totalAppointments: number;
  completedAppointments: number;
  missedAppointments: number;
  cancelledAppointments: number;
  lastUpdated: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'attendance' | 'punctuality' | 'engagement' | 'milestone';
  earnedAt?: Date;
  progress?: number; // 0-100 for badges in progress
  requirement: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dni: string;
  dateOfBirth: Date;
  age: number;
  gender: 'M' | 'F' | 'X';
  email: string;
  phone: string;
  whatsapp?: string;
  address: {
    street: string;
    number: string;
    floor?: string;
    apartment?: string;
    city: string;
    province: string;
    postalCode: string;
  };
  healthInsurance: HealthInsurance;
  insuranceNumber?: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  score: PatientScore;
  badges: Badge[];
  registeredAt: Date;
  lastAppointmentAt?: Date;
  nextAppointmentAt?: Date;
  status: 'active' | 'inactive' | 'suspended';
  notes?: string;
  preferredLanguage: 'es' | 'en';
  notifications: {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
  };
}

export interface PatientStats {
  totalPatients: number;
  activePatients: number;
  newThisMonth: number;
  atRiskPatients: number;
  averageScore: number;
  levelDistribution: {
    elite: number;
    premium: number;
    standard: number;
    new: number;
    atRisk: number;
  };
}

export interface PatientFilters {
  search?: string;
  level?: PatientLevel[];
  healthInsurance?: HealthInsurance[];
  status?: Patient['status'][];
  scoreMin?: number;
  scoreMax?: number;
  ageMin?: number;
  ageMax?: number;
  hasUpcomingAppointment?: boolean;
}

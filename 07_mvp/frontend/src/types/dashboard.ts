export interface DashboardMetrics {
  totalPatients: number;
  totalPatientsChange: number; // % cambio vs período anterior
  upcomingConsultations: number;
  upcomingConsultationsChange: number;
  absenteeismRate: number;
  absenteeismRateChange: number;
  moneySaved: number;
  moneySavedChange: number;
  recoveredHours: number;
  recoveredHoursChange: number;
}

export interface AbsenteeismTrendData {
  month: string;
  beforeSystem: number; // % ausentismo antes del sistema
  withSystem: number; // % ausentismo con el sistema
}

export interface ConsultationBySpecialty {
  specialty: string;
  total: number;
  completed: number;
  cancelled: number;
  noShow: number;
}

export interface UpcomingConsultation {
  id: string;
  patientName: string;
  patientScore: number;
  patientLevel: 'Nuevo' | 'Estándar' | 'Premium' | 'Elite' | 'En Riesgo';
  doctorName: string;
  specialty: string;
  date: Date;
  time: string;
  status: 'Programada' | 'Confirmada' | 'Pendiente Confirmación';
  isFirstTime: boolean;
}

export interface DashboardAlert {
  id: string;
  type: 'warning' | 'info' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  actionLabel?: string;
  actionUrl?: string;
}

export interface ScoreDistribution {
  level: 'Elite' | 'Premium' | 'Estándar' | 'Nuevo' | 'En Riesgo';
  count: number;
  percentage: number;
  color: string;
}

export interface RecentActivity {
  id: string;
  type: 'consultation_completed' | 'consultation_cancelled' | 'patient_registered' | 'score_updated' | 'badge_earned';
  description: string;
  timestamp: Date;
  patientName?: string;
  icon: string;
}

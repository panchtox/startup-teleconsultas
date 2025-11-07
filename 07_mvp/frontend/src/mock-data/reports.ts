export interface AbsentismData {
  month: string;
  baseline: number;
  withSystem: number;
  improvement: number;
}

export interface ROIMetrics {
  monthsSinceStart: number;
  consultationsSaved: number;
  hoursRecovered: number;
  monthlySavings: number;
  totalSavings: number;
  roi: number;
}

export interface SpecialtyMetrics {
  specialty: string;
  totalConsultations: number;
  attended: number;
  absent: number;
  absentismRate: number;
  improvement: number;
}

export interface DoctorMetrics {
  doctorName: string;
  specialty: string;
  totalConsultations: number;
  attended: number;
  absent: number;
  absentismRate: number;
}

// Absentism reduction over 3 months
export const absentismTrend: AbsentismData[] = [
  { month: 'Mes -1', baseline: 33, withSystem: 33, improvement: 0 },
  { month: 'Mes 0', baseline: 33, withSystem: 28, improvement: 15 },
  { month: 'Mes 1', baseline: 33, withSystem: 18, improvement: 45 },
  { month: 'Mes 2', baseline: 33, withSystem: 12, improvement: 64 },
  { month: 'Mes 3', baseline: 33, withSystem: 9, improvement: 73 }
];

// ROI Calculation
export const roiMetrics: ROIMetrics = {
  monthsSinceStart: 3,
  consultationsSaved: 87,
  hoursRecovered: 156,
  monthlySavings: 6200,
  totalSavings: 18600,
  roi: 3.72 // 372% ROI
};

// Metrics by specialty
export const specialtyMetrics: SpecialtyMetrics[] = [
  {
    specialty: 'Medicina General',
    totalConsultations: 180,
    attended: 165,
    absent: 15,
    absentismRate: 8.3,
    improvement: 75
  },
  {
    specialty: 'Cardiología',
    totalConsultations: 95,
    attended: 89,
    absent: 6,
    absentismRate: 6.3,
    improvement: 81
  },
  {
    specialty: 'Pediatría',
    totalConsultations: 120,
    attended: 108,
    absent: 12,
    absentismRate: 10.0,
    improvement: 70
  },
  {
    specialty: 'Psicología',
    totalConsultations: 85,
    attended: 78,
    absent: 7,
    absentismRate: 8.2,
    improvement: 75
  },
  {
    specialty: 'Dermatología',
    totalConsultations: 65,
    attended: 60,
    absent: 5,
    absentismRate: 7.7,
    improvement: 77
  },
  {
    specialty: 'Traumatología',
    totalConsultations: 78,
    attended: 70,
    absent: 8,
    absentismRate: 10.3,
    improvement: 69
  },
  {
    specialty: 'Ginecología',
    totalConsultations: 92,
    attended: 84,
    absent: 8,
    absentismRate: 8.7,
    improvement: 74
  },
  {
    specialty: 'Oftalmología',
    totalConsultations: 55,
    attended: 50,
    absent: 5,
    absentismRate: 9.1,
    improvement: 72
  }
];

// Metrics by doctor (top 10)
export const doctorMetrics: DoctorMetrics[] = [
  { doctorName: 'Dr. García', specialty: 'Medicina General', totalConsultations: 45, attended: 42, absent: 3, absentismRate: 6.7 },
  { doctorName: 'Dra. Fernández', specialty: 'Cardiología', totalConsultations: 38, attended: 36, absent: 2, absentismRate: 5.3 },
  { doctorName: 'Dr. López', specialty: 'Pediatría', totalConsultations: 42, attended: 38, absent: 4, absentismRate: 9.5 },
  { doctorName: 'Dra. Martínez', specialty: 'Psicología', totalConsultations: 35, attended: 32, absent: 3, absentismRate: 8.6 },
  { doctorName: 'Dr. Rodríguez', specialty: 'Dermatología', totalConsultations: 30, attended: 28, absent: 2, absentismRate: 6.7 },
  { doctorName: 'Dra. Sánchez', specialty: 'Traumatología', totalConsultations: 33, attended: 30, absent: 3, absentismRate: 9.1 },
  { doctorName: 'Dr. Pérez', specialty: 'Ginecología', totalConsultations: 38, attended: 35, absent: 3, absentismRate: 7.9 },
  { doctorName: 'Dra. González', specialty: 'Oftalmología', totalConsultations: 28, attended: 26, absent: 2, absentismRate: 7.1 },
  { doctorName: 'Dr. Torres', specialty: 'Medicina General', totalConsultations: 40, attended: 37, absent: 3, absentismRate: 7.5 },
  { doctorName: 'Dra. Díaz', specialty: 'Cardiología', totalConsultations: 32, attended: 30, absent: 2, absentismRate: 6.3 }
];

// Monthly comparison data
export const monthlyComparison = [
  { month: 'Agosto', scheduled: 520, attended: 348, absent: 172, rate: 33.1 },
  { month: 'Septiembre', scheduled: 485, attended: 349, absent: 136, rate: 28.0 },
  { month: 'Octubre', scheduled: 502, attended: 412, absent: 90, rate: 17.9 },
  { month: 'Noviembre', scheduled: 478, attended: 421, absent: 57, rate: 11.9 }
];

// Engagement metrics
export const engagementMetrics = {
  activePatients: 487,
  patientsWithScore: 450,
  averageScore: 68.5,
  patientsImproved: 320,
  improvementRate: 71.1,
  badgesEarned: 1240
};

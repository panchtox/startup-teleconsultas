/**
 * Metrics and analytics types
 */

export interface SystemMetrics {
  period: 'day' | 'week' | 'month' | 'quarter' | 'year';
  startDate: Date;
  endDate: Date;
  
  // Core Metrics
  totalPatients: number;
  activePatients: number;
  newPatients: number;
  
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  noShows: number;
  
  // Attendance Metrics
  attendanceRate: number; // percentage
  previousAttendanceRate: number; // for comparison
  attendanceRateChange: number; // percentage change
  
  confirmationRate: number;
  cancellationRate: number;
  noShowRate: number;
  
  // Financial Metrics
  totalRevenue: number;
  potentialRevenue: number;
  lostRevenue: number;
  savedCosts: number; // from reduced no-shows
  
  // Time Metrics
  averageAppointmentDuration: number; // minutes
  totalDoctorHours: number;
  wastedDoctorHours: number; // from no-shows
  recoveredDoctorHours: number; // from improved attendance
  
  // Engagement Metrics
  whatsappSent: number;
  whatsappDelivered: number;
  whatsappRead: number;
  whatsappResponded: number;
  
  deliveryRate: number; // percentage
  readRate: number;
  responseRate: number;
  
  // Score Distribution
  averagePatientScore: number;
  scoreDistribution: {
    elite: number;
    premium: number;
    standard: number;
    new: number;
    atRisk: number;
  };
}

export interface TrendData {
  date: Date;
  value: number;
  label?: string;
}

export interface AbsenteeismTrend {
  period: string; // e.g., "Ene 2024", "Semana 1"
  date: Date;
  noShowRate: number;
  attendanceRate: number;
  totalAppointments: number;
  noShows: number;
}

export interface ROIMetrics {
  period: 'month' | 'quarter' | 'year';
  startDate: Date;
  endDate: Date;
  
  // Costs
  systemCost: number;
  implementationCost: number;
  maintenanceCost: number;
  totalCost: number;
  
  // Savings
  reducedNoShows: number;
  recoveredHours: number;
  recoveredRevenue: number;
  improvedEfficiency: number;
  totalSavings: number;
  
  // ROI
  netSavings: number;
  roi: number; // percentage
  paybackPeriod: number; // months
  
  // Projections
  projectedAnnualSavings: number;
  projectedROI: number;
}

export interface SpecialtyMetrics {
  specialty: string;
  totalAppointments: number;
  completedAppointments: number;
  noShows: number;
  attendanceRate: number;
  averageScore: number;
  revenue: number;
}

export interface DoctorPerformance {
  doctorId: string;
  doctorName: string;
  specialty: string;
  totalAppointments: number;
  completedAppointments: number;
  noShows: number;
  attendanceRate: number;
  patientSatisfaction: number;
  averagePatientScore: number;
}

export interface TimeSeriesData {
  date: Date;
  metric: string;
  value: number;
}

export interface ComparisonMetrics {
  current: SystemMetrics;
  previous: SystemMetrics;
  change: {
    attendanceRate: number;
    noShowRate: number;
    revenue: number;
    patientScore: number;
  };
  trend: 'improving' | 'stable' | 'declining';
}

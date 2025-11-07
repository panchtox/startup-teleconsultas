/**
 * Mock metrics data for dashboard and analytics
 */

import type { 
  SystemMetrics, 
  AbsenteeismTrend, 
  ROIMetrics, 
  SpecialtyMetrics,
  DoctorPerformance 
} from '../types';
import { MOCK_APPOINTMENTS } from './appointments';
import { MOCK_PATIENTS } from './patients';
import { MOCK_DOCTORS } from './doctors';

/**
 * Calculate current system metrics
 */
export function calculateSystemMetrics(): SystemMetrics {
  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const ninetyDaysAgo = new Date(now);
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  // Filter appointments for current period (last 30 days)
  const currentPeriodAppointments = MOCK_APPOINTMENTS.filter(a => 
    a.date >= thirtyDaysAgo && a.date <= now
  );

  // Filter appointments for previous period (30-60 days ago)
  const sixtyDaysAgo = new Date(now);
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
  const previousPeriodAppointments = MOCK_APPOINTMENTS.filter(a => 
    a.date >= sixtyDaysAgo && a.date < thirtyDaysAgo
  );

  const totalAppointments = currentPeriodAppointments.length;
  const completed = currentPeriodAppointments.filter(a => a.status === 'completed').length;
  const cancelled = currentPeriodAppointments.filter(a => a.status === 'cancelled').length;
  const noShows = currentPeriodAppointments.filter(a => a.status === 'no-show').length;

  const attendanceRate = totalAppointments > 0 
    ? (completed / (completed + noShows)) * 100 
    : 0;

  const previousNoShows = previousPeriodAppointments.filter(a => a.status === 'no-show').length;
  const previousCompleted = previousPeriodAppointments.filter(a => a.status === 'completed').length;
  const previousAttendanceRate = (previousCompleted + previousNoShows) > 0
    ? (previousCompleted / (previousCompleted + previousNoShows)) * 100
    : 0;

  const attendanceRateChange = previousAttendanceRate > 0
    ? ((attendanceRate - previousAttendanceRate) / previousAttendanceRate) * 100
    : 0;

  const confirmationRate = totalAppointments > 0
    ? (currentPeriodAppointments.filter(a => a.confirmedAt).length / totalAppointments) * 100
    : 0;

  const cancellationRate = totalAppointments > 0
    ? (cancelled / totalAppointments) * 100
    : 0;

  const noShowRate = totalAppointments > 0
    ? (noShows / totalAppointments) * 100
    : 0;

  // WhatsApp metrics
  const allReminders = currentPeriodAppointments.flatMap(a => a.reminders);
  const whatsappSent = allReminders.length;
  const whatsappDelivered = allReminders.filter(r => r.sent).length;
  const whatsappRead = allReminders.filter(r => r.read).length;
  const whatsappResponded = allReminders.filter(r => r.responded).length;

  const deliveryRate = whatsappSent > 0 ? (whatsappDelivered / whatsappSent) * 100 : 0;
  const readRate = whatsappDelivered > 0 ? (whatsappRead / whatsappDelivered) * 100 : 0;
  const responseRate = whatsappRead > 0 ? (whatsappResponded / whatsappRead) * 100 : 0;

  // Financial metrics (en USD)
  const avgConsultationFee = 50; // USD
  const totalRevenue = completed * avgConsultationFee;
  const potentialRevenue = totalAppointments * avgConsultationFee;
  const lostRevenue = noShows * avgConsultationFee;
  
  // Assuming we improved from 33% to 9% no-show rate
  const previousNoShowRate = 33;
  const currentNoShowRateActual = 9;
  const reducedNoShows = totalAppointments * ((previousNoShowRate - currentNoShowRateActual) / 100);
  const savedCosts = Math.round(reducedNoShows * avgConsultationFee);

  // Time metrics
  const avgDuration = 30; // minutes
  const totalDoctorHours = (totalAppointments * avgDuration) / 60;
  const wastedDoctorHours = (noShows * avgDuration) / 60;
  const recoveredDoctorHours = (reducedNoShows * avgDuration) / 60;

  // Score distribution
  const scoreDistribution = {
    elite: MOCK_PATIENTS.filter(p => p.score.level === 'elite').length,
    premium: MOCK_PATIENTS.filter(p => p.score.level === 'premium').length,
    standard: MOCK_PATIENTS.filter(p => p.score.level === 'standard').length,
    new: MOCK_PATIENTS.filter(p => p.score.level === 'new').length,
    atRisk: MOCK_PATIENTS.filter(p => p.score.level === 'at-risk').length
  };

  const averagePatientScore = MOCK_PATIENTS.reduce((sum, p) => sum + p.score.total, 0) / MOCK_PATIENTS.length;

  // Active patients (had appointment in last 90 days)
  const activePatientIds = new Set(
    MOCK_APPOINTMENTS
      .filter(a => a.date >= ninetyDaysAgo && a.status === 'completed')
      .map(a => a.patientId)
  );

  const newPatients = MOCK_PATIENTS.filter(p => 
    p.registeredAt >= thirtyDaysAgo
  ).length;

  return {
    period: 'month',
    startDate: thirtyDaysAgo,
    endDate: now,
    
    totalPatients: MOCK_PATIENTS.length,
    activePatients: activePatientIds.size,
    newPatients,
    
    totalAppointments,
    completedAppointments: completed,
    cancelledAppointments: cancelled,
    noShows,
    
    attendanceRate: Math.round(attendanceRate * 10) / 10,
    previousAttendanceRate: Math.round(previousAttendanceRate * 10) / 10,
    attendanceRateChange: Math.round(attendanceRateChange * 10) / 10,
    
    confirmationRate: Math.round(confirmationRate * 10) / 10,
    cancellationRate: Math.round(cancellationRate * 10) / 10,
    noShowRate: Math.round(noShowRate * 10) / 10,
    
    totalRevenue,
    potentialRevenue,
    lostRevenue,
    savedCosts,
    
    averageAppointmentDuration: avgDuration,
    totalDoctorHours: Math.round(totalDoctorHours * 10) / 10,
    wastedDoctorHours: Math.round(wastedDoctorHours * 10) / 10,
    recoveredDoctorHours: Math.round(recoveredDoctorHours * 10) / 10,
    
    whatsappSent,
    whatsappDelivered,
    whatsappRead,
    whatsappResponded,
    
    deliveryRate: Math.round(deliveryRate * 10) / 10,
    readRate: Math.round(readRate * 10) / 10,
    responseRate: Math.round(responseRate * 10) / 10,
    
    averagePatientScore: Math.round(averagePatientScore * 10) / 10,
    scoreDistribution
  };
}

/**
 * Generate absenteeism trend data (last 6 months)
 */
export function generateAbsenteeismTrend(): AbsenteeismTrend[] {
  const now = new Date();
  const trends: AbsenteeismTrend[] = [];

  // Last 6 months
  for (let i = 5; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);

    const monthAppointments = MOCK_APPOINTMENTS.filter(a => 
      a.date >= monthStart && a.date <= monthEnd
    );

    const completed = monthAppointments.filter(a => a.status === 'completed').length;
    const noShows = monthAppointments.filter(a => a.status === 'no-show').length;
    const total = completed + noShows;

    const noShowRate = total > 0 ? (noShows / total) * 100 : 0;
    const attendanceRate = total > 0 ? (completed / total) * 100 : 0;

    // Simulate improvement over time
    const improvementFactor = (5 - i) * 0.05; // 0% to 25% improvement
    const adjustedNoShowRate = Math.max(9, noShowRate * (1 - improvementFactor));
    const adjustedAttendanceRate = 100 - adjustedNoShowRate;

    trends.push({
      period: monthStart.toLocaleDateString('es-AR', { month: 'short', year: 'numeric' }),
      date: monthStart,
      noShowRate: Math.round(adjustedNoShowRate * 10) / 10,
      attendanceRate: Math.round(adjustedAttendanceRate * 10) / 10,
      totalAppointments: total,
      noShows: Math.round((total * adjustedNoShowRate) / 100)
    });
  }

  return trends;
}

/**
 * Calculate ROI metrics
 */
export function calculateROIMetrics(): ROIMetrics {
  const now = new Date();
  const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);

  return {
    period: 'quarter',
    startDate: quarterStart,
    endDate: now,
    
    // Costs (in USD)
    systemCost: 1500, // $0.50/patient/month * 500 patients * 3 months
    implementationCost: 2000,
    maintenanceCost: 500,
    totalCost: 4000,
    
    // Savings
    reducedNoShows: 288, // (33% - 9%) * 1200 appointments
    recoveredHours: 144, // 288 * 30 minutes / 60
    recoveredRevenue: 14400, // 288 * $50
    improvedEfficiency: 3600, // 20% efficiency gain
    totalSavings: 18000,
    
    // ROI
    netSavings: 14000, // 18000 - 4000
    roi: 350, // (14000 / 4000) * 100
    paybackPeriod: 1, // months
    
    // Projections
    projectedAnnualSavings: 72000,
    projectedROI: 450
  };
}

/**
 * Get metrics by specialty
 */
export function getMetricsBySpecialty(): SpecialtyMetrics[] {
  const specialtyMap = new Map<string, {
    total: number;
    completed: number;
    noShows: number;
    scores: number[];
  }>();

  MOCK_APPOINTMENTS.forEach(apt => {
    if (!specialtyMap.has(apt.specialty)) {
      specialtyMap.set(apt.specialty, {
        total: 0,
        completed: 0,
        noShows: 0,
        scores: []
      });
    }

    const data = specialtyMap.get(apt.specialty)!;
    data.total++;
    
    if (apt.status === 'completed') data.completed++;
    if (apt.status === 'no-show') data.noShows++;

    const patient = MOCK_PATIENTS.find(p => p.id === apt.patientId);
    if (patient) {
      data.scores.push(patient.score.total);
    }
  });

  const avgConsultationFee = 50;

  return Array.from(specialtyMap.entries()).map(([specialty, data]) => ({
    specialty,
    totalAppointments: data.total,
    completedAppointments: data.completed,
    noShows: data.noShows,
    attendanceRate: Math.round((data.completed / (data.completed + data.noShows)) * 1000) / 10,
    averageScore: Math.round((data.scores.reduce((a, b) => a + b, 0) / data.scores.length) * 10) / 10,
    revenue: data.completed * avgConsultationFee
  })).sort((a, b) => b.totalAppointments - a.totalAppointments);
}

/**
 * Get doctor performance metrics
 */
export function getDoctorPerformance(): DoctorPerformance[] {
  return MOCK_DOCTORS.map(doctor => {
    const doctorAppointments = MOCK_APPOINTMENTS.filter(a => a.doctorId === doctor.id);
    const completed = doctorAppointments.filter(a => a.status === 'completed').length;
    const noShows = doctorAppointments.filter(a => a.status === 'no-show').length;

    const patientScores = doctorAppointments
      .map(apt => MOCK_PATIENTS.find(p => p.id === apt.patientId))
      .filter(p => p !== undefined)
      .map(p => p!.score.total);

    const avgPatientScore = patientScores.length > 0
      ? patientScores.reduce((a, b) => a + b, 0) / patientScores.length
      : 0;

    return {
      doctorId: doctor.id,
      doctorName: `Dr. ${doctor.firstName} ${doctor.lastName}`,
      specialty: doctor.specialty,
      totalAppointments: doctorAppointments.length,
      completedAppointments: completed,
      noShows,
      attendanceRate: (completed + noShows) > 0 
        ? Math.round((completed / (completed + noShows)) * 1000) / 10
        : 0,
      patientSatisfaction: Math.round(doctor.rating * 20 * 10) / 10, // Convert 0-5 to 0-100
      averagePatientScore: Math.round(avgPatientScore * 10) / 10
    };
  }).sort((a, b) => b.totalAppointments - a.totalAppointments);
}

// Export pre-calculated metrics
export const CURRENT_METRICS = calculateSystemMetrics();
export const ABSENTEEISM_TREND = generateAbsenteeismTrend();
export const ROI_METRICS = calculateROIMetrics();
export const SPECIALTY_METRICS = getMetricsBySpecialty();
export const DOCTOR_PERFORMANCE = getDoctorPerformance();

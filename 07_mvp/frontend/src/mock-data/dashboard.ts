import { subDays, addDays } from 'date-fns';
import {
  DashboardMetrics,
  AbsenteeismTrendData,
  ConsultationBySpecialty,
  UpcomingConsultation,
  DashboardAlert,
  ScoreDistribution,
  RecentActivity,
} from '../types/dashboard';

// ============================================
// MÉTRICAS PRINCIPALES
// ============================================
export const dashboardMetrics: DashboardMetrics = {
  totalPatients: 487,
  totalPatientsChange: 12.5, // +12.5% vs mes anterior
  upcomingConsultations: 124,
  upcomingConsultationsChange: -3.2, // -3.2% vs mes anterior (mejora en la gestión)
  absenteeismRate: 8.7, // Bajó de 33% inicial a 8.7%
  absenteeismRateChange: -24.3, // -24.3 puntos porcentuales
  moneySaved: 18240, // USD ahorrados en el trimestre
  moneySavedChange: 156.3, // +156.3% vs trimestre anterior
  recoveredHours: 156, // Horas médicas recuperadas
  recoveredHoursChange: 142.8, // +142.8% vs trimestre anterior
};

// ============================================
// TENDENCIA DE AUSENTISMO (últimos 6 meses)
// ============================================
export const absenteeismTrend: AbsenteeismTrendData[] = [
  { month: 'May', beforeSystem: 33, withSystem: 33 }, // Implementación del sistema
  { month: 'Jun', beforeSystem: 33, withSystem: 28 },
  { month: 'Jul', beforeSystem: 33, withSystem: 21 },
  { month: 'Ago', beforeSystem: 33, withSystem: 15 },
  { month: 'Sep', beforeSystem: 33, withSystem: 11 },
  { month: 'Oct', beforeSystem: 33, withSystem: 8.7 }, // Mes actual
];

// ============================================
// CONSULTAS POR ESPECIALIDAD
// ============================================
export const consultationsBySpecialty: ConsultationBySpecialty[] = [
  {
    specialty: 'Medicina General',
    total: 156,
    completed: 139,
    cancelled: 8,
    noShow: 9,
  },
  {
    specialty: 'Cardiología',
    total: 89,
    completed: 78,
    cancelled: 6,
    noShow: 5,
  },
  {
    specialty: 'Pediatría',
    total: 67,
    completed: 59,
    cancelled: 4,
    noShow: 4,
  },
  {
    specialty: 'Psicología',
    total: 54,
    completed: 48,
    cancelled: 3,
    noShow: 3,
  },
  {
    specialty: 'Dermatología',
    total: 43,
    completed: 37,
    cancelled: 4,
    noShow: 2,
  },
  {
    specialty: 'Ginecología',
    total: 38,
    completed: 34,
    cancelled: 2,
    noShow: 2,
  },
];

// ============================================
// PRÓXIMAS CONSULTAS (próximos 7 días)
// ============================================
const now = new Date();

export const upcomingConsultations: UpcomingConsultation[] = [
  {
    id: 'cons-001',
    patientName: 'María González',
    patientScore: 92,
    patientLevel: 'Elite',
    doctorName: 'Dr. Martín Rodríguez',
    specialty: 'Cardiología',
    date: addDays(now, 0),
    time: '10:30',
    status: 'Confirmada',
    isFirstTime: false,
  },
  {
    id: 'cons-002',
    patientName: 'Juan Pérez',
    patientScore: 78,
    patientLevel: 'Premium',
    doctorName: 'Dra. Ana López',
    specialty: 'Medicina General',
    date: addDays(now, 0),
    time: '14:00',
    status: 'Confirmada',
    isFirstTime: false,
  },
  {
    id: 'cons-003',
    patientName: 'Sofía Fernández',
    patientScore: 45,
    patientLevel: 'Nuevo',
    doctorName: 'Dr. Carlos Sánchez',
    specialty: 'Pediatría',
    date: addDays(now, 0),
    time: '16:30',
    status: 'Pendiente Confirmación',
    isFirstTime: true,
  },
  {
    id: 'cons-004',
    patientName: 'Roberto Díaz',
    patientScore: 85,
    patientLevel: 'Premium',
    doctorName: 'Dra. Laura Martínez',
    specialty: 'Psicología',
    date: addDays(now, 1),
    time: '09:00',
    status: 'Confirmada',
    isFirstTime: false,
  },
  {
    id: 'cons-005',
    patientName: 'Lucía Romero',
    patientScore: 32,
    patientLevel: 'En Riesgo',
    doctorName: 'Dr. Martín Rodríguez',
    specialty: 'Cardiología',
    date: addDays(now, 1),
    time: '11:30',
    status: 'Programada',
    isFirstTime: false,
  },
  {
    id: 'cons-006',
    patientName: 'Diego Torres',
    patientScore: 95,
    patientLevel: 'Elite',
    doctorName: 'Dra. Patricia Vega',
    specialty: 'Dermatología',
    date: addDays(now, 1),
    time: '15:00',
    status: 'Confirmada',
    isFirstTime: false,
  },
  {
    id: 'cons-007',
    patientName: 'Valentina Castro',
    patientScore: 68,
    patientLevel: 'Estándar',
    doctorName: 'Dra. Ana López',
    specialty: 'Medicina General',
    date: addDays(now, 2),
    time: '10:00',
    status: 'Confirmada',
    isFirstTime: false,
  },
  {
    id: 'cons-008',
    patientName: 'Mateo Silva',
    patientScore: 52,
    patientLevel: 'Estándar',
    doctorName: 'Dr. Carlos Sánchez',
    specialty: 'Pediatría',
    date: addDays(now, 2),
    time: '12:30',
    status: 'Programada',
    isFirstTime: false,
  },
];

// ============================================
// ALERTAS Y NOTIFICACIONES
// ============================================
export const dashboardAlerts: DashboardAlert[] = [
  {
    id: 'alert-001',
    type: 'warning',
    title: 'Pacientes en Riesgo',
    message: '23 pacientes tienen un score menor a 40 y requieren seguimiento especial.',
    timestamp: subDays(now, 0),
    actionLabel: 'Ver pacientes',
    actionUrl: '/patients?filter=at-risk',
  },
  {
    id: 'alert-002',
    type: 'info',
    title: 'Recordatorios Enviados',
    message: 'Se enviaron 45 recordatorios para las consultas de mañana.',
    timestamp: subDays(now, 0),
  },
  {
    id: 'alert-003',
    type: 'success',
    title: 'Objetivo Cumplido',
    message: '¡Lograste reducir el ausentismo a menos del 10% este mes!',
    timestamp: subDays(now, 1),
  },
  {
    id: 'alert-004',
    type: 'info',
    title: 'Nueva Integración',
    message: 'La integración con MedicalPlatform está funcionando correctamente.',
    timestamp: subDays(now, 2),
  },
];

// ============================================
// DISTRIBUCIÓN DE SCORES
// ============================================
export const scoreDistribution: ScoreDistribution[] = [
  {
    level: 'Elite',
    count: 97,
    percentage: 19.9,
    color: '#16a34a', // green-600
  },
  {
    level: 'Premium',
    count: 146,
    percentage: 30.0,
    color: '#3b82f6', // blue-500
  },
  {
    level: 'Estándar',
    count: 146,
    percentage: 30.0,
    color: '#6b7280', // gray-500
  },
  {
    level: 'Nuevo',
    count: 73,
    percentage: 15.0,
    color: '#f59e0b', // amber-500
  },
  {
    level: 'En Riesgo',
    count: 25,
    percentage: 5.1,
    color: '#ef4444', // red-500
  },
];

// ============================================
// ACTIVIDAD RECIENTE
// ============================================
export const recentActivity: RecentActivity[] = [
  {
    id: 'act-001',
    type: 'consultation_completed',
    description: 'Consulta de cardiología completada',
    timestamp: subDays(now, 0),
    patientName: 'María González',
    icon: 'CheckCircle',
  },
  {
    id: 'act-002',
    type: 'badge_earned',
    description: 'obtuvo el badge "Puntual 10x"',
    timestamp: subDays(now, 0),
    patientName: 'Diego Torres',
    icon: 'Award',
  },
  {
    id: 'act-003',
    type: 'patient_registered',
    description: 'Nuevo paciente registrado',
    timestamp: subDays(now, 0),
    patientName: 'Sofía Fernández',
    icon: 'UserPlus',
  },
  {
    id: 'act-004',
    type: 'score_updated',
    description: 'subió de nivel: Premium → Elite',
    timestamp: subDays(now, 1),
    patientName: 'Roberto Díaz',
    icon: 'TrendingUp',
  },
  {
    id: 'act-005',
    type: 'consultation_cancelled',
    description: 'Consulta de pediatría cancelada',
    timestamp: subDays(now, 1),
    patientName: 'Mateo Silva',
    icon: 'XCircle',
  },
];

/**
 * Mock badge catalog
 */

import type { Badge } from '../types';

export const BADGE_CATALOG: Omit<Badge, 'earnedAt' | 'progress'>[] = [
  // Attendance Badges
  {
    id: 'first-appointment',
    name: 'Primera Consulta',
    description: 'Completaste tu primera teleconsulta',
    icon: '🎯',
    category: 'milestone',
    requirement: 'Completar 1 consulta'
  },
  {
    id: 'perfect-month',
    name: 'Mes Perfecto',
    description: 'Asististe a todas tus consultas del mes',
    icon: '⭐',
    category: 'attendance',
    requirement: 'Asistir a todas las consultas en un mes'
  },
  {
    id: 'streak-5',
    name: 'Racha de 5',
    description: '5 consultas consecutivas sin faltar',
    icon: '🔥',
    category: 'attendance',
    requirement: 'Asistir a 5 consultas consecutivas'
  },
  {
    id: 'streak-10',
    name: 'Racha de 10',
    description: '10 consultas consecutivas sin faltar',
    icon: '💎',
    category: 'attendance',
    requirement: 'Asistir a 10 consultas consecutivas'
  },
  {
    id: 'year-attendance',
    name: 'Año Completo',
    description: 'Un año de asistencia perfecta',
    icon: '🏆',
    category: 'milestone',
    requirement: 'Asistir a todas las consultas durante 1 año'
  },
  
  // Punctuality Badges
  {
    id: 'always-ontime',
    name: 'Siempre Puntual',
    description: 'Llegaste a tiempo a 10 consultas seguidas',
    icon: '⏰',
    category: 'punctuality',
    requirement: 'Llegar puntual a 10 consultas consecutivas'
  },
  {
    id: 'early-bird',
    name: 'Madrugador',
    description: 'Te conectaste 5 minutos antes en 5 consultas',
    icon: '🌅',
    category: 'punctuality',
    requirement: 'Conectarse 5 min antes en 5 consultas'
  },
  
  // Engagement Badges
  {
    id: 'quick-responder',
    name: 'Respuesta Rápida',
    description: 'Respondiste a 10 recordatorios en menos de 1 hora',
    icon: '⚡',
    category: 'engagement',
    requirement: 'Responder 10 recordatorios en <1 hora'
  },
  {
    id: 'never-cancel',
    name: 'Compromiso Total',
    description: 'No cancelaste ninguna consulta en 6 meses',
    icon: '✅',
    category: 'attendance',
    requirement: 'Sin cancelaciones por 6 meses'
  },
  {
    id: 'feedback-champion',
    name: 'Opinión Valiosa',
    description: 'Dejaste feedback en 5 consultas',
    icon: '💬',
    category: 'engagement',
    requirement: 'Completar encuesta en 5 consultas'
  },
  
  // Milestone Badges
  {
    id: 'appointments-25',
    name: '25 Consultas',
    description: 'Completaste 25 teleconsultas',
    icon: '🎖️',
    category: 'milestone',
    requirement: 'Completar 25 consultas'
  },
  {
    id: 'appointments-50',
    name: '50 Consultas',
    description: 'Completaste 50 teleconsultas',
    icon: '🏅',
    category: 'milestone',
    requirement: 'Completar 50 consultas'
  }
];

/**
 * Get badges earned by a patient based on their stats
 */
export function calculateEarnedBadges(
  completedAppointments: number,
  consecutiveAttendances: number,
  attendanceRate: number,
  responseRate: number
): Badge[] {
  const earned: Badge[] = [];
  const now = new Date();

  // First appointment
  if (completedAppointments >= 1) {
    earned.push({
      ...BADGE_CATALOG.find(b => b.id === 'first-appointment')!,
      earnedAt: new Date(now.getTime() - Math.random() * 180 * 24 * 60 * 60 * 1000)
    });
  }

  // Attendance streaks
  if (consecutiveAttendances >= 5) {
    earned.push({
      ...BADGE_CATALOG.find(b => b.id === 'streak-5')!,
      earnedAt: new Date(now.getTime() - Math.random() * 60 * 24 * 60 * 60 * 1000)
    });
  }

  if (consecutiveAttendances >= 10) {
    earned.push({
      ...BADGE_CATALOG.find(b => b.id === 'streak-10')!,
      earnedAt: new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000)
    });
  }

  // Perfect attendance
  if (attendanceRate === 100 && completedAppointments >= 5) {
    earned.push({
      ...BADGE_CATALOG.find(b => b.id === 'never-cancel')!,
      earnedAt: new Date(now.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000)
    });
  }

  // Quick responder
  if (responseRate >= 90) {
    earned.push({
      ...BADGE_CATALOG.find(b => b.id === 'quick-responder')!,
      earnedAt: new Date(now.getTime() - Math.random() * 45 * 24 * 60 * 60 * 1000)
    });
  }

  // Milestones
  if (completedAppointments >= 25) {
    earned.push({
      ...BADGE_CATALOG.find(b => b.id === 'appointments-25')!,
      earnedAt: new Date(now.getTime() - Math.random() * 120 * 24 * 60 * 60 * 1000)
    });
  }

  if (completedAppointments >= 50) {
    earned.push({
      ...BADGE_CATALOG.find(b => b.id === 'appointments-50')!,
      earnedAt: new Date(now.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000)
    });
  }

  return earned;
}

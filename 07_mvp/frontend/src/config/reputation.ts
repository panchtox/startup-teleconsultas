/**
 * Configuración del Sistema de Reputación
 * 
 * Define los niveles, beneficios y badges del sistema de gamificación
 */

import { LevelConfig, Badge, PatientLevel } from '../types/patient';

// ==========================================
// CONFIGURACIÓN DE NIVELES
// ==========================================

export const LEVEL_CONFIGS: Record<PatientLevel, LevelConfig> = {
  'En Riesgo': {
    name: 'En Riesgo',
    minScore: 0,
    maxScore: 39,
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    description: 'Paciente con bajo cumplimiento que requiere seguimiento especial',
    benefits: [
      'Recordatorios adicionales',
      'Contacto prioritario del equipo',
      'Apoyo para mejorar asistencia'
    ]
  },
  'Nuevo': {
    name: 'Nuevo',
    minScore: 40,
    maxScore: 59,
    color: 'text-gray-700',
    bgColor: 'bg-gray-50',
    description: 'Paciente recién ingresado al sistema sin historial suficiente',
    benefits: [
      'Período de gracia inicial',
      'Tutorial del sistema',
      'Recordatorios estándar'
    ]
  },
  'Estándar': {
    name: 'Estándar',
    minScore: 60,
    maxScore: 74,
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    description: 'Paciente con cumplimiento regular',
    benefits: [
      'Recordatorios estándar',
      'Acceso a todas las especialidades',
      'Prioridad de turnos normal'
    ]
  },
  'Premium': {
    name: 'Premium',
    minScore: 75,
    maxScore: 89,
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    description: 'Paciente con excelente cumplimiento',
    benefits: [
      'Prioridad en turnos',
      'Recordatorios personalizados',
      'Acceso a médicos destacados',
      'Descuentos en copagos'
    ]
  },
  'Elite': {
    name: 'Elite',
    minScore: 90,
    maxScore: 100,
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    description: 'Paciente ejemplar con máximo cumplimiento',
    benefits: [
      'Máxima prioridad en turnos',
      'Línea directa de contacto',
      'Médicos premium',
      'Descuentos exclusivos',
      'Beneficios especiales'
    ]
  }
};

// ==========================================
// CATÁLOGO DE BADGES
// ==========================================

export const BADGE_CATALOG: Badge[] = [
  // ASISTENCIA
  {
    id: 'perfect-month',
    name: 'Mes Perfecto',
    description: 'Asistió a todas las consultas programadas en un mes',
    icon: '🏆',
    category: 'asistencia',
    rarity: 'raro',
    requirement: '100% asistencia en 1 mes'
  },
  {
    id: 'streak-5',
    name: 'Racha de 5',
    description: 'Asistió a 5 consultas consecutivas',
    icon: '🔥',
    category: 'asistencia',
    rarity: 'común',
    requirement: '5 consultas seguidas'
  },
  {
    id: 'streak-10',
    name: 'Racha de 10',
    description: 'Asistió a 10 consultas consecutivas',
    icon: '⚡',
    category: 'asistencia',
    rarity: 'raro',
    requirement: '10 consultas seguidas'
  },
  {
    id: 'perfect-year',
    name: 'Año Ejemplar',
    description: 'Asistió a todas las consultas durante un año completo',
    icon: '👑',
    category: 'asistencia',
    rarity: 'legendario',
    requirement: '100% asistencia en 12 meses'
  },
  
  // PUNTUALIDAD
  {
    id: 'quick-confirmer',
    name: 'Confirmación Rápida',
    description: 'Confirma consultas en menos de 1 hora',
    icon: '⏱️',
    category: 'puntualidad',
    rarity: 'común',
    requirement: 'Confirmar 5 consultas en < 1 hora'
  },
  {
    id: 'early-bird',
    name: 'Madrugador',
    description: 'Siempre llega antes de la hora programada',
    icon: '🌅',
    category: 'puntualidad',
    rarity: 'raro',
    requirement: '10 llegadas anticipadas'
  },
  
  // ENGAGEMENT
  {
    id: 'first-consultation',
    name: 'Primera Consulta',
    description: 'Completó su primera teleconsulta',
    icon: '🎯',
    category: 'engagement',
    rarity: 'común',
    requirement: '1 consulta completada'
  },
  {
    id: 'frequent-user',
    name: 'Usuario Frecuente',
    description: 'Más de 10 consultas completadas',
    icon: '📱',
    category: 'engagement',
    rarity: 'raro',
    requirement: '10+ consultas completadas'
  },
  {
    id: 'feedback-hero',
    name: 'Voz Activa',
    description: 'Completó evaluaciones de todas sus consultas',
    icon: '💬',
    category: 'engagement',
    rarity: 'raro',
    requirement: 'Evaluar 10 consultas'
  },
  
  // SALUD
  {
    id: 'prevention-champion',
    name: 'Campeón de Prevención',
    description: 'Asistió a controles preventivos regulares',
    icon: '🛡️',
    category: 'salud',
    rarity: 'épico',
    requirement: '4 controles preventivos/año'
  },
  {
    id: 'treatment-compliant',
    name: 'Adherente al Tratamiento',
    description: 'Siguió el plan de tratamiento completamente',
    icon: '💊',
    category: 'salud',
    rarity: 'épico',
    requirement: 'Cumplir tratamiento completo'
  },
  
  // ESPECIALES
  {
    id: 'founding-member',
    name: 'Miembro Fundador',
    description: 'Uno de los primeros usuarios del sistema',
    icon: '⭐',
    category: 'especial',
    rarity: 'legendario',
    requirement: 'Primeros 100 usuarios'
  }
];

// ==========================================
// REGLAS DE SCORING
// ==========================================

export const SCORE_RULES = {
  // Eventos positivos
  ATTENDED_CONSULTATION: 5,
  CONFIRMED_ON_TIME: 3,
  CONFIRMED_EARLY: 5,
  COMPLETED_FEEDBACK: 2,
  PREVENTIVE_CHECK: 3,
  
  // Eventos negativos
  MISSED_CONSULTATION: -10,
  LATE_CANCELLATION: -5,
  NO_SHOW: -15,
  IGNORED_REMINDERS: -3,
  
  // Límites
  MIN_SCORE: 0,
  MAX_SCORE: 100,
  
  // Decay (pérdida gradual por inactividad)
  MONTHLY_DECAY: -2, // Pierde 2 puntos por mes sin actividad
  DECAY_THRESHOLD_DAYS: 90 // Comienza decay después de 90 días
};

// ==========================================
// HELPERS
// ==========================================

/**
 * Determina el nivel del paciente basado en su score
 */
export function getLevelByScore(score: number): PatientLevel {
  if (score >= 90) return 'Elite';
  if (score >= 75) return 'Premium';
  if (score >= 60) return 'Estándar';
  if (score >= 40) return 'Nuevo';
  return 'En Riesgo';
}

/**
 * Obtiene la configuración de un nivel específico
 */
export function getLevelConfig(level: PatientLevel): LevelConfig {
  return LEVEL_CONFIGS[level];
}

/**
 * Calcula el progreso hacia el siguiente nivel
 */
export function getProgressToNextLevel(score: number): {
  currentLevel: PatientLevel;
  nextLevel: PatientLevel | null;
  progress: number; // 0-100
  pointsToNext: number;
} {
  const currentLevel = getLevelByScore(score);
  const currentConfig = LEVEL_CONFIGS[currentLevel];
  
  // Elite es el máximo nivel
  if (currentLevel === 'Elite') {
    return {
      currentLevel,
      nextLevel: null,
      progress: 100,
      pointsToNext: 0
    };
  }
  
  // Determinar siguiente nivel
  const levels: PatientLevel[] = ['En Riesgo', 'Nuevo', 'Estándar', 'Premium', 'Elite'];
  const currentIndex = levels.indexOf(currentLevel);
  const nextLevel = levels[currentIndex + 1];
  const nextConfig = LEVEL_CONFIGS[nextLevel];
  
  // Calcular progreso
  const rangeSize = currentConfig.maxScore - currentConfig.minScore;
  const currentProgress = score - currentConfig.minScore;
  const progress = (currentProgress / rangeSize) * 100;
  const pointsToNext = nextConfig.minScore - score;
  
  return {
    currentLevel,
    nextLevel,
    progress: Math.max(0, Math.min(100, progress)),
    pointsToNext: Math.max(0, pointsToNext)
  };
}

/**
 * Verifica si un paciente cumple los requisitos para un badge
 */
export function checkBadgeEligibility(
  badgeId: string,
  patientStats: {
    totalConsultations: number;
    attendedConsultations: number;
    consecutiveAttendances: number;
    avgResponseTime: number;
  }
): boolean {
  // Esta es una implementación simplificada
  // En producción, cada badge tendría su propia lógica
  
  switch (badgeId) {
    case 'streak-5':
      return patientStats.consecutiveAttendances >= 5;
    case 'streak-10':
      return patientStats.consecutiveAttendances >= 10;
    case 'frequent-user':
      return patientStats.attendedConsultations >= 10;
    case 'quick-confirmer':
      return patientStats.avgResponseTime <= 60; // menos de 1 hora
    default:
      return false;
  }
}

/**
 * Obtiene el color del badge según su rareza
 */
export function getBadgeColor(rarity: Badge['rarity']): string {
  const colors = {
    común: 'text-gray-600 bg-gray-100',
    raro: 'text-blue-600 bg-blue-100',
    épico: 'text-purple-600 bg-purple-100',
    legendario: 'text-amber-600 bg-amber-100'
  };
  
  return colors[rarity];
}

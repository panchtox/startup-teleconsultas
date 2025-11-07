import { Patient, Badge, PatientLevel } from '../types/patient';
import { allPatients } from './patients';

export interface LevelInfo {
  level: PatientLevel;
  minScore: number;
  maxScore: number;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  benefits: string[];
  description: string;
}

export const LEVEL_INFO: Record<PatientLevel, LevelInfo> = {
  'Elite': {
    level: 'Elite',
    minScore: 90,
    maxScore: 100,
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    icon: '👑',
    description: 'Pacientes ejemplares con historial impecable',
    benefits: [
      'Prioridad máxima en agenda',
      'Turnos flexibles sin penalización',
      'Acceso a especialistas premium',
      'Descuentos en estudios (15%)',
      'Seguimiento personalizado'
    ]
  },
  'Premium': {
    level: 'Premium',
    minScore: 75,
    maxScore: 89,
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    icon: '⭐',
    description: 'Pacientes confiables con excelente asistencia',
    benefits: [
      'Prioridad alta en agenda',
      '1 reprogramación sin cargo/mes',
      'Recordatorios personalizados',
      'Descuentos en estudios (10%)',
      'Acceso a telemedicina express'
    ]
  },
  'Estándar': {
    level: 'Estándar',
    minScore: 50,
    maxScore: 74,
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    icon: '✓',
    description: 'Pacientes regulares con buen comportamiento',
    benefits: [
      'Acceso estándar a servicios',
      'Recordatorios automáticos',
      'Reprogramación con 24hs de anticipación',
      'Descuentos en estudios (5%)',
      'Telemedicina disponible'
    ]
  },
  'Nuevo': {
    level: 'Nuevo',
    minScore: 30,
    maxScore: 49,
    color: 'text-gray-700',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    icon: '🌱',
    description: 'Pacientes nuevos construyendo su reputación',
    benefits: [
      'Acceso básico a servicios',
      'Recordatorios estándar',
      'Reprogramación con 48hs de anticipación',
      'Telemedicina según disponibilidad',
      'Guía de bienvenida'
    ]
  },
  'En Riesgo': {
    level: 'En Riesgo',
    minScore: 0,
    maxScore: 29,
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    icon: '⚠️',
    description: 'Pacientes con múltiples ausencias sin aviso',
    benefits: [
      'Acceso limitado a servicios',
      'Requiere confirmación 48hs antes',
      'Sin opción de reprogramación online',
      'Revisión manual de cada turno',
      'Plan de recuperación disponible'
    ]
  }
};

export interface BadgeProgress {
  badge: Badge;
  current: number;
  target: number;
  earned: boolean;
}

export const ALL_BADGES: Badge[] = [
  // Asistencia
  {
    id: 'perfect-month',
    name: 'Mes Perfecto',
    description: 'Asistió a todas las consultas del mes',
    category: 'asistencia',
    icon: '🎯',
    rarity: 'épico',
    requirement: 'Asistir a todas las consultas programadas en un mes'
  },
  {
    id: 'streak-master',
    name: 'Racha Imparable',
    description: '10 consultas consecutivas sin faltar',
    category: 'asistencia',
    icon: '🔥',
    rarity: 'raro',
    requirement: '10 asistencias consecutivas sin faltar'
  },
  {
    id: 'reliable',
    name: 'Confiable',
    description: '95% de asistencia en 6 meses',
    category: 'asistencia',
    icon: '✅',
    rarity: 'común',
    requirement: 'Mantener 95% de asistencia durante 6 meses'
  },
  // Puntualidad
  {
    id: 'always-on-time',
    name: 'Siempre Puntual',
    description: 'Llegó a tiempo a 20 consultas seguidas',
    category: 'puntualidad',
    icon: '⏰',
    rarity: 'raro',
    requirement: 'Llegar a tiempo a 20 consultas consecutivas'
  },
  {
    id: 'early-bird',
    name: 'Madrugador',
    description: 'Confirmó 10 turnos en las primeras 24hs',
    category: 'puntualidad',
    icon: '🌅',
    rarity: 'común',
    requirement: 'Confirmar 10 turnos dentro de las primeras 24hs'
  },
  // Engagement
  {
    id: 'feedback-champion',
    name: 'Voz Activa',
    description: 'Completó 15 encuestas de satisfacción',
    category: 'engagement',
    icon: '💬',
    rarity: 'raro',
    requirement: 'Completar 15 encuestas de satisfacción'
  },
  {
    id: 'tech-savvy',
    name: 'Experto Digital',
    description: 'Usó la app para 10 gestiones',
    category: 'engagement',
    icon: '📱',
    rarity: 'común',
    requirement: 'Realizar 10 gestiones a través de la app'
  },
  // Salud
  {
    id: 'health-warrior',
    name: 'Guardián de la Salud',
    description: 'Completó todos los chequeos anuales',
    category: 'salud',
    icon: '🛡️',
    rarity: 'épico',
    requirement: 'Completar todos los chequeos preventivos anuales'
  },
  {
    id: 'prevention-first',
    name: 'Prevención Primero',
    description: 'Realizó 5 consultas preventivas',
    category: 'salud',
    icon: '🏥',
    rarity: 'raro',
    requirement: 'Realizar 5 consultas preventivas'
  },
  // Especial
  {
    id: 'founding-member',
    name: 'Miembro Fundador',
    description: 'Uno de los primeros 100 pacientes',
    category: 'especial',
    icon: '🏆',
    rarity: 'legendario',
    requirement: 'Ser uno de los primeros 100 pacientes registrados'
  },
  {
    id: 'referral-hero',
    name: 'Embajador',
    description: 'Recomendó a 5 nuevos pacientes',
    category: 'especial',
    icon: '🌟',
    rarity: 'épico',
    requirement: 'Recomendar 5 nuevos pacientes que se registren'
  },
  {
    id: 'year-one',
    name: 'Primer Año',
    description: 'Cumplió 1 año en el sistema',
    category: 'especial',
    icon: '🎂',
    rarity: 'raro',
    requirement: 'Cumplir 1 año desde el registro'
  }
];

// Generar ranking de pacientes
export const getPatientRanking = (): Patient[] => {
  return [...allPatients]
    .sort((a, b) => b.score - a.score)
    .slice(0, 50);
};

// Calcular progreso de badges para un paciente
export const getBadgeProgress = (patientId: string): BadgeProgress[] => {
  const patient = allPatients.find((p: Patient) => p.id === patientId);
  if (!patient) return [];

  const earnedBadgeIds = patient.badges.map((b: Badge) => b.id);

  return ALL_BADGES.map(badge => {
    const earned = earnedBadgeIds.includes(badge.id);
    let current = 0;
    let target = 0;

    // Simular progreso basado en el badge
    switch (badge.id) {
      case 'perfect-month':
        target = 4;
        current = earned ? 4 : Math.floor(Math.random() * 4);
        break;
      case 'streak-master':
        target = 10;
        current = earned ? 10 : Math.floor(Math.random() * 10);
        break;
      case 'reliable':
        target = 95;
        current = earned ? 95 : patient.score;
        break;
      case 'always-on-time':
        target = 20;
        current = earned ? 20 : Math.floor(Math.random() * 20);
        break;
      case 'early-bird':
        target = 10;
        current = earned ? 10 : Math.floor(Math.random() * 10);
        break;
      case 'feedback-champion':
        target = 15;
        current = earned ? 15 : Math.floor(Math.random() * 15);
        break;
      case 'tech-savvy':
        target = 10;
        current = earned ? 10 : Math.floor(Math.random() * 10);
        break;
      case 'health-warrior':
        target = 5;
        current = earned ? 5 : Math.floor(Math.random() * 5);
        break;
      case 'prevention-first':
        target = 5;
        current = earned ? 5 : Math.floor(Math.random() * 5);
        break;
      case 'founding-member':
        target = 1;
        current = earned ? 1 : 0;
        break;
      case 'referral-hero':
        target = 5;
        current = earned ? 5 : Math.floor(Math.random() * 5);
        break;
      case 'year-one':
        target = 12;
        current = earned ? 12 : Math.floor(Math.random() * 12);
        break;
    }

    return {
      badge,
      current,
      target,
      earned
    };
  });
};

export const getLevelByScore = (score: number): PatientLevel => {
  if (score >= 90) return 'Elite';
  if (score >= 75) return 'Premium';
  if (score >= 50) return 'Estándar';
  if (score >= 30) return 'Nuevo';
  return 'En Riesgo';
};

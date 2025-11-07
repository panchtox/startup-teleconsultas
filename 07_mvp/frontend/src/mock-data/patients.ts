/**
 * Mock Data Generator para Pacientes Argentinos
 * 
 * Genera 500 perfiles realistas con:
 * - Nombres y apellidos argentinos comunes
 * - DNIs válidos
 * - Direcciones de CABA y GBA
 * - Obras sociales reales
 * - Historial de consultas coherente
 * - Scores distribuidos realísticamente
 */

import { 
  Patient, 
  PatientLevel, 
  Badge,
  ConsultationHistoryItem,
  ConsultationStatus,
  ScoreHistoryPoint,
  PatientStats,
  PatientsOverview
} from '../types/patient';
import { getLevelByScore } from '../config/reputation';
import { BADGE_CATALOG } from '../config/reputation';
import { subMonths, subDays, subHours, addDays } from 'date-fns';

// ==========================================
// DATOS ARGENTINOS REALISTAS
// ==========================================

const ARGENTINE_FIRST_NAMES = {
  Masculino: [
    'Juan', 'Carlos', 'José', 'Luis', 'Jorge', 'Miguel', 'Martín', 'Diego', 
    'Pablo', 'Fernando', 'Alejandro', 'Ricardo', 'Gabriel', 'Roberto', 'Eduardo',
    'Matías', 'Sebastián', 'Santiago', 'Nicolás', 'Lucas', 'Franco', 'Facundo',
    'Gonzalo', 'Maximiliano', 'Federico', 'Ignacio', 'Tomás', 'Agustín', 'Rodrigo'
  ],
  Femenino: [
    'María', 'Ana', 'Laura', 'Claudia', 'Marta', 'Silvia', 'Susana', 'Patricia',
    'Gabriela', 'Carolina', 'Valeria', 'Andrea', 'Daniela', 'Marcela', 'Mónica',
    'Sofía', 'Florencia', 'Camila', 'Victoria', 'Martina', 'Lucía', 'Valentina',
    'Milagros', 'Agustina', 'Jimena', 'Romina', 'Natalia', 'Paula', 'Bárbara'
  ]
};

const ARGENTINE_LAST_NAMES = [
  'González', 'Rodríguez', 'Fernández', 'López', 'Martínez', 'García', 'Pérez',
  'Gómez', 'Sánchez', 'Díaz', 'Álvarez', 'Moreno', 'Romero', 'Torres', 'Ruiz',
  'Ramírez', 'Flores', 'Castro', 'Silva', 'Mendoza', 'Rojas', 'Vargas', 'Herrera',
  'Medina', 'Ortiz', 'Jiménez', 'Navarro', 'Gutiérrez', 'Domínguez', 'Ramos',
  'Vega', 'Molina', 'Reyes', 'Acosta', 'Benítez', 'Giménez', 'Suárez', 'Cabrera'
];

const BUENOS_AIRES_NEIGHBORHOODS = [
  { neighborhood: 'Palermo', city: 'CABA', province: 'Buenos Aires', postalCode: '1425' },
  { neighborhood: 'Belgrano', city: 'CABA', province: 'Buenos Aires', postalCode: '1428' },
  { neighborhood: 'Recoleta', city: 'CABA', province: 'Buenos Aires', postalCode: '1113' },
  { neighborhood: 'Caballito', city: 'CABA', province: 'Buenos Aires', postalCode: '1406' },
  { neighborhood: 'Villa Crespo', city: 'CABA', province: 'Buenos Aires', postalCode: '1414' },
  { neighborhood: 'Almagro', city: 'CABA', province: 'Buenos Aires', postalCode: '1174' },
  { neighborhood: 'Flores', city: 'CABA', province: 'Buenos Aires', postalCode: '1406' },
  { neighborhood: 'Núñez', city: 'CABA', province: 'Buenos Aires', postalCode: '1429' },
  { neighborhood: 'Colegiales', city: 'CABA', province: 'Buenos Aires', postalCode: '1426' },
  { neighborhood: 'Villa Urquiza', city: 'CABA', province: 'Buenos Aires', postalCode: '1431' },
  { neighborhood: 'San Telmo', city: 'CABA', province: 'Buenos Aires', postalCode: '1098' },
  { neighborhood: 'Barracas', city: 'CABA', province: 'Buenos Aires', postalCode: '1280' },
  { neighborhood: 'Vicente López', city: 'Vicente López', province: 'Buenos Aires', postalCode: '1602' },
  { neighborhood: 'Olivos', city: 'Vicente López', province: 'Buenos Aires', postalCode: '1636' },
  { neighborhood: 'San Isidro', city: 'San Isidro', province: 'Buenos Aires', postalCode: '1642' },
  { neighborhood: 'Martínez', city: 'San Isidro', province: 'Buenos Aires', postalCode: '1640' },
  { neighborhood: 'San Fernando', city: 'San Fernando', province: 'Buenos Aires', postalCode: '1646' },
  { neighborhood: 'Tigre', city: 'Tigre', province: 'Buenos Aires', postalCode: '1648' },
  { neighborhood: 'Quilmes', city: 'Quilmes', province: 'Buenos Aires', postalCode: '1878' },
  { neighborhood: 'Lomas de Zamora', city: 'Lomas de Zamora', province: 'Buenos Aires', postalCode: '1832' }
];

const ARGENTINE_STREETS = [
  'Av. Santa Fe', 'Av. Corrientes', 'Av. Cabildo', 'Av. Rivadavia', 'Av. Callao',
  'Av. Pueyrredón', 'Av. Córdoba', 'Av. Scalabrini Ortiz', 'Av. Libertador',
  'Av. del Libertador', 'Av. Las Heras', 'Av. Belgrano', 'Av. Entre Ríos',
  'Calle Thames', 'Calle Laprida', 'Calle Bulnes', 'Calle Gurruchaga',
  'Calle Palpa', 'Calle Armenia', 'Calle Honduras', 'Calle Soler'
];

const HEALTH_INSURANCES = [
  'OSDE', 'Swiss Medical', 'Galeno', 'OMINT', 'Medicus', 'Sancor Salud',
  'Accord Salud', 'OSECAC', 'OSPE', 'IOMA', 'PAMI', 'Medifé', 'Premedic',
  'OSDIPP', 'OSSEG', 'OSCHOCA', 'Unión Personal', 'Luis Pasteur'
];

const SPECIALTIES = [
  'Medicina General', 'Cardiología', 'Pediatría', 'Psicología', 'Dermatología',
  'Traumatología', 'Ginecología', 'Nutrición', 'Psiquiatría', 'Neurología'
];

const DOCTORS = [
  'Dr. Martín Rodríguez', 'Dra. Laura Fernández', 'Dr. Carlos López',
  'Dra. Ana García', 'Dr. Diego Martínez', 'Dra. Sofía González',
  'Dr. Fernando Pérez', 'Dra. Carolina Sánchez', 'Dr. Pablo Díaz',
  'Dra. Valeria Romero', 'Dr. Lucas Torres', 'Dra. Florencia Ruiz',
  'Dr. Sebastián Moreno', 'Dra. Camila Castro', 'Dr. Nicolás Silva'
];

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDNI(): string {
  return String(randomNumber(20000000, 45000000));
}

function generatePhone(): string {
  const areaCode = randomItem(['11', '351', '341', '261', '381']);
  const number = randomNumber(10000000, 99999999);
  return `+54 9 ${areaCode} ${String(number).slice(0, 4)}-${String(number).slice(4)}`;
}

function generateEmail(firstName: string, lastName: string): string {
  const providers = ['gmail.com', 'hotmail.com', 'yahoo.com.ar', 'outlook.com'];
  const normalized = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return `${normalized}@${randomItem(providers)}`;
}

// ==========================================
// GENERADORES DE HISTORIAL
// ==========================================

function generateConsultationHistory(
  patientId: string,
  score: number,
  monthsActive: number
): ConsultationHistoryItem[] {
  const history: ConsultationHistoryItem[] = [];
  const consultationsCount = randomNumber(
    Math.max(1, Math.floor(monthsActive / 2)),
    monthsActive * 2
  );
  
  // Determinar patrón de asistencia basado en score
  let attendanceRate = 0.95;
  if (score >= 90) attendanceRate = 0.98;
  else if (score >= 75) attendanceRate = 0.90;
  else if (score >= 60) attendanceRate = 0.80;
  else if (score >= 40) attendanceRate = 0.70;
  else attendanceRate = 0.50;
  
  for (let i = 0; i < consultationsCount; i++) {
    const daysAgo = randomNumber(i * 15, (i + 1) * 30);
    const date = subDays(new Date(), daysAgo);
    const attended = Math.random() < attendanceRate;
    
    let status: ConsultationStatus = 'Completada';
    let scoreImpact = 5;
    
    if (!attended) {
      const missType = Math.random();
      if (missType < 0.6) {
        status = 'Ausente';
        scoreImpact = -10;
      } else {
        status = 'Cancelada';
        scoreImpact = -5;
      }
    }
    
    history.push({
      id: `cons-${patientId}-${i}`,
      date,
      time: `${randomNumber(8, 18)}:${randomItem(['00', '30'])}`,
      doctorName: randomItem(DOCTORS),
      specialty: randomItem(SPECIALTIES),
      status,
      scoreImpact,
      remindersSent: randomNumber(1, 3),
      confirmedAt: attended ? subHours(date, randomNumber(2, 48)) : undefined,
      notes: attended ? undefined : randomItem([
        'Paciente no se presentó',
        'Canceló con menos de 24hs de anticipación',
        'No respondió a recordatorios'
      ])
    });
  }
  
  return history.sort((a, b) => b.date.getTime() - a.date.getTime());
}

function generateScoreHistory(
  consultationHistory: ConsultationHistoryItem[]
): ScoreHistoryPoint[] {
  const history: ScoreHistoryPoint[] = [];
  let currentScore = 50; // Todos empiezan en 50
  
  history.push({
    date: consultationHistory[consultationHistory.length - 1]?.date || subMonths(new Date(), 6),
    score: currentScore,
    reason: 'Registro inicial',
    change: 0
  });
  
  // Ordenar consultas por fecha ascendente
  const sortedConsultations = [...consultationHistory].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );
  
  sortedConsultations.forEach((consultation) => {
    currentScore = Math.max(0, Math.min(100, currentScore + consultation.scoreImpact));
    
    let reason = '';
    if (consultation.status === 'Completada') {
      reason = `Asistió a consulta de ${consultation.specialty}`;
    } else if (consultation.status === 'Ausente') {
      reason = `Ausente en consulta de ${consultation.specialty}`;
    } else if (consultation.status === 'Cancelada') {
      reason = `Canceló consulta de ${consultation.specialty}`;
    }
    
    history.push({
      date: consultation.date,
      score: currentScore,
      reason,
      change: consultation.scoreImpact
    });
  });
  
  return history;
}

function generateBadges(stats: PatientStats, score: number): Badge[] {
  const earnedBadges: Badge[] = [];
  
  // Todos tienen el badge de primera consulta si tienen al menos 1 consulta
  if (stats.attendedConsultations >= 1) {
    earnedBadges.push({
      ...BADGE_CATALOG.find(b => b.id === 'first-consultation')!,
      earnedDate: subMonths(new Date(), randomNumber(1, 6))
    });
  }
  
  // Usuario frecuente
  if (stats.attendedConsultations >= 10) {
    earnedBadges.push({
      ...BADGE_CATALOG.find(b => b.id === 'frequent-user')!,
      earnedDate: subMonths(new Date(), randomNumber(1, 3))
    });
  }
  
  // Rachas
  if (stats.consecutiveAttendances >= 5) {
    earnedBadges.push({
      ...BADGE_CATALOG.find(b => b.id === 'streak-5')!,
      earnedDate: subDays(new Date(), randomNumber(7, 30))
    });
  }
  
  if (stats.consecutiveAttendances >= 10) {
    earnedBadges.push({
      ...BADGE_CATALOG.find(b => b.id === 'streak-10')!,
      earnedDate: subDays(new Date(), randomNumber(1, 15))
    });
  }
  
  // Confirmación rápida
  if (stats.avgResponseTime <= 60) {
    earnedBadges.push({
      ...BADGE_CATALOG.find(b => b.id === 'quick-confirmer')!,
      earnedDate: subMonths(new Date(), randomNumber(1, 2))
    });
  }
  
  // Mes perfecto (solo para scores altos)
  if (score >= 85 && Math.random() < 0.3) {
    earnedBadges.push({
      ...BADGE_CATALOG.find(b => b.id === 'perfect-month')!,
      earnedDate: subMonths(new Date(), randomNumber(1, 4))
    });
  }
  
  // Miembro fundador (primeros pacientes)
  if (Math.random() < 0.02) {
    earnedBadges.push({
      ...BADGE_CATALOG.find(b => b.id === 'founding-member')!,
      earnedDate: subMonths(new Date(), 6)
    });
  }
  
  return earnedBadges;
}

// ==========================================
// GENERADOR PRINCIPAL
// ==========================================

function generatePatient(index: number): Patient {
  // Demografía
  const gender = randomItem(['Masculino', 'Femenino']) as 'Masculino' | 'Femenino';
  const firstName = randomItem(ARGENTINE_FIRST_NAMES[gender]);
  const lastName = randomItem(ARGENTINE_LAST_NAMES);
  const fullName = `${firstName} ${lastName}`;
  const age = randomNumber(18, 75);
  
  // Ubicación
  const location = randomItem(BUENOS_AIRES_NEIGHBORHOODS);
  const street = randomItem(ARGENTINE_STREETS);
  const streetNumber = randomNumber(100, 9999);
  
  // Dates
  const monthsActive = randomNumber(1, 12);
  const memberSince = subMonths(new Date(), monthsActive);
  
  // Score distribution más realista
  // 20% Elite (90-100), 30% Premium (75-89), 30% Estándar (60-74), 
  // 15% Nuevo (40-59), 5% En Riesgo (0-39)
  let score: number;
  const rand = Math.random();
  if (rand < 0.05) {
    score = randomNumber(0, 39); // En Riesgo
  } else if (rand < 0.20) {
    score = randomNumber(40, 59); // Nuevo
  } else if (rand < 0.50) {
    score = randomNumber(60, 74); // Estándar
  } else if (rand < 0.80) {
    score = randomNumber(75, 89); // Premium
  } else {
    score = randomNumber(90, 100); // Elite
  }
  
  const level = getLevelByScore(score);
  
  // Historial de consultas
  const consultationHistory = generateConsultationHistory(
    `pat-${index}`,
    score,
    monthsActive
  );
  
  // Estadísticas calculadas
  const attendedConsultations = consultationHistory.filter(c => c.status === 'Completada').length;
  const missedConsultations = consultationHistory.filter(c => c.status === 'Ausente').length;
  const canceledConsultations = consultationHistory.filter(c => c.status === 'Cancelada').length;
  const totalConsultations = consultationHistory.length;
  
  const rate = totalConsultations > 0 
    ? Math.round((attendedConsultations / totalConsultations) * 100)
    : 0;
  
  // Calcular racha actual
  let consecutiveAttendances = 0;
  let consecutiveMisses = 0;
  for (const consultation of consultationHistory) {
    if (consultation.status === 'Completada') {
      consecutiveAttendances++;
      consecutiveMisses = 0;
    } else if (consultation.status === 'Ausente') {
      consecutiveMisses++;
      consecutiveAttendances = 0;
    }
  }
  
  const stats: PatientStats = {
    totalConsultations,
    attendedConsultations,
    missedConsultations,
    canceledConsultations,
    attendanceRate: rate,
    avgResponseTime: randomNumber(30, 180),
    consecutiveAttendances,
    consecutiveMisses,
    lastConsultationDate: consultationHistory[0]?.date,
    nextConsultationDate: Math.random() < 0.25 ? addDays(new Date(), randomNumber(1, 30)) : undefined,
    memberSince,
    daysActive: Math.floor((new Date().getTime() - memberSince.getTime()) / (1000 * 60 * 60 * 24))
  };
  
  // Score history
  const scoreHistory = generateScoreHistory(consultationHistory);
  
  // Badges
  const badges = generateBadges(stats, score);
  
  // Tags
  const tags: string[] = [];
  if (level === 'En Riesgo') tags.push('Alto Riesgo');
  if (level === 'Elite') tags.push('VIP');
  if (monthsActive <= 2) tags.push('Nuevo');
  if (consecutiveAttendances >= 5) tags.push('Racha Activa');
  if (badges.some(b => b.id === 'founding-member')) tags.push('Miembro Fundador');
  
  // Construir paciente completo
  const patient: Patient = {
    id: `pat-${String(index).padStart(4, '0')}`,
    firstName,
    lastName,
    fullName,
    avatar: undefined, // Se generarán iniciales en el componente
    
    score,
    level,
    previousLevel: undefined,
    
    contact: {
      phone: generatePhone(),
      email: generateEmail(firstName, lastName),
      address: `${street} ${streetNumber}`,
      city: location.city,
      province: location.province,
      postalCode: location.postalCode
    },
    
    demographics: {
      age,
      gender,
      identificationType: 'DNI',
      identificationNumber: generateDNI(),
      healthInsurance: randomItem(HEALTH_INSURANCES),
      healthInsuranceNumber: String(randomNumber(100000, 999999))
    },
    
    stats,
    badges,
    consultationHistory,
    scoreHistory,
    
    createdAt: memberSince,
    updatedAt: new Date(),
    isActive: true,
    tags,
    notes: undefined,
    
    preferences: {
      whatsappReminders: true,
      emailReminders: Math.random() < 0.7,
      smsReminders: Math.random() < 0.3,
      preferredContactTime: randomItem(['morning', 'afternoon', 'evening']),
      language: 'es'
    }
  };
  
  return patient;
}

// ==========================================
// GENERAR TODOS LOS PACIENTES
// ==========================================

export const allPatients: Patient[] = Array.from({ length: 500 }, (_, i) => generatePatient(i));

// ==========================================
// ESTADÍSTICAS AGREGADAS
// ==========================================

export const patientsOverview: PatientsOverview = {
  total: allPatients.length,
  byLevel: [
    {
      level: 'Elite',
      count: allPatients.filter(p => p.level === 'Elite').length,
      percentage: (allPatients.filter(p => p.level === 'Elite').length / allPatients.length) * 100
    },
    {
      level: 'Premium',
      count: allPatients.filter(p => p.level === 'Premium').length,
      percentage: (allPatients.filter(p => p.level === 'Premium').length / allPatients.length) * 100
    },
    {
      level: 'Estándar',
      count: allPatients.filter(p => p.level === 'Estándar').length,
      percentage: (allPatients.filter(p => p.level === 'Estándar').length / allPatients.length) * 100
    },
    {
      level: 'Nuevo',
      count: allPatients.filter(p => p.level === 'Nuevo').length,
      percentage: (allPatients.filter(p => p.level === 'Nuevo').length / allPatients.length) * 100
    },
    {
      level: 'En Riesgo',
      count: allPatients.filter(p => p.level === 'En Riesgo').length,
      percentage: (allPatients.filter(p => p.level === 'En Riesgo').length / allPatients.length) * 100
    }
  ],
  avgScore: Math.round(
    allPatients.reduce((sum, p) => sum + p.score, 0) / allPatients.length
  ),
  avgAttendanceRate: Math.round(
    allPatients.reduce((sum, p) => sum + p.stats.attendanceRate, 0) / allPatients.length
  ),
  atRiskCount: allPatients.filter(p => p.level === 'En Riesgo' || p.stats.consecutiveMisses >= 2).length,
  newThisMonth: allPatients.filter(p => {
    const oneMonthAgo = subMonths(new Date(), 1);
    return p.createdAt >= oneMonthAgo;
  }).length,
  activeCount: allPatients.filter(p => p.isActive).length,
  inactiveCount: allPatients.filter(p => !p.isActive).length
};

// ==========================================
// FUNCIONES DE BÚSQUEDA Y FILTRADO
// ==========================================

export function searchPatients(query: string): Patient[] {
  const lowercaseQuery = query.toLowerCase();
  
  return allPatients.filter(patient => 
    patient.fullName.toLowerCase().includes(lowercaseQuery) ||
    patient.demographics.identificationNumber.includes(query) ||
    patient.contact.phone.includes(query) ||
    patient.contact.email.toLowerCase().includes(lowercaseQuery)
  );
}

export function getPatientById(id: string): Patient | undefined {
  return allPatients.find(p => p.id === id);
}

export function getPatientsByLevel(level: PatientLevel): Patient[] {
  return allPatients.filter(p => p.level === level);
}

export function getTopPatientsByScore(limit: number = 10): Patient[] {
  return [...allPatients]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function getAtRiskPatients(): Patient[] {
  return allPatients.filter(
    p => p.level === 'En Riesgo' || p.stats.consecutiveMisses >= 2
  );
}

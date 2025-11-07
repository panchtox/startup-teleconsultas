/**
 * Mock patient data - 500 pacientes argentinos
 */

import type { Patient, PatientLevel, PatientScore, HealthInsurance } from '../types';
import { calculateEarnedBadges } from './badges';

// Nombres y apellidos comunes argentinos
const FIRST_NAMES_M = [
  'Juan', 'Carlos', 'Diego', 'Martín', 'Sebastián', 'Fernando', 'Javier', 'Alejandro',
  'Federico', 'Pablo', 'Nicolás', 'Matías', 'Lucas', 'Gonzalo', 'Rodrigo', 'Facundo',
  'Maximiliano', 'Ezequiel', 'Cristian', 'Damián', 'Hernán', 'Leonardo', 'Marcelo'
];

const FIRST_NAMES_F = [
  'María', 'Ana', 'Laura', 'Carolina', 'Gabriela', 'Silvina', 'Valeria', 'Andrea',
  'Natalia', 'Vanesa', 'Mariana', 'Claudia', 'Daniela', 'Mónica', 'Patricia', 'Soledad',
  'Romina', 'Florencia', 'Luciana', 'Celeste', 'Victoria', 'Camila', 'Julieta'
];

const LAST_NAMES = [
  'González', 'Rodríguez', 'García', 'Fernández', 'López', 'Martínez', 'Pérez', 'Sánchez',
  'Romero', 'Torres', 'Álvarez', 'Díaz', 'Morales', 'Castro', 'Benítez', 'Ramírez',
  'Vargas', 'Rojas', 'Giménez', 'Silva', 'Ruiz', 'Mendoza', 'Vega', 'Acosta', 'Blanco',
  'Molina', 'Herrera', 'Medina', 'Campos', 'Suárez', 'Rios', 'Aguirre', 'Peralta'
];

const CITIES_ARGENTINA = [
  { city: 'Buenos Aires', province: 'Buenos Aires', postalCode: '1000' },
  { city: 'La Plata', province: 'Buenos Aires', postalCode: '1900' },
  { city: 'Mar del Plata', province: 'Buenos Aires', postalCode: '7600' },
  { city: 'Córdoba', province: 'Córdoba', postalCode: '5000' },
  { city: 'Rosario', province: 'Santa Fe', postalCode: '2000' },
  { city: 'Mendoza', province: 'Mendoza', postalCode: '5500' },
  { city: 'Tucumán', province: 'Tucumán', postalCode: '4000' },
  { city: 'Salta', province: 'Salta', postalCode: '4400' },
  { city: 'Santa Fe', province: 'Santa Fe', postalCode: '3000' },
  { city: 'San Juan', province: 'San Juan', postalCode: '5400' }
];

const STREETS = [
  'Av. Corrientes', 'Av. Rivadavia', 'Av. Santa Fe', 'Av. Cabildo', 'Av. Callao',
  'San Martín', 'Belgrano', 'Sarmiento', 'Mitre', 'Moreno', 'Alvear', 'Libertad',
  'Independencia', 'Entre Ríos', 'Jujuy', 'Tucumán', 'Córdoba', 'Paraguay'
];

const HEALTH_INSURANCES: HealthInsurance[] = [
  'OSDE', 'Swiss Medical', 'Galeno', 'Medicus', 'IOMA', 'PAMI', 'Particular'
];

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function calculateScore(
  completedAppointments: number,
  missedAppointments: number,
  cancelledAppointments: number
): PatientScore {
  const totalAppointments = completedAppointments + missedAppointments + cancelledAppointments;
  
  if (totalAppointments === 0) {
    return {
      total: 0,
      level: 'new',
      attendanceRate: 0,
      punctualityRate: 0,
      cancellationRate: 0,
      responseRate: 0,
      consecutiveAttendances: 0,
      totalAppointments: 0,
      completedAppointments: 0,
      missedAppointments: 0,
      cancelledAppointments: 0,
      lastUpdated: new Date()
    };
  }

  const attendanceRate = (completedAppointments / totalAppointments) * 100;
  const punctualityRate = 85 + Math.random() * 15; // 85-100%
  const cancellationRate = (cancelledAppointments / totalAppointments) * 100;
  const responseRate = 70 + Math.random() * 30; // 70-100%

  const consecutiveAttendances = Math.min(
    completedAppointments,
    Math.floor(Math.random() * 15)
  );

  // Score calculation
  const attendanceScore = attendanceRate * 0.4;
  const punctualityScore = punctualityRate * 0.2;
  const cancellationScore = (100 - cancellationRate) * 0.2;
  const responseScore = responseRate * 0.2;

  const total = Math.round(attendanceScore + punctualityScore + cancellationScore + responseScore);

  // Determine level
  let level: PatientLevel;
  if (totalAppointments < 3) {
    level = 'new';
  } else if (total >= 90) {
    level = 'elite';
  } else if (total >= 75) {
    level = 'premium';
  } else if (total >= 60) {
    level = 'standard';
  } else {
    level = 'at-risk';
  }

  return {
    total,
    level,
    attendanceRate: Math.round(attendanceRate * 10) / 10,
    punctualityRate: Math.round(punctualityRate * 10) / 10,
    cancellationRate: Math.round(cancellationRate * 10) / 10,
    responseRate: Math.round(responseRate * 10) / 10,
    consecutiveAttendances,
    totalAppointments,
    completedAppointments,
    missedAppointments,
    cancelledAppointments,
    lastUpdated: new Date()
  };
}

function generatePatient(index: number): Patient {
  const gender = Math.random() > 0.5 ? 'M' : 'F';
  const firstName = gender === 'M' ? randomItem(FIRST_NAMES_M) : randomItem(FIRST_NAMES_F);
  const lastName = randomItem(LAST_NAMES);
  const secondLastName = randomItem(LAST_NAMES);
  
  // Age distribution: más pacientes entre 25-65 años
  const ageGroup = Math.random();
  let age: number;
  if (ageGroup < 0.1) age = 18 + Math.floor(Math.random() * 7); // 18-24
  else if (ageGroup < 0.4) age = 25 + Math.floor(Math.random() * 15); // 25-39
  else if (ageGroup < 0.7) age = 40 + Math.floor(Math.random() * 15); // 40-54
  else if (ageGroup < 0.9) age = 55 + Math.floor(Math.random() * 15); // 55-69
  else age = 70 + Math.floor(Math.random() * 20); // 70-89

  const dateOfBirth = new Date();
  dateOfBirth.setFullYear(dateOfBirth.getFullYear() - age);

  const location = randomItem(CITIES_ARGENTINA);
  const street = randomItem(STREETS);
  
  // Appointment history - distribuir según nivel
  const levelDistribution = Math.random();
  let completed: number, missed: number, cancelled: number;
  
  if (levelDistribution < 0.2) {
    // Elite (20%)
    completed = 15 + Math.floor(Math.random() * 35);
    missed = 0;
    cancelled = Math.floor(Math.random() * 2);
  } else if (levelDistribution < 0.5) {
    // Premium (30%)
    completed = 10 + Math.floor(Math.random() * 20);
    missed = Math.floor(Math.random() * 2);
    cancelled = Math.floor(Math.random() * 3);
  } else if (levelDistribution < 0.8) {
    // Standard (30%)
    completed = 5 + Math.floor(Math.random() * 15);
    missed = 1 + Math.floor(Math.random() * 3);
    cancelled = 1 + Math.floor(Math.random() * 4);
  } else if (levelDistribution < 0.95) {
    // New (15%)
    completed = Math.floor(Math.random() * 3);
    missed = 0;
    cancelled = Math.floor(Math.random() * 2);
  } else {
    // At Risk (5%)
    completed = 3 + Math.floor(Math.random() * 8);
    missed = 3 + Math.floor(Math.random() * 5);
    cancelled = 2 + Math.floor(Math.random() * 4);
  }

  const score = calculateScore(completed, missed, cancelled);
  const badges = calculateEarnedBadges(
    completed,
    score.consecutiveAttendances,
    score.attendanceRate,
    score.responseRate
  );

  const registeredMonthsAgo = Math.floor(Math.random() * 24);
  const registeredAt = new Date();
  registeredAt.setMonth(registeredAt.getMonth() - registeredMonthsAgo);

  const hasUpcoming = Math.random() > 0.4;
  const nextAppointmentAt = hasUpcoming 
    ? new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000)
    : undefined;

  const lastAppointmentAt = completed > 0
    ? new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
    : undefined;

  const dni = String(10000000 + Math.floor(Math.random() * 45000000));
  const healthInsurance = randomItem(HEALTH_INSURANCES);

  return {
    id: `pat-${String(index + 1).padStart(4, '0')}`,
    firstName,
    lastName: `${lastName} ${secondLastName}`,
    dni,
    dateOfBirth,
    age,
    gender,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@email.com`,
    phone: `+54 9 11 ${String(Math.floor(Math.random() * 90000000) + 10000000)}`,
    whatsapp: `+54 9 11 ${String(Math.floor(Math.random() * 90000000) + 10000000)}`,
    address: {
      street,
      number: String(100 + Math.floor(Math.random() * 9900)),
      floor: Math.random() > 0.5 ? String(Math.floor(Math.random() * 20) + 1) : undefined,
      apartment: Math.random() > 0.5 ? String.fromCharCode(65 + Math.floor(Math.random() * 10)) : undefined,
      city: location.city,
      province: location.province,
      postalCode: location.postalCode
    },
    healthInsurance,
    insuranceNumber: healthInsurance !== 'Particular' 
      ? `${healthInsurance.substring(0, 3).toUpperCase()}${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`
      : undefined,
    emergencyContact: {
      name: randomItem([...FIRST_NAMES_M, ...FIRST_NAMES_F]) + ' ' + randomItem(LAST_NAMES),
      relationship: randomItem(['Cónyuge', 'Hijo/a', 'Padre/Madre', 'Hermano/a', 'Amigo/a']),
      phone: `+54 9 11 ${String(Math.floor(Math.random() * 90000000) + 10000000)}`
    },
    score,
    badges,
    registeredAt,
    lastAppointmentAt,
    nextAppointmentAt,
    status: Math.random() > 0.05 ? 'active' : 'inactive',
    preferredLanguage: 'es',
    notifications: {
      email: Math.random() > 0.3,
      sms: Math.random() > 0.5,
      whatsapp: Math.random() > 0.1
    }
  };
}

export const MOCK_PATIENTS: Patient[] = Array.from({ length: 500 }, (_, i) => generatePatient(i));

/**
 * Get patient by ID
 */
export function getPatientById(id: string): Patient | undefined {
  return MOCK_PATIENTS.find(p => p.id === id);
}

/**
 * Get patients by level
 */
export function getPatientsByLevel(level: PatientLevel): Patient[] {
  return MOCK_PATIENTS.filter(p => p.score.level === level);
}

/**
 * Get active patients
 */
export function getActivePatients(): Patient[] {
  return MOCK_PATIENTS.filter(p => p.status === 'active');
}

/**
 * Get random patient
 */
export function getRandomPatient(): Patient {
  return MOCK_PATIENTS[Math.floor(Math.random() * MOCK_PATIENTS.length)];
}

/**
 * Get patients with upcoming appointments
 */
export function getPatientsWithUpcomingAppointments(): Patient[] {
  return MOCK_PATIENTS.filter(p => p.nextAppointmentAt !== undefined);
}

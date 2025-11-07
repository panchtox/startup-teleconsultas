/**
 * Mock appointment data - 400 consultas históricas + 120 futuras
 */

import type { Appointment, AppointmentStatus, AppointmentType } from '../types';
import { allPatients } from './patients';
import { getRandomDoctor } from './doctors';

const CONSULTATION_REASONS = [
  'Control de rutina',
  'Seguimiento de tratamiento',
  'Consulta por síntomas',
  'Primera consulta',
  'Renovación de receta',
  'Resultado de estudios',
  'Control post-operatorio',
  'Consulta preventiva',
  'Vacunación',
  'Certificado médico',
  'Dolor abdominal',
  'Dolor de cabeza',
  'Fiebre',
  'Tos y resfriado',
  'Presión arterial',
  'Control de diabetes',
  'Control de colesterol',
  'Ansiedad',
  'Insomnio',
  'Dolor muscular'
];

const CANCELLATION_REASONS = [
  'El paciente solicitó cancelar',
  'Médico no disponible',
  'Reprogramada por el paciente',
  'El paciente no se presentó'
];

function getRandomPatient() {
  return allPatients[Math.floor(Math.random() * allPatients.length)];
}

function randomTime(): string {
  const hours = 9 + Math.floor(Math.random() * 9); // 9am - 6pm
  const minutes = ['00', '15', '30', '45'][Math.floor(Math.random() * 4)];
  return `${String(hours).padStart(2, '0')}:${minutes}`;
}

function generateAppointment(index: number, isFuture: boolean): Appointment {
  const patient = getRandomPatient();
  const doctor = getRandomDoctor();
  
  const now = new Date();
  let date: Date;
  
  if (isFuture) {
    // Próximas 30 días
    const daysAhead = Math.floor(Math.random() * 30) + 1;
    date = new Date(now);
    date.setDate(date.getDate() + daysAhead);
  } else {
    // Últimos 180 días
    const daysAgo = Math.floor(Math.random() * 180) + 1;
    date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
  }

  const startTime = randomTime();
  const startHour = parseInt(startTime.split(':')[0]);
  const startMinute = parseInt(startTime.split(':')[1]);
  const duration = [15, 30, 45, 60][Math.floor(Math.random() * 4)];
  
  const endMinutes = startMinute + duration;
  const endHour = startHour + Math.floor(endMinutes / 60);
  const endMinute = endMinutes % 60;
  const endTime = `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;

  const type: AppointmentType = Math.random() < 0.2 ? 'first-time'
    : Math.random() < 0.5 ? 'follow-up'
    : Math.random() < 0.7 ? 'routine'
    : Math.random() < 0.9 ? 'control'
    : 'emergency';

  let status: AppointmentStatus;
  let confirmedAt: Date | undefined;
  let completedAt: Date | undefined;
  let cancelledAt: Date | undefined;

  if (isFuture) {
    // Citas futuras
    const rand = Math.random();
    if (rand < 0.6) {
      status = 'confirmed';
      confirmedAt = new Date(date.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
    } else if (rand < 0.9) {
      status = 'scheduled';
    } else {
      status = 'cancelled';
      cancelledAt = new Date(date.getTime() - Math.random() * 5 * 24 * 60 * 60 * 1000);
    }
  } else {
    // Citas pasadas
    const rand = Math.random();
    if (rand < 0.75) {
      status = 'completed';
      confirmedAt = new Date(date.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
      completedAt = new Date(date);
    } else if (rand < 0.85) {
      status = 'cancelled';
      cancelledAt = new Date(date.getTime() - Math.random() * 5 * 24 * 60 * 60 * 1000);
    } else {
      status = 'no-show';
      confirmedAt = Math.random() > 0.5 
        ? new Date(date.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000)
        : undefined;
    }
  }

  // Reminders
  const reminders = [];
  const reminderDate48h = new Date(date);
  reminderDate48h.setDate(reminderDate48h.getDate() - 2);
  
  const reminderDate24h = new Date(date);
  reminderDate24h.setDate(reminderDate24h.getDate() - 1);

  if (reminderDate48h < now) {
    const delivered = Math.random() > 0.08;
    const read = delivered && Math.random() > 0.22;
    const responded = read && Math.random() > 0.35;

    reminders.push({
      sent: true,
      sentAt: reminderDate48h,
      type: 'whatsapp' as const,
      read,
      readAt: read ? new Date(reminderDate48h.getTime() + Math.random() * 3 * 60 * 60 * 1000) : undefined,
      responded,
      respondedAt: responded ? new Date(reminderDate48h.getTime() + Math.random() * 6 * 60 * 60 * 1000) : undefined
    });
  }

  if (reminderDate24h < now) {
    const delivered = Math.random() > 0.08;
    const read = delivered && Math.random() > 0.22;
    const responded = read && Math.random() > 0.35;

    reminders.push({
      sent: true,
      sentAt: reminderDate24h,
      type: 'whatsapp' as const,
      read,
      readAt: read ? new Date(reminderDate24h.getTime() + Math.random() * 3 * 60 * 60 * 1000) : undefined,
      responded,
      respondedAt: responded ? new Date(reminderDate24h.getTime() + Math.random() * 6 * 60 * 60 * 1000) : undefined
    });
  }

  const createdAt = new Date(date);
  createdAt.setDate(createdAt.getDate() - (7 + Math.floor(Math.random() * 30)));

  return {
    id: `apt-${String(index + 1).padStart(4, '0')}`,
    patientId: patient.id,
    patientName: `${patient.firstName} ${patient.lastName}`,
    patientPhone: patient.contact.phone,
    doctorId: doctor.id,
    doctorName: `Dr. ${doctor.firstName} ${doctor.lastName}`,
    specialty: doctor.specialty,
    date,
    startTime,
    endTime,
    duration,
    type,
    status,
    modality: Math.random() > 0.2 ? 'telemedicine' : 'in-person',
    reason: CONSULTATION_REASONS[Math.floor(Math.random() * CONSULTATION_REASONS.length)],
    confirmedAt,
    completedAt,
    cancelledAt,
    cancellationReason: status === 'cancelled' || status === 'no-show'
      ? (status === 'no-show' ? 'no-show' : 'patient-request')
      : undefined,
    cancellationNotes: status === 'cancelled'
      ? CANCELLATION_REASONS[Math.floor(Math.random() * CANCELLATION_REASONS.length)]
      : undefined,
    reminders,
    createdAt,
    updatedAt: completedAt || cancelledAt || confirmedAt || createdAt
  };
}

// Generate appointments
const historicalAppointments: Appointment[] = Array.from({ length: 400 }, (_, i) => 
  generateAppointment(i, false)
);

const futureAppointments: Appointment[] = Array.from({ length: 120 }, (_, i) => 
  generateAppointment(400 + i, true)
);

export const MOCK_APPOINTMENTS: Appointment[] = [
  ...historicalAppointments,
  ...futureAppointments
].sort((a, b) => b.date.getTime() - a.date.getTime());

/**
 * Get appointment by ID
 */
export function getAppointmentById(id: string): Appointment | undefined {
  return MOCK_APPOINTMENTS.find(a => a.id === id);
}

/**
 * Get appointments by patient ID
 */
export function getAppointmentsByPatient(patientId: string): Appointment[] {
  return MOCK_APPOINTMENTS.filter(a => a.patientId === patientId);
}

/**
 * Get appointments by doctor ID
 */
export function getAppointmentsByDoctor(doctorId: string): Appointment[] {
  return MOCK_APPOINTMENTS.filter(a => a.doctorId === doctorId);
}

/**
 * Get appointments by date range
 */
export function getAppointmentsByDateRange(start: Date, end: Date): Appointment[] {
  return MOCK_APPOINTMENTS.filter(a => 
    a.date >= start && a.date <= end
  );
}

/**
 * Get upcoming appointments (next 30 days)
 */
export function getUpcomingAppointments(): Appointment[] {
  const now = new Date();
  const thirtyDaysFromNow = new Date(now);
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
  
  return MOCK_APPOINTMENTS.filter(a => 
    a.date >= now && a.date <= thirtyDaysFromNow
  ).sort((a, b) => a.date.getTime() - b.date.getTime());
}

/**
 * Get appointments by status
 */
export function getAppointmentsByStatus(status: AppointmentStatus): Appointment[] {
  return MOCK_APPOINTMENTS.filter(a => a.status === status);
}

/**
 * Get appointments for a specific date
 */
export function getAppointmentsByDate(date: Date): Appointment[] {
  return MOCK_APPOINTMENTS.filter(a => {
    const appointmentDate = new Date(a.date);
    return appointmentDate.toDateString() === date.toDateString();
  });
}

/**
 * Get appointments for today
 */
export function getTodayAppointments(): Appointment[] {
  return getAppointmentsByDate(new Date());
}

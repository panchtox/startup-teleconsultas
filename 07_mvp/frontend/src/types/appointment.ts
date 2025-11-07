/**
 * Appointment-related types
 */

export type AppointmentStatus = 
  | 'scheduled'    // Programada
  | 'confirmed'    // Confirmada por paciente
  | 'in-progress'  // En curso
  | 'completed'    // Completada
  | 'cancelled'    // Cancelada
  | 'no-show';     // Ausente (no asistió)

export type AppointmentType = 
  | 'first-time'        // Primera vez
  | 'follow-up'         // Seguimiento
  | 'control'           // Control
  | 'emergency'         // Urgencia
  | 'routine';          // Rutina

export type CancellationReason = 
  | 'patient-request'
  | 'doctor-unavailable'
  | 'rescheduled'
  | 'no-show'
  | 'other';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: Date;
  startTime: string; // HH:mm format
  endTime: string;   // HH:mm format
  duration: number;  // minutes
  type: AppointmentType;
  status: AppointmentStatus;
  modality: 'telemedicine' | 'in-person';
  reason: string;
  notes?: string;
  confirmedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  cancellationReason?: CancellationReason;
  cancellationNotes?: string;
  reminders: {
    sent: boolean;
    sentAt?: Date;
    type: 'whatsapp' | 'sms' | 'email';
    read?: boolean;
    readAt?: Date;
    responded?: boolean;
    respondedAt?: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AppointmentStats {
  totalAppointments: number;
  scheduled: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  noShows: number;
  attendanceRate: number; // percentage
  confirmationRate: number; // percentage
  cancellationRate: number; // percentage
  averageDuration: number; // minutes
}

export interface AppointmentFilters {
  search?: string;
  doctorId?: string[];
  specialty?: string[];
  status?: AppointmentStatus[];
  type?: AppointmentType[];
  modality?: Appointment['modality'][];
  dateFrom?: Date;
  dateTo?: Date;
  patientId?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: AppointmentStatus;
  patientName: string;
  doctorName: string;
  specialty: string;
  type: AppointmentType;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  appointmentId?: string;
}

export interface DaySchedule {
  date: Date;
  slots: TimeSlot[];
  totalSlots: number;
  availableSlots: number;
  bookedSlots: number;
}

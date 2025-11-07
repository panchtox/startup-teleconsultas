/**
 * Sistema de Tipos para Gestión de Pacientes
 * 
 * Incluye:
 * - Perfil completo de paciente
 * - Sistema de scoring y niveles
 * - Badges y logros
 * - Historial de consultas
 * - Filtros y búsqueda
 */

// ==========================================
// NIVELES DE REPUTACIÓN
// ==========================================

export type PatientLevel = 'Nuevo' | 'Estándar' | 'Premium' | 'Elite' | 'En Riesgo';

export interface LevelConfig {
  name: PatientLevel;
  minScore: number;
  maxScore: number;
  color: string;
  bgColor: string;
  benefits: string[];
  description: string;
}

// ==========================================
// BADGES Y LOGROS
// ==========================================

export type BadgeCategory = 'asistencia' | 'puntualidad' | 'engagement' | 'salud' | 'especial';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  rarity: 'común' | 'raro' | 'épico' | 'legendario';
  earnedDate?: Date;
  progress?: number; // 0-100 para badges en progreso
  requirement: string;
}

// ==========================================
// HISTORIAL DE CONSULTAS
// ==========================================

export type ConsultationStatus = 
  | 'Programada' 
  | 'Confirmada' 
  | 'Completada' 
  | 'Cancelada' 
  | 'Ausente'
  | 'Pendiente Confirmación';

export interface ConsultationHistoryItem {
  id: string;
  date: Date;
  time: string;
  doctorName: string;
  specialty: string;
  status: ConsultationStatus;
  scoreImpact: number; // +5, -10, 0
  notes?: string;
  cancellationReason?: string;
  remindersSent: number;
  confirmedAt?: Date;
}

// ==========================================
// SCORE EVOLUTION
// ==========================================

export interface ScoreHistoryPoint {
  date: Date;
  score: number;
  reason: string;
  change: number; // +5, -10
}

// ==========================================
// CONTACTO Y DEMOGRAFÍA
// ==========================================

export interface PatientContact {
  phone: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface PatientDemographics {
  age: number;
  gender: 'Masculino' | 'Femenino' | 'Otro' | 'Prefiere no decir';
  identificationType: 'DNI' | 'Pasaporte' | 'CI';
  identificationNumber: string;
  healthInsurance?: string;
  healthInsuranceNumber?: string;
}

// ==========================================
// ESTADÍSTICAS DEL PACIENTE
// ==========================================

export interface PatientStats {
  totalConsultations: number;
  attendedConsultations: number;
  missedConsultations: number;
  canceledConsultations: number;
  attendanceRate: number; // 0-100
  avgResponseTime: number; // minutos para confirmar
  consecutiveAttendances: number;
  consecutiveMisses: number;
  lastConsultationDate?: Date;
  nextConsultationDate?: Date;
  memberSince: Date;
  daysActive: number;
}

// ==========================================
// PERFIL COMPLETO DEL PACIENTE
// ==========================================

export interface Patient {
  // Identificación
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar?: string;
  
  // Score y Nivel
  score: number; // 0-100
  level: PatientLevel;
  previousLevel?: PatientLevel;
  
  // Contacto
  contact: PatientContact;
  
  // Demografía
  demographics: PatientDemographics;
  
  // Estadísticas
  stats: PatientStats;
  
  // Badges obtenidos
  badges: Badge[];
  
  // Historial
  consultationHistory: ConsultationHistoryItem[];
  scoreHistory: ScoreHistoryPoint[];
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  tags: string[]; // Ej: ["Alto Riesgo", "VIP", "Nuevo"]
  notes?: string;
  
  // Preferencias de comunicación
  preferences: {
    whatsappReminders: boolean;
    emailReminders: boolean;
    smsReminders: boolean;
    preferredContactTime: 'morning' | 'afternoon' | 'evening';
    language: 'es' | 'en';
  };
}

// ==========================================
// FILTROS Y BÚSQUEDA
// ==========================================

export interface PatientFilters {
  search?: string; // Búsqueda por nombre, DNI, teléfono
  level?: PatientLevel[];
  minScore?: number;
  maxScore?: number;
  healthInsurance?: string[];
  province?: string[];
  ageRange?: {
    min: number;
    max: number;
  };
  hasUpcomingConsultation?: boolean;
  isAtRisk?: boolean; // Score < 40 o consecutive misses > 2
  registeredAfter?: Date;
  registeredBefore?: Date;
  tags?: string[];
}

export interface PatientSortOption {
  field: 'fullName' | 'score' | 'lastConsultation' | 'createdAt' | 'attendanceRate';
  direction: 'asc' | 'desc';
}

// ==========================================
// PAGINACIÓN Y TABLA
// ==========================================

export interface PaginatedPatients {
  patients: Patient[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PatientTableColumn {
  key: string;
  label: string;
  sortable: boolean;
  width?: string;
}

// ==========================================
// RESUMEN PARA LISTAS
// ==========================================

export interface PatientSummary {
  id: string;
  fullName: string;
  avatar?: string;
  score: number;
  level: PatientLevel;
  lastConsultation?: Date;
  nextConsultation?: Date;
  attendanceRate: number;
  phone: string;
  tags: string[];
  isActive: boolean;
}

// ==========================================
// ACCIONES Y EVENTOS
// ==========================================

export type PatientAction = 
  | 'view_profile'
  | 'edit_profile'
  | 'send_message'
  | 'schedule_consultation'
  | 'view_history'
  | 'deactivate'
  | 'activate';

export interface PatientActionEvent {
  action: PatientAction;
  patientId: string;
  timestamp: Date;
  userId?: string;
}

// ==========================================
// ESTADÍSTICAS AGREGADAS
// ==========================================

export interface PatientsOverview {
  total: number;
  byLevel: {
    level: PatientLevel;
    count: number;
    percentage: number;
  }[];
  avgScore: number;
  avgAttendanceRate: number;
  atRiskCount: number;
  newThisMonth: number;
  activeCount: number;
  inactiveCount: number;
}

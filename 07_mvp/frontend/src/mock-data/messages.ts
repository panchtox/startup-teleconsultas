/**
 * Mock WhatsApp messages data
 */

export interface WhatsAppMessage {
  id: string;
  appointmentId: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  type: 'reminder-48h' | 'reminder-24h' | 'reminder-2h' | 'confirmation' | 'cancellation' | 'follow-up';
  content: string;
  sentAt: Date;
  deliveredAt?: Date;
  readAt?: Date;
  respondedAt?: Date;
  response?: string;
  status: 'sent' | 'delivered' | 'read' | 'responded' | 'failed';
}

export interface MessageTemplate {
  id: string;
  name: string;
  type: WhatsAppMessage['type'];
  content: string;
  variables: string[];
  active: boolean;
}

export const MESSAGE_TEMPLATES: MessageTemplate[] = [
  {
    id: 'reminder-48h',
    name: 'Recordatorio 48 horas',
    type: 'reminder-48h',
    content: '🏥 Hola {{nombre}}! Te recordamos tu teleconsulta con {{doctor}} el {{fecha}} a las {{hora}}. Por favor confirmá tu asistencia respondiendo SÍ. Si necesitás reprogramar, respondé NO.',
    variables: ['nombre', 'doctor', 'fecha', 'hora'],
    active: true
  },
  {
    id: 'reminder-24h',
    name: 'Recordatorio 24 horas',
    type: 'reminder-24h',
    content: '⏰ {{nombre}}, tu consulta con {{doctor}} es mañana {{fecha}} a las {{hora}}. Recordá tener tu DNI y credencial de {{obrasocial}} a mano. ¿Confirmás tu asistencia?',
    variables: ['nombre', 'doctor', 'fecha', 'hora', 'obrasocial'],
    active: true
  },
  {
    id: 'reminder-2h',
    name: 'Recordatorio 2 horas',
    type: 'reminder-2h',
    content: '🔔 {{nombre}}, tu teleconsulta con {{doctor}} comienza en 2 horas ({{hora}}). El link de acceso: {{link}}. ¡Te esperamos!',
    variables: ['nombre', 'doctor', 'hora', 'link'],
    active: true
  },
  {
    id: 'confirmation',
    name: 'Confirmación recibida',
    type: 'confirmation',
    content: '✅ ¡Perfecto {{nombre}}! Tu asistencia está confirmada para el {{fecha}} a las {{hora}}. Nos vemos pronto.',
    variables: ['nombre', 'fecha', 'hora'],
    active: true
  },
  {
    id: 'cancellation',
    name: 'Cancelación notificada',
    type: 'cancellation',
    content: '❌ {{nombre}}, registramos la cancelación de tu consulta del {{fecha}}. Podés reprogramar llamando al {{telefono}} o desde nuestra app.',
    variables: ['nombre', 'fecha', 'telefono'],
    active: true
  },
  {
    id: 'follow-up',
    name: 'Seguimiento post-consulta',
    type: 'follow-up',
    content: '💚 Hola {{nombre}}! ¿Cómo te sentís después de la consulta con {{doctor}}? Tu opinión es importante para nosotros. Calificá tu experiencia: {{link}}',
    variables: ['nombre', 'doctor', 'link'],
    active: true
  }
];

/**
 * Generate mock WhatsApp messages for the last 30 days
 */
import { MOCK_APPOINTMENTS, getAppointmentById } from './appointments';
import { getPatientById } from './patients';

function generateMessage(
  appointmentId: string,
  type: WhatsAppMessage['type'],
  sentDate: Date
): WhatsAppMessage | null {
  const appointment = getAppointmentById(appointmentId);
  if (!appointment) return null;

  const patient = getPatientById(appointment.patientId);
  if (!patient) return null;

  const template = MESSAGE_TEMPLATES.find(t => t.type === type);
  if (!template) return null;

  const content = template.content
    .replace('{{nombre}}', patient.firstName)
    .replace('{{doctor}}', appointment.doctorName)
    .replace('{{fecha}}', appointment.date.toLocaleDateString('es-AR'))
    .replace('{{hora}}', appointment.startTime)
    .replace('{{obrasocial}}', patient.demographics.healthInsurance || 'tu obra social')
    .replace('{{telefono}}', '+54 11 4000-1234')
    .replace('{{link}}', 'https://clinica.com.ar/consulta');

  const delivered = Math.random() > 0.08;
  const read = delivered && Math.random() > 0.22;
  const responded = read && Math.random() > 0.35;

  const deliveredAt = delivered 
    ? new Date(sentDate.getTime() + Math.random() * 60 * 60 * 1000) // within 1 hour
    : undefined;

  const readAt = read && deliveredAt
    ? new Date(deliveredAt.getTime() + Math.random() * 3 * 60 * 60 * 1000) // within 3 hours
    : undefined;

  const respondedAt = responded && readAt
    ? new Date(readAt.getTime() + Math.random() * 2 * 60 * 60 * 1000) // within 2 hours
    : undefined;

  const responses = ['SÍ', 'Si', 'Confirmo', 'OK', 'Dale', 'Perfecto', 'Ahí estaré'];
  const response = responded
    ? responses[Math.floor(Math.random() * responses.length)]
    : undefined;

  let status: WhatsAppMessage['status'];
  if (responded) status = 'responded';
  else if (read) status = 'read';
  else if (delivered) status = 'delivered';
  else if (Math.random() > 0.95) status = 'failed';
  else status = 'sent';

  return {
    id: `msg-${appointmentId}-${type}`,
    appointmentId,
    patientId: patient.id,
    patientName: `${patient.firstName} ${patient.lastName}`,
    patientPhone: patient.contact.phone,
    type,
    content,
    sentAt: sentDate,
    deliveredAt,
    readAt,
    respondedAt,
    response,
    status
  };
}

export function generateMockMessages(): WhatsAppMessage[] {
  const messages: WhatsAppMessage[] = [];
  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Get appointments from last 30 days and next 7 days
  const sevenDaysFromNow = new Date(now);
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

  const relevantAppointments = MOCK_APPOINTMENTS.filter(apt => 
    apt.date >= thirtyDaysAgo && apt.date <= sevenDaysFromNow
  );

  relevantAppointments.forEach(apt => {
    const aptDate = new Date(apt.date);

    // 48h reminder
    const reminder48h = new Date(aptDate);
    reminder48h.setDate(reminder48h.getDate() - 2);
    if (reminder48h >= thirtyDaysAgo && reminder48h <= now) {
      const msg = generateMessage(apt.id, 'reminder-48h', reminder48h);
      if (msg) messages.push(msg);
    }

    // 24h reminder
    const reminder24h = new Date(aptDate);
    reminder24h.setDate(reminder24h.getDate() - 1);
    if (reminder24h >= thirtyDaysAgo && reminder24h <= now) {
      const msg = generateMessage(apt.id, 'reminder-24h', reminder24h);
      if (msg) messages.push(msg);
    }

    // 2h reminder (for today's appointments)
    if (aptDate.toDateString() === now.toDateString()) {
      const reminder2h = new Date(aptDate);
      reminder2h.setHours(aptDate.getHours() - 2);
      if (reminder2h >= thirtyDaysAgo && reminder2h <= now) {
        const msg = generateMessage(apt.id, 'reminder-2h', reminder2h);
        if (msg) messages.push(msg);
      }
    }

    // Follow-up (for completed appointments)
    if (apt.status === 'completed' && apt.completedAt) {
      const followUp = new Date(apt.completedAt);
      followUp.setHours(followUp.getHours() + 24);
      if (followUp >= thirtyDaysAgo && followUp <= now) {
        const msg = generateMessage(apt.id, 'follow-up', followUp);
        if (msg) messages.push(msg);
      }
    }
  });

  return messages.sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());
}

export const MOCK_MESSAGES = generateMockMessages();

/**
 * Get message statistics
 */
export function getMessageStats() {
  const total = MOCK_MESSAGES.length;
  const delivered = MOCK_MESSAGES.filter(m => m.status !== 'sent' && m.status !== 'failed').length;
  const read = MOCK_MESSAGES.filter(m => m.status === 'read' || m.status === 'responded').length;
  const responded = MOCK_MESSAGES.filter(m => m.status === 'responded').length;
  const failed = MOCK_MESSAGES.filter(m => m.status === 'failed').length;

  return {
    total,
    delivered,
    read,
    responded,
    failed,
    deliveryRate: total > 0 ? Math.round((delivered / total) * 1000) / 10 : 0,
    readRate: delivered > 0 ? Math.round((read / delivered) * 1000) / 10 : 0,
    responseRate: read > 0 ? Math.round((responded / read) * 1000) / 10 : 0,
    failureRate: total > 0 ? Math.round((failed / total) * 1000) / 10 : 0
  };
}

export const MESSAGE_STATS = getMessageStats();

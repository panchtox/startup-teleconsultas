export interface Message {
  id: string;
  patientId: string;
  patientName: string;
  appointmentId: string;
  type: 'reminder' | 'confirmation' | 'followup' | 'cancellation';
  template: string;
  content: string;
  sentAt: Date;
  deliveredAt?: Date;
  readAt?: Date;
  respondedAt?: Date;
  response?: string;
  status: 'sent' | 'delivered' | 'read' | 'responded' | 'failed';
}

export interface MessageStats {
  total: number;
  sent: number;
  delivered: number;
  read: number;
  responded: number;
  failed: number;
  deliveryRate: number;
  readRate: number;
  responseRate: number;
}

const templates = {
  reminder: [
    'Hola {name}, te recordamos tu consulta de {specialty} el {date} a las {time}. ¿Confirmás tu asistencia?',
    '{name}, tu cita con Dr/a {doctor} está programada para {date} a las {time}. Respondé SÍ para confirmar.',
    'Recordatorio: Consulta de {specialty} el {date} a las {time}. Por favor confirmá tu asistencia.'
  ],
  confirmation: [
    '¡Perfecto {name}! Tu consulta del {date} a las {time} está confirmada.',
    'Gracias por confirmar. Te esperamos el {date} a las {time}.',
    'Confirmado ✓ Nos vemos el {date} a las {time}.'
  ],
  followup: [
    'Hola {name}, notamos que no pudiste asistir a tu consulta. ¿Te gustaría reagendar?',
    '{name}, ¿todo bien? Queremos ayudarte a reagendar tu consulta de {specialty}.'
  ],
  cancellation: [
    'Hola {name}, tu consulta del {date} ha sido cancelada. Contactanos para reagendar.',
    '{name}, lamentamos informarte que la consulta del {date} fue cancelada. ¿Querés reagendar?'
  ]
};

const generateMessages = (): Message[] => {
  const messages: Message[] = [];
  const now = new Date();
  
  const patientNames = [
    'Juan Pérez', 'María González', 'Carlos Rodríguez', 'Ana Martínez',
    'Luis Fernández', 'Laura López', 'Diego Sánchez', 'Carolina Romero',
    'Martín Silva', 'Sofía Torres', 'Pablo Díaz', 'Valentina Castro',
    'Andrés Morales', 'Camila Ruiz', 'Gabriel Flores', 'Lucía Navarro'
  ];

  const doctors = [
    'García', 'Fernández', 'López', 'Martínez', 'Rodríguez', 
    'Sánchez', 'Pérez', 'González', 'Torres', 'Díaz'
  ];

  const specialties = [
    'Medicina General', 'Cardiología', 'Pediatría', 'Psicología',
    'Dermatología', 'Traumatología', 'Ginecología', 'Oftalmología'
  ];

  // Generate 1200 messages over last 30 days
  for (let i = 0; i < 1200; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const sentAt = new Date(now);
    sentAt.setDate(sentAt.getDate() - daysAgo);
    sentAt.setHours(Math.floor(Math.random() * 12) + 8);
    sentAt.setMinutes(Math.floor(Math.random() * 60));

    const type = ['reminder', 'confirmation', 'followup', 'cancellation'][
      Math.floor(Math.random() * 4)
    ] as Message['type'];

    const patientName = patientNames[Math.floor(Math.random() * patientNames.length)];
    const doctor = doctors[Math.floor(Math.random() * doctors.length)];
    const specialty = specialties[Math.floor(Math.random() * specialties.length)];
    
    const appointmentDate = new Date(sentAt);
    appointmentDate.setDate(appointmentDate.getDate() + Math.floor(Math.random() * 7) + 1);
    
    const template = templates[type][Math.floor(Math.random() * templates[type].length)];
    const content = template
      .replace('{name}', patientName.split(' ')[0])
      .replace('{doctor}', doctor)
      .replace('{specialty}', specialty)
      .replace('{date}', appointmentDate.toLocaleDateString('es-AR'))
      .replace('{time}', `${appointmentDate.getHours()}:${appointmentDate.getMinutes().toString().padStart(2, '0')}`);

    const delivered = Math.random() > 0.08;
    let deliveredAt: Date | undefined;
    let readAt: Date | undefined;
    let respondedAt: Date | undefined;
    let response: string | undefined;
    let status: Message['status'] = 'sent';

    if (delivered) {
      deliveredAt = new Date(sentAt);
      deliveredAt.setMinutes(deliveredAt.getMinutes() + Math.floor(Math.random() * 5));
      status = 'delivered';

      const isRead = Math.random() > 0.22;
      if (isRead) {
        readAt = new Date(deliveredAt);
        readAt.setMinutes(readAt.getMinutes() + Math.floor(Math.random() * 30));
        status = 'read';

        const responded = Math.random() > 0.35;
        if (responded && type === 'reminder') {
          respondedAt = new Date(readAt);
          respondedAt.setMinutes(respondedAt.getMinutes() + Math.floor(Math.random() * 60));
          response = ['SÍ', 'Confirmo', 'OK', 'Ahí estaré', '👍'][Math.floor(Math.random() * 5)];
          status = 'responded';
        }
      }
    } else {
      status = 'failed';
    }

    messages.push({
      id: `msg-${i + 1}`,
      patientId: `pat-${Math.floor(Math.random() * 500) + 1}`,
      patientName,
      appointmentId: `appt-${Math.floor(Math.random() * 400) + 1}`,
      type,
      template,
      content,
      sentAt,
      deliveredAt,
      readAt,
      respondedAt,
      response,
      status
    });
  }

  return messages.sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());
};

export const mockMessages = generateMessages();

export const getMessageStats = (): MessageStats => {
  const total = mockMessages.length;
  const sent = mockMessages.filter(m => m.status !== 'failed').length;
  const delivered = mockMessages.filter(m => m.deliveredAt).length;
  const read = mockMessages.filter(m => m.readAt).length;
  const responded = mockMessages.filter(m => m.respondedAt).length;
  const failed = mockMessages.filter(m => m.status === 'failed').length;

  return {
    total,
    sent,
    delivered,
    read,
    responded,
    failed,
    deliveryRate: (delivered / sent) * 100,
    readRate: (read / delivered) * 100,
    responseRate: (responded / read) * 100
  };
};

export const getMessagesByType = () => {
  return {
    reminder: mockMessages.filter(m => m.type === 'reminder').length,
    confirmation: mockMessages.filter(m => m.type === 'confirmation').length,
    followup: mockMessages.filter(m => m.type === 'followup').length,
    cancellation: mockMessages.filter(m => m.type === 'cancellation').length
  };
};

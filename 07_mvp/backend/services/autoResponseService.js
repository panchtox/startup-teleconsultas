/**
 * ========================================
 * SERVICIO: Respuestas Automáticas
 * ========================================
 * 
 * Lógica de procesamiento de mensajes del paciente y generación
 * de respuestas automáticas inteligentes.
 */

/**
 * Procesa un mensaje recibido del paciente y genera una respuesta automática
 * 
 * @param {string} messageText - Texto del mensaje recibido (en minúsculas)
 * @param {Object} context - Contexto adicional (nombre paciente, consulta, etc)
 * @returns {Object} - { response: string, action: string }
 */
function processIncomingMessage(messageText, context = {}) {
  const text = messageText.toLowerCase().trim();

  console.log('🤖 Procesando mensaje:', messageText);
  console.log('   - Contexto:', context);

  // ========================================
  // 1. CONFIRMACIONES DE ASISTENCIA
  // ========================================
  if (isConfirmation(text)) {
    return {
      response: `¡Perfecto! ✅ Tu consulta quedó confirmada para el ${context.appointmentDate || 'jueves 14/11'} a las ${context.appointmentTime || '15:00hs'}. Te sumaremos +5 puntos a tu score de reputación. ¡Nos vemos!`,
      action: 'CONFIRMED',
      scoreChange: +5
    };
  }

  // ========================================
  // 2. CANCELACIONES
  // ========================================
  if (isCancellation(text)) {
    return {
      response: 'Entendido. ¿Querés reprogramar para otro día? Respondé REPROGRAMAR o llamanos al 0800-XXX-XXXX para coordinar.',
      action: 'CANCELLED',
      scoreChange: -10
    };
  }

  // ========================================
  // 3. SOLICITUD DE REPROGRAMACIÓN
  // ========================================
  if (isRescheduleRequest(text)) {
    return {
      response: 'Para reprogramar tu consulta, llamanos al 0800-XXX-XXXX o escribinos por acá con tu disponibilidad horaria y te coordinamos. ¿Qué días y horarios te vienen bien?',
      action: 'RESCHEDULE_REQUESTED',
      scoreChange: 0
    };
  }

  // ========================================
  // 4. PREGUNTAS FRECUENTES - AYUNAS
  // ========================================
  if (isAboutFasting(text)) {
    return {
      response: 'Para consultas de cardiología NO necesitás ayuno. Para análisis de sangre sí se requiere 8-12hs de ayuno. ¿Te ayudo en algo más?',
      action: 'FAQ_ANSWERED',
      scoreChange: 0
    };
  }

  // ========================================
  // 5. PREGUNTAS SOBRE HORARIO
  // ========================================
  if (isAboutSchedule(text)) {
    return {
      response: `Tu consulta está programada para el ${context.appointmentDate || 'jueves 14/11'} a las ${context.appointmentTime || '15:00hs'}. ¿Querés modificar el horario?`,
      action: 'FAQ_ANSWERED',
      scoreChange: 0
    };
  }

  // ========================================
  // 6. PREGUNTAS SOBRE UBICACIÓN
  // ========================================
  if (isAboutLocation(text)) {
    return {
      response: 'Consultorio en Av. Corrientes 1234, CABA. 🗺️ Te envío el link de Google Maps: https://goo.gl/maps/example. ¿Te ayudo en algo más?',
      action: 'FAQ_ANSWERED',
      scoreChange: 0
    };
  }

  // ========================================
  // 7. PREGUNTA SOBRE DOCUMENTACIÓN
  // ========================================
  if (isAboutDocumentation(text)) {
    return {
      response: 'Recordá traer: DNI, credencial de la obra social/prepaga, y estudios previos si tenés. ¿Necesitás saber algo más?',
      action: 'FAQ_ANSWERED',
      scoreChange: 0
    };
  }

  // ========================================
  // 8. SALUDOS
  // ========================================
  if (isGreeting(text)) {
    return {
      response: `¡Hola ${context.patientName || ''}! 👋 Soy el asistente virtual de TeleAssist. ¿En qué puedo ayudarte con tu consulta?`,
      action: 'GREETING',
      scoreChange: 0
    };
  }

  // ========================================
  // 9. AGRADECIMIENTOS
  // ========================================
  if (isThanks(text)) {
    return {
      response: '¡De nada! Estoy acá para ayudarte. Si tenés más dudas, escribime cuando quieras. ¡Que tengas un buen día! 😊',
      action: 'THANKS',
      scoreChange: 0
    };
  }

  // ========================================
  // 10. DEFAULT - PREGUNTA NO RECONOCIDA
  // ========================================
  return {
    response: 'Gracias por tu mensaje. El Dr. Gómez responderá tus dudas específicas durante la videollamada. ¿Confirmás tu asistencia para el jueves 14/11 a las 15:00hs? Respondé SÍ o NO.',
    action: 'UNKNOWN_QUERY',
    scoreChange: 0
  };
}

// ========================================
// FUNCIONES AUXILIARES DE DETECCIÓN
// ========================================

function isConfirmation(text) {
  const confirmations = ['si', 'sí', 'confirmo', 'ok', 'vale', 'dale', 'perfecto', 'confirm', 'yes', 'seguro'];
  return confirmations.some(word => text.includes(word));
}

function isCancellation(text) {
  const cancellations = ['no', 'cancelar', 'cancelo', 'no puedo', 'imposible', 'me cancelo', 'cancel'];
  return cancellations.some(word => text.includes(word));
}

function isRescheduleRequest(text) {
  const reschedule = ['reprogramar', 'cambiar', 'mover', 'otro dia', 'otro horario', 'reschedule'];
  return reschedule.some(word => text.includes(word));
}

function isAboutFasting(text) {
  const fasting = ['ayuna', 'ayuno', 'comer', 'desayuno', 'comida', 'tomar agua'];
  return fasting.some(word => text.includes(word));
}

function isAboutSchedule(text) {
  const schedule = ['horario', 'hora', 'cuando', 'que dia', 'qué día', 'fecha'];
  return schedule.some(word => text.includes(word));
}

function isAboutLocation(text) {
  const location = ['donde', 'dónde', 'direccion', 'dirección', 'ubicacion', 'ubicación', 'consultorio', 'mapa', 'maps'];
  return location.some(word => text.includes(word));
}

function isAboutDocumentation(text) {
  const docs = ['documento', 'dni', 'credencial', 'llevar', 'traer', 'necesito', 'papeles'];
  return docs.some(word => text.includes(word));
}

function isGreeting(text) {
  const greetings = ['hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'hey', 'hello'];
  return greetings.some(word => text.includes(word));
}

function isThanks(text) {
  const thanks = ['gracias', 'muchas gracias', 'graciass', 'thanks', 'thank you', 'grax'];
  return thanks.some(word => text.includes(word));
}

module.exports = {
  processIncomingMessage
};

/**
 * ========================================
 * SERVICIO: Cliente Meta WhatsApp API
 * ========================================
 * 
 * Maneja todas las interacciones con la API de WhatsApp de Meta:
 * - Envío de mensajes de texto
 * - Envío de mensajes con botones
 * - Marcado de mensajes como leídos
 */

const axios = require('axios');
require('dotenv').config();

const META_API_BASE_URL = process.env.META_API_BASE_URL || 'https://graph.facebook.com';
const META_API_VERSION = process.env.META_API_VERSION || 'v21.0';
const PHONE_NUMBER_ID = process.env.META_WHATSAPP_PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

/**
 * Envía un mensaje de texto simple a un número de WhatsApp
 * 
 * @param {string} to - Número de destino (formato: 5491123456789)
 * @param {string} message - Texto del mensaje
 * @returns {Promise<Object>} - Respuesta de la API de Meta
 */
async function sendTextMessage(to, message) {
  const url = `${META_API_BASE_URL}/${META_API_VERSION}/${PHONE_NUMBER_ID}/messages`;

  const data = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: to,
    type: 'text',
    text: {
      preview_url: false,
      body: message
    }
  };

  try {
    console.log(`📤 Enviando mensaje a ${to}:`, message.substring(0, 50) + '...');
    
    const response = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Mensaje enviado exitosamente');
    console.log('   - Message ID:', response.data.messages[0].id);
    
    return {
      success: true,
      messageId: response.data.messages[0].id,
      data: response.data
    };
  } catch (error) {
    console.error('❌ Error al enviar mensaje:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
}

/**
 * Envía un mensaje con botones interactivos
 * 
 * @param {string} to - Número de destino
 * @param {string} bodyText - Texto del mensaje
 * @param {Array<Object>} buttons - Array de botones [{id: '1', title: 'SÍ'}, ...]
 * @returns {Promise<Object>} - Respuesta de la API
 */
async function sendButtonMessage(to, bodyText, buttons) {
  const url = `${META_API_BASE_URL}/${META_API_VERSION}/${PHONE_NUMBER_ID}/messages`;

  // Formatear botones según el formato de Meta
  const formattedButtons = buttons.map(btn => ({
    type: 'reply',
    reply: {
      id: btn.id,
      title: btn.title
    }
  }));

  const data = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: to,
    type: 'interactive',
    interactive: {
      type: 'button',
      body: {
        text: bodyText
      },
      action: {
        buttons: formattedButtons
      }
    }
  };

  try {
    console.log(`📤 Enviando mensaje con botones a ${to}`);
    
    const response = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Mensaje con botones enviado exitosamente');
    
    return {
      success: true,
      messageId: response.data.messages[0].id,
      data: response.data
    };
  } catch (error) {
    console.error('❌ Error al enviar mensaje con botones:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
}

/**
 * Marca un mensaje como leído
 * 
 * @param {string} messageId - ID del mensaje a marcar como leído
 * @returns {Promise<Object>} - Respuesta de la API
 */
async function markMessageAsRead(messageId) {
  const url = `${META_API_BASE_URL}/${META_API_VERSION}/${PHONE_NUMBER_ID}/messages`;

  const data = {
    messaging_product: 'whatsapp',
    status: 'read',
    message_id: messageId
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Mensaje marcado como leído:', messageId);
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('❌ Error al marcar mensaje como leído:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
}

module.exports = {
  sendTextMessage,
  sendButtonMessage,
  markMessageAsRead
};

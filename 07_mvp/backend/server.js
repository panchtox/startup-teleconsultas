/**
 * ========================================
 * SERVIDOR EXPRESS - WEBHOOK WHATSAPP + CHAT
 * ========================================
 * 
 * Backend para demo TeleAssist con Meta WhatsApp API + GitHub Models Chat
 * 
 * Endpoints:
 * - GET /webhook  -> Verificación inicial de Meta
 * - POST /webhook -> Recepción de mensajes de pacientes
 * - POST /api/send-demo-message -> Envío manual para demo
 * - POST /api/chat -> Chat con LLM sobre TeleAssist
 * - GET /api/chat/health -> Health check del chat
 * 
 * Autor: TeleAssist
 * Fecha: Noviembre 2025
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const { verifyWebhook } = require('./utils/webhookVerification');
const { sendTextMessage, sendButtonMessage, markMessageAsRead } = require('./services/metaWhatsAppService');
const { processIncomingMessage } = require('./services/autoResponseService');
const { handleChat, healthCheck: chatHealthCheck } = require('./routes/chat');

// ========================================
// CONFIGURACIÓN EXPRESS
// ========================================
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ========================================
// ENDPOINT: Verificación del Webhook (GET)
// ========================================
app.get('/webhook', (req, res) => {
  console.log('\n🔔 Recibida petición de verificación de webhook');
  
  const result = verifyWebhook(req.query, process.env.META_WEBHOOK_VERIFY_TOKEN);

  if (result.success) {
    console.log('✅ Webhook verificado exitosamente');
    return res.status(200).send(result.challenge.toString());
  } else {
    console.error('❌ Verificación fallida:', result.error);
    return res.status(403).send('Forbidden');
  }
});

// ========================================
// ENDPOINT: Recepción de Mensajes (POST)
// ========================================
app.post('/webhook', async (req, res) => {
  console.log('\n📨 Webhook POST recibido');
  
  try {
    const body = req.body;

    // Verificar que es un mensaje de WhatsApp
    if (body.object === 'whatsapp_business_account') {
      
      // Meta puede enviar múltiples entries en un solo webhook
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          
          // Solo procesar mensajes (no status updates)
          if (change.field === 'messages') {
            const value = change.value;

            // Verificar que hay mensajes
            if (value.messages && value.messages.length > 0) {
              const message = value.messages[0];
              
              console.log('📱 Mensaje recibido:');
              console.log('   - De:', message.from);
              console.log('   - ID:', message.id);
              console.log('   - Tipo:', message.type);

              // Solo procesar mensajes de texto
              if (message.type === 'text') {
                const messageText = message.text.body;
                const senderPhone = message.from;
                const messageId = message.id;

                console.log('   - Contenido:', messageText);

                // Marcar como leído
                await markMessageAsRead(messageId);

                // Procesar y generar respuesta automática
                const context = {
                  patientName: 'Juan', // TODO: Obtener de base de datos
                  appointmentDate: 'jueves 14/11',
                  appointmentTime: '15:00hs'
                };

                const result = processIncomingMessage(messageText, context);

                console.log('🤖 Respuesta generada:');
                console.log('   - Acción:', result.action);
                console.log('   - Score change:', result.scoreChange);
                console.log('   - Respuesta:', result.response);

                // Enviar respuesta automática
                await sendTextMessage(senderPhone, result.response);

                // TODO: Actualizar base de datos con la acción y score change
                // TODO: Emitir evento via WebSocket al frontend para actualizar UI en tiempo real
              }
            }
          }
        }
      }

      // Siempre responder 200 OK a Meta para confirmar recepción
      return res.status(200).send('EVENT_RECEIVED');
    } else {
      // No es un mensaje de WhatsApp
      return res.status(404).send('Not Found');
    }
  } catch (error) {
    console.error('❌ Error procesando webhook:', error);
    return res.status(500).send('Internal Server Error');
  }
});

// ========================================
// ENDPOINT: Envío Manual para Demo (POST)
// ========================================
app.post('/api/send-demo-message', async (req, res) => {
  console.log('\n📤 Petición de envío de mensaje demo');
  
  try {
    const { to, message, useButtons } = req.body;

    if (!to || !message) {
      return res.status(400).json({
        success: false,
        error: 'Faltan parámetros: to y message son requeridos'
      });
    }

    let result;

    if (useButtons) {
      // Enviar con botones de confirmación
      const buttons = [
        { id: '1', title: 'SÍ ✅' },
        { id: '2', title: 'NO ❌' }
      ];
      result = await sendButtonMessage(to, message, buttons);
    } else {
      // Enviar mensaje de texto simple
      result = await sendTextMessage(to, message);
    }

    if (result.success) {
      return res.status(200).json({
        success: true,
        messageId: result.messageId,
        message: 'Mensaje enviado exitosamente'
      });
    } else {
      return res.status(500).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    console.error('❌ Error en /api/send-demo-message:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ========================================
// ENDPOINTS: CHAT CON LLM
// ========================================

// POST /api/chat - Enviar mensaje al chat
app.post('/api/chat', handleChat);

// GET /api/chat/health - Health check del servicio de chat
app.get('/api/chat/health', chatHealthCheck);

// ========================================
// ENDPOINT: Health Check
// ========================================
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'TeleAssist WhatsApp Backend',
    timestamp: new Date().toISOString()
  });
});

// ========================================
// ENDPOINT: Root
// ========================================
app.get('/', (req, res) => {
  res.status(200).json({
    message: '🏥 TeleAssist WhatsApp Backend',
    version: '1.0.0',
    endpoints: {
      'GET /webhook': 'Verificación del webhook',
      'POST /webhook': 'Recepción de mensajes',
      'POST /api/send-demo-message': 'Envío manual para demo',
      'POST /api/chat': 'Chat con LLM sobre TeleAssist',
      'GET /api/chat/health': 'Health check del chat',
      'GET /health': 'Health check general'
    }
  });
});

// ========================================
// INICIAR SERVIDOR
// ========================================
app.listen(PORT, () => {
  console.log('\n🚀 ========================================');
  console.log('🏥 TeleAssist WhatsApp Backend + Chat');
  console.log('========================================');
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
  console.log(`📡 Webhook URL: http://localhost:${PORT}/webhook`);
  console.log(`💬 Chat API: http://localhost:${PORT}/api/chat`);
  console.log(`💊 Health check: http://localhost:${PORT}/health`);
  console.log('========================================\n');

  // Verificar variables de entorno críticas
  const requiredEnvVars = [
    'META_WHATSAPP_PHONE_NUMBER_ID',
    'META_ACCESS_TOKEN',
    'META_WEBHOOK_VERIFY_TOKEN'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.warn('⚠️  ADVERTENCIA: Faltan variables de entorno:');
    missingVars.forEach(varName => console.warn(`   - ${varName}`));
    console.warn('   Revisá el archivo .env\n');
  } else {
    console.log('✅ Todas las variables de entorno configuradas\n');
  }

  // Verificar configuración del chat
  if (!process.env.GITHUB_TOKEN) {
    console.warn('⚠️  ADVERTENCIA: GITHUB_TOKEN no configurado');
    console.warn('   El chat con LLM no funcionará hasta que agregues tu token\n');
  } else {
    console.log('✅ Chat con LLM habilitado (GitHub Models)\n');
  }
});

module.exports = app;

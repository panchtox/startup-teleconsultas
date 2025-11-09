# TeleAssist WhatsApp Backend

Backend webhook para integración con Meta WhatsApp API - Demo en vivo

## 🎯 Propósito

Servidor Express que:
- ✅ Recibe mensajes de pacientes vía webhook de Meta
- ✅ Procesa y responde automáticamente según la intención del mensaje
- ✅ Actualiza scoring de reputación del paciente
- ✅ Provee endpoint para envío manual de mensajes (demo)

## 📂 Estructura

```
backend/
├── server.js                      # Servidor Express principal
├── package.json                   # Dependencias
├── .env.example                   # Template de variables de entorno
├── services/
│   ├── metaWhatsAppService.js    # Cliente API de Meta
│   └── autoResponseService.js    # Lógica de respuestas automáticas
└── utils/
    └── webhookVerification.js    # Validación webhook Meta
```

## 🚀 Instalación

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar variables de entorno

Copiar `.env.example` a `.env` y completar con las credenciales de Meta:

```bash
cp .env.example .env
```

Editar `.env` y completar:
```
META_WHATSAPP_PHONE_NUMBER_ID=tu_phone_number_id
META_WHATSAPP_BUSINESS_ACCOUNT_ID=tu_business_account_id
META_ACCESS_TOKEN=tu_access_token
META_WEBHOOK_VERIFY_TOKEN=teleassist_webhook_2024
```

### 3. Iniciar servidor

**Modo desarrollo (con auto-reload):**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor arranca en `http://localhost:3000`

## 🔌 Endpoints

### GET /webhook
**Verificación inicial del webhook por Meta**

Meta envía una petición GET para verificar que el webhook es válido antes de empezar a enviar eventos.

**Parámetros de query:**
- `hub.mode`: debe ser "subscribe"
- `hub.verify_token`: debe coincidir con `META_WEBHOOK_VERIFY_TOKEN`
- `hub.challenge`: número que debemos devolver si todo OK

**Respuesta exitosa:** `200 OK` con el challenge

### POST /webhook
**Recepción de mensajes de pacientes**

Meta envía eventos cuando un paciente responde al recordatorio.

**Flujo:**
1. Recibe mensaje del paciente
2. Marca mensaje como leído
3. Procesa intención con `autoResponseService`
4. Genera y envía respuesta automática
5. Actualiza scoring (TODO: integrar con DB)

### POST /api/send-demo-message
**Envío manual de mensaje para demo en vivo**

Permite al frontend enviar mensajes programáticamente durante la demo.

**Body JSON:**
```json
{
  "to": "5491123456789",
  "message": "Hola! Recordatorio: tenés consulta...",
  "useButtons": false
}
```

**Respuesta:**
```json
{
  "success": true,
  "messageId": "wamid.xxx",
  "message": "Mensaje enviado exitosamente"
}
```

### GET /health
**Health check del servicio**

```json
{
  "status": "OK",
  "service": "TeleAssist WhatsApp Backend",
  "timestamp": "2025-11-08T..."
}
```

## 🤖 Lógica de Respuestas Automáticas

El sistema detecta la intención del mensaje y responde automáticamente:

| Intención | Palabras clave | Respuesta | Score Change |
|-----------|----------------|-----------|--------------|
| **Confirmación** | sí, confirmo, ok, dale | "¡Perfecto! ✅ Tu consulta quedó confirmada..." | +5 |
| **Cancelación** | no, cancelar, no puedo | "Entendido. ¿Querés reprogramar...?" | -10 |
| **Reprogramar** | reprogramar, cambiar, mover | "Para reprogramar llamanos al..." | 0 |
| **Ayunas** | ayunas, ayuno, comer | "Para cardiología NO necesitás ayuno..." | 0 |
| **Horario** | horario, hora, cuando | "Tu consulta es el jueves 14/11..." | 0 |
| **Ubicación** | donde, dirección, mapa | "Consultorio en Av. Corrientes 1234..." | 0 |
| **Documentación** | dni, credencial, llevar | "Recordá traer: DNI, credencial..." | 0 |
| **Saludo** | hola, buenos dias | "¡Hola! 👋 Soy el asistente..." | 0 |
| **Agradecimiento** | gracias, grax | "¡De nada! Estoy acá para ayudarte..." | 0 |
| **Default** | cualquier otra | "El Dr. responderá tus dudas... ¿Confirmás?" | 0 |

## 🧪 Testing Local

### 1. Test del webhook (sin Meta)

```bash
# Health check
curl http://localhost:3000/health

# Verificación de webhook (simular Meta)
curl "http://localhost:3000/webhook?hub.mode=subscribe&hub.verify_token=teleassist_webhook_2024&hub.challenge=12345"
```

### 2. Enviar mensaje de prueba

```bash
curl -X POST http://localhost:3000/api/send-demo-message \
  -H "Content-Type: application/json" \
  -d '{
    "to": "5491123456789",
    "message": "Hola Juan! Recordatorio de tu consulta del jueves 14/11 a las 15:00hs. ¿Confirmás tu asistencia?",
    "useButtons": false
  }'
```

## 🌐 Exponer Webhook Públicamente

Para que Meta pueda enviar eventos, el webhook debe ser accesible públicamente.

### Opción 1: ngrok (recomendado para desarrollo)

```bash
# Instalar ngrok: https://ngrok.com/download

# Exponer puerto 3000
ngrok http 3000

# Copiar la URL pública (ej: https://abc123.ngrok.io)
# Usar esa URL + /webhook en Meta Developers
```

### Opción 2: Render / Railway / Fly.io (para demo estable)

Deploy gratuito en plataformas cloud.

## 🔐 Seguridad

- ✅ Verificación de token en webhook
- ✅ Validación de origen (Meta)
- ✅ HTTPS obligatorio en producción
- ❌ **NO** subir `.env` a GitHub (agregado a `.gitignore`)

## 📝 TODOs

- [ ] Integrar con base de datos (PostgreSQL) para persistir conversaciones
- [ ] Implementar WebSocket para actualizar frontend en tiempo real
- [ ] Agregar logging estructurado (Winston)
- [ ] Implementar rate limiting
- [ ] Agregar tests unitarios (Jest)
- [ ] Configurar access token permanente (actualmente temporal 24hs)

## 🐛 Troubleshooting

### El webhook no se verifica
- Verificar que `META_WEBHOOK_VERIFY_TOKEN` coincide con el configurado en Meta
- Verificar que la URL es accesible públicamente (probar con curl externo)
- Revisar logs del servidor

### No llegan mensajes
- Verificar que el número está registrado en sandbox (enviar código JOIN)
- Verificar que `META_ACCESS_TOKEN` es válido
- Verificar que `META_WHATSAPP_PHONE_NUMBER_ID` es correcto
- Revisar logs de Meta Developers

### Error al enviar mensajes
- Verificar formato del número: debe ser internacional sin + (ej: 5491123456789)
- Verificar que el access token no expiró
- Revisar respuesta de error de la API de Meta

## 📚 Documentación Meta

- **WhatsApp Cloud API:** https://developers.facebook.com/docs/whatsapp/cloud-api
- **Webhooks:** https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks
- **Send Messages:** https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages

---

**Última actualización:** Noviembre 2025  
**Versión:** 1.0.0  
**Autor:** TeleAssist Team

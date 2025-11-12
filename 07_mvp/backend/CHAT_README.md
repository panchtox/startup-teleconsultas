# 💬 Chat con LLM - TeleAssist

Sistema de chat inteligente que responde preguntas sobre TeleAssist usando GitHub Models (tier gratuito).

## 🎯 Características

- **Contextual**: Conoce datos actuales del sistema (pacientes, consultas, métricas)
- **Inteligente**: Usa GPT-4o-mini de OpenAI vía GitHub Models
- **Gratuito**: Free tier con 10 RPM, 50 RPD
- **Sin fricción**: Solo necesitas un Personal Access Token de GitHub

## 📋 Requisitos

1. Cuenta de GitHub (gratuita)
2. Personal Access Token de GitHub
3. Node.js >= 18.0.0
4. Dependencia `openai` instalada

## 🔧 Configuración

### 1. Obtener GitHub Token

1. Ve a https://github.com/settings/tokens
2. Click en "Generate new token (classic)"
3. NO necesitas seleccionar ningún scope
4. Copia el token generado

### 2. Configurar .env

Agrega tu token al archivo `.env`:

```bash
GITHUB_TOKEN=tu_github_personal_access_token_aqui
```

### 3. Instalar dependencias

```bash
npm install
```

## 🚀 Uso

### Iniciar el servidor

```bash
npm run dev
```

El chat estará disponible en: `http://localhost:3000/api/chat`

### Endpoint: POST /api/chat

**Request:**
```json
{
  "message": "¿Cuántos pacientes tenemos activos?",
  "conversationHistory": [
    { "role": "user", "content": "Hola" },
    { "role": "assistant", "content": "Hola! ¿En qué puedo ayudarte?" }
  ]
}
```

**Response:**
```json
{
  "message": "Actualmente tenemos 500 pacientes activos en el sistema...",
  "model": "gpt-4o-mini",
  "usage": {
    "promptTokens": 150,
    "completionTokens": 50,
    "totalTokens": 200
  }
}
```

### Health Check: GET /api/chat/health

**Response:**
```json
{
  "status": "ok",
  "chatEnabled": true,
  "model": "gpt-4o-mini",
  "provider": "GitHub Models"
}
```

## 📊 Límites Free Tier

### GitHub Models - Modelos High (GPT-4o)
- **Requests por minuto**: 10 RPM
- **Requests por día**: 50 RPD
- **Tokens input**: 8,000 max
- **Tokens output**: 4,000 max
- **Requests concurrentes**: 2

### Manejo de Rate Limiting

El endpoint responde con `429 Too Many Requests` si se exceden los límites:

```json
{
  "error": "Rate limit exceeded. Please try again later.",
  "retryAfter": 60
}
```

## 🧠 System Prompt

El asistente tiene contexto sobre:
- **TeleAssist**: Plataforma B2B SaaS para reducir ausentismo
- **Datos actuales**: 500 pacientes, 520 consultas, 73% reducción
- **Funcionalidades**: Recordatorios WhatsApp, reputación gamificada, analytics
- **Capacidades**: Responder preguntas, sugerir acciones, explicar métricas

## 🔄 Migración a Azure AI (Escalado)

Para escalar a producción, solo cambia:

```javascript
const client = new OpenAI({
  baseURL: 'https://YOUR-RESOURCE.openai.azure.com', // <- Solo esto cambia
  apiKey: process.env.AZURE_API_KEY
});
```

El resto del código es compatible sin cambios.

## 📝 Ejemplos de Preguntas

### Métricas
- "¿Cuántos pacientes tenemos activos?"
- "¿Cuál es nuestra tasa de reducción de ausentismo?"
- "¿Cuántas consultas hay programadas?"

### Funcionalidades
- "¿Cómo funciona el sistema de reputación?"
- "¿Qué badges pueden obtener los pacientes?"
- "¿Cómo se envían los recordatorios?"

### Acciones
- "Muéstrame pacientes con score bajo"
- "¿Cómo crear una nueva consulta?"
- "¿Cómo exportar el listado de pacientes?"

## 🐛 Troubleshooting

### Error: "GitHub token not configured"

**Causa**: Falta `GITHUB_TOKEN` en `.env`

**Solución**:
```bash
# Agregar al .env
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

### Error 429: Rate limit exceeded

**Causa**: Excediste 10 RPM o 50 RPD

**Solución**:
- Esperar 1 minuto (RPM)
- Esperar hasta el día siguiente (RPD)
- Implementar rate limiting en el frontend

### Respuestas incorrectas o desactualizadas

**Causa**: Context data hardcodeado en `chat.js`

**Solución**: Integrar con base de datos real
```javascript
const contextData = {
  patientCount: await db.patients.count(),
  appointmentCount: await db.appointments.count(),
  reductionRate: await calculateReductionRate()
};
```

## 📚 Referencias

- [GitHub Models Docs](https://docs.github.com/en/github-models)
- [Azure AI Inference API](https://learn.microsoft.com/en-us/azure/ai-studio/how-to/develop/inference-api)
- [OpenAI SDK](https://github.com/openai/openai-node)

## 🔐 Seguridad

- ✅ Usa variables de entorno para tokens
- ✅ Nunca expongas el GITHUB_TOKEN en el frontend
- ✅ Valida inputs antes de enviar al LLM
- ✅ Limita tamaño de conversationHistory (max 10 mensajes)
- ⚠️ No envíes datos sensibles de pacientes al LLM en producción

## 📈 Próximos Pasos

1. **Frontend**: Crear componente React para el chat
2. **Persistencia**: Guardar conversaciones en DB
3. **Context real**: Conectar con datos reales del sistema
4. **Rate limiting**: Implementar límite de requests en backend
5. **Streaming**: Agregar respuestas en streaming para mejor UX
6. **Analytics**: Trackear preguntas más comunes

---

**Creado por**: TeleAssist Team  
**Fecha**: Noviembre 2025  
**Status**: ✅ Backend funcional - Pendiente frontend

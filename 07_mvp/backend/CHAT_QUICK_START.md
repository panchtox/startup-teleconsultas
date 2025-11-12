# 🚀 Quick Start - Chat con LLM

Guía de 5 minutos para poner en marcha el chat.

## 1️⃣ Instalar Dependencias

```bash
cd C:\00_dev\00_playground\startup-teleconsultas\07_mvp\backend
npm install
```

## 2️⃣ Obtener GitHub Token

1. Ve a: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. **NO necesitas seleccionar scopes**
4. Click "Generate token"
5. Copia el token (empieza con `ghp_`)

## 3️⃣ Configurar .env

Abrí el archivo `.env` y agregá tu token:

```bash
# ... otras variables ...

# Chat con LLM (GitHub Models)
GITHUB_TOKEN=ghp_tu_token_aqui
```

## 4️⃣ Iniciar Servidor

```bash
npm run dev
```

Deberías ver:

```
🚀 ========================================
🏥 TeleAssist WhatsApp Backend + Chat
========================================
✅ Servidor corriendo en puerto 3000
📡 Webhook URL: http://localhost:3000/webhook
💬 Chat API: http://localhost:3000/api/chat
💊 Health check: http://localhost:3000/health
========================================

✅ Chat con LLM habilitado (GitHub Models)
```

## 5️⃣ Probar el Chat

### Opción A: Script de prueba automático

```bash
node scripts/test-chat.js
```

### Opción B: Curl manual

```bash
# Health check
curl http://localhost:3000/api/chat/health

# Enviar mensaje
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"¿Cuántos pacientes tenemos?\"}"
```

### Opción C: Postman / Insomnia

**POST** `http://localhost:3000/api/chat`

**Body (JSON)**:
```json
{
  "message": "¿Cómo funciona el sistema de reputación?"
}
```

## ✅ Todo Funcionando

Si ves una respuesta del LLM, ¡todo está funcionando! 🎉

## 🐛 Problemas Comunes

### "GitHub token not configured"

**Fix**: Verificá que agregaste `GITHUB_TOKEN` al `.env` y reiniciaste el servidor

### "ECONNREFUSED"

**Fix**: El servidor no está corriendo. Ejecutá `npm run dev`

### Error 429 "Rate limit exceeded"

**Fix**: Esperá 1 minuto. Free tier tiene límite de 10 requests por minuto.

## 📖 Siguiente Paso

Lee el [CHAT_README.md](./CHAT_README.md) completo para más detalles.

---

**Tiempo estimado**: ⏱️ 5 minutos

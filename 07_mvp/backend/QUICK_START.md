# ⚡ QUICK START - CONFIGURACIÓN WHATSAPP

## 🎯 3 PASOS RÁPIDOS

### 1️⃣ Obtener IDs de Meta (15 min)

```
🌐 https://developers.facebook.com/apps/
   ↓
📱 TeleAssist Demo - Test1
   ↓
📋 WhatsApp > Getting Started
   ↓
📝 Copiar:
   • Phone Number ID
   • WhatsApp Business Account ID
   ↓
✏️ Pegar en: C:\...\backend\.env
```

### 2️⃣ Autorizar Número (5 min)

```
📱 Desde WhatsApp personal
   ↓
💬 Enviar: join [código]
   ↓
📞 Al número que te da Meta
   ↓
✅ Esperar confirmación
```

### 3️⃣ Test (5 min)

```bash
cd C:\00_dev\00_playground\startup-teleconsultas\07_mvp\backend
npm install
npm start
```

**Si ves:** `✅ Todas las variables de entorno configuradas`
**→ LISTO! ✅**

---

## 🔧 COMANDOS ÚTILES

### Iniciar servidor
```bash
npm start          # Modo producción
npm run dev        # Modo desarrollo (auto-reload)
```

### Test manual de envío
```bash
curl -X POST http://localhost:3000/api/send-demo-message ^
  -H "Content-Type: application/json" ^
  -d "{\"to\": \"5491123456789\", \"message\": \"Test\", \"useButtons\": false}"
```

### Health check
```bash
curl http://localhost:3000/health
```

---

## 📋 VALORES CLAVE

**Token (YA TENÉS):**
```
1381391973996627|SAcV-gIyvTnMVo9mq7K9HpU9Ojw
```

**Pendiente obtener:**
- Phone Number ID: `_______________`
- Business Account ID: `_______________`

**Ubicación de IDs en Meta:**
- Developers > TeleAssist Demo > WhatsApp > Getting Started

---

## 🚨 TROUBLESHOOTING RÁPIDO

| Error | Solución |
|-------|----------|
| "Missing environment variables" | Completar `.env` |
| "Invalid phone number" | Formato: `5491123456789` |
| "Phone not registered" | Enviar `join [código]` primero |
| "Invalid access token" | Regenerar token en Meta |

---

## ✅ CHECKLIST PRE-DEMO

- [ ] `.env` completo
- [ ] Número autorizado  
- [ ] Test exitoso
- [ ] Servidor inicia OK

**→ Listo para integrar frontend!** 🎉

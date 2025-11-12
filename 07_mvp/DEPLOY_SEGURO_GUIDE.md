# 🔒 Guía de Deploy Seguro - Chat con LLM

## ⚠️ Problema
Querés subir el chat a producción pero tenés miedo de romper lo que ya funciona en Vercel.

## ✅ Solución: Branch + Preview Deployment

### Paso 1: Crear Branch Nuevo

```bash
cd C:\00_dev\00_playground\startup-teleconsultas

# Ver en qué branch estás
git branch

# Crear y cambiar a nuevo branch
git checkout -b feature/chat-llm

# Verificar que estás en el nuevo branch
git branch
# Deberías ver: * feature/chat-llm
```

### Paso 2: Commitear los Cambios del Chat

```bash
# Ver qué archivos cambiaron
git status

# Agregar SOLO los archivos del chat
git add 07_mvp/backend/routes/
git add 07_mvp/backend/server.js
git add 07_mvp/backend/package.json
git add 07_mvp/backend/CHAT_*.md
git add 07_mvp/frontend/src/components/chat/
git add 07_mvp/frontend/src/App.tsx
git add 07_mvp/frontend/vite.config.ts
git add 07_mvp/frontend/CHAT_README.md
git add 07_mvp/CHAT_COMPLETE_SUMMARY.md

# Commit
git commit -m "feat: Add chat with LLM using GitHub Models

- Backend: API endpoints /api/chat with GitHub Models integration
- Frontend: ChatAssistant floating button component
- Docs: Complete documentation and quick start guides
- Tests: Automated test suite for backend

Status: Functional in development, ready for production deployment"

# Push al nuevo branch
git push origin feature/chat-llm
```

### Paso 3: Preview Deployment en Vercel

Vercel **automáticamente** detecta el nuevo branch y crea un Preview Deployment:

1. Ve a tu dashboard de Vercel
2. Verás un nuevo deployment con el nombre del branch
3. Te da una URL única: `https://teleassist-git-feature-chat-llm-tu-username.vercel.app`

**🎯 ESA URL es para probar. Tu producción sigue igual.**

### Paso 4: Probar el Chat en Preview

1. Abrí la URL del preview
2. **IMPORTANTE**: El chat NO funcionará todavía porque:
   - El backend sigue en tu localhost
   - Necesitás deployar el backend primero (Render/Railway)

### Paso 5A: Si TODO funciona → Merge a Main

```bash
# Volver a main
git checkout main

# Mergear el branch del chat
git merge feature/chat-llm

# Push a producción
git push origin main

# Vercel auto-deploya a producción
```

### Paso 5B: Si algo falla → Eliminás el Branch

```bash
# Volver a main (sin mergear nada)
git checkout main

# Eliminar el branch local
git branch -D feature/chat-llm

# Eliminar el branch remoto
git push origin --delete feature/chat-llm

# Tu main queda intacto, nada se rompió
```

---

## 🚨 Plan B: Rollback de Emergencia

Si hiciste merge a `main` y algo salió mal:

### Opción 1: Revert el último commit

```bash
# Ver el historial
git log --oneline

# Revertir el último commit (crea un nuevo commit que deshace los cambios)
git revert HEAD

# Push
git push origin main
```

### Opción 2: Reset Hard (más agresivo)

```bash
# Ver el hash del commit anterior al del chat
git log --oneline

# Ejemplo: el commit antes del chat es abc1234
git reset --hard abc1234

# Force push (cuidado con esto)
git push origin main --force
```

### Opción 3: Desde Vercel Dashboard

1. Ve a Vercel → Deployments
2. Encontrá el deployment anterior que funcionaba
3. Click en "⋮" → "Redeploy"
4. Se vuelve a deployar la versión vieja

---

## 📋 Checklist Antes de Mergear a Main

- [ ] Preview deployment funciona correctamente
- [ ] Backend deployado en Render/Railway
- [ ] Variable `VITE_API_BASE_URL` configurada en Vercel
- [ ] Chat probado en el preview URL
- [ ] No hay errores en la consola del navegador
- [ ] Backend responde correctamente
- [ ] Rate limiting funciona

---

## 🎯 Resumen Visual

```
Estado Actual:
main ────────────────> (producción funcionando ✅)
                ↑
                └─ Vercel deploya desde acá

Lo que vas a hacer:
main ────────────────> (producción intacta ✅)
  └─ feature/chat-llm > (preview deployment para probar 🧪)
                ↑
                └─ Vercel crea preview automático

Si funciona:
main ─────┬──────────> (producción actualizada con chat 🚀)
          ↑
          └─ merge de feature/chat-llm

Si NO funciona:
main ────────────────> (producción intacta, borras el branch ✅)
```

---

## 💡 Consejo Pro

**Siempre probá en Preview primero.**

Nunca hagas push directo a `main` de features grandes. El workflow correcto es:

1. Branch nuevo
2. Commits
3. Push del branch
4. Preview deployment
5. Testing
6. Merge a main

---

**Tiempo estimado**: 10 minutos para setup del branch
**Nivel de riesgo**: 0% (tu main queda intacto)

---

¿Arrancamos con el branch? Te guío paso a paso. 🚀

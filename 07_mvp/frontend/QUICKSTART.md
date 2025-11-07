# 🚀 INSTRUCCIONES RÁPIDAS - MVP FRONTEND

## ✅ SPRINT 1 COMPLETADO AL 100%

Todo está listo para empezar el Sprint 2.

---

## 🏃 START RÁPIDO

```bash
# 1. Abrir terminal en la carpeta del proyecto
cd C:\00_dev\00_playground\startup-teleconsultas\07_mvp\frontend

# 2. Instalar dependencias (solo primera vez)
npm install

# 3. Instalar lucide-react (IMPORTANTE)
npm install lucide-react

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Abrir navegador
# http://localhost:5173
```

---

## ✅ LO QUE YA FUNCIONA

1. **Layout completo**
   - Sidebar con navegación a 7 páginas
   - Topbar con búsqueda y notificaciones
   - Responsive

2. **Navegación**
   - Dashboard (/)
   - Pacientes (/patients)
   - Consultas (/appointments)
   - Reputación (/reputation)
   - Mensajes (/messages)
   - Reportes (/reports)
   - Configuración (/settings)

3. **Mock Data**
   - 500 pacientes argentinos
   - 520 consultas
   - 15 médicos
   - Métricas calculadas
   - 12 badges
   - 1,200+ mensajes WhatsApp

4. **Types**
   - Patient, Doctor, Appointment
   - SystemMetrics, ROIMetrics
   - Todos los tipos necesarios

---

## 🎯 PRÓXIMO SPRINT - DASHBOARD

### Lo que vamos a crear:

```typescript
// Dashboard principal con:
- 4 métricas destacadas (Pacientes, Asistencia, Ahorro, Consultas)
- Gráfico de ausentismo temporal
- Lista de próximas 10 consultas
- Panel de alertas
- Timeline de actividad reciente
```

### Librerías necesarias:
```bash
npm install recharts date-fns
```

### Componentes a crear:
```
src/components/dashboard/
  ├── MetricCard.tsx
  ├── AttendanceChart.tsx
  ├── UpcomingAppointments.tsx
  ├── AlertsPanel.tsx
  └── RecentActivity.tsx

src/pages/
  └── Dashboard.tsx
```

---

## 📁 ARCHIVOS IMPORTANTES

- `SPRINT1_COMPLETE.md` - Documentación completa Sprint 1
- `SPRINT1_RESUMEN.md` - Resumen ejecutivo
- `README.md` - Documentación general
- Este archivo - Instrucciones rápidas

---

## 🐛 TROUBLESHOOTING

### Error: "Cannot find module 'lucide-react'"
```bash
npm install lucide-react
```

### Error: "Module not found @/..."
```bash
# Verificar que tsconfig.json tenga:
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Puerto 5173 ocupado
```bash
# Cambiar puerto en vite.config.ts:
export default defineConfig({
  server: {
    port: 3000
  }
})
```

### Estilos no se aplican
```bash
# Verificar tailwind.config.js:
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]
```

---

## ✅ CHECKLIST ANTES DE EMPEZAR SPRINT 2

- [ ] `npm install` completado sin errores
- [ ] `npm install lucide-react` instalado
- [ ] `npm run dev` corre sin errores
- [ ] Layout se ve correctamente en http://localhost:5173
- [ ] Navegación funciona entre páginas
- [ ] No hay errores en la consola del navegador
- [ ] TypeScript no muestra errores rojos en VSCode

---

## 🎯 COMANDOS ÚTILES

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo

# Build
npm run build           # Build para producción
npm run preview         # Preview del build

# Calidad
npm run lint            # Lint con ESLint
npm run type-check      # Verificar tipos

# Limpiar
rm -rf node_modules package-lock.json
npm install             # Reinstalar todo
```

---

## 📊 PROGRESO ACTUAL

```
Sprint 1 ████████████ 100% ✅
Sprint 2 ░░░░░░░░░░░░   0% ⏳ PRÓXIMO
Sprint 3 ░░░░░░░░░░░░   0%
Sprint 4 ░░░░░░░░░░░░   0%
Sprint 5 ░░░░░░░░░░░░   0%
Sprint 6 ░░░░░░░░░░░░   0%
Sprint 7 ░░░░░░░░░░░░   0%
Sprint 8 ░░░░░░░░░░░░   0%

TOTAL: 12.5% (1/8 sprints)
```

---

## 🎉 ¡TODO LISTO PARA SPRINT 2!

El proyecto está **100% funcional** y listo para continuar con el Dashboard Principal.

**Tiempo estimado Sprint 2:** 15-20 horas
**Objetivo Sprint 2:** Dashboard completo con métricas, gráficos y listas

---

**Última actualización**: 2025-01-13

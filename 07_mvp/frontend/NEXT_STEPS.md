# 🚀 Guía Rápida para Continuar - Sprint 5

## ✅ Estado Actual
- **Sprint 4:** ✅ COMPLETO (100%)
- **Build:** ✅ SIN ERRORES
- **Deploy:** ✅ READY
- **Progreso:** 57% (4/7 sprints)

---

## 📋 Comandos Útiles

### Verificar Build Local
```bash
cd C:\00_dev\00_playground\startup-teleconsultas\07_mvp\frontend
npm run build
```

### Ejecutar Desarrollo
```bash
npm run dev
# Abre: http://localhost:5173
```

### Verificar Tipos
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

---

## 🎯 Siguiente Sprint: Sistema de Reputación

### Objetivo
Crear visualización completa del sistema de scoring y gamificación.

### Componentes a Crear

#### 1. Página Principal
**Archivo:** `src/pages/Reputation.tsx`

**Secciones:**
- Hero con explicación del sistema
- Visual de los 5 niveles
- Tabla de ranking TOP 50
- Catálogo de badges (12 tipos)
- FAQs sobre el sistema

#### 2. Componente: Explicador de Niveles
**Archivo:** `src/components/reputation/LevelExplainer.tsx`

**Features:**
- Card por cada nivel (Nuevo, Estándar, Premium, Elite, En Riesgo)
- Rango de score (0-100)
- Beneficios por nivel
- Animación de progreso
- Tooltips informativos

#### 3. Componente: Ranking de Pacientes
**Archivo:** `src/components/reputation/PatientRanking.tsx`

**Features:**
- Tabla TOP 50 pacientes por score
- Columnas: Posición, Paciente, Score, Nivel, Badges
- Filtros: Por nivel, por badges
- Búsqueda
- Exportar a CSV

#### 4. Componente: Catálogo de Badges
**Archivo:** `src/components/reputation/BadgeCatalog.tsx`

**Features:**
- Grid de 12 badges
- Por categoría: Asistencia, Puntualidad, Engagement, Salud, Especial
- Card por badge con: Ícono, Nombre, Descripción, Rareza, Cómo obtener
- Progreso si está en curso
- Modal con detalle completo

#### 5. Componente: Simulador de Score
**Archivo:** `src/components/reputation/ScoreSimulator.tsx`

**Features:**
- Input de acciones (asistir, faltar, cancelar, etc.)
- Cálculo en tiempo real del impacto
- Visualización de cambio de nivel
- Historial de cambios
- Reset simulator

---

## 📊 Mock Data Necesario

### Archivo: `src/mock-data/reputation.ts`

```typescript
// Datos a generar:
- TOP_PATIENTS_RANKING (50 pacientes ordenados)
- BADGE_CATALOG (12 badges con metadatos)
- LEVEL_CONFIG (5 niveles con detalles)
- SCORE_ACTIONS (acciones y su impacto)
```

---

## 🎨 Design System - Colores por Nivel

```typescript
const LEVEL_COLORS = {
  'Elite': {
    bg: 'bg-purple-50',
    border: 'border-purple-500',
    text: 'text-purple-700',
    badge: 'bg-purple-100',
  },
  'Premium': {
    bg: 'bg-blue-50',
    border: 'border-blue-500',
    text: 'text-blue-700',
    badge: 'bg-blue-100',
  },
  'Estándar': {
    bg: 'bg-green-50',
    border: 'border-green-500',
    text: 'text-green-700',
    badge: 'bg-green-100',
  },
  'Nuevo': {
    bg: 'bg-gray-50',
    border: 'border-gray-400',
    text: 'text-gray-700',
    badge: 'bg-gray-100',
  },
  'En Riesgo': {
    bg: 'bg-red-50',
    border: 'border-red-500',
    text: 'text-red-700',
    badge: 'bg-red-100',
  },
}
```

---

## 📝 Checklist Sprint 5

### Setup (Día 1)
- [ ] Crear estructura de carpetas `src/components/reputation/`
- [ ] Crear `src/pages/Reputation.tsx`
- [ ] Crear `src/mock-data/reputation.ts`
- [ ] Agregar route en `App.tsx`: `/reputation`
- [ ] Agregar link en `Sidebar.tsx`

### Componentes (Día 2-5)
- [ ] `LevelExplainer.tsx` (Día 2)
- [ ] `PatientRanking.tsx` (Día 3)
- [ ] `BadgeCatalog.tsx` (Día 4)
- [ ] `ScoreSimulator.tsx` (Día 5)

### Integración (Día 6-7)
- [ ] Página principal uniendo componentes
- [ ] Mock data completo
- [ ] Testing manual de todos los flows
- [ ] Responsive design
- [ ] Documentación

---

## 🔍 Estructura de Archivos Esperada

```
src/
├── components/
│   └── reputation/
│       ├── index.ts
│       ├── LevelExplainer.tsx
│       ├── PatientRanking.tsx
│       ├── BadgeCatalog.tsx
│       ├── ScoreSimulator.tsx
│       └── BadgeCard.tsx (componente auxiliar)
├── pages/
│   └── Reputation.tsx
├── mock-data/
│   └── reputation.ts
└── types/
    └── reputation.ts (opcional, usar types/patient.ts)
```

---

## 🎯 User Flows Sprint 5

### Flow 1: Entender el Sistema
1. Usuario entra a `/reputation`
2. Ve hero con explicación
3. Scroll down para ver los 5 niveles
4. Hover sobre cada nivel → Tooltip con beneficios
5. Click en "Ver más" → Modal con detalle completo

### Flow 2: Ver Ranking
1. Usuario va a sección "Ranking"
2. Ve tabla TOP 50 pacientes
3. Puede filtrar por nivel
4. Puede buscar paciente específico
5. Click en paciente → Ver perfil completo

### Flow 3: Explorar Badges
1. Usuario va a sección "Badges"
2. Ve grid de 12 badges
3. Puede filtrar por categoría
4. Click en badge → Modal con:
   - Descripción completa
   - Cómo obtenerlo
   - Quiénes lo tienen
   - Estadísticas

### Flow 4: Simular Score
1. Usuario abre "Simulador"
2. Input: "Asistí a 5 consultas consecutivas"
3. Sistema muestra: +25 puntos
4. Visualiza cambio de nivel si aplica
5. Puede hacer múltiples simulaciones

---

## 💡 Tips de Implementación

### 1. Reutilizar Componentes Existentes
- `Badge` de shadcn/ui
- `Card` de shadcn/ui
- `Table` de shadcn/ui
- `Tooltip` de shadcn/ui
- `Dialog` para modales

### 2. Iconos Lucide React
```typescript
import { 
  Trophy,      // Ranking
  Award,       // Badges
  TrendingUp,  // Score up
  TrendingDown,// Score down
  Star,        // Elite
  Shield,      // Premium
  CheckCircle, // Standard
  UserPlus,    // Nuevo
  AlertTriangle // En Riesgo
} from 'lucide-react';
```

### 3. Animaciones con Tailwind
```typescript
// Hover effects
className="transition-all hover:scale-105 hover:shadow-lg"

// Fade in
className="animate-in fade-in duration-500"

// Slide up
className="animate-in slide-in-from-bottom-4 duration-700"
```

---

## 📚 Referencias

### Documentación a Revisar
1. `03_solucion_tecnica/sistema_reputacion.md` - Especificación completa
2. `src/types/patient.ts` - Types de niveles y badges
3. `src/mock-data/patients.ts` - Ejemplos de datos

### Ejemplos de UI
- Duolingo (gamificación)
- GitHub (badges)
- Stack Overflow (reputation)
- LinkedIn (skill badges)

---

## 🚨 Recordatorios Importantes

1. **NO usar bash ni artifacts** - Solo MCP Filesystem
2. **TypeScript strict mode** - Todos los componentes tipados
3. **Mobile-first** - Diseñar primero para mobile
4. **Mock data realista** - Nombres argentinos, datos coherentes
5. **Documentar siempre** - Actualizar docs después de cada sesión

---

## 📞 Para Próximo Chat

### Decir:
"Continuar con Sprint 5 - Sistema de Reputación. Empezar por crear la estructura de carpetas y el archivo de mock data."

### O si hubo problemas con el deploy:
"Verificar status del deploy en Vercel y solucionar cualquier issue antes de continuar con Sprint 5."

---

**¡Éxito en Sprint 5! 🎉**

---

**Documento creado:** 07 Nov 2025  
**Próxima acción:** Comenzar Sprint 5

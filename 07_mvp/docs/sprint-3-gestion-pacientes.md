# Sprint 3 - Gestión de Pacientes

## 🎯 Objetivo
Crear el módulo completo de gestión de pacientes con tabla, búsqueda, filtros, perfil individual, sistema de badges y historial de consultas.

---

## ✅ COMPLETADO HASTA AHORA

### 1. **Tipos TypeScript** ✅
**Archivo**: `src/types/patient.ts`

**Tipos Creados:**
- `PatientLevel`: 5 niveles de reputación
- `LevelConfig`: Configuración de cada nivel
- `Badge`: Sistema de logros y badges
- `ConsultationHistoryItem`: Historial detallado
- `ScoreHistoryPoint`: Evolución del score
- `PatientContact`: Información de contacto
- `PatientDemographics`: Datos demográficos
- `PatientStats`: Estadísticas calculadas
- `Patient`: Perfil completo del paciente
- `PatientFilters`: Filtros de búsqueda
- `PatientSortOption`: Opciones de ordenamiento
- `PaginatedPatients`: Paginación
- `PatientsOverview`: Estadísticas agregadas

**Total**: ~250 líneas de tipos robustos

---

### 2. **Configuración del Sistema de Reputación** ✅
**Archivo**: `src/config/reputation.ts`

**Configuraciones:**
- `LEVEL_CONFIGS`: Definición completa de 5 niveles con rangos, colores, beneficios
- `BADGE_CATALOG`: 12 badges diferentes (asistencia, puntualidad, engagement, salud, especiales)
- `SCORE_RULES`: Reglas de puntuación (+5 asistir, -10 ausente, etc.)

**Helpers:**
- `getLevelByScore()`: Determina nivel según score
- `getLevelConfig()`: Obtiene configuración de nivel
- `getProgressToNextLevel()`: Calcula progreso y puntos faltantes
- `checkBadgeEligibility()`: Verifica requisitos de badges
- `getBadgeColor()`: Colores según rareza

**Badges Incluidos:**
- 🏆 Mes Perfecto (raro)
- 🔥 Racha de 5 (común)
- ⚡ Racha de 10 (raro)
- 👑 Año Ejemplar (legendario)
- ⏱️ Confirmación Rápida (común)
- 🌅 Madrugador (raro)
- 🎯 Primera Consulta (común)
- 📱 Usuario Frecuente (raro)
- 💬 Voz Activa (raro)
- 🛡️ Campeón de Prevención (épico)
- 💊 Adherente al Tratamiento (épico)
- ⭐ Miembro Fundador (legendario)

**Total**: ~300 líneas

---

### 3. **Mock Data de Pacientes Argentinos** ✅
**Archivo**: `src/mock-data/patients.ts`

**Datos Generados:**
- **500 pacientes** con información realista argentina
- Nombres y apellidos comunes de Argentina
- DNIs válidos (20M - 45M)
- Teléfonos con códigos de área reales (11, 351, 341, etc.)
- Direcciones de CABA y GBA (Palermo, Belgrano, Vicente López, etc.)
- Obras sociales argentinas (OSDE, Swiss Medical, Galeno, etc.)

**Distribución de Scores:**
- 20% Elite (90-100): ~100 pacientes
- 30% Premium (75-89): ~150 pacientes
- 30% Estándar (60-74): ~150 pacientes
- 15% Nuevo (40-59): ~75 pacientes
- 5% En Riesgo (0-39): ~25 pacientes

**Historial Generado:**
- Entre 1-24 consultas por paciente (según antigüedad)
- Consultas con 10 especialidades diferentes
- 15 médicos diferentes
- Estados: Completada, Ausente, Cancelada
- Score impact calculado coherentemente
- Historial de evolución de score

**Funciones Incluidas:**
- `generatePatient()`: Genera paciente completo
- `generateConsultationHistory()`: Historial coherente con score
- `generateScoreHistory()`: Evolución temporal del score
- `generateBadges()`: Badges obtenidos según stats
- `searchPatients()`: Búsqueda por nombre/DNI/teléfono
- `getPatientById()`: Obtener por ID
- `getPatientsByLevel()`: Filtrar por nivel
- `getTopPatientsByScore()`: Ranking top
- `getAtRiskPatients()`: Pacientes en riesgo

**Exports:**
- `allPatients`: Array de 500 pacientes
- `patientsOverview`: Estadísticas agregadas

**Total**: ~700 líneas

---

### 4. **Componente ScoreBadge** ✅
**Archivo**: `src/components/patients/ScoreBadge.tsx`

**Variantes Creadas:**

**a) ScoreBadge (principal)**
- 3 tamaños: sm, md, lg
- Colores según nivel
- Icono opcional
- Tooltip con información detallada:
  - Descripción del nivel
  - Rango de scores
  - Progreso al siguiente nivel (barra)
  - Puntos faltantes
  - Lista de beneficios

**b) ScoreBadgeCompact**
- Versión minimalista para tablas
- Score + Badge de nivel
- Sin tooltip

**c) ScoreBadgeLarge**
- Versión para perfil de paciente
- Card con gradiente
- Score grande (4xl)
- Descripción completa
- Barra de progreso animada
- Información de puntos restantes

**Características:**
- Totalmente accesible (tooltips, keyboard navigation)
- Responsive
- Colores diferenciados por nivel
- Iconos contextuales
- Animaciones suaves

**Total**: ~200 líneas

---

## 📊 RESUMEN DE PROGRESO

### Archivos Creados: 4
1. ✅ `src/types/patient.ts` (250 líneas)
2. ✅ `src/config/reputation.ts` (300 líneas)
3. ✅ `src/mock-data/patients.ts` (700 líneas)
4. ✅ `src/components/patients/ScoreBadge.tsx` (200 líneas)

**Total Código Nuevo**: ~1,450 líneas

### Datos Mock Generados:
- ✅ 500 pacientes argentinos realistas
- ✅ ~3,000 consultas históricas
- ✅ 12 badges diferentes
- ✅ 5 niveles de reputación configurados
- ✅ Estadísticas agregadas

---

## 🚧 PENDIENTE - SIGUIENTE FASE

### 5. **Tabla de Pacientes con Búsqueda y Filtros**
**Archivo a crear**: `src/components/patients/PatientsTable.tsx`

**Features:**
- [ ] Tabla con shadcn/ui Table
- [ ] Columnas: Avatar, Nombre, Score/Nivel, Última Consulta, Asistencia, Teléfono, Acciones
- [ ] Búsqueda en tiempo real (nombre, DNI, teléfono)
- [ ] Filtros:
  - Por nivel
  - Por rango de score
  - Por obra social
  - Por provincia
  - Con consulta próxima
  - En riesgo
- [ ] Ordenamiento por columnas
- [ ] Paginación (20 pacientes por página)
- [ ] Estados vacío y cargando
- [ ] Acciones: Ver perfil, Enviar mensaje, Programar consulta

**Estimado**: ~300 líneas

---

### 6. **Página Lista de Pacientes**
**Archivo a crear**: `src/pages/Patients.tsx`

**Layout:**
```
┌─────────────────────────────────────────┐
│  Header + Estadísticas (cards)          │
├─────────────────────────────────────────┤
│  Barra de búsqueda y filtros            │
├─────────────────────────────────────────┤
│  Tabla de pacientes                     │
│  [Paginación]                           │
└─────────────────────────────────────────┘
```

**Features:**
- [ ] Header con título y botón "Nuevo Paciente"
- [ ] 4 cards de estadísticas:
  - Total pacientes
  - Promedio de score
  - % Asistencia
  - Pacientes en riesgo
- [ ] Distribución por niveles (mini gráfico)
- [ ] Integración con PatientsTable
- [ ] Responsive

**Estimado**: ~250 líneas

---

### 7. **Perfil de Paciente - Header**
**Archivo a crear**: `src/components/patients/PatientProfileHeader.tsx`

**Features:**
- [ ] Avatar grande con iniciales
- [ ] Nombre completo
- [ ] ScoreBadgeLarge
- [ ] Información de contacto (teléfono, email)
- [ ] Tags del paciente
- [ ] Botones de acción:
  - Editar perfil
  - Enviar mensaje
  - Programar consulta
- [ ] Dropdown con más acciones

**Estimado**: ~200 líneas

---

### 8. **Perfil de Paciente - Showcase de Badges**
**Archivo a crear**: `src/components/patients/BadgeShowcase.tsx`

**Features:**
- [ ] Grid de badges obtenidos
- [ ] Cada badge muestra:
  - Icono (emoji)
  - Nombre
  - Fecha de obtención
  - Tooltip con descripción
- [ ] Sección de badges disponibles (bloqueados)
- [ ] Progress bar para badges en progreso
- [ ] Filtros por categoría

**Estimado**: ~250 líneas

---

### 9. **Perfil de Paciente - Historial de Consultas**
**Archivo a crear**: `src/components/patients/ConsultationHistory.tsx`

**Features:**
- [ ] Timeline de consultas
- [ ] Cada item muestra:
  - Fecha y hora
  - Médico y especialidad
  - Estado (badge colorido)
  - Impact en score (+5, -10)
  - Notas (si existen)
- [ ] Filtros por:
  - Rango de fechas
  - Estado
  - Especialidad
- [ ] Estados vacío

**Estimado**: ~300 líneas

---

### 10. **Perfil de Paciente - Gráfico de Evolución**
**Archivo a crear**: `src/components/patients/ScoreEvolutionChart.tsx`

**Features:**
- [ ] Gráfico de líneas con Recharts
- [ ] Eje X: Tiempo (últimos 6 meses)
- [ ] Eje Y: Score (0-100)
- [ ] Líneas de referencia para niveles
- [ ] Markers para eventos importantes
- [ ] Tooltip con detalles de cada punto
- [ ] Selector de rango de fechas

**Estimado**: ~200 líneas

---

### 11. **Página Perfil de Paciente Completa**
**Archivo a crear**: `src/pages/PatientProfile.tsx`

**Layout:**
```
┌─────────────────────────────────────────┐
│  PatientProfileHeader                   │
├───────────────────┬─────────────────────┤
│  ScoreBadgeLarge  │  Información        │
│  BadgeShowcase    │  Demográfica        │
├───────────────────┴─────────────────────┤
│  ScoreEvolutionChart                    │
├─────────────────────────────────────────┤
│  ConsultationHistory                    │
└─────────────────────────────────────────┘
```

**Features:**
- [ ] Layout en tabs:
  - Resumen (vista principal)
  - Historial completo
  - Comunicaciones
  - Documentos
- [ ] Breadcrumbs
- [ ] Navegación anterior/siguiente paciente
- [ ] Responsive

**Estimado**: ~300 líneas

---

### 12. **Routing y Navegación**
**Archivo a modificar**: `src/App.tsx`

**Rutas a agregar:**
- [ ] `/patients` - Lista de pacientes
- [ ] `/patients/:id` - Perfil individual

**Estimado**: ~20 líneas

---

## 📈 ESTIMACIÓN TOTAL SPRINT 3

### Completado:
- **Líneas de código**: ~1,450
- **Tiempo invertido**: ~4-5 horas
- **Progreso**: 35%

### Pendiente:
- **Componentes restantes**: 7
- **Líneas estimadas**: ~1,820
- **Tiempo estimado**: ~8-10 horas
- **Progreso pendiente**: 65%

---

## 🎯 PRÓXIMOS PASOS INMEDIATOS

1. **Crear PatientsTable** (componente crítico)
2. **Crear página Patients** (integración)
3. **Probar búsqueda y filtros**
4. **Crear perfil de paciente**
5. **Integrar todo**

---

## 📝 NOTAS TÉCNICAS

### Dependencias Necesarias:
- ✅ date-fns (ya instalado)
- ✅ lucide-react (ya instalado)
- ✅ shadcn/ui components:
  - ✅ Badge
  - ✅ Tooltip
  - ⏳ Table (necesario instalar)
  - ⏳ Input (necesario instalar)
  - ⏳ Select (necesario instalar)
  - ⏳ Dropdown (necesario instalar)
  - ⏳ Tabs (necesario instalar)

### Patrón de Diseño:
- Componentes pequeños y reutilizables
- Props tipadas con TypeScript
- Separación de lógica y presentación
- Mock data desde archivo central
- Responsive mobile-first

---

## ✅ CHECKLIST DE COMPLETITUD

### Fase 1 - Fundación (COMPLETADA)
- [x] Tipos TypeScript completos
- [x] Configuración de reputación
- [x] Mock data de 500 pacientes
- [x] Componente ScoreBadge (3 variantes)

### Fase 2 - Lista de Pacientes
- [ ] Tabla con búsqueda y filtros
- [ ] Página de lista
- [ ] Paginación funcional
- [ ] Estados vacío/cargando

### Fase 3 - Perfil Individual
- [ ] Header de perfil
- [ ] Showcase de badges
- [ ] Historial de consultas
- [ ] Gráfico de evolución
- [ ] Página de perfil completa

### Fase 4 - Integración
- [ ] Routing configurado
- [ ] Navegación desde dashboard
- [ ] Links entre módulos
- [ ] Testing manual

---

**Status**: 🟡 En Progreso (35% completado)  
**Próxima tarea**: Crear PatientsTable component

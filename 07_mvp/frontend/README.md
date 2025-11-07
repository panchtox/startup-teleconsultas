# ConectaSalud MVP Frontend

Sistema de gestión de teleconsultas con scoring de reputación de pacientes.

## 🚀 Quick Start

### Prerequisitos
- Node.js >= 18.0.0
- npm >= 9.0.0

### Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# El proyecto estará disponible en http://localhost:3000
```

### Comandos Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Ejecutar ESLint
npm run type-check   # Verificar tipos TypeScript
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── ui/              # Componentes UI base (shadcn/ui)
│   ├── layout/          # Layout components (Sidebar, Header)
│   ├── dashboard/       # Dashboard-specific components
│   ├── patients/        # Patient management components
│   └── appointments/    # Appointment management components
│
├── pages/
│   ├── Dashboard.tsx
│   ├── Patients.tsx
│   ├── PatientProfile.tsx
│   └── Appointments.tsx
│
├── types/               # TypeScript type definitions
├── mock-data/           # Mock data for development
├── utils/               # Utility functions
├── App.tsx              # Main app component
└── main.tsx            # Entry point
```

## 🎨 Stack Tecnológico

### Core
- **React** 18.3.1 - UI Library
- **TypeScript** 5.4.3 - Type Safety
- **Vite** 7.2.1 - Build Tool
- **React Router** 6.22.3 - Routing

### UI/Styling
- **Tailwind CSS** 3.4.3 - Utility-first CSS
- **shadcn/ui** - Component Library
- **Radix UI** - Headless UI Components
- **Lucide React** - Icons

### Forms & Validation
- **React Hook Form** 7.51.1 - Form Management
- **Zod** 3.22.4 - Schema Validation

### Charts
- **Recharts** 2.15.4 - Data Visualization

### Utilities
- **date-fns** 3.6.0 - Date Utilities
- **clsx** + **tailwind-merge** - Class Management

## 📊 Módulos Implementados

### ✅ Dashboard (100%)
- Métricas principales
- Gráficos de ausentismo
- Consultas por especialidad
- Distribución de scoring

### ✅ Gestión de Pacientes (100%)
- Lista con filtros y búsqueda
- Perfil detallado de paciente
- Sistema de scoring visual
- Badges y logros
- Exportación a CSV/Excel

### ✅ Gestión de Consultas (100%)
- Vista lista completa de consultas
- Calendario semanal totalmente funcional
- Formulario crear/editar consulta completo
- Navegación entre vistas (lista/calendario)
- Filtros por estado con badges
- Estadísticas (Total, Hoy, Semana, Mes)
- 400 consultas mock con datos reales

### ⏸️ Próximos Módulos
- Sistema de Reputación
- Comunicaciones
- Reportes
- Configuración

## 🔧 Configuración

### Alias de Importación
El proyecto usa `@` como alias para `src/`:

```typescript
import { Button } from '@/components/ui/button'
import { mockPatients } from '@/mock-data/patients'
```

### Tailwind CSS
Configurado con:
- Colores personalizados (Primary verde, Secondary azul)
- Tailwind Animate
- shadcn/ui variables CSS

### TypeScript
- Modo strict habilitado
- Path aliases configurados
- Types separados por dominio

## 🎯 Features Principales

### Dashboard
- 4 métricas principales (Pacientes, Consultas, Ausentismo, Ahorro)
- 3 gráficos interactivos
- Lista de próximas 5 consultas
- Alertas importantes

### Pacientes
- Tabla responsive con 500+ pacientes mock
- Búsqueda en tiempo real
- Filtros múltiples (Obra Social, Score, Estado)
- Perfil completo con:
  - Score visual (0-100)
  - 5 niveles de reputación
  - 12 tipos de badges
  - Historial de consultas
- Exportación preserva filtros

### Consultas
- Vista lista con tabla completa
- Calendario semanal (7 días × 14 horas)
- Navegación fluida entre semanas
- Estados visuales (6 estados diferentes)
- Formulario completo para crear/editar
- Click en cita para editar

## 🎨 Design System

### Colores

```css
/* Primary - Verde Salud */
--primary-50: #f0fdf4
--primary-500: #22c55e
--primary-600: #16a34a
--primary-700: #15803d

/* Status Colors */
--success: #22c55e
--warning: #f59e0b
--error: #ef4444
--info: #3b82f6
```

### Tipografía
- Font: Inter (Google Fonts)
- Headings: Bold/Semibold
- Body: Regular/Medium

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Sidebar collapsible en mobile
- Tablas con scroll horizontal
- Touch-friendly buttons (min 44px)

## 🐛 Troubleshooting

### Error: Cannot find module '@/components/ui/...'

Asegúrate de que los componentes UI estén instalados:

```bash
# Los componentes deberían estar en src/components/ui/
# Si faltan, se deben crear manualmente o usar shadcn CLI
```

### Error: date-fns locale not found

```bash
# Reinstalar date-fns
npm install date-fns@latest
```

### Error: Module not found

```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors

```bash
# Verificar tipos
npm run type-check

# Reiniciar TypeScript server en VSCode
# Cmd/Ctrl + Shift + P > "TypeScript: Restart TS Server"
```

## 📚 Recursos

### Documentación
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [date-fns](https://date-fns.org)

### Componentes UI
- [Radix UI](https://www.radix-ui.com)
- [Lucide Icons](https://lucide.dev)
- [Recharts](https://recharts.org)

## 🚧 Estado del Proyecto

**Última actualización:** 07/11/2025

**Progreso:** 57% del MVP completado

- ✅ Sprint 1: Setup y Fundación (100%)
- ✅ Sprint 2: Dashboard (100%)
- ✅ Sprint 3: Gestión de Pacientes (100%)
- ✅ Sprint 4: Gestión de Consultas (100%) **← BUILD SUCCESS ✅**
- ⏸️ Sprint 5-7: Pendientes

**Build Status:** ✅ SIN ERRORES TypeScript  
Ver `docs/PROJECT_STATUS.md` y `docs/sprint4_progress.md` para detalles completos.

## 📝 Próximos Pasos

1. **Sprint 5:** Sistema de Reputación Visual
   - Explicación de niveles
   - Ranking de pacientes
   - Catálogo de badges
   - Simulaciones interactivas

2. **Sprint 6:** Comunicaciones y Reportes
   - Log de mensajes WhatsApp
   - Templates de recordatorios
   - Dashboard de ROI
   - Exportación PDF/Excel

3. **Sprint 7:** Landing Page Pública
   - Hero + Features
   - Testimonios
   - Pricing
   - Demo request form

## 👥 Equipo

- **Desarrollo:** AI Assistant + Developer
- **Diseño:** Design System basado en shadcn/ui
- **Datos Mock:** 500 pacientes + 520 consultas + 15 médicos

## 📄 Licencia

Proyecto privado - ConectaSalud MVP

---

**Built with ❤️ using React + TypeScript + Tailwind CSS**

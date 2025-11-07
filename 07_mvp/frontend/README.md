# 🏥 MedAssist MVP - Frontend

Sistema de gestión de teleconsultas con scoring de reputación para reducir ausentismo médico en Argentina.

## 📋 Descripción

Frontend MVP de MedAssist: plataforma web para gestores de sistemas de salud que permite administrar pacientes, teleconsultas y visualizar el sistema de reputación gamificado que reduce el ausentismo del 33% al 9%.

## 🎯 Objetivo del MVP

Crear una plataforma funcional y visualmente completa para:
- ✅ Realizar demos efectivas a clientes potenciales
- ✅ Validar flujos de usuario antes de invertir en backend
- ✅ Facilitar fundraising con producto tangible
- ✅ Obtener feedback temprano de usuarios reales

## 🚀 Stack Tecnológico

### Core
- **React 18** + **TypeScript** (strict mode)
- **Vite** - Build tool ultra-rápido
- **React Router v6** - Routing
- **Zustand** - State management ligero

### UI/UX
- **shadcn/ui** + **Radix UI** - Componentes accesibles
- **Tailwind CSS** - Styling utility-first
- **Lucide React** - Iconos
- **Recharts** - Gráficos y visualizaciones

### Developer Experience
- **TypeScript** - Type safety
- **ESLint** + **Prettier** - Code quality
- **Vite HMR** - Hot module replacement

## 📦 Instalación

### Prerrequisitos
```bash
node --version  # v18.0.0 o superior
npm --version   # v9.0.0 o superior
```

### Setup
```bash
# 1. Clonar el repositorio (o navegar a la carpeta)
cd C:\00_dev\00_playground\startup-teleconsultas\07_mvp\frontend

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir navegador en http://localhost:3000
```

## 🛠️ Scripts Disponibles

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build de producción
npm run lint         # Lint con ESLint
npm run type-check   # Verificar tipos TypeScript
```

## 📁 Estructura del Proyecto

```
frontend/
├── public/                # Assets estáticos
├── src/
│   ├── components/        # Componentes reutilizables
│   │   └── ui/           # Componentes base (shadcn/ui)
│   ├── pages/            # Páginas/Vistas principales
│   ├── services/         # Lógica de negocio y API calls
│   ├── utils/            # Utilidades y helpers
│   ├── mock-data/        # Datos mock para el MVP
│   ├── lib/              # Configuraciones y utilidades de librerías
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Entry point
│   └── index.css         # Estilos globales + Tailwind
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎨 Design System

### Colores Principales
```css
/* Primary - Verde salud */
--primary-500: #22c55e
--primary-600: #16a34a

/* Secondary - Azul confianza */
--secondary-500: #3b82f6
--secondary-600: #2563eb

/* Accent - Naranja engagement */
--accent-500: #f97316

/* Status */
--success: #22c55e
--warning: #f59e0b
--error: #ef4444
--info: #3b82f6
```

### Tipografía
- **Fuente principal**: Inter (Google Fonts)
- **Pesos**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

## 🎯 Módulos del MVP

### ✅ Sprint 1-2: Dashboard Administrativo
- Métricas principales (ausentismo, consultas, ahorro)
- Gráficos de tendencias
- Lista de próximas consultas
- Alertas y notificaciones

### 🚧 Sprint 3-4: Gestión de Pacientes
- Lista de pacientes con filtros
- Perfil individual con scoring
- Sistema de badges
- Historial de asistencia

### 📅 Sprint 5-6: Gestión de Consultas
- Calendario de citas
- CRUD de consultas
- Asignación de médicos
- Estados de consulta

### 🏆 Sprint 7-8: Sistema de Reputación
- Visualización de niveles
- Ranking de pacientes
- Badges y logros
- Impacto en beneficios

### 💬 Sprint 9-10: Comunicaciones
- Log de mensajes WhatsApp
- Templates de recordatorios
- Estadísticas de entrega

### 📊 Sprint 11-12: Reportes y Analytics
- Dashboard de métricas avanzadas
- Gráficos de ROI
- Exportación de datos

### 🌐 Sprint 13-14: Landing Page
- Hero con propuesta de valor
- Features principales
- Pricing
- Demo request form

## 📊 Mock Data

El MVP utiliza datos simulados realistas para Argentina:
- **500 pacientes** con nombres argentinos
- **120 consultas** programadas
- **15 médicos** activos
- **Especialidades**: Medicina General, Cardiología, Pediatría, Psicología
- **Métricas simuladas**: Ausentismo 28% → 9%, $18K USD ahorrados/trimestre

## 🔧 Configuración de shadcn/ui

Para agregar nuevos componentes de shadcn/ui:

```bash
# Instalar componente específico
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
# etc.
```

Componentes disponibles: https://ui.shadcn.com/docs/components

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Deploy a producción
vercel --prod
```

### Netlify
```bash
# 1. Build
npm run build

# 2. Deploy carpeta dist/
# Usar Netlify CLI o drag & drop en netlify.com
```

## 📝 Convenciones de Código

### Naming
- Componentes: PascalCase (`PatientCard.tsx`)
- Funciones/variables: camelCase (`getUserData`)
- Constantes: SCREAMING_SNAKE_CASE (`MAX_PATIENTS`)
- Archivos CSS/utils: kebab-case (`date-utils.ts`)

### TypeScript
- Siempre tipar props de componentes
- Evitar `any` (usar `unknown` si es necesario)
- Preferir interfaces sobre types para objetos

### Componentes
```tsx
// ✅ Bueno
interface PatientCardProps {
  patient: Patient
  onSelect: (id: string) => void
}

export function PatientCard({ patient, onSelect }: PatientCardProps) {
  // ...
}

// ❌ Evitar
export function PatientCard(props: any) {
  // ...
}
```

## 🐛 Troubleshooting

### Error: "Module not found"
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error de TypeScript
```bash
# Verificar tipos
npm run type-check
```

### Estilos no se aplican
```bash
# Verificar que Tailwind está procesando los archivos
# Revisar content en tailwind.config.js
```

## 📚 Recursos

### Documentación
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Zustand](https://zustand-demo.pmnd.rs)

### Inspiración de Diseño
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Linear](https://linear.app)
- [Stripe Dashboard](https://dashboard.stripe.com)

## 🎯 Roadmap

- [x] Setup inicial del proyecto
- [x] Configuración de Tailwind + shadcn/ui
- [ ] Dashboard principal
- [ ] Gestión de pacientes
- [ ] Gestión de consultas
- [ ] Sistema de reputación
- [ ] Comunicaciones
- [ ] Reportes y analytics
- [ ] Landing page
- [ ] Testing con usuarios
- [ ] Deploy a producción

## 👥 Equipo

**Desarrollo MVP**: Fase de validación y fundraising
**Target**: Sistema de salud privados en Argentina
**Fecha inicio**: Noviembre 2025

## 📄 Licencia

Proprietary - Todos los derechos reservados © 2025 MedAssist

---

**🚀 ¡Estamos construyendo el futuro de las teleconsultas en LATAM!**

Para cualquier duda o consulta, revisar la documentación en `/07_mvp/docs/`

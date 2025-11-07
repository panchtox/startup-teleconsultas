# 📋 Especificaciones del MVP Frontend

## Objetivo General

Crear una plataforma web funcional y visualmente completa para demos y validación con clientes, utilizando datos mock pero flujos de usuario reales.

## Alcance del MVP

### ✅ Incluido

1. **Dashboard Administrativo**
   - Métricas principales en cards
   - Gráficos de ausentismo
   - Lista de próximas consultas
   - Sistema de alertas

2. **Gestión de Pacientes**
   - Lista completa con búsqueda/filtros
   - Perfil individual detallado
   - Visualización de score de reputación
   - Historial de consultas

3. **Gestión de Consultas**
   - Vista calendario
   - CRUD completo
   - Estados de consulta
   - Asignación de médicos

4. **Sistema de Reputación**
   - Explicación de niveles
   - Ranking de pacientes
   - Sistema de badges
   - Gamificación visual

5. **Comunicaciones**
   - Log de mensajes
   - Templates de WhatsApp
   - Estadísticas de entrega

6. **Reportes**
   - Dashboard de métricas
   - Gráficos de ROI
   - Exportación de datos

7. **Landing Page**
   - Página pública marketing
   - Formulario de demo request
   - Pricing
   - Testimonios

### ❌ Excluido del MVP

- Backend real (todo es mock data)
- Autenticación real (simulada)
- Integración con WhatsApp Business API
- Integración con plataformas de telemedicina
- Pagos reales
- Testing automatizado completo
- Multi-idioma
- Modo oscuro completo

## Especificaciones Técnicas

### Performance
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: < 500KB (gzipped)

### Compatibilidad
- **Navegadores**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Dispositivos**: Desktop (prioritario), Tablet, Mobile (básico)
- **Resoluciones**: 1920x1080 (óptimo), 1366x768 (mínimo)

### Accesibilidad
- **WCAG 2.1**: Nivel AA
- **Keyboard navigation**: Completa
- **Screen readers**: Soporte básico
- **Color contrast**: Mínimo 4.5:1

## Datos Mock - Especificaciones

### Pacientes (500 registros)
```typescript
interface Patient {
  id: string
  firstName: string
  lastName: string
  dni: string
  email: string
  phone: string
  birthDate: Date
  gender: 'M' | 'F' | 'X'
  address: string
  city: string
  province: string
  healthInsurance: string
  score: number // 0-100
  level: 'En Riesgo' | 'Nuevo' | 'Estándar' | 'Premium' | 'Elite'
  badges: Badge[]
  stats: {
    totalAppointments: number
    attended: number
    cancelled: number
    noShow: number
    attendanceRate: number
  }
  registeredAt: Date
  lastAppointment: Date | null
}
```

### Distribución de Scores
- **Elite (90-100)**: 20% (100 pacientes)
- **Premium (70-89)**: 30% (150 pacientes)
- **Estándar (40-69)**: 30% (150 pacientes)
- **Nuevo (20-39)**: 15% (75 pacientes)
- **En Riesgo (0-19)**: 5% (25 pacientes)

### Consultas (520 registros totales)
- **400 históricas** (últimos 6 meses)
- **120 futuras** (próximos 30 días)

```typescript
interface Appointment {
  id: string
  patientId: string
  doctorId: string
  date: Date
  duration: number // minutos
  type: 'video' | 'audio' | 'chat'
  specialty: string
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show'
  notes: string
  reminders: Reminder[]
  createdAt: Date
  updatedAt: Date
}
```

### Médicos (15 registros)
```typescript
interface Doctor {
  id: string
  firstName: string
  lastName: string
  specialty: string
  license: string
  email: string
  phone: string
  availability: TimeSlot[]
  rating: number
  totalConsultations: number
}
```

### Especialidades
- Medicina General (40%)
- Cardiología (20%)
- Pediatría (20%)
- Psicología (15%)
- Ginecología (5%)

### Métricas del Sistema
```typescript
interface SystemMetrics {
  totalPatients: 500
  activePatients: 425
  totalAppointments: 520
  upcomingAppointments: 120
  completedAppointments: 320
  cancelledAppointments: 40
  noShowAppointments: 40
  
  currentMonthMetrics: {
    attendanceRate: 91 // %
    noShowRate: 9 // %
    previousNoShowRate: 28 // %
    improvement: 19 // puntos porcentuales
    moneySaved: 18000 // USD
    timeSaved: 156 // horas
  }
  
  quarterlyMetrics: {
    totalSaved: 54000 // USD
    avgScoreImprovement: 12 // puntos
    patientSatisfaction: 4.7 // sobre 5
  }
}
```

## User Flows Críticos

### Flow 1: Login → Dashboard
1. Usuario ingresa email/password
2. Sistema simula validación (siempre exitosa en MVP)
3. Redirect a /dashboard
4. Carga métricas principales
5. Muestra gráficos y lista de consultas

**Tiempo esperado**: < 3 segundos

### Flow 2: Ver Perfil de Paciente
1. Desde dashboard o lista de pacientes
2. Click en nombre de paciente
3. Sistema carga perfil completo
4. Muestra score con explicación visual
5. Muestra badges obtenidos
6. Muestra historial de consultas

**Tiempo esperado**: < 2 segundos

### Flow 3: Crear Nueva Consulta
1. Click en "Nueva Consulta" (sidebar o dashboard)
2. Formulario modal se abre
3. Seleccionar paciente (búsqueda + dropdown)
4. Seleccionar médico y especialidad
5. Elegir fecha/hora en picker
6. Confirmar
7. Sistema simula creación y muestra confirmación
8. Actualiza calendario y listas

**Tiempo esperado**: 30-60 segundos (incluye decisiones del usuario)

### Flow 4: Revisar Reportes
1. Click en "Reportes" en sidebar
2. Sistema carga dashboard de analytics
3. Usuario puede filtrar por fecha
4. Gráficos se actualizan (animados)
5. Usuario puede exportar a PDF

**Tiempo esperado**: < 4 segundos

## Estados de Componentes

### Loading States
- **Skeleton screens**: Para tablas y listas
- **Spinners**: Para acciones (guardar, eliminar)
- **Progress bars**: Para exportaciones

### Empty States
- **Sin pacientes**: Ilustración + CTA "Agregar Primer Paciente"
- **Sin consultas**: Ilustración + CTA "Programar Consulta"
- **Sin resultados de búsqueda**: Mensaje claro + sugerencias

### Error States
- **Error de red**: "No se pudo conectar. Intenta nuevamente."
- **Error de validación**: Mostrar campos con error en rojo
- **Error genérico**: "Algo salió mal. Contacta soporte."

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) { }

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1025px) { }

/* Large Desktop */
@media (min-width: 1920px) { }
```

### Prioridad
1. **Desktop** (1366x768 a 1920x1080): Experiencia óptima
2. **Tablet** (768x1024): Funcional pero simplificado
3. **Mobile** (<640px): Básico, enfocado en consultas principales

## Criterios de Aceptación

### Un Feature está "Done" cuando:
- ✅ UI implementada según diseño
- ✅ Responsive en desktop (tablet/mobile opcional)
- ✅ Mock data funcional y realista
- ✅ TypeScript sin errores ni warnings
- ✅ User flow completo funciona end-to-end
- ✅ Testeado manualmente en Chrome y Firefox
- ✅ No hay console.errors en producción
- ✅ Performance aceptable (LCP < 3s)
- ✅ Comentarios en código para lógica compleja

### El MVP completo está "Done" cuando:
- ✅ Los 7 módulos principales funcionan
- ✅ 3+ user flows críticos funcionan sin bugs
- ✅ Demo de 10 minutos se puede hacer fluidamente
- ✅ 5 personas ajenas al proyecto pueden usarlo sin explicación
- ✅ Deploy en producción (Vercel/Netlify)
- ✅ README.md completo con instrucciones
- ✅ Feedback de 3+ clientes potenciales incorporado

## Timeline

### Sprint 1-2 (Semanas 1-4): Fundación + Dashboard
- Setup completo del proyecto
- Design system implementado
- Dashboard principal funcional

### Sprint 3-4 (Semanas 5-8): Pacientes + Consultas
- Módulo de pacientes completo
- Módulo de consultas completo
- Integración entre ambos

### Sprint 5-6 (Semanas 9-12): Reputación + Comunicaciones
- Sistema de scoring visual
- Log de mensajes
- Templates

### Sprint 7 (Semanas 13-14): Landing + Polish
- Landing page pública
- Pulido general de UX
- Testing final
- Deploy

## Métricas de Éxito

### Development
- **Build time**: < 10 segundos
- **Dev server start**: < 2 segundos
- **Hot reload**: < 500ms
- **Type check**: < 5 segundos

### UX (Testing con usuarios)
- **Time to First Interaction**: < 2 segundos
- **Task Completion Rate**: > 90%
- **User Satisfaction (SUS)**: > 70/100
- **Demo Conversion Rate**: > 25%

### Business
- **Demos realizadas**: 15-20 en 2 meses
- **Feedback sessions**: 5 con clientes
- **Iteraciones**: 2-3 ciclos basados en feedback
- **Time to Demo-Ready**: ≤ 14 semanas

## Riesgos y Mitigación

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Scope creep | Alta | Alto | MVP strict, NO agregar features |
| Mock data poco realista | Media | Medio | Validar con clientes potenciales |
| UX confusa | Media | Alto | Testing temprano con usuarios |
| Decisiones sin validar | Alta | Medio | Mostrar wireframes antes |
| No cumplir timeline | Media | Alto | Priorizar ruthlessly |

## Próximos Pasos Post-MVP

1. **Validación con clientes** (5 demos mínimo)
2. **Iteración basada en feedback**
3. **Desarrollo de backend** (si se valida la solución)
4. **Integración real con APIs**
5. **Testing automatizado**
6. **Optimizaciones de performance**
7. **Features adicionales** (basados en demanda)

---

**Última actualización**: Noviembre 2025
**Versión**: 1.0
**Status**: En desarrollo - Sprint 1

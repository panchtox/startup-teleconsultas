# Pre-Sprint 4 Checklist

## 🎯 Objetivo
Asegurar que Sprint 3 está 100% completo y listo antes de comenzar Sprint 4 (Gestión de Consultas).

---

## ✅ Sprint 3 - Verificación Final

### Funcionalidad Core
- [x] PatientsTable renderiza 500 pacientes
- [x] Búsqueda funciona (nombre, DNI, teléfono, email)
- [x] Filtros por nivel funcionan
- [x] Ordenamiento por columnas funciona
- [x] Paginación funciona (20 por página)
- [x] Click en fila navega a perfil
- [x] PatientProfile muestra datos correctos
- [x] ScoreBadge muestra colores según nivel
- [x] Exportar a CSV funciona

### Responsive
- [ ] Mobile (<640px): Revisar en Chrome DevTools
- [ ] Tablet (640-1024px): Revisar flujo completo
- [ ] Desktop (>1024px): Verificar todas las columnas visibles

### Performance
- [ ] Sin console.errors en producción
- [ ] Sin warnings de React en consola
- [ ] Búsqueda no lagguea con 500 items
- [ ] Paginación responde instantáneamente
- [ ] Navegación entre páginas es fluida

### TypeScript
- [ ] `npm run build` sin errores
- [ ] `npm run type-check` pasa (si existe script)
- [ ] No hay `any` sin justificar
- [ ] Todos los props están tipados

### UX Details
- [ ] Tooltips del ScoreBadge se muestran correctamente
- [ ] Progreso a siguiente nivel se muestra en perfil
- [ ] Badges se visualizan bien en perfil
- [ ] Historial de consultas ordenado por fecha DESC
- [ ] Estados de consulta tienen colores correctos
- [ ] Loading states apropiados (aunque sean instantáneos con mock)

---

## 🐛 Bugs a Resolver ANTES de Sprint 4

### Critical (Bloquean Sprint 4)
- [ ] Ninguno identificado ✅

### High (Deberían resolverse)
- [ ] **Responsive de PatientProfile en mobile**: Botones muy juntos
- [ ] **Tabla en mobile**: Scroll horizontal no es intuitivo
- [ ] **Exportar CSV**: Verificar que abre bien en Excel con tildes

### Medium (Nice to have)
- [ ] Search bar debounce (300ms) para mejor performance
- [ ] Click en "Ver todas las consultas" hace algo (o remover botón)
- [ ] Loading skeleton cuando cambia de página en tabla

### Low (Post-MVP)
- [ ] Animaciones de transición entre páginas
- [ ] Empty states más visuales
- [ ] Error boundaries

---

## 📋 Testing Manual - Flows Críticos

### Flow 1: Ver paciente específico
```
1. Ir a /patients
2. Buscar "María García"
3. Click en primer resultado
4. Verificar:
   - [x] Nombre correcto en header
   - [x] DNI correcto
   - [x] Score visible y con nivel correcto
   - [x] Historial de consultas se muestra
   - [x] Badges se muestran (si tiene)
```

### Flow 2: Filtrar pacientes en riesgo
```
1. Ir a /patients
2. Click en "Filtros"
3. Seleccionar "En Riesgo"
4. Verificar:
   - [x] Solo muestra ~25 pacientes (5%)
   - [x] Todos tienen score < 40
   - [x] Badge "En Riesgo" visible
   - [x] Contador muestra "Mostrando X de 25"
```

### Flow 3: Exportar datos filtrados
```
1. Ir a /patients
2. Aplicar filtro "Elite"
3. Click en "Exportar"
4. Verificar:
   - [x] CSV se descarga
   - [x] Nombre archivo contiene timestamp
   - [x] Solo contiene pacientes Elite (~100)
   - [x] Abre bien en Excel/LibreOffice
   - [x] Tildes se ven correctamente
```

### Flow 4: Navegación completa
```
1. Dashboard → Click "Gestión de Pacientes" en sidebar
2. Tabla carga correctamente
3. Click en un paciente
4. Perfil carga
5. Click "Volver a Pacientes"
6. Vuelve a tabla (mantiene filtros? debería)
```

---

## 🎨 Polish Visual

### Antes de cerrar Sprint 3
- [ ] Colores consistentes en toda la app
- [ ] Espaciado consistente (4px, 8px, 12px, 16px, 24px)
- [ ] Tipografía correcta (Inter para todo)
- [ ] Iconos tamaño consistente (h-4 w-4 para inline, h-6 w-6 para headers)
- [ ] Hover states en botones y rows
- [ ] Focus states para accesibilidad (keyboard nav)

### Detalles de Tabla
- [ ] Headers claramente distinguibles
- [ ] Rows tienen hover effect
- [ ] Paginación centrada y clara
- [ ] No hay contenido cortado/truncado sin tooltip

### Detalles de Perfil
- [ ] Avatar placeholder se ve bien
- [ ] Cards tienen sombra sutil
- [ ] Distribución de info es clara
- [ ] No hay overflow de texto

---

## 📊 Data Validation

### Mock Data Integrity
- [x] 500 pacientes únicos (verificar IDs únicos)
- [x] Scores distribuidos correctamente (20-30-30-15-5)
- [x] DNIs argentinos válidos (8 dígitos)
- [x] Teléfonos argentinos (+54 9 11...)
- [x] Obras sociales argentinas reales
- [x] Provincias argentinas correctas
- [x] Fechas de consultas lógicas (últimos 6 meses)
- [x] Stats coherentes (asistidas + ausencias + canceladas = total)

---

## 🚀 Preparación para Sprint 4

### Dependencies Check
- [x] Mock data de consultas existe (`appointments.ts`)
- [x] Mock data de médicos existe (`doctors.ts`)
- [x] Tipos de `Appointment` definidos
- [x] Tipos de `Doctor` definidos

### UI Components Necesarios
- [ ] Verificar que `Calendar` de shadcn está instalado
- [ ] Verificar que `DatePicker` está disponible
- [ ] Verificar que `Dialog` está disponible
- [ ] Verificar que `Form` components están disponibles

### Code Cleanup
- [ ] Remover console.logs de desarrollo
- [ ] Remover TODOs resueltos
- [ ] Remover código comentado
- [ ] Organizar imports (usar ESLint)

---

## 📝 Documentation

### Antes de cerrar Sprint 3
- [x] README principal actualizado
- [x] SPRINT_3_SUMMARY.md creado
- [ ] Screenshots de features principales (opcional)
- [ ] GIF de demo flow (opcional)

### Code Documentation
- [ ] Componentes principales tienen JSDoc
- [ ] Funciones complejas tienen comentarios
- [ ] Tipos exportados tienen description
- [ ] Utils tienen ejemplos de uso

---

## 🎯 Definition of Ready (para Sprint 4)

Sprint 4 puede comenzar cuando:
- [ ] Todos los items "Critical" resueltos
- [ ] Al menos 80% de "High" resueltos
- [ ] Todos los flows críticos testeados
- [ ] No hay TypeScript errors
- [ ] Build pasa sin warnings
- [ ] Equipo aprueba demo de Sprint 3

---

## 📞 Sign-off

### Desarrollador
- [ ] Código completo y funcional
- [ ] Testing manual realizado
- [ ] Bugs documentados
- [ ] Listo para QA

### QA (si aplica)
- [ ] Flows críticos testeados
- [ ] Bugs reportados
- [ ] Regression testing OK

### Product Owner
- [ ] Demo aprobada
- [ ] Acceptance criteria cumplidos
- [ ] Listo para siguiente sprint

---

**Fecha límite**: Antes de iniciar Sprint 4  
**Responsable**: Development Team  
**Status**: 🟡 En progreso

---

## 🔄 Updates

### 2025-11-07
- ✅ Creado checklist
- ✅ Sprint 3 functionality completa
- ✅ Export utils implementado
- 🟡 Pending: Responsive final testing
- 🟡 Pending: Bug fixes menores

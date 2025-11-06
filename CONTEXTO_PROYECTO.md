# 🧠 CONTEXTO DEL PROYECTO - ConectaSalud

## ⚡ Para Claude: Lee esto primero en cada sesión

Este documento contiene el contexto esencial del proyecto para mantener continuidad entre conversaciones.

---

## 📋 Resumen Ejecutivo del Proyecto

### El Problema
**De 60 teleconsultas programadas, solo 40 se conectan (66.7%). 20 consultas se pierden (33.3% ausentismo).**

**Causas identificadas:**
- 40-50% comportamentales (ausentismo, falta compromiso, "banalización")
- 20-30% técnicas (internet, problemas audio/video)
- 20-30% organizacionales (sin recordatorios efectivos, sin confirmación)

**Impacto cuantificado:**
- $72,000 USD/año pérdida por cada 10 médicos
- 33% tiempo médico desperdiciado
- Listas de espera 30% más largas de lo necesario

### La Solución: ConectaSalud

**Propuesta de valor:**
Un asistente inteligente que se integra con cualquier plataforma de teleconsulta para reducir el ausentismo de 33% a <10% en 90 días.

**Cómo funciona:**
1. **Contacto proactivo:** Chatbot vía WhatsApp 72hs antes de consulta
2. **Verificación de compromiso:** Confirmación activa (no pasiva)
3. **Validación técnica:** Test de conexión previo
4. **Educación:** Tutorial personalizado según dispositivo
5. **Gamificación:** Puntos, badges, beneficios por asistencia
6. **Analytics:** Dashboard predictivo en tiempo real

**Diferenciadores clave:**
- Se integra sin cambiar plataforma existente (plug & play)
- Enfoque en comportamiento, no solo tecnología
- Resultados garantizados en 30 días
- Diseñado específicamente para LATAM

---

## 🎯 Decisiones Clave Tomadas

### Opción Seleccionada
De 5 opciones evaluadas, elegimos **"ConectaSalud - Asistente de Compromiso para Pacientes"**

**Razones:**
1. Menor barrera de entrada (no competimos con plataformas)
2. Aborda el problema principal (40-50% es comportamental)
3. Time to market razonable (3-4 meses MVP)
4. Mercado grande (público + privado en LATAM)
5. Tecnología accesible (WhatsApp API, WebRTC, GPT)

### Segmento de Cliente Objetivo
**Primario:** Sistemas de salud privados (obras sociales, prepagas) en Argentina

**Secundario:** Hospitales públicos con programas de telemedicina

**Por qué:** Mayor capacidad de pago, decisión más rápida, dolor crítico

---

## 📊 Datos de Contexto Importantes

### Mercado
- Telemedicina global: $224M (2022) → $400M (2027)
- 82.6% profesionales LATAM nunca usaron telemedicina internacional
- Argentina tiene Plan Nacional de Telesalud 2018-2024

### Benchmarks
- Hospital Italiano BA: 30% ausentismo persistente (post-pandemia)
- Mejores sistemas: 81% → 93% efectividad (2020-2021)
- Satisfacción cuando funciona: 4.5/5

### Objetivo de Producto
- Reducir ausentismo de 33% a <10% en 90 días
- Tasa confirmación: >80%
- NPS pacientes: >50
- NPS médicos: >60
- ROI positivo en Q1

---

## 📁 Estructura del Proyecto

```
startup-teleconsultas/
├── QUICK_START.md              ← Empezar aquí
├── README.md                   ← Overview
├── RESUMEN_VISUAL.md           ← Visualizaciones
├── INDICE_MAESTRO.md           ← Navegación completa
├── CONTEXTO_PROYECTO.md        ← Este archivo
│
├── 01_investigacion/
│   ├── analisis_problema.md     ✅ Completo (30 págs)
│   └── resumen_ejecutivo.md     ✅ Completo (1 pág)
│
├── 02_propuesta_valor/
│   ├── propuesta_valor.md              ✅ Completo
│   └── value_proposition_canvas.md     ✅ Completo
│
├── 03_solucion_tecnica/         🔄 Siguiente paso
├── 04_modelo_negocio/           ⏳ Pendiente
├── 05_mvp/                      ⏳ Pendiente
└── 06_go_to_market/             ⏳ Pendiente
```

---

## 🎯 Estado Actual del Proyecto

### ✅ Completado (30%)
- **Investigación exhaustiva** del problema (global + LATAM)
- **Propuesta de valor** definida y validada
- **Value Proposition Canvas** completo
- **Segmento de cliente** identificado

### 🔄 En Progreso (Próximo)
- **Solución técnica:** Arquitectura, stack, flujos, integraciones

### ⏳ Pendiente
- Modelo de negocio (Business Model Canvas, pricing, financials)
- MVP (roadmap, features, especificaciones)
- Go-to-market (customer acquisition, sales, marketing)

---

## 🔑 Insights Clave para Recordar

1. **El problema NO es solo técnico** - Mayoría es comportamental
2. **La "facilidad" es contraproducente** - Demasiado fácil sacar turno = banalización
3. **Onboarding es crítico** - Primera experiencia define todo
4. **Recordatorios tradicionales fallan** - SMS/email ignorados, necesitamos confirmación activa
5. **Solución debe ser híbrida** - Técnica + comportamental + organizacional

---

## 🎨 Características Core del Producto

### Must-Have (MVP)
- ✅ Chatbot WhatsApp con IA conversacional
- ✅ Confirmación activa 72hs antes
- ✅ Test de conexión técnica
- ✅ Tutorial personalizado
- ✅ Dashboard básico de métricas

### Should-Have (v2)
- 🎯 Gamificación completa (puntos, badges, niveles)
- 🎯 Predicción de ausentismo con ML
- 🎯 Re-asignación automática de turnos
- 🎯 Integración con múltiples plataformas

### Nice-to-Have (futuro)
- 💡 Recordatorios de medicación
- 💡 Seguimiento post-consulta
- 💡 Marketplace de beneficios

---

## 💼 Modelo de Negocio (Definido)

### Pricing
**Freemium:**
- Free: Hasta 100 pacientes/mes
- Pro: $0.50-1 USD por paciente activo/mes
- Enterprise: Custom (>1000 pacientes)

### Ejemplo ROI
Sistema con 500 pacientes/mes:
- Costo: $250-500 USD/mes
- Valor recuperado: 15 consultas/semana × $50 = $3,000/mes
- ROI: 500-1100%

---

## 🗺️ Roadmap de Alto Nivel

| Fase | Timeline | Objetivo |
|------|----------|----------|
| **Investigación** | Mes 1 | ✅ Completado |
| **Propuesta de Valor** | Mes 1 | ✅ Completado |
| **Diseño Técnico** | Mes 2 | 🔄 En progreso |
| **MVP** | Mes 3-4 | ⏳ Pendiente |
| **Piloto** | Mes 5 | ⏳ Pendiente |
| **Iteración** | Mes 6 | ⏳ Pendiente |
| **Escala** | Mes 7-12 | ⏳ Pendiente |

---

## 🎓 Referencias Clave Usadas

**Fuentes principales:**
- Hospital Italiano de Buenos Aires (caso de estudio argentino)
- Estudios PMC/PubMed sobre telemedicina (27 estudios revisados)
- Plan Nacional de Telesalud Argentina 2018-2024
- Reportes de mercado (Global Health Intelligence, YouGov)
- OMS/OPS documentos sobre telemedicina en LATAM

**Datos estadísticos de:**
- Medifé Argentina (sistema de salud privado)
- Programa de Telesalud Oaxaca, México
- Multiple estudios sobre barreras en telemedicina

---

## 🤝 Principios del Proyecto

1. **Evidence-based:** Toda decisión basada en datos de investigación
2. **User-centric:** Enfoque en comportamiento del paciente
3. **Pragmatic:** Solución que funciona con infraestructura actual
4. **Measurable:** ROI claro y métricas definidas
5. **Scalable:** Diseño para crecer en LATAM

---

## 📞 Para Continuar el Proyecto

**Si es una nueva sesión de Claude:**
1. Lee este archivo completo (CONTEXTO_PROYECTO.md)
2. Revisa el estado actual en README.md
3. Continúa desde donde se quedó (ver "Estado Actual")

**Archivos esenciales para entender rápido:**
- `QUICK_START.md` - Overview 5 min
- `01_investigacion/resumen_ejecutivo.md` - Problema 5 min
- `02_propuesta_valor/propuesta_valor.md` - Solución 10 min

**Próximo hito:** Diseñar la solución técnica (arquitectura, stack, flujos)

---

## 🎯 Preguntas Frecuentes para Claude

### ¿Cuál es el problema que resolvemos?
33% de teleconsultas no se conectan, desperdiciando recursos médicos y negando acceso a pacientes.

### ¿Por qué es importante?
Pérdida de $72K/año por cada 10 médicos + impacto en listas de espera y calidad de servicio.

### ¿Qué hace nuestro producto?
Asistente inteligente que asegura que cada paciente esté comprometido y técnicamente preparado antes de su teleconsulta.

### ¿Por qué es mejor que alternativas?
Se integra fácil sin cambiar plataforma, enfoca en comportamiento (no solo tech), resultados en 30 días.

### ¿Quién es nuestro cliente?
Primario: Sistemas de salud privados en Argentina. Secundario: Hospitales públicos.

### ¿Cuál es nuestro diferenciador?
No competimos con plataformas de teleconsulta, nos integramos con ellas. Somos un "layer" de optimización.

### ¿Cuál es el siguiente paso?
Diseñar la solución técnica: arquitectura, stack tecnológico, flujos de usuario, integraciones.

---

**Última actualización:** Noviembre 2025  
**Versión:** 0.2  
**Progreso:** 30% completado (2 de 6 fases)  
**Ubicación:** `C:\00_dev\00_playground\startup-teleconsultas\`

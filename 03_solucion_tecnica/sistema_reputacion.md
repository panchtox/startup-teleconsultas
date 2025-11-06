# Sistema de Reputación y Scoring de Asistencia
**ConectaSalud - Módulo de Engagement Conductual**

---

## 📋 Índice
1. [Visión General](#visión-general)
2. [Problema que Resuelve](#problema-que-resuelve)
3. [Cómo Funciona](#cómo-funciona)
4. [Algoritmo de Scoring](#algoritmo-de-scoring)
5. [Beneficios por Nivel](#beneficios-por-nivel)
6. [Incentivos Positivos](#incentivos-positivos)
7. [Casos de Uso](#casos-de-uso)
8. [Implementación Técnica](#implementación-técnica)
9. [Benchmarks Internacionales](#benchmarks-internacionales)
10. [Métricas de Éxito](#métricas-de-éxito)

---

## 🎯 Visión General

El **Sistema de Reputación** es un componente clave de ConectaSalud que aborda el 40-50% del ausentismo causado por factores **comportamentales** (banalización, falta de compromiso, olvido).

### Principio Core
> "No castigamos el no-show, **premiamos la responsabilidad**"

### Diferenciador vs. Competencia
- **No usamos dinero** (no-shows fees) → Evitamos fricción legal y percepción negativa
- **Incentivos positivos** sobre castigos → Mejor experiencia de usuario
- **Justo y transparente** → Score visible, reglas claras, apelaciones posibles

---

## 🔍 Problema que Resuelve

### Comportamientos Problemáticos Identificados
De nuestra investigación (ver `01_investigacion/analisis_problema.md`):

| Comportamiento | % del Ausentismo | Causa Raíz |
|----------------|------------------|------------|
| "Olvidé el turno" | 15-20% | Falta de compromiso activo |
| "Saqué por las dudas" | 10-15% | Facilidad excesiva de reserva |
| "Me surgió algo mejor" | 8-12% | No hay consecuencia percibida |
| No canceló con aviso | 5-8% | No ve beneficio en avisar |

### Por Qué Tarifas/Multas No Funcionan
❌ **Fricción legal**: En Argentina, es complejo cobrar no-shows en salud pública  
❌ **Percepción negativa**: Pacientes sienten que "los penalizan cuando están enfermos"  
❌ **Complejidad administrativa**: Requiere procesos de cobranza, facturación, excepciones  
❌ **Inequidad**: Afecta más a pacientes vulnerables

### Por Qué Nuestro Sistema SÍ Funciona
✅ **Sin dinero involucrado** → Legal y simple  
✅ **Enfoque positivo** → "Ganar beneficios" vs "evitar multa"  
✅ **Automático** → Sin intervención humana, escalable  
✅ **Percibido como justo** → Reglas claras, visible, apelable

---

## ⚙️ Cómo Funciona

### Concepto Base
Cada paciente tiene un **Score de Confiabilidad (SC)** que:
- Aumenta con buenas conductas (asistencias, confirmaciones, cancelaciones anticipadas)
- Disminuye con malas conductas (no-shows, cancelaciones tardías)
- Determina **beneficios de acceso** (no dinero, sino prioridad/conveniencia)

### Escala del Score
```
🟢 Excelente:  90-100 pts  →  Acceso Premium
🟡 Muy Bueno:  75-89 pts   →  Acceso Preferente  
🟠 Bueno:      60-74 pts   →  Acceso Estándar
🔴 Regular:    40-59 pts   →  Acceso Limitado
⚫ Bajo:       0-39 pts    →  Acceso Restringido
```

### Inicio del Score
- **Pacientes nuevos**: Comienzan con **70 puntos** (Bueno - Acceso Estándar)
- **Justificación**: Damos "beneficio de la duda", no penalizamos de entrada
- **Casos especiales**: Pacientes con historial previo pueden migrar su score

---

## 🧮 Algoritmo de Scoring

### Tabla de Puntos

| Acción | Puntos | Notas |
|--------|--------|-------|
| **Acciones Positivas** |||
| Asistió a teleconsulta | +5 | Por cada consulta completada |
| Confirmó 48-72hs antes | +2 | Confirmación activa (chatbot) |
| Completó test técnico | +1 | Validación previa de conexión |
| Canceló con >24hs aviso | +1 | Permite re-asignación |
| Racha de 3 asistencias | +5 | Bonus por consistencia |
| Racha de 5 asistencias | +10 | Bonus mayor |
| **Acciones Negativas** |||
| No-show sin aviso | -15 | Impacto alto |
| Canceló <24hs antes | -5 | Turno difícil de re-asignar |
| No confirmó (silencio) | -3 | Indicador de riesgo |
| Falló test técnico y no pidió ayuda | -2 | Falta de proactividad |
| 2 no-shows consecutivos | -25 | Penalización adicional |

### Reglas Especiales

#### 1. **Justificaciones Automáticas**
Ciertos eventos NO penalizan el score:
- Internación hospitalaria (validada)
- Emergencia médica documentada
- Fuerza mayor (catástrofe, corte masivo de internet)

**Implementación**: 
- Paciente puede apelar no-show dentro de 48hs
- Envía foto/documento vía chatbot
- IA + revisión humana (casos ambiguos)
- Si se acepta: No se descuentan puntos

#### 2. **Decay Natural (Decaimiento)**
Para evitar que un error pasado "condene" para siempre:
- Score tiende gradualmente hacia 70 (baseline) si no hay actividad
- Velocidad: +1 punto/semana sin no-shows
- Permite "rehabilitación" natural

#### 3. **Cap de Puntos**
- Máximo: 100 puntos (techo)
- Mínimo: 0 puntos (piso, pero con path de recuperación)

### Ejemplo de Evolución del Score

**Caso: María, paciente nueva**

| Fecha | Acción | Puntos | Score | Nivel |
|-------|--------|--------|-------|-------|
| Sem 1 | Inicia | - | 70 | 🟠 Bueno |
| Sem 2 | Confirmó consulta | +2 | 72 | 🟠 Bueno |
| Sem 2 | Asistió a consulta | +5 | 77 | 🟡 Muy Bueno |
| Sem 4 | Asistió a consulta | +5 | 82 | 🟡 Muy Bueno |
| Sem 6 | No-show sin aviso | -15 | 67 | 🟠 Bueno |
| Sem 8 | Canceló >24hs | +1 | 68 | 🟠 Bueno |
| Sem 10 | Asistió | +5 | 73 | 🟠 Bueno |
| Sem 12 | Racha de 3 asistencias | +5 | 83 | 🟡 Muy Bueno |
| Sem 16 | Asistió | +5 | 88 | 🟡 Muy Bueno |
| Sem 18 | Asistió (racha 5) | +5+10 | 103→100 | 🟢 Excelente |

---

## 🎁 Beneficios por Nivel

### 🟢 Nivel Excelente (90-100 pts)

#### Acceso Premium
- ✨ **Turnos express**: Acceso a consultas "same-day" (sujeto a disponibilidad)
- 📅 **Prioridad en horarios pico**: Puede reservar en horarios más demandados (8-10am, 6-8pm)
- 🎯 **Turnos sin lista de espera**: Bypass a cola en especialidades demoradas
- 💬 **Canal rápido de soporte**: WhatsApp prioritario para consultas técnicas
- 🏆 **Badge visible**: "Paciente Premium" en su perfil (opcional, puede ocultarlo)

#### Incentivos Adicionales
- 🎁 **1 consulta de seguimiento express/trimestre**: Llamada corta (10 min) sin turno
- 📚 **Acceso a webinars exclusivos**: Charlas de prevención, bienestar
- 🏅 **Certificado de asistencia**: Útil para empleadores/seguros (si lo necesita)

---

### 🟡 Nivel Muy Bueno (75-89 pts)

#### Acceso Preferente
- ⏰ **Confirmación simplificada**: Menos recordatorios (confían en él/ella)
- 📅 **Prioridad en re-agendamiento**: Si cancela con aviso, puede re-agendar antes
- 🎯 **Acceso parcial a turnos express**: En horarios menos críticos
- 💬 **Soporte estándar mejorado**: Respuesta en <2 horas

#### Incentivos
- 🎁 **Créditos de bienestar**: Acceso a contenido educativo premium
- 🏅 **Badge**: "Paciente Confiable"

---

### 🟠 Nivel Bueno (60-74 pts) - **BASELINE**

#### Acceso Estándar
- 📅 **Acceso normal**: Todos los turnos regulares disponibles
- 💬 **Soporte estándar**: Respuesta en 24hs
- 🔄 **Re-agendamiento normal**: Sin prioridad extra

**Nota**: Este es el nivel de inicio para pacientes nuevos.

---

### 🔴 Nivel Regular (40-59 pts)

#### Acceso Limitado
- ⏳ **Turnos no-pico únicamente**: No puede reservar en horarios más demandados
- ⚠️ **Confirmación obligatoria reforzada**: 72hs Y 24hs antes (doble check)
- 📞 **Llamada pre-consulta**: Call center confirma 24hs antes (además de chatbot)
- 🚫 **Sin acceso a express**: Solo turnos regulares con 48hs+ anticipación

#### Path de Recuperación Visible
- 📊 **Dashboard muestra**: "Necesitás 3 asistencias consecutivas para subir a Bueno"
- 💡 **Tips**: Sugerencias concretas para mejorar score

---

### ⚫ Nivel Bajo (0-39 pts)

#### Acceso Restringido (Temporal)
- 🔒 **Bloqueo temporal de turnos online**: Solo puede sacar turno llamando (con asistencia humana)
- 🎯 **Evaluación caso por caso**: Operador evalúa si otorgar turno según urgencia
- 📞 **Obligatorio hablar con coordinador**: Breve charla para entender barreras
- ⏱️ **Test técnico obligatorio**: Antes de cada consulta

#### Recuperación Acelerada
Para evitar que sea "imposible" salir:
- ✅ **Asistencia cuenta doble**: Cada consulta completada da +10 en vez de +5
- 🎯 **Plan de recuperación**: "Completá 2 consultas y subís a Regular"
- 🤝 **Acompañamiento**: Navegador de pacientes disponible si lo necesita

**Filosofía**: No queremos "castigar eternamente", sino **corregir el comportamiento**.

---

## 💡 Incentivos Positivos (Premios por Cumplimiento)

### 🏆 Sistema de Logros (Achievements)

#### Logros Básicos
| Logro | Requisito | Recompensa |
|-------|-----------|------------|
| 🎯 **Primera Consulta Exitosa** | 1 asistencia | +5 pts bonus |
| 🔥 **Racha de Fuego** | 3 asistencias consecutivas | +5 pts bonus |
| ⭐ **Estrella Dorada** | 5 asistencias consecutivas | +10 pts + badge |
| 📅 **Puntualidad Perfecta** | 10 confirmaciones a tiempo | +8 pts |
| 🚀 **MVP del Mes** | Mayor asistencia del mes en su centro | Reconocimiento + +15 pts |

#### Logros Especiales
| Logro | Requisito | Recompensa |
|-------|-----------|------------|
| 🏥 **Asistencia Perfecta Anual** | 12 meses sin no-shows | 1 consulta gratis + certificado |
| 🎓 **Educado en Salud** | Completó 5 webinars | Acceso a biblioteca premium |
| 🤝 **Embajador** | Refirió 3 pacientes que asistieron | +20 pts + badge especial |

### 🎁 Programa de Beneficios Acumulativos

#### Créditos de Bienestar
- **Qué son**: Moneda virtual dentro del sistema (NO dinero real)
- **Cómo se ganan**: 1 crédito = 1 asistencia confirmada
- **Cómo se usan**:
  - 3 créditos = 1 consulta grupal de seguimiento (nutrición, salud mental, etc.)
  - 5 créditos = Acceso a 1 taller preventivo (ej: manejo de diabetes)
  - 10 créditos = 1 consulta express (15 min) de seguimiento

#### Acceso Preferente Temporal
- **Qué es**: 1 mes de acceso "Muy Bueno" aunque estés en "Bueno"
- **Cómo se gana**: Racha de 5 asistencias perfectas
- **Beneficio**: Probar beneficios premium sin subirlo permanentemente (incentivo para mantenerlo)

### 🏅 Sistema de Badges (Insignias)

**Visibles en el perfil del paciente** (opcional, puede ocultarlos):

| Badge | Significado | Requisito |
|-------|-------------|-----------|
| 🏆 **Paciente Premium** | Máximo nivel de confianza | Score 90-100 |
| ⭐ **Paciente Confiable** | Alto nivel de confianza | Score 75-89 |
| 🔥 **Racha Activa** | Consistencia actual | 5+ asistencias consecutivas |
| 🎓 **Salud Proactiva** | Educación continua | 3+ webinars completados |
| 🚀 **Early Adopter** | Primeros usuarios | Primeros 1000 pacientes |
| 🤝 **Embajador** | Refirió pacientes | 3+ referencias exitosas |

**Uso estratégico**:
- Gamificación visual (enganche emocional)
- Social proof (motivación por comparación positiva)
- Coleccionables (incentiva comportamiento a largo plazo)

---

## 📱 Casos de Uso Prácticos

### Caso 1: Paciente Nuevo (María, 34 años)

**Contexto**: Primera vez usando telemedicina

#### Journey
1. **Registro** → Comienza con 70 pts (Bueno)
2. **Primera consulta agendada** → Recibe bienvenida + explicación del score
3. **72hs antes** → Chatbot solicita confirmación
   - María confirma → +2 pts
4. **24hs antes** → Test técnico automático
   - María completa test → +1 pt
5. **Día de consulta** → Se conecta a tiempo
   - Consulta exitosa → +5 pts
   - **Total: 78 pts (Muy Bueno)**
6. **Resultado**: María ve su badge "Paciente Confiable" y mensaje:
   > "¡Felicitaciones! Tu asistencia te dio acceso preferente. Seguí así para desbloquear turnos express 🚀"

**Insight**: Primera experiencia positiva refuerza comportamiento.

---

### Caso 2: Paciente con Mal Historial (Juan, 45 años)

**Contexto**: Score bajo (35 pts) por 3 no-shows previos

#### Journey
1. **Intenta agendar turno online** → Sistema lo bloquea suavemente:
   > "Para garantizar la mejor atención, necesitamos confirmar tu turno por teléfono. ¿Llamamos ahora o preferís llamar vos? 📞"
   
2. **Juan llama** → Coordinadora (amable, no acusatoria):
   - "Veo que tuviste algunos inconvenientes en consultas anteriores. ¿Hay algo que podamos hacer para ayudarte?"
   - Juan explica: "Me olvido, trabajo mucho"
   
3. **Solución personalizada**:
   - Coordinadora agenda turno en horario compatible
   - Activa recordatorios reforzados (72hs, 48hs, 24hs, 2hs antes)
   - Ofrece navegador de pacientes si lo necesita
   
4. **Juan asiste** → +10 pts (doble) + mensaje motivacional:
   > "¡Excelente, Juan! Cada consulta completada te acerca a recuperar acceso completo. Siguiente meta: llegar a 45 pts (2 consultas más) 💪"
   
5. **3 consultas después** → Juan llega a 65 pts (Bueno)
   - Desbloquea turnos online de nuevo
   - Recibe certificado de "Recuperación Exitosa"

**Insight**: Enfoque en rehabilitación, no castigo perpetuo.

---

### Caso 3: Paciente Elite (Ana, 52 años)

**Contexto**: Score 95 pts (Excelente), usa el sistema hace 1 año

#### Journey
1. **Ana se siente mal un jueves 3pm** → Necesita consulta urgente
2. **Entra a app** → Ve opción "Turnos Express (Solo Premium)"
3. **Reserva turno same-day para 6pm** → Confirmación instantánea
4. **Se conecta a las 6pm** → Consulta exitosa
5. **Recibe mensaje**:
   > "Ana, gracias por tu confianza. Este es tu beneficio #12 como Paciente Premium este año. ¡Seguís siendo inspiración! 🏆"

**Insight**: Beneficios tangibles y reconocimiento refuerzan lealtad.

---

### Caso 4: No-Show Justificado (Pedro, 67 años)

**Contexto**: Pedro tiene 82 pts (Muy Bueno), pero sufrió emergencia médica

#### Journey
1. **Pedro no asiste a consulta programada** → Sistema descuenta -15 pts automáticamente
2. **24hs después** → Pedro recibe mensaje del chatbot:
   > "Notamos que no pudiste asistir ayer. Si fue por fuerza mayor (emergencia, internación), podés justificarlo en 48hs y no perderás puntos. ¿Querés hacerlo ahora?"
   
3. **Pedro responde**: "Sí, estuve internado"
4. **Chatbot pide**: "Enviame una foto del alta médica o resumen de internación (tus datos están protegidos 🔒)"
5. **Pedro envía foto** → IA analiza + revisión humana confirma
6. **Sistema revierte penalización**: -15 pts → 0 pts
   - Score vuelve a 82 pts
   - Mensaje: "Pedro, entendemos que fue una emergencia. No perdiste puntos. ¡Esperamos que estés mejor! 💙"

**Insight**: Flexibilidad humana en sistema automatizado.

---

## 🔧 Implementación Técnica

### Stack Tecnológico Recomendado

#### Base de Datos
```sql
Tabla: patient_reputation

patient_id (PK)          INT
current_score            INT (0-100)
score_level             ENUM('excelente', 'muy_bueno', 'bueno', 'regular', 'bajo')
total_appointments       INT
attended_appointments    INT
no_shows                INT
current_streak          INT (asistencias consecutivas)
best_streak             INT (récord personal)
badges                  JSON (array de badges ganados)
wellness_credits        INT
created_at              TIMESTAMP
updated_at              TIMESTAMP
last_activity_date      DATE
```

```sql
Tabla: score_history

id (PK)                 INT
patient_id (FK)         INT
action_type             VARCHAR (ej: 'attended', 'no_show', 'confirmed')
points_change           INT (ej: +5, -15)
previous_score          INT
new_score              INT
description            TEXT
timestamp              TIMESTAMP
appealable             BOOLEAN
appeal_status          ENUM('pending', 'approved', 'rejected', NULL)
```

```sql
Tabla: achievements

id (PK)                 INT
patient_id (FK)         INT
achievement_type        VARCHAR (ej: 'first_consult', 'streak_5')
unlocked_at            TIMESTAMP
reward_points          INT
badge_earned           VARCHAR
```

#### APIs Necesarias

```javascript
// Microservicio: Reputation Engine

// 1. Calcular score después de evento
POST /api/reputation/calculate
Body: {
  patient_id: 12345,
  event_type: "attended" | "no_show" | "confirmed" | "cancelled_late",
  timestamp: "2025-11-06T14:30:00Z",
  metadata: { ... }
}
Response: {
  previous_score: 72,
  new_score: 77,
  level_change: false,
  achievements_unlocked: ["streak_3"],
  message: "¡+5 pts! Seguí así para llegar a Muy Bueno"
}

// 2. Obtener score actual
GET /api/reputation/score/{patient_id}
Response: {
  score: 82,
  level: "muy_bueno",
  badges: ["confiable", "streak_activa"],
  benefits: {
    express_access: true,
    priority_scheduling: true,
    fast_support: true
  },
  next_milestone: {
    level: "excelente",
    points_needed: 8,
    message: "8 puntos más para Acceso Premium"
  }
}

// 3. Verificar elegibilidad para beneficio
GET /api/reputation/check-eligibility/{patient_id}?benefit=express_appointment
Response: {
  eligible: true,
  reason: "Score 82 (Muy Bueno) permite acceso parcial a express",
  restrictions: "Solo en horarios 2pm-4pm"
}

// 4. Apelar no-show
POST /api/reputation/appeal
Body: {
  patient_id: 12345,
  incident_id: 789,
  reason: "Emergencia médica",
  evidence: "base64_image_or_document",
  details: "Estuve internado 3 días"
}
Response: {
  appeal_id: 999,
  status: "pending_review",
  estimated_response: "48 horas",
  message: "Gracias por avisar. Revisaremos tu caso en 24-48hs"
}

// 5. Obtener historial
GET /api/reputation/history/{patient_id}?limit=10
Response: [
  {
    date: "2025-11-05",
    action: "Asistió a consulta",
    points: +5,
    score_after: 77,
    level_after: "muy_bueno"
  },
  {
    date: "2025-10-28",
    action: "Confirmó consulta",
    points: +2,
    score_after: 72,
    level_after: "bueno"
  }
]
```

#### Integración con Chatbot WhatsApp

```javascript
// Flujo: Confirmación Pre-Consulta

// 1. Chatbot inicia conversación (72hs antes)
Chatbot: "Hola María! Tu teleconsulta con Dra. López es el viernes 8/11 a las 10am. ¿Confirmás que vas a asistir? 📅"

Opciones:
[Sí, confirmo] [Necesito cancelar] [Ver detalles]

// 2. Si confirma
await reputationAPI.calculate({
  patient_id: maria.id,
  event_type: "confirmed"
});

Chatbot: "¡Perfecto! ✅ Ganaste +2 pts (ahora tenés 74 pts - Bueno). Te mando un test técnico rápido para asegurarnos que todo funcione. ¿Dale ahora o mañana?"

// 3. Si cancela (>24hs antes)
await reputationAPI.calculate({
  patient_id: maria.id,
  event_type: "cancelled_advance"
});

Chatbot: "Entendido. Tu turno quedó liberado para otro paciente (ganaste +1 pt por avisar a tiempo 👍). ¿Querés re-agendar ahora o después?"

// 4. Si no responde en 24hs
await reputationAPI.calculate({
  patient_id: maria.id,
  event_type: "no_confirmation"
});

// Activa recordatorio reforzado + flag de riesgo
```

#### Dashboard para Médicos/Coordinadores

```javascript
// Vista: Pacientes de Alto Riesgo
// Muestra pacientes con consulta próxima y score <60

{
  "high_risk_patients": [
    {
      "name": "Juan Pérez",
      "appointment_date": "2025-11-07 15:00",
      "score": 45,
      "level": "regular",
      "risk_factors": [
        "2 no-shows en últimos 2 meses",
        "No confirmó consulta",
        "Score bajando (-10 últimas 2 semanas)"
      ],
      "recommended_actions": [
        "Llamar para confirmar",
        "Ofrecer cambio de horario",
        "Activar recordatorios reforzados"
      ]
    }
  ]
}
```

---

## 🌍 Benchmarks Internacionales

### Caso 1: NHS (Reino Unido)
**Sistema**: "DNA Rate" (Did Not Attend) tracking

**Cómo funciona**:
- Registran tasa de ausentismo por paciente
- Alta tasa = carta personalizada del GP explicando impacto
- Casos extremos = conversación obligatoria antes de nuevo turno

**Resultados**:
- Reducción de 15% en no-shows tras implementación
- 94% pacientes mejoró comportamiento tras "carta de conciencia"

**Qué tomamos**:
- Enfoque educativo antes que punitivo
- Conversación humana en casos extremos
- Transparencia en el impacto del ausentismo

---

### Caso 2: Clínica Universitaria de Navarra (España)
**Sistema**: "Puntos de Fidelidad" por asistencia

**Cómo funciona**:
- Puntos acumulados dan acceso a servicios extra (nutricionista, fisioterapia)
- Pacientes VIP (100+ pts) tienen línea directa de coordinación

**Resultados**:
- 22% reducción en no-shows
- 89% pacientes considera el sistema "justo"
- NPS aumentó de 42 a 68

**Qué tomamos**:
- Premios tangibles (no solo simbólicos)
- Beneficios de conveniencia (línea directa)
- Percepción de justicia como KPI

---

### Caso 3: Veterans Health Administration (USA)
**Sistema**: "Commitment-based scheduling"

**Cómo funciona**:
- Paciente firma "contrato de compromiso" al agendar
- Recuerdan impacto en otros veteranos si no asiste
- No-shows repetidos = consulta con trabajador social (no castigo, sino ayuda)

**Resultados**:
- 18% reducción en no-shows
- Identificaron barreras reales (transporte, salud mental) en 60% casos

**Qué tomamos**:
- Compromiso explícito (no asunción tácita)
- Enfoque en identificar barreras
- Trabajador social/navegador para casos complejos

---

## 📊 Métricas de Éxito

### KPIs Principales

#### 1. Tasa de No-Shows
**Baseline**: 33%  
**Target Q1**: <20%  
**Target Q2**: <15%  
**Target Q3**: <10%

**Medición**:
```
No-show rate = (No-shows / Total citas agendadas) × 100
```

#### 2. Distribución de Scores

**Target óptimo** (después de 6 meses):
- 🟢 Excelente (90-100): 25%
- 🟡 Muy Bueno (75-89): 35%
- 🟠 Bueno (60-74): 30%
- 🔴 Regular (40-59): 8%
- ⚫ Bajo (0-39): 2%

**Alarma si**:
- >15% en nivel Regular o Bajo → Revisar sistema, puede ser muy punitivo
- <40% en Muy Bueno+ → Incentivos débiles, ajustar recompensas

#### 3. Tasa de Confirmación Activa
**Target**: >80% confirma 48-72hs antes

**Medición**:
```
Confirmation rate = (Confirmaciones activas / Recordatorios enviados) × 100
```

#### 4. NPS del Sistema de Reputación
**Target**: >60

**Pregunta**:
> "¿Qué tan probable es que recomiendes nuestro sistema de beneficios por asistencia a otro paciente?"

#### 5. Tasa de Apelaciones Exitosas
**Target**: 60-80% de apelaciones son aprobadas

**Insight**:
- Muy bajo (<40%) → Sistema demasiado restrictivo en apelaciones
- Muy alto (>90%) → Pacientes abusan del sistema

#### 6. Tiempo de Recuperación (de score bajo)
**Target**: <8 semanas para pasar de Bajo (0-39) a Bueno (60+)

**Medición**:
```
Recovery time = Fecha llegada a 60pts - Fecha caída a <40pts
```

---

### Dashboards de Monitoreo

#### Dashboard 1: Vista General
```
┌─────────────────────────────────────────┐
│  Sistema de Reputación - Overview       │
├─────────────────────────────────────────┤
│                                         │
│  📊 Distribución de Scores             │
│  [Gráfico de barras por nivel]         │
│                                         │
│  📈 Evolución de No-Shows              │
│  Mes 1: 33% → Mes 3: 18% → Mes 6: 11% │
│                                         │
│  🎯 Pacientes en Recuperación           │
│  45 pacientes subieron >20 pts último  │
│  mes                                    │
│                                         │
│  ⚠️  Alertas                            │
│  - 12 pacientes en riesgo (score <45)  │
│  - 8 apelaciones pendientes             │
└─────────────────────────────────────────┘
```

#### Dashboard 2: Vista por Paciente (Médico)
```
┌─────────────────────────────────────────┐
│  Paciente: María González               │
├─────────────────────────────────────────┤
│  Score: 85 (🟡 Muy Bueno)              │
│  Nivel: Acceso Preferente               │
│                                         │
│  📅 Historial reciente:                │
│  ✅ 18/10 - Asistió                     │
│  ✅ 04/10 - Asistió                     │
│  ⚠️  20/09 - Canceló <24hs              │
│  ✅ 06/09 - Asistió                     │
│                                         │
│  🏆 Logros:                             │
│  - Racha de Fuego (3 consecutivas)      │
│  - Puntualidad Perfecta                 │
│                                         │
│  📊 Tendencia: ↗️ Subiendo              │
│  Próxima meta: 90 pts (Excelente)      │
└─────────────────────────────────────────┘
```

---

## 🚀 Roadmap de Implementación

### Fase 1: MVP (Mes 1-2)
✅ Tabla de scores básica  
✅ Algoritmo de puntos core  
✅ Integración con chatbot (confirmación)  
✅ Dashboard simple (admin)  
✅ 3 niveles de score (Bueno/Regular/Bajo)

**Output**: Sistema funcional sin gamificación avanzada

---

### Fase 2: Gamificación (Mes 3)
✅ 5 niveles completos  
✅ Sistema de badges  
✅ Logros básicos (rachas, primera consulta)  
✅ Vista de score para paciente (app/WhatsApp)  
✅ Mensajes motivacionales

**Output**: Experiencia engaging para paciente

---

### Fase 3: Incentivos Avanzados (Mes 4)
✅ Créditos de bienestar  
✅ Programa de beneficios  
✅ Sistema de apelaciones  
✅ Predicción de riesgo (ML básico)  
✅ Dashboard para médicos

**Output**: Sistema completo y predictivo

---

### Fase 4: Optimización (Mes 5-6)
✅ A/B testing de algoritmo de puntos  
✅ Ajuste de recompensas según data  
✅ Integración con más plataformas  
✅ Exportación de certificados  
✅ Analytics avanzados

**Output**: Sistema optimizado y escalable

---

## ⚖️ Consideraciones Éticas y Legales

### Privacidad
- ✅ Score NO es compartido con nadie sin consentimiento
- ✅ Médicos ven score solo si paciente autoriza
- ✅ Datos de apelaciones (fotos de documentos) encriptados y eliminados post-revisión

### Equidad
- ✅ Pacientes con discapacidad/enfermedades crónicas pueden tener reglas ajustadas
- ✅ No se discrimina por score en urgencias
- ✅ Apelaciones siempre posibles

### Transparencia
- ✅ Reglas del score explicadas en onboarding
- ✅ Paciente puede ver historial completo
- ✅ Notificación antes de penalización (chance de apelar)

### Legal (Argentina)
- ✅ NO involucra dinero (evita regulación financiera)
- ✅ Cumple Ley de Protección de Datos Personales (25.326)
- ✅ No discrimina por condición de salud (art. 75 Constitución)

---

## 🎓 Lecciones Aprendidas (Benchmarks)

### ✅ Lo que SÍ funciona
1. **Enfoque positivo** > Castigos
2. **Reglas claras y visibles** > Sistema opaco
3. **Beneficios tangibles** (conveniencia) > Simbólicos
4. **Path de recuperación** > Penalización eterna
5. **Gamificación visual** (badges) > Solo números
6. **Educación del impacto** > Asumir que entienden

### ❌ Lo que NO funciona
1. Multas monetarias (fricción legal + percepción negativa)
2. Sistema demasiado complejo (pacientes no entienden)
3. Penalizaciones sin contexto (sin chance de apelar)
4. Recompensas irrelevantes (puntos sin uso)
5. Falta de feedback (paciente no sabe cómo está)

---

## 📚 Referencias

1. **NHS England** - Reducing Did Not Attend (DNA) rates (2023)
2. **Clínica Universidad de Navarra** - Sistema de Fidelización de Pacientes (2022)
3. **Veterans Health Administration** - Commitment-Based Scheduling Study (2021)
4. **Hospital Italiano Buenos Aires** - Análisis de Ausentismo en Telemedicina (2024)
5. **Medifé Argentina** - Reporte de Utilización de Telemedicina (2024)

---

## 🔗 Documentos Relacionados

- `01_investigacion/analisis_problema.md` → Datos de ausentismo
- `02_propuesta_valor/propuesta_valor.md` → Gamificación original
- `03_solucion_tecnica/arquitectura_engagement.md` → Implementación técnica
- `05_mvp/roadmap.md` → Plan de desarrollo

---

**Última actualización**: Noviembre 2025  
**Versión**: 1.0  
**Estado**: ✅ Definición completa - Listo para implementación  
**Próximo paso**: Arquitectura técnica detallada

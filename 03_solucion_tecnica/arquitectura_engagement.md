# Arquitectura del Módulo de Engagement
**ConectaSalud - Diseño Técnico Completo**

---

## 📋 Índice
1. [Visión General](#visión-general)
2. [Arquitectura de Alto Nivel](#arquitectura-de-alto-nivel)
3. [Stack Tecnológico](#stack-tecnológico)
4. [Componentes Core](#componentes-core)
5. [Flujos de Datos](#flujos-de-datos)
6. [Integraciones](#integraciones)
7. [Base de Datos](#base-de-datos)
8. [APIs y Microservicios](#apis-y-microservicios)
9. [Seguridad y Compliance](#seguridad-y-compliance)
10. [Escalabilidad](#escalabilidad)
11. [Monitoreo y Observabilidad](#monitoreo-y-observabilidad)

---

## 🎯 Visión General

El **Módulo de Engagement** es el cerebro de ConectaSalud. Integra:
- Sistema de Reputación (scoring)
- Chatbot IA (WhatsApp)
- Test Técnico Automatizado
- Predicción de Ausentismo
- Dashboard de Analytics

### Principios de Diseño

1. **Plug & Play**: Se integra con plataformas existentes sin reemplazarlas
2. **Event-Driven**: Arquitectura basada en eventos para escalabilidad
3. **API-First**: Todas las funcionalidades expuestas vía API REST
4. **Multi-tenant**: Soporte para múltiples organizaciones de salud
5. **Cloud-Native**: Diseñado para AWS/GCP desde el inicio

---

## 🏗️ Arquitectura de Alto Nivel

```
┌──────────────────────────────────────────────────────────────────┐
│                        CAPA DE PRESENTACIÓN                       │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐│
│  │ WhatsApp   │  │ Dashboard  │  │ Patient    │  │ Admin      ││
│  │ Chatbot    │  │ Web        │  │ Mobile App │  │ Panel      ││
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘│
│         │              │                │               │        │
└─────────┼──────────────┼────────────────┼───────────────┼────────┘
          │              │                │               │
          ▼              ▼                ▼               ▼
┌──────────────────────────────────────────────────────────────────┐
│                        API GATEWAY (Kong/AWS)                     │
│  - Authentication (JWT)                                           │
│  - Rate Limiting                                                  │
│  - Request Routing                                                │
│  - Logging                                                        │
└──────────────────────────────────────────────────────────────────┘
          │
          ▼
┌──────────────────────────────────────────────────────────────────┐
│                    CAPA DE MICROSERVICIOS                         │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ Reputation  │  │ Chatbot     │  │ Notification│             │
│  │ Engine      │  │ Service     │  │ Service     │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│         │                │                 │                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ Appointment │  │ Technical   │  │ Analytics   │             │
│  │ Service     │  │ Test Engine │  │ Service     │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│         │                │                 │                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ ML Predictor│  │ Integration │  │ User        │             │
│  │ Service     │  │ Hub         │  │ Service     │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
          │
          ▼
┌──────────────────────────────────────────────────────────────────┐
│                    MESSAGE QUEUE (RabbitMQ/Kafka)                 │
│  - Event Bus                                                      │
│  - Async Processing                                               │
│  - Service Decoupling                                             │
└──────────────────────────────────────────────────────────────────┘
          │
          ▼
┌──────────────────────────────────────────────────────────────────┐
│                        CAPA DE DATOS                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ PostgreSQL  │  │ Redis       │  │ MongoDB     │             │
│  │ (Primary DB)│  │ (Cache)     │  │ (Chat Logs) │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐                               │
│  │ S3/Blob     │  │ Elasticsearch│                              │
│  │ (Files)     │  │ (Search)     │                              │
│  └─────────────┘  └─────────────┘                               │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
          │
          ▼
┌──────────────────────────────────────────────────────────────────┐
│                    SERVICIOS EXTERNOS                             │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ WhatsApp    │  │ Twilio      │  │ SendGrid    │             │
│  │ Business API│  │ (SMS/Voice) │  │ (Email)     │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ OpenAI/     │  │ Customer's  │  │ Payment     │             │
│  │ Anthropic   │  │ Telemedicine│  │ Gateway     │             │
│  │ (LLM)       │  │ Platform    │  │ (MercadoPago│             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Stack Tecnológico

### Backend

| Componente | Tecnología | Justificación |
|------------|------------|---------------|
| **Lenguaje** | Node.js (TypeScript) | Ecosistema maduro, async I/O, fácil integración APIs |
| **Framework** | NestJS | Arquitectura modular, TypeScript nativo, DI |
| **API Gateway** | Kong / AWS API Gateway | Rate limiting, auth, routing |
| **Auth** | JWT + OAuth2 | Estándar de industria, stateless |
| **Message Queue** | RabbitMQ (MVP) → Kafka (scale) | Async processing, event-driven |
| **Cache** | Redis | In-memory, soporte pub/sub |
| **Search** | Elasticsearch | Full-text search, analytics |

### Frontend

| Componente | Tecnología | Justificación |
|------------|------------|---------------|
| **Web Dashboard** | React + TypeScript | Ecosistema maduro, componentes reusables |
| **UI Library** | Material-UI / Ant Design | Componentes profesionales pre-built |
| **State Mgmt** | Redux Toolkit / Zustand | Gestión de estado predecible |
| **Charts** | Recharts / Chart.js | Visualizaciones interactivas |
| **Mobile** | React Native (futuro) | Code sharing con web |

### Base de Datos

| Tipo | Tecnología | Uso |
|------|------------|-----|
| **Relacional** | PostgreSQL 15+ | Datos transaccionales, scores, usuarios |
| **Cache** | Redis 7+ | Sessions, rate limiting, real-time data |
| **NoSQL** | MongoDB | Chat logs, analytics events |
| **Storage** | AWS S3 / GCP Cloud Storage | Documentos, evidencias de apelaciones |

### IA/ML

| Componente | Tecnología | Uso |
|------------|------------|-----|
| **LLM Chatbot** | GPT-4 Turbo / Claude 3.5 | Conversaciones naturales en WhatsApp |
| **Predicción** | Scikit-learn / TensorFlow | Predicción de ausentismo |
| **NLP** | spaCy / Hugging Face | Análisis de sentimiento, intenciones |
| **OCR** | Tesseract / AWS Textract | Lectura de documentos en apelaciones |

### DevOps

| Componente | Tecnología | Justificación |
|------------|------------|---------------|
| **Containers** | Docker | Portabilidad, consistencia |
| **Orchestration** | Kubernetes (GKE/EKS) | Auto-scaling, self-healing |
| **CI/CD** | GitHub Actions / GitLab CI | Automatización de deploys |
| **Monitoring** | Datadog / New Relic | Observabilidad full-stack |
| **Logs** | ELK Stack (Elasticsearch, Logstash, Kibana) | Centralización de logs |
| **Infra as Code** | Terraform | Reproducibilidad, versioning |

### Cloud Provider

**Recomendación**: **AWS** (primario) o **GCP** (alternativo)

**Por qué AWS**:
- ✅ Más usado en LATAM (facilita hiring)
- ✅ Servicios maduros (ECS, RDS, S3, Lambda)
- ✅ Soporte local en Argentina
- ✅ Programa de créditos para startups

---

## 🧩 Componentes Core

### 1. Reputation Engine (Motor de Reputación)

**Responsabilidades**:
- Calcular y actualizar scores
- Detectar logros (achievements)
- Gestionar apelaciones
- Predecir riesgo de no-show

**Tech Stack**:
```typescript
// Microservicio: reputation-service
// Framework: NestJS
// DB: PostgreSQL
// Cache: Redis
// Queue: RabbitMQ

Endpoints:
POST   /api/v1/reputation/calculate      // Calcular score post-evento
GET    /api/v1/reputation/score/:id      // Obtener score actual
GET    /api/v1/reputation/history/:id    // Historial de puntos
POST   /api/v1/reputation/appeal         // Registrar apelación
PATCH  /api/v1/reputation/appeal/:id     // Aprobar/rechazar apelación
GET    /api/v1/reputation/at-risk        // Pacientes en riesgo

Events Emitted:
- score.updated
- level.changed
- achievement.unlocked
- appeal.submitted
- appeal.resolved
```

**Lógica de Negocio**:
```typescript
// reputation.service.ts

async calculateScore(event: AppointmentEvent): Promise<ScoreUpdate> {
  const patient = await this.getPatient(event.patientId);
  const currentScore = patient.reputation.score;
  
  // Aplicar regla según tipo de evento
  const pointsChange = this.getRuleForEvent(event.type);
  
  // Detectar rachas
  const streakBonus = await this.checkStreak(event.patientId);
  
  // Calcular nuevo score (cap 0-100)
  const newScore = Math.min(100, Math.max(0, 
    currentScore + pointsChange + streakBonus
  ));
  
  // Detectar cambio de nivel
  const levelChanged = this.detectLevelChange(currentScore, newScore);
  
  // Detectar achievements
  const achievements = await this.checkAchievements(event.patientId);
  
  // Guardar en DB
  await this.saveScoreHistory({
    patientId: event.patientId,
    previousScore: currentScore,
    newScore: newScore,
    pointsChange: pointsChange + streakBonus,
    event: event.type,
    timestamp: new Date()
  });
  
  // Emit events
  if (levelChanged) {
    this.eventBus.emit('level.changed', { patientId, newLevel });
  }
  
  if (achievements.length > 0) {
    this.eventBus.emit('achievement.unlocked', { patientId, achievements });
  }
  
  return {
    previousScore: currentScore,
    newScore: newScore,
    levelChanged: levelChanged,
    achievements: achievements
  };
}
```

---

### 2. Chatbot Service (Asistente Virtual)

**Responsabilidades**:
- Conversaciones vía WhatsApp
- Confirmación de turnos
- Recordatorios automáticos
- Soporte técnico básico
- Gestión de apelaciones

**Tech Stack**:
```typescript
// Microservicio: chatbot-service
// Framework: NestJS
// LLM: GPT-4 Turbo / Claude 3.5
// Messaging: WhatsApp Business API
// DB: MongoDB (chat logs)
// Cache: Redis (conversational context)

Endpoints:
POST   /api/v1/chatbot/webhook           // Webhook de WhatsApp
POST   /api/v1/chatbot/send              // Enviar mensaje proactivo
GET    /api/v1/chatbot/history/:phone    // Historial de conversación

Events Consumed:
- appointment.created
- appointment.upcoming (72hs antes)
- appointment.upcoming (24hs antes)
- score.updated
- level.changed

Events Emitted:
- message.sent
- confirmation.received
- cancellation.requested
- appeal.submitted
```

**Flujo de Conversación**:
```typescript
// chatbot.controller.ts

@Post('webhook')
async handleIncomingMessage(@Body() payload: WhatsAppWebhook) {
  const { from, message, timestamp } = payload;
  
  // 1. Obtener contexto de conversación desde Redis
  const context = await this.contextService.get(from);
  
  // 2. Identificar intención
  const intent = await this.nlpService.detectIntent(message, context);
  
  // 3. Ejecutar lógica según intención
  switch(intent.type) {
    case 'CONFIRM_APPOINTMENT':
      return await this.handleConfirmation(from, context);
    
    case 'CANCEL_APPOINTMENT':
      return await this.handleCancellation(from, context);
    
    case 'REQUEST_HELP':
      return await this.handleTechSupport(from, message);
    
    case 'SUBMIT_APPEAL':
      return await this.handleAppeal(from, message, context);
    
    default:
      // LLM para conversación general
      return await this.handleGeneral(from, message, context);
  }
}

private async handleConfirmation(phone: string, context: Context) {
  const appointment = context.pendingAppointment;
  
  // Actualizar DB
  await this.appointmentService.confirm(appointment.id);
  
  // Actualizar score (+2 pts)
  await this.reputationService.calculate({
    patientId: appointment.patientId,
    eventType: 'confirmed',
    timestamp: new Date()
  });
  
  // Responder
  await this.whatsapp.send(phone, {
    text: "¡Perfecto! ✅ Ganaste +2 pts. Te mando un test técnico para asegurarnos que todo funcione 🚀"
  });
  
  // Actualizar contexto
  context.lastAction = 'confirmed';
  context.nextStep = 'tech_test';
  await this.contextService.set(phone, context);
  
  // Trigger test técnico
  this.eventBus.emit('confirmation.received', { 
    appointmentId: appointment.id 
  });
}
```

**Prompt Engineering para LLM**:
```typescript
// chatbot.prompts.ts

export const SYSTEM_PROMPT = `
Sos Claudia, asistente virtual de ConectaSalud, un sistema de telemedicina en Argentina.

TU PERSONALIDAD:
- Amigable y empática
- Profesional pero cercana
- Usa voseo (argentino): "sos", "tenés", "podés"
- Emojis ocasionales pero no en exceso
- Concisa: respuestas de 1-2 párrafos máximo

TU PROPÓSITO:
1. Ayudar a pacientes a asistir a sus teleconsultas
2. Resolver problemas técnicos básicos
3. Confirmar turnos y gestionar cancelaciones
4. Explicar el sistema de reputación si preguntan

REGLAS IMPORTANTES:
- NUNCA des diagnósticos médicos (derivá al médico)
- NUNCA compartas datos de otros pacientes
- Si te preguntan algo fuera de tu alcance, derivá a un humano
- Siempre confirmá datos importantes (fechas, horarios)

TONO DE EJEMPLO:
✅ "Hola María! Tu consulta con la Dra. López es mañana a las 10am. ¿Confirmás que vas a asistir? 📅"
❌ "Estimada María: Su turno médico está agendado para el día de mañana..."

CONTEXTO ACTUAL:
{context}

ÚLTIMO MENSAJE DEL PACIENTE:
{user_message}

TU RESPUESTA:
`;
```

---

### 3. Technical Test Engine (Test de Conexión)

**Responsabilidades**:
- Test de audio/video antes de consulta
- Validación de ancho de banda
- Guía de troubleshooting
- Reportes de problemas

**Tech Stack**:
```typescript
// Microservicio: tech-test-service
// Framework: NestJS + WebRTC
// Frontend: React (embebido en WhatsApp web view)
// DB: PostgreSQL (resultados de tests)

Endpoints:
POST   /api/v1/tech-test/start           // Iniciar test
GET    /api/v1/tech-test/status/:id      // Estado del test
POST   /api/v1/tech-test/submit          // Enviar resultados
GET    /api/v1/tech-test/report/:patient // Historial de tests
```

**Lógica de Test**:
```typescript
// tech-test.service.ts

async runTest(appointmentId: string): Promise<TestResult> {
  const tests = [
    this.testInternetSpeed(),
    this.testCamera(),
    this.testMicrophone(),
    this.testSpeakers(),
    this.testBrowserCompatibility()
  ];
  
  const results = await Promise.allSettled(tests);
  
  const score = this.calculateScore(results);
  const issues = this.detectIssues(results);
  
  // Guardar resultado
  await this.saveTestResult({
    appointmentId,
    score,
    issues,
    rawResults: results,
    timestamp: new Date()
  });
  
  // Si score < 70%, ofrecer ayuda
  if (score < 70) {
    await this.offerSupport(appointmentId, issues);
  }
  
  // Actualizar reputación (+1 pt por completar test)
  await this.reputationService.calculate({
    patientId: appointment.patientId,
    eventType: 'completed_tech_test',
    timestamp: new Date()
  });
  
  return { score, issues };
}

private calculateScore(results: TestResult[]): number {
  // Internet speed: 40%
  // Camera: 20%
  // Microphone: 20%
  // Speakers: 10%
  // Browser: 10%
  
  let score = 0;
  
  if (results.internetSpeed > 1) score += 40; // >1 Mbps
  if (results.camera.working) score += 20;
  if (results.microphone.working) score += 20;
  if (results.speakers.working) score += 10;
  if (results.browser.compatible) score += 10;
  
  return score;
}
```

**Widget Frontend** (embebido en WhatsApp):
```typescript
// TechTest.tsx

const TechTest: React.FC = () => {
  const [step, setStep] = useState('internet');
  const [results, setResults] = useState({});
  
  const runInternetTest = async () => {
    const start = Date.now();
    const response = await fetch('https://speed.test/1mb.bin');
    const end = Date.now();
    const duration = (end - start) / 1000;
    const speedMbps = (1 / duration) * 8; // Convert to Mbps
    
    setResults(prev => ({ ...prev, internet: speedMbps }));
    setStep('camera');
  };
  
  const runCameraTest = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setResults(prev => ({ ...prev, camera: true }));
      stream.getTracks().forEach(track => track.stop());
      setStep('microphone');
    } catch (error) {
      setResults(prev => ({ ...prev, camera: false }));
      setStep('microphone');
    }
  };
  
  // ... similar para mic, speakers, browser
  
  return (
    <div className="tech-test">
      {step === 'internet' && (
        <InternetTest onComplete={runInternetTest} />
      )}
      {step === 'camera' && (
        <CameraTest onComplete={runCameraTest} />
      )}
      {/* ... */}
      {step === 'results' && (
        <TestResults results={results} />
      )}
    </div>
  );
};
```

---

### 4. Appointment Service (Gestión de Turnos)

**Responsabilidades**:
- Crear/modificar/cancelar turnos
- Sincronización con plataforma del cliente
- Triggers de recordatorios
- Gestión de lista de espera

**Tech Stack**:
```typescript
// Microservicio: appointment-service
// Framework: NestJS
// DB: PostgreSQL
// Queue: RabbitMQ (scheduled jobs)

Endpoints:
POST   /api/v1/appointments              // Crear turno
GET    /api/v1/appointments/:id          // Obtener turno
PATCH  /api/v1/appointments/:id          // Modificar turno
DELETE /api/v1/appointments/:id          // Cancelar turno
GET    /api/v1/appointments/patient/:id  // Turnos de paciente
POST   /api/v1/appointments/:id/confirm  // Confirmar turno

Events Emitted:
- appointment.created
- appointment.upcoming (72hs, 48hs, 24hs, 2hs antes)
- appointment.confirmed
- appointment.cancelled
- appointment.completed
- appointment.no_show
```

**Lógica de Recordatorios**:
```typescript
// appointment.scheduler.ts

@Cron('0 * * * *') // Cada hora
async processUpcomingAppointments() {
  const now = new Date();
  
  // Buscar citas en próximas 72hs que no tienen recordatorio enviado
  const appointments = await this.repository.find({
    where: {
      scheduledAt: Between(now, addHours(now, 72)),
      reminderSent_72h: false
    }
  });
  
  for (const appt of appointments) {
    // Emit event para chatbot
    this.eventBus.emit('appointment.upcoming', {
      appointmentId: appt.id,
      patientId: appt.patientId,
      timeframe: '72h',
      scheduledAt: appt.scheduledAt
    });
    
    // Marcar como enviado
    await this.repository.update(appt.id, {
      reminderSent_72h: true
    });
  }
  
  // Repetir para 48hs, 24hs, 2hs
}
```

---

### 5. ML Predictor Service (Predicción de Ausentismo)

**Responsabilidades**:
- Predecir probabilidad de no-show
- Identificar factores de riesgo
- Sugerir intervenciones
- Entrenar modelos periódicamente

**Tech Stack**:
```typescript
// Microservicio: ml-predictor-service
// Framework: FastAPI (Python) + Scikit-learn
// DB: PostgreSQL (features)
// Model Storage: S3 / GCP Storage

Endpoints:
POST   /api/v1/ml/predict                // Predecir riesgo
GET    /api/v1/ml/factors/:appointment   // Factores de riesgo
POST   /api/v1/ml/train                  // Re-entrenar modelo
GET    /api/v1/ml/metrics                // Métricas del modelo
```

**Features del Modelo**:
```python
# ml_predictor/features.py

def extract_features(patient_id: str, appointment_id: str) -> dict:
    """
    Extrae features para predicción de no-show
    """
    patient = get_patient(patient_id)
    appointment = get_appointment(appointment_id)
    
    return {
        # Reputación
        'reputation_score': patient.reputation.score,
        'reputation_level': patient.reputation.level,
        'current_streak': patient.reputation.current_streak,
        
        # Historial
        'total_appointments': patient.stats.total_appointments,
        'no_show_rate': patient.stats.no_shows / patient.stats.total,
        'last_no_show_days_ago': days_since(patient.last_no_show),
        
        # Comportamiento
        'confirmed_72h': appointment.confirmed_72h,
        'completed_tech_test': appointment.tech_test_completed,
        'tech_test_score': appointment.tech_test_score,
        
        # Contexto temporal
        'day_of_week': appointment.scheduled_at.weekday(),
        'hour_of_day': appointment.scheduled_at.hour,
        'days_until_appointment': (appointment.scheduled_at - now()).days,
        
        # Demográfico
        'age': patient.age,
        'has_chronic_condition': patient.has_chronic_condition,
        'first_time_user': patient.total_appointments == 0,
        
        # Técnico
        'previous_tech_issues': patient.stats.tech_issues_count,
        'device_type': appointment.device_type  # mobile/desktop
    }

# Modelo: Random Forest Classifier
model = RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    random_state=42
)

# Entrenar
X_train, y_train = load_training_data()
model.fit(X_train, y_train)

# Predecir
features = extract_features(patient_id, appointment_id)
risk_score = model.predict_proba(features)[1]  # Probabilidad de no-show

# Interpretar
if risk_score > 0.7:
    # Alto riesgo → Llamada telefónica
    trigger_phone_call()
elif risk_score > 0.5:
    # Riesgo medio → Recordatorio reforzado
    trigger_extra_reminder()
```

---

## 🔄 Flujos de Datos

### Flujo 1: Creación de Turno

```
┌──────────┐
│ Platform │ (Plataforma de telemedicina del cliente)
│ del      │
│ Cliente  │
└────┬─────┘
     │ 1. POST /appointments (via webhook)
     ▼
┌──────────────────────────────────────┐
│   Integration Hub (Adapter Layer)   │
│   - Normaliza datos de N plataformas│
│   - Mapea a modelo interno          │
└────┬─────────────────────────────────┘
     │ 2. CREATE appointment event
     ▼
┌──────────────────────────────────────┐
│        Message Queue (RabbitMQ)      │
└────┬───────────┬─────────────────────┘
     │           │
     │           └───────────────────────┐
     │                                   │
     ▼                                   ▼
┌─────────────────┐            ┌──────────────────┐
│ Appointment     │            │ ML Predictor     │
│ Service         │            │ Service          │
│                 │            │                  │
│ - Guarda turno  │            │ - Predice riesgo │
│ - Programa      │            │ - Etiqueta appt  │
│   recordatorios │            └──────────────────┘
└────┬────────────┘
     │ 3. Emit appointment.created
     ▼
┌──────────────────────────────────────┐
│          Notification Service        │
│   - Envía confirmación inicial      │
│   - Explicación de sistema           │
└──────────────────────────────────────┘
```

---

### Flujo 2: Recordatorio 72hs Antes

```
┌──────────────────┐
│ Cron Job         │ (Cada hora)
│ (Scheduler)      │
└────┬─────────────┘
     │ 1. Busca citas próximas (72hs)
     ▼
┌──────────────────────────────────────┐
│      Appointment Service             │
│   - Filtra appts sin recordatorio    │
│   - Emit appointment.upcoming        │
└────┬─────────────────────────────────┘
     │
     ▼
┌──────────────────────────────────────┐
│         Chatbot Service              │
│   - Construye mensaje personalizado │
│   - Consulta score del paciente     │
└────┬─────────────────────────────────┘
     │ 2. Envía mensaje WhatsApp
     ▼
┌──────────────────────────────────────┐
│      WhatsApp Business API           │
└────┬─────────────────────────────────┘
     │
     ▼
┌──────────────────┐
│   PACIENTE       │
└────┬─────────────┘
     │ 3. Responde "Sí, confirmo"
     ▼
┌──────────────────────────────────────┐
│      Chatbot Service (Webhook)       │
│   - Detecta intención: CONFIRM      │
│   - Actualiza estado appt           │
│   - Trigger score update            │
└────┬─────────────────────────────────┘
     │ 4. confirmation.received event
     ▼
┌──────────────────────────────────────┐
│       Reputation Engine              │
│   - Calcula +2 pts                  │
│   - Actualiza score                 │
│   - Emit score.updated              │
└────┬─────────────────────────────────┘
     │
     ▼
┌──────────────────────────────────────┐
│         Chatbot Service              │
│   - Envía feedback positivo         │
│   - "Ganaste +2 pts!"               │
│   - Ofrece test técnico             │
└──────────────────────────────────────┘
```

---

### Flujo 3: No-Show Detectado

```
┌──────────────────┐
│ Telemedicine     │ (Hora del turno + 15 min)
│ Platform         │
│ (Cliente)        │
└────┬─────────────┘
     │ 1. Reporta no-show (webhook)
     ▼
┌──────────────────────────────────────┐
│      Integration Hub                 │
│   - Normaliza evento                │
│   - Emit appointment.no_show        │
└────┬─────────────────────────────────┘
     │
     ├─────────────────────┬────────────┐
     │                     │            │
     ▼                     ▼            ▼
┌─────────────┐  ┌──────────────┐  ┌────────────┐
│Reputation   │  │Appointment   │  │Analytics   │
│Engine       │  │Service       │  │Service     │
│             │  │              │  │            │
│-15 pts      │  │Marca no-show │  │Log evento  │
│Check rachas │  │Re-asigna slot│  └────────────┘
│Emit events  │  └──────────────┘
└────┬────────┘
     │ 2. Emit score.updated
     ▼
┌──────────────────────────────────────┐
│         Chatbot Service              │
│   - Envía mensaje 24hs después      │
│   - Ofrece opción de apelar         │
└────┬─────────────────────────────────┘
     │ 3. Mensaje WhatsApp
     ▼
┌──────────────────┐
│   PACIENTE       │
│   "Fue emergencia│
│    médica"       │
└────┬─────────────┘
     │ 4. Inicia apelación
     ▼
┌──────────────────────────────────────┐
│      Chatbot Service                 │
│   - Solicita evidencia (foto doc)   │
└────┬─────────────────────────────────┘
     │ 5. Paciente envía foto
     ▼
┌──────────────────────────────────────┐
│      Reputation Engine               │
│   - Recibe appeal con evidencia     │
│   - OCR + validación humana         │
│   - Si aprueba: Revierte puntos     │
└──────────────────────────────────────┘
```

---

## 🔌 Integraciones

### Integración con Plataformas de Telemedicina

**Desafío**: Cada plataforma tiene APIs diferentes

**Solución**: **Integration Hub** (Adapter Pattern)

```typescript
// integration-hub/adapters/

interface TelemedicineAdapter {
  createAppointment(data: AppointmentDTO): Promise<ExternalAppointment>;
  getAppointment(id: string): Promise<ExternalAppointment>;
  cancelAppointment(id: string): Promise<void>;
  registerWebhook(url: string, events: string[]): Promise<void>;
}

// Ejemplo: Adapter para Zoom Healthcare
class ZoomHealthcareAdapter implements TelemedicineAdapter {
  constructor(private apiKey: string, private apiSecret: string) {}
  
  async createAppointment(data: AppointmentDTO) {
    const response = await this.client.post('/meetings', {
      topic: `Consulta ${data.patientName} - Dr. ${data.doctorName}`,
      type: 2, // Scheduled meeting
      start_time: data.scheduledAt,
      duration: data.duration,
      settings: {
        waiting_room: true,
        join_before_host: false,
        // ... configuración de seguridad
      }
    });
    
    return {
      externalId: response.data.id,
      joinUrl: response.data.join_url,
      password: response.data.password
    };
  }
  
  // ... otros métodos
}

// Ejemplo: Adapter para Doctoralia
class DortoraliaAdapter implements TelemedicineAdapter {
  // Implementación específica para Doctoralia API
}

// Registro de adapters
const adapterFactory = {
  'zoom': () => new ZoomHealthcareAdapter(config.zoom.apiKey, config.zoom.apiSecret),
  'doctoralia': () => new DortoraliaAdapter(config.doctoralia.apiKey),
  'doxy.me': () => new DoxyAdapter(config.doxy.credentials),
  // ... más adapters
};
```

---

### Integración con WhatsApp Business API

**Opción 1: Directo** (más control, más complejo)
```typescript
// whatsapp.service.ts

import { Client } from '@wwebjs/wwebjs';

export class WhatsAppService {
  private client: Client;
  
  async initialize() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: { headless: true }
    });
    
    this.client.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    });
    
    this.client.on('message', async (msg) => {
      await this.handleIncomingMessage(msg);
    });
    
    await this.client.initialize();
  }
  
  async sendMessage(to: string, message: string) {
    await this.client.sendMessage(`${to}@c.us`, message);
  }
}
```

**Opción 2: Via Twilio** (más fácil, costo adicional)
```typescript
// whatsapp.twilio.service.ts

import twilio from 'twilio';

export class WhatsAppTwilioService {
  private client;
  
  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }
  
  async sendMessage(to: string, message: string) {
    await this.client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`,
      body: message
    });
  }
  
  async sendTemplate(to: string, templateId: string, params: any[]) {
    await this.client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`,
      contentSid: templateId,
      contentVariables: JSON.stringify(params)
    });
  }
}
```

**Recomendación para MVP**: Twilio (más rápido de implementar)  
**Recomendación para Scale**: WhatsApp Business API directo (más barato a gran escala)

---

## 🗄️ Base de Datos

### Esquema Completo (PostgreSQL)

```sql
-- USUARIOS Y AUTH
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  role ENUM('patient', 'doctor', 'admin', 'coordinator') NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  date_of_birth DATE,
  has_chronic_condition BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- REPUTACIÓN
CREATE TABLE patient_reputation (
  patient_id UUID PRIMARY KEY REFERENCES patients(id),
  current_score INT CHECK (current_score >= 0 AND current_score <= 100),
  score_level VARCHAR(20) CHECK (score_level IN ('excelente', 'muy_bueno', 'bueno', 'regular', 'bajo')),
  total_appointments INT DEFAULT 0,
  attended_appointments INT DEFAULT 0,
  no_shows INT DEFAULT 0,
  current_streak INT DEFAULT 0,
  best_streak INT DEFAULT 0,
  badges JSONB DEFAULT '[]',
  wellness_credits INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE score_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id),
  action_type VARCHAR(50) NOT NULL,
  points_change INT NOT NULL,
  previous_score INT,
  new_score INT,
  description TEXT,
  timestamp TIMESTAMP DEFAULT NOW(),
  appealable BOOLEAN DEFAULT FALSE,
  appeal_status VARCHAR(20) CHECK (appeal_status IN ('pending', 'approved', 'rejected'))
);

CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id),
  achievement_type VARCHAR(50) NOT NULL,
  unlocked_at TIMESTAMP DEFAULT NOW(),
  reward_points INT,
  badge_earned VARCHAR(50)
);

-- TURNOS
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id),
  doctor_id UUID REFERENCES users(id),
  scheduled_at TIMESTAMP NOT NULL,
  duration_minutes INT DEFAULT 30,
  status VARCHAR(20) CHECK (status IN ('scheduled', 'confirmed', 'completed', 'no_show', 'cancelled')),
  
  -- External integration
  external_platform VARCHAR(50),
  external_id VARCHAR(255),
  join_url TEXT,
  
  -- Tracking
  confirmed_72h BOOLEAN DEFAULT FALSE,
  confirmed_24h BOOLEAN DEFAULT FALSE,
  reminder_sent_72h BOOLEAN DEFAULT FALSE,
  reminder_sent_24h BOOLEAN DEFAULT FALSE,
  tech_test_completed BOOLEAN DEFAULT FALSE,
  tech_test_score INT,
  
  -- Predictions
  risk_score FLOAT,
  risk_factors JSONB,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- TESTS TÉCNICOS
CREATE TABLE tech_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID REFERENCES appointments(id),
  patient_id UUID REFERENCES patients(id),
  
  -- Resultados
  overall_score INT CHECK (overall_score >= 0 AND overall_score <= 100),
  internet_speed_mbps FLOAT,
  camera_working BOOLEAN,
  microphone_working BOOLEAN,
  speakers_working BOOLEAN,
  browser_compatible BOOLEAN,
  
  -- Detalles
  device_type VARCHAR(20),
  browser_name VARCHAR(50),
  browser_version VARCHAR(20),
  os_name VARCHAR(50),
  
  issues JSONB DEFAULT '[]',
  raw_results JSONB,
  
  completed_at TIMESTAMP DEFAULT NOW()
);

-- APELACIONES
CREATE TABLE appeals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  score_history_id UUID REFERENCES score_history(id),
  patient_id UUID REFERENCES patients(id),
  
  reason TEXT NOT NULL,
  evidence_url TEXT,
  details TEXT,
  
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMP,
  review_notes TEXT,
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- CHAT LOGS (MongoDB, pero mostramos estructura)
-- Collection: chat_messages
{
  _id: ObjectId,
  conversation_id: String,
  patient_id: String,
  from: String,  // 'patient' or 'bot'
  message: String,
  intent: String,  // detected intent
  confidence: Float,
  context: Object,
  timestamp: Date
}

-- ANALYTICS EVENTS (MongoDB)
-- Collection: analytics_events
{
  _id: ObjectId,
  event_type: String,  // 'appointment_created', 'score_updated', etc.
  patient_id: String,
  appointment_id: String,
  metadata: Object,
  timestamp: Date
}

-- ÍNDICES IMPORTANTES
CREATE INDEX idx_appointments_patient ON appointments(patient_id, scheduled_at);
CREATE INDEX idx_appointments_scheduled ON appointments(scheduled_at) WHERE status = 'scheduled';
CREATE INDEX idx_score_history_patient ON score_history(patient_id, timestamp DESC);
CREATE INDEX idx_reputation_level ON patient_reputation(score_level);
CREATE INDEX idx_reputation_score ON patient_reputation(current_score DESC);
```

---

## 🔐 Seguridad y Compliance

### Autenticación y Autorización

**JWT + OAuth2**:
```typescript
// auth.service.ts

async login(email: string, password: string) {
  const user = await this.usersService.findByEmail(email);
  
  if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    throw new UnauthorizedException();
  }
  
  const payload = { 
    sub: user.id, 
    email: user.email, 
    role: user.role 
  };
  
  return {
    access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
    refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' })
  };
}
```

**RBAC (Role-Based Access Control)**:
```typescript
// roles.guard.ts

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true;
    
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}

// Uso:
@Post('appeals/:id/approve')
@Roles('admin', 'coordinator')
async approveAppeal(@Param('id') id: string) {
  // Solo admins y coordinadores pueden aprobar apelaciones
}
```

### Protección de Datos Sensibles

**Encriptación**:
```typescript
// encryption.service.ts

import * as crypto from 'crypto';

export class EncryptionService {
  private algorithm = 'aes-256-gcm';
  private key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  
  encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  }
  
  decrypt(encryptedText: string): string {
    const parts = encryptedText.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encrypted = parts[2];
    
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}

// Uso: Encriptar documentos de apelaciones
const encryptedDoc = await this.encryption.encrypt(documentBase64);
await this.s3.upload(bucketName, key, encryptedDoc);
```

### Compliance (LATAM)

**Argentina - Ley 25.326 (Protección de Datos Personales)**:
- ✅ Consentimiento explícito para recolección de datos
- ✅ Derecho de acceso, rectificación, supresión (ARCO)
- ✅ Datos sensibles (salud) con mayor protección
- ✅ Transferencias internacionales de datos reguladas

**Implementación**:
```typescript
// Consentimiento explícito en onboarding
await this.consents.create({
  patientId: patient.id,
  type: 'data_processing',
  version: '1.0',
  acceptedAt: new Date(),
  ipAddress: req.ip
});

// Endpoint ARCO (Acceso, Rectificación, Cancelación, Oposición)
@Get('data-request')
async requestPersonalData(@CurrentUser() user: User) {
  const data = await this.dataService.exportUserData(user.id);
  return {
    format: 'JSON',
    data: data,
    generatedAt: new Date()
  };
}

@Delete('data-deletion')
async deletePersonalData(@CurrentUser() user: User) {
  // Anonimizar datos (no eliminar completamente por trazabilidad médica)
  await this.dataService.anonymizeUser(user.id);
}
```

---

## 📈 Escalabilidad

### Estrategia de Escalamiento

**Horizontal Scaling** (Recomendado):
```yaml
# kubernetes/deployment.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: reputation-service
spec:
  replicas: 3  # Inicia con 3 pods
  selector:
    matchLabels:
      app: reputation-service
  template:
    metadata:
      labels:
        app: reputation-service
    spec:
      containers:
      - name: reputation-service
        image: conectasalud/reputation-service:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: url

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: reputation-service-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: reputation-service
  minReplicas: 3
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

### Caching Strategy

```typescript
// redis-cache.service.ts

@Injectable()
export class RedisCacheService {
  constructor(@Inject('REDIS_CLIENT') private redis: Redis) {}
  
  async get<T>(key: string): Promise<T | null> {
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }
  
  async set(key: string, value: any, ttl: number = 300) {
    await this.redis.setex(key, ttl, JSON.stringify(value));
  }
  
  async invalidate(pattern: string) {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }
}

// Uso en reputation.service.ts
async getScore(patientId: string): Promise<ReputationScore> {
  const cacheKey = `reputation:${patientId}`;
  
  // Intenta obtener de cache
  let score = await this.cache.get<ReputationScore>(cacheKey);
  
  if (!score) {
    // Cache miss → Obtener de DB
    score = await this.repository.findByPatientId(patientId);
    
    // Guardar en cache (5 minutos)
    await this.cache.set(cacheKey, score, 300);
  }
  
  return score;
}

// Invalidar cache al actualizar
async updateScore(patientId: string, newScore: number) {
  await this.repository.update(patientId, { score: newScore });
  
  // Invalidar cache
  await this.cache.invalidate(`reputation:${patientId}`);
}
```

### Database Optimization

**Read Replicas** (PostgreSQL):
```typescript
// database.module.ts

@Module({
  providers: [
    {
      provide: 'DATABASE_PRIMARY',
      useFactory: () => createConnection({
        host: process.env.DB_PRIMARY_HOST,
        // ... configuración para writes
      })
    },
    {
      provide: 'DATABASE_REPLICA',
      useFactory: () => createConnection({
        host: process.env.DB_REPLICA_HOST,
        // ... configuración para reads (solo lectura)
      })
    }
  ]
})

// Uso:
// Writes → Primary
await this.primaryDb.query('UPDATE ...');

// Reads → Replica (offload del primary)
await this.replicaDb.query('SELECT ...');
```

**Connection Pooling**:
```typescript
// typeorm.config.ts

export default {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  
  // Connection pool
  poolSize: 20,
  maxQueryExecutionTime: 5000,  // 5 segundos max
  
  // Logging
  logging: process.env.NODE_ENV === 'development',
  
  // Entities
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js']
};
```

---

## 📊 Monitoreo y Observabilidad

### Stack de Monitoreo

**Datadog** (Recomendado) o **New Relic**:

```typescript
// datadog.interceptor.ts

import * as DatadogAPI from 'datadog-api-client';

@Injectable()
export class DatadogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const start = Date.now();
    
    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        
        // Enviar métrica a Datadog
        this.sendMetric('http.request.duration', duration, [
          `route:${request.route.path}`,
          `method:${request.method}`,
          `status:200`
        ]);
      }),
      catchError((error) => {
        const duration = Date.now() - start;
        
        // Log error
        this.sendMetric('http.request.duration', duration, [
          `route:${request.route.path}`,
          `method:${request.method}`,
          `status:${error.status || 500}`,
          `error:true`
        ]);
        
        throw error;
      })
    );
  }
  
  private sendMetric(name: string, value: number, tags: string[]) {
    // Envío a Datadog
    DatadogAPI.metrics.sendMetrics({
      series: [{
        metric: name,
        points: [[Date.now() / 1000, value]],
        type: 'gauge',
        tags: tags
      }]
    });
  }
}
```

### Métricas Clave (KPIs Técnicos)

```yaml
# Métricas de Aplicación

# Latencia de APIs (p50, p95, p99)
http.request.duration:
  - p50 < 100ms
  - p95 < 500ms
  - p99 < 1000ms

# Tasa de errores
http.error.rate:
  - < 1% en endpoints críticos

# Throughput
http.requests.per_second:
  - Meta: >100 RPS por servicio

# Métricas de Negocio

# Tasa de confirmación
appointments.confirmation.rate:
  - Meta: >80%

# Tiempo de respuesta chatbot
chatbot.response.time:
  - < 3 segundos (95% de casos)

# Predicción accuracy
ml.prediction.accuracy:
  - AUC-ROC > 0.75

# Métricas de Infraestructura

# CPU utilization
system.cpu.usage:
  - < 70% en promedio
  - Auto-scale si >80% por 5 min

# Memory utilization
system.memory.usage:
  - < 80%

# Database connections
database.connections:
  - < 80% del pool

# Queue depth
queue.depth:
  - < 1000 mensajes pendientes
```

### Alertas Críticas

```yaml
# PagerDuty / Opsgenie configuration

alerts:
  - name: "API Down"
    condition: "http.success.rate < 95% for 5 minutes"
    severity: "critical"
    notify: ["on-call", "slack-critical"]
  
  - name: "High Error Rate"
    condition: "http.error.rate > 5% for 10 minutes"
    severity: "high"
    notify: ["on-call", "slack-alerts"]
  
  - name: "Database Overload"
    condition: "database.connections > 90% for 3 minutes"
    severity: "high"
    notify: ["on-call", "slack-alerts"]
  
  - name: "Queue Backlog"
    condition: "queue.depth > 5000"
    severity: "medium"
    notify: ["slack-alerts"]
  
  - name: "Low Disk Space"
    condition: "system.disk.usage > 85%"
    severity: "medium"
    notify: ["slack-alerts"]
```

---

## 🔗 Documentos Relacionados

- `sistema_reputacion.md` → Diseño del scoring y gamificación
- `01_investigacion/analisis_problema.md` → Problema que resuelve
- `02_propuesta_valor/propuesta_valor.md` → Propuesta de valor
- `05_mvp/roadmap.md` → Plan de implementación (próximo)

---

**Última actualización**: Noviembre 2025  
**Versión**: 1.0  
**Estado**: ✅ Arquitectura completa - Lista para implementación  
**Próximo paso**: Roadmap de MVP y especificaciones técnicas

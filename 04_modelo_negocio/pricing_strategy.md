# 💰 Estrategia de Pricing - ConectaSalud
**Active Hearing Inc. | Modelo Freemium SaaS B2B Healthtech**

---

## 📋 Índice
1. [Filosofía de Pricing](#filosofía-de-pricing)
2. [Modelo Freemium Detallado](#modelo-freemium-detallado)
3. [Tiers de Pricing](#tiers-de-pricing)
4. [Pricing Psychology](#pricing-psychology)
5. [Análisis de Competencia](#análisis-de-competencia)
6. [Estrategias de Conversión](#estrategias-de-conversión)
7. [Unit Economics](#unit-economics)
8. [ROI para Clientes](#roi-para-clientes)
9. [Pricing Tactics](#pricing-tactics)
10. [Evolución del Pricing](#evolución-del-pricing)

---

## 🎯 Filosofía de Pricing

### Principio Core: **Value-Based Pricing**

> "No cobramos por features. Cobramos por el valor que generamos."

**Valor que generamos**:
- Cliente con 1000 pacientes/mes recupera ~$11,500/mes
- Nosotros cobramos: $650/mes
- **Capturamos**: 5.6% del valor que creamos
- **Cliente retiene**: 94.4% del valor

**Benchmark industria SaaS**: Típicamente se captura 10-20% del valor

**Nuestra decisión**: Empezar conservadores (5-10%) para:
- ✅ Facilitar adopción (precio es "no-brainer")
- ✅ Capturar market share rápido
- ✅ Construir casos de éxito
- ✅ Poder subir precios después (cuando seamos irreemplazables)

---

### Ancla de Valor: El Costo del Ausentismo

**Framework mental para el cliente**:

```
Sistema con 500 pacientes/mes, tasa ausentismo 33%:

SIN ConectaSalud:
├─ 165 consultas programadas
├─ 55 no-shows (33%)
├─ Solo 110 consultas efectivas (67%)
└─ Pérdida: 55 × $50 = $2,750/mes

CON ConectaSalud:
├─ 165 consultas programadas
├─ 15 no-shows (9%)
├─ 150 consultas efectivas (91%)
└─ Valor recuperado: 40 × $50 = $2,000/mes

Costo ConectaSalud Pro: $400/mes
ROI: 400% (5x retorno)
```

**Implicación**: A este nivel de valor, el precio es casi irrelevante

---

### Estrategia de Penetración de Mercado

**Fase 1 (Año 1-2): Land and Expand**
- Pricing agresivo para ganar market share
- Freemium generoso (100 pacientes gratis)
- Foco en adopción, no en maximizar revenue inmediato

**Fase 2 (Año 3+): Value Capture**
- Subir precios gradualmente (10-15%/año)
- Agregar tiers premium
- Monetizar data/analytics

**Justificación**:
- Healthtech es mercado con switching costs altos una vez adoptado
- Mejor tener 100 clientes pagando poco que 10 pagando mucho (network effects de data)
- Early adopters se vuelven referencias (más valioso que revenue inicial)

---

## 🆓 Modelo Freemium Detallado

### ¿Por Qué Freemium?

**Ventajas**:
1. **Reduce fricción de compra**: Probar antes de pagar
2. **Acelera adopción**: Profesionales independientes prueban → recomiendan a sus sistemas
3. **Data flywheel**: Más usuarios free = más data = mejor producto
4. **Viral loop**: Pacientes ven "Powered by ConectaSalud" en WhatsApp
5. **Benchmark para paid tiers**: "Esto gratis es bueno, ¿qué tendré en pago?"

**Desventajas**:
1. ❌ Costo de servir usuarios free (WhatsApp API, GPT-4)
2. ❌ Canibalización (¿algunos pagarían pero se quedan en free?)
3. ❌ Complejidad operativa (dos tipos de clientes)

**Decisión**: Los beneficios superan las desventajas en healthtech

---

### Diseño del Free Tier

#### Límites Estratégicos

**Volumétrico: 100 pacientes activos/mes**

**¿Por qué 100?**
- Profesional independiente promedio: 50-80 pacientes/mes → Cabe en free
- Consultorio pequeño (2-3 médicos): 100-200 pacientes → Necesita pagar
- Sistema de salud: 500+ pacientes → Definitivamente paga

**Cálculo de break-even**:
```
Costo marginal de servir 100 pacientes free:
├─ WhatsApp: 100 × 3 mensajes × $0.007 = $2.10/mes
├─ OpenAI: 100 × 2 interacciones × $0.02 = $4/mes
├─ Overhead cloud: $1/mes
└─ TOTAL: ~$7/mes

Conversión esperada: 15-20% free → paid
Si 100 usuarios free → 15-20 paid
Revenue de conversiones: 15 × $400 = $6,000/mes
Costo de 100 free: 100 × $7 = $700/mes

ROI: 6,000 / 700 = 8.5x
```

**Conclusión**: Free tier es inversión en adquisición, no costo muerto

---

**Funcional: Features limitados**

| Feature | Free | Razón de límite |
|---------|------|-----------------|
| Recordatorios WhatsApp | ✅ Básico | Core value prop, debe estar |
| Confirmación activa | ✅ Simple | Necesario para ver valor |
| Dashboard | ✅ Básico | Ver métricas motiva upgrade |
| Sistema reputación | ❌ | Feature diferenciador → motiva pago |
| Test técnico | ❌ | Valor agregado premium |
| ML predictivo | ❌ | Advanced, solo enterprise |
| Integraciones | 1 plataforma | Más = complejidad → paid |
| Usuarios admin | 2 máximo | Equipos grandes = paid |
| Soporte | Email 48-72hs | Paid tiene <24hs |
| Reportes | Básico mensual | Paid tiene avanzado |

**Filosofía**: Free debe ser útil pero claramente limitado

---

**Temporal: No hay límite de tiempo**

**¿Por qué no trial de 30 días?**
- En healthtech, necesitas 60-90 días para ver resultados reales
- Trial de 30 días crea presión artificial (mala experiencia)
- Free perpetuo permite "self-nurturing" (se convencen solos)

**Pero incluimos "soft nudges"**:
- Al llegar a 80 pacientes: "Te quedan 20 pacientes más en free tier"
- Cuando usan feature bloqueado: "Sistema de reputación es Pro. Prueba 7 días gratis"
- Email mensual: "Has ahorrado $X este mes con free. En Pro ahorrarías $Y"

---

### Conversión Free → Paid: El Journey

#### Trigger 1: Límite volumétrico (60% de conversiones)

**Momento**: Cliente llega a 100 pacientes/mes

**Mensaje in-app**:
```
🎉 ¡Gran noticia! Estás creciendo.

Has alcanzado el límite de 100 pacientes/mes en Free.
Para continuar usando ConectaSalud sin interrupciones,
actualiza a Pro desde solo $0.80/paciente.

Con tu volumen actual (105 pacientes), serían $84/mes.
Y recuperarías ~$2,100/mes en consultas.

[Actualizar a Pro] [Hablar con ventas]
```

**Tasa de conversión esperada**: 60-70%

---

#### Trigger 2: Feature gating (25% de conversiones)

**Momento**: Cliente intenta usar feature bloqueado

**Ejemplo - Sistema de Reputación**:
```
📊 Sistema de Reputación

Esta funcionalidad permite asignar scores a pacientes
según su historial de asistencia y premiar responsabilidad.

Clientes Pro han visto reducción adicional del 8% en ausentismo.

[Prueba Pro 7 días gratis] [Ver comparación tiers]
```

**Tasa de conversión esperada**: 15-20% (de los que clickean)

---

#### Trigger 3: Value demonstration (15% de conversiones)

**Momento**: Cliente usa por 3+ meses, ve resultados

**Email automatizado (mes 4)**:
```
Asunto: ConectaSalud te ahorró $6,300 estos 3 meses

Hola Dr. Pérez,

En los últimos 3 meses con ConectaSalud Free:
✅ 45 consultas recuperadas
✅ $6,300 en valor generado
✅ Ausentismo bajó de 32% a 18%

Imagina con Pro (sistema de reputación + test técnico):
Clientes similares logran <10% ausentismo
= 20 consultas más recuperadas
= $3,000/mes adicionales

Costo Pro: $80/mes (tu volumen)
ROI: 3,650%

[Upgrade a Pro] [Agendar demo]
```

**Tasa de conversión esperada**: 10-15%

---

### Estrategia de "Sticky Free Tier"

**Concepto**: Hacer que free tier sea tan útil que:
1. Profesional lo usa y ve valor
2. Profesional habla de ConectaSalud a su hospital/sistema
3. Hospital nos contacta para implementación enterprise

**Caso de uso**:
```
Dra. González usa ConectaSalud Free en consultorio privado
     ↓
Ve que funciona (reduce sus no-shows de 40% a 15%)
     ↓
Menciona en reunión de equipo en Hospital Italiano
     ↓
Director Médico nos contacta: "Queremos esto para 50 médicos"
     ↓
Deal enterprise: $2,000/mes (50 médicos × 800 pacientes)
```

**Métrica**: "Enterprise deals originados por free tier"  
**Target**: 20% de enterprise deals (año 2)

---

## 💎 Tiers de Pricing

### Resumen Comparativo

| | FREE | PRO | ENTERPRISE |
|---|---|---|---|
| **Precio** | $0 | $0.50-1/pac/mes | Custom ($0.30-0.50) |
| **Pacientes** | 100 | Ilimitado | Ilimitado |
| **Setup fee** | $0 | $500 | $2K-5K |
| **Contrato** | - | Mensual | Anual recomendado |
| **Recordatorios** | ✅ Básico | ✅ Avanzado | ✅ Ultra personalizado |
| **Confirmación** | ✅ Simple | ✅ Activa | ✅ Multi-canal |
| **Dashboard** | ✅ Básico | ✅ Avanzado | ✅ Custom |
| **Reputación** | ❌ | ✅ | ✅ + ML predictivo |
| **Test técnico** | ❌ | ✅ | ✅ + diagnóstico |
| **Gamificación** | ❌ | ✅ Básica | ✅ Completa |
| **Integraciones** | 1 | 3 | Ilimitado + custom |
| **Usuarios admin** | 2 | Ilimitado | Ilimitado |
| **Soporte** | Email 72hs | Email 24hs | Phone/chat 2hs |
| **SLA uptime** | - | 99.5% | 99.9% |
| **CSM dedicado** | ❌ | ❌ | ✅ |
| **Onboarding** | Self-service | Video + docs | Personalizado |
| **API access** | ❌ | ✅ Básico | ✅ Ilimitado |
| **White-label** | ❌ | ❌ | ✅ (+$500/mes) |
| **Reportes** | Mensual | Semanal | Tiempo real |

---

### FREE Tier - Detalle Completo

#### Perfil del usuario ideal
- Profesional independiente (1-2 médicos)
- 30-80 pacientes/mes
- Presupuesto limitado
- Busca probar antes de comprometer

#### Value proposition
*"Prueba ConectaSalud gratis y reduce tu ausentismo sin riesgo"*

#### Lo que incluye
**Recordatorios básicos**:
- 1 recordatorio automático (48hs antes)
- Vía WhatsApp
- Mensaje estándar (no personalizable)

**Confirmación simple**:
- Paciente puede confirmar "Sí/No"
- Sin seguimiento si no responde

**Dashboard básico**:
- Métricas core: tasa ausentismo, confirmaciones
- Actualización diaria (no real-time)
- Sin exportar data

**Integración**:
- Con 1 plataforma de telemedicina
- Setup automático (wizard)

**Soporte**:
- Knowledge base (self-service)
- Email: respuesta en 72hs hábiles
- Sin phone/chat

#### Lo que NO incluye
❌ Sistema de reputación de pacientes  
❌ Test técnico pre-consulta  
❌ Gamificación (badges, puntos)  
❌ Recordatorios múltiples (72hs, 24hs, 2hs)  
❌ Re-asignación automática de turnos  
❌ Analytics predictivos  
❌ Integración con más de 1 plataforma  

#### Costo de servir
```
Por cliente free (100 pacientes):
├─ WhatsApp API: $2.10/mes
├─ OpenAI API: $4/mes
├─ Cloud overhead: $1/mes
└─ TOTAL: $7.10/mes

Costo anual por free user: $85
```

#### Estrategia de monetización
- **Objetivo**: 15-20% conversión free → Pro
- **Timeline**: Conversión promedio en mes 4-6
- **Lifetime value esperado**: $0.15 × $400/mes × 33 meses = $1,980
- **CAC efectivo**: $85/0.15 = $567 (razonable para LTV de $2K)

---

### PRO Tier - Detalle Completo

#### Perfil del usuario ideal
- Consultorio grupal (3-10 médicos)
- Clínica mediana
- Sistema de salud pequeño
- 200-1000 pacientes/mes
- Presupuesto: $200-800/mes disponible

#### Value proposition
*"Reduce ausentismo a <10% con sistema de reputación y test técnico"*

#### Pricing estructura

**Modelo por volumen (descuentos progresivos)**:

```
Banda 1: 100-500 pacientes
Precio: $1.00/paciente/mes

Ejemplo (300 pacientes):
300 × $1.00 = $300/mes

────────────────────────────────────

Banda 2: 501-1000 pacientes
Precio: $0.80/paciente/mes

Ejemplo (750 pacientes):
750 × $0.80 = $600/mes

────────────────────────────────────

Banda 3: 1001-2500 pacientes
Precio: $0.65/paciente/mes

Ejemplo (1500 pacientes):
1500 × $0.65 = $975/mes

────────────────────────────────────

Banda 4: 2501+ pacientes
Precio: $0.50/paciente/mes

Ejemplo (3000 pacientes):
3000 × $0.50 = $1,500/mes
```

**Setup fee**: $500 one-time
- Incluye: Integración técnica + training básico
- Waiver: Si contratan anual adelantado

**Facturación**: 
- Mensual (a mes vencido)
- Basada en pacientes activos del mes anterior
- Ejemplo: Si en Enero tuvieron 450 pacientes activos → Factura Feb 1: $450

#### Lo que incluye

**Todo de Free, más**:

**Sistema de reputación completo**:
- Score 0-100 por paciente
- 5 niveles (Excelente, Muy Bueno, Bueno, Regular, Bajo)
- Badges y logros
- Beneficios por buen comportamiento
- Dashboard de pacientes de alto riesgo

**Test técnico pre-consulta**:
- Validación de internet, cámara, micrófono
- Diagnóstico automático de problemas
- Tutorial personalizado según dispositivo
- Reporte de pacientes con problemas técnicos

**Recordatorios avanzados**:
- Múltiples recordatorios (72hs, 48hs, 24hs)
- Mensajes personalizables
- Seguimiento de no-responders
- Recordatorio post-consulta (feedback)

**Gamificación básica**:
- Sistema de puntos
- 5 badges principales
- Rachas de asistencia
- Créditos de bienestar

**Dashboard avanzado**:
- Actualización en tiempo real
- Métricas avanzadas (predicción de no-shows)
- Exportar a CSV/Excel
- Comparación mes a mes
- Filtros por médico, especialidad, horario

**Integraciones**:
- Hasta 3 plataformas simultáneas
- Setup asistido
- Webhooks para sincronización

**Soporte mejorado**:
- Email: respuesta <24hs
- Chat en horario laboral (9am-6pm)
- Knowledge base premium

**Reportes**:
- Reporte semanal automatizado (email)
- Business review mensual (PDF)

#### Estrategia de monetización

**ARPU objetivo**: $400-600/mes

**Gross margin**:
```
Revenue promedio: $500/mes
Costo de servir: $85/mes
Gross profit: $415/mes
Margin: 83%
```

**Customer lifetime**:
- Churn esperado: 3-4%/mes
- Vida promedio: 25-33 meses
- LTV: $500 × 83% × 29 meses = $12,035

**Payback period**:
- CAC (blended): $750
- Payback: $750 / ($500 × 83%) = 1.8 meses

---

### ENTERPRISE Tier - Detalle Completo

#### Perfil del usuario ideal
- Obras sociales grandes
- Hospitales (públicos o privados)
- Sistemas de salud con 1000+ pacientes/mes
- Presupuesto: $2K-10K/mes disponible
- Necesitan: Compliance, SLA, soporte dedicado

#### Value proposition
*"Solución enterprise-grade con ML predictivo, CSM dedicado y SLA 99.9%"*

#### Pricing estructura

**Modelo híbrido**: Base fee + por uso

**Opción A: Solo por uso (recomendado para 1K-5K pacientes)**
```
Precio por volumen:
1,000-5,000 pacientes: $0.40/paciente/mes
5,001-10,000 pacientes: $0.35/paciente/mes
10,001+ pacientes: $0.30/paciente/mes

Ejemplo (5,000 pacientes):
5,000 × $0.40 = $2,000/mes
```

**Opción B: Base + por uso (para +10K pacientes)**
```
Base fee: $1,000/mes (incluye CSM dedicado)
+ Por uso: $0.20/paciente/mes

Ejemplo (15,000 pacientes):
$1,000 + (15,000 × $0.20) = $4,000/mes
```

**Setup fee**: $2,000-5,000
- Integración técnica compleja
- Migración de data
- Training in-situ
- Custom configuration

**Facturación**:
- Mensual o anual
- **Descuento anual**: 2 meses gratis (17% off)
- Ejemplo anual: $2,000/mes × 10 meses = $20,000 prepago

#### Lo que incluye

**Todo de Pro, más**:

**ML Predictivo**:
- Predicción de no-show con 80%+ accuracy
- Identificación de pacientes de alto riesgo
- Re-asignación inteligente de turnos
- Sugerencias automáticas de horarios óptimos

**CSM Dedicado**:
- Customer Success Manager asignado
- Calls mensuales de revisión
- Respuesta prioritaria (<2hs)
- Estrategia de optimización continua

**Soporte Premium**:
- Phone + chat 24/7
- SLA: Respuesta crítica <30min
- Escalation directo a engineering
- Dedicated Slack channel

**SLA de uptime**:
- 99.9% uptime garantizado
- Credits si no se cumple
- Status page dedicado
- Notificaciones proactivas

**Integraciones ilimitadas**:
- Cualquier plataforma de telemedicina
- APIs custom según necesidad
- Webhooks bidireccionales
- SSO (Single Sign-On) con su sistema

**White-label** (opcional +$500/mes):
- Branding customizado
- URL propia (su dominio)
- Emails con su logo
- Sin mención de ConectaSalud

**Features enterprise**:
- Multi-sede (hospitales con múltiples ubicaciones)
- Roles y permisos granulares
- Audit logs completos
- Data warehouse integration
- SAML authentication
- Compliance reports (HIPAA-style)

**Onboarding personalizado**:
- Kickoff presencial (si están en BA)
- Training in-situ para staff
- Documentation custom
- Change management support

**Reportes avanzados**:
- Dashboard en tiempo real
- Reportes custom on-demand
- Business reviews trimestrales
- Benchmarking vs industria

#### Add-ons opcionales

| Feature | Precio adicional |
|---------|------------------|
| White-label | +$500/mes |
| Custom ML model (entrenado con su data) | +$1,000/mes |
| Extra CSM (más than 1) | +$2,000/mes |
| Integration adicional (compleja) | $5K-10K one-time |
| Custom feature development | $20K-50K (según scope) |

#### Estrategia de monetización

**ARPU objetivo**: $2,000-5,000/mes

**Gross margin**:
```
Revenue promedio: $3,000/mes
Costo de servir: $500/mes (incluye CSM)
Gross profit: $2,500/mes
Margin: 83%
```

**Customer lifetime**:
- Churn esperado: 1-2%/mes (muy bajo)
- Vida promedio: 50-100 meses
- LTV: $3,000 × 83% × 75 meses = $186,750

**Payback period**:
- CAC (enterprise): $5,000-10,000
- Payback: $7,500 / ($3,000 × 83%) = 3 meses

---

## 🧠 Pricing Psychology

### Anclas Estratégicas

#### Ancla 1: El "Decoy" Tier

**Concepto**: Tier intermedio que hace que otro tier se vea mejor

**Ejemplo**:
```
❌ Sin decoy:
├─ Free: $0
└─ Pro: $500/mes
    (Salto muy grande, genera fricción)

✅ Con decoy:
├─ Free: $0
├─ Starter: $200/mes (decoy - nadie lo compra)
└─ Pro: $500/mes (ahora se ve razonable)
```

**Nuestra implementación**:
No necesitamos decoy explícito porque tenemos pricing por volumen que actúa natural como ancla:
- 100 pacientes × $1 = $100/mes (parece poco)
- 500 pacientes × $0.80 = $400/mes (razonable comparado con 100)

---

#### Ancla 2: Presentación del ROI

**Malo**:
> "Pro cuesta $500/mes"

**Bueno**:
> "Pro cuesta $500/mes y genera $5,000/mes en valor"

**Excelente**:
> "Con Pro recuperas 40 consultas/mes = $2,000 adicionales
> Costo: $500/mes
> Ganancia neta: $1,500/mes
> Es como ganar un médico extra sin contratarlo"

---

### Framing del Precio

#### Frame 1: Por paciente, no bulk

**Malo**: 
> "Pro cuesta $400/mes"

**Bueno**:
> "Pro cuesta menos de $1 por paciente"

**Psicología**: $1 por paciente suena trivial vs $400 bulk

---

#### Frame 2: Comparación con alternativas

**Setup**:
> "¿Cuánto cuesta NO tener ConectaSalud?"

**Respuesta**:
> "Sistema con 500 pacientes pierde $2,750/mes en no-shows
> ConectaSalud cuesta $400/mes
> No tenerlo te cuesta 7x más"

---

#### Frame 3: Por consulta recuperada

**Cálculo**:
```
Cliente con 500 pacientes, recupera 40 consultas/mes
Costo: $400/mes
Por consulta: $400 / 40 = $10/consulta

Valor consulta: $50
ROI por consulta: 5x
```

**Presentación**:
> "Pagas $10 por recuperar una consulta de $50.
> ¿Harías esa inversión 40 veces/mes?
> Por supuesto."

---

### Descuentos Estratégicos

#### Descuento 1: Pago anual

**Oferta**: 2 meses gratis (17% descuento)

**Pricing**:
```
Mensual: $500/mes × 12 = $6,000/año
Anual: $500/mes × 10 = $5,000/año (ahorro $1,000)
```

**Justificación**:
- Mejora cash flow (recibimos $5K upfront)
- Reduce churn (committed por 1 año)
- LTV aumenta 15-20%

**Condiciones**:
- No reembolsable si cancelan antes
- Excepciones por fuerza mayor

---

#### Descuento 2: Volumen

**Estructura**:
```
<500 pacientes: $1.00/paciente
501-1000: $0.80/paciente (20% off)
1001-2500: $0.65/paciente (35% off)
2501+: $0.50/paciente (50% off)
```

**Psicología**:
- Incentiva crecimiento ("Si llego a 501 ahorro 20%")
- Clientes grandes pagan menos por unidad pero más en total
- Natural en SaaS (costo marginal baja con escala)

---

#### Descuento 3: Nonprofit/Gobierno

**Oferta**: 25% descuento

**Condiciones**:
- Validación de status (CUIT, documentación)
- Mismo producto, solo descuento en precio
- No acumulable con otros descuentos

**Justificación**:
- Impacto social (más personas atendidas)
- Casos de estudio valiosos
- Marketing (prensa, reputación)

---

#### Descuento 4: Referral

**Oferta**: 1 mes gratis por cada referido que se vuelve cliente

**Mecánica**:
```
Dr. Pérez (cliente) refiere a Dra. González
→ Dra. González se suscribe a Pro ($400/mes)
→ Dr. Pérez recibe $400 de crédito (= 1 mes gratis)
```

**Cap**: Máximo 3 meses gratis/año

**Justificación**:
- CAC de referral: $400 (vs $750 cold acquisition)
- Referidos convierten 2-3x mejor (warm lead)
- Crea virality loop

---

### Pricing Experiments (A/B Tests)

#### Experimento 1: $0.80 vs $1.00 para banda 501-1000

**Hipótesis**: $0.80 aumenta conversión sin sacrificar mucho revenue

**Setup**:
- Grupo A: 501-1000 pacientes = $1.00/paciente
- Grupo B: 501-1000 pacientes = $0.80/paciente

**Métricas**:
- Conversion rate
- ARPU
- Revenue total

**Resultado esperado**: Conversión +20%, revenue -10% (net positivo)

---

#### Experimento 2: Setup fee $500 vs $0 (waived)

**Hipótesis**: Eliminar setup fee aumenta conversión >5%

**Setup**:
- Grupo A: Setup $500 + $500/mes
- Grupo B: Setup $0 + $550/mes (precio aumentado para compensar)

**Métricas**:
- Conversion rate
- Perceived value
- LTV

**Resultado esperado**: Setup $0 convierte 10% mejor, LTV similar

---

## 🥊 Análisis de Competencia

### Competidores y su Pricing

#### Plataformas de Telemedicina (Competencia Indirecta)

**Doctoralia**:
- Modelo: % de cada consulta (15-20%)
- Ejemplo: Consulta $50 → Doctoralia cobra $7.50-10
- Annual cost (500 consultas): $3,750-5,000/año

**Zoom for Healthcare**:
- Modelo: Per host (médico)
- Precio: $20-30/mes por médico
- Annual cost (10 médicos): $2,400-3,600/año

**Doxy.me**:
- Modelo: Freemium + Pro
- Free: Features básicos
- Pro: $35/mes por médico
- Annual cost (10 médicos): $4,200/año

---

#### Sistemas de Recordatorios (Competencia Directa)

**Twilio/SMS tradicional**:
- Modelo: Por mensaje
- Precio: $0.015/SMS
- Costo (500 pacientes, 3 SMS cada uno): $22.50/mes
- **Problema**: No tiene IA, no confirmación activa, no reputación

**Email marketing tools (Mailchimp, SendGrid)**:
- Modelo: Por contactos
- Precio: $50-100/mes (hasta 5000 contactos)
- **Problema**: Tasa de apertura <20% (vs 98% WhatsApp)

---

#### Nuestro Positioning vs Competencia

**vs Doctoralia** (Plataforma full):
```
ConectaSalud:
✅ Precio: 7x más barato ($500/mes vs $3,750)
✅ No competimos (nos integramos)
✅ Enfoque en comportamiento (no solo tech)
❌ No hacemos videollamadas

Cuándo elegirnos:
"Ya tengo plataforma, solo necesito reducir ausentismo"
```

**vs Twilio/SMS**:
```
ConectaSalud:
❌ Precio: 20x más caro ($500 vs $22.50)
✅ Tasa efectividad: 4x mejor (IA + WhatsApp)
✅ Confirmación activa
✅ Sistema de reputación
✅ Analytics

Cuándo elegirnos:
"Quiero resultados, no solo enviar mensajes"
```

---

### Value Proposition Comparativa

| Solución | Costo/mes (500 pac) | Reducción ausentismo | ROI |
|----------|---------------------|----------------------|-----|
| **Hacer nada** | $0 | 0% | -$2,750 (pérdida) |
| **SMS manual** | $23 | ~5% | -$2,300 (pérdida) |
| **Email automation** | $75 | ~8% | -$1,500 (pérdida) |
| **ConectaSalud** | $400 | 23% | +$1,600 (ganancia) |
| **Doctoralia full** | $3,750 | 23% | -$1,750 (pérdida) |

**Conclusión**: Somos el sweet spot precio/valor

---

## 🔄 Estrategias de Conversión

### Free → Pro: Playbook Completo

#### Semana 1-4: Onboarding y activación

**Objetivo**: Que usen el producto y vean valor rápido

**Acciones**:
- Email 1 (día 1): "Bienvenido a ConectaSalud"
- Email 2 (día 3): "Completa tu perfil en 5 minutos"
- Email 3 (día 7): "Tu primer reporte: Ausentismo esta semana"
- In-app tooltip: Destacar features de free tier

**Métrica de éxito**: >60% tienen al menos 1 consulta con recordatorio enviado

---

#### Semana 5-8: Demostración de valor

**Objetivo**: Que vean impacto medible

**Acciones**:
- Email (semana 6): "Tu ausentismo bajó X%. Esto significa $Y recuperados"
- In-app banner: "Has recuperado 12 consultas (= $600) este mes"
- Push notification: "Paciente Juan confirmó. ¡Van 20 confirmaciones!"

**Métrica de éxito**: >70% ven reducción de ausentismo >5%

---

#### Semana 9-12: Education sobre Pro features

**Objetivo**: Crear deseo por features bloqueados

**Acciones**:
- Email: "Caso de éxito: Dr. López redujo ausentismo a 7% con sistema de reputación"
- In-app: "Pacientes de alto riesgo identificados (Pro feature)"
- Webinar: "Cómo clientes Pro logran <10% ausentismo"

**Métrica de éxito**: >40% clickean en features Pro

---

#### Semana 13-16: Nudge a conversión

**Objetivo**: Empujar a decisión

**Acciones**:
- Email: "Tu prueba gratis de Pro por 7 días" (limited offer)
- Call from sales (si +80 pacientes): Conversación personalizada
- In-app: "Estás a 15 pacientes de límite free. Actualiza ahora"

**Métrica de éxito**: 15-20% convierten

---

#### Mes 5+: Win-back campaigns

**Objetivo**: Recuperar a los que no convirtieron

**Acciones**:
- Email (mes 5): "50% off primer mes de Pro" (discount urgency)
- Email (mes 8): "Seguís ahorrando $X/mes en free. En Pro ahorrarías $2X"
- Email (mes 12): "Aniversario: Prueba Pro 30 días gratis"

**Métrica de éxito**: 5-8% convierten tardíamente

---

### Pro → Enterprise: Playbook

#### Trigger 1: Crecimiento orgánico

**Momento**: Cliente Pro llega a 5,000 pacientes/mes

**Costo actual (Pro)**: 5,000 × $0.50 = $2,500/mes

**Propuesta Enterprise**:
```
Email from CSM:
"Hola María,

Veo que están creciendo muchísimo (5K pacientes!). 
Felicitaciones 🎉

Con este volumen, calificás para Enterprise:
• Mismo precio por paciente ($0.40-0.50)
• ML predictivo (identifica no-shows antes)
• CSM dedicado (yo, disponible 24/7)
• SLA 99.9%

¿Agendamos 15 min para explicarte los beneficios?
"
```

**Tasa de conversión**: 50-60% (makes sense)

---

#### Trigger 2: Feature request

**Momento**: Cliente Pro pide feature que solo existe en Enterprise

**Ejemplo**: "¿Pueden integrar con nuestro sistema de EMR?"

**Respuesta**:
```
"Claro! Esa integración está disponible en Enterprise.
Además de la integración custom, tendrías:
• [Lista de beneficios Enterprise]

Con tu volumen (2,000 pacientes), Enterprise sería
$800-1,000/mes vs tu Pro actual de $1,300.

Hasta ahorrarías + tendrías mejores features.
¿Hablamos?"
```

**Tasa de conversión**: 70%+ (value is obvious)

---

#### Trigger 3: Multi-sede

**Momento**: Cliente Pro quiere usar en más de 1 ubicación

**Ejemplo**: "Tenemos 3 clínicas. ¿Podemos usar ConectaSalud en las 3?"

**Respuesta**:
```
"Sí! Para multi-sede necesitamos Enterprise porque:
• Gestión centralizada
• Reportes consolidados + por sede
• Configuración diferente por sede

Además tendrías CSM dedicado que coordina 
implementación en las 3 sedes al mismo tiempo.

Precio sería [calculate] vs tener 3 cuentas Pro
donde pagarían [calculate].
"
```

**Tasa de conversión**: 80%+ (única opción viable)

---

## 📊 Unit Economics

### Definiciones y Benchmarks

#### CAC (Customer Acquisition Cost)

**Definición**: Costo total de adquirir 1 cliente pagador

**Cálculo**:
```
CAC = (Sales + Marketing expenses) / # nuevos clientes

Ejemplo (mes 6):
Sales salaries: $3,000
Marketing spend: $2,000
Nuevos clientes: 8
CAC = $5,000 / 8 = $625/cliente
```

**Desglose por canal**:
```
Direct sales: $800/cliente
Partnerships: $400/cliente
Inbound (organic): $200/cliente
Referrals: $100/cliente

Blended CAC: $625
```

**Benchmark SaaS B2B**: $500-1,500 (estamos bien)

---

#### LTV (Lifetime Value)

**Definición**: Revenue total que generará un cliente durante su vida

**Cálculo simple**:
```
LTV = ARPU × Gross Margin × Lifetime (meses)

Cliente Pro promedio:
ARPU: $500/mes
Gross Margin: 83%
Churn rate: 3%/mes → Lifetime: 33 meses

LTV = $500 × 83% × 33 = $13,695
```

**Cálculo avanzado (con expansion revenue)**:
```
LTV = ARPU × Gross Margin × Lifetime × (1 + Expansion rate)

Expansion rate: 15%/año (upsells, más pacientes)

LTV = $500 × 83% × 33 × 1.45 = $19,858
```

**Benchmark SaaS B2B**: LTV debe ser >3x CAC

**Nuestro ratio**:
```
LTV / CAC = $13,695 / $625 = 21.9x

(Excelente! >>3x)
```

---

#### Payback Period

**Definición**: Tiempo en recuperar el CAC

**Cálculo**:
```
Payback = CAC / (ARPU × Gross Margin)

Cliente Pro:
Payback = $625 / ($500 × 83%)
Payback = 1.5 meses
```

**Benchmark SaaS**: <12 meses es excelente

---

#### Gross Margin

**Definición**: % del revenue que queda después de costos variables

**Cálculo**:
```
Gross Margin = (Revenue - COGS) / Revenue × 100

Cliente Pro ($500/mes revenue):
COGS: $85/mes (WhatsApp, OpenAI, cloud, soporte)
Gross Margin = ($500 - $85) / $500 = 83%
```

**Benchmark SaaS**: >70% es excelente

---

#### MRR (Monthly Recurring Revenue)

**Definición**: Revenue predecible mensual

**Cálculo**:
```
MRR = Σ (clientes × ARPU)

Ejemplo (mes 12):
50 clientes Pro × $500 = $25,000 MRR
```

**Métricas derivadas**:
- **New MRR**: MRR de clientes nuevos
- **Expansion MRR**: MRR adicional de upsells
- **Churned MRR**: MRR perdido por cancelaciones
- **Net New MRR**: New + Expansion - Churned

---

#### Churn Rate

**Definición**: % de clientes que cancelan cada mes

**Cálculo**:
```
Churn Rate = Clientes cancelados / Total clientes inicio mes

Ejemplo:
Inicio mes: 100 clientes
Cancelaciones: 3
Churn = 3/100 = 3%
```

**Target**:
- Año 1: <5%/mes (aceptable, finding PMF)
- Año 2: <3%/mes (bueno)
- Año 3+: <2%/mes (excelente)

**Revenue churn** (más importante):
```
Revenue Churn = MRR perdido / MRR inicio mes

Si los 3 que cancelaron eran clientes pequeños:
MRR perdido: $600
MRR inicio: $50,000
Revenue churn: 1.2% (mejor que 3% customer churn)
```

---

### Sensibilidad de Variables

#### ¿Qué pasa si aumentamos precio 10%?

**Escenario base**:
- ARPU: $500/mes
- Conversión: 20%
- Churn: 3%/mes

**Escenario +10% precio**:
- ARPU: $550/mes (+10%)
- Conversión: 18% (-10% por elasticidad)
- Churn: 3.3% (+0.3% por precio más alto)

**Impacto en LTV**:
```
Base: $500 × 83% × 33 = $13,695
+10%: $550 × 83% × 30.3 = $13,833

Net: +1% LTV (casi neutral, pero menos clientes)
```

**Recomendación**: Probar incremento gradual (5% cada año)

---

#### ¿Qué pasa si mejoramos conversión free→paid?

**Escenario base**: 15% conversión

**Escenario mejorado**: 20% conversión (+33%)

**Impacto**:
```
Base:
100 free users → 15 paid → LTV $13,695 cada
Total value: $205,425

Mejorado:
100 free users → 20 paid → LTV $13,695 cada
Total value: $273,900

Net: +33% value from same free cohort
```

**Recomendación**: Invertir en mejorar onboarding (max ROI)

---

## 💵 ROI para Clientes

### Calculadora de ROI

**Input del cliente**:
1. # médicos
2. # teleconsultas/mes
3. Tasa ausentismo actual
4. Costo promedio consulta

**Output**:
```
Sistema con:
├─ 10 médicos
├─ 500 consultas/mes
├─ 33% ausentismo actual
└─ $50/consulta

Situación actual:
├─ 165 no-shows/mes
└─ Pérdida: $8,250/mes

Con ConectaSalud (ausentismo → 10%):
├─ 50 no-shows/mes
├─ 115 consultas recuperadas
└─ Valor recuperado: $5,750/mes

Costo ConectaSalud Pro: $400/mes

ROI Mensual: $5,350
ROI %: 1,338%
Payback: 5 días
```

---

### Caso de Éxito: Hospital Italiano (ejemplo)

**Situación pre-ConectaSalud**:
- 30 médicos
- 1,200 teleconsultas/mes
- Ausentismo: 35%
- Costo consulta: $60

**Pérdida mensual**:
```
1,200 × 35% = 420 no-shows
420 × $60 = $25,200/mes perdidos
```

**Post-implementación** (90 días):
- Ausentismo: 9%
- No-shows: 108
- Consultas recuperadas: 312

**Valor generado**:
```
312 × $60 = $18,720/mes
```

**Costo ConectaSalud**:
```
1,200 pacientes × $0.65 = $780/mes
Setup fee: $3,000 (one-time)
```

**ROI**:
```
Mes 1: ($18,720 - $3,780) = $14,940
Mes 2-12: ($18,720 - $780) × 11 = $197,340

Total año 1: $212,280 value
Costo año 1: $12,360
ROI: 1,617%
```

---

## 🎯 Pricing Tactics

### Tactic 1: "Try before you buy" (Risk reversal)

**Oferta**: Prueba 60 días, si no reduces ausentismo >15%, te devolvemos 100%

**Psicología**: Elimina el riesgo percibido

**Fine print**:
- Requieren usar el producto activamente (no solo sign up)
- Medimos ausentismo pre y post
- Si no cumplen condiciones (ej: nunca integraron), no aplica

**Costo**: <5% piden refund (mayoría ve resultados)

---

### Tactic 2: "Founder's pricing" (Early adopter incentive)

**Oferta**: Primeros 100 clientes pagan 50% menos por siempre

**Ejemplo**:
```
Precio normal: $500/mes
Founder's price: $250/mes (locked in forever)
```

**Psicología**:
- Urgency (solo primeros 100)
- Exclusivity (sos parte de grupo elite)
- Loyalty (precio especial = grateful customer)

**Costo**:
```
100 clientes × $250 forgone/mes = $25K/mes forgone

Pero:
- Esos clientes ayudan a PMF (feedback)
- Son evangelistas (referrals)
- Data para ML (value)

LTV real: Mayor que clientes full-price
```

---

### Tactic 3: "Expansion revenue" (Land and expand)

**Estrategia**: Vender barato inicial, expandir después

**Ejemplo**:
```
Año 1: Cliente paga $400/mes (Pro)
Año 2: Upsell a Enterprise ($1,500/mes)
Año 3: Add white-label (+$500/mes)
Año 4: Add segunda sede (+$1,000/mes)

Total revenue lifetime: $3,400/mes promedio
```

**Cálculo**:
```
Sin expansion: $400/mes × 33 meses = $13,200 LTV
Con expansion: $3,400/mes × 33 meses = $112,200 LTV

8.5x más value de mismo cliente inicial
```

---

### Tactic 4: "Usage-based incentives"

**Concepto**: Premio por uso alto

**Ejemplo**:
```
Si reduces ausentismo >25% en Q1:
→ Crédito de $500 (= 1 mes gratis)
```

**Psicología**:
- Alinea incentivos (ganamos cuando ellos ganan)
- Motiva uso activo del producto
- Crea goodwill

**Costo**: Solo pagamos si generamos valor alto

---

## 🔮 Evolución del Pricing

### Año 1: Penetración

**Objetivo**: Capturar market share

**Estrategia**:
- Freemium generoso
- Pro pricing agresivo ($0.80-1/paciente)
- Founder's pricing
- Muchos descuentos/promos

**Trade-off**: Revenue vs adopción (elegimos adopción)

---

### Año 2: Optimización

**Objetivo**: Mejorar unit economics

**Estrategia**:
- Aumentar precio Pro 10-15% ($0.90-1.15/paciente)
- Introducir tier "Starter" entre Free y Pro
- Reducir descuentos (solo para casos específicos)
- Enfocar en expansion revenue (upsells)

**Justificación**:
- Ya tenemos social proof (casos de éxito)
- Producto está probado (menos riesgo para cliente)
- Competencia aún no nos alcanzó

---

### Año 3+: Value maximization

**Objetivo**: Capturar más del valor que generamos

**Estrategia**:
- Pricing dinámico (basado en resultados)
- Revenue share model (cobramos % del valor recuperado)
- Enterprise focus (clientes grandes pagan más)
- Premium tiers (features de lujo para dispuestos a pagar)

**Ejemplo de revenue share**:
```
Modelo híbrido:
Base: $200/mes (bajo)
+ 10% del valor recuperado

Cliente que recupera $10K/mes:
Paga: $200 + $1,000 = $1,200/mes

Cliente que recupera $3K/mes:
Paga: $200 + $300 = $500/mes

(Ganan más = pagamos más = alineación perfecta)
```

---

## 📈 Métricas de Pricing Success

### KPIs Primarios

**1. Conversion Rate (Free → Paid)**
- Target: 15-20%
- Actual: Monitor mensual
- Benchmark SaaS freemium: 2-5% (estamos aspirando a 3-4x)

**2. ARPU (Average Revenue Per User)**
- Target Año 1: $400-500/mes
- Target Año 3: $800-1,000/mes (expansion)

**3. LTV:CAC Ratio**
- Target: >5x
- Healthy: >3x
- Danger: <2x

**4. Payback Period**
- Target: <6 meses
- Excellent: <3 meses

**5. Gross Margin**
- Target: >75%
- Excellent: >80%

---

### KPIs Secundarios

**6. % Revenue from Enterprise**
- Year 1: 20%
- Year 3: 50% (shift to enterprise)

**7. % Revenue from Expansion**
- Year 1: 5%
- Year 3: 30% (upsells, cross-sells)

**8. Annual vs Monthly contracts**
- Target: 40% annual (better retention)

**9. Discount rate**
- Avg discount given: <15%

**10. Price realization**
- (Actual revenue / List price): >85%

---

## 🎓 Lessons from SaaS Leaders

### Lesson 1: Slack - "Land with team, expand to enterprise"

**Tactic**: Free for small teams, paid for whole company

**Aplicación ConectaSalud**:
- Dr. individual usa free
- Recomienda a su sistema
- Sistema compra enterprise

---

### Lesson 2: Zoom - "Freemium that's actually useful"

**Tactic**: Free tier tan bueno que creates switching cost

**Aplicación ConectaSalud**:
- Free debe reducir ausentismo 10-15%
- Suficiente para ver valor
- Pero Pro reduce 23% (clear incentive)

---

### Lesson 3: HubSpot - "Premium content for lead gen"

**Tactic**: Free tools + content → Leads → Upsell to paid

**Aplicación ConectaSalud**:
- Free ROI calculator
- Free "Guía para reducir ausentismo"
- Free webinars
- → Leads que convertimos a paid

---

### Lesson 4: Atlassian - "Low-touch sales at scale"

**Tactic**: Self-service for SMB, high-touch for enterprise

**Aplicación ConectaSalud**:
- Free + Pro: Self-service (no sales calls)
- Enterprise: High-touch (AE, CSM, demos)

---

## 📚 Conclusión

### Resumen Ejecutivo

**Pricing strategy**:
- ✅ Freemium generoso para capturar market
- ✅ Pro pricing value-based ($0.50-1/paciente)
- ✅ Enterprise custom (high-touch)
- ✅ Gross margins excelentes (80%+)
- ✅ LTV:CAC ratio >10x (saludable)

**Key tactics**:
- Land and expand
- Usage-based pricing (scales with value)
- Founder's pricing (early adopters)
- Annual discounts (improve retention)

**Evolution**:
- Year 1: Penetration (grab market share)
- Year 2: Optimization (improve unit econ)
- Year 3: Maximization (capture more value)

---

### Próximos Pasos

1. **Validar pricing con 10 clientes piloto**
   - ¿Pagan el precio propuesto?
   - ¿Dónde está el valor percibido?
   - ¿Qué features valoran más?

2. **Implementar pricing experiments**
   - A/B test: $0.80 vs $1.00
   - A/B test: Setup fee vs no setup fee

3. **Construir ROI calculator**
   - Landing page con calculator interactivo
   - Lead magnet para ventas

4. **Monitorear métricas**
   - Dashboard con KPIs en tiempo real
   - Alertas si métricas salen de rango

---

**Última actualización**: Noviembre 2025  
**Versión**: 1.0  
**Estado**: ✅ Estrategia definida - Lista para implementación  
**Próximo documento**: Financial Projections (financial_projections.md)

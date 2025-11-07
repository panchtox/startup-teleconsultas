# 📊 METRICS & KPIs - ConectaSalud
**Active Hearing Inc. | B2B SaaS Healthtech | Measurement Framework**

---

## 📋 Tabla de Contenidos

1. [Overview del Framework de Métricas](#overview-del-framework-de-métricas)
2. [North Star Metric](#north-star-metric)
3. [Sales & Revenue Metrics](#sales--revenue-metrics)
4. [Marketing Metrics](#marketing-metrics)
5. [Product & Engagement Metrics](#product--engagement-metrics)
6. [Customer Success Metrics](#customer-success-metrics)
7. [Financial Health Metrics](#financial-health-metrics)
8. [Dashboard & Reporting](#dashboard--reporting)

---

## 🎯 Overview del Framework de Métricas

### Filosofía de Measurement

**Principios Clave:**
1. **Focus over Breadth:** 5-7 métricas clave vs 50 vanity metrics
2. **Leading over Lagging:** Métricas predictivas vs retrospectivas
3. **Actionable over Informational:** Métricas que impulsan decisiones
4. **Cohort-based:** Segmentar por cohorte (mes, canal, plan) para insights

### Pirámide de Métricas ConectaSalud

```
                  [North Star]
                  Active Paying
                   Customers
                       |
        ┌──────────────┼──────────────┐
        |              |              |
    [Growth]      [Retention]    [Monetization]
    New Logos     Churn Rate         ARPU
        |              |              |
   ┌────┴────┐    ┌────┴────┐   ┌────┴────┐
 Sales  Marketing Product  CS  LTV  CAC  Payback
```

---

## ⭐ North Star Metric

### Métrica Principal: **Active Paying Customers**

**Definición:** Número de clientes que pagan por ConectaSalud (Free tier no cuenta) y están activos (usaron producto en últimos 30 días).

**Por Qué Esta Métrica:**
- ✅ Combina crecimiento (adquisición) + retención (uso activo)
- ✅ Directamente ligada a revenue
- ✅ Fácil de entender para todo el equipo
- ✅ Alinea sales, product, y CS

**Targets Año 1:**

| Trimestre | Target | Crecimiento MoM |
|-----------|--------|-----------------|
| Q1 (Ene-Mar) | 5 → 8 clientes | +20% |
| Q2 (Abr-Jun) | 8 → 20 clientes | +35% |
| Q3 (Jul-Sep) | 20 → 35 clientes | +20% |
| Q4 (Oct-Dic) | 35 → 55 clientes | +16% |

**Total Año 1:** 5 → 55 active paying customers (11x growth)

### Métricas de Soporte (Input Metrics)

Estas métricas "alimentan" el North Star:

**Adquisición:**
- New Logos (clientes nuevos/mes)
- Trial → Paid conversion rate

**Retención:**
- Customer churn rate (mensual)
- Product engagement (% clientes activos)

**Monetización:**
- Expansion MRR (upsells)
- ARPU (Average Revenue Per User)

---

## 💰 Sales & Revenue Metrics

### Revenue Metrics (Top Line)

**1. MRR (Monthly Recurring Revenue)**

**Definición:** Revenue mensual predecible de suscripciones.

**Fórmula:**
```
MRR = Σ (Clientes activos * Plan mensual)

Ejemplo Mes 3:
- 3 clientes en Plan Pro ($300/mes cada uno) = $900
- 2 clientes en Plan Enterprise ($800/mes cada uno) = $1,600
MRR Total = $2,500
```

**Targets:**

| Mes | New MRR | Expansion | Churn | Net New MRR | Total MRR |
|-----|---------|-----------|-------|-------------|-----------|
| Ene | $2K | $0 | $0 | $2K | $2K |
| Feb | $3K | $0 | -$500 | $2.5K | $4.5K |
| Mar | $4K | $500 | -$1K | $3.5K | $8K |
| ... | ... | ... | ... | ... | ... |
| Dic | $15K | $3K | -$2K | $16K | $120K |

**MRR Growth Rate Target:** 30-50% MoM (primeros 6 meses)

---

**2. ARR (Annual Recurring Revenue)**

**Definición:** MRR * 12 (proyección anualizada)

**Target Fin Q4:** $120K ARR → $150K ARR (meta stretch)

---

**3. ACV (Annual Contract Value)**

**Definición:** Valor promedio de contrato anual.

**Fórmula:**
```
ACV = Total bookings cerrados / # de deals

Ejemplo Q2:
10 deals cerrados, total $60K en bookings
ACV = $60K / 10 = $6K
```

**Target ACV:** $5-8K (mix de Pro y Enterprise)

---

### Sales Pipeline Metrics

**4. Pipeline Coverage**

**Definición:** Ratio de pipeline ($) vs quota del período.

**Fórmula:**
```
Pipeline Coverage = Pipeline value / Quota

Ejemplo Q3:
Quota: $50K en new bookings
Pipeline: $180K (weighted)
Coverage = 3.6x ✅

Ideal: 3-5x coverage (accounting for 20-30% win rate)
```

**Target:** Mantener 3-4x coverage en todo momento

---

**5. Win Rate**

**Definición:** % de oportunidades que cierran con éxito.

**Fórmula:**
```
Win Rate = Deals ganados / (Deals ganados + Deals perdidos)

Ejemplo Q2:
Ganados: 8
Perdidos: 12
Win Rate = 8 / (8+12) = 40%
```

**Benchmarks:**
- Q1 (early, experimental): 20-30%
- Q2-Q3 (product-market fit): 30-40%
- Q4 (optimized): 40-50%

**Target Q4:** 40%+

---

**6. Average Sales Cycle**

**Definición:** Días promedio desde "Qualified Lead" hasta "Closed Won".

**Fórmula:**
```
Avg Sales Cycle = Σ (Días para cerrar cada deal) / # deals

Ejemplo:
Deal A: 45 días
Deal B: 60 días
Deal C: 30 días
Avg = (45+60+30) / 3 = 45 días
```

**Targets:**
- Q1: 60-90 días (exploratorio, lento)
- Q2-Q3: 45-60 días (proceso definido)
- Q4: 30-45 días (optimizado, freemium acelera)

---

**7. SQL → Demo → Trial → Close Conversion Funnel**

```
100 SQLs (Sales Qualified Leads)
 ↓ (60% book demo)
60 Demos
 ↓ (50% start trial)
30 Trials
 ↓ (40% convert to paid)
12 Closed Deals

Overall Conversion: 12% (SQL → Close)
```

**Targets por Stage:**
- SQL → Demo: 60% (Q1), 70% (Q4)
- Demo → Trial: 50% (Q1), 60% (Q4)
- Trial → Paid: 30% (Q1), 45% (Q4)

**Overall SQL → Close:** 9% (Q1) → 19% (Q4)

---

### Revenue Efficiency Metrics

**8. CAC (Customer Acquisition Cost)**

**Definición:** Costo total de adquirir un cliente pagador.

**Fórmula:**
```
CAC = (Sales + Marketing Costs) / # New Customers

Ejemplo Q2:
Sales costs: $25K (salaries, tools)
Marketing costs: $10K (ads, content, events)
New customers: 10
CAC = ($25K + $10K) / 10 = $3.5K
```

**Targets:**
- Q1: $5-6K (experimental, ineficiente)
- Q2: $4-5K (learning)
- Q3-Q4: $3-4K (optimizado)

**CAC by Channel:**
- Direct sales: $4-6K
- Partnerships: $2-3K
- Inbound/PLG: $1-2K

---

**9. CAC Payback Period**

**Definición:** Meses para recuperar CAC con MRR del cliente.

**Fórmula:**
```
CAC Payback = CAC / (ARPU * Gross Margin)

Ejemplo:
CAC = $4K
ARPU = $500/mes
Gross Margin = 80%
Payback = $4K / ($500 * 0.8) = 10 meses
```

**Benchmarks SaaS:**
- <12 meses: Excelente
- 12-18 meses: Bueno
- >18 meses: Preocupante

**Target ConectaSalud:** <12 meses en Q3+

---

**10. LTV (Lifetime Value)**

**Definición:** Revenue total esperado de un cliente durante su vida.

**Fórmula (Simplificada):**
```
LTV = ARPU * Gross Margin * (1 / Churn Rate)

Ejemplo:
ARPU = $500/mes
Gross Margin = 80%
Churn Rate Mensual = 3% (0.03)
LTV = $500 * 0.8 * (1 / 0.03) = $13,333
```

**LTV/CAC Ratio:**
```
LTV/CAC = $13,333 / $4,000 = 3.3x

Benchmarks:
- <1x: Insostenible
- 1-3x: Precario
- 3-5x: Saludable ✅
- >5x: Excelente (tal vez podés invertir más en growth)
```

**Target ConectaSalud Q4:** LTV/CAC = 4-6x

---

## 📈 Marketing Metrics

### Awareness & Lead Gen

**11. Website Traffic**

**Breakdown:**
- Organic (SEO): Target 40% del tráfico en Q4
- Direct (brand): 20%
- Referral (partners, backlinks): 15%
- Paid (ads): 15%
- Social: 10%

**Targets:**

| Trimestre | Unique Visitors/mes | MoM Growth |
|-----------|---------------------|------------|
| Q1 | 500 | Baseline |
| Q2 | 2,000 | +60% |
| Q3 | 5,000 | +35% |
| Q4 | 10,000 | +25% |

---

**12. MQL (Marketing Qualified Lead)**

**Definición:** Lead que descargó contenido, asistió a webinar, o pidió info.

**Calificación:**
- Fit: Trabaja en sistema de salud (check)
- Intent: Descargó lead magnet o asistió a webinar (check)

**Targets:**

| Trimestre | MQLs/mes | MQL → SQL Rate |
|-----------|----------|----------------|
| Q1 | 20 | 50% |
| Q2 | 50 | 60% |
| Q3 | 100 | 65% |
| Q4 | 150 | 70% |

---

**13. SQL (Sales Qualified Lead)**

**Definición:** MQL que fue calificado por sales (tiene budget, authority, need, timeline).

**BANT Framework:**
- Budget: >$3K/año disponible
- Authority: Decision maker o influencer fuerte
- Need: Sufren de >20% ausentismo
- Timeline: Buscan solución en próximos 3-6 meses

**Targets:** Ver tabla arriba (MQL → SQL rate mejora de 50% a 70%)

---

**14. Cost Per Lead (CPL)**

**Fórmula:**
```
CPL = Marketing Spend / # Leads

Ejemplo Q2:
Marketing: $10K
Leads (MQL): 50
CPL = $10K / 50 = $200
```

**Targets:**
- MQL: $100-200
- SQL: $200-400

**By Channel:**
- Organic (blog, SEO): $50-100 (very efficient)
- Paid ads: $150-300
- Events: $300-500

---

### Content & Social Metrics

**15. Blog Metrics**
- Posts published: 3-4/mes
- Avg time on page: >3 min
- Conversion rate (CTA): >5%
- SEO traffic: 40% de total traffic en Q4

**16. LinkedIn Metrics**
- Followers: 500 (Q1) → 2,000 (Q4)
- Engagement rate: >5% (likes, comments, shares)
- Click-through rate (CTR): >2%

**17. Email Marketing**
- List size: 200 (Q1) → 1,500 (Q4)
- Open rate: >30%
- Click rate: >5%
- Unsub rate: <1%

---

## 🚀 Product & Engagement Metrics

### Activation & Onboarding

**18. Trial Activation Rate**

**Definición:** % de trials que completan onboarding básico (conectan plataforma + envían primer reminder).

**Fórmula:**
```
Activation Rate = Trials activados / Total trials iniciados

Ejemplo:
30 trials iniciados
22 completaron onboarding
Rate = 22/30 = 73%
```

**Target:** 70-80%

---

**19. Time to First Value (TTFV)**

**Definición:** Días desde signup hasta primera consulta con ausentismo reducido.

**Milestones:**
1. Day 0: Signup
2. Day 1-3: Integración técnica completa
3. Day 4-7: Primeros recordatorios enviados
4. Day 8-21: Primera consulta exitosa (paciente asiste)
5. Day 22-30: Dato estadístico (reducción ausentismo vs baseline)

**Target TTFV:** <21 días (ver impacto antes de fin de trial)

---

**20. Product Engagement Score**

**Definición:** Composite score de uso del producto.

**Fórmula:**
```
Engagement Score = 
  (0.4 * DAU/MAU) +
  (0.3 * % Features Used) +
  (0.3 * Avg Session Time / 10 min)

Ejemplo:
DAU/MAU = 50% → 0.4 * 0.5 = 0.2
Features = 60% → 0.3 * 0.6 = 0.18
Session = 8 min → 0.3 * 0.8 = 0.24
Score = 0.62 (62/100)

Scale:
80-100: Power users (promote to case study)
60-79: Engaged (healthy)
40-59: At-risk (reach out to CS)
<40: Very at-risk (urgent intervention)
```

**Target:** >60 average

---

**21. Feature Adoption**

**Core Features (Must Use):**
- WhatsApp reminders: 100% (automatic)
- Pre-consulta verification: 90%+ adoption
- Dashboard analytics: 70%+

**Advanced Features (Nice to Have):**
- Patient segmentation (VIP vs At-Risk): 50% en Q4
- Gamification badges: 40%
- Custom reminder templates: 30%

---

## 🤝 Customer Success Metrics

### Retention & Churn

**22. Customer Retention Rate**

**Definición:** % de clientes que renuevan cada mes.

**Fórmula:**
```
Retention Rate = (Clientes fin mes - Nuevos en mes) / Clientes inicio mes

Ejemplo Marzo:
Inicio: 10 clientes
Fin: 13 clientes
Nuevos: 5
Retention = (13 - 5) / 10 = 80%
(2 clientes churned)
```

**Benchmarks:**
- Q1: 70-80% (esperado churn temprano)
- Q2-Q4: 85-95%

**Target Q4:** 90%+ monthly retention

---

**23. Customer Churn Rate**

**Definición:** % de clientes que cancelan cada mes.

**Fórmula:**
```
Churn Rate = Clientes perdidos / Clientes al inicio del mes

Ejemplo:
Inicio mes: 30
Perdidos: 3
Churn = 3/30 = 10%
```

**Benchmarks SaaS B2B:**
- <5%: Excelente
- 5-10%: Aceptable
- >10%: Problemático

**Targets ConectaSalud:**
- Q1-Q2: <15% (early, experimental)
- Q3: <10%
- Q4: <7%

**Annual Churn Target:** <40-50% (primeros años startups)

---

**24. Gross MRR Churn**

**Definición:** % de MRR perdido por cancelaciones.

**Fórmula:**
```
Gross MRR Churn = MRR perdido / MRR inicio mes

Ejemplo:
MRR inicio: $50K
Cancelaciones: $4K
Gross Churn = 4/50 = 8%
```

**Target:** <5% mensual

---

**25. Net MRR Churn (Holy Grail)**

**Definición:** Gross churn menos expansion MRR (upsells).

**Fórmula:**
```
Net MRR Churn = (MRR perdido - MRR expansion) / MRR inicio

Ejemplo:
MRR inicio: $50K
Churn: -$4K
Expansion (upsells): +$6K
Net Churn = (-4K + 6K) / 50K = +4% (Negativo es bueno!)
```

**Best Practice:** Net Negative Churn (<0%) significa grows por sí solo vía upsells.

**Target Q4:** ~0% (break-even, expansion = churn)

---

**26. NPS (Net Promoter Score)**

**Definición:** Likelihood del cliente de recomendar (0-10 scale).

**Categorías:**
- 9-10: Promoters ✅
- 7-8: Passives ~
- 0-6: Detractors ❌

**Fórmula:**
```
NPS = % Promoters - % Detractors

Ejemplo:
100 responses:
60 Promoters (9-10) = 60%
25 Passives (7-8) = 25%
15 Detractors (0-6) = 15%

NPS = 60% - 15% = +45
```

**Benchmarks:**
- >50: Excelente
- 30-50: Bueno
- 10-30: Aceptable
- <10: Problemático

**Target ConectaSalud Q4:** NPS = 40-50

---

**27. Customer Health Score**

**Composite metric para predecir churn.**

**Fórmula:**
```
Health Score (0-100) = 
  (0.3 * Product Usage) +
  (0.25 * NPS) +
  (0.2 * Support Tickets Resolved%) +
  (0.15 * Payment Status) +
  (0.1 * Engagement with CS)

Ejemplo:
Usage: 80/100 → 0.3 * 0.8 = 0.24
NPS: 9/10 → 0.25 * 0.9 = 0.225
Tickets: 100% → 0.2 * 1.0 = 0.2
Payment: On-time → 0.15 * 1.0 = 0.15
CS Engagement: 70% → 0.1 * 0.7 = 0.07
Health = 0.885 → 88.5/100 ✅

Segments:
90-100: Healthy (green)
70-89: Monitor (yellow)
50-69: At-risk (orange)
<50: Critical (red) → intervene!
```

---

## 💵 Financial Health Metrics

### Unit Economics

**28. ARPU (Average Revenue Per User)**

**Fórmula:**
```
ARPU = Total MRR / # Active Customers

Ejemplo:
MRR = $50K
Customers = 100
ARPU = $500/mes
```

**Target ARPU:** $400-600/mes (mix de Pro y Enterprise)

---

**29. Gross Margin**

**Definición:** Revenue menos COGS (Cost of Goods Sold).

**COGS para SaaS:**
- Hosting (AWS, infrastructure): $X/customer
- Third-party APIs (WhatsApp, GPT-4): $Y/customer
- Support cost allocation: $Z/customer

**Fórmula:**
```
Gross Margin % = (Revenue - COGS) / Revenue * 100%

Ejemplo:
Revenue: $50K/mes
COGS: $10K/mes (hosting $5K, APIs $3K, support $2K)
Gross Margin = ($50K - $10K) / $50K = 80%
```

**Benchmarks SaaS:**
- 70-80%: Bueno
- 80-90%: Excelente
- >90%: Best-in-class

**Target ConectaSalud:** 75-85%

---

**30. Burn Rate & Runway**

**Burn Rate:** Cash gastado por mes (neto).

**Fórmula:**
```
Burn Rate = Operating Expenses - Revenue

Ejemplo Q2:
OpEx: $40K/mes (salaries, marketing, etc.)
Revenue: $15K/mes
Burn = $40K - $15K = $25K/mes
```

**Runway:**
```
Runway = Cash in Bank / Burn Rate

Si tenés $200K en banco:
Runway = $200K / $25K = 8 meses
```

**Safe Runway:** >12-18 meses (tiempo para fundraising si hace falta)

**Target:** Llegar a cash-flow positive en Mes 18-24

---

### Growth Accounting

**31. Quick Ratio**

**Definición:** Ratio de crecimiento saludable (new+expansion vs churn).

**Fórmula:**
```
Quick Ratio = (New MRR + Expansion MRR) / (Churned MRR + Contraction MRR)

Ejemplo:
New: $20K
Expansion: $5K
Churned: $8K
Contraction: $2K
Quick Ratio = ($20K + $5K) / ($8K + $2K) = 2.5x
```

**Benchmarks:**
- >4x: Excelente (growth muy saludable)
- 2-4x: Bueno
- <2x: Problemático (churn consuming growth)

**Target Q4:** 3-4x

---

**32. Magic Number**

**Definición:** Sales efficiency (cuánto revenue generás por cada $ en sales/marketing).

**Fórmula:**
```
Magic Number = (Net New MRR * 4) / Sales & Marketing Spend (quarter anterior)

Ejemplo:
Q2 Net New MRR: $30K
Q1 S&M Spend: $40K
Magic # = ($30K * 4) / $40K = 3.0
```

**Benchmarks:**
- >1.0: Eficiente, accelerate spending
- 0.75-1.0: OK, optimize
- <0.75: Ineficiente, fix antes de gastar más

**Target Q3+:** >1.0

---

## 📊 Dashboard & Reporting

### Dashboard Semanal (Founder/Leadership)

**Top 5 Métricas (Monitor Every Monday):**

```
┌─────────────────────────────────────────┐
│ WEEKLY SNAPSHOT (Week of Nov 4, 2025)  │
├─────────────────────────────────────────┤
│ 1. Active Paying Customers: 42         │
│    ↳ vs last week: +3 (+7.7%)          │
│                                         │
│ 2. MRR: $52,500                         │
│    ↳ vs last week: +$3,500 (+7.1%)     │
│                                         │
│ 3. Pipeline: $180K (3.6x coverage)     │
│    ↳ vs last week: +$25K                │
│                                         │
│ 4. SQLs: 15                             │
│    ↳ vs last week: +5                   │
│                                         │
│ 5. Customer Health Avg: 82/100         │
│    ↳ At-risk: 3 customers (flagged)    │
└─────────────────────────────────────────┘
```

---

### Dashboard Mensual (Board/Investors)

**Métricas de Board Meeting:**

```
┌──────────────────────────────────────────────────┐
│ OCTOBER 2025 - MONTHLY REPORT                    │
├──────────────────────────────────────────────────┤
│ REVENUE                                          │
│ • MRR: $48K → $52.5K (+9.4%)                     │
│ • ARR: $576K → $630K                             │
│ • New MRR: $12K                                  │
│ • Expansion: $1.5K                               │
│ • Churned: -$3K (5.7% gross churn)               │
│                                                  │
│ GROWTH                                           │
│ • Active Customers: 38 → 42 (+10.5%)             │
│ • New Logos: 7                                   │
│ • Churned: 3 (7.9% customer churn)               │
│ • Quick Ratio: 3.2x                              │
│                                                  │
│ SALES                                            │
│ • Pipeline: $180K (3.6x Q4 quota)                │
│ • SQLs: 52 (vs 40 target) ✅                      │
│ • Demos: 31 (60% SQL→Demo)                       │
│ • Closed: 7 (45% win rate)                       │
│ • Avg Sales Cycle: 42 días                       │
│                                                  │
│ MARKETING                                        │
│ • Website Traffic: 8.2K (↑35% MoM)               │
│ • MQLs: 128                                      │
│ • MQL→SQL: 63%                                   │
│ • CAC: $3.8K (↓from $4.2K)                       │
│                                                  │
│ CUSTOMER SUCCESS                                 │
│ • NPS: 48                                        │
│ • Avg Health Score: 82/100                       │
│ • At-risk: 3 (intervention plan)                 │
│                                                  │
│ FINANCIALS                                       │
│ • Burn: $22K/mes (↓from $28K)                    │
│ • Runway: 14 meses                               │
│ • LTV/CAC: 4.8x                                  │
│ • Gross Margin: 82%                              │
└──────────────────────────────────────────────────┘
```

---

### Tracking Tools & Stack

**Recomendado:**

**1. CRM & Sales:** HubSpot
- Pipeline tracking
- Deal stages
- Win/loss analysis
- Email sequences

**2. Product Analytics:** Mixpanel o Amplitude
- User engagement
- Feature adoption
- Funnels (trial → paid)
- Cohort analysis

**3. Financial:** ChartMogul o ProfitWell
- MRR tracking
- Churn analysis
- LTV/CAC calculation
- SaaS metrics dashboard

**4. Customer Success:** Vitally o ChurnZero
- Health scores
- Automated workflows (reach out to at-risk)
- NPS surveys

**5. Dashboarding:** Metabase o Google Data Studio
- Custom dashboards
- Pulls data from HubSpot, Mixpanel, ChartMogul
- Share with team/board

**Budget:**
- HubSpot: $500-1K/mes
- Mixpanel: $200-500/mes
- ChartMogul: $100-300/mes
- Metabase: Open source (free) o hosted ($50/mes)
- **Total:** ~$1-2K/mes en tooling

---

## 🎯 Summary & Action Items

### Top 10 Métricas a Trackear Religiosamente

1. **Active Paying Customers** (North Star)
2. **MRR & ARR** (Revenue)
3. **CAC & LTV/CAC** (Efficiency)
4. **Customer Churn Rate** (Retention)
5. **Win Rate** (Sales effectiveness)
6. **Pipeline Coverage** (Future predictability)
7. **NPS** (Customer satisfaction)
8. **Quick Ratio** (Growth health)
9. **Burn Rate & Runway** (Survival)
10. **SQL → Close Conversion** (Funnel health)

---

### Cadencia de Reviews

**Daily (Founder Check-in - 5 min):**
- MRR de ayer
- Deals closed/lost
- At-risk customers (health score)

**Weekly (Team Standup - 30 min):**
- Dashboard semanal (top 5)
- Blockers
- Actions para semana próxima

**Monthly (All-Hands - 1hr):**
- Dashboard mensual completo
- Review vs targets
- Celebrate wins
- Plan próximo mes

**Quarterly (Board Meeting - 2hr):**
- QBR slides con todas las métricas
- Deep dives en áreas problemáticas
- Strategic adjustments
- Next quarter OKRs

---

**Documento creado:** Noviembre 2025  
**Owner:** Active Hearing Inc. Leadership Team  
**Versión:** 1.0  
**Próxima revisión:** Mensual

---

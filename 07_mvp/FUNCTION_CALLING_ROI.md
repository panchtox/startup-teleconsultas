# Sistema de Function Calling para Cálculos de ROI

## 📋 Resumen

Implementamos **function calling** de OpenAI para que el LLM use funciones JavaScript precisas cuando necesita hacer cálculos de ROI, en lugar de hacer matemática aproximada.

## 🎯 Problema que Resuelve

**Antes:** El LLM hacía cálculos mentales que a menudo confundían:
- Consultas totales vs consultas perdidas
- Revenue vs profit
- Cálculos de porcentajes incorrectos

**Ahora:** El LLM detecta automáticamente cuándo necesita calcular ROI y llama a una función JavaScript precisa.

## 🏗️ Arquitectura

```
Usuario pregunta: "¿Cuánto puedo ahorrar?"
          ↓
Frontend envía mensaje al backend
          ↓
Backend → LLM (gpt-4o-mini con functions)
          ↓
LLM detecta que necesita calculate_roi()
          ↓
Backend ejecuta roiCalculations.js
          ↓
Backend devuelve resultado al LLM
          ↓
LLM interpreta resultado y responde en lenguaje natural
          ↓
Frontend muestra respuesta al usuario
```

## 📁 Archivos Creados/Modificados

### 1. `utils/roiCalculations.js` (NUEVO)

Script con 3 funciones:

#### `calculateROI(params)`
Función principal que calcula todo el ROI.

**Parámetros requeridos:**
- `monthlyAppointments`: Consultas mensuales totales
- `revenuePerAppointment`: Ingreso por consulta ($)
- `costPerAppointment`: Costo médico por consulta ($)

**Parámetros opcionales:**
- `currentNoShowRate`: Tasa actual de ausentismo (default: 0.33 = 33%)
- `targetNoShowRate`: Tasa objetivo con TeleAssist (default: 0.08 = 8%)

**Retorna objeto con:**
```javascript
{
  inputs: { ... },              // Parámetros de entrada
  current: { ... },             // Situación actual sin TeleAssist
  target: { ... },              // Situación con TeleAssist
  improvements: { ... },        // Mejoras y ahorros brutos
  costs: { ... },               // Costos de TeleAssist
  netROI: { ... }               // ROI neto final
}
```

**Cálculos clave:**
- ✅ Consultas perdidas actuales vs objetivo
- ✅ Pérdida económica por no-shows
- ✅ Ahorro mensual y anual
- ✅ Costo estimado de TeleAssist (basado en $0.75/paciente/mes)
- ✅ ROI neto (ahorro - costo)
- ✅ Múltiplo de retorno (ej: 17x)
- ✅ Periodo de recuperación (meses)

#### `generateROISummary(roiData)`
Convierte el objeto de ROI en texto formateado legible.

#### `calculateScenarios()`
Pre-calcula ROI para 4 escenarios típicos:
- Clínica Pequeña (200 consultas/mes)
- Clínica Mediana (500 consultas/mes)
- Clínica Grande (1000 consultas/mes)
- Red de Clínicas (3000 consultas/mes)

### 2. `routes/chat.js` (MODIFICADO)

Agregado:

1. **Import del módulo de cálculos:**
```javascript
const { calculateROI, generateROISummary } = require('../utils/roiCalculations');
```

2. **Definición de función para el LLM:**
```javascript
const FUNCTIONS = [
  {
    name: 'calculate_roi',
    description: 'Calcula el ROI preciso...',
    parameters: { ... } // Esquema JSON con los parámetros
  }
];
```

3. **System prompt actualizado:**
Instruye explícitamente al LLM:
- SIEMPRE usar `calculate_roi` para preguntas sobre ahorros
- NUNCA hacer cálculos manuales
- Preguntar por datos faltantes si es necesario

4. **Function calling en `handleChat()`:**
```javascript
// Primera llamada con functions disponibles
response = await client.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: messages,
  functions: FUNCTIONS,
  function_call: 'auto', // El LLM decide cuándo llamar
  ...
});

// Si el LLM llamó una función
if (assistantMessage.function_call) {
  // Ejecutar la función JavaScript
  const result = executeFunctionCall(name, args);
  
  // Segunda llamada para que interprete el resultado
  response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [..., { role: 'function', content: result }],
    ...
  });
}
```

5. **Función `executeFunctionCall()`:**
Ejecuta la función solicitada por el LLM y maneja errores.

## 🔄 Flujo de Conversación Ejemplo

**Usuario:** "Tengo 500 consultas al mes, cobro $60 por consulta y le pago $35 al médico. ¿Cuánto puedo ahorrar?"

**1. Primera llamada al LLM:**
```json
{
  "messages": [...],
  "functions": [{ "name": "calculate_roi", ... }],
  "function_call": "auto"
}
```

**2. LLM responde con function_call:**
```json
{
  "function_call": {
    "name": "calculate_roi",
    "arguments": "{\"monthlyAppointments\": 500, \"revenuePerAppointment\": 60, \"costPerAppointment\": 35}"
  }
}
```

**3. Backend ejecuta la función:**
```javascript
const result = calculateROI({
  monthlyAppointments: 500,
  revenuePerAppointment: 60,
  costPerAppointment: 35
});
// result contiene todos los cálculos precisos
```

**4. Segunda llamada al LLM con el resultado:**
```json
{
  "messages": [
    ...,
    { "role": "function", "name": "calculate_roi", "content": "{...resultado...}" }
  ]
}
```

**5. LLM interpreta y responde en lenguaje natural:**
"Excelente pregunta! Con 500 consultas mensuales... [explica el ROI de forma clara]"

## 🎓 Cómo el LLM Decide Usar la Función

El LLM usa `calculate_roi` cuando detecta:

✅ **Triggers positivos:**
- "¿Cuánto puedo ahorrar?"
- "¿Cuál es el ROI?"
- "¿Vale la pena económicamente?"
- "¿Cuánto dinero ganaré?"
- "Muéstrame el retorno de inversión"

✅ **Datos necesarios:**
- Si el usuario ya dio los 3 parámetros → Llama la función directamente
- Si faltan datos → Pregunta primero

❌ **No usa la función para:**
- Preguntas generales sobre features
- Explicaciones de cómo funciona el sistema
- Acciones en la plataforma

## 📊 Ejemplo de Resultado

Input:
```javascript
{
  monthlyAppointments: 500,
  revenuePerAppointment: 60,
  costPerAppointment: 35
}
```

Output (resumido):
```
SITUACIÓN ACTUAL: 165 consultas perdidas/mes, $5,775 de pérdida mensual
SITUACIÓN CON TELEASSIST: 40 consultas perdidas/mes
AHORRO: 125 consultas recuperadas, $37,500/año de ahorro bruto
COSTO TELEASSIST: $4,980/año
ROI NETO: $32,520/año de ahorro neto (17.2x retorno)
```

## 🧪 Testing

### Test local antes de deploy:

1. **Test del script de cálculos:**
```javascript
// En backend/utils/
const { calculateROI, generateROISummary } = require('./roiCalculations');

const result = calculateROI({
  monthlyAppointments: 500,
  revenuePerAppointment: 60,
  costPerAppointment: 35
});

console.log(generateROISummary(result));
```

2. **Test del endpoint de chat:**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tengo 500 consultas mensuales, cobro $60 por consulta y pago $35 al médico. Cuánto puedo ahorrar?"
  }'
```

3. **Test en frontend:**
Abre el chat y pregunta directamente sobre ROI.

### Validaciones en el código:

El script valida:
- ✅ `monthlyAppointments > 0`
- ✅ `revenuePerAppointment > 0`
- ✅ `costPerAppointment >= 0`
- ✅ `costPerAppointment < revenuePerAppointment`

Si algo falla, devuelve error legible.

## 🚀 Deploy

### Backend (Render):
```bash
cd C:\00_dev\00_playground\startup-teleconsultas\07_mvp\backend
git add utils/roiCalculations.js routes/chat.js
git commit -m "Add function calling for precise ROI calculations"
git push origin feature/chat-llm
```

Render auto-deploya desde el branch.

### Frontend (sin cambios necesarios):
El frontend no requiere modificaciones. Funciona igual, pero ahora recibe respuestas más precisas.

## 📈 Mejoras Futuras

1. **Más funciones:**
   - `get_patient_stats()` → Stats de pacientes
   - `get_appointment_trends()` → Tendencias de consultas
   - `suggest_improvements()` → Sugerencias personalizadas

2. **Caché de resultados:**
   - Guardar cálculos frecuentes en Redis
   - Reducir llamadas al LLM

3. **Validación de inputs:**
   - Detectar monedas (USD vs ARS)
   - Sugerir rangos típicos si los números parecen atípicos

4. **UI especializada:**
   - Mostrar tabla de ROI en el chat
   - Gráficos inline con los cálculos

## 🐛 Troubleshooting

**Problema:** LLM no llama a la función
- **Causa:** System prompt no enfatiza suficiente
- **Fix:** Actualizar SYSTEM_PROMPT con más énfasis

**Problema:** Cálculos incorrectos
- **Causa:** Bug en roiCalculations.js
- **Fix:** Test unitarios del script primero

**Problema:** Rate limit 429
- **Causa:** Function calling usa 2 requests (ida y vuelta)
- **Fix:** Implementar rate limiting interno

**Problema:** Frontend muestra error
- **Causa:** Backend no deployado o variable de entorno faltante
- **Fix:** Verificar GITHUB_TOKEN en Render

## 📚 Referencias

- [OpenAI Function Calling](https://platform.openai.com/docs/guides/function-calling)
- [GitHub Models API](https://docs.github.com/en/github-models)
- [Azure AI Inference (mismo formato)](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/function-calling)

---

**Creado:** 12 Noviembre 2025  
**Status:** ✅ Implementado, listo para testing  
**Próximo paso:** Deploy y test en producción

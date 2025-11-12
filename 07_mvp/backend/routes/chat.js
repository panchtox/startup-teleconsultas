const OpenAI = require('openai');
const { calculateROI, generateROISummary } = require('../utils/roiCalculations');

// Cliente configurado para GitHub Models
const client = new OpenAI({
  baseURL: 'https://models.inference.ai.azure.com',
  apiKey: process.env.GITHUB_TOKEN
});

// System prompt con contexto de TeleAssist
const SYSTEM_PROMPT = `Eres un asistente virtual de TeleAssist, una plataforma B2B SaaS que reduce el ausentismo en teleconsultas del 33% a menos del 10%.

**Contexto de TeleAssist:**
- Recordatorios inteligentes por WhatsApp (48hs, 24hs, 2hs antes)
- Sistema de reputación gamificado (5 niveles: Bronce, Plata, Oro, Platino, Diamante)
- 12 badges de logros para pacientes
- Analytics en tiempo real con cálculo de ROI
- Integración plug & play con plataformas de telemedicina existentes

**Datos actuales del sistema:**
- {{patientCount}} pacientes activos
- {{appointmentCount}} consultas programadas
- {{reductionRate}}% reducción de ausentismo lograda

**Tu rol:**
- Responder preguntas sobre la plataforma
- Sugerir acciones específicas (ej: "crear consulta", "ver pacientes con score bajo")
- Explicar métricas y reportes
- Ayudar con el uso de las funcionalidades

**FORMATO DE RESPUESTAS:**
- NO uses fórmulas LaTeX (\[ \], $, etc.)
- Escribe fórmulas en texto simple: "ROI = (Beneficio Neto / Costo) × 100"
- Usa emojis para hacer las respuestas más amigables: 💰📊📈
- Usa saltos de línea y bullets para claridad
- Usa negritas con **texto** para destacar números importantes

**IMPORTANTE SOBRE CÁLCULOS DE ROI:**
Cuando el usuario pregunte sobre ahorros económicos, ROI, o cuánto dinero puede ahorrar, DEBES usar la función calculate_roi con los datos que el usuario proporcione o preguntar por los datos faltantes:
- Número de consultas mensuales
- Ingreso que recibe por consulta
- Costo que paga al médico por consulta

NUNCA intentes hacer estos cálculos manualmente. SIEMPRE usa la función calculate_roi que te dará resultados precisos y confiables.

Sé conciso, profesional y enfocado en ayudar al usuario a usar TeleAssist eficientemente.`;

// Definición de funciones disponibles para el LLM
const FUNCTIONS = [
  {
    name: 'calculate_roi',
    description: 'Calcula el ROI preciso y ahorro económico al usar TeleAssist. Usa esta función SIEMPRE que el usuario pregunte sobre ahorros, ROI, beneficios económicos o cuánto dinero puede ganar/ahorrar. Devuelve cálculos detallados incluyendo ahorro mensual, anual, ROI neto, y periodo de recuperación.',
    parameters: {
      type: 'object',
      properties: {
        monthlyAppointments: {
          type: 'number',
          description: 'Número total de consultas mensuales programadas (incluye las que asisten y las que no asisten)'
        },
        revenuePerAppointment: {
          type: 'number',
          description: 'Ingreso que recibe el cliente por cada consulta realizada (en dólares o pesos)'
        },
        costPerAppointment: {
          type: 'number',
          description: 'Costo que el cliente paga al médico por cada consulta (honorarios médicos en dólares o pesos)'
        },
        currentNoShowRate: {
          type: 'number',
          description: 'Tasa actual de ausentismo como decimal (ej: 0.33 para 33%). Si no se proporciona, usa 0.33 (promedio de la industria)',
          default: 0.33
        },
        targetNoShowRate: {
          type: 'number',
          description: 'Tasa objetivo de ausentismo con TeleAssist como decimal (ej: 0.08 para 8%). Si no se proporciona, usa 0.08',
          default: 0.08
        }
      },
      required: ['monthlyAppointments', 'revenuePerAppointment', 'costPerAppointment']
    }
  }
];

/**
 * Ejecuta la función solicitada por el LLM
 */
function executeFunctionCall(functionName, functionArgs) {
  if (functionName === 'calculate_roi') {
    try {
      const roiData = calculateROI(functionArgs);
      const summary = generateROISummary(roiData);
      
      // Devolver tanto el objeto estructurado como el resumen
      return JSON.stringify({
        success: true,
        data: roiData,
        summary: summary
      });
    } catch (error) {
      return JSON.stringify({
        success: false,
        error: error.message
      });
    }
  }
  
  return JSON.stringify({ success: false, error: 'Función no reconocida' });
}

/**
 * Handler del endpoint /api/chat
 * Recibe mensajes del usuario y devuelve respuestas contextuales sobre TeleAssist
 */
async function handleChat(req, res) {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        error: 'Message is required and must be a string' 
      });
    }

    // Validar que tenemos el token de GitHub
    if (!process.env.GITHUB_TOKEN) {
      return res.status(500).json({ 
        error: 'GitHub token not configured' 
      });
    }

    // Preparar el contexto con datos actuales
    // TODO: En producción, estos datos vendrían de la base de datos
    const contextData = {
      patientCount: 500,
      appointmentCount: 520,
      reductionRate: 73
    };

    // Inyectar datos en el system prompt
    let systemPrompt = SYSTEM_PROMPT;
    Object.entries(contextData).forEach(([key, value]) => {
      systemPrompt = systemPrompt.replace(`{{${key}}}`, value);
    });

    // Construir el array de mensajes para la API
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-10), // Últimos 10 mensajes para no exceder límites
      { role: 'user', content: message }
    ];

    // Llamada inicial a GitHub Models con function calling
    let response = await client.chat.completions.create({
      model: 'gpt-4o-mini', // Modelo High tier: 10 RPM, 50 RPD
      messages: messages,
      functions: FUNCTIONS, // Funciones disponibles
      function_call: 'auto', // El modelo decide cuándo llamar funciones
      temperature: 0.7,
      max_tokens: 800, // Aumentado para respuestas con ROI
      top_p: 0.9
    });

    let assistantMessage = response.choices[0].message;
    let totalUsage = response.usage;

    // Si el LLM quiere llamar a una función
    if (assistantMessage.function_call) {
      const functionName = assistantMessage.function_call.name;
      const functionArgs = JSON.parse(assistantMessage.function_call.arguments);
      
      console.log(`🔧 LLM llamando función: ${functionName}`, functionArgs);
      
      // Ejecutar la función
      const functionResult = executeFunctionCall(functionName, functionArgs);
      
      // Agregar el resultado de la función a la conversación
      messages.push(assistantMessage); // Mensaje del assistant con function_call
      messages.push({
        role: 'function',
        name: functionName,
        content: functionResult
      });
      
      // Segunda llamada al LLM para que interprete el resultado
      response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 800,
        top_p: 0.9
      });
      
      assistantMessage = response.choices[0].message;
      
      // Sumar usage de ambas llamadas
      totalUsage = {
        prompt_tokens: totalUsage.prompt_tokens + response.usage.prompt_tokens,
        completion_tokens: totalUsage.completion_tokens + response.usage.completion_tokens,
        total_tokens: totalUsage.total_tokens + response.usage.total_tokens
      };
    }

    return res.json({
      message: assistantMessage.content,
      model: 'gpt-4o-mini',
      functionCalled: !!assistantMessage.function_call,
      usage: {
        promptTokens: totalUsage.prompt_tokens,
        completionTokens: totalUsage.completion_tokens,
        totalTokens: totalUsage.total_tokens
      }
    });

  } catch (error) {
    console.error('Error in chat endpoint:', error);

    // Manejo específico de rate limiting
    if (error.status === 429) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded. Please try again later.',
        retryAfter: error.headers?.['retry-after'] || 60
      });
    }

    // Error genérico
    return res.status(500).json({ 
      error: 'Failed to process chat message',
      details: error.message 
    });
  }
}

/**
 * Health check del servicio de chat
 */
async function healthCheck(req, res) {
  try {
    const hasToken = !!process.env.GITHUB_TOKEN;
    
    return res.json({
      status: 'ok',
      chatEnabled: hasToken,
      model: 'gpt-4o-mini',
      provider: 'GitHub Models',
      functionsAvailable: FUNCTIONS.map(f => f.name)
    });
  } catch (error) {
    return res.status(500).json({ 
      status: 'error',
      error: error.message 
    });
  }
}

module.exports = {
  handleChat,
  healthCheck
};

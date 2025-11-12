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

**CRÍTICO - CÁLCULOS DE ROI:**
Si el usuario proporciona estos 3 datos:
1. Número de consultas mensuales
2. Ingreso por consulta 
3. Costo que paga al médico por consulta

DEBES INMEDIATAMENTE llamar a calculate_roi sin hacer NINGÚN otro cálculo previo.

EJEMPLO CORRECTO:
Usuario: "Tengo 800 consultas, cobro 55000, pago 10000 al médico"
Tú: [llamas calculate_roi(800, 55000, 10000)] → explicas el resultado

EJEMPLO INCORRECTO:
Usuario: "Tengo 800 consultas, cobro 55000, pago 10000 al médico" 
Tú: "Tus ingresos son 44,000,000..." ← ❌ NUNCA HAGAS ESTO

La función calculate_roi calcula AUTOMÁTICAMENTE:
- Pacientes perdidos sin TeleAssist vs con TeleAssist
- Consultas recuperadas
- Ingresos adicionales
- Costo REAL de TeleAssist (no inventar números)
- ROI neto
- Múltiplo de retorno

NUNCA, bajo ninguna circunstancia:
- Calcules ingresos totales manualmente
- Calcules ganancias manualmente  
- Inventes el costo de TeleAssist
- Hagas ningún cálculo antes de llamar la función

Tu ÚNICO trabajo es: detectar los 3 números → llamar calculate_roi → explicar el resultado.

Sé conciso, profesional y enfocado en ayudar al usuario a usar TeleAssist eficientemente.`;

// Definición de tools (formato nuevo de OpenAI) para function calling
const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'calculate_roi',
      description: '❌❌❌ OBLIGATORIO LLAMAR SIEMPRE ❌❌❌ Si ves consultas + ingreso + costo, llama INMEDIATAMENTE esta función SIN hacer cálculos previos. Esta función calcula TODO lo que necesitas: pacientes recuperados, ingresos adicionales, costo real de TeleAssist, ROI neto, múltiplo. NO calcules ingresos totales. NO calcules ganancias. NO inventes costos. SOLO llama la función y explica su resultado.',
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

    // Llamada inicial a GitHub Models con tools (formato nuevo)
    let response = await client.chat.completions.create({
      model: 'gpt-4o-mini', // Modelo High tier: 10 RPM, 50 RPD
      messages: messages,
      tools: TOOLS, // Tools en vez de functions
      tool_choice: 'auto', // El modelo decide cuándo llamar tools
      temperature: 0.7,
      max_tokens: 800, // Aumentado para respuestas con ROI
      top_p: 0.9
    });

    let assistantMessage = response.choices[0].message;
    let totalUsage = response.usage;

    // Si el LLM quiere llamar a un tool
    if (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
      const toolCall = assistantMessage.tool_calls[0];
      const functionName = toolCall.function.name;
      const functionArgs = JSON.parse(toolCall.function.arguments);
      
      console.log(`🔧 LLM llamando tool: ${functionName}`, functionArgs);
      
      // Ejecutar la función
      const functionResult = executeFunctionCall(functionName, functionArgs);
      
      // Agregar el resultado del tool a la conversación
      messages.push(assistantMessage); // Mensaje del assistant con tool_calls
      messages.push({
        role: 'tool',
        tool_call_id: toolCall.id,
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
      toolCalled: !!(assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0),
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
      toolsAvailable: TOOLS.map(t => t.function.name)
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

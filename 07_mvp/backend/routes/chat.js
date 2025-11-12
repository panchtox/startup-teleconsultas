const OpenAI = require('openai');

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

Sé conciso, profesional y enfocado en ayudar al usuario a usar TeleAssist eficientemente.`;

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

    // Llamada a GitHub Models
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini', // Modelo High tier: 10 RPM, 50 RPD
      messages: messages,
      temperature: 0.7,
      max_tokens: 500, // Respuestas concisas
      top_p: 0.9
    });

    const assistantMessage = response.choices[0].message.content;

    return res.json({
      message: assistantMessage,
      model: 'gpt-4o-mini',
      usage: {
        promptTokens: response.usage.prompt_tokens,
        completionTokens: response.usage.completion_tokens,
        totalTokens: response.usage.total_tokens
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
      provider: 'GitHub Models'
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

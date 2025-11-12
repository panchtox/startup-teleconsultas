/**
 * Script de prueba para el endpoint /api/chat
 * 
 * Uso:
 * 1. Asegurate que el servidor esté corriendo (npm run dev)
 * 2. Ejecutá: node scripts/test-chat.js
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Colores para console
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

/**
 * Test 1: Health check del chat
 */
async function testHealthCheck() {
  console.log(`\n${colors.cyan}📋 Test 1: Health Check${colors.reset}`);
  console.log('----------------------------------------');
  
  try {
    const response = await axios.get(`${BASE_URL}/api/chat/health`);
    console.log(`${colors.green}✅ Status:${colors.reset}`, response.data.status);
    console.log(`${colors.green}✅ Chat habilitado:${colors.reset}`, response.data.chatEnabled);
    console.log(`${colors.green}✅ Modelo:${colors.reset}`, response.data.model);
    console.log(`${colors.green}✅ Provider:${colors.reset}`, response.data.provider);
    return true;
  } catch (error) {
    console.error(`${colors.red}❌ Error en health check:${colors.reset}`, error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    return false;
  }
}

/**
 * Test 2: Pregunta simple sobre métricas
 */
async function testSimpleQuestion() {
  console.log(`\n${colors.cyan}📋 Test 2: Pregunta Simple${colors.reset}`);
  console.log('----------------------------------------');
  
  const message = '¿Cuántos pacientes tenemos activos?';
  console.log(`${colors.yellow}Pregunta:${colors.reset} "${message}"`);
  
  try {
    const response = await axios.post(`${BASE_URL}/api/chat`, {
      message: message
    });
    
    console.log(`\n${colors.green}✅ Respuesta:${colors.reset}`);
    console.log(response.data.message);
    console.log(`\n${colors.blue}📊 Tokens usados:${colors.reset}`, response.data.usage.totalTokens);
    return true;
  } catch (error) {
    console.error(`${colors.red}❌ Error:${colors.reset}`, error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    return false;
  }
}

/**
 * Test 3: Conversación con historial
 */
async function testConversation() {
  console.log(`\n${colors.cyan}📋 Test 3: Conversación con Historial${colors.reset}`);
  console.log('----------------------------------------');
  
  const conversationHistory = [
    { role: 'user', content: 'Hola, necesito ayuda con TeleAssist' },
    { role: 'assistant', content: '¡Hola! Claro, estoy aquí para ayudarte. ¿Qué necesitás saber?' }
  ];
  
  const message = '¿Cómo funciona el sistema de reputación?';
  console.log(`${colors.yellow}Pregunta:${colors.reset} "${message}"`);
  console.log(`${colors.yellow}Contexto:${colors.reset} 2 mensajes previos en historial`);
  
  try {
    const response = await axios.post(`${BASE_URL}/api/chat`, {
      message: message,
      conversationHistory: conversationHistory
    });
    
    console.log(`\n${colors.green}✅ Respuesta:${colors.reset}`);
    console.log(response.data.message);
    console.log(`\n${colors.blue}📊 Tokens usados:${colors.reset}`, response.data.usage.totalTokens);
    return true;
  } catch (error) {
    console.error(`${colors.red}❌ Error:${colors.reset}`, error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    return false;
  }
}

/**
 * Test 4: Pregunta sobre funcionalidad específica
 */
async function testFeatureQuestion() {
  console.log(`\n${colors.cyan}📋 Test 4: Pregunta sobre Funcionalidad${colors.reset}`);
  console.log('----------------------------------------');
  
  const message = '¿Qué badges pueden obtener los pacientes y cómo se consiguen?';
  console.log(`${colors.yellow}Pregunta:${colors.reset} "${message}"`);
  
  try {
    const response = await axios.post(`${BASE_URL}/api/chat`, {
      message: message
    });
    
    console.log(`\n${colors.green}✅ Respuesta:${colors.reset}`);
    console.log(response.data.message);
    console.log(`\n${colors.blue}📊 Tokens usados:${colors.reset}`, response.data.usage.totalTokens);
    return true;
  } catch (error) {
    console.error(`${colors.red}❌ Error:${colors.reset}`, error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    return false;
  }
}

/**
 * Test 5: Error handling - mensaje vacío
 */
async function testErrorHandling() {
  console.log(`\n${colors.cyan}📋 Test 5: Error Handling${colors.reset}`);
  console.log('----------------------------------------');
  console.log(`${colors.yellow}Enviando mensaje vacío (debe fallar)${colors.reset}`);
  
  try {
    await axios.post(`${BASE_URL}/api/chat`, {
      message: ''
    });
    console.log(`${colors.red}❌ No debería haber pasado - esperábamos un error${colors.reset}`);
    return false;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log(`${colors.green}✅ Error manejado correctamente: ${error.response.data.error}${colors.reset}`);
      return true;
    } else {
      console.error(`${colors.red}❌ Error inesperado:${colors.reset}`, error.message);
      return false;
    }
  }
}

/**
 * Ejecutar todos los tests
 */
async function runAllTests() {
  console.log(`${colors.cyan}
╔══════════════════════════════════════╗
║  🧪 TEST SUITE - CHAT CON LLM       ║
║  TeleAssist Backend                  ║
╚══════════════════════════════════════╝
${colors.reset}`);

  const results = {
    total: 0,
    passed: 0,
    failed: 0
  };

  // Test 1: Health Check
  results.total++;
  if (await testHealthCheck()) {
    results.passed++;
  } else {
    results.failed++;
    console.log(`\n${colors.red}⚠️  Health check falló. Verificá que:${colors.reset}`);
    console.log('   1. El servidor esté corriendo (npm run dev)');
    console.log('   2. GITHUB_TOKEN esté configurado en .env');
    console.log('\n   Abortando tests restantes...\n');
    return;
  }

  // Test 2: Pregunta simple
  results.total++;
  if (await testSimpleQuestion()) {
    results.passed++;
  } else {
    results.failed++;
  }

  // Esperar 1 segundo entre tests para no exceder rate limit
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Test 3: Conversación
  results.total++;
  if (await testConversation()) {
    results.passed++;
  } else {
    results.failed++;
  }

  await new Promise(resolve => setTimeout(resolve, 1000));

  // Test 4: Pregunta sobre funcionalidad
  results.total++;
  if (await testFeatureQuestion()) {
    results.passed++;
  } else {
    results.failed++;
  }

  // Test 5: Error handling (no necesita delay)
  results.total++;
  if (await testErrorHandling()) {
    results.passed++;
  } else {
    results.failed++;
  }

  // Resumen
  console.log(`\n${colors.cyan}
╔══════════════════════════════════════╗
║  📊 RESUMEN DE TESTS                 ║
╚══════════════════════════════════════╝
${colors.reset}`);
  console.log(`Total:  ${results.total}`);
  console.log(`${colors.green}Passed: ${results.passed}${colors.reset}`);
  console.log(`${colors.red}Failed: ${results.failed}${colors.reset}`);
  
  if (results.failed === 0) {
    console.log(`\n${colors.green}✅ ¡Todos los tests pasaron exitosamente!${colors.reset}\n`);
  } else {
    console.log(`\n${colors.red}❌ Algunos tests fallaron. Revisá los logs arriba.${colors.reset}\n`);
  }
}

// Ejecutar
runAllTests().catch(error => {
  console.error(`${colors.red}Error fatal ejecutando tests:${colors.reset}`, error);
  process.exit(1);
});

/**
 * Script de Diagnóstico: Verificar Acceso a Meta WhatsApp API
 * 
 * Este script ayuda a:
 * 1. Verificar que el Access Token sea válido
 * 2. Obtener el Phone Number ID automáticamente
 * 3. Listar números de WhatsApp disponibles
 * 4. Verificar permisos de la app
 * 
 * Uso:
 *   node scripts/verify-meta-access.js
 */

require('dotenv').config();
const https = require('https');

// Colores para consola
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'blue');
  console.log('='.repeat(60) + '\n');
}

// Helper para hacer requests a Meta API
function makeMetaRequest(path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const token = process.env.META_ACCESS_TOKEN;
    const apiVersion = process.env.META_API_VERSION || 'v21.0';
    
    const fullPath = `/${apiVersion}${path}`;
    const url = `https://graph.facebook.com${fullPath}`;
    
    log(`🔍 Verificando: ${url}`, 'yellow');
    
    const options = {
      hostname: 'graph.facebook.com',
      path: fullPath,
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ success: true, data: parsed, statusCode: res.statusCode });
          } else {
            resolve({ success: false, error: parsed, statusCode: res.statusCode });
          }
        } catch (e) {
          reject(new Error(`Error parsing response: ${e.message}`));
        }
      });
    });
    
    req.on('error', (e) => {
      reject(e);
    });
    
    req.end();
  });
}

// Paso 1: Verificar que el token sea válido
async function verifyAccessToken() {
  logSection('PASO 1: Verificando Access Token');
  
  const token = process.env.META_ACCESS_TOKEN;
  
  if (!token || token === 'COMPLETAR_AQUI') {
    log('❌ ERROR: No se encontró META_ACCESS_TOKEN en .env', 'red');
    log('   Por favor, copia tu token desde Meta Developers', 'yellow');
    return false;
  }
  
  log(`📋 Token encontrado: ${token.substring(0, 20)}...`, 'green');
  
  try {
    // Verificar info del token
    const result = await makeMetaRequest('/debug_token?input_token=' + token);
    
    if (result.success) {
      log('✅ Token VÁLIDO', 'green');
      
      if (result.data.data) {
        const tokenInfo = result.data.data;
        log(`   📱 App ID: ${tokenInfo.app_id}`, 'green');
        log(`   👤 User ID: ${tokenInfo.user_id || 'N/A'}`, 'green');
        log(`   ⏰ Expira: ${tokenInfo.expires_at === 0 ? 'Nunca (permanente)' : new Date(tokenInfo.expires_at * 1000).toLocaleString()}`, 'green');
        log(`   🔐 Scopes: ${tokenInfo.scopes ? tokenInfo.scopes.join(', ') : 'N/A'}`, 'green');
        
        return true;
      }
    } else {
      log('❌ Token INVÁLIDO', 'red');
      if (result.error) {
        log(`   Error: ${JSON.stringify(result.error, null, 2)}`, 'red');
      }
      return false;
    }
  } catch (error) {
    log(`❌ Error al verificar token: ${error.message}`, 'red');
    return false;
  }
}

// Paso 2: Obtener el App ID y buscar WhatsApp Business Accounts
async function getWhatsAppBusinessAccounts() {
  logSection('PASO 2: Buscando WhatsApp Business Accounts');
  
  // Extraer App ID del token (formato: APP_ID|SECRET)
  const token = process.env.META_ACCESS_TOKEN;
  const appId = token.split('|')[0];
  
  log(`🔍 App ID extraído del token: ${appId}`, 'yellow');
  
  try {
    // Obtener info de la app
    const appResult = await makeMetaRequest(`/${appId}`);
    
    if (appResult.success) {
      log('✅ App encontrada', 'green');
      log(`   📱 Nombre: ${appResult.data.name}`, 'green');
      log(`   🆔 ID: ${appResult.data.id}`, 'green');
    }
    
    // Buscar WhatsApp Business Accounts asociados a esta app
    const wabsResult = await makeMetaRequest(`/${appId}/subscribed_apps?fields=whatsapp_business_account`);
    
    if (wabsResult.success && wabsResult.data.data) {
      log(`\n📊 Encontrados ${wabsResult.data.data.length} WhatsApp Business Accounts`, 'green');
      
      if (wabsResult.data.data.length === 0) {
        log('⚠️  No hay WhatsApp Business Accounts asociados a esta app', 'yellow');
        log('   Debes configurar WhatsApp en Meta Developers primero', 'yellow');
        return null;
      }
      
      return wabsResult.data.data;
    } else {
      log('⚠️  No se pudieron obtener WhatsApp Business Accounts', 'yellow');
      return null;
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    return null;
  }
}

// Paso 3: Obtener Phone Numbers de cada WABA
async function getPhoneNumbers(wabaId) {
  logSection(`PASO 3: Obteniendo Phone Numbers para WABA ${wabaId}`);
  
  try {
    const result = await makeMetaRequest(`/${wabaId}/phone_numbers`);
    
    if (result.success && result.data.data) {
      log(`✅ Encontrados ${result.data.data.length} números de teléfono`, 'green');
      
      result.data.data.forEach((phone, index) => {
        console.log(`\n📞 Número ${index + 1}:`);
        log(`   🆔 Phone Number ID: ${phone.id}`, 'magenta');
        log(`   📱 Número: +${phone.display_phone_number}`, 'green');
        log(`   ✅ Verificado: ${phone.verified_name}`, 'green');
        log(`   📋 Quality: ${phone.quality_rating || 'N/A'}`, 'yellow');
      });
      
      return result.data.data;
    } else {
      log('❌ No se encontraron números de teléfono', 'red');
      if (result.error) {
        log(`   Error: ${JSON.stringify(result.error, null, 2)}`, 'red');
      }
      return [];
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    return [];
  }
}

// Función principal
async function main() {
  console.clear();
  
  log('╔════════════════════════════════════════════════════════════╗', 'blue');
  log('║     VERIFICADOR DE ACCESO A META WHATSAPP API             ║', 'blue');
  log('║     TeleAssist - Demo Configuration Tool                   ║', 'blue');
  log('╚════════════════════════════════════════════════════════════╝', 'blue');
  
  // Paso 1: Verificar token
  const tokenValid = await verifyAccessToken();
  if (!tokenValid) {
    log('\n❌ No se puede continuar sin un token válido', 'red');
    log('   Obtén tu token desde:', 'yellow');
    log('   https://developers.facebook.com/apps/ > Tu App > WhatsApp > Getting Started', 'yellow');
    process.exit(1);
  }
  
  // Paso 2: Obtener WhatsApp Business Accounts
  const wabas = await getWhatsAppBusinessAccounts();
  
  if (!wabas || wabas.length === 0) {
    log('\n⚠️  No se encontraron WhatsApp Business Accounts', 'yellow');
    log('\n📝 SIGUIENTE PASO:', 'blue');
    log('   1. Ve a https://developers.facebook.com/apps/', 'yellow');
    log('   2. Selecciona tu app: "TeleAssist Demo - Test1"', 'yellow');
    log('   3. Ve a: WhatsApp > Getting Started', 'yellow');
    log('   4. Sigue los pasos para configurar WhatsApp', 'yellow');
    log('   5. Vuelve a ejecutar este script', 'yellow');
    process.exit(0);
  }
  
  // Paso 3: Para cada WABA, obtener sus phone numbers
  for (const waba of wabas) {
    if (waba.whatsapp_business_account) {
      const wabaId = waba.whatsapp_business_account;
      const phones = await getPhoneNumbers(wabaId);
      
      if (phones.length > 0) {
        logSection('📋 RESUMEN - Configuración para .env');
        log('Copia estos valores en tu archivo .env:', 'green');
        console.log('\n# WhatsApp Business Account ID');
        log(`META_WHATSAPP_BUSINESS_ACCOUNT_ID=${wabaId}`, 'magenta');
        console.log('\n# Phone Number ID (usa el primero)');
        log(`META_WHATSAPP_PHONE_NUMBER_ID=${phones[0].id}`, 'magenta');
        console.log('\n# Access Token (ya lo tienes)');
        log(`META_ACCESS_TOKEN=${process.env.META_ACCESS_TOKEN}`, 'magenta');
        
        logSection('✅ SIGUIENTE PASO');
        log('1. Actualiza tu archivo .env con los valores de arriba', 'yellow');
        log('2. Guarda el archivo', 'yellow');
        log('3. Ejecuta: node scripts/register-test-number.js', 'yellow');
        log('   para agregar tu número de teléfono personal', 'yellow');
      }
    }
  }
  
  console.log('\n');
}

// Ejecutar
main().catch(error => {
  log(`\n❌ Error fatal: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});

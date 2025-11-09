/**
 * ========================================
 * UTILIDAD: Verificación de Webhook Meta
 * ========================================
 * 
 * Meta requiere verificar el webhook antes de empezar a enviar eventos.
 * Este módulo maneja el proceso de verificación GET inicial.
 */

/**
 * Verifica el webhook de Meta WhatsApp
 * 
 * Meta envía una petición GET con 3 parámetros:
 * - hub.mode: debe ser "subscribe"
 * - hub.verify_token: debe coincidir con nuestro token
 * - hub.challenge: número que debemos devolver si la verificación es exitosa
 * 
 * @param {Object} query - Query parameters de la petición GET
 * @param {string} verifyToken - Token de verificación configurado en .env
 * @returns {Object} - { success: boolean, challenge?: number, error?: string }
 */
function verifyWebhook(query, verifyToken) {
  const mode = query['hub.mode'];
  const token = query['hub.verify_token'];
  const challenge = query['hub.challenge'];

  console.log('🔍 Verificación de webhook recibida:');
  console.log('   - Mode:', mode);
  console.log('   - Token recibido:', token);
  console.log('   - Challenge:', challenge);

  // Verificar que el mode sea "subscribe"
  if (mode !== 'subscribe') {
    console.error('❌ Error: hub.mode no es "subscribe"');
    return {
      success: false,
      error: 'Invalid hub.mode'
    };
  }

  // Verificar que el token coincida
  if (token !== verifyToken) {
    console.error('❌ Error: Token de verificación no coincide');
    console.error('   - Token esperado:', verifyToken);
    console.error('   - Token recibido:', token);
    return {
      success: false,
      error: 'Invalid verify token'
    };
  }

  // Todo OK - devolver el challenge
  console.log('✅ Verificación exitosa - Webhook validado');
  return {
    success: true,
    challenge: parseInt(challenge, 10)
  };
}

module.exports = {
  verifyWebhook
};

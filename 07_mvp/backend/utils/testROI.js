/**
 * Test Script para roiCalculations.js
 * 
 * Ejecutar con: node utils/testROI.js
 */

const { calculateROI, generateROISummary, calculateScenarios } = require('./roiCalculations');

console.log('🧪 TESTING ROI CALCULATIONS\n');
console.log('='.repeat(80));

// TEST 1: Caso típico clínica mediana
console.log('\n📊 TEST 1: Clínica Mediana (500 consultas/mes)');
console.log('-'.repeat(80));
try {
  const result1 = calculateROI({
    monthlyAppointments: 500,
    revenuePerAppointment: 60,
    costPerAppointment: 35
  });
  
  console.log(generateROISummary(result1));
  console.log('\n✅ TEST 1 PASÓ');
} catch (error) {
  console.error('❌ TEST 1 FALLÓ:', error.message);
}

// TEST 2: Clínica pequeña
console.log('\n\n📊 TEST 2: Clínica Pequeña (200 consultas/mes)');
console.log('-'.repeat(80));
try {
  const result2 = calculateROI({
    monthlyAppointments: 200,
    revenuePerAppointment: 50,
    costPerAppointment: 30
  });
  
  console.log(generateROISummary(result2));
  console.log('\n✅ TEST 2 PASÓ');
} catch (error) {
  console.error('❌ TEST 2 FALLÓ:', error.message);
}

// TEST 3: Clínica grande con custom rates
console.log('\n\n📊 TEST 3: Clínica Grande con tasas custom');
console.log('-'.repeat(80));
try {
  const result3 = calculateROI({
    monthlyAppointments: 1000,
    revenuePerAppointment: 70,
    costPerAppointment: 40,
    currentNoShowRate: 0.40, // 40% actual
    targetNoShowRate: 0.05   // 5% objetivo
  });
  
  console.log(generateROISummary(result3));
  console.log('\n✅ TEST 3 PASÓ');
} catch (error) {
  console.error('❌ TEST 3 FALLÓ:', error.message);
}

// TEST 4: Validación de errores - consultas = 0
console.log('\n\n📊 TEST 4: Validación - monthlyAppointments = 0');
console.log('-'.repeat(80));
try {
  calculateROI({
    monthlyAppointments: 0,
    revenuePerAppointment: 60,
    costPerAppointment: 35
  });
  console.error('❌ TEST 4 FALLÓ: Debería haber lanzado error');
} catch (error) {
  console.log('✅ TEST 4 PASÓ: Error capturado correctamente');
  console.log('   Error esperado:', error.message);
}

// TEST 5: Validación de errores - costo > ingreso
console.log('\n\n📊 TEST 5: Validación - costPerAppointment > revenuePerAppointment');
console.log('-'.repeat(80));
try {
  calculateROI({
    monthlyAppointments: 500,
    revenuePerAppointment: 30,
    costPerAppointment: 35
  });
  console.error('❌ TEST 5 FALLÓ: Debería haber lanzado error');
} catch (error) {
  console.log('✅ TEST 5 PASÓ: Error capturado correctamente');
  console.log('   Error esperado:', error.message);
}

// TEST 6: Escenarios pre-calculados
console.log('\n\n📊 TEST 6: Escenarios Pre-calculados');
console.log('-'.repeat(80));
try {
  const scenarios = calculateScenarios();
  
  scenarios.forEach(scenario => {
    console.log(`\n${scenario.name}:`);
    console.log(`  Consultas/mes: ${scenario.monthlyAppointments}`);
    console.log(`  Ahorro anual neto: $${scenario.roi.netROI.netYearlySavings.toLocaleString()}`);
    console.log(`  ROI: ${scenario.roi.netROI.roi}%`);
    console.log(`  Múltiplo retorno: ${scenario.roi.netROI.multiple}x`);
  });
  
  console.log('\n✅ TEST 6 PASÓ');
} catch (error) {
  console.error('❌ TEST 6 FALLÓ:', error.message);
}

// TEST 7: Verificación de estructura del objeto
console.log('\n\n📊 TEST 7: Verificación de Estructura del Objeto');
console.log('-'.repeat(80));
try {
  const result = calculateROI({
    monthlyAppointments: 500,
    revenuePerAppointment: 60,
    costPerAppointment: 35
  });
  
  const requiredKeys = [
    'inputs',
    'current',
    'target',
    'improvements',
    'costs',
    'netROI'
  ];
  
  let allKeysPresent = true;
  requiredKeys.forEach(key => {
    if (!result[key]) {
      console.error(`❌ Falta key: ${key}`);
      allKeysPresent = false;
    }
  });
  
  if (allKeysPresent) {
    console.log('✅ TEST 7 PASÓ: Todas las keys están presentes');
    console.log('\nKeys en el objeto:');
    Object.keys(result).forEach(key => {
      console.log(`  - ${key}:`, Object.keys(result[key]).join(', '));
    });
  } else {
    console.error('❌ TEST 7 FALLÓ: Faltan keys en el objeto');
  }
} catch (error) {
  console.error('❌ TEST 7 FALLÓ:', error.message);
}

// RESUMEN FINAL
console.log('\n\n' + '='.repeat(80));
console.log('🎉 TESTS COMPLETADOS');
console.log('='.repeat(80));
console.log('\nSi todos los tests pasaron, el módulo está listo para usar en production.');
console.log('Para integrar con el chat, asegúrate de que routes/chat.js esté actualizado.');

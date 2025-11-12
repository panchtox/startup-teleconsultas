/**
 * ROI Calculations for TeleAssist
 * 
 * Cálculos precisos de ahorro económico al reducir ausentismo en teleconsultas.
 * Estos cálculos son usados por el LLM mediante function calling para dar
 * respuestas exactas y confiables.
 */

/**
 * Calcula el ahorro mensual y proyecciones basado en datos reales del cliente
 * 
 * @param {Object} params - Parámetros del cálculo
 * @param {number} params.monthlyAppointments - Número de consultas mensuales
 * @param {number} params.revenuePerAppointment - Ingreso que recibe el cliente por consulta (en $)
 * @param {number} params.costPerAppointment - Costo que paga al médico por consulta (en $)
 * @param {number} [params.currentNoShowRate=0.33] - Tasa actual de ausentismo (default 33%)
 * @param {number} [params.targetNoShowRate=0.08] - Tasa objetivo de ausentismo (default 8%)
 * 
 * @returns {Object} Objeto con todos los cálculos de ROI
 */
function calculateROI({
  monthlyAppointments,
  revenuePerAppointment,
  costPerAppointment,
  currentNoShowRate = 0.33, // 33% industria
  targetNoShowRate = 0.08    // 8% objetivo TeleAssist
}) {
  // Validaciones
  if (!monthlyAppointments || monthlyAppointments <= 0) {
    throw new Error('monthlyAppointments debe ser mayor a 0');
  }
  if (!revenuePerAppointment || revenuePerAppointment <= 0) {
    throw new Error('revenuePerAppointment debe ser mayor a 0');
  }
  if (!costPerAppointment || costPerAppointment < 0) {
    throw new Error('costPerAppointment debe ser mayor o igual a 0');
  }
  if (costPerAppointment >= revenuePerAppointment) {
    throw new Error('costPerAppointment debe ser menor que revenuePerAppointment');
  }

  // Margen de ganancia por consulta
  const profitPerAppointment = revenuePerAppointment - costPerAppointment;

  // SITUACIÓN ACTUAL (sin TeleAssist)
  const currentNoShows = Math.round(monthlyAppointments * currentNoShowRate);
  const currentCompletedAppointments = monthlyAppointments - currentNoShows;
  const currentMonthlyRevenue = currentCompletedAppointments * revenuePerAppointment;
  const currentMonthlyCost = currentCompletedAppointments * costPerAppointment;
  const currentMonthlyProfit = currentMonthlyRevenue - currentMonthlyCost;
  
  // Pérdida por consultas no asistidas (se pagó al médico pero no hubo ingreso)
  const currentMonthlyLoss = currentNoShows * costPerAppointment;

  // SITUACIÓN CON TELEASSIST
  const targetNoShows = Math.round(monthlyAppointments * targetNoShowRate);
  const targetCompletedAppointments = monthlyAppointments - targetNoShows;
  const targetMonthlyRevenue = targetCompletedAppointments * revenuePerAppointment;
  const targetMonthlyCost = targetCompletedAppointments * costPerAppointment;
  const targetMonthlyProfit = targetMonthlyRevenue - targetMonthlyCost;

  // AHORRO Y MEJORAS
  const appointmentsRecovered = currentNoShows - targetNoShows;
  const monthlySavings = appointmentsRecovered * profitPerAppointment;
  const reductionPercentage = ((currentNoShowRate - targetNoShowRate) / currentNoShowRate) * 100;

  // PROYECCIONES
  const yearlySavings = monthlySavings * 12;
  const threeYearSavings = yearlySavings * 3;

  // COSTO TELEASSIST (estimado)
  // Pricing típico: $0.50-1 por paciente/mes
  // Asumimos ~100 pacientes activos por cada 120 consultas mensuales
  const estimatedActivePatients = Math.round(monthlyAppointments * 0.83); // 100/120 ratio
  const teleassistCostPerPatient = 0.75; // Promedio $0.75/paciente/mes
  const monthlyTeleassistCost = estimatedActivePatients * teleassistCostPerPatient;
  const yearlyTeleassistCost = monthlyTeleassistCost * 12;

  // ROI NETO
  const netMonthlySavings = monthlySavings - monthlyTeleassistCost;
  const netYearlySavings = yearlySavings - yearlyTeleassistCost;
  const roi = (netYearlySavings / yearlyTeleassistCost) * 100;
  const paybackMonths = yearlyTeleassistCost / netMonthlySavings;

  return {
    // Inputs
    inputs: {
      monthlyAppointments,
      revenuePerAppointment,
      costPerAppointment,
      profitPerAppointment,
      currentNoShowRate: Math.round(currentNoShowRate * 100),
      targetNoShowRate: Math.round(targetNoShowRate * 100)
    },

    // Situación actual
    current: {
      noShows: currentNoShows,
      completedAppointments: currentCompletedAppointments,
      monthlyRevenue: Math.round(currentMonthlyRevenue),
      monthlyCost: Math.round(currentMonthlyCost),
      monthlyProfit: Math.round(currentMonthlyProfit),
      monthlyLoss: Math.round(currentMonthlyLoss)
    },

    // Situación con TeleAssist
    target: {
      noShows: targetNoShows,
      completedAppointments: targetCompletedAppointments,
      monthlyRevenue: Math.round(targetMonthlyRevenue),
      monthlyCost: Math.round(targetMonthlyCost),
      monthlyProfit: Math.round(targetMonthlyProfit)
    },

    // Mejoras y ahorro
    improvements: {
      appointmentsRecovered,
      reductionPercentage: Math.round(reductionPercentage * 10) / 10, // 1 decimal
      monthlySavings: Math.round(monthlySavings),
      yearlySavings: Math.round(yearlySavings),
      threeYearSavings: Math.round(threeYearSavings)
    },

    // Costos TeleAssist
    costs: {
      estimatedActivePatients,
      costPerPatient: teleassistCostPerPatient,
      monthlyTeleassistCost: Math.round(monthlyTeleassistCost),
      yearlyTeleassistCost: Math.round(yearlyTeleassistCost)
    },

    // ROI neto
    netROI: {
      netMonthlySavings: Math.round(netMonthlySavings),
      netYearlySavings: Math.round(netYearlySavings),
      roi: Math.round(roi * 10) / 10, // 1 decimal
      paybackMonths: Math.round(paybackMonths * 10) / 10, // 1 decimal
      multiple: Math.round((netYearlySavings / yearlyTeleassistCost) * 10) / 10 // ej: 17x
    }
  };
}

/**
 * Genera un resumen legible en texto del cálculo de ROI
 * 
 * @param {Object} roiData - Resultado de calculateROI()
 * @returns {string} Resumen formateado
 */
function generateROISummary(roiData) {
  const { inputs, current, target, improvements, costs, netROI } = roiData;

  return `
📊 CÁLCULO DE ROI - TeleAssist

DATOS DEL CLIENTE:
• Consultas mensuales: ${inputs.monthlyAppointments}
• Ingreso por consulta: $${inputs.revenuePerAppointment}
• Costo por consulta: $${inputs.costPerAppointment}
• Ganancia por consulta: $${inputs.profitPerAppointment}

SITUACIÓN ACTUAL (sin TeleAssist):
• Tasa de ausentismo: ${inputs.currentNoShowRate}%
• Consultas perdidas/mes: ${current.noShows}
• Pérdida mensual: $${current.monthlyLoss}
• Ganancia mensual: $${current.monthlyProfit}

SITUACIÓN CON TELEASSIST:
• Tasa de ausentismo objetivo: ${inputs.targetNoShowRate}%
• Consultas perdidas/mes: ${target.noShows}
• Ganancia mensual: $${target.monthlyProfit}

💰 AHORRO Y BENEFICIOS:
• Consultas recuperadas/mes: ${improvements.appointmentsRecovered}
• Reducción de ausentismo: ${improvements.reductionPercentage}%
• Ahorro bruto mensual: $${improvements.monthlySavings}
• Ahorro bruto anual: $${improvements.yearlySavings}
• Ahorro bruto 3 años: $${improvements.threeYearSavings}

💵 COSTO TELEASSIST:
• Pacientes activos estimados: ${costs.estimatedActivePatients}
• Costo por paciente: $${costs.costPerPatient}/mes
• Costo mensual: $${costs.monthlyTeleassistCost}
• Costo anual: $${costs.yearlyTeleassistCost}

📈 ROI NETO:
• Ahorro neto mensual: $${netROI.netMonthlySavings}
• Ahorro neto anual: $${netROI.netYearlySavings}
• ROI: ${netROI.roi}%
• Retorno de inversión: ${netROI.multiple}x
• Periodo de recuperación: ${netROI.paybackMonths} meses

CONCLUSIÓN: Por cada $1 invertido en TeleAssist, el cliente recupera $${netROI.multiple} en un año.
`.trim();
}

/**
 * Calcula escenarios de diferentes tamaños de clínica
 * Útil para demos y comparaciones
 */
function calculateScenarios() {
  const scenarios = [
    {
      name: 'Clínica Pequeña',
      monthlyAppointments: 200,
      revenuePerAppointment: 50,
      costPerAppointment: 30
    },
    {
      name: 'Clínica Mediana',
      monthlyAppointments: 500,
      revenuePerAppointment: 60,
      costPerAppointment: 35
    },
    {
      name: 'Clínica Grande',
      monthlyAppointments: 1000,
      revenuePerAppointment: 70,
      costPerAppointment: 40
    },
    {
      name: 'Red de Clínicas',
      monthlyAppointments: 3000,
      revenuePerAppointment: 65,
      costPerAppointment: 38
    }
  ];

  return scenarios.map(scenario => ({
    ...scenario,
    roi: calculateROI(scenario)
  }));
}

module.exports = {
  calculateROI,
  generateROISummary,
  calculateScenarios
};

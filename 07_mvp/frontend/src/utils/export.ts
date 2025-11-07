/**
 * Export Utilities
 * 
 * Funciones para exportar datos de pacientes en diferentes formatos
 */

import { Patient } from '@/types/patient';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Exporta pacientes a CSV
 */
export function exportPatientsToCSV(patients: Patient[], filename = 'pacientes') {
  // Definir headers
  const headers = [
    'ID',
    'Nombre Completo',
    'DNI',
    'Edad',
    'Teléfono',
    'Email',
    'Provincia',
    'Ciudad',
    'Obra Social',
    'Score',
    'Nivel',
    'Total Consultas',
    'Asistidas',
    'Ausencias',
    'Canceladas',
    'Tasa Asistencia (%)',
    'Última Consulta',
    'Badges'
  ];

  // Convertir pacientes a filas
  const rows = patients.map(patient => [
    patient.id,
    patient.fullName,
    patient.demographics.identificationNumber,
    patient.demographics.age,
    patient.contact.phone,
    patient.contact.email,
    patient.contact.province,
    patient.contact.city,
    patient.demographics.healthInsurance || 'Sin obra social',
    patient.score,
    patient.level,
    patient.stats.totalConsultations,
    patient.stats.attendedConsultations,
    patient.stats.missedConsultations,
    patient.stats.canceledConsultations,
    patient.stats.attendanceRate,
    patient.stats.lastConsultationDate 
      ? format(patient.stats.lastConsultationDate, 'dd/MM/yyyy HH:mm', { locale: es })
      : 'Sin consultas',
    patient.badges.map(b => b.name).join('; ')
  ]);

  // Crear contenido CSV
  const csvContent = [
    headers.join(','),
    ...rows.map(row => 
      row.map(cell => 
        // Escapar comillas y envolver en comillas si contiene coma
        typeof cell === 'string' && (cell.includes(',') || cell.includes('"'))
          ? `"${cell.replace(/"/g, '""')}"`
          : cell
      ).join(',')
    )
  ].join('\n');

  // Agregar BOM para Excel
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Descargar archivo
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${format(new Date(), 'yyyyMMdd_HHmmss')}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exporta pacientes a JSON
 */
export function exportPatientsToJSON(patients: Patient[], filename = 'pacientes') {
  const jsonContent = JSON.stringify(patients, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${format(new Date(), 'yyyyMMdd_HHmmss')}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Copia datos de pacientes al portapapeles
 */
export async function copyPatientsToClipboard(patients: Patient[]): Promise<boolean> {
  try {
    const text = patients.map(p => 
      `${p.fullName} (${p.demographics.identificationType} ${p.demographics.identificationNumber}) - Score: ${p.score} - Nivel: ${p.level}`
    ).join('\n');
    
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Error al copiar al portapapeles:', error);
    return false;
  }
}

/**
 * Genera un resumen estadístico de pacientes
 */
export function generatePatientsSummary(patients: Patient[]) {
  const total = patients.length;
  const avgScore = patients.reduce((sum, p) => sum + p.score, 0) / total;
  const avgAttendance = patients.reduce((sum, p) => sum + p.stats.attendanceRate, 0) / total;
  
  const byLevel = patients.reduce((acc, p) => {
    acc[p.level] = (acc[p.level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const withBadges = patients.filter(p => p.badges.length > 0).length;
  const atRisk = patients.filter(p => p.level === 'En Riesgo').length;
  
  return {
    total,
    avgScore: Math.round(avgScore * 10) / 10,
    avgAttendance: Math.round(avgAttendance * 10) / 10,
    byLevel,
    withBadges,
    atRisk,
    percentageAtRisk: Math.round((atRisk / total) * 1000) / 10
  };
}

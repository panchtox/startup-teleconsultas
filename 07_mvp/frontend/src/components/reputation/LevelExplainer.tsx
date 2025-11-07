import { Card } from '../ui/card';
import { LEVEL_INFO } from '../../mock-data/reputation';
import { PatientLevel } from '../../types/patient';

export function LevelExplainer() {
  const levels: PatientLevel[] = ['Elite', 'Premium', 'Estándar', 'Nuevo', 'En Riesgo'];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Sistema de Niveles</h2>
        <p className="text-gray-600 mt-1">
          Los pacientes son evaluados según su asistencia, puntualidad y engagement
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {levels.map((levelKey) => {
          const level = LEVEL_INFO[levelKey];
          return (
            <Card key={levelKey} className={`p-6 border-2 ${level.borderColor}`}>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${level.bgColor} mb-4`}>
                <span className="text-2xl">{level.icon}</span>
                <span className={`font-semibold ${level.color} capitalize`}>
                  {level.level}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3">{level.description}</p>

              <div className="mb-3">
                <div className="text-xs font-medium text-gray-500 mb-1">
                  Score: {level.minScore} - {level.maxScore}
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${level.bgColor.replace('50', '500')}`}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Beneficios:</h4>
                <ul className="space-y-1">
                  {level.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Cómo mejorar el score</h3>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• <strong>Asistir puntualmente</strong> a las consultas programadas (+5 puntos)</li>
          <li>• <strong>Confirmar turnos</strong> dentro de las primeras 24hs (+2 puntos)</li>
          <li>• <strong>Avisar cancelaciones</strong> con más de 24hs de anticipación (sin penalización)</li>
          <li>• <strong>Completar encuestas</strong> de satisfacción (+1 punto)</li>
          <li>• <strong>Usar la plataforma</strong> activamente para gestiones (+1 punto)</li>
        </ul>
      </Card>
    </div>
  );
}

import { AlertCircle, CheckCircle2 } from "lucide-react";

export function ProblemSolution() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            El problema que nadie está resolviendo
          </h2>
        </div>
        
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Problem */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <AlertCircle className="h-7 w-7 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">El Problema</h3>
            </div>
            
            <div className="space-y-4 text-gray-600">
              <p className="text-lg font-medium text-gray-900">
                33% de ausentismo en teleconsultas es la norma en LATAM
              </p>
              
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-red-500">•</span>
                  <span>$72,000 USD perdidos por médico/año</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500">•</span>
                  <span>156 horas médicas desperdiciadas cada mes</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500">•</span>
                  <span>Pacientes que olvidan sus citas o no sienten compromiso</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500">•</span>
                  <span>Recordatorios genéricos por email que nadie lee</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500">•</span>
                  <span>Sin incentivos para la asistencia responsable</span>
                </li>
              </ul>
              
              <div className="mt-6 rounded-lg bg-red-50 p-4 border border-red-200">
                <p className="text-sm font-medium text-red-800">
                  Las plataformas de telemedicina resuelven la consulta remota, 
                  pero no el ausentismo. Es el eslabón perdido del sistema.
                </p>
              </div>
            </div>
          </div>
          
          {/* Solution */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                <CheckCircle2 className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Nuestra Solución</h3>
            </div>
            
            <div className="space-y-4 text-gray-600">
              <p className="text-lg font-medium text-primary-900">
                Reducción del 73% en ausentismo con engagement inteligente
              </p>
              
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>WhatsApp automatizado en momentos clave (48hs, 24hs, 2hs)</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>Sistema de reputación que premia la responsabilidad</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>Gamificación con 5 niveles y badges desbloqueables</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>Dashboard con ROI medible en tiempo real</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>Integración plug & play con tu plataforma actual</span>
                </li>
              </ul>
              
              <div className="mt-6 rounded-lg bg-primary-50 p-4 border border-primary-200">
                <p className="text-sm font-medium text-primary-800">
                  No competimos con plataformas de telemedicina. Las hacemos más 
                  rentables al asegurar que cada consulta agendada suceda realmente.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-10 sm:px-12 sm:py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="text-2xl font-bold text-white sm:text-3xl mb-8">
              Resultados Promedio en Primeros 3 Meses
            </h3>
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <div className="text-4xl font-bold text-white">33% → 9%</div>
                <div className="mt-2 text-primary-100">Tasa de ausentismo</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">$18K</div>
                <div className="mt-2 text-primary-100">Ahorrado por trimestre</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">92%</div>
                <div className="mt-2 text-primary-100">Satisfacción pacientes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

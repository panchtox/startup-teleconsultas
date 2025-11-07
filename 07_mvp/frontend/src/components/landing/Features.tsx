import { 
  MessageSquare, 
  Trophy, 
  BarChart3, 
  Shield, 
  Zap, 
  Puzzle 
} from "lucide-react";

const features = [
  {
    name: 'Recordatorios Inteligentes',
    description: 'WhatsApp automatizado con múltiples puntos de contacto: 48hs, 24hs y 2hs antes. Mensajes personalizados que generan engagement.',
    icon: MessageSquare,
  },
  {
    name: 'Sistema de Reputación',
    description: '5 niveles de scoring (0-100) con gamificación. Los pacientes responsables obtienen badges, beneficios y reconocimiento visual.',
    icon: Trophy,
  },
  {
    name: 'Analytics en Tiempo Real',
    description: 'Dashboard con métricas clave: tasa de ausentismo, horas recuperadas, ROI calculado. Exportá reportes en segundos.',
    icon: BarChart3,
  },
  {
    name: 'Plug & Play',
    description: 'Integrá tu plataforma de telemedicina existente en minutos. No competimos, potenciamos tu sistema actual.',
    icon: Puzzle,
  },
  {
    name: 'Seguridad Médica',
    description: 'HIPAA compliant. Datos encriptados end-to-end. Cumplimiento de normativas de salud argentinas e internacionales.',
    icon: Shield,
  },
  {
    name: 'Implementación Rápida',
    description: 'Setup en menos de 1 semana. Onboarding guiado. Soporte dedicado en español. Resultados visibles desde el primer mes.',
    icon: Zap,
  },
];

export function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">
            Todo lo que necesitás
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Una solución completa para reducir el ausentismo
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            No reemplazamos tu plataforma de telemedicina. La complementamos con 
            inteligencia en comunicación y fidelización de pacientes.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

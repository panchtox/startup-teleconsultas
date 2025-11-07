import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: 'Free',
    id: 'tier-free',
    href: '#demo',
    price: { monthly: '$0' },
    description: 'Perfecto para probar el sistema con un médico o especialidad.',
    features: [
      'Hasta 100 pacientes/mes',
      'Recordatorios WhatsApp básicos',
      'Dashboard con métricas clave',
      'Sistema de reputación completo',
      'Soporte por email',
    ],
    cta: 'Comenzar Gratis',
    featured: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    href: '#demo',
    price: { monthly: '$0.50-1.00', unit: 'por paciente activo/mes' },
    description: 'Para clínicas y sistemas de salud que quieren escalar.',
    features: [
      'Pacientes ilimitados',
      'Recordatorios multi-canal (WhatsApp, SMS, Email)',
      'Analytics avanzado con exportación',
      'Integración API completa',
      'Templates personalizables',
      'Soporte prioritario 24/7',
      'Onboarding dedicado',
      'SLA 99.9% uptime',
    ],
    cta: 'Solicitar Demo',
    featured: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#demo',
    price: { monthly: 'Contactar' },
    description: 'Para redes de salud con necesidades específicas.',
    features: [
      'Todo en Pro +',
      'Infraestructura dedicada',
      'White-label completo',
      'Custom integraciones',
      'Múltiples organizaciones',
      'Reportes personalizados',
      'Account manager dedicado',
      'SLA personalizado',
    ],
    cta: 'Contactar Ventas',
    featured: false,
  },
];

export function Pricing() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Un plan para cada etapa
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Comenzá gratis y escalá cuando estés listo. Sin costos ocultos, sin compromisos de largo plazo.
        </p>
        
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col justify-between rounded-3xl p-8 shadow-sm ring-1 ${
                tier.featured
                  ? 'bg-primary-600 ring-primary-600'
                  : 'bg-white ring-gray-200'
              }`}
            >
              <div>
                <h3
                  className={`text-xl font-semibold leading-7 ${
                    tier.featured ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`mt-4 text-sm leading-6 ${
                    tier.featured ? 'text-primary-100' : 'text-gray-600'
                  }`}
                >
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span
                    className={`text-4xl font-bold tracking-tight ${
                      tier.featured ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {tier.price.monthly}
                  </span>
                  {tier.price.unit && (
                    <span
                      className={`text-sm font-semibold leading-6 ${
                        tier.featured ? 'text-primary-100' : 'text-gray-600'
                      }`}
                    >
                      {tier.price.unit}
                    </span>
                  )}
                </p>
                <ul
                  role="list"
                  className={`mt-8 space-y-3 text-sm leading-6 ${
                    tier.featured ? 'text-primary-100' : 'text-gray-600'
                  }`}
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check
                        className={`h-6 w-5 flex-none ${
                          tier.featured ? 'text-white' : 'text-primary-600'
                        }`}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button
                asChild
                className={`mt-8 ${
                  tier.featured
                    ? 'bg-white text-primary-600 hover:bg-primary-50'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                <Link to={tier.href}>{tier.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
        
        {/* Additional info */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-600">
            <strong>Todos los planes incluyen:</strong> 14 días de prueba gratis • 
            Cancelación en cualquier momento • Migración de datos sin costo • 
            Soporte en español
          </p>
        </div>
      </div>
    </div>
  );
}

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Martín Rodríguez",
    role: "Director Médico",
    company: "Clínica San Martín, Buenos Aires",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Martin",
    content: "Pasamos de perder 18 horas semanales por ausencias a apenas 3. El sistema de reputación cambió completamente la cultura de responsabilidad en nuestros pacientes. El ROI fue evidente desde el primer mes.",
    rating: 5,
  },
  {
    name: "Dra. Carolina Méndez",
    role: "Coordinadora de Telemedicina",
    company: "Hospital Privado del Sur, Rosario",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carolina",
    content: "La integración con nuestra plataforma fue inmediata. Lo que más me sorprendió fue cómo los pacientes comenzaron a valorar sus consultas cuando vieron el sistema de niveles y badges. Ya no es 'una cita más', es parte de su experiencia.",
    rating: 5,
  },
  {
    name: "Lic. Roberto Gómez",
    role: "Gerente de Operaciones",
    company: "Red de Salud OSUNIC, Córdoba",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
    content: "Implementamos la solución en 4 días. A los 2 meses recuperamos la inversión completa. El dashboard nos da visibilidad total del ausentismo por especialidad y médico. Datos que antes no teníamos.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">
            Testimonios
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Sistemas de salud que ya están recuperando tiempo
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col justify-between rounded-2xl bg-gray-50 p-8 shadow-sm ring-1 ring-gray-200"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary-500 text-primary-500" />
                  ))}
                </div>
                <p className="text-base leading-7 text-gray-700">
                  "{testimonial.content}"
                </p>
              </div>
              
              <div className="mt-6 flex items-center gap-x-4">
                <img
                  className="h-12 w-12 rounded-full bg-gray-200"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

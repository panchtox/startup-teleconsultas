import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";

export function DemoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    size: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form submitted:", formData);
    setSubmitted(true);
    
    // Reset after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        role: "",
        size: "",
        phone: "",
        message: "",
      });
    }, 5000);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl bg-primary-50 p-12 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-primary-600" />
        <h3 className="mt-4 text-2xl font-bold text-gray-900">
          ¡Solicitud recibida!
        </h3>
        <p className="mt-2 text-gray-600">
          Nos pondremos en contacto en las próximas 24 horas para coordinar tu demo personalizada.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white py-24 sm:py-32" id="demo">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Solicitar Demo Personalizada
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Descubrí cómo podemos reducir el ausentismo en tu sistema de salud. 
            Demo de 20 minutos con datos de tu organización.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mt-12 max-w-xl">
          <div className="grid grid-cols-1 gap-6">
            {/* Name */}
            <div>
              <Label htmlFor="name">Nombre completo *</Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Juan Pérez"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email corporativo *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="juan.perez@clinica.com"
              />
            </div>

            {/* Company */}
            <div>
              <Label htmlFor="company">Organización *</Label>
              <Input
                id="company"
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Clínica San Martín"
              />
            </div>

            {/* Role */}
            <div>
              <Label htmlFor="role">Cargo *</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccioná tu cargo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="director">Director Médico</SelectItem>
                  <SelectItem value="gerente">Gerente de Operaciones</SelectItem>
                  <SelectItem value="coordinador">Coordinador de Telemedicina</SelectItem>
                  <SelectItem value="it">Responsable IT</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Size */}
            <div>
              <Label htmlFor="size">Tamaño de la organización *</Label>
              <Select
                value={formData.size}
                onValueChange={(value) => setFormData({ ...formData, size: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccioná el tamaño" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1-5 médicos</SelectItem>
                  <SelectItem value="6-20">6-20 médicos</SelectItem>
                  <SelectItem value="21-50">21-50 médicos</SelectItem>
                  <SelectItem value="51-200">51-200 médicos</SelectItem>
                  <SelectItem value="201+">Más de 200 médicos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Teléfono (opcional)</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+54 9 11 1234-5678"
              />
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message">Mensaje (opcional)</Label>
              <Textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Contanos brevemente sobre tu organización y qué te gustaría ver en la demo..."
              />
            </div>
          </div>

          <div className="mt-8">
            <Button type="submit" size="lg" className="w-full">
              Solicitar Demo Gratuita
            </Button>
            <p className="mt-3 text-center text-sm text-gray-500">
              Respondemos en menos de 24 horas • Sin compromiso
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

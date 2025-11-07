import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { allPatients } from '@/mock-data/patients';
import { MOCK_DOCTORS } from '@/mock-data/doctors';
import type { Appointment, AppointmentType, AppointmentStatus } from '@/types/appointment';
import { format } from 'date-fns';

interface AppointmentFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (appointment: Partial<Appointment>) => void;
  appointment?: Appointment | null;
  initialDate?: Date;
}

const APPOINTMENT_TYPES: { value: AppointmentType; label: string }[] = [
  { value: 'first-time', label: 'Primera Vez' },
  { value: 'follow-up', label: 'Seguimiento' },
  { value: 'control', label: 'Control' },
  { value: 'emergency', label: 'Urgencia' },
  { value: 'routine', label: 'Rutina' },
];

const APPOINTMENT_STATUSES: { value: AppointmentStatus; label: string }[] = [
  { value: 'scheduled', label: 'Programada' },
  { value: 'confirmed', label: 'Confirmada' },
  { value: 'in-progress', label: 'En Curso' },
  { value: 'completed', label: 'Completada' },
  { value: 'cancelled', label: 'Cancelada' },
  { value: 'no-show', label: 'Ausente' },
];

const DURATIONS = [15, 30, 45, 60, 90, 120];

export function AppointmentFormDialog({
  isOpen,
  onClose,
  onSave,
  appointment,
  initialDate,
}: AppointmentFormDialogProps) {
  const [formData, setFormData] = useState<Partial<Appointment>>({
    patientId: '',
    doctorId: '',
    date: initialDate || new Date(),
    startTime: '09:00',
    duration: 30,
    type: 'routine',
    status: 'scheduled',
    modality: 'telemedicine',
    reason: '',
    notes: '',
  });

  const [selectedPatient, setSelectedPatient] = useState<typeof allPatients[0] | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<typeof MOCK_DOCTORS[0] | null>(null);

  useEffect(() => {
    if (appointment) {
      setFormData({
        ...appointment,
      });
      const patient = allPatients.find((p) => p.id === appointment.patientId);
      const doctor = MOCK_DOCTORS.find((d) => d.id === appointment.doctorId);
      setSelectedPatient(patient || null);
      setSelectedDoctor(doctor || null);
    } else if (initialDate) {
      setFormData((prev) => ({ ...prev, date: initialDate }));
    }
  }, [appointment, initialDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPatient || !selectedDoctor) {
      alert('Por favor selecciona un paciente y un médico');
      return;
    }

    const [hour, minute] = formData.startTime!.split(':').map(Number);
    const endHour = hour + Math.floor(formData.duration! / 60);
    const endMinute = minute + (formData.duration! % 60);
    const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;

    const appointmentData: Partial<Appointment> = {
      ...formData,
      patientName: selectedPatient.fullName,
      patientPhone: selectedPatient.contact.phone,
      doctorName: `${selectedDoctor.firstName} ${selectedDoctor.lastName}`,
      specialty: selectedDoctor.specialty,
      endTime,
      reminders: appointment?.reminders || [],
    };

    onSave(appointmentData);
    onClose();
  };

  const handlePatientChange = (patientId: string) => {
    const patient = allPatients.find((p) => p.id === patientId);
    setSelectedPatient(patient || null);
    setFormData((prev) => ({ ...prev, patientId }));
  };

  const handleDoctorChange = (doctorId: string) => {
    const doctor = MOCK_DOCTORS.find((d) => d.id === doctorId);
    setSelectedDoctor(doctor || null);
    setFormData((prev) => ({ 
      ...prev, 
      doctorId,
      specialty: doctor?.specialty || prev.specialty,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {appointment ? 'Editar Consulta' : 'Nueva Consulta'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Paciente */}
          <div className="space-y-2">
            <Label htmlFor="patient">Paciente *</Label>
            <Select value={formData.patientId} onValueChange={handlePatientChange}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar paciente" />
              </SelectTrigger>
              <SelectContent>
                {allPatients.slice(0, 50).map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.fullName} - DNI {patient.demographics.identificationNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Médico */}
          <div className="space-y-2">
            <Label htmlFor="doctor">Médico *</Label>
            <Select value={formData.doctorId} onValueChange={handleDoctorChange}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar médico" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_DOCTORS.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    Dr. {doctor.firstName} {doctor.lastName} - {doctor.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Fecha y Hora */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Fecha *</Label>
              <Input
                id="date"
                type="date"
                value={format(formData.date!, 'yyyy-MM-dd')}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, date: new Date(e.target.value) }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Hora de Inicio *</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, startTime: e.target.value }))
                }
                required
              />
            </div>
          </div>

          {/* Duración */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duración (minutos) *</Label>
            <Select
              value={formData.duration?.toString()}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, duration: parseInt(value) }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DURATIONS.map((duration) => (
                  <SelectItem key={duration} value={duration.toString()}>
                    {duration} minutos
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipo y Modalidad */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, type: value as AppointmentType }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {APPOINTMENT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="modality">Modalidad *</Label>
              <Select
                value={formData.modality}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, modality: value as 'telemedicine' | 'in-person' }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="telemedicine">Telemedicina</SelectItem>
                  <SelectItem value="in-person">Presencial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Estado */}
          <div className="space-y-2">
            <Label htmlFor="status">Estado *</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, status: value as AppointmentStatus }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {APPOINTMENT_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Motivo */}
          <div className="space-y-2">
            <Label htmlFor="reason">Motivo de Consulta *</Label>
            <Input
              id="reason"
              value={formData.reason}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, reason: e.target.value }))
              }
              placeholder="Ej: Control anual, dolor de cabeza..."
              required
            />
          </div>

          {/* Notas */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notas Adicionales</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              placeholder="Notas adicionales sobre la consulta..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary-600 hover:bg-primary-700">
              {appointment ? 'Guardar Cambios' : 'Crear Consulta'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

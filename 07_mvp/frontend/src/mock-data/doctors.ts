/**
 * Mock doctor data - 15 médicos argentinos
 */

import type { Doctor, Specialty } from '../types';

const SPECIALTIES: Specialty[] = [
  'Medicina General',
  'Cardiología',
  'Pediatría',
  'Psicología',
  'Dermatología',
  'Ginecología',
  'Traumatología',
  'Oftalmología',
  'Nutrición',
  'Kinesiología'
];

const DOCTOR_NAMES = [
  { firstName: 'María', lastName: 'González' },
  { firstName: 'Juan', lastName: 'Rodríguez' },
  { firstName: 'Ana', lastName: 'Martínez' },
  { firstName: 'Carlos', lastName: 'López' },
  { firstName: 'Laura', lastName: 'Fernández' },
  { firstName: 'Diego', lastName: 'Pérez' },
  { firstName: 'Silvina', lastName: 'García' },
  { firstName: 'Martín', lastName: 'Sánchez' },
  { firstName: 'Valeria', lastName: 'Romero' },
  { firstName: 'Federico', lastName: 'Torres' },
  { firstName: 'Gabriela', lastName: 'Álvarez' },
  { firstName: 'Sebastián', lastName: 'Benítez' },
  { firstName: 'Carolina', lastName: 'Morales' },
  { firstName: 'Javier', lastName: 'Castro' },
  { firstName: 'Luciana', lastName: 'Díaz' }
];

const UNIVERSITIES = [
  'Universidad de Buenos Aires (UBA)',
  'Universidad Nacional de Córdoba',
  'Universidad Nacional de La Plata',
  'Universidad Austral',
  'Universidad Favaloro',
  'Universidad del Salvador',
  'Universidad Maimónides'
];

function generateDoctor(index: number): Doctor {
  const name = DOCTOR_NAMES[index];
  const specialty = SPECIALTIES[index % SPECIALTIES.length];
  const experience = 3 + Math.floor(Math.random() * 25);
  const joinedYearsAgo = Math.floor(Math.random() * 5);
  
  return {
    id: `doc-${String(index + 1).padStart(3, '0')}`,
    firstName: name.firstName,
    lastName: name.lastName,
    specialty,
    licenseNumber: `MN ${10000 + index}`,
    email: `${name.firstName.toLowerCase()}.${name.lastName.toLowerCase()}@clinica.com.ar`,
    phone: `+54 11 ${4000 + index}-${1000 + Math.floor(Math.random() * 9000)}`,
    bio: `${specialty} con ${experience} años de experiencia en atención médica. Especializado en teleconsultas y atención personalizada.`,
    education: [
      {
        degree: `Médico ${specialty === 'Medicina General' ? 'Generalista' : 'Especialista en ' + specialty}`,
        institution: UNIVERSITIES[Math.floor(Math.random() * UNIVERSITIES.length)],
        year: new Date().getFullYear() - experience - 6
      }
    ],
    experience,
    languages: ['Español', ...(Math.random() > 0.6 ? ['Inglés'] : [])],
    consultationFee: Math.round((3000 + Math.random() * 7000) / 100) * 100,
    availability: generateAvailability(),
    rating: 4 + Math.random(),
    totalReviews: Math.floor(Math.random() * 200) + 20,
    status: Math.random() > 0.05 ? 'active' : 'on-leave',
    joinedAt: new Date(new Date().setFullYear(new Date().getFullYear() - joinedYearsAgo))
  };
}

function generateAvailability() {
  const availability = [];
  
  // Lunes a Viernes (típico)
  for (let day = 1; day <= 5; day++) {
    // Mañana o tarde
    if (Math.random() > 0.3) {
      availability.push({
        dayOfWeek: day,
        startTime: '09:00',
        endTime: '13:00'
      });
    }
    
    if (Math.random() > 0.4) {
      availability.push({
        dayOfWeek: day,
        startTime: '14:00',
        endTime: '18:00'
      });
    }
  }
  
  // Algunos trabajan sábados
  if (Math.random() > 0.7) {
    availability.push({
      dayOfWeek: 6,
      startTime: '09:00',
      endTime: '13:00'
    });
  }
  
  return availability;
}

export const MOCK_DOCTORS: Doctor[] = Array.from({ length: 15 }, (_, i) => generateDoctor(i));

/**
 * Get a doctor by ID
 */
export function getDoctorById(id: string): Doctor | undefined {
  return MOCK_DOCTORS.find(d => d.id === id);
}

/**
 * Get doctors by specialty
 */
export function getDoctorsBySpecialty(specialty: Specialty): Doctor[] {
  return MOCK_DOCTORS.filter(d => d.specialty === specialty);
}

/**
 * Get active doctors
 */
export function getActiveDoctors(): Doctor[] {
  return MOCK_DOCTORS.filter(d => d.status === 'active');
}

/**
 * Get random doctor
 */
export function getRandomDoctor(): Doctor {
  const activeDoctors = getActiveDoctors();
  return activeDoctors[Math.floor(Math.random() * activeDoctors.length)];
}

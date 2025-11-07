/**
 * PatientsTable Component
 * 
 * Tabla principal de gestión de pacientes con:
 * - Búsqueda en tiempo real
 * - Filtros múltiples
 * - Ordenamiento por columnas
 * - Paginación
 * - Acciones por paciente
 */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScoreBadgeCompact } from './ScoreBadge';
import { Patient, PatientLevel } from '@/types/patient';
import {
Search, 
Filter, 
ChevronLeft, 
ChevronRight,
Eye,
MessageSquare,
Calendar,
AlertCircle,
ArrowUpDown,
ArrowUp,
ArrowDown,
  Download
} from 'lucide-react';
import { exportPatientsToCSV } from '@/utils/export';

interface PatientsTableProps {
  patients: Patient[];
  onViewProfile?: (patientId: string) => void;
  onSendMessage?: (patientId: string) => void;
  onScheduleConsultation?: (patientId: string) => void;
}

type SortField = 'fullName' | 'score' | 'lastConsultation' | 'attendanceRate';
type SortDirection = 'asc' | 'desc';

export function PatientsTable({ 
  patients,
  onViewProfile,
  onSendMessage,
  onScheduleConsultation 
}: PatientsTableProps) {
  const navigate = useNavigate();
  
  // Estados
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevels, setSelectedLevels] = useState<PatientLevel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('fullName');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [showFilters, setShowFilters] = useState(false);
  
  const pageSize = 20;
  
  // Filtrado y búsqueda
  const filteredPatients = useMemo(() => {
    let filtered = [...patients];
    
    // Búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(patient =>
        patient.fullName.toLowerCase().includes(query) ||
        patient.demographics.identificationNumber.includes(query) ||
        patient.contact.phone.includes(query) ||
        patient.contact.email.toLowerCase().includes(query)
      );
    }
    
    // Filtro por nivel
    if (selectedLevels.length > 0) {
      filtered = filtered.filter(patient =>
        selectedLevels.includes(patient.level)
      );
    }
    
    return filtered;
  }, [patients, searchQuery, selectedLevels]);
  
  // Ordenamiento
  const sortedPatients = useMemo(() => {
    const sorted = [...filteredPatients];
    
    sorted.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'fullName':
          comparison = a.fullName.localeCompare(b.fullName);
          break;
        case 'score':
          comparison = a.score - b.score;
          break;
        case 'lastConsultation':
          const dateA = a.stats.lastConsultationDate?.getTime() || 0;
          const dateB = b.stats.lastConsultationDate?.getTime() || 0;
          comparison = dateA - dateB;
          break;
        case 'attendanceRate':
          comparison = a.stats.attendanceRate - b.stats.attendanceRate;
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  }, [filteredPatients, sortField, sortDirection]);
  
  // Paginación
  const totalPages = Math.ceil(sortedPatients.length / pageSize);
  const paginatedPatients = sortedPatients.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  // Handlers
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const handleLevelToggle = (level: PatientLevel) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
    setCurrentPage(1); // Reset a primera página
  };
  
  const handleViewProfile = (patientId: string) => {
    if (onViewProfile) {
      onViewProfile(patientId);
    } else {
      navigate(`/patients/${patientId}`);
    }
  };
  
  // Helpers
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    return `${parts[0]?.[0] || ''}${parts[1]?.[0] || ''}`.toUpperCase();
  };
  
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="h-4 w-4" />
      : <ArrowDown className="h-4 w-4" />;
  };
  
  return (
    <div className="space-y-4">
      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Búsqueda */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, DNI, teléfono o email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9"
          />
        </div>
        
        {/* Botones */}
        <div className="flex gap-2 w-full md:w-auto">
          <Button
            variant={showFilters ? "default" : "outline"}
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex-1 md:flex-initial"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
            {selectedLevels.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedLevels.length}
              </Badge>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportPatientsToCSV(sortedPatients, 'pacientes_conectasalud')}
            className="flex-1 md:flex-initial"
            title="Exportar a CSV"
          >
            <Download className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Exportar</span>
          </Button>
        </div>
      </div>
      
      {/* Panel de filtros */}
      {showFilters && (
        <div className="p-4 border rounded-lg bg-muted/30">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Filtrar por nivel</h3>
            <div className="flex flex-wrap gap-2">
              {(['Elite', 'Premium', 'Estándar', 'Nuevo', 'En Riesgo'] as PatientLevel[]).map(level => (
                <Button
                  key={level}
                  variant={selectedLevels.includes(level) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleLevelToggle(level)}
                >
                  {level}
                </Button>
              ))}
            </div>
            
            {selectedLevels.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedLevels([])}
                className="text-muted-foreground"
              >
                Limpiar filtros
              </Button>
            )}
          </div>
        </div>
      )}
      
      {/* Resultados */}
      <div className="text-sm text-muted-foreground">
        Mostrando {paginatedPatients.length} de {sortedPatients.length} pacientes
        {searchQuery && ` (filtrado de ${patients.length} total)`}
      </div>
      
      {/* Tabla */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paciente</TableHead>
              
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('score')}
              >
                <div className="flex items-center gap-1">
                  Score / Nivel
                  {getSortIcon('score')}
                </div>
              </TableHead>
              
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('lastConsultation')}
              >
                <div className="flex items-center gap-1">
                  Última Consulta
                  {getSortIcon('lastConsultation')}
                </div>
              </TableHead>
              
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('attendanceRate')}
              >
                <div className="flex items-center gap-1">
                  Asistencia
                  {getSortIcon('attendanceRate')}
                </div>
              </TableHead>
              
              <TableHead>Contacto</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {paginatedPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Search className="h-8 w-8 opacity-50" />
                    <p>No se encontraron pacientes</p>
                    <p className="text-sm">
                      Intenta ajustar los filtros o búsqueda
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedPatients.map((patient) => (
                <TableRow 
                  key={patient.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleViewProfile(patient.id)}
                >
                  {/* Paciente */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(patient.fullName)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <p className="font-medium">{patient.fullName}</p>
                        <p className="text-sm text-muted-foreground">
                          {patient.demographics.identificationType} {patient.demographics.identificationNumber}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  
                  {/* Score / Nivel */}
                  <TableCell>
                    <ScoreBadgeCompact score={patient.score} level={patient.level} />
                  </TableCell>
                  
                  {/* Última Consulta */}
                  <TableCell>
                    {patient.stats.lastConsultationDate ? (
                      <div className="text-sm">
                        <p>
                          {format(patient.stats.lastConsultationDate, 'dd MMM yyyy', { locale: es })}
                        </p>
                        <p className="text-muted-foreground">
                          {format(patient.stats.lastConsultationDate, 'HH:mm')}
                        </p>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Sin consultas</span>
                    )}
                  </TableCell>
                  
                  {/* Asistencia */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>{patient.stats.attendanceRate}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all"
                            style={{ width: `${patient.stats.attendanceRate}%` }}
                          />
                        </div>
                      </div>
                      
                      {patient.stats.consecutiveMisses >= 2 && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  
                  {/* Contacto */}
                  <TableCell>
                    <div className="text-sm">
                      <p>{patient.contact.phone}</p>
                      <p className="text-muted-foreground truncate max-w-[150px]">
                        {patient.contact.email}
                      </p>
                    </div>
                  </TableCell>
                  
                  {/* Acciones */}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewProfile(patient.id);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      {onSendMessage && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSendMessage(patient.id);
                          }}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {onScheduleConsultation && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onScheduleConsultation(patient.id);
                          }}
                        >
                          <Calendar className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </p>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Anterior
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Siguiente
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

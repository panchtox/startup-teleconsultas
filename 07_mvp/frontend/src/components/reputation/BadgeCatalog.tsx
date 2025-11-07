import { Card } from '../ui/card';
import { Badge as BadgeUI } from '../ui/badge';
import { Progress } from '../ui/progress';
import { ALL_BADGES, getBadgeProgress } from '../../mock-data/reputation';
import { Badge, Patient } from '../../types/patient';
import { useState } from 'react';
import { allPatients } from '../../mock-data/patients';

const RARITY_COLORS: Record<string, string> = {
  'común': 'bg-gray-100 text-gray-700 border-gray-300',
  'raro': 'bg-blue-100 text-blue-700 border-blue-300',
  'épico': 'bg-purple-100 text-purple-700 border-purple-300',
  'legendario': 'bg-yellow-100 text-yellow-700 border-yellow-300'
};

const CATEGORY_LABELS = {
  asistencia: 'Asistencia',
  puntualidad: 'Puntualidad',
  engagement: 'Compromiso',
  salud: 'Salud',
  especial: 'Especial'
};

export function BadgeCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showProgress, setShowProgress] = useState(false);
  
  // Usar el primer paciente como ejemplo para el progreso
  const examplePatientId = allPatients[0]?.id;
  const badgeProgress = showProgress && examplePatientId 
    ? getBadgeProgress(examplePatientId) 
    : [];

  const categories = Array.from(new Set(ALL_BADGES.map(b => b.category)));
  
  const filteredBadges = selectedCategory
    ? ALL_BADGES.filter(b => b.category === selectedCategory)
    : ALL_BADGES;

  const getBadgeStats = (badge: Badge) => {
    const totalPatients = allPatients.length;
    const patientsWithBadge = allPatients.filter((p: Patient) => 
      p.badges.some((b: Badge) => b.id === badge.id)
    ).length;
    const percentage = Math.round((patientsWithBadge / totalPatients) * 100);
    
    return { count: patientsWithBadge, percentage };
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Catálogo de Badges</h2>
        <p className="text-gray-600 mt-1">
          {ALL_BADGES.length} insignias disponibles para obtener
        </p>
      </div>

      {/* Filtros */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Filtrar por categoría:</span>
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todas ({ALL_BADGES.length})
          </button>
          {categories.map((category) => {
            const count = ALL_BADGES.filter(b => b.category === category).length;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]} ({count})
              </button>
            );
          })}
        </div>

        <div className="mt-3 pt-3 border-t">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showProgress}
              onChange={(e) => setShowProgress(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">
              Mostrar progreso de ejemplo
            </span>
          </label>
        </div>
      </Card>

      {/* Grid de Badges */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredBadges.map((badge) => {
          const stats = getBadgeStats(badge);
          const progress = badgeProgress.find(bp => bp.badge.id === badge.id);

          return (
            <Card key={badge.id} className="p-4 hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="text-4xl">{badge.icon}</div>
                <BadgeUI 
                  variant="outline" 
                  className={`text-xs ${RARITY_COLORS[badge.rarity]} border`}
                >
                  {badge.rarity === 'común' && 'Común'}
                  {badge.rarity === 'raro' && 'Raro'}
                  {badge.rarity === 'épico' && 'Épico'}
                  {badge.rarity === 'legendario' && 'Legendario'}
                </BadgeUI>
              </div>

              {/* Nombre y descripción */}
              <h3 className="font-semibold text-gray-900 mb-1">{badge.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{badge.description}</p>

              {/* Categoría */}
              <div className="mb-3">
                <BadgeUI variant="secondary" className="text-xs">
                  {CATEGORY_LABELS[badge.category as keyof typeof CATEGORY_LABELS]}
                </BadgeUI>
              </div>

              {/* Estadísticas */}
              <div className="pt-3 border-t">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Obtenido por</span>
                  <span className="font-semibold text-gray-900">
                    {stats.count} pacientes ({stats.percentage}%)
                  </span>
                </div>
                <Progress value={stats.percentage} className="h-2" />
              </div>

              {/* Progreso (si está activado) */}
              {showProgress && progress && (
                <div className="mt-3 pt-3 border-t">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600">Tu progreso</span>
                    <span className={`font-semibold ${progress.earned ? 'text-green-600' : 'text-gray-900'}`}>
                      {progress.earned ? '✓ Obtenido' : `${progress.current}/${progress.target}`}
                    </span>
                  </div>
                  <Progress 
                    value={(progress.current / progress.target) * 100} 
                    className="h-1.5"
                  />
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Leyenda */}
      <Card className="p-4 bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-3">Rareza de Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span className="text-sm text-gray-700">Común: Fácil de obtener</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Raro: Requiere esfuerzo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Épico: Muy difícil</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Legendario: Excepcional</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

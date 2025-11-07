/**
 * ScoreBadge Component
 * 
 * Muestra el score y nivel de reputación de un paciente de forma visual
 * Incluye:
 * - Badge con color según nivel
 * - Score numérico
 * - Tooltip con información del nivel
 */

import { PatientLevel } from '@/types/patient';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getLevelConfig, getProgressToNextLevel } from '@/config/reputation';
import { Trophy, TrendingUp, AlertCircle } from 'lucide-react';

interface ScoreBadgeProps {
  score: number;
  level: PatientLevel;
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
  showIcon?: boolean;
  className?: string;
}

export function ScoreBadge({ 
  score, 
  level, 
  size = 'md', 
  showProgress = false,
  showIcon = true,
  className = '' 
}: ScoreBadgeProps) {
  const levelConfig = getLevelConfig(level);
  const progress = showProgress ? getProgressToNextLevel(score) : null;
  
  // Estilos según tamaño
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };
  
  // Colores según nivel
  const colorClasses = {
    'En Riesgo': 'bg-red-50 text-red-700 border-red-200',
    'Nuevo': 'bg-gray-50 text-gray-700 border-gray-200',
    'Estándar': 'bg-blue-50 text-blue-700 border-blue-200',
    'Premium': 'bg-purple-50 text-purple-700 border-purple-200',
    'Elite': 'bg-amber-50 text-amber-700 border-amber-200'
  };
  
  // Icono según nivel
  const LevelIcon = level === 'En Riesgo' ? AlertCircle : 
                    level === 'Elite' ? Trophy : 
                    TrendingUp;
  
  const content = (
    <div className="flex items-center gap-2">
      {showIcon && <LevelIcon className={`h-4 w-4 ${size === 'sm' ? 'h-3 w-3' : ''}`} />}
      
      <div className="flex items-center gap-1.5">
        <span className="font-semibold">{score}</span>
        <span className="text-xs opacity-75">•</span>
        <span className="font-medium">{level}</span>
      </div>
    </div>
  );
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant="outline" 
            className={`${sizeClasses[size]} ${colorClasses[level]} ${className} cursor-help`}
          >
            {content}
          </Badge>
        </TooltipTrigger>
        
        <TooltipContent 
          side="bottom" 
          className="max-w-xs"
        >
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-sm">{level}</p>
              <p className="text-xs text-muted-foreground">{levelConfig.description}</p>
            </div>
            
            <div className="text-xs">
              <p className="font-medium mb-1">Rango de score:</p>
              <p className="text-muted-foreground">
                {levelConfig.minScore} - {levelConfig.maxScore} puntos
              </p>
            </div>
            
            {progress && progress.nextLevel && (
              <div className="text-xs pt-2 border-t">
                <p className="font-medium mb-1">Progreso a {progress.nextLevel}:</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${progress.progress}%` }}
                    />
                  </div>
                  <span className="text-muted-foreground">
                    {Math.round(progress.progress)}%
                  </span>
                </div>
                <p className="text-muted-foreground mt-1">
                  Faltan {progress.pointsToNext} puntos
                </p>
              </div>
            )}
            
            <div className="text-xs pt-2 border-t">
              <p className="font-medium mb-1">Beneficios:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                {levelConfig.benefits.slice(0, 3).map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Variante compacta para tablas
export function ScoreBadgeCompact({ score, level }: { score: number; level: PatientLevel }) {
  const colorClasses = {
    'En Riesgo': 'bg-red-50 text-red-700',
    'Nuevo': 'bg-gray-50 text-gray-700',
    'Estándar': 'bg-blue-50 text-blue-700',
    'Premium': 'bg-purple-50 text-purple-700',
    'Elite': 'bg-amber-50 text-amber-700'
  };
  
  return (
    <div className="flex items-center gap-2">
      <span className={`text-sm font-semibold ${colorClasses[level]}`}>
        {score}
      </span>
      <Badge variant="outline" className={`text-xs ${colorClasses[level]}`}>
        {level}
      </Badge>
    </div>
  );
}

// Variante grande para perfil
export function ScoreBadgeLarge({ 
  score, 
  level 
}: { 
  score: number; 
  level: PatientLevel;
}) {
  const levelConfig = getLevelConfig(level);
  const progress = getProgressToNextLevel(score);
  
  const colorClasses = {
    'En Riesgo': 'from-red-500 to-red-600 text-white',
    'Nuevo': 'from-gray-400 to-gray-500 text-white',
    'Estándar': 'from-blue-500 to-blue-600 text-white',
    'Premium': 'from-purple-500 to-purple-600 text-white',
    'Elite': 'from-amber-400 to-amber-500 text-white'
  };
  
  const LevelIcon = level === 'En Riesgo' ? AlertCircle : 
                    level === 'Elite' ? Trophy : 
                    TrendingUp;
  
  return (
    <div className="space-y-4">
      {/* Score principal */}
      <div className={`rounded-xl p-6 bg-gradient-to-br ${colorClasses[level]} shadow-lg`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <LevelIcon className="h-6 w-6" />
            <span className="text-lg font-semibold">{level}</span>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{score}</div>
            <div className="text-xs opacity-90">puntos</div>
          </div>
        </div>
        
        <p className="text-sm opacity-90 mt-4">{levelConfig.description}</p>
      </div>
      
      {/* Progreso al siguiente nivel */}
      {progress.nextLevel && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Progreso a {progress.nextLevel}
            </span>
            <span className="font-medium">
              {progress.pointsToNext} puntos restantes
            </span>
          </div>
          
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500"
              style={{ width: `${progress.progress}%` }}
            />
          </div>
          
          <p className="text-xs text-muted-foreground">
            {Math.round(progress.progress)}% completado
          </p>
        </div>
      )}
    </div>
  );
}

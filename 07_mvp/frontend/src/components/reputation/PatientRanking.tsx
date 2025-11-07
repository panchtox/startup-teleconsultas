import { Card } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge as BadgeUI } from '../ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';
import { getPatientRanking, LEVEL_INFO, getLevelByScore } from '../../mock-data/reputation';

export function PatientRanking() {
  const rankedPatients = getPatientRanking();

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return null;
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Ranking de Pacientes</h2>
        <p className="text-gray-600 mt-1">
          Top 50 pacientes con mejor reputación
        </p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-4 text-sm font-semibold text-gray-900">Posición</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-900">Paciente</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-900">Score</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-900">Nivel</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-900">Badges</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-900">Asistencia</th>
              </tr>
            </thead>
            <tbody>
              {rankedPatients.map((patient, index) => {
                const rank = index + 1;
                const level = getLevelByScore(patient.score);
                const levelInfo = LEVEL_INFO[level];
                const attendanceRate = patient.stats.attendanceRate;

                return (
                  <tr key={patient.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 w-6">#{rank}</span>
                        {getRankIcon(rank)}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary-100 text-primary-700">
                            {patient.firstName[0]}{patient.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">
                            {patient.firstName} {patient.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            DNI {patient.demographics.identificationNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-2xl text-gray-900">
                          {patient.score}
                        </div>
                        <div className="text-xs text-gray-500">/100</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <BadgeUI 
                        variant="outline" 
                        className={`${levelInfo.bgColor} ${levelInfo.color} ${levelInfo.borderColor} border`}
                      >
                        <span className="mr-1">{levelInfo.icon}</span>
                        {level}
                      </BadgeUI>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        {patient.badges.slice(0, 3).map((badge) => (
                          <span key={badge.id} className="text-xl" title={badge.name}>
                            {badge.icon}
                          </span>
                        ))}
                        {patient.badges.length > 3 && (
                          <span className="text-xs text-gray-500 ml-1">
                            +{patient.badges.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-gray-900">
                          {attendanceRate}%
                        </div>
                        <div className="text-xs text-gray-500">
                          ({patient.stats.attendedConsultations}/{patient.stats.totalConsultations})
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

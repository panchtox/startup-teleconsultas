import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { LevelExplainer, PatientRanking, BadgeCatalog } from '../components/reputation';

export function Reputation() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Sistema de Reputación</h1>
        <p className="text-gray-600 mt-2">
          Incentiva la asistencia y el compromiso de los pacientes a través de niveles, rankings y badges
        </p>
      </div>

      <Tabs defaultValue="levels" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="levels">Niveles</TabsTrigger>
          <TabsTrigger value="ranking">Ranking</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="levels" className="space-y-6">
          <LevelExplainer />
        </TabsContent>

        <TabsContent value="ranking" className="space-y-6">
          <PatientRanking />
        </TabsContent>

        <TabsContent value="badges" className="space-y-6">
          <BadgeCatalog />
        </TabsContent>
      </Tabs>
    </div>
  );
}

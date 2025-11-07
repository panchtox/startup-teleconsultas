import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, TrendingDown, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 inline-flex items-center rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">
            <Zap className="mr-2 h-4 w-4" />
            Reduce el ausentismo hasta un 73%
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Recuperá miles de horas médicas perdidas por{" "}
            <span className="text-primary-600">ausentismo</span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Sistema inteligente de recordatorios y reputación para teleconsultas. 
            Reducí el ausentismo del 33% al 9% con comunicación automática vía WhatsApp 
            y un sistema de gamificación que premia la responsabilidad.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="text-lg">
              <Link to="#demo">
                Solicitar Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <Link to="/login">
                Ver Demo en Vivo
              </Link>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex items-center text-3xl font-bold text-primary-600">
                <TrendingDown className="mr-2 h-8 w-8" />
                73%
              </div>
              <p className="mt-2 text-sm text-gray-600">Reducción de ausentismo</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center text-3xl font-bold text-primary-600">
                <Calendar className="mr-2 h-8 w-8" />
                +156
              </div>
              <p className="mt-2 text-sm text-gray-600">Horas médicas recuperadas/mes</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary-600">
                $72K
              </div>
              <p className="mt-2 text-sm text-gray-600">Ahorro anual por médico</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary-200 to-secondary-200 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
}

import { Hero } from "@/components/landing/Hero";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { Features } from "@/components/landing/Features";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { DemoForm } from "@/components/landing/DemoForm";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function Landing() {
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">TeleAssist</span>
            </Link>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a href="#features" className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600">
              Características
            </a>
            <a href="#pricing" className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600">
              Pricing
            </a>
            <a href="#demo" className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600">
              Demo
            </a>
          </div>
          <div className="flex flex-1 justify-end gap-4">
            <Button asChild variant="ghost">
              <Link to="/login">Ingresar</Link>
            </Button>
            <Button asChild>
              <a href="#demo">Solicitar Demo</a>
            </Button>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="pt-16">
        <Hero />
        <ProblemSolution />
        <div id="features">
          <Features />
        </div>
        <Testimonials />
        <div id="pricing">
          <Pricing />
        </div>
        <DemoForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

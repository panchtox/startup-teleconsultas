import { useEffect } from 'react';
import { X, Heart } from 'lucide-react';

interface TeamEasterEggProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TeamEasterEgg({ isOpen, onClose }: TeamEasterEggProps) {
  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none overflow-y-auto">
        <div 
          className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full pointer-events-auto animate-in zoom-in-95 duration-300 overflow-hidden my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header con corazón animado */}
          <div className="relative bg-gradient-to-r from-primary-600 to-green-500 p-6 text-white">
            {/* Corazón flotante de fondo */}
            <div className="absolute inset-0 overflow-hidden">
              <Heart 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-10 animate-pulse"
                fill="currentColor"
              />
            </div>
            
            {/* Botón cerrar */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Contenido del header */}
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-3 animate-bounce">
                <Heart className="w-8 h-8" fill="currentColor" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                ¡Encontraste el Easter Egg! 🥚
              </h2>
              <p className="text-green-50">
                Conocé al equipo detrás de TeleAssist
              </p>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-6">
            {/* Foto del equipo con altura controlada */}
            <div className="mb-6 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-primary-50 to-green-50">
              <img 
                src="/team/team-photo.png" 
                alt="Equipo TeleAssist"
                className="w-full h-auto max-h-[400px] object-contain"
                onError={(e) => {
                  // Fallback si no se carga la imagen
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="flex items-center justify-center h-64 text-primary-600 text-xl font-semibold">📸 Foto del Equipo</div>';
                  }
                }}
              />
            </div>

            {/* Mensaje del equipo */}
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5 text-center">
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong className="text-primary-600">TeleAssist</strong> es más que tecnología: 
                es un equipo comprometido con mejorar el acceso a la salud digital en Latinoamérica.
              </p>
              <p className="text-sm text-gray-600">
                Gracias por explorar nuestra demo. Si querés saber más sobre nosotros, 
                contactanos en{' '}
                <a 
                  href="mailto:hola@teleassist.com.ar" 
                  className="text-primary-600 font-semibold hover:underline"
                >
                  hola@teleassist.com.ar
                </a>
              </p>
            </div>

            {/* Corazones decorativos */}
            <div className="flex items-center justify-center gap-3 mt-5">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className="w-5 h-5 text-primary-600 animate-pulse"
                  fill="currentColor"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

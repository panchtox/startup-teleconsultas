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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full pointer-events-auto animate-in zoom-in-95 duration-300 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header con corazón animado */}
          <div className="relative bg-gradient-to-r from-primary-600 to-green-500 p-8 text-white">
            {/* Corazón flotante de fondo */}
            <div className="absolute inset-0 overflow-hidden">
              <Heart 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-10 animate-pulse"
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
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 animate-bounce">
                <Heart className="w-10 h-10" fill="currentColor" />
              </div>
              <h2 className="text-3xl font-bold mb-2">
                ¡Encontraste el Easter Egg! 🥚
              </h2>
              <p className="text-green-50 text-lg">
                Conocé al equipo detrás de TeleAssist
              </p>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-8">
            {/* Foto del equipo */}
            <div className="mb-6 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-primary-50 to-green-50">
              <img 
                src="/team/team-photo.png" 
                alt="Equipo TeleAssist"
                className="w-full h-auto object-cover"
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
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
              <p className="text-gray-700 leading-relaxed mb-4">
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
            <div className="flex items-center justify-center gap-3 mt-6">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className="w-6 h-6 text-primary-600 animate-pulse"
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

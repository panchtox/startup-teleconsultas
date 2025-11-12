# 💬 Chat Assistant - Frontend

Componente de chat flotante integrado con el backend de GitHub Models.

## 🎯 Características

- ✅ **Floating button** en esquina inferior derecha
- ✅ **Dialog responsive** de 600px de altura
- ✅ **Auto-scroll** a últimos mensajes
- ✅ **Loading states** mientras el LLM responde
- ✅ **Error handling** con mensajes visuales
- ✅ **Enter to send** (Shift+Enter para nueva línea)
- ✅ **Historial de conversación** persistente en la sesión

## 📁 Estructura

```
src/components/chat/
├── ChatAssistant.tsx    # Componente principal
└── index.ts             # Export barrel
```

## 🔧 Integración

El chat ya está integrado en `App.tsx` y aparece en **todas las páginas** del dashboard.

```tsx
// App.tsx
import { ChatAssistant } from '@/components/chat'

function App() {
  return (
    <>
      <Routes>...</Routes>
      <ChatAssistant />  {/* Floating button siempre visible */}
    </>
  )
}
```

## 🎨 Diseño

### Estados

1. **Cerrado**: Botón flotante azul con ícono de chat
2. **Abierto**: Dialog 396x600px con:
   - Header azul con título y botón cerrar
   - Área de mensajes con scroll
   - Indicador de "escribiendo..."
   - Input + botón enviar

### Colores

- **Primary**: `bg-blue-600` (botones, header)
- **User messages**: `bg-blue-600 text-white`
- **Assistant messages**: `bg-gray-100 text-gray-900`
- **Error**: `bg-red-50 text-red-600`

## 🚀 Uso

### Para el usuario final

1. Click en el botón flotante (esquina inferior derecha)
2. Escribir pregunta
3. Presionar Enter o click en botón enviar
4. Ver respuesta del asistente

### Ejemplos de preguntas

- "¿Cuántos pacientes tenemos activos?"
- "¿Cómo funciona el sistema de reputación?"
- "¿Qué badges pueden obtener los pacientes?"
- "Mostrame pacientes con score bajo"

## 🔌 Backend Integration

El componente se conecta a:

```
POST http://localhost:3000/api/chat
```

**Request:**
```json
{
  "message": "¿Cuántos pacientes tenemos?",
  "conversationHistory": [
    { "role": "user", "content": "Hola" },
    { "role": "assistant", "content": "¡Hola! ¿En qué puedo ayudarte?" }
  ]
}
```

**Response:**
```json
{
  "message": "Actualmente tenemos 500 pacientes activos...",
  "model": "gpt-4o-mini",
  "usage": {
    "promptTokens": 150,
    "completionTokens": 50,
    "totalTokens": 200
  }
}
```

## ⚙️ Configuración

### Backend debe estar corriendo

```bash
cd ../backend
npm run dev
```

El backend debe estar en `http://localhost:3000`

### CORS

El backend ya tiene CORS habilitado en `server.js`:

```javascript
app.use(cors());
```

## 🐛 Troubleshooting

### "Error al enviar el mensaje"

**Causa**: Backend no está corriendo o GITHUB_TOKEN no configurado

**Solución**:
```bash
cd ../backend
# Verificar que GITHUB_TOKEN esté en .env
npm run dev
```

### Chat no aparece

**Causa**: Posible error de TypeScript o import

**Solución**:
```bash
# En la carpeta frontend
npm run dev
# Revisar consola del navegador (F12)
```

### Mensajes no se scrollean automáticamente

**Causa**: Problema con el ref de scroll

**Solución**: Refrescar la página (ya está implementado el auto-scroll)

## 🎯 Mejoras Futuras

### Corto plazo
- [ ] Persistir conversación en localStorage
- [ ] Botón "Nueva conversación"
- [ ] Copiar respuesta al clipboard
- [ ] Markdown rendering (bold, listas, código)

### Mediano plazo
- [ ] Streaming de respuestas (SSE)
- [ ] Sugerencias de preguntas frecuentes
- [ ] Integración con acciones (abrir paciente, crear consulta)
- [ ] Historial de conversaciones pasadas

### Largo plazo
- [ ] Voice input (speech-to-text)
- [ ] Exportar conversación como PDF
- [ ] Analytics de preguntas más comunes
- [ ] Multi-idioma (inglés, portugués)

## 📝 Notas Técnicas

### State Management

```tsx
const [isOpen, setIsOpen] = useState(false);           // Dialog abierto/cerrado
const [messages, setMessages] = useState<Message[]>(); // Historial
const [input, setInput] = useState('');                // Input actual
const [isLoading, setIsLoading] = useState(false);     // Loading state
const [error, setError] = useState<string | null>();   // Error message
```

### Auto-scroll

```tsx
const messagesEndRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);
```

### Enter to Send

```tsx
const handleKeyPress = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
};
```

## 🔐 Seguridad

- ⚠️ **No enviar datos sensibles**: El chat no debe enviar datos de pacientes reales (DNI, historias clínicas)
- ✅ **Solo preguntas generales**: El system prompt limita el scope
- ✅ **Rate limiting**: Backend tiene límites de GitHub Models (10 RPM)

---

**Creado por**: Fran + Claude  
**Fecha**: 12 de Noviembre, 2025  
**Status**: ✅ Funcional y listo para usar

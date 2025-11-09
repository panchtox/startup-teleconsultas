import { useState } from 'react';
import TeamEasterEgg from '../components/demo/TeamEasterEgg';

interface Message {
  id: number;
  type: 'agent' | 'user';
  content: string;
  time: string;
  buttons?: string[];
}

interface ServerLog {
  timestamp: string;
  action: string;
  detail: string;
}

export default function Demo() {
  const [serverLogs, setServerLogs] = useState<ServerLog[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'agent',
      content: 'Recordatorio: tenés una consulta programada para el 10 de noviembre a las 14:00 con la Dra. Gomez. Recuerda que por asistir sumarás puntos',
      time: '09:00',
      buttons: ['Asistiré', 'No asistiré']
    }
  ]);
  const [score, setScore] = useState(75);
  const [appointmentStatus, setAppointmentStatus] = useState('Pendiente');
  const [respondedMessages, setRespondedMessages] = useState<Set<number>>(new Set());
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const addServerLog = (action: string, detail: string) => {
    const timestamp = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setServerLogs(prev => [...prev, { timestamp, action, detail }]);
  };

  const addMessage = (type: 'agent' | 'user', content: string, buttons: string[] | null = null) => {
    const time = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      type,
      content,
      time,
      buttons: buttons || undefined
    }]);
  };

  const handleConfirm = () => {
    const currentMessageId = messages[messages.length - 1].id;
    if (respondedMessages.has(currentMessageId)) return;
    
    setRespondedMessages(prev => new Set(prev).add(currentMessageId));
    addMessage('user', 'Asistiré');
    addServerLog('📥 RECIBIDO', 'Mensaje del paciente: "Asistiré"');
    
    setTimeout(() => {
      addServerLog('🤖 PROCESANDO', 'Intent detectado: CONFIRMACION');
      addServerLog('💾 ACTUALIZANDO', 'Estado consulta: PENDIENTE → CONFIRMADA');
      addServerLog('⭐ SCORING', 'Puntos: 75 → 80 (+5 por confirmación temprana)');
      
      setAppointmentStatus('Confirmada');
      setScore(80);
      
      addMessage('agent', '¡Perfecto! Te esperamos el 10 de noviembre a las 14:00. Gracias por confirmar – sumarás puntos al asistir a tu consulta.');
      addServerLog('📤 ENVIADO', 'Respuesta automática de confirmación');
    }, 1500);
  };

  const handleCancel = () => {
    const currentMessageId = messages[messages.length - 1].id;
    if (respondedMessages.has(currentMessageId)) return;
    
    setRespondedMessages(prev => new Set(prev).add(currentMessageId));
    addMessage('user', 'No asistiré');
    addServerLog('📥 RECIBIDO', 'Mensaje del paciente: "No asistiré"');
    
    setTimeout(() => {
      addServerLog('🤖 PROCESANDO', 'Intent detectado: CANCELACION');
      addServerLog('🔍 BUSCANDO', 'Consultando turnos disponibles en agenda...');
      
      addMessage('agent', 'Gracias por avisar. Seleccioná un turno disponible:', [
        '12 de noviembre – 11:00',
        '13 de noviembre – 09:30',
        '14 de noviembre – 15:00',
        'Ya no necesito la consulta'
      ]);
      addServerLog('📤 ENVIADO', 'Opciones de reprogramación (3 turnos + cancelación)');
    }, 1500);
  };

  const handleReschedule = (option: string) => {
    const currentMessageId = messages[messages.length - 1].id;
    if (respondedMessages.has(currentMessageId)) return;
    
    setRespondedMessages(prev => new Set(prev).add(currentMessageId));
    
    if (option === 'Ya no necesito la consulta') {
      addMessage('user', option);
      addServerLog('📥 RECIBIDO', 'Cancelación definitiva del paciente');
      
      setTimeout(() => {
        addServerLog('🤖 PROCESANDO', 'Intent detectado: CANCELACION_DEFINITIVA');
        addServerLog('⏰ VERIFICANDO', 'Aviso con 24h anticipación: SÍ');
        addServerLog('💾 ACTUALIZANDO', 'Estado: PENDIENTE → CANCELADA_SIN_PENALIZACION');
        addServerLog('⭐ SCORING', 'Puntos: 75 (sin cambios, avisó a tiempo)');
        
        setAppointmentStatus('Cancelada');
        
        addMessage('agent', 'Perfecto, no reprogramaremos esta consulta. Como avisaste con 24 horas de anticipación, no se modificará tu puntaje. ¡Gracias por tu aviso!');
        addServerLog('📤 ENVIADO', 'Confirmación de cancelación sin penalización');
      }, 1500);
    } else {
      addMessage('user', option);
      addServerLog('📥 RECIBIDO', `Nuevo turno seleccionado: ${option}`);
      
      setTimeout(() => {
        addServerLog('🤖 PROCESANDO', 'Intent detectado: REPROGRAMACION');
        addServerLog('📅 ACTUALIZANDO', `Consulta movida a: ${option}`);
        addServerLog('⭐ SCORING', 'Puntos: 75 (sin cambios, reprogramó a tiempo)');
        
        setAppointmentStatus('Reprogramada');
        
        addMessage('agent', `Tu consulta ha sido reprogramada para el ${option}. ¡Te esperamos! Reprogramaste con anticipación, tu puntaje no se modifica.`);
        addServerLog('📤 ENVIADO', 'Confirmación de reprogramación exitosa');
      }, 1500);
    }
  };

  const resetDemo = () => {
    setMessages([
      {
        id: 1,
        type: 'agent',
        content: 'Recordatorio: tenés una consulta programada para el 10 de noviembre a las 14:00 con la Dra. Gomez. Recuerda que por asistir sumarás puntos',
        time: '09:00',
        buttons: ['Asistiré', 'No asistiré']
      }
    ]);
    setServerLogs([]);
    setScore(75);
    setAppointmentStatus('Pendiente');
    setRespondedMessages(new Set());
    addServerLog('🔄 RESET', 'Demo reiniciada - Estado inicial');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmada':
        return 'bg-green-100 text-green-800';
      case 'Cancelada':
        return 'bg-red-100 text-red-800';
      case 'Reprogramada':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getLogColor = (action: string) => {
    if (action.includes('RECIBIDO')) return 'text-cyan-400';
    if (action.includes('PROCESANDO')) return 'text-amber-400';
    if (action.includes('ENVIADO')) return 'text-emerald-400';
    if (action.includes('SCORING')) return 'text-fuchsia-400';
    if (action.includes('ACTUALIZANDO') || action.includes('VERIFICANDO') || action.includes('BUSCANDO')) return 'text-rose-400';
    return 'text-green-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 py-8 px-4">
      {/* Easter Egg Modal */}
      <TeamEasterEgg 
        isOpen={showEasterEgg} 
        onClose={() => setShowEasterEgg(false)} 
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              TA
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              TeleAssist - Demo Interactiva
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Simulación en tiempo real: Celular del Paciente ↔ Servidor
          </p>
          <button
            onClick={resetDemo}
            className="mt-4 px-5 py-2.5 bg-green-50 border border-green-200 rounded-lg text-primary-600 font-semibold hover:bg-green-100 transition-colors"
          >
            🔄 Reiniciar Demo
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Phone Screen */}
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-bold text-primary-600 text-center">
              📱 Celular del Paciente
            </h2>
            
            {/* Phone Frame */}
            <div className="bg-white rounded-[36px] p-5 shadow-2xl border border-gray-200 relative min-h-[650px] flex flex-col">
              {/* Notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[120px] h-[22px] bg-black rounded-full opacity-90" />

              {/* App Bar con Easter Egg clickeable */}
              <div className="flex items-center gap-2.5 bg-primary-600 text-white rounded-2xl p-3 mt-5">
                <button
                  onClick={() => setShowEasterEgg(true)}
                  className="w-8 h-8 rounded-lg bg-white/10 border border-white/30 flex items-center justify-center text-base hover:bg-white/20 hover:scale-110 transition-all cursor-pointer"
                  title="¿Encontraste el Easter Egg? 🥚"
                >
                  💚
                </button>
                <div className="font-bold flex-1">TeleAssist</div>
                <div className="text-xs opacity-90">en línea</div>
              </div>

              {/* Chat Area */}
              <div 
                className="flex-1 mt-4 bg-[#efe9dd] rounded-2xl p-4 overflow-y-auto"
                style={{
                  backgroundImage: 'radial-gradient(rgba(0,0,0,.02) 1px, transparent 1px)',
                  backgroundSize: '14px 14px'
                }}
              >
                {messages.map((msg) => (
                  <div key={msg.id} className="mb-3">
                    <div 
                      className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.type === 'agent' 
                          ? 'bg-white border border-gray-200 mr-auto' 
                          : 'bg-green-100 border border-green-200 ml-auto'
                      }`}
                    >
                      {msg.content}
                      <div className="text-[11px] text-gray-500 mt-1 text-right">
                        {msg.time}
                      </div>
                      {msg.buttons && (
                        <div className="flex flex-col gap-2 mt-2.5">
                          {msg.buttons.map((btn, idx) => {
                            const isDisabled = respondedMessages.has(msg.id);
                            return (
                            <button
                              key={idx}
                              onClick={() => {
                                if (isDisabled) return;
                                if (btn === 'Asistiré') handleConfirm();
                                else if (btn === 'No asistiré') handleCancel();
                                else handleReschedule(btn);
                              }}
                              disabled={isDisabled}
                              className={`px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-opacity ${
                                isDisabled
                                  ? 'opacity-50 cursor-not-allowed'
                                  : 'hover:opacity-80 cursor-pointer'
                              } ${
                                btn === 'Ya no necesito la consulta'
                                  ? 'bg-red-50 border border-red-200 text-red-700'
                                  : btn === 'Asistiré'
                                  ? 'bg-primary-600 text-white'
                                  : 'bg-green-50 border border-green-200 text-primary-600'
                              }`}
                            >
                              {btn}
                            </button>
                          )})}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Patient Info */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200">
              <h3 className="text-base font-bold mb-4 text-gray-900">
                📊 Estado del Paciente
              </h3>
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Consulta:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointmentStatus)}`}>
                    {appointmentStatus}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Score:</span>
                  <span className={`text-lg font-bold ${score >= 80 ? 'text-green-600' : 'text-amber-600'}`}>
                    {score} pts
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Server Logs */}
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-bold text-primary-600 text-center">
              🖥️ Logs del Servidor
            </h2>
            
            <div className="bg-black rounded-2xl p-5 min-h-[650px] max-h-[800px] overflow-y-auto font-mono text-xs text-green-400 shadow-2xl">
              {serverLogs.length === 0 ? (
                <div className="text-gray-600 text-center mt-12">
                  Esperando interacción del paciente...
                </div>
              ) : (
                serverLogs.map((log, idx) => (
                  <div key={idx} className="mb-2 leading-relaxed">
                    <span className="text-gray-500">[{log.timestamp}]</span>{' '}
                    <span className={`font-bold ${getLogColor(log.action)}`}>
                      {log.action}
                    </span>{' '}
                    <span className="text-gray-300">{log.detail}</span>
                  </div>
                ))
              )}
            </div>

            {/* Info Box */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-900 leading-relaxed">
              <div className="font-bold mb-2 text-base">
                💡 Cómo funciona esta demo:
              </div>
              <ul className="ml-5 mt-2 space-y-1 list-disc">
                <li>Clickeá los botones en el celular para simular respuestas del paciente</li>
                <li>El servidor procesa cada mensaje y responde automáticamente</li>
                <li>Los logs muestran la lógica interna en tiempo real</li>
                <li>El scoring se actualiza según las acciones del paciente</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

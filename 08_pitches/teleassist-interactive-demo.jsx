import React, { useState } from 'react';

const TeleAssistDemo = () => {
  const [serverLogs, setServerLogs] = useState([]);
  const [messages, setMessages] = useState([
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

  const addServerLog = (action, detail) => {
    const timestamp = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setServerLogs(prev => [...prev, { timestamp, action, detail }]);
  };

  const addMessage = (type, content, buttons = null) => {
    const time = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      type,
      content,
      time,
      buttons
    }]);
  };

  const handleConfirm = () => {
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

  const handleReschedule = (option) => {
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
    addServerLog('🔄 RESET', 'Demo reiniciada - Estado inicial');
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #ffffff 0%, #f3f7f5 100%)',
      padding: '30px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '15px' }}>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              background: '#0f7a4f', 
              borderRadius: '12px', 
              display: 'grid', 
              placeItems: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '20px',
              boxShadow: '0 4px 12px rgba(15, 122, 79, 0.3)'
            }}>
              TA
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#101418', margin: 0 }}>
              TeleAssist - Demo Interactiva
            </h1>
          </div>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            Simulación en tiempo real: Celular del Paciente ↔ Servidor
          </p>
          <button
            onClick={resetDemo}
            style={{
              marginTop: '15px',
              padding: '10px 20px',
              background: '#e8f3ee',
              border: '1px solid #cfe5da',
              borderRadius: '8px',
              color: '#0b5a3a',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🔄 Reiniciar Demo
          </button>
        </div>

        {/* Main Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '30px',
          alignItems: 'start'
        }}>
          {/* Phone Screen */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0b5a3a', textAlign: 'center' }}>
              📱 Celular del Paciente
            </h2>
            <div style={{
              background: 'white',
              borderRadius: '36px',
              padding: '20px',
              boxShadow: '0 10px 25px rgba(16,20,24,.08), 0 2px 6px rgba(16,20,24,.06)',
              border: '1px solid #e8ecea',
              position: 'relative',
              minHeight: '650px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Notch */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120px',
                height: '22px',
                background: '#0a0a0a',
                borderRadius: '20px',
                opacity: 0.9
              }} />

              {/* App Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: '#0f7a4f',
                color: 'white',
                borderRadius: '18px',
                padding: '12px',
                marginTop: '20px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '16px'
                }}>
                  💚
                </div>
                <div style={{ fontWeight: '700', flex: 1 }}>TeleAssist</div>
                <div style={{ fontSize: '12px', opacity: 0.9 }}>en línea</div>
              </div>

              {/* Chat Area */}
              <div style={{
                flex: 1,
                marginTop: '15px',
                background: '#efe9dd',
                borderRadius: '16px',
                padding: '15px',
                overflowY: 'auto',
                backgroundImage: 'radial-gradient(rgba(0,0,0,.02) 1px, transparent 1px)',
                backgroundSize: '14px 14px'
              }}>
                {messages.map((msg) => (
                  <div key={msg.id} style={{ marginBottom: '12px' }}>
                    <div style={{
                      maxWidth: '85%',
                      padding: '10px 12px',
                      borderRadius: '14px',
                      lineHeight: '1.4',
                      fontSize: '14px',
                      boxShadow: '0 1px 0 rgba(0,0,0,.05)',
                      ...(msg.type === 'agent' ? {
                        background: 'white',
                        border: '1px solid #e8e5e0',
                        marginRight: 'auto'
                      } : {
                        background: '#d2f2e3',
                        border: '1px solid #bfe7d8',
                        marginLeft: 'auto'
                      })
                    }}>
                      {msg.content}
                      <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px', textAlign: 'right' }}>
                        {msg.time}
                      </div>
                      {msg.buttons && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                          {msg.buttons.map((btn, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                if (btn === 'Asistiré') handleConfirm();
                                else if (btn === 'No asistiré') handleCancel();
                                else handleReschedule(btn);
                              }}
                              style={{
                                padding: '10px 14px',
                                borderRadius: '10px',
                                border: btn === 'Ya no necesito la consulta' ? '1px solid #ffd0d0' : '1px solid #cfe5da',
                                background: btn === 'Ya no necesito la consulta' ? '#ffe8e8' : btn === 'Asistiré' ? '#0f7a4f' : '#e8f3ee',
                                color: btn === 'Ya no necesito la consulta' ? '#b42318' : btn === 'Asistiré' ? 'white' : '#0b5a3a',
                                fontWeight: '600',
                                fontSize: '13px',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                              onMouseOver={(e) => e.target.style.opacity = '0.8'}
                              onMouseOut={(e) => e.target.style.opacity = '1'}
                            >
                              {btn}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Patient Info */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              border: '1px solid #e8ecea'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '15px', color: '#101418' }}>
                📊 Estado del Paciente
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6b7280', fontSize: '14px' }}>Consulta:</span>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '999px',
                    background: appointmentStatus === 'Confirmada' ? '#d1fae5' : appointmentStatus === 'Cancelada' ? '#fee2e2' : appointmentStatus === 'Reprogramada' ? '#dbeafe' : '#fef3c7',
                    color: appointmentStatus === 'Confirmada' ? '#065f46' : appointmentStatus === 'Cancelada' ? '#991b1b' : appointmentStatus === 'Reprogramada' ? '#1e40af' : '#92400e',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}>
                    {appointmentStatus}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6b7280', fontSize: '14px' }}>Score:</span>
                  <span style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: score >= 80 ? '#10b981' : '#f59e0b'
                  }}>
                    {score} pts
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Server Logs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0b5a3a', textAlign: 'center' }}>
              🖥️ Logs del Servidor
            </h2>
            <div style={{
              background: '#0a0a0a',
              borderRadius: '16px',
              padding: '20px',
              minHeight: '650px',
              maxHeight: '800px',
              overflowY: 'auto',
              fontFamily: '"Courier New", monospace',
              fontSize: '13px',
              color: '#00ff00',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
            }}>
              {serverLogs.length === 0 ? (
                <div style={{ color: '#666', textAlign: 'center', marginTop: '50px' }}>
                  Esperando interacción del paciente...
                </div>
              ) : (
                serverLogs.map((log, idx) => (
                  <div key={idx} style={{ marginBottom: '8px', lineHeight: '1.6' }}>
                    <span style={{ color: '#888' }}>[{log.timestamp}]</span>{' '}
                    <span style={{ 
                      color: log.action.includes('RECIBIDO') ? '#00d4ff' :
                             log.action.includes('PROCESANDO') ? '#ffaa00' :
                             log.action.includes('ENVIADO') ? '#00ff88' :
                             log.action.includes('SCORING') ? '#ff00ff' :
                             log.action.includes('ACTUALIZANDO') ? '#ff6b6b' :
                             '#00ff00',
                      fontWeight: 'bold'
                    }}>
                      {log.action}
                    </span>{' '}
                    <span style={{ color: '#ccc' }}>{log.detail}</span>
                  </div>
                ))
              )}
            </div>

            {/* Info Box */}
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #86efac',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '13px',
              color: '#166534',
              lineHeight: '1.6'
            }}>
              <div style={{ fontWeight: '700', marginBottom: '8px', fontSize: '14px' }}>
                💡 Cómo funciona esta demo:
              </div>
              <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
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
};

export default TeleAssistDemo;

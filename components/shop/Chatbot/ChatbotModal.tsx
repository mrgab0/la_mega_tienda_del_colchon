"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, RefreshCw, PhoneCall, Bot, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

const QUICK_QUESTIONS = [
  "🛏️ Colchones ortopédicos para dolor de espalda",
  "👑 Medidas Queen y King disponibles",
  "🚚 ¿Cómo funciona el despacho en Barinas?",
  "💳 Métodos de pago y Pago Móvil"
];

const PREVIEW_TICKERS = [
  "¿Buscas colchón hoy? Te asesoro en vivo 🛏️",
  "🚚 Flete en Barinas y envíos nacionales",
  "💤 Colchones ortopédicos y resortes ensacados",
  "💬 Consulta precios y medidas aquí"
];

export const ChatbotModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-msg",
      role: "model",
      text: "¡Hola! 🛏️ Soy tu **Asesor de Descanso Virtual** de *La Mega Tienda del Colchón* en Barinas (Avenida Sucre).\n\n¿Qué tipo de colchón, medida o nivel de firmeza estás buscando hoy para renovar tus noches de sueño?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % PREVIEW_TICKERS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      const apiHistory = newMessages.map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiHistory })
      });

      if (!res.ok) throw new Error("Error en la respuesta");
      const data = await res.json();

      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: data.text || "Disculpa, no pude procesar tu solicitud. Por favor intenta nuevamente.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "🛏️ Hubo un pequeño inconveniente de conexión. Puedes escribirnos directo a nuestro WhatsApp [0414-1584360](https://wa.me/584141584360) para asistirte de inmediato.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: "model",
        text: "¡Conversación reiniciada! 🛏️ ¿En qué podemos ayudarte para mejorar tu descanso?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Botón Flotante Estilo Mini-Reproductor / Thumbnail Visual Preview */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setIsOpen(true)}
          aria-label="Abrir Asesor de Descanso IA"
          className="fixed bottom-5 right-4 sm:right-6 z-40 cursor-pointer group select-none animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="flex items-center gap-2.5 sm:gap-3.5 bg-[#12021E]/95 text-white backdrop-blur-md pl-2 pr-3.5 sm:pr-4 py-2 rounded-2xl shadow-[0px_10px_35px_rgba(165,7,250,0.3)] border-2 border-[#A507FA] hover:border-[#A507FA] hover:shadow-[0px_12px_40px_rgba(165,7,250,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] max-w-[310px] sm:max-w-none">
            
            {/* Thumbnail / Portada estilo Mini-Player */}
            <div className="relative flex-shrink-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-[#A507FA] shadow-sm relative group-hover:scale-105 transition-transform duration-300 bg-[#1A032A] flex items-center justify-center">
                <Bot size={24} className="text-[#A507FA]" />
                <div className="absolute bottom-0.5 right-0.5">
                  <Sparkles size={11} className="text-white animate-pulse" />
                </div>
              </div>

              {/* Indicador de Estado En Vivo con Ondas */}
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#25D366] border-2 border-[#12021E]"></span>
              </span>
            </div>

            {/* Texto y Ticker Dinámico estilo Mini-Player */}
            <div className="flex flex-col text-left overflow-hidden min-w-[155px] sm:min-w-[200px]">
              <div className="flex items-center gap-1.5 leading-none mb-1">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#FAF2FF]">
                  ASESOR DE DESCANSO IA
                </span>
                <span className="flex items-center gap-0.5 text-[8px] bg-green-950/80 text-green-300 font-extrabold px-1.5 py-0.5 rounded-full border border-green-500/40">
                  <span className="w-1 h-1 bg-green-400 rounded-full animate-ping"></span>
                  EN VIVO
                </span>
              </div>

              {/* Ticker de mensaje animado */}
              <div className="h-4 overflow-hidden relative">
                <p 
                  key={tickerIndex} 
                  className="text-[11px] sm:text-xs font-bold text-white truncate animate-in fade-in slide-in-from-bottom-2 duration-300"
                >
                  {PREVIEW_TICKERS[tickerIndex]}
                </p>
              </div>
            </div>

            {/* Botón Acción Mini-Player */}
            <div className="flex-shrink-0 bg-[#A507FA] hover:bg-[#8B00D9] text-white p-2 rounded-xl shadow-md transition-colors flex items-center justify-center">
              <MessageSquare size={16} className="text-white group-hover:scale-110 transition-transform" />
            </div>

          </div>
        </div>
      )}

      {/* Ventana Modal del Chatbot */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 w-[94vw] sm:w-[410px] h-[560px] max-h-[85vh] bg-white dark:bg-[#12021E] rounded-3xl shadow-[0px_20px_50px_rgba(165,7,250,0.35)] border-2 border-[#A507FA]/60 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header del Chatbot */}
          <div className="bg-gradient-to-r from-[#12021E] via-[#2A0845] to-[#12021E] text-white px-4 py-3.5 flex items-center justify-between border-b border-[#A507FA]/40 shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#1A032A] border-2 border-[#A507FA] flex items-center justify-center text-white shadow">
                  <Bot size={20} className="text-[#A507FA]" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#12021E]"></span>
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-white">Asesor de Descanso</span>
                  <span className="text-[10px] bg-[#A507FA] text-white px-1.5 py-0.5 rounded font-black tracking-wider shadow-sm">
                    IA
                  </span>
                </div>
                <span className="text-[11px] text-purple-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  En línea • La Mega Tienda
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reiniciar conversación"
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              >
                <RefreshCw size={15} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Cerrar chat"
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-purple-50/20 dark:bg-[#0A0110]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className="w-7 h-7 rounded-full bg-[#1A032A] text-[#A507FA] flex items-center justify-center shrink-0 mt-0.5 border border-[#A507FA]/60 shadow-sm">
                    <Bot size={14} />
                  </div>
                )}
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words ${
                    msg.role === 'user'
                      ? 'bg-[#A507FA] text-white rounded-br-none shadow-md'
                      : 'bg-white dark:bg-[#181922] text-slate-900 dark:text-slate-100 rounded-bl-none border border-purple-100 dark:border-gray-800 shadow-sm'
                  }`}
                >
                  {msg.text}
                  <div
                    className={`text-[9px] mt-1 text-right font-medium ${
                      msg.role === 'user' ? 'text-purple-100' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center text-slate-500 dark:text-slate-400 text-xs py-1">
                <div className="w-7 h-7 rounded-full bg-[#1A032A] text-[#A507FA] flex items-center justify-center shrink-0 border border-[#A507FA]/60">
                  <Bot size={14} />
                </div>
                <div className="bg-white dark:bg-[#181922] px-3.5 py-2 rounded-2xl rounded-bl-none border border-purple-100 dark:border-gray-800 flex items-center gap-1.5 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-[#A507FA] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#A507FA] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#A507FA] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  <span className="ml-1 text-[11px] font-medium">Buscando en el catálogo...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Preguntas Rápidas */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 bg-purple-50/40 dark:bg-[#12021E] border-t border-purple-100 dark:border-gray-800 flex gap-1.5 overflow-x-auto no-scrollbar">
              {QUICK_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="whitespace-nowrap text-[11px] font-medium bg-white dark:bg-[#181922] hover:bg-purple-50 dark:hover:bg-purple-950/40 text-slate-700 dark:text-slate-200 px-2.5 py-1.5 rounded-full border border-purple-200 dark:border-gray-700 transition-colors shadow-2xs"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Formulario de Entrada */}
          <div className="p-3 bg-white dark:bg-[#12021E] border-t border-purple-100 dark:border-gray-800 space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Pregunta por colchones, medidas, firmeza o flete..."
                disabled={isLoading}
                className="flex-1 text-xs sm:text-sm bg-purple-50/30 dark:bg-gray-900 text-slate-900 dark:text-white px-3.5 py-2.5 rounded-xl border border-purple-200 dark:border-gray-700 focus:outline-none focus:border-[#A507FA] transition-colors placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                aria-label="Enviar mensaje"
                className="bg-[#A507FA] hover:bg-[#8B00D9] disabled:opacity-50 text-white p-2.5 rounded-xl transition-all flex items-center justify-center shadow-md hover:scale-105 active:scale-95 disabled:hover:scale-100"
              >
                <Send size={16} />
              </button>
            </form>

            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1 pt-0.5">
              <span className="flex items-center gap-1">
                <Sparkles size={11} className="text-[#A507FA]" />
                Potenciado por Gemini
              </span>
              <a
                href="https://wa.me/584141584360"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:underline flex items-center gap-1 font-semibold"
              >
                <PhoneCall size={11} /> WhatsApp: 0414-1584360
              </a>
            </div>

          </div>

        </div>
      )}
    </>
  );
};

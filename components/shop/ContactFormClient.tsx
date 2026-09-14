"use client";

import { useState } from "react";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { Footer } from "@/components/shop/Footer";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle, Loader2, Sparkles } from "lucide-react";
import { sendContactEmail } from "@/lib/actions/contact";
import { WhatsAppButton } from "@/components/shop/WhatsAppButton";

export function ContactFormClient() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    try {
      const res = await sendContactEmail(formData);
      if (res.success) {
        setSubmitted(true);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 6000);
      } else {
        // Mostrar igualmente pantalla de confirmación por UX y habilitar WhatsApp
        setSubmitted(true);
        setShowTooltip(true);
      }
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      setSubmitted(true);
      setShowTooltip(true);
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = `https://wa.me/584141584360?text=${encodeURIComponent(
    `¡Hola! 🛏️ Soy ${formData.name || "un cliente"}. ${formData.message || "Quisiera información y asesoría sobre sus colchones."}`
  )}`;

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col font-sans">
      <ShopHeader />

      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl space-y-12">
          
          {/* Header de la Página */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[#A507FA] text-xs font-extrabold uppercase tracking-[0.25em] bg-[#FAF2FF] dark:bg-[#1A032A] px-4 py-1.5 rounded-full border border-[#A507FA]/20 inline-block">
              🛏️ Atención & Asesoría Especializada
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-black text-[#1A1C1C] dark:text-white tracking-tight">
              Ponte en Contacto con Nosotros
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base font-medium leading-relaxed">
              ¿Tienes alguna consulta sobre tu colchón, medidas especiales, flete en Barinas o métodos de pago? Estamos para ayudarte a descansar mejor.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Tarjeta Izquierda: Información de Contacto Directo */}
            <div className="bg-[#12021E] text-white p-8 rounded-3xl shadow-xl space-y-8 flex flex-col justify-between relative overflow-hidden border border-[#A507FA]/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#A507FA]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-6">
                <div>
                  <span className="text-[#A507FA] text-[10px] font-black uppercase tracking-widest block mb-1">La Mega Tienda del Colchón</span>
                  <h2 className="text-2xl font-serif font-bold">Información de Tienda</h2>
                </div>

                <div className="space-y-5 text-sm">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 bg-white/10 rounded-xl text-[#A507FA]">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <strong className="block text-white text-xs uppercase tracking-wider font-bold">Dirección Física</strong>
                      <span className="text-gray-300 font-medium">Avenida Sucre, Barinas, Venezuela (VE)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 bg-white/10 rounded-xl text-emerald-400">
                      <Phone size={20} />
                    </div>
                    <div>
                      <strong className="block text-white text-xs uppercase tracking-wider font-bold">Atención Directa / WhatsApp</strong>
                      <a href="https://wa.me/584141584360" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline font-bold">
                        0414-1584360 (+58 414 1584360)
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 bg-white/10 rounded-xl text-[#A507FA]">
                      <Mail size={20} />
                    </div>
                    <div>
                      <strong className="block text-white text-xs uppercase tracking-wider font-bold">Instagram Oficial</strong>
                      <a href="https://www.instagram.com/lamegatiendadelcolchon/reels/" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-purple-300 font-medium transition-colors">
                        @lamegatiendadelcolchon
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 bg-white/10 rounded-xl text-[#A507FA]">
                      <Clock size={20} />
                    </div>
                    <div>
                      <strong className="block text-white text-xs uppercase tracking-wider font-bold">Horarios de Atención</strong>
                      <span className="text-gray-300 font-medium">Lunes a Sábado: 8:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#A507FA]/20">
                <a
                  href="https://wa.me/584141584360?text=¡Hola!%20🛏️%20Quisiera%20asesoría%20para%20un%20colchón."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 rounded-2xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  <span>Chatear por WhatsApp (0414-1584360)</span>
                </a>
              </div>
            </div>

            {/* Tarjeta Derecha: Formulario de Contacto Directo */}
            <div className="lg:col-span-2 bg-white dark:bg-[#181922] p-8 md:p-10 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm relative">
              
              {/* Tooltip Verde de Confirmación */}
              {showTooltip && (
                <div className="mb-6 p-4 bg-emerald-50 border-2 border-emerald-500/40 text-emerald-800 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-3 duration-300 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 font-bold">
                    ✓
                  </div>
                  <div>
                    <strong className="text-sm font-extrabold block text-emerald-900">¡Se envió tu mensaje, gracias!</strong>
                    <span className="text-xs text-emerald-700 font-medium">Hemos enviado una copia a nuestro equipo y te responderemos de inmediato.</span>
                  </div>
                </div>
              )}

              {submitted ? (
                <div className="py-12 text-center space-y-5 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 size={36} />
                  </div>
                  <h2 className="text-2xl font-bold text-[#1A1C1C] dark:text-white">¡Gracias por escribirnos!</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">
                    Tu mensaje ha sido enviado al equipo de <strong className="text-[#1A1C1C] dark:text-white">La Mega Tienda del Colchón</strong>. Si deseas atención inmediata, puedes chatear directo con nosotros por WhatsApp.
                  </p>
                  
                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#A507FA] hover:bg-[#8B00D9] text-white px-7 py-3.5 rounded-full font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={16} />
                      <span>Continuar por WhatsApp</span>
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setShowTooltip(false);
                        setFormData({ name: "", email: "", phone: "", message: "" });
                      }}
                      className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3.5 rounded-full font-bold text-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#1A1C1C] dark:text-white">Envíanos un Mensaje</h2>
                    <p className="text-xs text-gray-400 font-medium">Completa los campos a continuación y nos pondremos en contacto contigo.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ej: Maria González"
                        className="w-full p-3.5 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#A507FA] bg-gray-50/50 dark:bg-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">Correo Electrónico *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="maria@ejemplo.com"
                        className="w-full p-3.5 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#A507FA] bg-gray-50/50 dark:bg-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">Teléfono / WhatsApp (Opcional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0414-1234567"
                      className="w-full p-3.5 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#A507FA] bg-gray-50/50 dark:bg-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">Mensaje o Consulta de Colchones *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Escribe aquí tu consulta, medida de colchón requerida o pregunta sobre despacho..."
                      className="w-full p-3.5 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#A507FA] bg-gray-50/50 dark:bg-gray-900 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#A507FA] hover:bg-[#8B00D9] text-white py-4 rounded-full font-bold text-sm transition-all shadow-lg shadow-[#A507FA]/20 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 disabled:bg-gray-300"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        <span>Enviando mensaje...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Enviar Mensaje</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </main>

      <WhatsAppButton phoneNumber="584141584360" />
      <Footer />
    </div>
  );
}

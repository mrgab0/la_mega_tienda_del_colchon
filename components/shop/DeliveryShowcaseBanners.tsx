"use client";

import React from "react";
import Link from "next/link";
import { Truck, Sparkles, ArrowRight, ShieldCheck, MapPin, MessageCircle } from "lucide-react";

export function DeliveryShowcaseBanners() {
  return (
    <section className="py-14 sm:py-20 relative z-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Grilla de 2 Banners Grandes Paralelos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* BANNER 1: Despacho y Flete en Barinas & Venezuela */}
          <div className="group relative rounded-3xl overflow-hidden min-h-[420px] sm:min-h-[480px] flex flex-col justify-between p-8 sm:p-10 text-white shadow-2xl border border-white/10">
            {/* Imagen de Fondo con Overlay Oscuro Gradiente */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&auto=format&fit=crop&q=80"
                alt="Despacho de Colchones La Mega Tienda"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/60 to-slate-900/30" />
            </div>

            {/* Badges Superiores */}
            <div className="relative z-10 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-blue-600/90 text-white px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-md">
                <Truck size={13} />
                <span>Despacho Confiable</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-300">
                <MapPin size={12} />
                <span>Barinas & Envíos Nacionales</span>
              </span>
            </div>

            {/* Texto y Llamado a la Acción Inferior */}
            <div className="relative z-10 space-y-4 max-w-lg">
              <div className="space-y-2">
                <span className="text-amber-400 text-xs font-black uppercase tracking-[0.2em] block">
                  Entrega Segura y Puntual
                </span>
                <h3 className="font-serif font-black text-3xl sm:text-4xl leading-tight tracking-tight">
                  Tu Colchón Nuevo Directo a la Puerta de tu Hogar
                </h3>
                <p className="text-sm text-gray-200 font-medium leading-relaxed">
                  Flete coordinado en Barinas o retiro en nuestra tienda física en Avenida Sucre. Productos embalados con máxima protección.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/rastreo"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-xl active:scale-95 border border-amber-400/40"
                >
                  <span>Rastrear Pedido 📦</span>
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="/productos"
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-white/30"
                >
                  <span>Ver Colchones</span>
                </Link>
              </div>
            </div>
          </div>

          {/* BANNER 2: Asesoría de Descanso & Medidas Especiales */}
          <div className="group relative rounded-3xl overflow-hidden min-h-[420px] sm:min-h-[480px] flex flex-col justify-between p-8 sm:p-10 text-white shadow-2xl border border-white/10">
            {/* Imagen de Fondo con Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?w=1200&auto=format&fit=crop&q=80"
                alt="Colchones de Lujo y Confort"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/60 to-slate-900/30" />
            </div>

            {/* Badges Superiores */}
            <div className="relative z-10 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-amber-500/90 text-slate-950 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-md font-bold">
                <Sparkles size={13} className="text-slate-950" />
                <span>Garantía de Descanso</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-200">
                <ShieldCheck size={12} />
                <span>Ortopédicos & Semi-Ortopédicos</span>
              </span>
            </div>

            {/* Texto y Llamado a la Acción Inferior */}
            <div className="relative z-10 space-y-4 max-w-lg">
              <div className="space-y-2">
                <span className="text-amber-400 text-xs font-black uppercase tracking-[0.2em] block">
                  Asesoría Personalizada
                </span>
                <h3 className="font-serif font-black text-3xl sm:text-4xl leading-tight tracking-tight">
                  Encuentra el Nivel de Firmeza Perfecto
                </h3>
                <p className="text-sm text-gray-200 font-medium leading-relaxed">
                  ¿Tienes dudas entre un colchón ortopédico, resortes ensacados o pillow top? Chatea con nuestros expertos por WhatsApp y recibe cotización al instante.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://wa.me/13467392730?text=Hola%20La%20Mega%20Tienda%20del%20Colchón,%20deseo%20asesoría%20para%20un%20colchón"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-xl active:scale-95"
                >
                  <MessageCircle size={15} />
                  <span>Hablar por WhatsApp</span>
                </a>

                <Link
                  href="/productos"
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-white/30"
                >
                  <span>Explorar Catálogo</span>
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Sparkles, ArrowRight, ShoppingBag, Flame, Tag } from "lucide-react";
import { useCart } from "@/components/shop/Cart/CartContext";

export function FlashSaleCollectionsSection() {
  const { addToCart } = useCart();

  // Contador de Cuenta Regresiva Cíclica (48 horas dinámicas)
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 14,
    minutes: 36,
    seconds: 48
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          return { days: 2, hours: 12, minutes: 0, seconds: 0 }; // Reinicio elegante
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-14 sm:py-20 relative z-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Encabezado de Sección */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-[#FAF2FF] dark:bg-[#1A032A] text-[#A507FA] border border-[#A507FA]/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">
            <Flame size={13} className="text-[#A507FA]" />
            <span>Colección & Ofertas Especiales</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#1A1C1C] dark:text-white tracking-tight">
            Colección Descanso Barinas 2026
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
            Colchones ortopédicos y conjuntos con descuentos exclusivos por tiempo limitado en Barinas.
          </p>
        </div>

        {/* Grilla: Oferta Flash a la izquierda + Colecciones a la derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* TARJETA PRINCIPAL IZQUIERDA: Flash Sale con Temporizador en Vivo */}
          <div className="lg:col-span-6 bg-gradient-to-br from-white via-[#FAF2FF] to-[#F3E0FF] dark:from-[#181922] dark:to-[#12021E] p-6 sm:p-8 rounded-3xl border border-[#A507FA]/30 dark:border-gray-800 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
            
            {/* Encabezado del Flash Sale & Contador */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 bg-[#A507FA] text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md animate-pulse">
                  <Tag size={12} />
                  <span>Oferta Flash • -25% OFF</span>
                </span>
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Clock size={13} className="text-[#A507FA]" />
                  <span>Termina en:</span>
                </span>
              </div>

              {/* Bloques del Contador */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                <div className="bg-white dark:bg-gray-800/80 p-3 rounded-2xl border border-purple-100 dark:border-gray-700 shadow-sm">
                  <span className="font-serif font-black text-2xl sm:text-3xl text-[#1A1C1C] dark:text-white block">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-extrabold text-gray-700 dark:text-gray-200 tracking-wider">Días</span>
                </div>
                <div className="bg-white dark:bg-gray-800/80 p-3 rounded-2xl border border-purple-100 dark:border-gray-700 shadow-sm">
                  <span className="font-serif font-black text-2xl sm:text-3xl text-[#1A1C1C] dark:text-white block">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-extrabold text-gray-700 dark:text-gray-200 tracking-wider">Horas</span>
                </div>
                <div className="bg-white dark:bg-gray-800/80 p-3 rounded-2xl border border-purple-100 dark:border-gray-700 shadow-sm">
                  <span className="font-serif font-black text-2xl sm:text-3xl text-[#1A1C1C] dark:text-white block">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-extrabold text-gray-700 dark:text-gray-200 tracking-wider">Min</span>
                </div>
                <div className="bg-white dark:bg-gray-800/80 p-3 rounded-2xl border border-purple-100 dark:border-gray-700 shadow-sm">
                  <span className="font-serif font-black text-2xl sm:text-3xl text-[#A507FA] block">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-extrabold text-gray-700 dark:text-gray-200 tracking-wider">Seg</span>
                </div>
              </div>
            </div>

            {/* Imagen del Colchón Estrella & Detalles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center my-2">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-white dark:border-gray-700 group">
                <img
                  src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&auto=format&fit=crop&q=80"
                  alt="Colchón Ortopédico en Oferta"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-2 left-2 bg-[#A507FA] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  🔥 Más Vendido
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif font-black text-xl text-[#1A1C1C] dark:text-white">
                  Colchón Ortopédico Imperial Queen Pillow Top
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                  Espuma de alta densidad indeformable con tela acolchada hipoalergénica y soporte lumbar avanzado.
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#A507FA]">$199.99</span>
                  <span className="text-sm font-bold text-gray-400 line-through">$269.99</span>
                </div>
              </div>
            </div>

            {/* Botón de Compra Directa */}
            <div className="pt-2">
              <button
                onClick={() => addToCart({
                  id: "flash-sale-colchon-queen",
                  name: "Colchón Ortopédico Imperial Queen Pillow Top",
                  price: 199.99,
                  image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&auto=format&fit=crop&q=80"
                })}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#A507FA] hover:bg-[#8B00D9] text-white py-3.5 px-6 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#A507FA]/20 active:scale-95"
              >
                <ShoppingBag size={16} />
                <span>Aprovechar Oferta Flash Ahora</span>
              </button>
            </div>
          </div>

          {/* TARJETAS DERECHAS: Colecciones Visuales con Botón Central */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Colección 1: Ortopédicos */}
            <div className="group relative rounded-3xl overflow-hidden min-h-[260px] flex items-center justify-center shadow-lg border border-white/20">
              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format&fit=crop&q=80"
                alt="Colección Colchones Ortopédicos"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#12021E]/50 group-hover:bg-[#12021E]/40 transition-colors" />
              <Link
                href="/productos?cat=ortopedicos"
                className="relative z-10 bg-white text-[#12021E] hover:bg-[#A507FA] hover:text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-xl group-hover:scale-105 active:scale-95"
              >
                Ortopédicos ↗
              </Link>
            </div>

            {/* Colección 2: Matrimoniales */}
            <div className="group relative rounded-3xl overflow-hidden min-h-[260px] flex items-center justify-center shadow-lg border border-white/20">
              <img
                src="https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?w=500&auto=format&fit=crop&q=80"
                alt="Colección Matrimoniales"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#12021E]/50 group-hover:bg-[#12021E]/40 transition-colors" />
              <Link
                href="/productos?cat=matrimonial"
                className="relative z-10 bg-white text-[#12021E] hover:bg-[#A507FA] hover:text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-xl group-hover:scale-105 active:scale-95"
              >
                Matrimoniales ↗
              </Link>
            </div>

            {/* Colección 3: King & Queen */}
            <div className="group relative rounded-3xl overflow-hidden min-h-[260px] flex items-center justify-center shadow-lg border border-white/20">
              <img
                src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=500&auto=format&fit=crop&q=80"
                alt="Colección King & Queen"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#12021E]/50 group-hover:bg-[#12021E]/40 transition-colors" />
              <Link
                href="/productos?cat=queen"
                className="relative z-10 bg-white text-[#12021E] hover:bg-[#A507FA] hover:text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-xl group-hover:scale-105 active:scale-95"
              >
                King & Queen ↗
              </Link>
            </div>

            {/* Colección 4: Almohadas & Bases */}
            <div className="group relative rounded-3xl overflow-hidden min-h-[260px] flex items-center justify-center shadow-lg border border-white/20">
              <img
                src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&auto=format&fit=crop&q=80"
                alt="Colección Almohadas & Bases"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#12021E]/50 group-hover:bg-[#12021E]/40 transition-colors" />
              <Link
                href="/productos?cat=almohadas"
                className="relative z-10 bg-white text-[#12021E] hover:bg-[#A507FA] hover:text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-xl group-hover:scale-105 active:scale-95"
              >
                Almohadas & Bases ↗
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

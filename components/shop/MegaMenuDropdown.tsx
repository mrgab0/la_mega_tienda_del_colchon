"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Moon, Radio, Bed, Layers } from "lucide-react";

interface MegaMenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenuDropdown({ isOpen, onClose }: MegaMenuDropdownProps) {
  if (!isOpen) return null;

  const sizes = [
    { name: "Individual (1.00 x 1.90m)", href: "/productos?size=individual", badge: "1 Plaza" },
    { name: "Matrimonial (1.40 x 1.90m)", href: "/productos?size=matrimonial", badge: "Popular" },
    { name: "Queen Size (1.60 x 1.90m)", href: "/productos?size=queen", badge: "Top Ventas" },
    { name: "King Size (2.00 x 2.00m)", href: "/productos?size=king", badge: "VIP" },
  ];

  const types = [
    { name: "Colchones Ortopédicos", href: "/productos?cat=ortopedicos", badge: "Salud Lumbar" },
    { name: "Pillow Top / Euro Top", href: "/productos?cat=pillow-top", badge: "Confort" },
    { name: "Resortes Pocket Ensacados", href: "/productos?cat=resortes-pocket" },
    { name: "Espuma Alta Densidad", href: "/productos?cat=espuma" },
  ];

  const accessories = [
    { name: "Somieres & Bases Box", href: "/productos?cat=somieres", tag: "Estructura" },
    { name: "Almohadas Memory Foam", href: "/productos?cat=almohadas", tag: "Ergonómicas" },
    { name: "Protectores de Colchón", href: "/productos?cat=protectores", tag: "Impermeable" },
    { name: "Combos Colchón + Somier", href: "/productos?cat=combos", tag: "Oferta" },
  ];

  return (
    <div 
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[92vw] max-w-5xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-3xl border border-blue-500/30 dark:border-slate-800 shadow-[0_20px_50px_rgba(15,23,42,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-6 sm:p-8 z-50 transition-all duration-300 animate-in fade-in slide-in-from-top-3"
      onMouseLeave={onClose}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Columna 1: Medidas */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-blue-500/20 pb-2">
            <Bed size={16} className="text-blue-600 dark:text-blue-400" />
            <h4 className="font-bold text-sm tracking-wider uppercase text-slate-900 dark:text-white">
              Por Medida
            </h4>
          </div>
          <ul className="space-y-2.5">
            {sizes.map((item, idx) => (
              <li key={idx}>
                <Link 
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 p-1.5 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800/60 transition-all"
                >
                  <span>🛏️ {item.name}</span>
                  {item.badge && (
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 2: Tipo de Colchón */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-blue-500/20 pb-2">
            <Layers size={16} className="text-blue-600 dark:text-blue-400" />
            <h4 className="font-bold text-sm tracking-wider uppercase text-slate-900 dark:text-white">
              Tecnología & Tipo
            </h4>
          </div>
          <ul className="space-y-2.5">
            {types.map((item, idx) => (
              <li key={idx}>
                <Link 
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 p-1.5 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800/60 transition-all"
                >
                  <span>✨ {item.name}</span>
                  {item.badge && (
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 3: Complementos & Somieres */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-blue-500/20 pb-2">
            <Moon size={16} className="text-blue-600 dark:text-blue-400" />
            <h4 className="font-bold text-sm tracking-wider uppercase text-slate-900 dark:text-white">
              Bases & Almohadas
            </h4>
          </div>
          <ul className="space-y-2.5">
            {accessories.map((item, idx) => (
              <li key={idx}>
                <Link 
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 p-1.5 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800/60 transition-all"
                >
                  <span>💤 {item.name}</span>
                  {item.tag && (
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                      {item.tag}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 4: Banner Radio Colchón */}
        <div className="relative rounded-2xl overflow-hidden group bg-gradient-to-br from-blue-900 to-slate-950 p-5 text-white flex flex-col justify-between shadow-lg border border-blue-500/30">
          <div className="relative z-10 space-y-2">
            <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest">
              <Radio size={11} className="animate-pulse" /> Radio Colchón
            </span>
            <h5 className="font-bold text-base leading-snug text-white">
              Frecuencias para Conciliar el Sueño
            </h5>
            <p className="text-[11px] text-slate-300 font-medium">
              Escucha streaming psicoacústico gratis desde radiocolchon.com.
            </p>
          </div>

          <Link
            href="/productos"
            onClick={onClose}
            className="mt-4 relative z-10 inline-flex items-center justify-center gap-2 bg-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs hover:bg-amber-400 transition-all shadow-md active:scale-95"
          >
            <span>Ver Catálogo Barinas</span>
            <ArrowRight size={13} />
          </Link>
        </div>

      </div>
    </div>
  );
}

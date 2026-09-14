"use client";

import Link from "next/link";
import { Radio, MapPin, Phone, Instagram, MessageCircle } from "lucide-react";

interface FooterProps {
  siteConfig?: any;
}

export function Footer({ siteConfig }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-200 py-14 border-t border-blue-900/50 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-slate-800 pb-10 mb-10">
          
          {/* Columna 1: Marca & Radio Colchón */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white text-2xl shadow-lg border border-blue-400/40">
                🛏️
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {siteConfig?.footerTitle || "La Mega Tienda del Colchón"}
                </h3>
                <p className="text-xs text-amber-400 font-medium">
                  {siteConfig?.footerSlogan || "Especialistas en Descanso • Barinas, Venezuela"}
                </p>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Tu tienda de colchones ortopédicos, matrimoniales, queen, king, somieres y almohadas en Barinas. Máximo confort con entrega a domicilio.
            </p>

            {/* Radio Colchón Badge */}
            <a
              href="https://radiocolchon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all shadow-sm group"
            >
              <Radio className="w-4 h-4 animate-pulse group-hover:scale-110 transition-transform" />
              <span>Escucha Radio Colchón en Vivo 📻</span>
            </a>
          </div>

          {/* Columna 2: Ubicación & Contacto */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Ubicación & Contacto
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Avenida Sucre, Barinas, Venezuela (VE)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="tel:+13467392730" className="hover:text-amber-400 transition-colors">
                  +1 346 739 2730
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="https://wa.me/13467392730" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  WhatsApp: +1 346 739 2730
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <a href="https://www.instagram.com/lamegatiendadelcolchon/reels/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
                  @lamegatiendadelcolchon
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Enlaces Rápidos & Categorías */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Categorías de Descanso
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <Link href="/productos" className="hover:text-amber-400 transition-colors">Colchones Matrimoniales</Link>
              <Link href="/productos" className="hover:text-amber-400 transition-colors">Colchones Queen & King</Link>
              <Link href="/productos" className="hover:text-amber-400 transition-colors">Colchones Ortopédicos</Link>
              <Link href="/productos" className="hover:text-amber-400 transition-colors">Bases & Somieres</Link>
              <Link href="/productos" className="hover:text-amber-400 transition-colors">Almohadas Ergonómicas</Link>
              <Link href="/rastreo" className="hover:text-amber-400 transition-colors">Rastreo de Pedidos</Link>
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-xs text-slate-400">
          <p>
            {siteConfig?.footerCopyright || `© ${new Date().getFullYear()} La Mega Tienda del Colchón. Todos los derechos reservados.`}
          </p>
          <div className="flex items-center gap-3">
            <span>Métodos: Pago Móvil • Zelle • Transferencia • Efectivo en Tienda</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

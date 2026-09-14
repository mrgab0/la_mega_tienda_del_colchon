"use client";

import Link from "next/link";
import { Radio, MapPin, Phone, Instagram, MessageCircle } from "lucide-react";

interface FooterProps {
  siteConfig?: any;
}

export function Footer({ siteConfig }: FooterProps) {
  return (
    <footer className="bg-[#12021E] text-white py-14 border-t border-purple-900/60 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#12021E] via-[#1A032A] to-[#0D0115] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-purple-900/50 pb-10 mb-10">
          
          {/* Columna 1: Marca & Radio Colchón */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#A507FA] flex items-center justify-center text-white text-2xl shadow-lg border border-white/40">
                🛏️
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {siteConfig?.footerTitle || "La Mega Tienda del Colchón"}
                </h3>
                <p className="text-xs text-purple-300 font-medium">
                  {siteConfig?.footerSlogan || "Especialistas en Descanso • Barinas, Venezuela"}
                </p>
              </div>
            </div>
            
            <p className="text-xs text-purple-200/80 leading-relaxed max-w-sm">
              Tu tienda de colchones ortopédicos, matrimoniales, queen, king, somieres y almohadas en Barinas. Máximo confort con entrega a domicilio.
            </p>

            {/* Radio Colchón Badge */}
            <a
              href="https://radiocolchon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#A507FA] hover:bg-[#8B00D9] text-white border border-white/30 text-xs font-bold transition-all shadow-md group"
            >
              <Radio className="w-4 h-4 animate-pulse group-hover:scale-110 transition-transform text-white" />
              <span>Escucha Radio Colchón en Vivo 📻</span>
            </a>
          </div>

          {/* Columna 2: Ubicación & Contacto */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-purple-900/50 pb-2">
              Ubicación & Contacto
            </h4>
            <ul className="space-y-2.5 text-xs text-purple-100 font-medium">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D48FFF] shrink-0" />
                <span>Avenida Sucre, Barinas, Venezuela (VE)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D48FFF] shrink-0" />
                <a href="tel:+584141584360" className="hover:text-white transition-colors">
                  0414-1584360
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="https://wa.me/584141584360" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition-colors">
                  WhatsApp: 0414-1584360
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <a href="https://www.instagram.com/lamegatiendadelcolchon/reels/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-300 transition-colors">
                  @lamegatiendadelcolchon
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Enlaces Rápidos & Categorías */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-purple-900/50 pb-2">
              Categorías de Descanso
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-purple-200">
              <Link href="/productos" className="hover:text-white transition-colors">Colchones Matrimoniales</Link>
              <Link href="/productos" className="hover:text-white transition-colors">Colchones Queen & King</Link>
              <Link href="/productos" className="hover:text-white transition-colors">Colchones Ortopédicos</Link>
              <Link href="/productos" className="hover:text-white transition-colors">Bases & Somieres</Link>
              <Link href="/productos" className="hover:text-white transition-colors">Almohadas Ergonómicas</Link>
              <Link href="/rastreo" className="hover:text-white transition-colors">Rastreo de Pedidos</Link>
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-xs text-purple-300/70">
          <p>
            {siteConfig?.footerCopyright || `© ${new Date().getFullYear()} La Mega Tienda del Colchón. Todos los derechos reservados.`}
          </p>
          <div className="flex items-center gap-3 text-purple-200">
            <span>Métodos: Pago Móvil • Zelle • Transferencia • Efectivo en Tienda</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

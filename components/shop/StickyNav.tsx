"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/shop/LanguageSwitcher";
import { ThemeToggle } from "@/components/shop/ThemeToggle";
import dynamic from "next/dynamic";
import { MegaMenuDropdown } from "@/components/shop/MegaMenuDropdown";
import { Fingerprint, Instagram, Facebook, MessageCircle, ChevronDown, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

const CustomerBiometricModal = dynamic(
  () => import("@/components/auth/CustomerBiometricModal").then((m) => m.CustomerBiometricModal),
  { ssr: false }
);

interface StickyNavProps {
  siteConfig?: any;
}

export function StickyNav({ siteConfig }: StickyNavProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("nav");

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 180);
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const enableSocials = siteConfig?.enableHeaderSocials !== false;
  const instagramUrl = siteConfig?.instagramUrl || "https://www.instagram.com/lamegatiendadelcolchon/reels/";
  const facebookUrl = siteConfig?.facebookUrl || "https://facebook.com";
  const tiktokUrl = siteConfig?.tiktokUrl || "https://tiktok.com";
  const whatsappUrl = siteConfig?.whatsappUrl || "https://wa.me/584141584360";

  const navLinks = [
    { href: "/", label: t('home') },
    { href: "/productos", label: t('catalog'), isMega: true },
    { href: "/rastreo", label: t('tracking') },
    { href: "/nosotros", label: t('about') },
    { href: "/contacto", label: t('contact') },
    { href: "/checkout", label: t('cart') }
  ];

  return (
    <>
      <nav
        className={`w-full z-50 transition-all duration-500 border-y border-[#A507FA]/20 ${
          isSticky
            ? "fixed top-0 bg-[#12021E]/95 dark:bg-[#0D0115]/95 text-white backdrop-blur-lg shadow-xl py-1"
            : "relative bg-white/95 dark:bg-[#12021E]/95 backdrop-blur-md py-2 border-b border-purple-100 dark:border-purple-950/60"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between gap-3 sm:gap-6 relative">
          
          {/* LADO IZQUIERDO: Logo de La Mega Tienda del Colchón */}
          <div className="flex items-center gap-4 py-2 flex-shrink-0 z-10">
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden border-2 border-[#A507FA] shadow-md group-hover:scale-105 group-active:scale-95 transition-transform bg-[#A507FA] flex items-center justify-center text-white font-black text-xl flex-shrink-0">
                <span>🛏️</span>
              </div>
              <div className="hidden xl:flex flex-col">
                <span className="font-bold text-base text-slate-900 dark:text-white tracking-tight flex-shrink-0 leading-tight">
                  La Mega Tienda <span className="text-[#A507FA] dark:text-[#D48FFF]">del Colchón</span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-purple-300 font-medium">Barinas • Av. Sucre</span>
              </div>
            </Link>

            {enableSocials && (
              <div className="hidden 2xl:flex items-center gap-1 ml-4 pl-4 border-l border-purple-200 dark:border-purple-900/50">
                {instagramUrl && (
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-700 dark:text-gray-300 hover:text-[#A507FA] hover:-translate-y-1 active:scale-95 transition-all bg-purple-50 dark:bg-purple-950/40 rounded-full shadow-sm hover:shadow-md" title="Instagram @lamegatiendadelcolchon">
                    <Instagram size={15} />
                  </a>
                )}
                {whatsappUrl && (
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-emerald-600 dark:text-emerald-400 hover:-translate-y-1 active:scale-95 transition-all bg-emerald-50 dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md" title="WhatsApp +58 414 1584360">
                    <MessageCircle size={15} />
                  </a>
                )}
                <a href="https://radiocolchon.com" target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 text-[11px] font-bold text-[#A507FA] dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800/60 hover:-translate-y-0.5 active:scale-95 transition-all rounded-full shadow-sm" title="Radio Colchón">
                  📻 Radio Colchón
                </a>
              </div>
            )}
          </div>

          {/* CENTRO: Menú de Navegación en Escritorio */}
          <div 
            ref={scrollRef}
            className="hidden md:flex flex-1 min-w-0 items-center justify-start lg:justify-center overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden font-bold text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] py-2 gap-2 sm:gap-3 px-2"
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            {navLinks.map((link, idx) => (
              <div 
                key={idx} 
                className="relative"
                onMouseEnter={() => link.isMega && setIsMegaMenuOpen(true)}
              >
                <Link 
                  href={link.href} 
                  className="px-4 py-2.5 rounded-full bg-purple-50/70 dark:bg-purple-950/40 text-slate-800 dark:text-gray-200 shadow-sm hover:shadow-md hover:bg-[#A507FA] hover:text-white dark:hover:bg-[#A507FA] dark:hover:text-white hover:-translate-y-0.5 active:scale-95 transition-all duration-300 border border-purple-100 dark:border-purple-900/50 inline-flex items-center gap-1"
                >
                  {link.label}
                  {link.isMega && <ChevronDown size={12} className={`transition-transform duration-300 ${isMegaMenuOpen ? "rotate-180" : ""}`} />}
                </Link>
              </div>
            ))}
          </div>

          {/* Mega Menú Flotante */}
          <div onMouseEnter={() => setIsMegaMenuOpen(true)} onMouseLeave={() => setIsMegaMenuOpen(false)}>
            <MegaMenuDropdown 
              isOpen={isMegaMenuOpen} 
              onClose={() => setIsMegaMenuOpen(false)} 
            />
          </div>

          {/* DERECHA: Botones de Control y Toggle Móvil */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setIsBioModalOpen(true)}
              className="flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950/60 text-[#A507FA] dark:text-purple-300 border border-purple-200 dark:border-purple-800/80 px-3 py-2 rounded-full text-xs font-bold shadow-sm hover:bg-[#A507FA] hover:text-white hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
              title="Acceso con Huella / Face ID (Passkeys)"
            >
              <Fingerprint size={14} />
              <span className="hidden sm:inline text-[11px]">Huella 👆</span>
            </button>

            <div className="hover:-translate-y-0.5 active:scale-95 transition-all duration-300">
              <ThemeToggle />
            </div>
            
            <div className="hover:-translate-y-0.5 active:scale-95 transition-all duration-300">
              <LanguageSwitcher />
            </div>

            {/* Botón de Menú Móvil (Contraer / Desplegar) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-slate-900 dark:text-gray-200 border border-purple-200 dark:border-purple-800 shadow-sm hover:bg-[#A507FA] hover:text-white active:scale-95 transition-all"
              aria-label={isMobileMenuOpen ? "Contraer menú" : "Desplegar menú"}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MENÚ MÓVIL DESPLEGABLE */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-purple-100 dark:border-purple-900/60 bg-white/95 dark:bg-[#12021E]/95 backdrop-blur-xl px-4 py-4 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-2xl bg-purple-50/60 dark:bg-purple-950/40 text-slate-800 dark:text-gray-100 font-bold text-sm shadow-sm active:scale-[0.98] transition-all hover:bg-[#A507FA] hover:text-white dark:hover:bg-[#A507FA]"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[#A507FA] group-hover:text-white">→</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </nav>

      {isBioModalOpen && (
        <CustomerBiometricModal
          isOpen={isBioModalOpen}
          onClose={() => setIsBioModalOpen(false)}
        />
      )}
    </>
  );
}

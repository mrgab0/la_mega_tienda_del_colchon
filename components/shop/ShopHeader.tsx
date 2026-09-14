"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, ArrowLeft, Fingerprint, Menu, X } from "lucide-react";
import { useCart } from "@/components/shop/Cart/CartContext";
import { LanguageSwitcher } from "@/components/shop/LanguageSwitcher";
import { ThemeToggle } from "@/components/shop/ThemeToggle";
import { CustomerBiometricModal } from "@/components/auth/CustomerBiometricModal";
import { useTranslations } from "next-intl";

export const ShopHeader = () => {
  const { cartItems } = useCart();
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations("nav");

  const navLinks = [
    { href: "/", label: t('home') },
    { href: "/productos", label: t('catalog') },
    { href: "/rastreo", label: t('tracking') },
    { href: "/nosotros", label: t('about') },
    { href: "/contacto", label: t('contact') }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#12021E]/95 backdrop-blur-md border-b border-purple-100 dark:border-purple-950/60 shadow-sm transition-all">
        <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-3 sm:gap-6">
          {/* Logo Presionable hacia el Home */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0 z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden border-2 border-[#A507FA] shadow-md group-hover:scale-105 group-active:scale-95 transition-transform bg-[#A507FA] flex items-center justify-center text-xl text-white flex-shrink-0">
              <span>🛏️</span>
            </div>
            <div className="hidden xl:block flex-shrink-0">
              <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-[#A507FA] transition-colors block">
                La Mega Tienda <span className="text-[#A507FA] dark:text-[#D48FFF]">del Colchón</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-500 dark:text-purple-300 font-bold block -mt-0.5">
                Barinas • Av. Sucre
              </span>
            </div>
          </Link>

          {/* Navegación Central (Escritorio) */}
          <nav className="hidden md:flex flex-1 min-w-0 items-center justify-start lg:justify-center overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden font-bold text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] px-2 gap-2 sm:gap-3 py-2">
            {navLinks.map((link, idx) => (
              <Link 
                key={idx}
                href={link.href} 
                className="px-4 py-2.5 rounded-full bg-purple-50/70 dark:bg-purple-950/40 text-slate-800 dark:text-gray-200 shadow-sm hover:shadow-md hover:bg-[#A507FA] hover:text-white dark:hover:bg-[#A507FA] dark:hover:text-white hover:-translate-y-0.5 active:scale-95 transition-all duration-300 border border-purple-100 dark:border-purple-900/50"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Acciones Derecha (Acceso por Huella, Tema, Idioma, Carrito y Toggle Móvil) */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Botón de Acceso Biométrico / Passkeys con Huella */}
            <button
              onClick={() => setIsBioModalOpen(true)}
              className="flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950/60 text-[#A507FA] dark:text-purple-300 border border-purple-200 dark:border-purple-800/80 px-3 py-2 rounded-full text-xs font-bold shadow-sm hover:bg-[#A507FA] hover:text-white hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
              title="Acceso con Huella / Face ID"
            >
              <Fingerprint size={16} />
              <span className="hidden sm:inline text-[11px]">Huella 👆</span>
            </button>

            <div className="hover:-translate-y-0.5 active:scale-95 transition-all duration-300">
              <ThemeToggle />
            </div>
            <div className="hover:-translate-y-0.5 active:scale-95 transition-all duration-300">
              <LanguageSwitcher />
            </div>

            {/* Cart Button indicator */}
            <div className="relative ml-1">
              <Link
                href="/checkout"
                className="flex items-center gap-2 bg-[#A507FA] hover:bg-[#8B00D9] text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs transition-all shadow-md shadow-[#A507FA]/30 hover:scale-105 active:scale-95"
              >
                <ShoppingCart size={18} />
                <span className="hidden sm:inline">Carrito</span>
                {totalCount > 0 && (
                  <span className="bg-white text-[#A507FA] text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                    {totalCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Botón Toggle de Menú Móvil */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-purple-50 dark:bg-purple-950/60 text-slate-900 dark:text-gray-200 border border-purple-200 dark:border-purple-800 hover:bg-[#A507FA] hover:text-white active:scale-95 transition-all"
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
      </header>

      {/* Modal Biométrico */}
      <CustomerBiometricModal
        isOpen={isBioModalOpen}
        onClose={() => setIsBioModalOpen(false)}
      />
    </>
  );
};

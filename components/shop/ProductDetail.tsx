"use client";

import { useState, useCallback, useMemo, startTransition } from "react";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { AddonSelection } from "@/components/shop/AddonSelection";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { CheckCircle2, Flower2, Package, Sparkles, ShieldCheck, Truck, Tag, ArrowDown, Gamepad2 } from "lucide-react";
import { useTranslations } from "next-intl";

export const ProductDetail = ({ product }: { product: any }) => {
  const t = useTranslations("ProductDetail");
  const [selectedAddons, setSelectedAddons] = useState<{ addonId: string; value?: string; price?: number; name?: string }[]>([]);
  const [lastAddonToast, setLastAddonToast] = useState<{ name: string; price: number } | null>(null);

  const images = useMemo(() => (
    product.images && product.images.length > 0
      ? product.images
      : ["https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=800"]
  ), [product.images]);

  const [activeImage, setActiveImage] = useState(images[0]);

  // Formateador de viñetas para la descripción
  const descriptionBullets = useMemo(() => (
    (product.description || "")
      .split("\n")
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 0)
  ), [product.description]);

  // Cálculo Dinámico del Precio Combinado (Base + Adicionales)
  const basePrice = Number(product.price || 0);
  const { addonsTotalPrice, combinedTotalPrice } = useMemo(() => {
    const addonsTotal = selectedAddons.reduce((acc, curr) => acc + (curr.price || 0), 0);
    return {
      addonsTotalPrice: addonsTotal,
      combinedTotalPrice: basePrice + addonsTotal
    };
  }, [selectedAddons, basePrice]);

  const handleSelectionChange = useCallback((newSelection: { addonId: string; value?: string; price?: number; name?: string }[]) => {
    setSelectedAddons(newSelection);
    // Si se añadió un nuevo adicional, disparamos el tooltip de forma no bloqueante con startTransition
    if (newSelection.length > selectedAddons.length) {
      const added = newSelection[newSelection.length - 1];
      if (added && added.name) {
        startTransition(() => {
          setLastAddonToast({ name: added.name || "Adicional", price: added.price || 0 });
        });
        setTimeout(() => {
          startTransition(() => {
            setLastAddonToast(null);
          });
        }, 4500);
      }
    }
  }, [selectedAddons.length]);

  return (
    <div className="min-h-screen bg-[#FAF2FF] dark:bg-[#0D0115] flex flex-col font-sans">
      {/* Header Visible con Logo al Home y Carrito */}
      <ShopHeader />

      {/* Contenido Principal */}
      <main className="flex-1 py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl space-y-10">
          
          {/* Tarjeta Principal de Producto */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white dark:bg-[#12021E] p-6 md:p-10 rounded-3xl shadow-sm border border-purple-100 dark:border-purple-950/80">
            
            {/* COLUMNA IZQUIERDA: Galería de Imágenes (hasta 7 fotos) */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 shadow-sm group">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-contain p-2 transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Insignia o Categoría Flotante */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/95 text-[#A507FA] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md border border-purple-200">
                    {product.category}
                  </span>
                  {product.badge && (
                    <span className="bg-[#A507FA] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {product.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Tira de Miniaturas Seleccionables */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                        activeImage === img ? "border-[#A507FA] ring-2 ring-[#A507FA]/30 scale-105" : "border-purple-100 dark:border-purple-900/60 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* COLUMNA DERECHA: Información y Especificaciones Estructuradas */}
            <div className="flex flex-col space-y-6">
              
              {/* Titular y Precio Dinámico */}
              <div>
                <span className="text-[#A507FA] text-xs font-black uppercase tracking-[0.2em] block mb-1">
                  Colchón & Descanso de Lujo
                </span>
                <h1 className="text-3xl md:text-4xl font-serif font-black text-[#12021E] dark:text-white leading-tight mb-3">
                  {product.name}
                </h1>

                <div className="flex flex-wrap items-baseline gap-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl md:text-4xl font-extrabold text-[#A507FA] dark:text-[#D48FFF] transition-all">
                      ${combinedTotalPrice.toFixed(2)} USD
                    </span>
                    {addonsTotalPrice > 0 && (
                      <span className="text-xs text-gray-400 line-through font-bold">
                        ${basePrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {addonsTotalPrice > 0 && (
                    <span className="bg-purple-50 dark:bg-purple-950/60 text-[#A507FA] dark:text-purple-300 text-xs font-black px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800 flex items-center gap-1 animate-pulse">
                      <Sparkles size={13} /> +${addonsTotalPrice.toFixed(2)} en complementos
                    </span>
                  )}
                </div>
              </div>

              {/* CAJA VISUAL DE ESPECIFICACIONES DE COLCHÓN */}
              <div className="bg-purple-50/60 dark:bg-purple-950/40 rounded-2xl p-5 border border-purple-100 dark:border-purple-900/60 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300 flex items-center gap-2">
                  <Sparkles size={14} className="text-[#A507FA]" /> Especificaciones de Confort & Descanso
                </h3>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  {product.mattressSize ? (
                    <div className="bg-white dark:bg-[#1A032A] p-3 rounded-xl border border-purple-100 dark:border-purple-900/60 flex items-center gap-2.5">
                      <div className="p-2 bg-purple-50 dark:bg-purple-900/50 text-[#A507FA] rounded-lg">
                        <Package size={16} />
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Medida</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{product.mattressSize}</span>
                      </div>
                    </div>
                  ) : null}

                  {product.firmness ? (
                    <div className="bg-white dark:bg-[#1A032A] p-3 rounded-xl border border-purple-100 dark:border-purple-900/60 flex items-center gap-2.5">
                      <div className="p-2 bg-purple-50 dark:bg-purple-900/50 text-[#A507FA] rounded-lg">
                        <Sparkles size={16} />
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Firmeza</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{product.firmness}</span>
                      </div>
                    </div>
                  ) : null}

                  {product.structureType ? (
                    <div className="bg-white dark:bg-[#1A032A] p-3 rounded-xl border border-purple-100 dark:border-purple-900/60 flex items-center gap-2.5">
                      <div className="p-2 bg-purple-50 dark:bg-purple-900/50 text-[#A507FA] rounded-lg">
                        <Tag size={16} />
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Estructura</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{product.structureType}</span>
                      </div>
                    </div>
                  ) : null}

                  <div className="bg-white dark:bg-[#1A032A] p-3 rounded-xl border border-purple-100 dark:border-purple-900/60 flex items-center gap-2.5">
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/50 text-[#A507FA] rounded-lg">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Garantía</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{product.warrantyYears || 5} Años de Fábrica</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* VIÑETAS / CARACTERÍSTICAS DINÁMICAS (Features) */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{t('includesTitle')}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((feature: any, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-xs bg-white dark:bg-[#1A032A] p-2.5 rounded-xl border border-purple-100 dark:border-purple-900/60">
                        <CheckCircle2 size={16} className="text-[#A507FA] flex-shrink-0" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          <strong className="text-gray-900 dark:text-white">{feature.label}:</strong> {feature.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECCIÓN DE ADICIONALES COMPATIBLES */}
              {product.addons && product.addons.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Tag size={14} className="text-[#A507FA]" /> {t('addonsTitle')}
                  </h3>
                  <AddonSelection addons={product.addons} onSelectionChange={handleSelectionChange} />
                </div>
              )}

              {/* DESCRIPCIÓN SECTORIZADA EN VIÑETAS LIMPIAS */}
              <div className="space-y-3 pt-2 border-t border-purple-100 dark:border-purple-900/60">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">{t('descriptionTitle')}</h3>
                <div className="bg-white dark:bg-[#1A032A] p-5 rounded-2xl border border-purple-100 dark:border-purple-900/60 space-y-2 text-sm text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                  {descriptionBullets.map((paragraph: string, i: number) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A507FA] mt-2 flex-shrink-0" />
                      <p>{paragraph}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* BOTÓN AGREGAR AL CARRITO CON ANIMACIÓN GAMIFICADA Y FLECHA TUTORIAL */}
              <div className="pt-4 mt-auto space-y-3 relative">

                {/* Toast / Tooltip Flotante Animado cuando se selecciona un adicional */}
                {lastAddonToast && (
                  <div className="p-3 bg-[#12021E] text-white rounded-2xl shadow-xl border border-purple-500/30 flex items-center justify-between animate-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-[#A507FA] rounded-lg text-white">
                        <Sparkles size={16} />
                      </div>
                      <div>
                        <span className="text-xs font-extrabold block text-white">¡+1 {lastAddonToast.name} añadido!</span>
                        <span className="text-[10px] text-purple-200 font-medium">Sumado al total: ${combinedTotalPrice.toFixed(2)} USD</span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-white bg-[#A507FA] px-2.5 py-1 rounded-full">
                      +${lastAddonToast.price.toFixed(2)}
                    </span>
                  </div>
                )}

                {/* Banner Tutorial Animado estilo Boutique con Flecha Rebotando cuando hay adicionales */}
                {selectedAddons.length > 0 && (
                  <div className="p-3.5 bg-gradient-to-r from-[#7A00BD] to-[#A507FA] text-white rounded-2xl shadow-lg border border-purple-300/40 flex items-center justify-between animate-bounce duration-1000">
                    <div className="flex items-center gap-2.5">
                      <Sparkles size={20} className="text-white animate-spin duration-1000" />
                      <span className="text-xs font-black tracking-wide">
                        🛏️ ¡Tu combo de descanso está listo! Presiona el botón de abajo 🛏️
                      </span>
                    </div>
                    <ArrowDown size={20} className="text-white animate-pulse" />
                  </div>
                )}

                <AddToCartButton
                  product={{
                    ...product,
                    price: combinedTotalPrice,
                    selectedAddons
                  }}
                />
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
};


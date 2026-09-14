"use client";

import Link from 'next/link';
import React from 'react';
import { useCart } from "@/components/shop/Cart/CartContext";
import { useTranslations } from "next-intl";
import { ShoppingBag, Sparkles } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  badge?: string;
  image: string;
  secondaryImage?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  slug,
  price,
  category,
  badge,
  image,
  secondaryImage
}) => {
  const { addToCart } = useCart();
  const t = useTranslations("common");

  const optimizeImageUrl = (url: string) => {
    if (!url) return "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80&auto=format";
    if (url.includes("ik.imagekit.io") && !url.includes("tr=")) {
      return url.includes("?") ? `${url}&tr=w-400,q-80,f-auto` : `${url}?tr=w-400,q-80,f-auto`;
    }
    if (url.includes("images.unsplash.com") && !url.includes("w=")) {
      return `${url}${url.includes("?") ? "&" : "?"}w=400&q=80&auto=format`;
    }
    return url;
  };

  const optimizedMainImage = optimizeImageUrl(image);
  const optimizedSecondaryImage = secondaryImage ? optimizeImageUrl(secondaryImage) : undefined;

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl transition-all duration-500 overflow-hidden border border-slate-200 dark:border-slate-800 shadow-[0px_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0px_16px_36px_rgba(15,23,42,0.12)] hover:-translate-y-1 flex flex-col justify-between select-none">
      <Link
        href={`/productos/${slug}`}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        className="block relative select-none"
      >
        {/* Contenedor de Imagen con Zoom suave */}
        <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-950">
          <img
            src={optimizedMainImage}
            alt={name}
            loading="lazy"
            decoding="async"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className={`w-full h-full object-cover select-none pointer-events-none transform group-hover:scale-105 transition-all duration-700 ease-out ${
              optimizedSecondaryImage ? 'group-hover:opacity-0' : ''
            }`}
          />
          {optimizedSecondaryImage && (
            <img
              src={optimizedSecondaryImage}
              alt={`${name} - alternativa`}
              loading="lazy"
              decoding="async"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transform scale-100 group-hover:scale-105 transition-all duration-700 ease-out opacity-0 group-hover:opacity-100"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          {/* Badge Flotante estilo Categoría */}
          <div className="absolute top-3 left-3">
            <span className="bg-white/95 dark:bg-[#12021E]/95 backdrop-blur-md text-[#A507FA] dark:text-[#D48FFF] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-purple-200 dark:border-purple-800/80 shadow-sm">
              {category}
            </span>
          </div>

          {/* Insignia / Badge Personalizada */}
          {badge && (
            <div className="absolute top-3 right-3">
              <span className="bg-[#A507FA] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md border border-white/40 flex items-center gap-1">
                <Sparkles size={10} className="text-white" />
                {badge}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-[#A507FA] dark:group-hover:text-[#D48FFF] transition-colors mb-1.5 line-clamp-1">
            <Link
              href={`/productos/${slug}`}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            >
              {name}
            </Link>
          </h3>
          <p className="text-xs text-slate-500 dark:text-purple-300 font-medium line-clamp-1 mb-3">
            Colchón & Descanso • Barinas, VE
          </p>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-purple-100 dark:border-purple-950/60">
          <div>
            <span className="text-xs text-slate-500 dark:text-gray-400 block font-semibold">Precio</span>
            <span className="text-xl font-black text-[#A507FA] dark:text-[#D48FFF]">${price.toFixed(2)}</span>
          </div>

          <button 
            onClick={() => addToCart({ id, name, price, image })}
            className="bg-[#A507FA] hover:bg-[#8B00D9] text-white px-4 py-2.5 rounded-xl active:scale-95 transition-all duration-300 font-bold text-xs shadow-md shadow-purple-900/20 border border-white/30 flex items-center gap-1.5 hover:scale-105"
          >
            <ShoppingBag size={14} />
            <span>{t('addToCart')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

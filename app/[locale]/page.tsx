import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { ProductCard } from "@/components/shop/ProductCard/ProductCard";
import { HeroSlider } from "@/components/shop/HeroSlider/HeroSlider";
import { StickyNav } from "@/components/shop/StickyNav";
import { FeaturedProductsSlider } from "@/components/shop/FeaturedProductsSlider";
import { FlashSaleCollectionsSection } from "@/components/shop/FlashSaleCollectionsSection";
import dbConnect from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { getSiteConfig } from "@/lib/actions/siteConfig";
import { getSliders } from "@/lib/actions/slider";
import { PhoneCall, Sparkles, MapPin, Truck, ShieldCheck, Radio } from "lucide-react";
import { WhatsAppButton } from "@/components/shop/WhatsAppButton/WhatsAppButton";
import { RadioColchonPlayer } from "@/components/shop/RadioColchonPlayer";

// Code splitting dinámico para componentes bajo el pliegue
const SocialAndReviewsSection = dynamic(
  () => import("@/components/shop/SocialAndReviewsSection").then((m) => m.SocialAndReviewsSection),
  { ssr: true }
);

const CustomIframeSection = dynamic(
  () => import("@/components/shop/CustomIframeSection").then((m) => m.CustomIframeSection),
  { ssr: true }
);

const DeliveryShowcaseBanners = dynamic(
  () => import("@/components/shop/DeliveryShowcaseBanners").then((m) => m.DeliveryShowcaseBanners),
  { ssr: true }
);

const Footer = dynamic(
  () => import("@/components/shop/Footer").then((m) => m.Footer),
  { ssr: true }
);

export const revalidate = 60;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  await dbConnect();

  const [t, productsRaw, siteConfigRes, slidersRes] = await Promise.all([
    getTranslations({ locale }),
    Product.find({ isActive: { $ne: false } })
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(16)
      .lean(),
    getSiteConfig(),
    getSliders(),
  ]);

  const products = JSON.parse(JSON.stringify(productsRaw));
  const siteConfig = siteConfigRes?.data;
  const initialSlides = slidersRes?.data ? [...slidersRes.data].sort((a, b) => (a.order || 0) - (b.order || 0)) : [];

  const desktopCols = siteConfig?.productColumnsDesktop || 3;
  const gridClasses = {
    2: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  }[desktopCols] || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0115] text-slate-900 dark:text-slate-100 relative selection:bg-[#A507FA] selection:text-white">
      
      {/* Header & Sticky Nav Bar */}
      <StickyNav siteConfig={siteConfig} />

      {/* Hero Section Editorial de La Mega Tienda del Colchón */}
      <section className="relative z-20 min-h-[440px] pt-10 pb-14 flex flex-col items-center justify-center bg-gradient-to-b from-[#12021E]/15 via-[#FAF2FF]/30 to-transparent dark:from-[#12021E]/60 dark:via-[#0D0115]/40 dark:to-transparent border-b border-[#A507FA]/20 transition-colors duration-300">
        
        <div className="container mx-auto px-6 text-center z-20 flex flex-col items-center">
          
          {/* Kicker Editorial */}
          <div className="inline-flex items-center gap-2 bg-[#FAF2FF] dark:bg-[#1A032A] text-[#A507FA] border border-[#A507FA]/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.18em] mb-4 shadow-sm">
            <Sparkles size={13} className="text-[#A507FA]" />
            <span>Especialistas en Colchones & Descanso</span>
          </div>

          {/* Título Principal */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black text-slate-950 dark:text-white mb-4 tracking-tight leading-tight">
            {siteConfig?.heroTitle || "La Mega Tienda del Colchón"}
          </h1>

          {/* Eslogan e Información de Ubicación / Servicios */}
          <div className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto mb-8 font-medium leading-relaxed space-y-2">
            <p className="font-serif italic text-[#A507FA] text-lg sm:text-xl font-bold">
              {siteConfig?.brandSlogan || "Especialistas en Descanso • Barinas, Venezuela"}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold pt-1">
              <span className="flex items-center gap-1"><MapPin size={15} className="text-[#A507FA]" /> Avenida Sucre, Barinas</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Truck size={15} className="text-[#A507FA]" /> Flete y Despacho</span>
              <span>•</span>
              <span className="flex items-center gap-1"><ShieldCheck size={15} className="text-[#A507FA]" /> Garantía de Fábrica</span>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a 
              href="https://wa.me/584141584360"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#A507FA] hover:bg-[#8B00D9] text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-xl shadow-[#A507FA]/30 border border-[#A507FA]/60 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
            >
              <PhoneCall size={16} className="text-white group-hover:rotate-12 transition-transform" />
              <span>WhatsApp: 0414-1584360</span>
            </a>

            <a 
              href="/productos" 
              className="w-full sm:w-auto bg-white dark:bg-[#12021E] text-slate-900 dark:text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-[#FAF2FF] dark:hover:bg-[#1A032A] hover:border-[#A507FA] transition-all border border-slate-300 dark:border-gray-800 shadow-md hover:scale-105 active:scale-95"
            >
              <span>{locale === 'en' ? t('Index.exploreButton') : "Explorar Catálogo"}</span>
            </a>
          </div>

        </div>
      </section>

      {/* Slider Section */}
      <HeroSlider initialSlides={initialSlides} />

      {/* 1. NUEVO: Slider de Productos Destacados en Tendencia */}
      <FeaturedProductsSlider products={products.filter((p: any) => p.isFeatured)} />

      {/* 2. NUEVO: Módulo Promocional Colecciones Flash & Diseños Exclusivos */}
      <FlashSaleCollectionsSection />

      {/* Main Catalog Grid */}
      <section className="container mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#A507FA]/20">
          <div>
            <span className="text-xs font-bold text-[#A507FA] uppercase tracking-widest block mb-1">
              Catálogo de Confort
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">
              Colchones y Sistemas de Descanso
            </h2>
          </div>
          <p className="text-sm text-slate-500 mt-2 md:mt-0 font-medium">
            Mostrando los modelos más recomendados para tu postura y sueño
          </p>
        </div>

        <div className={`grid ${gridClasses} gap-6`}>
          {products.length > 0 ? (
            products.map((product: any) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-slate-500 py-8 font-medium">No hay productos disponibles por ahora.</p>
          )}
        </div>
      </section>

      {/* Banners de Entrega & Despacho */}
      <DeliveryShowcaseBanners />

      {/* Módulo Social & Reviews */}
      <SocialAndReviewsSection
        enableReviews={siteConfig?.enableReviewsSection !== false}
        reviewsTitle={siteConfig?.reviewsTitle}
        ratingScore={siteConfig?.reviewsRatingScore}
        countText={siteConfig?.reviewsCountText}
        trustpilotWidgetHtml={siteConfig?.trustpilotWidgetHtml}
        enableSocialFeed={siteConfig?.enableSocialFeed !== false}
        socialTitle={siteConfig?.socialFeedTitle || "Síguenos en Instagram @lamegatiendadelcolchon 💤"}
        embedHtml={siteConfig?.socialEmbedHtml}
        instagramUrl={siteConfig?.instagramUrl || "https://www.instagram.com/lamegatiendadelcolchon/reels/"}
      />

      {/* Iframe de Ubicación (Avenida Sucre, Barinas) */}
      <CustomIframeSection
        enableCustomIframe={siteConfig?.enableCustomIframe || false}
        customIframeTitle={siteConfig?.customIframeTitle}
        customIframeHtml={siteConfig?.customIframeHtml}
      />

      {/* Radio Colchón Floating Live Stream Player */}
      <RadioColchonPlayer
        streamUrl={siteConfig?.radioStreamUrl || "https://radiocolchon.com"}
        title={siteConfig?.radioTitle || "Radio Colchón"}
        description={siteConfig?.radioDescription || "Frecuencias y Música para Dormir"}
      />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton phoneNumber="584141584360" />

      <Footer siteConfig={siteConfig} />
    </main>
  );
}

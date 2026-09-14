import dynamic from 'next/dynamic';
import { ProductCard } from "@/components/shop/ProductCard/ProductCard";
import { HeroSlider } from "@/components/shop/HeroSlider/HeroSlider";
import { StickyNav } from "@/components/shop/StickyNav";
import dbConnect from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { getSiteConfig } from "@/lib/actions/siteConfig";
import { getSliders } from "@/lib/actions/slider";
import { PhoneCall, Sparkles, MapPin, Truck, ShieldCheck, Radio } from "lucide-react";
import { RadioColchonPlayer } from "@/components/shop/RadioColchonPlayer";
import { WhatsAppButton } from "@/components/shop/WhatsAppButton/WhatsAppButton";

const SocialAndReviewsSection = dynamic(
  () => import("@/components/shop/SocialAndReviewsSection").then((m) => m.SocialAndReviewsSection),
  { ssr: true }
);

const CustomIframeSection = dynamic(
  () => import("@/components/shop/CustomIframeSection").then((m) => m.CustomIframeSection),
  { ssr: true }
);

const Footer = dynamic(
  () => import("@/components/shop/Footer").then((m) => m.Footer),
  { ssr: true }
);

export const revalidate = 60;

export default async function Home() {
  await dbConnect();
  
  let productsRaw = await Product.find({ isActive: { $ne: false } })
    .sort({ isFeatured: -1, createdAt: -1 })
    .limit(16)
    .lean();

  if (!productsRaw || productsRaw.length === 0) {
    const { seedDatabase } = await import("@/lib/seed");
    await seedDatabase();
    productsRaw = await Product.find({ isActive: { $ne: false } })
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(16)
      .lean();
  }

  const [siteConfigRes, slidersRes] = await Promise.all([
    getSiteConfig(),
    getSliders(),
  ]);
  const products = JSON.parse(JSON.stringify(productsRaw));
  const siteConfig = siteConfigRes?.data;
  const initialSlides = slidersRes?.data ? [...slidersRes.data].sort((a, b) => (a.order || 0) - (b.order || 0)) : [];

  const desktopCols = siteConfig?.productColumnsDesktop || 3;
  let gridColsClass = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
  if (desktopCols === 4) {
    gridColsClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6";
  } else if (desktopCols === 5) {
    gridColsClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6";
  }

  const firstBannerImage = initialSlides.length > 0 && initialSlides[0].type === 'banner' && !initialSlides[0].image?.match(/\.(mp4|webm|ogg)$/i)
    ? initialSlides[0].image
    : null;

  const preloadBannerUrl = firstBannerImage
    ? (firstBannerImage.includes("images.unsplash.com")
        ? `${firstBannerImage.split("?")[0]}?w=600&q=75&auto=format`
        : firstBannerImage.includes("ik.imagekit.io")
        ? `${firstBannerImage.split("?")[0]}?tr=w-600,q-75,f-auto`
        : firstBannerImage)
    : null;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-x-hidden">
      {preloadBannerUrl && (
        <link
          rel="preload"
          as="image"
          href={preloadBannerUrl}
          fetchPriority="high"
        />
      )}

      {/* Header & Sticky Nav Bar */}
      <StickyNav siteConfig={siteConfig} />

      {/* Hero Section - La Mega Tienda del Colchón */}
      <section className="relative z-20 pt-8 pb-14 flex flex-col items-center justify-center bg-gradient-to-b from-blue-950/20 via-slate-900/10 to-transparent dark:from-blue-950/40 dark:via-slate-950/30 dark:to-transparent border-b border-blue-500/20 transition-colors duration-300">
        <div className="container mx-auto px-6 text-center z-20 flex flex-col items-center">
          
          {/* Badge Icon */}
          <div className="mb-4 relative group">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-blue-700 to-slate-900 flex items-center justify-center text-4xl sm:text-5xl shadow-2xl border-2 border-amber-400/80 transform hover:scale-105 transition-transform duration-300">
              🛏️
            </div>
          </div>

          {/* Kicker Tag */}
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 border border-blue-400/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] mb-4 shadow-sm">
            <Sparkles size={13} className="text-amber-500" />
            <span>Especialistas en Descanso • Barinas VE</span>
          </div>

          {/* Título Principal */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
            {siteConfig?.heroTitle || "La Mega Tienda del Colchón"}
          </h1>

          {/* Eslogan e Información de Ubicación / Servicios */}
          <div className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto mb-8 font-medium leading-relaxed space-y-2">
            <p className="text-blue-700 dark:text-blue-300 text-lg sm:text-xl font-semibold">
              {siteConfig?.heroSlogan || "El descanso de tus sueños al mejor precio."}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold pt-1">
              <span className="flex items-center gap-1"><MapPin size={15} className="text-blue-600 dark:text-blue-400" /> Avenida Sucre, Barinas</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Truck size={15} className="text-blue-600 dark:text-blue-400" /> Despacho a Domicilio</span>
              <span>•</span>
              <span className="flex items-center gap-1"><ShieldCheck size={15} className="text-amber-500" /> Garantía de Fábrica</span>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a 
              href="https://wa.me/584141584360"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-xl shadow-blue-900/30 border border-amber-400/60 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
            >
              <PhoneCall size={16} className="text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>WhatsApp: 0414-1584360</span>
            </a>

            <a 
              href="/productos" 
              className="w-full sm:w-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-blue-50 dark:hover:bg-slate-800 transition-all border border-slate-300 dark:border-slate-800 shadow-md hover:scale-105 active:scale-95"
            >
              {siteConfig?.heroButtonText || "Ver Catálogo de Colchones"}
            </a>
          </div>

        </div>
      </section>

      {/* Slider Section */}
      <div className="container mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-20">
        <HeroSlider initialSlides={initialSlides} />
      </div>

      {/* Radio Colchón Feature Banner */}
      <section className="container mx-auto px-4 sm:px-6 pt-12 z-20 relative">
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white border border-blue-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
              <Radio className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-red-500/20 text-red-300 border border-red-500/40 uppercase mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping"></span> Transmisión en Vivo
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Radio Colchón 📻</h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Música relajante, frecuencias binaurales y sonidos para un descanso profundo y reparador.
              </p>
            </div>
          </div>
          <a
            href="https://radiocolchon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>Sintonizar radiocolchon.com</span>
            <span>↗</span>
          </a>
        </div>
      </section>

      {/* Módulo iFrame Personalizado */}
      {siteConfig?.enableCustomIframe && (
        <CustomIframeSection
          title={siteConfig.customIframeTitle}
          iframeHtml={siteConfig.customIframeHtml}
        />
      )}

      {/* Product Grid con Columnas Dinámicas */}
      <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 z-20 relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 pb-4 border-b border-blue-500/20 gap-4">
          <div>
            <span className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-[0.2em] block mb-1">
              Catálogo de Descanso
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Colchones y Somieres
            </h2>
          </div>
          <a href="/productos" className="text-blue-600 dark:text-blue-400 font-bold text-sm border-b-2 border-amber-400 pb-1 hover:text-blue-800 transition-all">
            Ver catálogo completo ↗
          </a>
        </div>

        <div className={gridColsClass}>
          {products.length > 0 ? (
            products.map((product: any) => (
              <ProductCard 
                key={product._id.toString()}
                id={product._id.toString()}
                name={product.name}
                slug={product.slug}
                price={product.price}
                category={product.category}
                badge={product.badge}
                image={product.images && product.images.length > 0 ? product.images[0] : ""}
                secondaryImage={product.images && product.images.length > 1 ? product.images[1] : undefined}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-slate-500 py-8 font-medium">No hay productos disponibles por el momento.</p>
          )}
        </div>
      </section>

      {/* Reseñas y Feed de Instagram */}
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

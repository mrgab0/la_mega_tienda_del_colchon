import mongoose, { Schema, Document } from "mongoose";

export interface ISiteConfig extends Document {
  key: string; // "global"
  heroTitle: string;
  heroSlogan: string;
  heroButtonText: string;
  footerTitle: string;
  footerSlogan: string;
  footerCopyright: string;

  // Personalización del Home & Cuadrícula de Productos
  productColumnsDesktop?: number; // 3, 4, o 5 columnas
  productColumnsMobile?: number;  // 1 o 2 columnas

  // Identidad de Marca y Menú de Navegación
  logoUrl?: string;
  brandSlogan?: string;
  menuHomeLabel?: string;
  menuCatalogLabel?: string;
  menuTrackingLabel?: string;
  menuAboutLabel?: string;
  menuContactLabel?: string;
  primaryColor?: string;

  // Redes Sociales en Cabecera
  enableHeaderSocials?: boolean;
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  whatsappUrl?: string;

  // Radio Colchón Live Streaming Integration
  enableRadioStream?: boolean;
  radioStreamUrl?: string;
  radioTitle?: string;
  radioDescription?: string;

  // Módulo Social de Instagram / TikTok (Pre-Footer)
  enableSocialFeed?: boolean;
  socialFeedTitle?: string;
  socialEmbedHtml?: string;

  // Módulo de Reseñas / Opiniones & Trustpilot (Pre-Footer)
  enableReviewsSection?: boolean;
  reviewsTitle?: string;
  reviewsRatingScore?: string;
  reviewsCountText?: string;
  trustpilotWidgetHtml?: string;

  // Módulo de iFrames / Widgets Personalizados
  enableCustomIframe?: boolean;
  customIframeTitle?: string;
  customIframeHtml?: string;

  // Módulo de Chatbot Inteligente Dialogflow CX
  enableChatbot?: boolean;
  dialogflowAgentId?: string;
  dialogflowProjectId?: string;
  dialogflowLocation?: string;
  dialogflowLanguageCode?: string;
  dialogflowChatTitle?: string;

  // Campos de 2FA (Seguridad de Dos Factores)
  twoFactorMode?: "none" | "pin" | "totp";
  twoFactorPin?: string;
  twoFactorSecret?: string;

  // Código OTP de rescate por email de emergencia
  rescueOtpCode?: string;
  rescueOtpExpiresAt?: Date;

  // Campos de Optimización SEO y Google Maps
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: string;
  googleSiteVerification?: string;
  bingSiteVerification?: string;
  googleAnalyticsId?: string;
  businessName?: string;
  businessPhone?: string;
  businessAddress?: string;
  businessCity?: string;

  updatedAt: Date;
}

const SiteConfigSchema: Schema = new Schema({
  key: { type: String, required: true, unique: true, default: "global" },
  heroTitle: { type: String, default: "La Mega Tienda del Colchón" },
  heroSlogan: { type: String, default: "El descanso de tus sueños al mejor precio. Colchones ortopédicos, somieres, almohadas y combos con entrega en Barinas." },
  heroButtonText: { type: String, default: "Ver Catálogo de Colchones" },
  footerTitle: { type: String, default: "La Mega Tienda del Colchón" },
  footerSlogan: { type: String, default: "Tu tienda de descanso y bienestar en Barinas • Avenida Sucre" },
  footerCopyright: { type: String, default: "© 2026 La Mega Tienda del Colchón. Todos los derechos reservados." },

  // Personalización del Home & Cuadrícula
  productColumnsDesktop: { type: Number, default: 3 },
  productColumnsMobile: { type: Number, default: 2 },

  // Identidad de Marca y Menú
  logoUrl: { type: String, default: "/logo.png" },
  brandSlogan: { type: String, default: "Especialistas en Descanso • Barinas, Venezuela" },
  menuHomeLabel: { type: String, default: "Inicio" },
  menuCatalogLabel: { type: String, default: "Colchones" },
  menuTrackingLabel: { type: String, default: "📦 Rastreo" },
  menuAboutLabel: { type: String, default: "Nosotros" },
  menuContactLabel: { type: String, default: "Contacto" },
  primaryColor: { type: String, default: "#A507FA" },

  // Redes Sociales en Cabecera
  enableHeaderSocials: { type: Boolean, default: true },
  facebookUrl: { type: String, default: "https://facebook.com" },
  instagramUrl: { type: String, default: "https://www.instagram.com/lamegatiendadelcolchon/reels/" },
  tiktokUrl: { type: String, default: "https://tiktok.com" },
  whatsappUrl: { type: String, default: "https://wa.me/584141584360" },

  // Radio Colchón Live Streaming Integration
  enableRadioStream: { type: Boolean, default: true },
  radioStreamUrl: { type: String, default: "https://radiocolchon.com" },
  radioTitle: { type: String, default: "Radio Colchón - Música y Frecuencias para Dormir" },
  radioDescription: { type: String, default: "Sintoniza nuestra estación en vivo con ondas binaurales y música relajante." },

  // Módulo Social Pre-Footer (Incrustados Instagram/TikTok)
  enableSocialFeed: { type: Boolean, default: true },
  socialFeedTitle: { type: String, default: "Síguenos en Instagram @lamegatiendadelcolchon 💤" },
  socialEmbedHtml: { type: String, default: "" },

  // Módulo de Reseñas / Opiniones (Pre-Footer)
  enableReviewsSection: { type: Boolean, default: true },
  reviewsTitle: { type: String, default: "La opinión de quienes descansan mejor en Barinas ⭐⭐⭐⭐⭐" },
  reviewsRatingScore: { type: String, default: "4.9 / 5.0" },
  reviewsCountText: { type: String, default: "+350 Clientes Satisfechos" },
  trustpilotWidgetHtml: { type: String, default: "" },

  // Módulo de iFrames Personalizados
  enableCustomIframe: { type: Boolean, default: false },
  customIframeTitle: { type: String, default: "Ubicación en Avenida Sucre, Barinas" },
  customIframeHtml: { type: String, default: "" },

  // Módulo de Chatbot Inteligente Dialogflow CX
  enableChatbot: { type: Boolean, default: false },
  dialogflowAgentId: { type: String, default: "" },
  dialogflowProjectId: { type: String, default: "" },
  dialogflowLocation: { type: String, default: "us-central1" },
  dialogflowLanguageCode: { type: String, default: "es" },
  dialogflowChatTitle: { type: String, default: "Asesor Virtual - La Mega Tienda del Colchón 🛏️" },

  twoFactorMode: { type: String, default: "none" },
  twoFactorPin: { type: String, default: "" },
  twoFactorSecret: { type: String, default: "" },

  rescueOtpCode: { type: String, default: "" },
  rescueOtpExpiresAt: { type: Date, default: null },

  // Campos SEO por defecto
  seoTitle: { type: String, default: "La Mega Tienda del Colchón | Barinas, Venezuela" },
  seoDescription: { type: String, default: "Venta de colchones ortopédicos, matrimoniales, queen, king, somieres y almohadas en Barinas, Av. Sucre. Los mejores precios y envíos directos." },
  seoKeywords: { type: String, default: "colchones barinas, la mega tienda del colchon, colchones ortopedicos, somier, almohadas, lenceria de cama, descanso barinas avenida sucre" },
  ogImage: { type: String, default: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200" },
  googleSiteVerification: { type: String, default: "" },
  bingSiteVerification: { type: String, default: "" },
  googleAnalyticsId: { type: String, default: "" },
  businessName: { type: String, default: "La Mega Tienda del Colchón" },
  businessPhone: { type: String, default: "+58 414 1584360" },
  businessAddress: { type: String, default: "Avenida Sucre" },
  businessCity: { type: String, default: "Barinas, Barinas, Venezuela" },

  updatedAt: { type: Date, default: Date.now }
});

export const SiteConfig = mongoose.models.SiteConfig || mongoose.model<ISiteConfig>("SiteConfig", SiteConfigSchema);

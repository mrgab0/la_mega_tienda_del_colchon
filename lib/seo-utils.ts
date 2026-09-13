import { IProduct as Product } from "@/lib/models/Product";

/**
 * Genera el script JSON-LD para un producto de descanso/colchón (Google Shopping & Rich Snippets).
 */
export function getProductSchema(product: Product, siteUrl: string = "https://lamegatiendadelcolchon.com") {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images || [],
    "description": product.description,
    "sku": product._id ? product._id.toString() : product.slug,
    "offers": {
      "@type": "Offer",
      "url": `${siteUrl}/productos/${product.slug}`,
      "priceCurrency": "USD",
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.stock > 0 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Store",
        "name": "La Mega Tienda del Colchón"
      }
    }
  };

  return JSON.stringify(schema);
}

/**
 * Genera el marcado JSON-LD de Negocio Local / Tienda de Colchones para Google Maps y SEO local en Barinas.
 */
export function getLocalBusinessSchema(config: any, siteUrl: string = "https://lamegatiendadelcolchon.com") {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "name": config?.businessName || "La Mega Tienda del Colchón",
    "image": config?.ogImage || `${siteUrl}/logo.png`,
    "@id": siteUrl,
    "url": siteUrl,
    "telephone": config?.businessPhone || "+58 414 1584360",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": config?.businessAddress || "Avenida Sucre",
      "addressLocality": config?.businessCity || "Barinas",
      "addressRegion": "Barinas",
      "addressCountry": "VE"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    }
  };

  return JSON.stringify(schema);
}

/**
 * Genera el esquema de Migas de Pan (Breadcrumbs) para Google SERP.
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return JSON.stringify(schema);
}

/**
 * Helper para generar Metadata dinámica en Next.js
 */
export function constructMetadata({
  title,
  description,
  image,
  slug = ""
}: {
  title: string;
  description: string;
  image?: string;
  slug?: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lamegatiendadelcolchon.com";
  const fullUrl = slug ? `${siteUrl}/${slug}` : siteUrl;

  return {
    title: `${title} | La Mega Tienda del Colchón`,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      images: image ? [{ url: image }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

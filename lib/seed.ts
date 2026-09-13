import dbConnect from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { Slider } from "@/lib/models/Slider";
import { SiteConfig } from "@/lib/models/SiteConfig";

export async function seedDatabase() {
  await dbConnect();

  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    console.log("Sembrando productos iniciales de colchones...");
    await Product.create([
      {
        name: "Colchón Ortopédico Matrimonial Luxury",
        slug: "colchon-ortopedico-matrimonial-luxury",
        sku: "COL-ORT-MAT-01",
        description: "Colchón de soporte ortopédico diseñado para el cuidado de la columna y alivio de puntos de presión. Confeccionado con resortes de alta resistencia y tela antitranspirante hipoalergénica.",
        price: 180,
        category: "Colchones",
        mattressSize: "Matrimonial (1.40 x 1.90m)",
        firmness: "Ortopédico",
        structureType: "Resortes Bonnell Reforzados",
        warrantyYears: 5,
        pillowTop: "Euro Top",
        heightCm: 28,
        brand: "La Mega Tienda del Colchón",
        dimensions: "1.40m x 1.90m x 0.28m",
        stock: 15,
        badge: "Más Vendido 🌟",
        images: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop&q=80"
        ],
        isActive: true,
        features: [
          { label: "Soporte Lumbar", value: "Alineación ergonómica de columna" },
          { label: "Tejido", value: "Piqué acolchado antiácaros" },
          { label: "Garantía", value: "5 Años directa de fábrica" }
        ]
      },
      {
        name: "Colchón Queen Size Pocket Spring Pillow Top",
        slug: "colchon-queen-size-pocket-spring-pillow-top",
        sku: "COL-QUN-POC-02",
        description: "Máximo confort e independencia de movimiento con resortes pocket encapsulados individualmente. Doble capa de pillow top de alta densidad.",
        price: 260,
        category: "Colchones",
        mattressSize: "Queen Size (1.60 x 1.90m)",
        firmness: "Media",
        structureType: "Resortes Pocket Ensacados",
        warrantyYears: 10,
        pillowTop: "Doble Pillow Top",
        heightCm: 32,
        brand: "La Mega Tienda del Colchón",
        dimensions: "1.60m x 1.90m x 0.32m",
        stock: 10,
        badge: "Confort VIP ✨",
        images: [
          "https://images.unsplash.com/photo-1540518614846-7ede433c4550?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800&auto=format&fit=crop&q=80"
        ],
        isActive: true,
        features: [
          { label: "Cero Transferencia", value: "Movimiento independiente de cada lado" },
          { label: "Acolchado", value: "Memory Foam Adaptativo" },
          { label: "Garantía", value: "10 Años de garantía" }
        ]
      },
      {
        name: "Colchón King Size Imperial Hotelero",
        slug: "colchon-king-size-imperial-hotelero",
        sku: "COL-KNG-IMP-03",
        description: "El rey del descanso. Espacio amplio de 2.00 x 2.00 metros con tecnología híbrida y espuma viscoelástica para una experiencia 5 estrellas en tu hogar.",
        price: 340,
        category: "Colchones",
        mattressSize: "King Size (2.00 x 2.00m)",
        firmness: "Media-Firme",
        structureType: "Híbrido (Pocket + Memory Foam)",
        warrantyYears: 10,
        pillowTop: "Grand Pillow Top",
        heightCm: 35,
        brand: "La Mega Tienda del Colchón",
        dimensions: "2.00m x 2.00m x 0.35m",
        stock: 8,
        badge: "Premium 👑",
        images: [
          "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop&q=80"
        ],
        isActive: true,
        features: [
          { label: "Espacio", value: "Medida King 2.00 x 2.00 m" },
          { label: "Frecuencia Descanso", value: "Compatible con Radio Colchón" },
          { label: "Garantía", value: "10 Años" }
        ]
      },
      {
        name: "Colchón Individual Ortopédico Juvenil",
        slug: "colchon-individual-ortopedico-juvenil",
        sku: "COL-IND-ORT-04",
        description: "Colchón individual de 1 plaza ideal para niños, jóvenes y camas auxiliares. Firmeza adecuada para el desarrollo y soporte postural.",
        price: 110,
        category: "Colchones",
        mattressSize: "Individual (1.00 x 1.90m)",
        firmness: "Firme",
        structureType: "Espuma Alta Densidad D30",
        warrantyYears: 5,
        pillowTop: "Sin Pillow Top",
        heightCm: 22,
        brand: "La Mega Tienda del Colchón",
        dimensions: "1.00m x 1.90m x 0.22m",
        stock: 20,
        badge: "Económico 🏷️",
        images: [
          "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800&auto=format&fit=crop&q=80"
        ],
        isActive: true,
        features: [
          { label: "Uso", value: "Individual 1 Plaza" },
          { label: "Material", value: "Espuma indeformable" }
        ]
      },
      {
        name: "Combo Box Spring + Colchón Matrimonial",
        slug: "combo-box-spring-colchon-matrimonial",
        sku: "COM-MAT-BOX-05",
        description: "Set completo de descanso: Colchón Ortopédico Matrimonial + Base Somier Box Tapizada en semicuero de alta durabilidad con patas reforzadas.",
        price: 240,
        category: "Combos Descanso",
        mattressSize: "Matrimonial (1.40 x 1.90m)",
        firmness: "Ortopédico",
        structureType: "Colchón + Somier Tapizado",
        warrantyYears: 5,
        pillowTop: "Euro Top",
        heightCm: 55,
        brand: "La Mega Tienda del Colchón",
        dimensions: "1.40m x 1.90m",
        stock: 12,
        badge: "Combo Ahorro 🔥",
        images: [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop&q=80"
        ],
        isActive: true,
        features: [
          { label: "Incluye", value: "Colchón + Base Somier + Patas" },
          { label: "Flete Barinas", value: "Entrega disponible en Av. Sucre y domicilio" }
        ]
      },
      {
        name: "Almohada Ergonómica Cervical Memory Foam",
        slug: "almohada-ergonomica-cervical-memory-foam",
        sku: "ACC-ALM-CER-06",
        description: "Almohada viscoelástica moldeada con soporte anatómico para cuello y cabeza. Funda lavable de fibra de bambú fresca.",
        price: 25,
        category: "Almohadas",
        mattressSize: "Estándar (60 x 40 cm)",
        firmness: "Media Adaptativa",
        structureType: "100% Memory Foam Viscoelástico",
        warrantyYears: 2,
        brand: "La Mega Tienda del Colchón",
        dimensions: "60cm x 40cm x 12cm",
        stock: 50,
        badge: "Salud Cervical 🌿",
        images: [
          "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80"
        ],
        isActive: true,
        features: [
          { label: "Beneficio", value: "Alivia tensión cervical y ronquidos" },
          { label: "Funda", value: "Lavable con cierre" }
        ]
      }
    ]);
  }

  const sliderCount = await Slider.countDocuments();
  if (sliderCount === 0) {
    console.log("Sembrando banners iniciales...");
    await Slider.create([
      {
        type: "banner",
        title: "El Descanso de tus Sueños en Barinas",
        description: "Colchones ortopédicos, matrimoniales, queen y somieres con los mejores precios de la ciudad.",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&auto=format&fit=crop&q=80",
        link: "/productos",
        ctaText: "Ver Modelos",
        showOverlay: true,
        order: 1,
        isActive: true
      },
      {
        type: "banner",
        title: "Sintoniza Radio Colchón en Vivo 📻",
        description: "Frecuencias psicoacústicas y música relajante para conciliar un sueño profundo.",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&auto=format&fit=crop&q=80",
        link: "https://radiocolchon.com",
        ctaText: "Escuchar en Vivo",
        showOverlay: true,
        order: 2,
        isActive: true
      }
    ]);
  }
}

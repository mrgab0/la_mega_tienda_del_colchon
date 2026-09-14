# Arquitectura Técnica - La Mega Tienda del Colchón

## 1. Identidad de Marca y Sistema de Diseño
- **Nombre Comercial:** La Mega Tienda del Colchón
- **Dominio:** `https://lamegatiendadelcolchon.com/`
- **Ubicación:** Avenida Sucre, Barinas, Venezuela (VE)
- **WhatsApp:** `+1 346 739 2730` (`https://wa.me/13467392730`)
- **Instagram:** `@lamegatiendadelcolchon` (`https://www.instagram.com/lamegatiendadelcolchon/reels/`)
- **Streaming de Radio Integrado:** Radio Colchón (`https://radiocolchon.com`)

### Paleta de Colores
- **Primario / Navy:** `#0F172A` (Azul Noche Oscuro)
- **Acento Confort:** `#1E40AF` / `#2563EB` (Azul Royal)
- **Acento Cálido:** `#F59E0B` (Ámbar / Dorado)
- **Superficie:** `#F8FAFC` (Blanco Nube Suave)

---

## 2. Modelo de Datos: Colchones & Descanso (MongoDB / Mongoose)

### Esquema: `Product`
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `name` | String | Nombre del producto (ej: "Colchón Ortopédico Matrimonial Luxury"). |
| `slug` | String | URL amigable única para SEO. |
| `price` | Number | Precio en USD. |
| `images` | String[] | URLs de imágenes optimizadas (ImageKit / Unsplash). |
| `category` | String | Categoría ('Colchones', 'Almohadas', 'Bases y Somieres', 'Combos Descanso'). |
| `mattressSize` | String | Tamaño ('Individual', 'Matrimonial', 'Queen Size', 'King Size'). |
| `firmness` | String | Firmeza ('Suave', 'Media', 'Firme', 'Ortopédico', 'Extra Firme'). |
| `structureType` | String | Tipo de estructura ('Resortes Pocket', 'Bonnell', 'Espuma HD', 'Híbrido'). |
| `warrantyYears` | Number | Años de garantía de fábrica. |
| `pillowTop` | String | Tipo de acolchado ('Euro Top', 'Doble Pillow Top', 'Sin Pillow Top'). |
| `stock` | Number | Cantidad disponible para despacho inmediato. |
| `badge` | String | Etiqueta destacada ('Más Vendido', 'Oferta', 'Premium'). |
| `features` | Array | Viñetas técnicas de soporte y tela. |

---

## 3. Integración Exclusiva: Radio Colchón Live Stream
Componente cliente interactivo `RadioColchonPlayer.tsx` que permite a los visitantes:
- Reproducir audio en streaming en vivo con frecuencias relajantes y música para dormir.
- Ajustar volumen, mutear y minimizar el reproductor mientras navegan por la tienda.
- Acceder directamente al portal principal de la emisora en [radiocolchon.com](https://radiocolchon.com).

---

## 4. Estructura del Proyecto (Next.js App Router)
```text
/colchon
├── app/                        # App Router de Next.js
│   ├── admin/                  # Panel CMS Administrativo (/admin)
│   ├── api/                    # Endpoints (Chatbot IA, Checkout, etc.)
│   ├── checkout/               # Carrito y pasarela de pago (Pago Móvil, Zelle, Efectivo)
│   ├── productos/              # Catálogo con filtros por medida y firmeza
│   ├── rastreo/                # Seguimiento de pedidos en Barinas y nacional
│   ├── globals.css             # Estilos globales y temas
│   ├── layout.tsx              # Root layout con metadata y PWA
│   └── page.tsx                # Landing Page de La Mega Tienda del Colchón
├── components/                 # Componentes React
│   ├── admin/                  # Componentes de gestión CMS
│   ├── shop/                   # Componentes de tienda (ProductCard, RadioColchonPlayer, etc.)
│   └── pwa/                    # Prompt de instalación PWA
├── lib/                        # Lógica de negocio y modelos
│   ├── actions/                # Server Actions para productos, sliders, pagos y config
│   ├── models/                 # Modelos Mongoose (Product, Order, SiteConfig, etc.)
│   ├── db.ts                   # Conexión optimizada a MongoDB
│   └── seed.ts                 # Poblador de datos de colchones y banners
├── messages/                   # Diccionarios de internacionalización (es.json, en.json)
└── public/                     # Manifiesto PWA, logos y recursos estáticos
```

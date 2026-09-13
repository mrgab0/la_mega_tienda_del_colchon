export interface DeliveryOption {
  id: string;
  title: string;
  description: string;
  estimatedTimeMinutes: number; // Para calculo o orden
  estimatedTimeLabel: string;
  extraPrice: number; // Precio adicional base en $ USD
  pricePerMile: number; // Costo por milla en $ USD
  badge?: string;
  iconName: string;
  isActive: boolean;
}

export const DEFAULT_DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: "pickup",
    title: "Retiro en Tienda Física (Av. Sucre, Barinas) 🏬",
    description: "Retira directamente en nuestra tienda en la Avenida Sucre de Barinas sin costo.",
    estimatedTimeMinutes: 0,
    estimatedTimeLabel: "Retiro Inmediato en Tienda",
    extraPrice: 0.00,
    pricePerMile: 0.00,
    badge: "Gratis 📍",
    iconName: "Store",
    isActive: true,
  },
  {
    id: "local_flete",
    title: "Flete Local Barinas (Con Desembalaje) 🚚",
    description: "Transporte especializado para colchones y bases con entrega en la puerta de tu hogar.",
    estimatedTimeMinutes: 120,
    estimatedTimeLabel: "24 - 48 Horas",
    extraPrice: 5.00,
    pricePerMile: 1.00,
    badge: "Recomendado 🛏️",
    iconName: "Truck",
    isActive: true,
  },
  {
    id: "express_barinas",
    title: "Despacho Express Mismo Día (Barinas) ⚡",
    description: "Entrega prioritaria en menos de 4 horas en Barinas.",
    estimatedTimeMinutes: 240,
    estimatedTimeLabel: "Mismo Día",
    extraPrice: 10.00,
    pricePerMile: 1.50,
    badge: "Rápido ⚡",
    iconName: "Zap",
    isActive: true,
  },
  {
    id: "national_shipping",
    title: "Envío Nacional (MRW / Tealca / Zoom) 📦",
    description: "Embalaje reforzado y despacho a cualquier estado de Venezuela con número de guía.",
    estimatedTimeMinutes: 2880,
    estimatedTimeLabel: "2 a 4 Días Hábiles",
    extraPrice: 15.00,
    pricePerMile: 0.00,
    badge: "Todo el País 🇻🇪",
    iconName: "Package",
    isActive: true,
  },
];

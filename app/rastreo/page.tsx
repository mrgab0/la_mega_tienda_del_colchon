"use client";

import { useState } from "react";
import { getOrderById } from "@/lib/actions/order";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { Footer } from "@/components/shop/Footer";
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, User, MessageCircle, AlertCircle, Sparkles, Store, BedDouble } from "lucide-react";

export default function RastreoPedidoPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setOrder(null);

    const res = await getOrderById(query.trim());
    setLoading(false);

    if (res.success && res.data) {
      setOrder(res.data);
    } else {
      setError("No encontramos ningún pedido con ese ID o teléfono. Verifica los datos e intenta de nuevo.");
    }
  };

  const isPickupOrder = (method: string) => {
    const m = (method || "").toLowerCase();
    return m.includes("pickup") || m.includes("retiro") || m.includes("tienda") || m.includes("almacen");
  };

  const getStatusStep = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s.includes("entregado") || s.includes("retirado") || s.includes("delivered") || s.includes("completed")) return 3;
    if (s.includes("en camino") || s.includes("en ruta") || s.includes("despachado")) return 2;
    if (s.includes("espera de despacho") || s.includes("en preparacion") || s.includes("preparando") || s.includes("empaque")) return 1;
    return 0; // Confirmado / Recibido
  };

  return (
    <div className="min-h-screen bg-[#FAF2FF]/20 dark:bg-[#0D0115] text-[#1A1C1C] dark:text-gray-100 flex flex-col">
      <ShopHeader />

      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl space-y-8">
          {/* Header de Rastreo */}
          <div className="text-center space-y-3">
            <span className="bg-[#FAF2FF] dark:bg-[#1A032A] text-[#A507FA] text-xs font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-900/50 inline-block shadow-sm">
              Seguimiento de Despacho en Vivo
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-black text-[#1A1C1C] dark:text-white">
              Rastrear Mi Colchón
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
              Ingresa el ID de tu Pedido o tu número de teléfono para verificar el estado de preparación y flete de tu colchón o somier.
            </p>
          </div>

          {/* Formulario de Búsqueda */}
          <form onSubmit={handleSearch} className="bg-white dark:bg-[#12021E] p-4 md:p-6 rounded-3xl border border-purple-100 dark:border-purple-900/40 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ej: COL-94812 o tu número de teléfono"
                  className="w-full pl-11 pr-4 py-3.5 border rounded-2xl text-sm font-medium dark:bg-[#1A032A] dark:border-purple-900/40 focus:outline-none focus:ring-2 focus:ring-[#A507FA]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#A507FA] hover:bg-[#8B00D9] text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-md shadow-[#A507FA]/20 flex items-center justify-center gap-2 disabled:bg-gray-400"
              >
                {loading ? "Buscando..." : "Buscar Pedido"}
              </button>
            </div>

            {error && (
              <div className="p-3.5 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs font-bold rounded-2xl border border-red-100 dark:border-red-900/50 flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
          </form>

          {/* Resultado del Rastreo */}
          {order && (() => {
            const isPickup = isPickupOrder(order.deliveryMethod);
            const currentStep = getStatusStep(order.status);

            // Definición de etapas dinámicas según si es Domicilio o Pickup
            const steps = isPickup
              ? [
                  { label: "1. Confirmado", sub: "Pago verificado", icon: Clock },
                  { label: "2. En Alistamiento", sub: "Preparando colchón", icon: Sparkles },
                  { label: "3. Listo en Tienda", sub: "Listo para retirar", icon: Store },
                  { label: "4. Retirado", sub: "Entregado en tienda", icon: CheckCircle2 }
                ]
              : [
                  { label: "1. Confirmado", sub: "Pago verificado", icon: Clock },
                  { label: "2. En Almacén", sub: "Protegido y listo", icon: Package },
                  { label: "3. En Flete / Ruta", sub: "Camión en camino", icon: Truck },
                  { label: "4. Entregado", sub: "Entregado en puerta", icon: CheckCircle2 }
                ];

            return (
              <div className="bg-white dark:bg-[#12021E] p-6 md:p-8 rounded-3xl border border-purple-100 dark:border-purple-900/40 shadow-sm space-y-8 animate-in fade-in duration-500">
                {/* Encabezado del Pedido */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-4 border-gray-100 dark:border-purple-900/40">
                  <div>
                    <span className="text-xs text-gray-400 font-mono block">ID de Orden: {order.orderId || order._id}</span>
                    <h3 className="text-lg font-bold text-[#1A1C1C] dark:text-white flex items-center gap-2">
                      <User size={16} className="text-[#A507FA]" />
                      <span>{order.customerName}</span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold border ${
                      currentStep === 3
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300"
                        : currentStep === 2
                        ? "bg-[#FAF2FF] text-[#A507FA] border-purple-200 dark:bg-[#1A032A] dark:text-purple-300"
                        : currentStep === 1
                        ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300"
                        : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300"
                    }`}>
                      {order.status || (isPickup ? "En Alistamiento" : "Confirmado")}
                    </span>
                  </div>
                </div>

                {/* Línea de Tiempo / Progreso de 4 Pasos Dinámicos */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Progreso de {isPickup ? "Retiro en Tienda Barinas 🏪" : "Flete y Despacho a Domicilio 🚚"}
                    </h4>
                    <span className="text-xs font-bold text-[#A507FA]">Paso {currentStep + 1} de 4</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center">
                    {steps.map((st, idx) => {
                      const IconComp = st.icon;
                      const isDone = currentStep >= idx;
                      const isCurrent = currentStep === idx;

                      return (
                        <div key={idx} className="space-y-2">
                          <div className={`w-11 h-11 mx-auto rounded-2xl flex items-center justify-center font-bold text-xs transition-all ${
                            isCurrent
                              ? "bg-[#A507FA] text-white ring-4 ring-[#A507FA]/20 scale-105 shadow-md"
                              : isDone
                              ? "bg-emerald-600 text-white"
                              : "bg-gray-100 dark:bg-[#1A032A] text-gray-400"
                          }`}>
                            <IconComp size={20} />
                          </div>
                          <div>
                            <span className={`text-[11px] font-extrabold block leading-tight ${
                              isDone ? "text-[#1A1C1C] dark:text-white" : "text-gray-400"
                            }`}>
                              {st.label}
                            </span>
                            <span className="text-[9px] text-gray-400 block hidden sm:block mt-0.5">
                              {st.sub}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Detalles de la Orden */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-[#FAF2FF]/50 dark:bg-[#1A032A] rounded-2xl space-y-1.5 border border-purple-100 dark:border-purple-900/40">
                    <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">
                      {isPickup ? "Lugar de Retiro:" : "Dirección de Entrega:"}
                    </span>
                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-start gap-1.5">
                      {isPickup ? (
                        <Store size={15} className="text-[#A507FA] flex-shrink-0 mt-0.5" />
                      ) : (
                        <MapPin size={15} className="text-[#A507FA] flex-shrink-0 mt-0.5" />
                      )}
                      <span>{isPickup ? "Tienda Principal • Avenida Sucre, Barinas, Venezuela (VE)" : (order.address || "Dirección registrada")}</span>
                    </p>
                  </div>

                  <div className="p-4 bg-[#FAF2FF]/50 dark:bg-[#1A032A] rounded-2xl space-y-1.5 border border-purple-100 dark:border-purple-900/40">
                    <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">Modalidad de Envío:</span>
                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-start gap-1.5">
                      <Truck size={15} className="text-[#A507FA] flex-shrink-0 mt-0.5" />
                      <span>{order.deliveryMethod || "Flete Directo / Despacho"}</span>
                    </p>
                  </div>
                </div>

                {/* Colchones y Productos Solicitados */}
                {order.items && order.items.length > 0 && (
                  <div className="p-4 bg-[#FAF2FF]/40 dark:bg-[#1A032A]/60 rounded-2xl border border-purple-100 dark:border-purple-900/40 space-y-2">
                    <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block flex items-center gap-1">
                      <BedDouble size={13} className="text-[#A507FA]" /> Colchones y Productos del Pedido:
                    </span>
                    <div className="space-y-1 text-xs">
                      {order.items.map((it: any, i: number) => (
                        <div key={i} className="flex justify-between items-center font-bold text-gray-700 dark:text-gray-300">
                          <span>• {it.name} (x{it.quantity})</span>
                          <span className="text-[#A507FA] font-black">${(it.price * it.quantity).toFixed(2)} USD</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Botón Directo a Soporte en WhatsApp */}
                <div className="pt-2 text-center">
                  <a
                    href={`https://wa.me/584141584360?text=${encodeURIComponent(`¡Hola! Quisiera consultar el estado de mi pedido ID: ${order.orderId || order._id} en La Mega Tienda del Colchón.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3 rounded-full text-xs font-bold transition-all shadow-md"
                  >
                    <MessageCircle size={16} />
                    <span>Consultar Estado por WhatsApp (0414-1584360)</span>
                  </a>
                </div>
              </div>
            );
          })()}
        </div>
      </main>

      <Footer />
    </div>
  );
}

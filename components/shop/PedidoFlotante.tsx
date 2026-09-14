"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Truck } from "lucide-react";

export const PedidoFlotante = () => {
  const [hasOrder, setHasOrder] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const savedOrderId = localStorage.getItem("lastOrderId");
    if (savedOrderId) {
      setHasOrder(true);
      setOrderId(savedOrderId);
    }
  }, []);

  if (!hasOrder) return null;

  return (
    <Link 
      href={`/checkout/confirmacion?orderId=${orderId}`}
      className="fixed top-20 left-4 z-[100] flex items-center gap-2 bg-[#12021E] text-white px-4 py-2 rounded-full shadow-lg border border-[#A507FA]/40 hover:bg-[#1A032A] transition-all animate-bounce"
    >
      <Truck size={16} className="text-[#A507FA]" />
      <span className="text-xs font-bold uppercase tracking-widest text-white">Pedido en camino</span>
    </Link>
  );
};

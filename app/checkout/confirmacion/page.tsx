import { Order } from "@/lib/models/Order";
import dbConnect from "@/lib/db";
import Link from "next/link";
import { CheckCircle2, MessageCircle, Home } from "lucide-react";
import { OrderSummary } from "@/components/shop/OrderSummary";

export default async function ConfirmacionPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId: string }>;
}) {
  const { orderId } = await searchParams;
  await dbConnect();
  
  const orderDoc = await Order.findOne({ orderId }).lean();
  const order = orderDoc ? JSON.parse(JSON.stringify(orderDoc)) : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF2FF]/30 p-6">
      <div className="bg-white p-12 rounded-3xl shadow-xl border border-purple-100 text-center animate-in zoom-in-95 duration-500 max-w-lg w-full">
        <div className="bg-[#FAF2FF] p-4 rounded-full text-[#A507FA] mb-6 animate-bounce mx-auto w-20">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-bold text-[#1A1C1C] mb-2">¡Pedido Registrado con Éxito! 🛏️</h2>
        <p className="text-gray-500 mb-6">
          Pronto coordinaremos el despacho o entrega. Gracias por confiar en La Mega Tienda del Colchón.
        </p>
        
        <div className="bg-[#FAF2FF]/50 border border-purple-100 p-4 rounded-2xl mb-8">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Número de Pedido</p>
            <p className="text-2xl font-mono font-black text-[#A507FA]">{orderId}</p>
        </div>

        {order && <OrderSummary items={order.items} />}

        <div className="flex flex-col gap-4">
          <a 
            href={`https://wa.me/584141584360?text=Hola!%20He%20finalizado%20mi%20pedido%20${orderId}%20en%20La%20Mega%20Tienda%20del%20Colchón.%20Quisiera%20confirmar%20los%20detalles.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-full font-bold hover:bg-[#1EBE5D] transition-all shadow-md"
          >
            <MessageCircle size={20} /> Confirmar por WhatsApp (0414-1584360)
          </a>
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 bg-[#12021E] text-white px-6 py-3.5 rounded-full font-bold hover:bg-[#A507FA] transition-all"
          >
            <Home size={20} /> Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

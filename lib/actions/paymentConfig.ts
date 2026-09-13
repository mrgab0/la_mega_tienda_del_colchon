"use server";

import dbConnect from "@/lib/db";
import { PaymentConfig } from "@/lib/models/PaymentConfig";
import { revalidatePath } from "next/cache";

const DEFAULT_PAYMENT_CONFIGS: Record<string, any> = {
  pagomovil: {
    methodId: "pagomovil",
    title: "Pago Móvil (Bolívares)",
    holderName: "La Mega Tienda del Colchón",
    accountDetail: "Banco: Banesco / Mercantil | Tel: 0414-1584360 | RIF/CI: J-12345678-0",
    qrImage: "",
    instructions: "1. Abre la app de tu banco y selecciona Pago Móvil.\n2. Envía el monto exacto a la tasa del día al teléfono 0414-1584360.\n3. Ingresa los últimos 4 o 6 dígitos de tu número de referencia abajo y confirma tu pedido.",
    linkUrl: "",
    isActive: true,
  },
  zelle: {
    methodId: "zelle",
    title: "Zelle (USD)",
    holderName: "La Mega Tienda del Colchón",
    accountDetail: "pagos@lamegatiendadelcolchon.com",
    qrImage: "",
    instructions: "1. Abre tu aplicación bancaria o app de Zelle.\n2. Envía el monto exacto del pedido al correo pagos@lamegatiendadelcolchon.com.\n3. Ingresa el nombre del titular y número de confirmación abajo.",
    linkUrl: "",
    isActive: true,
  },
  transferencia: {
    methodId: "transferencia",
    title: "Transferencia Bancaria Nacional",
    holderName: "La Mega Tienda del Colchón C.A.",
    accountDetail: "Banesco Cta Corriente: 0134-XXXX-XXXX-XXXXXXXX",
    qrImage: "",
    instructions: "1. Realiza la transferencia bancaria desde tu banco.\n2. Ingresa el número de comprobante o referencia bancaria y confirma el pedido.",
    linkUrl: "",
    isActive: true,
  },
  efectivo: {
    methodId: "efectivo",
    title: "Efectivo USD / Pago en Tienda Física (Av. Sucre)",
    holderName: "Sede Principal Av. Sucre, Barinas",
    accountDetail: "Pago en Tienda Física o Contra Entrega Barinas",
    qrImage: "",
    instructions: "1. Realizarás el pago en efectivo ($ USD o Bs a la tasa) al recibir tu colchón o directamente en nuestra tienda de la Avenida Sucre.\n2. Haz clic en 'Confirmar Pedido' para reservar tu producto de inmediato.",
    linkUrl: "",
    isActive: true,
  },
  paypal: {
    methodId: "paypal",
    title: "PayPal / Tarjeta Internacional",
    holderName: "La Mega Tienda del Colchón",
    accountDetail: "paypal@lamegatiendadelcolchon.com",
    qrImage: "",
    instructions: "1. Realiza el pago a través de PayPal.\n2. Ingresa el ID de transacción generado por PayPal para validar tu orden.",
    linkUrl: "https://paypal.me/lamegatiendadelcolchon",
    isActive: true,
  },
};

export async function getDefaultPaymentConfigs() {
  return JSON.parse(JSON.stringify(DEFAULT_PAYMENT_CONFIGS));
}

export async function getPaymentConfigs() {
  await dbConnect();
  try {
    const dbConfigs = await PaymentConfig.find({}).lean();
    const map: Record<string, any> = JSON.parse(JSON.stringify(DEFAULT_PAYMENT_CONFIGS));

    dbConfigs.forEach((cfg: any) => {
      map[cfg.methodId] = JSON.parse(JSON.stringify(cfg));
    });

    return { success: true, data: map };
  } catch (error) {
    console.error("Error al obtener configuraciones de pago:", error);
    return { success: true, data: JSON.parse(JSON.stringify(DEFAULT_PAYMENT_CONFIGS)) };
  }
}

export async function updatePaymentConfig(methodId: string, formData: FormData) {
  await dbConnect();
  try {
    const holderName = formData.get("holderName") as string || "";
    const accountDetail = formData.get("accountDetail") as string || "";
    const qrImage = formData.get("qrImage") as string || "";
    const instructions = formData.get("instructions") as string || "";
    const linkUrl = formData.get("linkUrl") as string || "";
    const title = formData.get("title") as string || DEFAULT_PAYMENT_CONFIGS[methodId]?.title || methodId;

    const isActiveInput = formData.get("isActive");
    const updateData: any = {
      methodId,
      title,
      holderName,
      accountDetail,
      qrImage,
      instructions,
      linkUrl,
      updatedAt: new Date(),
    };

    if (isActiveInput !== null) {
      updateData.isActive = isActiveInput === "true";
    }

    await PaymentConfig.findOneAndUpdate(
      { methodId },
      updateData,
      { upsert: true, new: true }
    );

    revalidatePath("/admin/pagos");
    revalidatePath("/checkout");
    revalidatePath("/es/checkout");
    revalidatePath("/en/checkout");
    return { success: true };
  } catch (error) {
    console.error("Error al actualizar datos de pago:", error);
    return { success: false, error: "No se pudieron actualizar los datos de pago." };
  }
}

export async function togglePaymentActive(methodId: string, isActive: boolean) {
  await dbConnect();
  try {
    await PaymentConfig.findOneAndUpdate(
      { methodId },
      { isActive, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    revalidatePath("/admin/pagos");
    revalidatePath("/checkout");
    revalidatePath("/es/checkout");
    revalidatePath("/en/checkout");
    return { success: true };
  } catch (error) {
    console.error("Error al pausar/publicar método de pago:", error);
    return { success: false, error: "No se pudo cambiar el estado del método de pago." };
  }
}

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Product } from '@/lib/models/Product';
import { getSiteConfig } from '@/lib/actions/siteConfig';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No se proporcionaron mensajes válidos." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // 1. Obtener catálogo y configuración de la tienda para nutrir el contexto
    await dbConnect();
    const [products, { data: siteConfig }] = await Promise.all([
      Product.find({ isActive: { $ne: false } })
        .select('name price slug category description mattressSize firmness structureType badge')
        .limit(30)
        .lean(),
      getSiteConfig()
    ]);

    const productCatalogSummary = (products && products.length > 0)
      ? products.map((p: any) => `- ${p.name} ($${p.price} USD) [Medida: ${p.mattressSize || 'Estándar'}] [Firmeza: ${p.firmness || 'Media'}] [Enlace: /productos/${p.slug}]: ${p.description ? p.description.slice(0, 100) : ''}`).join('\n')
      : "No hay colchones listados actualmente en el catálogo online.";

    const whatsappPhone = "0414-1584360 (+58 414 1584360)";
    const whatsappUrl = "https://wa.me/584141584360";
    const storeLocation = "Avenida Sucre, Barinas, Venezuela";

    // 2. Definir instrucciones de sistema precisas
    const systemPrompt = `Eres el asesor virtual especialista en descanso de "La Mega Tienda del Colchón", ubicada en ${storeLocation}.
Tu objetivo es brindar una atención amable, profesional, técnica y rápida a los clientes, ayudándoles a elegir el colchón, somier, almohada o combo descanso ideal según su preferencia de firmeza, medidas y presupuesto.

Información clave del negocio:
- Nombre: La Mega Tienda del Colchón
- Ubicación: ${storeLocation}.
- Teléfono / WhatsApp: ${whatsappPhone}
- Instagram: @lamegatiendadelcolchon (https://www.instagram.com/lamegatiendadelcolchon/reels/)
- Radio en Vivo: Radio Colchón (radiocolchon.com) con frecuencias psicoacústicas y música para dormir.
- Especialidades: Colchones ortopédicos, matrimoniales, queen, king, individuales, resortes pocket ensacados, espuma de alta densidad, somieres tapizados, almohadas memory foam.
- Métodos de pago: Pago Móvil, Transferencia bancaria nacional, Zelle, Efectivo en tienda física de Av. Sucre.
- Despacho: Flete y entrega en Barinas y envíos a toda Venezuela.

Catálogo de productos disponibles en la tienda:
${productCatalogSummary}

Reglas de respuesta:
1. Responde siempre en un tono cercano, servicial y profesional (usando emojis de descanso como 🛏️, 💤, ✨ con buen gusto).
2. Si el usuario busca un colchón para dolor de espalda o medida específica, recomienda 1 a 3 opciones e incluye siempre el enlace en formato Markdown: [Nombre del Colchón](/productos/slug).
3. Al finalizar una recomendación, o si el cliente desea ordenar, cotizar o consultar flete, ofrécele siempre el enlace directo a WhatsApp: [📲 Escribir a WhatsApp (${whatsappPhone})](${whatsappUrl}).
4. Mantén las respuestas concisas (máximo 2-3 párrafos cortos) y fáciles de leer en móviles.`;

    // Si no hay API key configurada, responder con un mensaje cálido y comercial
    if (!apiKey) {
      return NextResponse.json({
        text: `🛏️ ¡Hola! Soy tu asesor de descanso en **La Mega Tienda del Colchón** (${storeLocation}).\n\nCon mucho gusto te ayudo a elegir el colchón o somier ideal para tus noches. Puedes explorar nuestro [Catálogo de Colchones](/productos) o contactarnos directo por [📲 WhatsApp (${whatsappPhone})](${whatsappUrl}) para cotizaciones inmediatas y flete en Barinas. ¿Qué medida de colchón buscas? 💤`
      });
    }

    // 3. Formatear historial de conversación para Gemini API
    const formattedContents = messages.map((m: { role: string; text: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    // 4. Llamar a la API de Gemini
    const modelsToTry = ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-flash-latest', 'gemini-3.7-flash'];
    let aiResponseText = "";

    for (const model of modelsToTry) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: formattedContents,
            systemInstruction: {
              parts: [{ text: systemPrompt }]
            },
            generationConfig: {
              temperature: 0.7,
              topP: 0.95,
              maxOutputTokens: 600
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.candidates && data.candidates.length > 0 && data.candidates[0].content?.parts?.length > 0) {
            aiResponseText = data.candidates[0].content.parts[0].text;
            break;
          }
        }
      } catch (err) {
        console.warn(`Error al invocar modelo ${model}:`, err);
      }
    }

    if (!aiResponseText) {
      return NextResponse.json({
        text: `🛏️ ¡Hola! Con mucho gusto te asesoramos. Puedes ver todos nuestros colchones en el [Catálogo](/productos) o escribirnos directo por [📲 WhatsApp (${whatsappPhone})](${whatsappUrl}) para atenderte de inmediato. 💤`
      });
    }

    return NextResponse.json({ text: aiResponseText });

  } catch (error: any) {
    console.error("Error en Chatbot API:", error);
    return NextResponse.json({
      text: "🛏️ Con mucho gusto te ayudamos. Puedes explorar nuestros colchones en el [Catálogo](/productos) o escribirnos directo a [📲 WhatsApp (0414-1584360)](https://wa.me/584141584360) para cotizar tu pedido."
    }, { status: 200 });
  }
}

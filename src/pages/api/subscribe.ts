export const prerender = false;

import { BrevoClient } from "@getbrevo/brevo";

const client = new BrevoClient({
  apiKey: import.meta.env.BREVO_API_KEY,
});

const LIST_ID = parseInt(import.meta.env.BREVO_LIST_ID || "6", 10);

export const POST = async ({ request }: { request: Request }) => {
  try {
    const body = await request.json();
    const { email } = body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formattedEmail = email.trim().toLowerCase();
    const isValidEmail = emailRegex.test(formattedEmail);

    if (!email) {
      return new Response(
        JSON.stringify({ message: "El email es requerido" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (!isValidEmail) {
      return new Response(
        JSON.stringify({ message: "Por favor, ingresa un email válido" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    try {
      // Crear el contacto y añadirlo a la lista en una sola llamada
      await client.contacts.createContact({
        email: formattedEmail,
        listIds: [LIST_ID],
        updateEnabled: false,
      });
    } catch (createError: any) {
      // Email ya existe
      if (
        createError.statusCode === 400 &&
        createError.message?.includes("Contact already exists")
      ) {
        return new Response(
          JSON.stringify({ message: "Este email ya está suscrito" }),
          { status: 409, headers: { "Content-Type": "application/json" } },
        );
      }
      throw createError;
    }

    return new Response(
      JSON.stringify({ message: "Te has suscrito correctamente" }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error: any) {
    // Solo exponer errores controlados, no detalles internos de Brevo
    const isClientError = error.statusCode >= 400 && error.statusCode < 500;

    return new Response(
      JSON.stringify({
        message: isClientError
          ? "Error al procesar la solicitud"
          : "Error interno del servidor",
      }),
      {
        status: error.statusCode || 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};

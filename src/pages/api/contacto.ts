import type { APIRoute } from "astro";
import { z } from "astro:schema";
import { sendEmail } from "../../utils/send-email";

export const prerender = false;

const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const htmlContent = `
      <h2>Nuevo mensaje de contacto desde el portfolio</h2>
      <p><strong>Nombre:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Asunto:</strong> ${data.subject}</p>
      <p><strong>Mensaje:</strong> ${data.message}</p>
    `;

    const emailSent = await sendEmail({
      to: import.meta.env.SEND_EMAIL_TO,
      subject: `Nuevo mensaje de contacto: ${data.subject}`,
      html: htmlContent,
    });

    if (!emailSent) {
      return new Response(
        JSON.stringify({ success: false, error: "Failed to send email" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message sent successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(
      JSON.stringify({ success: false, error: "An unexpected error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

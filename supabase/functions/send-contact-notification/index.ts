import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactNotificationRequest {
  name: string;
  email: string;
  phone?: string;
  objective?: string;
  subject: string;
  message: string;
}

interface ResendEmailResponse {
  id?: string;
  error?: { message: string };
}

async function sendEmail(payload: {
  from: string;
  to: string[];
  subject: string;
  html: string;
}): Promise<ResendEmailResponse> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });
  return response.json();
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { name, email, phone, objective, subject, message }: ContactNotificationRequest = await req.json();

    console.log("Sending contact notification for:", { name, email, subject });

    // Email to AQUABRAIN team
    const teamEmailResponse = await sendEmail({
      from: "AQUABRAIN Contact <onboarding@resend.dev>",
      to: ["aquabrain57@gmail.com"],
      subject: `[Contact] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0B3D91 0%, #1565C0 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #FFD700; margin: 0; font-size: 24px;">Nouveau Message de Contact</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #0B3D91;">Nom:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #0B3D91;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #1565C0;">${email}</a></td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #0B3D91;">Téléphone:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="tel:${phone}" style="color: #1565C0;">${phone}</a></td>
              </tr>
              ` : ''}
              ${objective ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #0B3D91;">Objectif:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${objective}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #0B3D91;">Sujet:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${subject}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 8px; border-left: 4px solid #FFD700;">
              <h3 style="margin: 0 0 10px 0; color: #0B3D91;">Message:</h3>
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Team notification sent:", teamEmailResponse);

    // Confirmation email to the sender
    const confirmationResponse = await sendEmail({
      from: "AQUABRAIN <onboarding@resend.dev>",
      to: [email],
      subject: "Nous avons bien reçu votre message - AQUABRAIN",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0B3D91 0%, #1565C0 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: #FFD700; margin: 0; font-size: 28px;">AQUABRAIN</h1>
            <p style="color: white; margin: 10px 0 0 0;">Expert en Aquaculture</p>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #0B3D91; margin-top: 0;">Bonjour ${name},</h2>
            <p style="line-height: 1.6; color: #333;">
              Nous avons bien reçu votre message concernant "<strong>${subject}</strong>" et nous vous remercions de l'intérêt que vous portez à AQUABRAIN.
            </p>
            <p style="line-height: 1.6; color: #333;">
              Notre équipe d'experts analysera votre demande et vous répondra dans les plus brefs délais, généralement sous 24 à 48 heures ouvrées.
            </p>
            <div style="background: #0B3D91; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0;"><strong>📞 Besoin d'une réponse urgente ?</strong></p>
              <p style="margin: 0;">Contactez-nous directement au <a href="tel:+22879687966" style="color: #FFD700;">+228 79 68 79 66</a></p>
            </div>
            <p style="line-height: 1.6; color: #333;">
              Cordialement,<br>
              <strong style="color: #0B3D91;">L'équipe AQUABRAIN</strong>
            </p>
          </div>
          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>AQUABRAIN - Expert en Aquaculture | Lomé, Togo</p>
            <p>
              <a href="mailto:aquabrain57@gmail.com" style="color: #1565C0;">aquabrain57@gmail.com</a> | 
              <a href="tel:+22879687966" style="color: #1565C0;">+228 79 68 79 66</a>
            </p>
          </div>
        </div>
      `,
    });

    console.log("Confirmation email sent:", confirmationResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        teamEmail: teamEmailResponse, 
        confirmationEmail: confirmationResponse 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: string;
}

// Configure your email provider here.
// Option 1 (recommended): Resend — set RESEND_API_KEY in Vercel environment variables.
// Option 2: Any SMTP provider via Nodemailer.
// Option 3: Forward to a webhook (e.g. Zapier, Make).
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = "therabadigroup@gmail.com";
const FROM_EMAIL = "noreply@therabadigroup.com";

function sanitize(str: string): string {
  return String(str).slice(0, 2000).replace(/[<>]/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactPayload;

    const name = sanitize(body.name || "");
    const email = sanitize(body.email || "");
    const phone = sanitize(body.phone || "");
    const message = sanitize(body.message || "");
    const type = sanitize(body.type || "");

    // Basic validation
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required." },
        { status: 400 }
      );
    }

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #C9A84C; border-bottom: 1px solid #eee; padding-bottom: 12px;">
          New Lead — The Rabadi Group
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; width: 120px;">Name</td>
            <td style="padding: 8px 0; font-weight: bold;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Phone</td>
            <td style="padding: 8px 0; font-weight: bold;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Email</td>
            <td style="padding: 8px 0;">${email || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Inquiry Type</td>
            <td style="padding: 8px 0;">${type}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666; vertical-align: top;">Message</td>
            <td style="padding: 8px 0;">${message || "No message provided"}</td>
          </tr>
        </table>
        <p style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
          Submitted via therabadigroup.com contact form
        </p>
      </div>
    `;

    // If Resend API key is configured, send email via Resend
    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [TO_EMAIL],
          reply_to: email || undefined,
          subject: `New Lead: ${name} — ${type} — The Rabadi Group`,
          html: emailHtml,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Resend error:", errorText);
        // Don't expose the error to the client, but log it
        return NextResponse.json(
          { error: "Failed to send message. Please call us directly." },
          { status: 500 }
        );
      }
    } else {
      // No email provider configured — log the submission
      // In production, set RESEND_API_KEY in your Vercel environment variables
      console.log("Contact form submission (no email provider configured):", {
        name,
        email,
        phone,
        type,
        message,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

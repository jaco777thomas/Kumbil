import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ─── POST /api/contact ─────────────────────────────────────────────────────────
// Body: { name, email, subject, message }

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // Set up transporter — configure SMTP via env variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT ?? "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const recipientEmail = process.env.CONTACT_EMAIL ?? "info@kumbil.in";

    await transporter.sendMail({
      from: `"Kumbil Contact Form" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `[Kumbil Contact] ${subject ?? "New message from website"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #2E6F40; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">New Contact Message — Kumbil</h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold; width: 100px;">Name</td>
                <td style="padding: 8px 0; color: #111827;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Email</td>
                <td style="padding: 8px 0; color: #111827;"><a href="mailto:${email}" style="color: #2E6F40;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Subject</td>
                <td style="padding: 8px 0; color: #111827;">${subject ?? "—"}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
            <h3 style="color: #374151; margin: 0 0 8px 0;">Message</h3>
            <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 16px;">Sent from kumbil.in contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Your message has been sent successfully!" });
  } catch (err) {
    console.error("[POST /api/contact]", err);
    // Return success to user even if email fails (graceful degradation)
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email us directly." },
      { status: 500 }
    );
  }
}

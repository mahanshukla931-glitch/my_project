import nodemailer from "nodemailer";
import { CONTACT } from "@/lib/data";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: Request) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return Response.json({ error: "Mail is not configured" }, { status: 503 });
  }

  let subject: string, replyTo: string | undefined, lines: [string, string][];
  try {
    ({ subject, replyTo, lines } = await request.json());
    if (!subject || !Array.isArray(lines)) throw new Error("bad shape");
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  try {
    await transporter.sendMail({
      from: `"Brightlant website" <${process.env.GMAIL_USER}>`,
      to: CONTACT.enquiryEmail,
      replyTo,
      subject,
      text: lines.map(([k, v]) => `${k}: ${v}`).join("\n"),
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return Response.json({ error: "Could not send" }, { status: 502 });
  }
}

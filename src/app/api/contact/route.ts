import nodemailer from "nodemailer";
import { CONTACT } from "@/lib/data";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

/** Vercel refuses a request body over 4.5 MB, so the resume has to stay under it. */
const MAX_FILE_BYTES = 4 * 1024 * 1024;
const RESUME_NAME = /[.](pdf|docx?)$/i;

/** Form input goes straight into the mail body, so it is escaped, not trusted. */
const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** A plain two-column table with inline styles — Gmail strips <style> blocks,
 *  and anything fancier renders differently in every client. */
function html(subject: string, lines: [string, string][]) {
  const rows = lines
    .map(
      ([k, v]) => `<tr>
        <td style="padding:10px 16px;border-top:1px solid #e6e9ef;color:#5b6478;font-size:13px;white-space:nowrap;vertical-align:top">${esc(k)}</td>
        <td style="padding:10px 16px;border-top:1px solid #e6e9ef;color:#0d1220;font-size:14px;font-weight:600;white-space:pre-wrap">${esc(v)}</td>
      </tr>`,
    )
    .join("");

  return `<div style="background:#f4f6fa;padding:24px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e6e9ef;border-radius:14px;overflow:hidden">
      <tr><td style="background:#05070d;padding:20px 24px">
        <div style="color:#fff;font-size:17px;font-weight:800">Brightlant</div>
        <div style="color:#8f9bb3;font-size:13px;padding-top:4px">${esc(subject)}</div>
      </td></tr>
      ${rows}
      <tr><td colspan="2" style="padding:14px 16px;border-top:1px solid #e6e9ef;background:#fafbfd;color:#8a92a6;font-size:12px">
        Sent from the brightlant.com website. Reply to this mail to answer the sender directly.
      </td></tr>
    </table>
  </div>`;
}

export async function POST(request: Request) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return Response.json({ error: "Mail is not configured" }, { status: 503 });
  }

  let subject: string, replyTo: string | undefined, lines: [string, string][];
  let file: File | null = null;
  try {
    const form = await request.formData();
    ({ subject, replyTo, lines } = JSON.parse(String(form.get("payload"))));
    if (!subject || !Array.isArray(lines)) throw new Error("bad shape");

    // The resume, when one came with it. Re-checked here because the browser's
    // accept and size rules are a convenience, not a boundary.
    const f = form.get("file");
    if (f instanceof File && f.size > 0) {
      if (f.size > MAX_FILE_BYTES || !RESUME_NAME.test(f.name)) throw new Error("bad file");
      file = f;
    }
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
      html: html(subject, lines),
      attachments: file
        ? [{ filename: file.name, content: Buffer.from(await file.arrayBuffer()) }]
        : undefined,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return Response.json({ error: "Could not send" }, { status: 502 });
  }
}

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type EmailData = {
  projectId: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  howFound: string;
  projectType: string;
  platforms: string[];
  features: string[];
  description: string;
  hasDesign?: string;
  hasExisting?: string;
  existingUrl?: string;
  budget: string;
  timeline: string;
  maintenance: string;
  startDate?: string;
  notes?: string;
};

function esc(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendProjectEmail(data: EmailData) {
  const submittedAt = new Date().toLocaleString("mn-MN", {
    timeZone: "Asia/Ulaanbaatar",
    dateStyle: "full",
    timeStyle: "short",
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family:-apple-system,sans-serif;color:#1b1259;line-height:1.6;margin:0;padding:0;">
      <div style="max-width:640px;margin:0 auto;">
        <div style="background:linear-gradient(135deg,#3a27b0,#7a45c8);color:white;padding:24px;border-radius:12px 12px 0 0;">
          <h1 style="margin:0;font-size:22px;">🆕 Шинэ төслийн хүсэлт</h1>
          <div style="opacity:.85;font-size:14px;margin-top:4px;">${esc(data.projectId)}</div>
          <div style="opacity:.75;font-size:12px;margin-top:2px;">${esc(submittedAt)}</div>
        </div>

        <div style="background:#f6f5fb;padding:24px;">
          <div style="background:white;padding:20px;border-radius:12px;margin-bottom:16px;">
            <h2 style="color:#3a27b0;font-size:16px;margin:0 0 12px;border-bottom:2px solid #2fb4e0;padding-bottom:6px;">👤 Холбоо барих</h2>
            <p><b>Нэр:</b> ${esc(data.name)}</p>
            <p><b>Имэйл:</b> <a href="mailto:${esc(data.email)}">${esc(data.email)}</a></p>
            <p><b>Утас:</b> <a href="tel:${esc(data.phone)}">${esc(data.phone)}</a></p>
            ${data.company ? `<p><b>Байгууллага:</b> ${esc(data.company)}</p>` : ""}
            <p><b>Хаанаас мэдсэн:</b> ${esc(data.howFound)}</p>
          </div>

          <div style="background:white;padding:20px;border-radius:12px;margin-bottom:16px;">
            <h2 style="color:#3a27b0;font-size:16px;margin:0 0 12px;border-bottom:2px solid #2fb4e0;padding-bottom:6px;">🎯 Төслийн тухай</h2>
            <p><b>Төрөл:</b> ${esc(data.projectType)}</p>
            <p><b>Платформ:</b> ${data.platforms.map(esc).join(", ")}</p>
            <p><b>Функцүүд:</b> ${data.features.map(esc).join(", ") || "—"}</p>
            <p><b>Дизайн:</b> ${esc(data.hasDesign ?? "—")}</p>
            <p><b>Одоо систем:</b> ${esc(data.hasExisting ?? "—")}</p>
            ${data.existingUrl ? `<p><b>URL:</b> ${esc(data.existingUrl)}</p>` : ""}
            <p><b>Тайлбар:</b></p>
            <div style="background:#f6f5fb;padding:12px;border-radius:8px;white-space:pre-wrap;">${esc(data.description)}</div>
          </div>

          <div style="background:white;padding:20px;border-radius:12px;">
            <h2 style="color:#3a27b0;font-size:16px;margin:0 0 12px;border-bottom:2px solid #2fb4e0;padding-bottom:6px;">💰 Төсөв, хугацаа</h2>
            <p><b>Төсөв:</b> ${esc(data.budget)}</p>
            <p><b>Хугацаа:</b> ${esc(data.timeline)}</p>
            <p><b>Дэмжлэг:</b> ${esc(data.maintenance)}</p>
            ${data.startDate ? `<p><b>Эхлэх:</b> ${esc(data.startDate)}</p>` : ""}
            ${data.notes ? `<p><b>Нэмэлт:</b></p><div style="background:#f6f5fb;padding:12px;border-radius:8px;white-space:pre-wrap;">${esc(data.notes)}</div>` : ""}
          </div>
        </div>

        <div style="text-align:center;color:#999;font-size:12px;padding:16px;">
          © ${new Date().getFullYear()} BBD — Build Better Development
        </div>
      </div>
    </body>
    </html>
  `;

  const to = process.env.EMAIL_TO;
  if (!to) throw new Error("EMAIL_TO тохируулаагүй");

  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "BBD <onboarding@resend.dev>",
    to: [to],
    replyTo: data.email,
    subject: `🆕 [${data.projectId}] ${data.projectType} — ${data.name}`,
    html,
  });

  if (error) throw new Error(error.message);
  return true;
}
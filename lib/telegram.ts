// ============================================
// Telegram Bot — мэдэгдэл илгээх
// ============================================

const API = "https://api.telegram.org";

function esc(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendTelegramNotification(params: {
  projectId: string;
  name: string;
  phone: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
}): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("Telegram тохиргоо дутуу");
    return false;
  }

  const text = [
    `🆕 <b>Шинэ төслийн хүсэлт</b>`,
    ``,
    `📋 <b>ID:</b> <code>${esc(params.projectId)}</code>`,
    `👤 <b>Нэр:</b> ${esc(params.name)}`,
    `📞 <b>Утас:</b> ${esc(params.phone)}`,
    `📧 <b>Имэйл:</b> ${esc(params.email)}`,
    ``,
    `🎯 <b>Төрөл:</b> ${esc(params.projectType)}`,
    `💰 <b>Төсөв:</b> ${esc(params.budget)}`,
    `⏱ <b>Хугацаа:</b> ${esc(params.timeline)}`,
    ``,
    `📝 <b>Тайлбар:</b>`,
    esc(params.description.slice(0, 400)) +
      (params.description.length > 400 ? "..." : ""),
  ].join("\n");

  try {
    const res = await fetch(`${API}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("Telegram error:", err);
    return false;
  }
}
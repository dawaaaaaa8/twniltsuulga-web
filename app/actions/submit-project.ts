"use server";

import { prisma } from "@/lib/prisma";
import { sendProjectEmail } from "@/lib/email";
import { sendTelegramNotification } from "@/lib/telegram";
export type ProjectSubmission = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  howFound?: string;
  projectType: string;
  platforms: string[];
  features: string[];
  description: string;
  hasDesign?: "yes" | "no" | "partial";
  hasExistingSystem?: "yes" | "no";
  existingSystemUrl?: string;
  budget: string;
  timeline: string;
  maintenance: string;
  startDate?: string;
  additionalNotes?: string;
};

export type SubmitResult = {
  success: boolean;
  message: string;
  projectId?: string;
  error?: string;
};

function generateProjectId(): string {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `BBD-${year}-${rand}`;
}

// Simple in-memory rate limit (production-д Redis ашиглана)
const rateMap = new Map<string, { count: number; resetAt: number }>();
function checkRate(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateMap.set(ip, { count: 1, resetAt: now + 3600_000 }); // 1 цаг
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

export async function submitProject(
  data: ProjectSubmission,
  meta?: { ip?: string; userAgent?: string }
): Promise<SubmitResult> {
  // ============================================
  // 1. Validation
  // ============================================
  if (!data.name?.trim()) {
    return { success: false, message: "", error: "Нэр оруулна уу" };
  }
  if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { success: false, message: "", error: "Зөв имэйл оруулна уу" };
  }
  if (!data.phone?.trim() || data.phone.replace(/\D/g, "").length < 8) {
    return { success: false, message: "", error: "Зөв утасны дугаар оруулна уу" };
  }
  if (!data.projectType) {
    return { success: false, message: "", error: "Төслийн төрөл сонгоно уу" };
  }
  if (!data.description?.trim() || data.description.trim().length < 20) {
    return {
      success: false,
      message: "",
      error: "Төслийн тухай дор хаяж 20 тэмдэгт бичнэ үү",
    };
  }
  if (!data.budget || !data.timeline || !data.maintenance) {
    return { success: false, message: "", error: "Төсөв, хугацааг сонгоно уу" };
  }

  // Rate limit
  if (meta?.ip && !checkRate(meta.ip)) {
    return {
      success: false,
      message: "",
      error: "Хэт олон хүсэлт илгээсэн. 1 цагийн дараа дахин оролдоно уу.",
    };
  }

  const projectId = generateProjectId();

  // ============================================
  // 2. DB-д хадгалах
  // ============================================
  try {
    await prisma.projectRequest.create({
      data: {
        projectId,
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        company: data.company?.trim() || null,
        howFound: data.howFound ?? "—",
        projectType: data.projectType,
        platforms: JSON.stringify(data.platforms),
        features: JSON.stringify(data.features),
        description: data.description.trim(),
        hasDesign: data.hasDesign ?? null,
        hasExisting: data.hasExistingSystem ?? null,
        existingUrl: data.existingSystemUrl?.trim() || null,
        budget: data.budget,
        timeline: data.timeline,
        maintenance: data.maintenance,
        startDate: data.startDate || null,
        notes: data.additionalNotes?.trim() || null,
        ipAddress: meta?.ip ?? null,
        userAgent: meta?.userAgent ?? null,
      },
    });
  } catch (err) {
    console.error("DB error:", err);
    return {
      success: false,
      message: "",
      error: "Хүсэлт хадгалахад алдаа гарлаа. Дахин оролдоно уу.",
    };
  }

  // ============================================
  // 3. Имэйл илгээх (алдаа гарвал үргэлжлүүлнэ)
  // ============================================
  try {
    await sendProjectEmail({
      projectId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      howFound: data.howFound ?? "—",
      projectType: data.projectType,
      platforms: data.platforms,
      features: data.features,
      description: data.description,
      hasDesign: data.hasDesign,
      hasExisting: data.hasExistingSystem,
      existingUrl: data.existingSystemUrl,
      budget: data.budget,
      timeline: data.timeline,
      maintenance: data.maintenance,
      startDate: data.startDate,
      notes: data.additionalNotes,
    });
  } catch (err) {
    console.error("Email error (DB-д хадгалагдсан):", err);
  }

  // ============================================
  // 4. Telegram мэдэгдэл (алдаа гарвал үргэлжлүүлнэ)
  // ============================================
  try {
    await sendTelegramNotification({
      projectId,
      name: data.name,
      phone: data.phone,
      email: data.email,
      projectType: data.projectType,
      budget: data.budget,
      timeline: data.timeline,
      description: data.description,
    });
  } catch (err) {
    console.error("Telegram error:", err);
  }

  return {
    success: true,
    message:
      "Баярлалаа! Таны хүсэлт хүлээн авагдлаа. Бид 24 цагийн дотор холбогдоно.",
    projectId,
  };
}
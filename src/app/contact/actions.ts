"use server";

import { z } from "zod";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

const contactSchema = z.object({
  name: z.string().trim().min(2, "messages.name").max(120, "messages.name"),
  email: z.string().trim().email("messages.email").max(254, "messages.email"),
  projectType: z.string().trim().min(1, "messages.type").max(80, "messages.type"),
  description: z.string().trim().min(20, "messages.context").max(5000, "messages.context"),
});

export type ContactFormState = { status: "idle" | "error" | "success"; message: string };

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] ?? character);
}

export async function submitContactForm(_previousState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim()) return { status: "success", message: "messages.success" };

  const result = contactSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { status: "error", message: result.error.issues[0]?.message ?? "messages.check" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.contactEmail;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return { status: "error", message: "messages.notConfigured" };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: result.data.email,
    subject: `Project inquiry from ${result.data.name}`,
    html: `<h2>New project inquiry</h2><p><strong>Name:</strong> ${escapeHtml(result.data.name)}</p><p><strong>Email:</strong> ${escapeHtml(result.data.email)}</p><p><strong>Project type:</strong> ${escapeHtml(result.data.projectType)}</p><p><strong>Context:</strong></p><p>${escapeHtml(result.data.description).replace(/\n/g, "<br />")}</p>`,
  });

  if (error) {
    console.error("Contact email failed", error);
    return { status: "error", message: "messages.failed" };
  }

  return { status: "success", message: "messages.success" };
}

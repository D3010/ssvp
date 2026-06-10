"use server";

import { z } from "zod";
import { SITE } from "@/lib/utils";

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email."),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little about where the hours are leaking.")
    .max(4000),
  // honeypot — must stay empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactState = {
  status: "idle" | "success" | "error" | "fallback";
  message?: string;
  fieldErrors?: Record<string, string>;
};

/**
 * Contact server action. Validates with zod, blocks bots with a honeypot, and
 * sends via Resend when RESEND_API_KEY is present. With no key it returns a
 * "fallback" status so the UI can offer a mailto: link — the form never throws.
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    message: formData.get("message"),
    website: formData.get("website"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    // honeypot tripped → pretend success, drop silently
    if (fieldErrors.website) return { status: "success" };
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const { name, email, company, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || SITE.email;

  // No key configured → graceful mailto fallback (e.g. local/preview).
  if (!apiKey) {
    return {
      status: "fallback",
      message: "Email isn't wired up here yet — send it directly and we'll reply fast.",
    };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "SSVP Site <onboarding@resend.dev>",
      to: [to],
      replyTo: email,
      subject: `New build inquiry — ${name}${company ? ` (${company})` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      return { status: "fallback", message: "We couldn't send that automatically — email us directly." };
    }
    return { status: "success", message: "Got it. We'll come back with a system and an ROI model, usually within a day." };
  } catch {
    return { status: "fallback", message: "We couldn't send that automatically — email us directly." };
  }
}

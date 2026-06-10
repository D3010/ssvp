"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";
import { LiveDot } from "@/components/ui/LiveDot";
import { SITE } from "@/lib/utils";
import { cn } from "@/lib/utils";

const initial: ContactState = { status: "idle" };

function fieldError(state: ContactState, name: string) {
  return state.status === "error" ? state.fieldErrors?.[name] : undefined;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} magnetic>
      {pending ? "Sending…" : "Book a build call"}
      {!pending && <span aria-hidden="true">→</span>}
    </Button>
  );
}

const inputBase =
  "w-full rounded-[var(--radius-input)] border bg-surface/60 px-4 py-3 text-text placeholder:text-muted/60 transition-colors focus:border-pulse/50 focus:outline-none";

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initial);

  if (state.status === "success") {
    return (
      <div className="rounded-[var(--radius-card)] border border-pulse/30 bg-pulse/[0.05] p-8 glow-pulse">
        <LiveDot label="RECEIVED" />
        <h2 className="mt-4 font-display text-2xl font-semibold text-text">
          That&apos;s on the ledger.
        </h2>
        <p className="mt-3 text-muted text-pretty">
          {state.message ??
            "We'll come back with a system and an ROI model, usually within a day."}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {/* honeypot — visually hidden, off-screen, not focusable */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px]">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={fieldError(state, "name")}>
          <input id="name" name="name" type="text" required placeholder="Your name"
            className={cn(inputBase, fieldError(state, "name") ? "border-danger/60" : "border-line")} />
        </Field>
        <Field label="Work email" name="email" error={fieldError(state, "email")}>
          <input id="email" name="email" type="email" required placeholder="you@company.com"
            className={cn(inputBase, fieldError(state, "email") ? "border-danger/60" : "border-line")} />
        </Field>
      </div>

      <Field label="Company" name="company" optional error={fieldError(state, "company")}>
        <input id="company" name="company" type="text" placeholder="Pharmacy, agency, or team"
          className={cn(inputBase, "border-line")} />
      </Field>

      <Field label="What's eating your hours?" name="message" error={fieldError(state, "message")}>
        <textarea id="message" name="message" required rows={5}
          placeholder="The manual work you'd love to never do again."
          className={cn(inputBase, "resize-y", fieldError(state, "message") ? "border-danger/60" : "border-line")} />
      </Field>

      {(state.status === "error" || state.status === "fallback") && state.message && (
        <p className={cn("text-sm", state.status === "fallback" ? "text-ice" : "text-danger")}>
          {state.message}
          {state.status === "fallback" && (
            <>
              {" "}
              <a href={`mailto:${SITE.email}`} className="underline">
                {SITE.email}
              </a>
            </>
          )}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <SubmitButton />
        <a href={`mailto:${SITE.email}`} className="font-mono text-sm text-ice hover:text-text">
          or {SITE.email}
        </a>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  optional,
  error,
  children,
}: {
  label: string;
  name: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 flex items-baseline justify-between text-sm text-text">
        <span>{label}</span>
        {optional && <span className="font-mono text-[0.625rem] uppercase tracking-wider text-muted">optional</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-danger">{error}</p>}
    </div>
  );
}

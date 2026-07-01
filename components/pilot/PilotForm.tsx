"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { MODULES } from "@/content/modules";
import { Button } from "@/components/ui/Button";
import { LiveDot } from "@/components/ui/LiveDot";
import { StatusChip } from "@/components/ui/StatusChip";
import { Glyph } from "@/components/ui/Glyph";
import { SITE, cn } from "@/lib/utils";

/**
 * Pilot application form. Reuses the shared `submitContact` server action, so
 * validation, the honeypot, Resend delivery, and the mailto fallback all behave
 * exactly like the site's ContactForm.
 *
 * The pharmacy-specific fields (store, location, PMS, volume, pain, and any
 * ExposureSelfCheck read) are composed client-side into a single hidden
 * `message` value the action already knows how to read and email. The visible
 * free-text answer is `notes`; everything else is structure around it.
 */

const EXPOSURE_EVENT = "ssvp:exposure";
const EXPOSURE_STORAGE_KEY = "ssvp-exposure";

interface ExposureSummary {
  verdict: "LOW" | "ELEVATED" | "HIGH";
  count: number;
  total: number;
  flagged: string[];
}

interface Fields {
  company: string;
  name: string;
  email: string;
  location: string;
  pms: string;
  scripts: string;
  stores: string;
  pain: string;
  notes: string;
}

const EMPTY: Fields = {
  company: "",
  name: "",
  email: "",
  location: "",
  pms: "PrimeRx",
  scripts: "",
  stores: "",
  pain: "",
  notes: "",
};

const NO_PAIN = "Not sure yet — help me scope it";

const initial: ContactState = { status: "idle" };

const inputBase =
  "w-full rounded-[var(--radius-input)] border bg-emerald-deep/40 px-4 py-3 text-text placeholder:text-muted/50 transition-colors focus:border-mint/50 focus:outline-none";

function fieldError(state: ContactState, name: string) {
  return state.status === "error" ? state.fieldErrors?.[name] : undefined;
}

function composeMessage(f: Fields, exposure: ExposureSummary | null): string {
  const lines: Array<string | false> = [
    "— PILOT APPLICATION —",
    Boolean(f.company) && `Pharmacy: ${f.company}`,
    Boolean(f.location) && `City / state: ${f.location}`,
    `PMS: ${f.pms || "PrimeRx"}`,
    Boolean(f.scripts) && `Scripts / day: ${f.scripts}`,
    Boolean(f.stores) && `Stores: ${f.stores}`,
    Boolean(f.pain) && `Biggest pain: ${f.pain}`,
    "",
    f.notes,
  ];
  if (exposure) {
    lines.push(
      "",
      `Audit self-check: ${exposure.verdict} — ${exposure.count} of ${exposure.total} signals firing.`,
    );
    if (exposure.flagged.length) {
      lines.push(`Flagged: ${exposure.flagged.join("; ")}.`);
    }
  }
  return lines
    .filter((l): l is string => l !== false)
    .join("\n")
    .trim();
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "Sending…" : "Apply for the pilot"}
      {!pending && <span aria-hidden="true">→</span>}
    </Button>
  );
}

export function PilotForm() {
  const [state, formAction] = useActionState(submitContact, initial);
  const [f, setF] = useState<Fields>(EMPTY);
  const [exposure, setExposure] = useState<ExposureSummary | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const set =
    (key: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setF((prev) => ({ ...prev, [key]: e.target.value }));

  // Receive an ExposureSelfCheck read: from the live event, or (on reload /
  // return visit) from the session it was stashed in.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(EXPOSURE_STORAGE_KEY);
      if (raw) setExposure(JSON.parse(raw) as ExposureSummary);
    } catch {
      /* ignore unavailable storage */
    }
    function onExposure(e: Event) {
      const detail = (e as CustomEvent<ExposureSummary>).detail;
      if (!detail) return;
      setExposure(detail);
      // Move keyboard/SR focus into the form without fighting the smooth scroll.
      firstFieldRef.current?.focus({ preventScroll: true });
    }
    window.addEventListener(EXPOSURE_EVENT, onExposure as EventListener);
    return () =>
      window.removeEventListener(EXPOSURE_EVENT, onExposure as EventListener);
  }, []);

  function clearExposure() {
    setExposure(null);
    try {
      sessionStorage.removeItem(EXPOSURE_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  const composed = composeMessage(f, exposure);

  if (state.status === "success") {
    return (
      <div className="panel panel-mint glow-mint p-8 md:p-10">
        <LiveDot label="PILOT QUEUE" />
        <h3 className="mt-5 font-display text-2xl font-semibold text-text md:text-3xl">
          You&apos;re on the list.
        </h3>
        <p className="mt-3 max-w-xl text-muted text-pretty">
          {state.message ??
            "We read every application ourselves — no SDR, no drip. Expect a reply straight from the founder, usually within a day."}
        </p>

        <ol className="mt-8 space-y-4">
          {[
            "We read your application and pick the first module that pays for itself fastest in your store.",
            "You get a short write-up: what we'd install first, and a rough ROI model against your own numbers.",
            "If it fits, we scope a pilot on one PrimeRx store — you set the accuracy bar, we build to it.",
          ].map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-mint/40 font-mono text-xs tabular text-mint">
                {i + 1}
              </span>
              <span className="text-muted text-pretty">{step}</span>
            </li>
          ))}
        </ol>

        <p className="mt-8 font-mono text-sm text-mint-dim">
          Prefer to just email?{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-mint underline underline-offset-4 hover:text-text"
          >
            {SITE.email}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {/* honeypot — off-screen, not focusable, must stay empty */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px]">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* The whole application, composed into the field the action reads. */}
      <input type="hidden" name="message" value={composed} />

      {exposure && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-mint/25 bg-mint/[0.05] px-4 py-3">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-mint">
            Self-check attached — {exposure.verdict} · {exposure.count}/
            {exposure.total} signals
          </span>
          <button
            type="button"
            onClick={clearExposure}
            className="font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-text"
          >
            Remove
          </button>
        </div>
      )}

      <Field
        label="Pharmacy / store name"
        htmlFor="company"
        error={fieldError(state, "company")}
      >
        <input
          ref={firstFieldRef}
          id="company"
          name="company"
          type="text"
          required
          value={f.company}
          onChange={set("company")}
          placeholder="e.g. Mercer Family Pharmacy"
          className={cn(inputBase, "border-hairline")}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" error={fieldError(state, "name")}>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={f.name}
            onChange={set("name")}
            placeholder="Who's applying"
            className={cn(
              inputBase,
              fieldError(state, "name") ? "border-danger/60" : "border-hairline",
            )}
          />
        </Field>
        <Field
          label="Work email"
          htmlFor="email"
          error={fieldError(state, "email")}
        >
          <input
            id="email"
            name="email"
            type="email"
            required
            value={f.email}
            onChange={set("email")}
            placeholder="you@pharmacy.com"
            className={cn(
              inputBase,
              fieldError(state, "email")
                ? "border-danger/60"
                : "border-hairline",
            )}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="City / state" htmlFor="location">
          <input
            id="location"
            name="location"
            type="text"
            value={f.location}
            onChange={set("location")}
            placeholder="e.g. Trenton, NJ"
            className={cn(inputBase, "border-hairline")}
          />
        </Field>
        <Field label="Pharmacy management system" htmlFor="pms">
          <input
            id="pms"
            name="pms"
            type="text"
            value={f.pms}
            onChange={set("pms")}
            placeholder="PrimeRx"
            className={cn(inputBase, "border-hairline")}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Scripts per day" htmlFor="scripts" optional>
          <input
            id="scripts"
            name="scripts"
            type="text"
            inputMode="numeric"
            value={f.scripts}
            onChange={set("scripts")}
            placeholder="e.g. 320"
            className={cn(inputBase, "border-hairline")}
          />
        </Field>
        <Field label="Number of stores" htmlFor="stores" optional>
          <input
            id="stores"
            name="stores"
            type="text"
            inputMode="numeric"
            value={f.stores}
            onChange={set("stores")}
            placeholder="e.g. 1"
            className={cn(inputBase, "border-hairline")}
          />
        </Field>
      </div>

      <fieldset>
        <legend className="mb-1.5 text-sm text-text">
          Which is hurting most right now?
        </legend>
        <p className="mb-3 text-sm text-muted">
          Pick the one that&apos;s eating the most hours — it points us at the
          first module to install.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {MODULES.map((m) => (
            <label
              key={m.slug}
              className="group flex cursor-pointer items-center gap-3 rounded-xl border border-hairline bg-emerald-deep/30 px-4 py-3 transition-colors hover:border-mint/25 has-[:checked]:border-mint/50 has-[:checked]:bg-mint/[0.06] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-mint"
            >
              <input
                type="radio"
                name="pain"
                value={m.name}
                checked={f.pain === m.name}
                onChange={set("pain")}
                className="sr-only"
              />
              <Glyph name={m.glyph} className="shrink-0" />
              <span className="min-w-0 flex-1 text-sm text-text">{m.name}</span>
              <StatusChip status={m.status} />
            </label>
          ))}
          <label className="group flex cursor-pointer items-center gap-3 rounded-xl border border-hairline bg-emerald-deep/30 px-4 py-3 transition-colors hover:border-mint/25 has-[:checked]:border-mint/50 has-[:checked]:bg-mint/[0.06] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-mint sm:col-span-2">
            <input
              type="radio"
              name="pain"
              value={NO_PAIN}
              checked={f.pain === NO_PAIN}
              onChange={set("pain")}
              className="sr-only"
            />
            <span className="min-w-0 flex-1 text-sm text-text">{NO_PAIN}</span>
          </label>
        </div>
      </fieldset>

      <Field
        label="In one sentence, what would you love to never do by hand again?"
        htmlFor="notes"
        error={fieldError(state, "message")}
      >
        <textarea
          id="notes"
          name="notes"
          required
          rows={4}
          value={f.notes}
          onChange={set("notes")}
          placeholder="The task you'd hand off tomorrow if you could."
          className={cn(
            inputBase,
            "resize-y",
            fieldError(state, "message") ? "border-danger/60" : "border-hairline",
          )}
        />
      </Field>

      {(state.status === "error" || state.status === "fallback") &&
        state.message && (
          <p
            className={cn(
              "text-sm",
              state.status === "fallback" ? "text-mint-dim" : "text-danger",
            )}
          >
            {state.message}
            {state.status === "fallback" && (
              <>
                {" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="underline underline-offset-4"
                >
                  {SITE.email}
                </a>
              </>
            )}
          </p>
        )}

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <SubmitButton />
        <a
          href={`mailto:${SITE.email}`}
          className="font-mono text-sm text-mint-dim transition-colors hover:text-text"
        >
          or {SITE.email}
        </a>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  optional,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 flex items-baseline justify-between gap-3 text-sm text-text"
      >
        <span>{label}</span>
        {optional && (
          <span className="font-mono text-[0.625rem] uppercase tracking-wider text-muted">
            optional
          </span>
        )}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-danger">{error}</p>}
    </div>
  );
}

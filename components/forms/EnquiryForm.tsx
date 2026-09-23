"use client";

import { useState, type FormEvent } from "react";
import { site, whatsappLink } from "@/content/site";
import { cx } from "@/lib/format";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const ENDPOINT = "https://api.web3forms.com/submit";

type Status = "idle" | "sending" | "sent" | "error";

type Errors = Partial<Record<"name" | "phone" | "email" | "message", string>>;

/**
 * Posts to Web3Forms, which needs no backend of its own — set
 * NEXT_PUBLIC_WEB3FORMS_KEY in .env.local (see .env.example).
 *
 * With no key configured the form does not pretend to work: it hands the
 * visitor a prefilled WhatsApp message instead, so an enquiry never hits a
 * dead end on a fresh deployment.
 */
export function EnquiryForm({
  subject = "Website enquiry",
  compact = false,
}: {
  subject?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  if (!ACCESS_KEY) return <WhatsappFallback subject={subject} />;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    if (name.length < 2) next.name = "Please tell us your name.";
    // Indian mobile numbers are 10 digits; allow +91, spaces and dashes.
    if (!/^(\+?91[-\s]?)?[6-9]\d{9}$/.test(phone.replace(/[\s-]/g, "")))
      next.phone = "Enter a 10-digit mobile number.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = "That email address does not look right.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      form.querySelector<HTMLInputElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setServerError(null);
    data.append("access_key", ACCESS_KEY!);
    data.append("subject", `${subject} — ${name}`);
    data.append("from_name", site.name);

    try {
      const res = await fetch(ENDPOINT, { method: "POST", body: data });
      const json = (await res.json()) as { success?: boolean; message?: string };
      if (!res.ok || !json.success) throw new Error(json.message ?? "Submission failed");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="border-accent/40 bg-accent/8 animate-(--animate-pop-in) rounded-(--radius-card) border p-8 text-center"
      >
        <h3 className="text-(length:--text-h3)">Thanks, we&rsquo;ve got it.</h3>
        <p className="text-muted mt-3 leading-relaxed">
          Someone from the team will be in touch. If it&rsquo;s urgent, WhatsApp us on{" "}
          {site.contact.phoneDisplay}.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-accent-text mt-5 text-sm underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cx("grid gap-5", compact ? "" : "sm:grid-cols-2")}>
      {/* Honeypot — real people never see it, bots fill it in. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
      />

      <Field label="Name" name="name" autoComplete="name" required error={errors.name} />
      <Field label="Mobile" name="phone" type="tel" autoComplete="tel" required error={errors.phone} />
      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        error={errors.email}
        className={compact ? "" : "sm:col-span-2"}
      />
      <Field
        label="What are you looking for?"
        name="message"
        textarea
        className={compact ? "" : "sm:col-span-2"}
        hint="Budget, preferred areas, timeline. Whatever you already know."
      />

      <div className={cx("flex flex-col gap-3", compact ? "" : "sm:col-span-2")}>
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-fg text-bg hover:bg-accent hover:text-ink inline-flex min-h-12 items-center justify-center rounded-full px-7 font-medium transition-[background-color,color,transform,opacity] active:scale-[0.98] disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>

        {status === "error" && (
          <p role="alert" className="animate-(--animate-pop-in) text-sm text-red-600 dark:text-red-400">
            {serverError} You can also{" "}
            <a href={whatsappLink()} className="underline underline-offset-4">
              message us on WhatsApp
            </a>
            .
          </p>
        )}

        <p className="text-faint text-xs leading-relaxed">
          We use your details only to respond to this enquiry.
        </p>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  textarea?: boolean;
  error?: string;
  hint?: string;
  className?: string;
};

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
  textarea,
  error,
  hint,
  className,
}: FieldProps) {
  const hintId = hint ? `${name}-hint` : undefined;
  const errorId = error ? `${name}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const shared = {
    id: name,
    name,
    autoComplete,
    required,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": describedBy,
    className: cx(
      "border-line bg-surface text-fg placeholder:text-faint w-full rounded-xl border px-4 py-3 outline-none transition-[border-color,box-shadow]",
      // A soft accent ring grows in on focus, alongside the border change.
      "focus:border-accent focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-accent)_14%,transparent)]",
      error && "border-red-500",
    ),
  };

  return (
    <div className={className}>
      <label htmlFor={name} className="text-muted mb-2 block text-sm font-medium">
        {label}
        {required && (
          <span className="text-accent-text ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {textarea ? (
        <textarea {...shared} rows={4} />
      ) : (
        <input {...shared} type={type} inputMode={type === "tel" ? "tel" : undefined} />
      )}

      {hint && (
        <p id={hintId} className="text-faint mt-2 text-xs">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 animate-(--animate-pop-in) text-xs text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Shown when no Web3Forms key is configured. Rather than a form that silently
 * drops submissions, this routes the enquiry to WhatsApp and email.
 *
 * Deliberately reads as ordinary site copy — a visitor should never see setup
 * instructions. To swap it for the full form, set NEXT_PUBLIC_WEB3FORMS_KEY
 * in .env.local (see the README).
 */
function WhatsappFallback({ subject }: { subject: string }) {
  return (
    <div className="border-line bg-surface rounded-(--radius-card) border p-7 sm:p-8">
      <h3 className="text-(length:--text-h3)">Let us know what you need</h3>
      <p className="text-muted mt-3 leading-relaxed">
        WhatsApp is the quickest way to reach us. Tell us your budget and where you&rsquo;re
        looking, and we&rsquo;ll come back with options.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappLink(`Hi ${site.name}, regarding ${subject}: `)}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-fg text-bg hover:bg-accent hover:text-ink inline-flex min-h-12 items-center justify-center rounded-full px-7 font-medium transition-[background-color,color,transform] active:scale-[0.97]"
        >
          Message on WhatsApp
        </a>
        <a
          href={`mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}`}
          className="border-line hover:border-accent hover:text-accent-text inline-flex min-h-12 items-center justify-center rounded-full border px-7 font-medium transition-[border-color,color,transform] active:scale-[0.97]"
        >
          Email us
        </a>
      </div>
    </div>
  );
}

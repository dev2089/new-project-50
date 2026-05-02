"use client";

import { useState } from "react";
import { createWhatsAppBooking } from "./actions";

export function BookingForm({
  defaultService,
  whatsappNumber,
}: {
  defaultService: string;
  whatsappNumber: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    try {
      const res = await createWhatsAppBooking(formData);
      window.location.href = res.url;
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm">Your name</span>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm">Phone (optional)</span>
          <input
            name="phone"
            inputMode="tel"
            className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm">Service (optional)</span>
        <input
          name="serviceName"
          defaultValue={defaultService}
          className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
          placeholder="e.g., Hair color, Hydra facial, Nail extension"
        />
      </label>

      <label className="block">
        <span className="text-sm">Preferred date/time (optional)</span>
        <input
          name="preferredDateText"
          className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
          placeholder="e.g., Tomorrow 4pm"
        />
      </label>

      <label className="block">
        <span className="text-sm">Notes (optional)</span>
        <textarea
          name="notes"
          rows={3}
          className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
          placeholder="Tell us anything you want us to know"
        />
      </label>

      {error ? (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <button
        disabled={loading}
        className="w-full rounded-md bg-[color:var(--color-brand-accent)] px-4 py-2.5 text-sm font-semibold text-black hover:opacity-95 disabled:opacity-60"
      >
        {loading ? "Opening WhatsApp..." : "Confirm on WhatsApp"}
      </button>

      <div className="text-xs text-[color:var(--color-muted-foreground)]">
        WhatsApp number: {whatsappNumber || "-"} (editable in Admin → Settings)
      </div>
    </form>
  );
}

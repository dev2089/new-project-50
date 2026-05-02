import Link from "next/link";
import { getDB } from "@/lib/store";

export default async function ContactPage() {
  const db = await getDB();
  const wa = db.settings.whatsappNumber.replace(/[^\d]/g, "");
  const waLink = `https://wa.me/${wa}?text=${encodeURIComponent("Hello! I would like to book an appointment.")}`;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">
        Reach us quickly on WhatsApp or call. Address and details are editable from admin.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-6 shadow-sm">
          <div className="text-sm font-semibold">Location</div>
          <div className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">{db.settings.addressLine}</div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={waLink}
              className="rounded-md bg-[color:var(--color-brand-accent)] px-4 py-2.5 text-sm font-semibold text-black hover:opacity-95"
            >
              WhatsApp
            </Link>
            <a
              href={`tel:${db.settings.phoneNumber}`}
              className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-2.5 text-sm font-semibold hover:bg-white/50 dark:hover:bg-white/5"
            >
              Call
            </a>
            <Link
              href="/book"
              className="rounded-md bg-[color:var(--color-brand-primary)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95"
            >
              Book
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-muted)] p-6 shadow-sm">
          <div className="text-sm font-semibold">Payment options</div>
          <div className="mt-3 grid gap-2 text-sm text-[color:var(--color-muted-foreground)]">
            {db.settings.acceptsCreditCards ? <div>Credit cards</div> : null}
            {db.settings.acceptsDebitCards ? <div>Debit cards</div> : null}
            {db.settings.acceptsGooglePay ? <div>Google Pay</div> : null}
            {db.settings.acceptsNfcPayments ? <div>NFC mobile payments</div> : null}
          </div>
          <div className="mt-6 border-t border-[color:var(--color-border)] pt-5">
            <div className="text-sm font-semibold">Crowd</div>
            <div className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">
              {db.settings.lgbtFriendly ? "LGBTQ+ friendly" : "Welcome"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


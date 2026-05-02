import { getDB } from "@/lib/store";
import { updateSettings } from "./actions";
import Image from "next/image";

export default async function AdminSettingsPage() {
  const db = await getDB();
  const s = db.settings;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-[color:var(--color-muted-foreground)]">
          Brand text, WhatsApp booking number, and defaults for SEO.
        </p>
      </div>

      <form action={updateSettings} className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-5 shadow-sm">
          <div className="text-sm font-semibold">Brand</div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-muted)] p-3">
              <div className="text-xs text-[color:var(--color-muted-foreground)]">Logo (light)</div>
              <div className="mt-2 relative h-12 w-36 overflow-hidden rounded-md bg-white">
                {s.logoPathLight ? <Image src={s.logoPathLight} alt="Logo light" fill className="object-contain p-2" /> : null}
              </div>
              <input name="logoLight" type="file" accept="image/*" className="mt-3 block w-full text-xs" />
            </div>
            <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-muted)] p-3">
              <div className="text-xs text-[color:var(--color-muted-foreground)]">Logo (dark)</div>
              <div className="mt-2 relative h-12 w-36 overflow-hidden rounded-md bg-black">
                {s.logoPathDark ? <Image src={s.logoPathDark} alt="Logo dark" fill className="object-contain p-2" /> : null}
              </div>
              <input name="logoDark" type="file" accept="image/*" className="mt-3 block w-full text-xs" />
            </div>
          </div>
          <label className="block">
            <span className="text-sm">Website name</span>
            <input
              name="siteName"
              defaultValue={s.siteName}
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm">Tagline</span>
            <input
              name="tagline"
              defaultValue={s.tagline}
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm">Hero headline</span>
            <input
              name="heroHeadline"
              defaultValue={s.heroHeadline}
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm">Hero subheadline</span>
            <textarea
              name="heroSubheadline"
              defaultValue={s.heroSubheadline}
              rows={3}
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm">About (markdown/plain text)</span>
            <textarea
              name="aboutMarkdown"
              defaultValue={s.aboutMarkdown}
              rows={4}
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
            />
          </label>
        </div>

        <div className="space-y-4 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-5 shadow-sm">
          <div className="text-sm font-semibold">Contact & Booking</div>
          <label className="block">
            <span className="text-sm">Address</span>
            <textarea
              name="addressLine"
              defaultValue={s.addressLine}
              rows={3}
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm">Phone number</span>
            <input
              name="phoneNumber"
              defaultValue={s.phoneNumber}
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm">WhatsApp number (digits only)</span>
            <input
              name="whatsappNumber"
              defaultValue={s.whatsappNumber}
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
            />
          </label>
          <div className="grid gap-2 rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-muted)] p-3 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="onSiteServices" defaultChecked={s.onSiteServices} />
              On-site services
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="lgbtFriendly" defaultChecked={s.lgbtFriendly} />
              LGBTQ+ friendly
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="acceptsCreditCards" defaultChecked={s.acceptsCreditCards} />
              Credit cards
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="acceptsDebitCards" defaultChecked={s.acceptsDebitCards} />
              Debit cards
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="acceptsGooglePay" defaultChecked={s.acceptsGooglePay} />
              Google Pay
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="acceptsNfcPayments" defaultChecked={s.acceptsNfcPayments} />
              NFC mobile payments
            </label>
          </div>
        </div>

        <div className="space-y-4 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-5 shadow-sm lg:col-span-2">
          <div className="text-sm font-semibold">SEO Defaults</div>
          <label className="block">
            <span className="text-sm">Default meta title</span>
            <input
              name="defaultMetaTitle"
              defaultValue={s.defaultMetaTitle}
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm">Default meta description</span>
            <textarea
              name="defaultMetaDesc"
              defaultValue={s.defaultMetaDesc}
              rows={3}
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
            />
          </label>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-md bg-[color:var(--color-brand-primary)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95">
              Save changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

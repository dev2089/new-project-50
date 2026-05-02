import Link from "next/link";
import { getDB } from "@/lib/store";

export async function SiteFooter() {
  const db = await getDB();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[color:var(--color-border)] bg-[color:var(--color-background)]">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div className="space-y-2">
          <div className="text-sm font-semibold">{db.settings.siteName}</div>
          <div className="text-sm text-[color:var(--color-muted-foreground)]">{db.settings.tagline}</div>
          <div className="text-sm text-[color:var(--color-muted-foreground)]">{db.settings.addressLine}</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-semibold">Quick Links</div>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/services" className="text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-foreground)]">
              Services
            </Link>
            <Link href="/about" className="text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-foreground)]">
              About
            </Link>
            <Link href="/academy" className="text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-foreground)]">
              Academy
            </Link>
            <Link href="/gallery" className="text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-foreground)]">
              Gallery
            </Link>
            <Link href="/contact" className="text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-foreground)]">
              Contact
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-semibold">Policies</div>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/p/privacy" className="text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-foreground)]">
              Privacy Policy
            </Link>
            <Link href="/p/terms" className="text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-foreground)]">
              Terms & Conditions
            </Link>
            <Link href="/admin" className="text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-foreground)]">
              Admin
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[color:var(--color-border)]">
        <div className="mx-auto w-full max-w-6xl px-4 py-4 text-xs text-[color:var(--color-muted-foreground)]">
          © {year} {db.settings.siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

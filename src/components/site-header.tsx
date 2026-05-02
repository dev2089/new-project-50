import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { getDB } from "@/lib/store";
import Image from "next/image";

export async function SiteHeader() {
  const db = await getDB();
  const navPages = db.pages
    .filter((p) => p.published && p.showInNav)
    .sort((a, b) => a.navOrder - b.navOrder);

  const links = [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/academy", label: "Academy" },
    ...(db.products.some((p) => p.active) ? [{ href: "/products", label: "Products" }] : []),
    { href: "/gallery", label: "Gallery" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" },
    ...navPages.map((p) => ({ href: `/p/${p.slug}`, label: p.title })),
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-border)] bg-[color:var(--color-background)]/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          {db.settings.logoPathLight || db.settings.logoPathDark ? (
            <div className="relative h-9 w-9 overflow-hidden rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-muted)]">
              {db.settings.logoPathLight ? (
                <Image
                  src={db.settings.logoPathLight}
                  alt="Logo"
                  fill
                  className="object-contain p-1.5 dark:hidden"
                />
              ) : null}
              {db.settings.logoPathDark ? (
                <Image
                  src={db.settings.logoPathDark}
                  alt="Logo"
                  fill
                  className={`object-contain p-1.5 ${db.settings.logoPathLight ? "hidden dark:block" : ""}`}
                />
              ) : null}
            </div>
          ) : (
            <div className="grid h-9 w-9 place-items-center rounded-md bg-[color:var(--color-brand-primary)] text-white shadow-sm">
              <span className="font-semibold tracking-tight">NI</span>
            </div>
          )}
          <div className="hidden sm:block">
            <div className="text-sm font-semibold leading-tight">{db.settings.siteName}</div>
            <div className="text-xs text-[color:var(--color-muted-foreground)]">
              {db.settings.tagline}
            </div>
          </div>
        </Link>

        <nav className="ml-auto hidden items-center gap-4 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-foreground)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-md bg-[color:var(--color-brand-primary)] px-3 py-2 text-sm font-medium text-white shadow-sm hover:opacity-95"
          >
            Book
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <div className="lg:hidden border-t border-[color:var(--color-border)]">
        <div className="mx-auto w-full max-w-6xl overflow-x-auto px-4 py-2">
          <div className="flex w-max items-center gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="whitespace-nowrap text-sm text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-foreground)]"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

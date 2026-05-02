import Link from "next/link";
import Image from "next/image";
import { getDB } from "@/lib/store";

type Tile = { id: string; path: string; alt?: string };

export default async function HomePage() {
  const db = await getDB();
  const featuredServices = db.services
    .filter((s) => s.active && s.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 6);

  const featuredMedia = db.media
    .filter((m) => m.featured && m.type === "IMAGE")
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 6);

  const heroImage =
    featuredMedia[0]?.path ||
    "/luxury/hero-1.svg";

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Luxury salon"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-brand-accent)]" />
              Indore - Manik Bagh
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              {db.settings.heroHeadline}
            </h1>
            <p className="mt-4 text-base text-white/85 sm:text-lg">
              {db.settings.heroSubheadline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/book"
                className="inline-flex items-center justify-center rounded-md bg-[color:var(--color-brand-accent)] px-4 py-2.5 text-sm font-semibold text-black shadow-sm hover:opacity-95"
              >
                Book on WhatsApp
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
              >
                View Services
              </Link>
              <Link
                href="/academy"
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
              >
                Explore Academy
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 text-sm text-white/85 sm:flex sm:flex-wrap sm:gap-6">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[color:var(--color-brand-accent)]" />
                On-site services
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[color:var(--color-brand-accent)]" />
                LGBTQ+ friendly
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[color:var(--color-brand-accent)]" />
                Cards + Google Pay
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[color:var(--color-brand-accent)]" />
                Hygienic & relaxing
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Featured Services</h2>
            <p className="mt-1 text-sm text-[color:var(--color-muted-foreground)]">
              Quick picks people love. Admin can edit everything.
            </p>
          </div>
          <Link
            href="/services"
            className="text-sm font-medium text-[color:var(--color-brand-primary-2)] hover:underline"
          >
            See all
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.length === 0 ? (
            <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-muted)] p-5 text-sm text-[color:var(--color-muted-foreground)]">
              Add featured services in Admin: Services.
            </div>
          ) : (
            featuredServices.map((s) => (
              <div
                key={s.id}
                className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-5 shadow-sm"
              >
                <div className="text-base font-semibold">{s.name}</div>
                {s.description ? (
                  <div className="mt-1 text-sm text-[color:var(--color-muted-foreground)]">
                    {s.description}
                  </div>
                ) : null}
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-[color:var(--color-muted-foreground)]">
                  {typeof s.priceFromInr === "number" ? (
                    <span className="rounded-full bg-[color:var(--color-muted)] px-2 py-1">
                      From INR {s.priceFromInr}
                    </span>
                  ) : null}
                  {typeof s.durationMins === "number" ? (
                    <span className="rounded-full bg-[color:var(--color-muted)] px-2 py-1">
                      {s.durationMins} min
                    </span>
                  ) : null}
                </div>
                <div className="mt-5">
                  <Link
                    href={`/book?service=${encodeURIComponent(s.name)}`}
                    className="inline-flex items-center justify-center rounded-md bg-[color:var(--color-brand-primary)] px-3 py-2 text-sm font-medium text-white hover:opacity-95"
                  >
                    Book this
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="border-t border-[color:var(--color-border)] bg-[color:var(--color-muted)]">
        <div className="mx-auto w-full max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold">Salon + Academy in one place</h2>
              <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">
                From beauty services to professional training, the website is built to convert visitors into WhatsApp bookings,
                while keeping your team in control through a secure admin panel.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/academy"
                  className="inline-flex items-center justify-center rounded-md bg-[color:var(--color-brand-primary)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95"
                >
                  Academy
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-2.5 text-sm font-semibold hover:bg-white/50 dark:hover:bg-white/5"
                >
                  Gallery
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {(featuredMedia.length ? featuredMedia : [
                { id: "lux1", path: "/luxury/grid-1.svg", alt: "Luxury salon" },
                { id: "lux2", path: "/luxury/grid-2.svg", alt: "Luxury spa" },
                { id: "lux3", path: "/luxury/grid-3.svg", alt: "Luxury beauty" },
              ]).slice(0, 3).map((m: Tile) => (
                <div key={m.id} className="relative aspect-square overflow-hidden rounded-lg border border-[color:var(--color-border)]">
                  <Image src={m.path} alt={m.alt || "Gallery"} fill className="object-cover" />
                </div>
              ))}
              {(featuredMedia.length ? featuredMedia : [
                { id: "lux4", path: "/luxury/grid-4.svg", alt: "Luxury salon interior" },
                { id: "lux5", path: "/luxury/grid-5.svg", alt: "Luxury makeup studio" },
                { id: "lux6", path: "/luxury/grid-6.svg", alt: "Luxury nails" },
              ]).slice(0, 3).map((m: Tile) => (
                <div key={m.id} className="relative aspect-square overflow-hidden rounded-lg border border-[color:var(--color-border)]">
                  <Image src={m.path} alt={m.alt || "Gallery"} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

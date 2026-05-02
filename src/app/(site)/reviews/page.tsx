import Link from "next/link";
import { getDB } from "@/lib/store";

function Stars({ n }: { n: number }) {
  const full = Math.max(0, Math.min(5, n));
  return (
    <div className="text-sm text-[color:var(--color-brand-accent)]" aria-label={`${full} stars`}>
      {"★★★★★".slice(0, full)}
      <span className="text-[color:var(--color-muted-foreground)]">{"★★★★★".slice(full)}</span>
    </div>
  );
}

export default async function ReviewsPage() {
  const db = await getDB();
  const reviews = [...db.reviews].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Reviews</h1>
          <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">
            A few highlights. Admin can edit/add more.
          </p>
        </div>
        <Link
          href="/book"
          className="rounded-md bg-[color:var(--color-brand-primary)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95"
        >
          Book now
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="text-sm font-semibold">{r.authorName}</div>
              <div className="text-xs text-[color:var(--color-muted-foreground)]">{r.reviewTime}</div>
            </div>
            <div className="mt-2">
              <Stars n={r.rating} />
            </div>
            <div className="mt-3 text-sm text-[color:var(--color-muted-foreground)]">{r.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


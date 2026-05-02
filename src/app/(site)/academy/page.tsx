import Link from "next/link";
import { getDB } from "@/lib/store";

export default async function AcademyPage() {
  const db = await getDB();
  const categories = [...db.courseCategories].sort((a, b) => a.sortOrder - b.sortOrder);
  const courses = db.courses.filter((c) => c.active).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Academy</h1>
          <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">
            Professional training programs. Enquire instantly on WhatsApp.
          </p>
        </div>
        <Link
          href="/book?service=Academy%20Enquiry"
          className="rounded-md bg-[color:var(--color-brand-primary)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95"
        >
          Enquire
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="mt-8 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-muted)] p-6 text-sm text-[color:var(--color-muted-foreground)]">
          No courses yet. Add them from Admin → Academy.
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {(categories.length ? categories : [{ id: "uncat", name: "Courses", sortOrder: 0 }]).map((c) => {
            const inCat = courses.filter((x) => x.categoryId === c.id || c.id === "uncat");
            if (categories.length && inCat.length === 0) return null;
            return (
              <section key={c.id}>
                <h2 className="text-lg font-semibold">{c.name}</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {inCat.map((co) => (
                    <div
                      key={co.id}
                      className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-5 shadow-sm"
                    >
                      <div className="text-base font-semibold">{co.name}</div>
                      {co.description ? (
                        <div className="mt-1 text-sm text-[color:var(--color-muted-foreground)]">
                          {co.description}
                        </div>
                      ) : null}
                      <div className="mt-4 flex flex-wrap gap-2 text-xs text-[color:var(--color-muted-foreground)]">
                        {co.durationText ? (
                          <span className="rounded-full bg-[color:var(--color-muted)] px-2 py-1">{co.durationText}</span>
                        ) : null}
                        {co.feesText ? (
                          <span className="rounded-full bg-[color:var(--color-muted)] px-2 py-1">{co.feesText}</span>
                        ) : null}
                      </div>
                      <div className="mt-5">
                        <Link
                          href={`/book?service=${encodeURIComponent("Academy: " + co.name)}`}
                          className="inline-flex items-center justify-center rounded-md bg-[color:var(--color-brand-accent)] px-3 py-2 text-sm font-semibold text-black hover:opacity-95"
                        >
                          Enquire on WhatsApp
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}


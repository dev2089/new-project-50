import Link from "next/link";
import { getDB } from "@/lib/store";
import { upsertPage, togglePage } from "./actions";

export default async function AdminPagesPage() {
  const db = await getDB();
  const pages = [...db.pages].sort((a, b) => a.navOrder - b.navOrder);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Pages</h1>
        <p className="mt-1 text-sm text-[color:var(--color-muted-foreground)]">
          Create custom pages (with SEO meta) and optionally show them in the navigation.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-5 shadow-sm">
          <div className="text-sm font-semibold">Create / update page</div>
          <form action={upsertPage} className="mt-4 space-y-3">
            <label className="block">
              <span className="text-sm">Slug (no spaces)</span>
              <input
                name="slug"
                placeholder="e.g., offers, about, bridal"
                className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm">Title</span>
              <input
                name="title"
                className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm">Content (plain text/markdown)</span>
              <textarea
                name="contentMarkdown"
                rows={6}
                className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm">Meta title</span>
                <input
                  name="metaTitle"
                  className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-sm">Meta description</span>
                <input
                  name="metaDesc"
                  className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
                />
              </label>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="published" defaultChecked />
                Published
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="showInNav" />
                Show in nav
              </label>
            </div>
            <label className="block">
              <span className="text-sm">Nav order</span>
              <input
                name="navOrder"
                inputMode="numeric"
                defaultValue="50"
                className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
              />
            </label>
            <button className="w-full rounded-md bg-[color:var(--color-brand-primary)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95">
              Save page
            </button>
          </form>
        </div>

        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-5 shadow-sm">
          <div className="text-sm font-semibold">Existing pages</div>
          {pages.length === 0 ? (
            <div className="mt-3 text-sm text-[color:var(--color-muted-foreground)]">No pages yet.</div>
          ) : (
            <div className="mt-4 space-y-3">
              {pages.map((p) => (
                <div key={p.id} className="rounded-lg border border-[color:var(--color-border)] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">{p.title}</div>
                      <div className="text-xs text-[color:var(--color-muted-foreground)]">/p/{p.slug}</div>
                      <div className="mt-1 text-xs text-[color:var(--color-muted-foreground)]">
                        {p.published ? "Published" : "Draft"} • {p.showInNav ? "In nav" : "Hidden"}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/p/${p.slug}`}
                        className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-muted)] px-2 py-1 text-xs hover:opacity-90"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                  <div className="mt-3">
                    <form action={togglePage} className="inline-flex gap-2">
                      <input type="hidden" name="id" value={p.id} />
                      <button
                        name="field"
                        value="published"
                        className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-muted)] px-2 py-1 text-xs hover:opacity-90"
                      >
                        Toggle published
                      </button>
                      <button
                        name="field"
                        value="showInNav"
                        className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-muted)] px-2 py-1 text-xs hover:opacity-90"
                      >
                        Toggle nav
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { getDB } from "@/lib/store";
import { addReview, toggleReview } from "./actions";

export default async function AdminReviewsPage() {
  const db = await getDB();
  const reviews = [...db.reviews].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Reviews</h1>
        <p className="mt-1 text-sm text-[color:var(--color-muted-foreground)]">
          Add/edit highlight reviews shown on the website.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-5 shadow-sm">
          <div className="text-sm font-semibold">Add review</div>
          <form action={addReview} className="mt-4 space-y-3">
            <label className="block">
              <span className="text-sm">Author</span>
              <input
                name="authorName"
                className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
                required
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm">Rating (1-5)</span>
                <input
                  name="rating"
                  defaultValue="5"
                  inputMode="numeric"
                  className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-sm">Time (e.g., 2 months ago)</span>
                <input
                  name="reviewTime"
                  className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-sm">Review text</span>
              <textarea
                name="text"
                rows={4}
                className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
                required
              />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="featured" defaultChecked />
              Featured
            </label>
            <button className="w-full rounded-md bg-[color:var(--color-brand-primary)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95">
              Add review
            </button>
          </form>
        </div>

        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-5 shadow-sm">
          <div className="text-sm font-semibold">Existing reviews</div>
          {reviews.length === 0 ? (
            <div className="mt-3 text-sm text-[color:var(--color-muted-foreground)]">No reviews yet.</div>
          ) : (
            <div className="mt-4 space-y-3">
              {reviews.map((r) => (
                <div key={r.id} className="rounded-lg border border-[color:var(--color-border)] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">{r.authorName}</div>
                      <div className="text-xs text-[color:var(--color-muted-foreground)]">
                        {r.rating}/5 • {r.reviewTime}
                      </div>
                    </div>
                    <div className="text-xs text-[color:var(--color-muted-foreground)]">
                      {r.featured ? "Featured" : "Hidden"}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">{r.text}</div>
                  <div className="mt-3">
                    <form action={toggleReview} className="inline-flex gap-2">
                      <input type="hidden" name="id" value={r.id} />
                      <button
                        name="field"
                        value="featured"
                        className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-muted)] px-2 py-1 text-xs hover:opacity-90"
                      >
                        Toggle featured
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

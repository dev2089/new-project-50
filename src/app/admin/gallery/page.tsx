import Image from "next/image";
import { getDB } from "@/lib/store";
import { uploadMedia } from "./actions";

export default async function AdminGalleryPage() {
  const db = await getDB();
  const media = [...db.media].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Gallery</h1>
        <p className="mt-1 text-sm text-[color:var(--color-muted-foreground)]">
          Upload luxury photos/videos here. Mark featured items to show up on the home page.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-5 shadow-sm">
          <div className="text-sm font-semibold">Upload</div>
          <form action={uploadMedia} className="mt-4 space-y-3">
            <label className="block">
              <span className="text-sm">File (image/video)</span>
              <input
                name="file"
                type="file"
                accept="image/*,video/*"
                required
                className="mt-2 block w-full text-sm"
              />
            </label>
            <label className="block">
              <span className="text-sm">Title</span>
              <input
                name="title"
                className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-sm">Tags (comma-separated)</span>
              <input
                name="tags"
                placeholder="e.g., nails, hair, academy, interior"
                className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
              />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="featured" />
              Featured on home
            </label>
            <button className="w-full rounded-md bg-[color:var(--color-brand-primary)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95">
              Upload
            </button>
          </form>
        </div>

        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-muted)] p-5 shadow-sm">
          <div className="text-sm font-semibold">Tip</div>
          <div className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">
            For best hero quality, upload 1600px+ wide images. Videos should be short and optimized.
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-5 shadow-sm">
        <div className="text-sm font-semibold">Recent media</div>
        {media.length === 0 ? (
          <div className="mt-3 text-sm text-[color:var(--color-muted-foreground)]">No uploads yet.</div>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {media.slice(0, 9).map((m) => (
              <div
                key={m.id}
                className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-muted)]"
              >
                {m.type === "VIDEO" ? (
                  <video src={m.path} controls className="h-full w-full object-cover" />
                ) : (
                  <Image src={m.path} alt={m.alt || "Media"} fill className="object-cover" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


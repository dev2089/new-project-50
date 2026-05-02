import Image from "next/image";
import { getDB } from "@/lib/store";

type GalleryItem = {
  id: string;
  type: "IMAGE" | "VIDEO";
  path: string;
  alt?: string;
};

export default async function GalleryPage() {
  const db = await getDB();
  const media = [...db.media].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const items: GalleryItem[] = media.length
    ? media.map((m) => ({ id: m.id, type: m.type, path: m.path, alt: m.alt }))
    : [
        { id: "g1", type: "IMAGE", path: "/luxury/grid-1.svg", alt: "Luxury salon" },
        { id: "g2", type: "IMAGE", path: "/luxury/grid-2.svg", alt: "Luxury spa" },
        { id: "g3", type: "IMAGE", path: "/luxury/grid-3.svg", alt: "Luxury beauty" },
        { id: "g4", type: "IMAGE", path: "/luxury/grid-4.svg", alt: "Luxury salon interior" },
        { id: "g5", type: "IMAGE", path: "/luxury/grid-5.svg", alt: "Luxury makeup studio" },
        { id: "g6", type: "IMAGE", path: "/luxury/grid-6.svg", alt: "Luxury nails" },
      ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Gallery</h1>
      <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">
        Photos and videos. Admin can upload and reorder.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m) => (
          <div
            key={m.id}
            className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-muted)]"
          >
            {m.type === "VIDEO" ? (
              <video src={m.path} controls className="h-full w-full object-cover" />
            ) : (
              <Image src={m.path} alt={m.alt || "Gallery"} fill className="object-cover" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

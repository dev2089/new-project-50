import Link from "next/link";
import Image from "next/image";
import { getDB } from "@/lib/store";

export default async function ProductsPage() {
  const db = await getDB();
  const categories = [...db.productCategories].sort((a, b) => a.sortOrder - b.sortOrder);
  const products = db.products.filter((p) => p.active).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">
            Browse products and enquire on WhatsApp.
          </p>
        </div>
        <Link
          href="/book?service=Product%20Enquiry"
          className="rounded-md bg-[color:var(--color-brand-primary)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95"
        >
          Enquire
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="mt-8 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-muted)] p-6 text-sm text-[color:var(--color-muted-foreground)]">
          No products yet. Add them from Admin → Products.
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {(categories.length ? categories : [{ id: "uncat", name: "Products", sortOrder: 0 }]).map((c) => {
            const inCat = products.filter((p) => p.categoryId === c.id || c.id === "uncat");
            if (categories.length && inCat.length === 0) return null;
            return (
              <section key={c.id}>
                <h2 className="text-lg font-semibold">{c.name}</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {inCat.map((p) => (
                    <div
                      key={p.id}
                      className="overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] shadow-sm"
                    >
                      <div className="relative aspect-[4/3] bg-[color:var(--color-muted)]">
                        {p.imagePath ? (
                          <Image src={p.imagePath} alt={p.name} fill className="object-cover" />
                        ) : (
                          <div className="grid h-full w-full place-items-center text-sm text-[color:var(--color-muted-foreground)]">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="text-base font-semibold">{p.name}</div>
                        {p.description ? (
                          <div className="mt-1 text-sm text-[color:var(--color-muted-foreground)]">
                            {p.description}
                          </div>
                        ) : null}
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div className="text-sm">
                            {typeof p.priceInr === "number" ? (
                              <span className="font-semibold">₹{p.priceInr}</span>
                            ) : (
                              <span className="text-[color:var(--color-muted-foreground)]">Price on request</span>
                            )}
                          </div>
                          <Link
                            href={`/book?service=${encodeURIComponent("Product: " + p.name)}`}
                            className="rounded-md bg-[color:var(--color-brand-accent)] px-3 py-2 text-sm font-semibold text-black hover:opacity-95"
                          >
                            WhatsApp
                          </Link>
                        </div>
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


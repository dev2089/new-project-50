import Image from "next/image";
import { getDB } from "@/lib/store";
import { addProduct, addProductCategory, toggleProduct } from "./actions";

export default async function AdminProductsPage() {
  const db = await getDB();
  const cats = [...db.productCategories].sort((a, b) => a.sortOrder - b.sortOrder);
  const products = [...db.products].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Products</h1>
        <p className="mt-1 text-sm text-[color:var(--color-muted-foreground)]">
          Add product categories and products. Upload product images right here.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-5 shadow-sm">
          <div className="text-sm font-semibold">Add category</div>
          <form action={addProductCategory} className="mt-4 flex gap-2">
            <input
              name="name"
              placeholder="e.g., Skincare, Haircare"
              className="flex-1 rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
              required
            />
            <button className="rounded-md bg-[color:var(--color-brand-primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-95">
              Add
            </button>
          </form>
          <div className="mt-6 text-sm text-[color:var(--color-muted-foreground)]">
            Categories: {cats.length ? cats.map((c) => c.name).join(", ") : "none"}
          </div>
        </div>

        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-5 shadow-sm">
          <div className="text-sm font-semibold">Add product</div>
          <form action={addProduct} className="mt-4 space-y-3">
            <label className="block">
              <span className="text-sm">Category</span>
              <select
                name="categoryId"
                className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
                required
                defaultValue={cats[0]?.id || ""}
              >
                {cats.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm">Product name</span>
              <input
                name="name"
                className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm">Description</span>
              <textarea
                name="description"
                rows={2}
                className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-sm">Price (INR, optional)</span>
              <input
                name="priceInr"
                inputMode="numeric"
                className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-sm">Product image (optional)</span>
              <input name="image" type="file" accept="image/*" className="mt-2 block w-full text-sm" />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="featured" />
              Featured
            </label>
            <button className="w-full rounded-md bg-[color:var(--color-brand-primary)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95">
              Add product
            </button>
            {cats.length === 0 ? (
              <div className="text-sm text-[color:var(--color-muted-foreground)]">Add at least one category first.</div>
            ) : null}
          </form>
        </div>
      </div>

      <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] shadow-sm">
        <div className="border-b border-[color:var(--color-border)] px-5 py-4">
          <div className="text-sm font-semibold">All products</div>
        </div>
        <div className="p-5">
          {products.length === 0 ? (
            <div className="text-sm text-[color:var(--color-muted-foreground)]">No products yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-[color:var(--color-muted-foreground)]">
                  <tr>
                    <th className="py-2 pr-3">Product</th>
                    <th className="py-2 pr-3">Category</th>
                    <th className="py-2 pr-3">Featured</th>
                    <th className="py-2 pr-3">Active</th>
                    <th className="py-2 pr-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t border-[color:var(--color-border)]">
                      <td className="py-2 pr-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-14 overflow-hidden rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-muted)]">
                            {p.imagePath ? <Image src={p.imagePath} alt={p.name} fill className="object-cover" /> : null}
                          </div>
                          <div>{p.name}</div>
                        </div>
                      </td>
                      <td className="py-2 pr-3">{cats.find((c) => c.id === p.categoryId)?.name || "-"}</td>
                      <td className="py-2 pr-3">{p.featured ? "Yes" : "No"}</td>
                      <td className="py-2 pr-3">{p.active ? "Yes" : "No"}</td>
                      <td className="py-2 pr-3">
                        <form action={toggleProduct} className="inline-flex gap-2">
                          <input type="hidden" name="id" value={p.id} />
                          <button
                            name="field"
                            value="featured"
                            className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-muted)] px-2 py-1 text-xs hover:opacity-90"
                          >
                            Toggle featured
                          </button>
                          <button
                            name="field"
                            value="active"
                            className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-muted)] px-2 py-1 text-xs hover:opacity-90"
                          >
                            Toggle active
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

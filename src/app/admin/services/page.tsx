import { getDB } from "@/lib/store";
import { addService, addServiceCategory, toggleService } from "./actions";

export default async function AdminServicesPage() {
  const db = await getDB();
  const cats = [...db.serviceCategories].sort((a, b) => a.sortOrder - b.sortOrder);
  const services = [...db.services].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Services</h1>
        <p className="mt-1 text-sm text-[color:var(--color-muted-foreground)]">
          Add categories and services. Mark services as featured to show them on the home page.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-5 shadow-sm">
          <div className="text-sm font-semibold">Add category</div>
          <form action={addServiceCategory} className="mt-4 flex gap-2">
            <input
              name="name"
              placeholder="e.g., Hair, Skin, Nails"
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
          <div className="text-sm font-semibold">Add service</div>
          <form action={addService} className="mt-4 space-y-3">
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
              <span className="text-sm">Service name</span>
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
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm">Price from (INR)</span>
                <input
                  name="priceFromInr"
                  inputMode="numeric"
                  className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-sm">Duration (mins)</span>
                <input
                  name="durationMins"
                  inputMode="numeric"
                  className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
                />
              </label>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="featured" />
              Featured
            </label>
            <button className="w-full rounded-md bg-[color:var(--color-brand-primary)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95">
              Add service
            </button>
            {cats.length === 0 ? (
              <div className="text-sm text-[color:var(--color-muted-foreground)]">
                Add at least one category first.
              </div>
            ) : null}
          </form>
        </div>
      </div>

      <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] shadow-sm">
        <div className="border-b border-[color:var(--color-border)] px-5 py-4">
          <div className="text-sm font-semibold">All services</div>
        </div>
        <div className="p-5">
          {services.length === 0 ? (
            <div className="text-sm text-[color:var(--color-muted-foreground)]">No services yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-[color:var(--color-muted-foreground)]">
                  <tr>
                    <th className="py-2 pr-3">Name</th>
                    <th className="py-2 pr-3">Category</th>
                    <th className="py-2 pr-3">Featured</th>
                    <th className="py-2 pr-3">Active</th>
                    <th className="py-2 pr-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s) => (
                    <tr key={s.id} className="border-t border-[color:var(--color-border)]">
                      <td className="py-2 pr-3">{s.name}</td>
                      <td className="py-2 pr-3">
                        {cats.find((c) => c.id === s.categoryId)?.name || "-"}
                      </td>
                      <td className="py-2 pr-3">{s.featured ? "Yes" : "No"}</td>
                      <td className="py-2 pr-3">{s.active ? "Yes" : "No"}</td>
                      <td className="py-2 pr-3">
                        <form action={toggleService} className="inline-flex gap-2">
                          <input type="hidden" name="id" value={s.id} />
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


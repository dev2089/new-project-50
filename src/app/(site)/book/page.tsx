import { getDB } from "@/lib/store";
import { BookingForm } from "./ui";

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const db = await getDB();
  const service = typeof sp.service === "string" ? sp.service : "";

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Book on WhatsApp</h1>
      <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">
        Fill this quick form. When you tap confirm, you’ll be redirected to WhatsApp with a personalized message.
        The booking will also be logged in the admin dashboard as confirmed.
      </p>
      <div className="mt-8 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-6 shadow-sm">
        <BookingForm defaultService={service} whatsappNumber={db.settings.whatsappNumber} />
      </div>
    </div>
  );
}


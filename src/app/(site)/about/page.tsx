import { getDB } from "@/lib/store";

export default async function AboutPage() {
  const db = await getDB();
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">About</h1>
      <div className="mt-6 whitespace-pre-wrap text-sm text-[color:var(--color-muted-foreground)]">
        {db.settings.aboutMarkdown || "Update this section in Admin -> Settings."}
      </div>
    </div>
  );
}


import { notFound } from "next/navigation";
import { getDB } from "@/lib/store";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const db = await getDB();
  const p = db.pages.find((x) => x.slug === slug && x.published);
  if (!p) return {};
  const title = p.metaTitle || p.title || db.settings.defaultMetaTitle;
  const description = p.metaDesc || db.settings.defaultMetaDesc;
  return { title, description };
}

export default async function CustomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = await getDB();
  const page = db.pages.find((p) => p.slug === slug && p.published);
  if (!page) return notFound();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">{page.title}</h1>
      <div className="mt-6 whitespace-pre-wrap text-sm text-[color:var(--color-muted-foreground)]">
        {page.contentMarkdown}
      </div>
    </div>
  );
}

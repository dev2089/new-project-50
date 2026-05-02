import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

function requireEnv(name: string, fallback?: string) {
  const v = process.env[name] ?? fallback;
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

async function main() {
  const adminEmail = requireEnv("ADMIN_EMAIL", "admin@newimage.local").toLowerCase();
  const adminPassword = requireEnv("ADMIN_PASSWORD", "change-me-now");

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.create({ data: { email: adminEmail, passwordHash } });
  }

  const settings = await prisma.siteSettings.findFirst();
  if (!settings) {
    await prisma.siteSettings.create({ data: {} });
  }

  const existingReviews = await prisma.review.count();
  if (existingReviews === 0) {
    await prisma.review.createMany({
      data: [
        {
          authorName: "Shatakshi Sharma",
          rating: 5,
          reviewTime: "2 months ago",
          text: "I had such a lovely experience at this salon! From the moment I walked in, the staff was warm, welcoming, and very professional. The ambience is clean, comfortable, and relaxing.",
          featured: true,
          sortOrder: 1,
        },
        {
          authorName: "Swati Bohare",
          rating: 5,
          reviewTime: "2 months ago",
          text: "I had a wonderful experience at the salon. The staff is very professional and friendly. Khushboo, the owner, is so sweet and welcoming.",
          featured: true,
          sortOrder: 2,
        },
        {
          authorName: "Preet Pandit",
          rating: 5,
          reviewTime: "5 months ago",
          text: "I recently visited The New Image salon and I am delighted with the results. The team members are incredibly talented and know exactly how to bring out the best in my hair.",
          featured: true,
          sortOrder: 3,
        },
        {
          authorName: "Pyari Kim",
          rating: 5,
          reviewTime: "3 months ago",
          text: "I had a great experience at this salon. The place is nice, and the faculty are very kind, professional, and cooperative. Highly recommended.",
          featured: false,
          sortOrder: 4,
        },
      ],
    });
  }

  const existingPages = await prisma.page.count();
  if (existingPages === 0) {
    await prisma.page.createMany({
      data: [
        {
          slug: "privacy",
          title: "Privacy Policy",
          metaTitle: "Privacy Policy",
          metaDesc: "Privacy policy for The New Image Salon Studio Academy.",
          contentMarkdown: "This is a placeholder privacy policy. Update from the admin panel.",
          published: true,
          showInNav: false,
        },
        {
          slug: "terms",
          title: "Terms & Conditions",
          metaTitle: "Terms & Conditions",
          metaDesc: "Terms for The New Image Salon Studio Academy.",
          contentMarkdown: "This is a placeholder terms page. Update from the admin panel.",
          published: true,
          showInNav: false,
        },
      ],
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


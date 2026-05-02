import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { ensureSchema, sql as pg } from "@/lib/pg";

export type MediaType = "IMAGE" | "VIDEO";

export type Settings = {
  siteName: string;
  tagline: string;
  aboutMarkdown: string;
  addressLine: string;
  phoneNumber: string;
  whatsappNumber: string; // digits only for wa.me
  heroHeadline: string;
  heroSubheadline: string;
  defaultMetaTitle: string;
  defaultMetaDesc: string;
  logoPathLight: string;
  logoPathDark: string;
  lgbtFriendly: boolean;
  onSiteServices: boolean;
  acceptsCreditCards: boolean;
  acceptsDebitCards: boolean;
  acceptsGooglePay: boolean;
  acceptsNfcPayments: boolean;
};

export type AdminUser = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

export type ServiceCategory = { id: string; name: string; sortOrder: number };
export type Service = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  priceFromInr?: number;
  durationMins?: number;
  featured: boolean;
  active: boolean;
  sortOrder: number;
};

export type CourseCategory = { id: string; name: string; sortOrder: number };
export type Course = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  durationText: string;
  feesText: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
};

export type ProductCategory = { id: string; name: string; sortOrder: number };
export type Product = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  priceInr?: number;
  imagePath: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
};

export type Media = {
  id: string;
  type: MediaType;
  path: string;
  title: string;
  alt: string;
  tags: string;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
};

export type Review = {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  source: string;
  reviewTime: string;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
};

export type Booking = {
  id: string;
  createdAt: string;
  status: "CONFIRMED";
  name: string;
  phone: string;
  notes: string;
  serviceName: string;
  preferredDateText: string;
  whatsappNumberUsed: string;
  whatsappMessage: string;
  userAgent: string;
};

export type Page = {
  id: string;
  slug: string;
  title: string;
  contentMarkdown: string;
  metaTitle: string;
  metaDesc: string;
  showInNav: boolean;
  navOrder: number;
  published: boolean;
  updatedAt: string;
  createdAt: string;
};

export type DB = {
  version: number;
  settings: Settings;
  users: AdminUser[];
  serviceCategories: ServiceCategory[];
  services: Service[];
  courseCategories: CourseCategory[];
  courses: Course[];
  productCategories: ProductCategory[];
  products: Product[];
  media: Media[];
  reviews: Review[];
  bookings: Booking[];
  pages: Page[];
};

const DB_VERSION = 1;

function nowIso() {
  return new Date().toISOString();
}

function uuid() {
  return crypto.randomUUID();
}

const APP_STATE_ID = "main";

function defaultSettings(): Settings {
  return {
    siteName: "The New Image Salon Studio Academy",
    tagline: "Salon. Studio. Academy.",
    aboutMarkdown: "",
    addressLine:
      "LG-2,3, Gold Avenue apartment, 2A, Manik Bagh Rd, Nai Duniya, Palsikar Colony, Indore, Madhya Pradesh 452007",
    phoneNumber: "075664 46000",
    whatsappNumber: "917566446000",
    heroHeadline: "Luxury beauty, tailored to you",
    heroSubheadline:
      "Premium salon services and academy training in Indore. Book instantly on WhatsApp.",
    defaultMetaTitle: "The New Image Salon Studio Academy | Indore",
    defaultMetaDesc:
      "Luxury salon services and academy training in Indore. Book on WhatsApp.",
    logoPathLight: "",
    logoPathDark: "",
    lgbtFriendly: true,
    onSiteServices: true,
    acceptsCreditCards: true,
    acceptsDebitCards: true,
    acceptsGooglePay: true,
    acceptsNfcPayments: true,
  };
}

function seedReviews(): Review[] {
  const base = [
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
      text: "I had a wonderful experience at the salon. The staff is very professional and friendly. Khushboo, the owner, is so sweet and welcoming, which makes the whole experience even better.",
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
  ];
  return base.map((r) => ({
    id: uuid(),
    source: "Google",
    createdAt: nowIso(),
    ...r,
  }));
}

function seedPages(): Page[] {
  const pages: Array<Pick<Page, "slug" | "title" | "metaTitle" | "metaDesc" | "contentMarkdown">> =
    [
      {
        slug: "privacy",
        title: "Privacy Policy",
        metaTitle: "Privacy Policy",
        metaDesc: "Privacy policy for The New Image Salon Studio Academy.",
        contentMarkdown: "This is a placeholder privacy policy. Update from the admin panel.",
      },
      {
        slug: "terms",
        title: "Terms & Conditions",
        metaTitle: "Terms & Conditions",
        metaDesc: "Terms for The New Image Salon Studio Academy.",
        contentMarkdown: "This is a placeholder terms page. Update from the admin panel.",
      },
    ];
  return pages.map((p) => ({
    id: uuid(),
    showInNav: false,
    navOrder: 0,
    published: true,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    ...p,
  }));
}

async function ensureSeed(db: DB): Promise<DB> {
  const adminEmail = (process.env.ADMIN_EMAIL ?? "admin@newimage.local").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "change-me-now";

  if (!db.users.some((u) => u.email === adminEmail)) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    db.users.push({
      id: uuid(),
      email: adminEmail,
      passwordHash,
      createdAt: nowIso(),
    });
  }

  if (db.reviews.length === 0) db.reviews = seedReviews();
  if (db.pages.length === 0) db.pages = seedPages();
  return db;
}

export async function getDB(): Promise<DB> {
  await ensureSchema();
  const db = pg();
  const rows = await db<{ data: DB }[]>/* sql */`
    SELECT data FROM app_state WHERE id = ${APP_STATE_ID}
  `;

  const existing = rows[0]?.data ?? null;
  const base: DB =
    existing ??
    ({
      version: DB_VERSION,
      settings: defaultSettings(),
      users: [],
      serviceCategories: [],
      services: [],
      courseCategories: [],
      courses: [],
      productCategories: [],
      products: [],
      media: [],
      reviews: [],
      bookings: [],
      pages: [],
    } satisfies DB);

  if (!base.settings) base.settings = defaultSettings();
  base.version = DB_VERSION;

  const seeded = await ensureSeed(base);
  await saveDB(seeded);
  return seeded;
}

export async function saveDB(db: DB) {
  db.version = DB_VERSION;
  await ensureSchema();
  const pgdb = pg();
  await pgdb/* sql */`
    INSERT INTO app_state (id, data, updated_at)
    VALUES (${APP_STATE_ID}, ${db as unknown as object}, now())
    ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()
  `;
}

export async function updateDB(mutator: (db: DB) => void | Promise<void>) {
  await ensureSchema();
  const pgdb = pg();
  await pgdb.begin(async (tx) => {
    const locked = await tx<{ data: DB }[]>/* sql */`
      SELECT data FROM app_state WHERE id = ${APP_STATE_ID} FOR UPDATE
    `;
    let state = locked[0]?.data ?? null;
    if (!state) state = await getDB();
    await mutator(state);
    state.version = DB_VERSION;
    await tx/* sql */`
      INSERT INTO app_state (id, data, updated_at)
      VALUES (${APP_STATE_ID}, ${state as unknown as object}, now())
      ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()
    `;
  });
}

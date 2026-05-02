"use server";

import { requireAdminUser } from "@/lib/auth";
import { updateDB } from "@/lib/store";
import { savePublicUpload } from "@/lib/uploads";

export async function updateSettings(formData: FormData) {
  await requireAdminUser();
  const siteName = String(formData.get("siteName") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const heroHeadline = String(formData.get("heroHeadline") ?? "").trim();
  const heroSubheadline = String(formData.get("heroSubheadline") ?? "").trim();
  const addressLine = String(formData.get("addressLine") ?? "").trim();
  const phoneNumber = String(formData.get("phoneNumber") ?? "").trim();
  const whatsappNumber = String(formData.get("whatsappNumber") ?? "").replace(/[^\d]/g, "");
  const defaultMetaTitle = String(formData.get("defaultMetaTitle") ?? "").trim();
  const defaultMetaDesc = String(formData.get("defaultMetaDesc") ?? "").trim();
  const aboutMarkdown = String(formData.get("aboutMarkdown") ?? "").trim();

  const logoLight = formData.get("logoLight");
  const logoDark = formData.get("logoDark");
  const logoPathLight =
    logoLight instanceof File && logoLight.size > 0 ? await savePublicUpload(logoLight, "logos") : "";
  const logoPathDark =
    logoDark instanceof File && logoDark.size > 0 ? await savePublicUpload(logoDark, "logos") : "";

  const lgbtFriendly = formData.get("lgbtFriendly") === "on";
  const onSiteServices = formData.get("onSiteServices") === "on";
  const acceptsCreditCards = formData.get("acceptsCreditCards") === "on";
  const acceptsDebitCards = formData.get("acceptsDebitCards") === "on";
  const acceptsGooglePay = formData.get("acceptsGooglePay") === "on";
  const acceptsNfcPayments = formData.get("acceptsNfcPayments") === "on";

  await updateDB((db) => {
    db.settings.siteName = siteName || db.settings.siteName;
    db.settings.tagline = tagline;
    db.settings.aboutMarkdown = aboutMarkdown;
    db.settings.heroHeadline = heroHeadline;
    db.settings.heroSubheadline = heroSubheadline;
    db.settings.addressLine = addressLine;
    db.settings.phoneNumber = phoneNumber;
    if (whatsappNumber) db.settings.whatsappNumber = whatsappNumber;
    db.settings.defaultMetaTitle = defaultMetaTitle;
    db.settings.defaultMetaDesc = defaultMetaDesc;
    if (logoPathLight) db.settings.logoPathLight = logoPathLight;
    if (logoPathDark) db.settings.logoPathDark = logoPathDark;
    db.settings.lgbtFriendly = lgbtFriendly;
    db.settings.onSiteServices = onSiteServices;
    db.settings.acceptsCreditCards = acceptsCreditCards;
    db.settings.acceptsDebitCards = acceptsDebitCards;
    db.settings.acceptsGooglePay = acceptsGooglePay;
    db.settings.acceptsNfcPayments = acceptsNfcPayments;
  });
}

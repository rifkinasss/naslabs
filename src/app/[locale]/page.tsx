import type { Metadata } from "next";

import { routing } from "@/i18n/routing";
import HomePage from "@/components/home/home-page";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata(
    locale as "en" | "id",
    "",
    locale === "id" ? "NasLabs — Personal Digital Lab" : "NasLabs — Personal Digital Lab",
    locale === "id"
      ? "Ruang personal untuk membangun, mempelajari, dan menjelajahi teknologi."
      : "A personal space for building, learning, and exploring technology.",
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocalizedHomePage({
  params,
}: PageProps<"/[locale]">) {
  const { locale } = await params;
  return <HomePage locale={locale as "en" | "id"} />;
}

import type { Metadata } from "next";
import { AboutPage } from "@/components/about/about-page";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> { const { locale } = await params; return localizedMetadata(locale as "en" | "id", "/about", locale === "id" ? "Tentang" : "About", locale === "id" ? "Tentang NasLabs dan pendirinya, Rifki Anashirul." : "About NasLabs and its founder, Rifki Anashirul."); }

export default function LocalizedAboutPage() {
  return <AboutPage />;
}

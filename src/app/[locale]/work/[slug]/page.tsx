import { permanentRedirect } from "next/navigation";

export default async function LegacyWorkDetailPage({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { locale, slug } = await params;
  permanentRedirect(locale === "en" ? `/works/${slug}` : `/${locale}/works/${slug}`);
}

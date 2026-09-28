import { permanentRedirect } from "next/navigation";

export default async function LegacyWorkPage({ params }: PageProps<"/[locale]/work">) {
  const { locale } = await params;
  permanentRedirect(locale === "en" ? "/works" : `/${locale}/works`);
}

import EnglishHomePage from "@/components/pages/english-home";
import IndonesianHomePage from "@/components/pages/indonesian-home";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocalizedHomePage({
  params,
}: PageProps<"/[locale]">) {
  const { locale } = await params;
  return locale === "id" ? <IndonesianHomePage /> : <EnglishHomePage />;
}

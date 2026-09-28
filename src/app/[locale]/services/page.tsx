import { permanentRedirect } from "next/navigation";

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  permanentRedirect(locale === "id" ? "/id" : "/");
}

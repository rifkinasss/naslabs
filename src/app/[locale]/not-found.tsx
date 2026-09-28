import { getLocale, getTranslations } from "next-intl/server";

import { NotFoundState } from "@/components/system/not-found-state";

export default async function LocalizedNotFound() {
  const t = await getTranslations("System");
  const locale = await getLocale();

  return <NotFoundState label={t("notFound.label")} title={t("notFound.title")} description={t("notFound.description")} statusLabel={t("notFound.statusLabel")} statusCode="RESOURCE_NOT_FOUND" homeLabel={t("notFound.home")} worksLabel={t("notFound.works")} homeHref={`/${locale}`} worksHref={`/${locale}/works`} />;
}

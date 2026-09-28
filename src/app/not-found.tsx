import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";
import { NotFoundState } from "@/components/system/not-found-state";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  robots: { index: false, follow: true },
  openGraph: { images: [`${siteConfig.url}/opengraph-image`] },
  twitter: { card: "summary_large_image", images: [`${siteConfig.url}/opengraph-image`] },
};

export default function NotFound() {
  return <NotFoundState label="404 / NOT FOUND" title="This path leads nowhere." description="The page may have moved, been removed, or the URL may be incorrect." statusLabel="STATUS" statusCode="RESOURCE_NOT_FOUND" homeLabel="Back to home" worksLabel="View works" homeHref="/" worksHref="/works" />;
}

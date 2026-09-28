import { getAllWorks, getFeaturedWorks } from "@/lib/content/works";
import type { Locale } from "@/lib/content/contracts";

import { AboutPreview } from "./about-preview";
import { Areas } from "./areas";
import { ContactCta } from "./contact-cta";
import { Hero } from "./hero";
import { SelectedWorks } from "./selected-works";

type HomePageProps = { locale: Locale };

export default function HomePage({ locale }: HomePageProps) {
  const allWorks = getAllWorks(locale);
  const featuredWorks = getFeaturedWorks(locale);
  const works = [...featuredWorks, ...allWorks.filter((work) => !featuredWorks.some((featured) => featured.metadata.slug === work.metadata.slug))].slice(0, 3);
  let sectionNumber = 0;
  const worksSectionNumber = ++sectionNumber;
  const areasSectionNumber = ++sectionNumber;
  const aboutSectionNumber = ++sectionNumber;
  const contactSectionNumber = ++sectionNumber;

  return (
    <main className="v2-scope v2-home">
      <Hero />
      <SelectedWorks works={works} sectionNumber={worksSectionNumber} />
      <Areas sectionNumber={areasSectionNumber} />
      <AboutPreview sectionNumber={aboutSectionNumber} />
      <ContactCta sectionNumber={contactSectionNumber} />
    </main>
  );
}

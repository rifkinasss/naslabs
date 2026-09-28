import { useLocale, useTranslations } from "next-intl";

import { getAchievements } from "@/content/achievements";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";

export function SelectedAchievements() {
  const locale = useLocale() as "en" | "id";
  const t = useTranslations("AboutPage");
  const achievements = getAchievements(locale);

  return (
    <section className="v2-about-page__section v2-about-page__achievements" aria-labelledby="selected-achievements-title">
      <Container>
        <Reveal className="v2-about-page__section-heading">
          <span className="v2-label">04</span>
          <div>
            <p className="v2-label">{t("achievements.eyebrow")}</p>
            <h2 className="v2-h2" id="selected-achievements-title">{t("achievements.title")}</h2>
            <p>{t("achievements.description")}</p>
          </div>
        </Reveal>

        <Reveal as="ol" className="v2-achievements-list" elementProps={{ "aria-label": t("achievements.listLabel") }}>
          {achievements.map((achievement) => (
            <li className="v2-achievement" key={`${achievement.year}-${achievement.event}`}>
              <time className="v2-achievement__year" dateTime={String(achievement.year)}>{achievement.year}</time>
              <span className="v2-achievement__marker" aria-hidden="true" />
              <div className="v2-achievement__content">
                <p className="v2-achievement__placement">{achievement.placement}</p>
                <h3 className="v2-h3">{achievement.event}</h3>
                <div className="v2-achievement__details">
                  {achievement.category && <span>{achievement.category}</span>}
                  {achievement.project && <span>{achievement.project}</span>}
                  {achievement.institution && <span>{achievement.institution}</span>}
                  {achievement.team && <span>{t("achievements.team")}: {achievement.team}</span>}
                  {achievement.role && <span>{t("achievements.role")}: {achievement.role}</span>}
                  {achievement.format && <span>{achievement.format}</span>}
                  {achievement.context && <span>{achievement.context}</span>}
                </div>
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

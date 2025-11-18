"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { InfoCard } from "./InfoCard";
import { IntroSection } from "./IntroSection";
import { LandingFooter } from "./LandingFooter";
import { PageHeader } from "./PageHeader";
import { PrimaryButton } from "./PrimaryButton";

export function LandingContent() {
  const { t, tList } = useI18n();

  const projectOverview = tList("landing.cards.projectOverview.items");
  const techStack = tList("landing.cards.techStack.items");
  const architecture = tList("landing.cards.architecture.items");
  const intro = tList("landing.intro");

  return (
    <div className="mx-auto max-w-2xl space-y-12 px-4 py-16">
      <PageHeader
        tagline={t("common.caseStudyTag")}
        title={t("common.appName")}
      />
      <IntroSection paragraphs={intro} />
      <div className="flex justify-center">
        <PrimaryButton href="/todos" label={t("landing.cta")} />
      </div>
      <div className="space-y-6">
        <InfoCard
          title={t("landing.cards.projectOverview.title")}
          items={projectOverview}
        />
        <InfoCard
          title={t("landing.cards.techStack.title")}
          items={techStack}
        />
        <InfoCard
          title={t("landing.cards.architecture.title")}
          items={architecture}
        />
      </div>
      <LandingFooter
        text={t("landing.footer.text")}
        repoLabel={t("landing.footer.repo")}
      />
    </div>
  );
}

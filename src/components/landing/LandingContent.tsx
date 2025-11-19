"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { InfoCard } from "./InfoCard";
import { IntroSection } from "./IntroSection";
import { LandingFooter } from "./LandingFooter";
import { PageHeader } from "./PageHeader";
import { PrimaryButton } from "./PrimaryButton";

export function LandingContent() {
  const { t, tList } = useI18n();

  const projectOverview = tList(
    [
      "CRUD todos with optimistic updates",
      "Search, filter, and paginate via URL params",
      "Detail & edit page with guarded deletes",
      "Validation powered by Zod and ts-pattern",
    ],
    {
      key: "landing.cards.projectOverview.items",
    },
  );
  const techStack = tList(
    [
      "Next.js App Router + React Query",
      "Zustand for UI state",
      "Zod + ts-pattern + react-hook-form",
      "Tailwind CSS with dark mode",
    ],
    {
      key: "landing.cards.techStack.items",
    },
  );
  const architecture = tList(
    [
      "Repository abstraction over async localStorage",
      "Result<T, E> modeling with exhaustive matches",
      "React Query cache keys bound to filter state",
      "Feature-first directory structure",
    ],
    {
      key: "landing.cards.architecture.items",
    },
  );
  const intro = tList(
    [
      "Built as a front-end case study, this project showcases how to pair the Next.js App Router with a resilient client-side data layer powered by React Query, Zod validation, and ts-pattern result handling.",
      "The TODO experience mirrors a production-grade workflow with optimistic updates, persistent cache, and shareable filters through URL parameters.",
    ],
    {
      key: "landing.intro",
    },
  );
  return (
    <div className="mx-auto max-w-2xl space-y-12 px-4 py-16">
      <PageHeader
        tagline={t("Case Study", {
          key: "common.caseStudyTag",
        })}
        title={t("Next.js TODO App", {
          key: "common.appName",
        })}
      />
      <IntroSection paragraphs={intro} />
      <div className="flex justify-center">
        <PrimaryButton
          href="/todos"
          label={t("Open TODO App", {
            key: "landing.cta",
          })}
        />
      </div>
      <div className="space-y-6">
        <InfoCard
          title={t("About This Project", {
            key: "landing.cards.projectOverview.title",
          })}
          items={projectOverview}
        />
        <InfoCard
          title={t("Tech Stack", {
            key: "landing.cards.techStack.title",
          })}
          items={techStack}
        />
        <InfoCard
          title={t("Architecture Notes", {
            key: "landing.cards.architecture.title",
          })}
          items={architecture}
        />
      </div>
      <LandingFooter
        text={t("Built for the FE Case Study \u2014 ", {
          key: "landing.footer.text",
        })}
        repoLabel={t("GitHub Repository", {
          key: "landing.footer.repo",
        })}
      />
    </div>
  );
}

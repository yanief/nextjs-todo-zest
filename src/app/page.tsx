import { IntroSection } from "@/components/landing/IntroSection";
import { InfoCard } from "@/components/landing/InfoCard";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { PageHeader } from "@/components/landing/PageHeader";
import { PrimaryButton } from "@/components/landing/PrimaryButton";

const projectOverview = [
  "CRUD Todos with optimistic updates",
  "Search + filter + pagination via URL params",
  "Detail & edit view with guarded deletes",
  "Validation powered by Zod & ts-pattern",
];

const techStack = [
  "Next.js App Router + React 19",
  "@tanstack/react-query with sessionStorage persistence",
  "Zustand UI store for modals + toasts",
  "Zod + ts-pattern + react-hook-form",
  "Tailwind CSS utility-first styling",
];

const architectureNotes = [
  "Repository abstraction over async localStorage",
  "Result<T, E> modeling with exhaustive matches",
  "React Query cache keys that embed filter state",
  "Feature-first directory structure for scalability",
];

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl space-y-12 px-4 py-16">
      <PageHeader />
      <IntroSection />
      <div className="flex justify-center">
        <PrimaryButton href="/todos" label="Open TODO App" />
      </div>
      <div className="space-y-6">
        <InfoCard title="About This Project" items={projectOverview} />
        <InfoCard title="Tech Stack" items={techStack} />
        <InfoCard title="Architecture Notes" items={architectureNotes} />
      </div>
      <LandingFooter />
    </div>
  );
}

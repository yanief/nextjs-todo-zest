"use client";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { Skeleton } from "@/components/ui/Skeleton";
import { useI18n } from "@/i18n/I18nProvider";

export default function TodosLoading() {
  const { t } = useI18n();
  return (
    <PageContainer>
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          {t("Todos", {
            key: "loading.title",
          })}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-slate-300">
          {t("Loading your tasks\u2026", {
            key: "loading.message",
          })}
        </p>
      </header>
      <Section>
        <div className="mb-3 flex flex-col gap-3 sm:flex-row">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={idx} className="h-10 w-full" />
          ))}
        </div>
      </Section>
    </PageContainer>
  );
}

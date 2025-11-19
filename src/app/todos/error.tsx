"use client";
import { useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/i18n/I18nProvider";
export default function TodosError({
  error,
  reset,
}: {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}) {
  const { t } = useI18n();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageContainer>
      <Section
        title={t("Something went wrong", {
          key: "errorBoundary.title",
        })}
      >
        <div className="flex flex-col gap-3">
          <p className="text-sm text-red-700 dark:text-red-300">
            {t("We couldn't load your todos. Please try again.", {
              key: "errorBoundary.message",
            })}
          </p>
          <div>
            <Button type="button" onClick={reset}>
              {t("Try again", {
                key: "errorBoundary.retry",
              })}
            </Button>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}

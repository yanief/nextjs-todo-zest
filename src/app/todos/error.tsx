"use client";

import { useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export default function TodosError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageContainer>
      <Section title="Something went wrong">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-red-700">
            We couldn&apos;t load your todos. Please try again.
          </p>
          <div>
            <Button type="button" onClick={reset}>
              Try again
            </Button>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}

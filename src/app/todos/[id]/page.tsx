"use client";

import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { useI18n } from "@/i18n/I18nProvider";
import { useParams } from "next/navigation";
import { TodoDetail } from "./components/TodoDetail";

export default function TodoDetailPage() {
  const params = useParams<{ id: string }>();
  const { t } = useI18n();
  const idParam = params?.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  if (!id) return null;

  return (
    <PageContainer>
      <Section title={t("todos.detailPage.sectionTitle")}>
        <TodoDetail id={id} />
      </Section>
    </PageContainer>
  );
}

"use client";

import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { useI18n } from "@/i18n/I18nProvider";
import { TodoList } from "./components/TodoList";
import { TodoFilters } from "./components/TodoFilters";
import { AddTodoForm } from "./components/AddTodoForm";
import { Footer } from "@/components/navigation/Footer";

export const dynamic = "force-dynamic";

export default function TodosPage() {
  const { t } = useI18n();
  return (
    <PageContainer>
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          {t("Todos", {
            key: "todos.page.title",
          })}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-slate-300">
          {t(
            "Create, filter, and manage your tasks. Pagination is shareable via the URL.",
            {
              key: "todos.page.description",
            },
          )}
        </p>
      </header>

      <Section>
        <TodoFilters />
      </Section>

      <Section
        title={t("Your Todos", {
          key: "todos.page.sectionTitle",
        })}
      >
        <div className="flex flex-col gap-4">
          <AddTodoForm />
          <TodoList />
        </div>
      </Section>
      <Footer
        text={t("Built for the FE Case Study \u2014 ", {
          key: "landing.footer.text",
        })}
        repoLabel={t("GitHub Repository", {
          key: "landing.footer.repo",
        })}
      />
    </PageContainer>
  );
}

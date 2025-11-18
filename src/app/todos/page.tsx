import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { TodoList } from "./components/TodoList";
import { TodoFilters } from "./components/TodoFilters";

export const dynamic = "force-dynamic";

export default function TodosPage() {
  return (
    <PageContainer>
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-zinc-900">Todos</h1>
        <p className="text-sm text-zinc-500">
          Create, filter, and manage your tasks. Pagination is shareable via the URL.
        </p>
      </header>

      <Section>
        <TodoFilters pageSize={10} />
      </Section>

      <Section title="Your Todos">
        <TodoList />
      </Section>
    </PageContainer>
  );
}



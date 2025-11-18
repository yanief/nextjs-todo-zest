import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { TodoList } from "./components/TodoList";
import { TodoFilters } from "./components/TodoFilters";
import { AddTodoForm } from "./components/AddTodoForm";

export const dynamic = "force-dynamic";

export default function TodosPage() {
  return (
    <PageContainer>
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-zinc-900">Todos</h1>
        <p className="text-sm text-zinc-500">
          Create, filter, and manage your tasks. Pagination is shareable via the
          URL.
        </p>
      </header>

      <Section>
        <TodoFilters />
      </Section>

      <Section title="Your Todos">
        <div className="flex flex-col gap-4">
          <AddTodoForm />
          <TodoList />
        </div>
      </Section>
    </PageContainer>
  );
}

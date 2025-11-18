import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { TodoDetail } from "./components/TodoDetail";
import { use } from "react";

interface TodoDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function TodoDetailPage({ params }: TodoDetailPageProps) {
  const { id } = use(params);
  return (
    <PageContainer>
      <Section title="Todo Details">
        <TodoDetail id={id} />
      </Section>
    </PageContainer>
  );
}

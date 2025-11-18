import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { TodoDetail } from "./components/TodoDetail";

interface TodoDetailPageProps {
  params: { id: string };
}

export default function TodoDetailPage({ params }: TodoDetailPageProps) {
  return (
    <PageContainer>
      <Section title="Todo Details">
        <TodoDetail id={params.id} />
      </Section>
    </PageContainer>
  );
}



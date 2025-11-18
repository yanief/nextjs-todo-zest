"use client";

import { match } from "ts-pattern";
import { Spinner } from "@/components/ui/Spinner";
import { useI18n } from "@/i18n/I18nProvider";
import { useTodoDetail } from "../../hooks/useTodoDetail";
import { TodoDetailDisplay } from "./TodoDetailDisplay";

interface TodoDetailProps {
  id: string;
}

export function TodoDetail({ id }: TodoDetailProps) {
  const { data, isLoading } = useTodoDetail(id);
  const { t } = useI18n();

  const content = match(data)
    .with({ type: "success" }, ({ data: todo }) => (
      <TodoDetailDisplay todo={todo} />
    ))
    .with({ type: "error" }, ({ error }) => (
      <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-400/50 dark:bg-red-950/40 dark:text-red-200">
        {t("todos.errors.detail")}: {error.message}
      </div>
    ))
    .otherwise(() => null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Spinner />
      </div>
    );
  }

  return content;
}

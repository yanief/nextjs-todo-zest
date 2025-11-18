"use client";

import { match } from "ts-pattern";
import { Spinner } from "@/components/ui/Spinner";
import { useTodoDetail } from "../../hooks/useTodoDetail";
import { TodoDetailDisplay } from "./TodoDetailDisplay";

interface TodoDetailProps {
  id: string;
}

export interface FormValues {
  title: string;
}

export function TodoDetail({ id }: TodoDetailProps) {
  const { data, isLoading } = useTodoDetail(id);

  const content = match(data)
    .with({ type: "success" }, ({ data: todo }) => (
      <TodoDetailDisplay todo={todo} />
    ))
    .with({ type: "error" }, ({ error }) => (
      <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
        Failed to load todo: {error.message}
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

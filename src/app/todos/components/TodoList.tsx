"use client";

import { useSearchParams } from "next/navigation";
import { match } from "ts-pattern";
import { Spinner } from "@/components/ui/Spinner";
import { Skeleton } from "@/components/ui/Skeleton";
import { useListTodos } from "../hooks/useListTodos";
import { TodoListDisplay } from "./TodoListDisplay";

const PAGE_SIZE = 10;

export interface FormValues {
  title: string;
}

export function TodoList() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? "1");
  const status =
    (searchParams.get("status") as "all" | "active" | "completed") ?? "all";
  const q = searchParams.get("q") ?? "";

  const { data, isLoading, isFetching } = useListTodos({
    page,
    pageSize: PAGE_SIZE,
    status,
    q,
  });

  return isLoading ? (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Skeleton key={idx} className="h-10 w-full" />
      ))}
    </div>
  ) : (
    <>
      {isFetching ? (
        <div className="mb-2 flex items-center gap-2 text-xs text-zinc-400">
          <Spinner />
          <span>Updating…</span>
        </div>
      ) : null}
      {match(data)
        .with({ type: "success" }, ({ data }) => (
          <TodoListDisplay paginatedTodo={data} />
        ))
        .with({ type: "error" }, ({ error }) => (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            Failed to load todos: {error.message}
          </div>
        ))
        .otherwise(() => null)}
    </>
  );
}

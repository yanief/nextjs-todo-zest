"use client";
import { useI18n } from "@/i18n/I18nProvider";
import { useSearchParams } from "next/navigation";
import { match } from "ts-pattern";
import { Spinner } from "@/components/ui/Spinner";
import { Skeleton } from "@/components/ui/Skeleton";
import { useListTodos } from "../hooks/useListTodos";
import { TodoListDisplay } from "./TodoListDisplay";

const PAGE_SIZE = 10;

export function TodoList() {
  const searchParams = useSearchParams();
  const { t } = useI18n();

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
        <div className="mb-2 flex items-center gap-2 text-xs text-zinc-400 dark:text-slate-400">
          <Spinner />
          <span>
            {t("Updating\u2026", {
              key: "common.aria.updating",
            })}
          </span>
        </div>
      ) : null}
      {match(data)
        .with({ type: "success" }, ({ data }) => (
          <TodoListDisplay paginatedTodo={data} />
        ))
        .with({ type: "error" }, ({ error }) => (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-400/50 dark:bg-red-950/40 dark:text-red-200">
            {t("Failed to load todos", {
              key: "todos.errors.list",
            })}
            : {error.message}
          </div>
        ))
        .otherwise(() => null)}
    </>
  );
}

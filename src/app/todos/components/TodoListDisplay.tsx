"use client";

import { Button } from "@/components/ui/Button";
import { useI18n } from "@/i18n/I18nProvider";
import { PaginatedTodo } from "@/types/todo";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { TodoItem } from "./TodoItem";

export const TodoListDisplay = ({
  paginatedTodo,
}: {
  paginatedTodo: PaginatedTodo;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, direction } = useI18n();

  const changePage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.push(`/todos?${params.toString()}`);
  };

  if (!paginatedTodo.items.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
        <p className="text-sm text-zinc-500 dark:text-slate-300">
          {t("No todos yet.", {
            key: "todos.list.emptyTitle",
          })}
        </p>
        <p className="text-xs text-zinc-400 dark:text-slate-400">
          {t("Use the form above to create your first task.", {
            key: "todos.list.emptyDescription",
          })}
        </p>
      </div>
    );
  }

  const totalPages = Math.max(
    1,
    Math.ceil(paginatedTodo.total / paginatedTodo.pageSize),
  );

  return (
    <>
      <ul className="flex flex-col gap-2">
        {paginatedTodo.items.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 dark:text-slate-300">
        <span>
          {t("Page {current} of {total}", {
            key: "todos.list.pagination",
            values: {
              current: paginatedTodo.page,
              total: totalPages,
            },
          })}
        </span>
        <div
          className={clsx(
            "flex gap-2",
            direction === "rtl" && "flex-row-reverse",
          )}
        >
          <Button
            type="button"
            variant="secondary"
            disabled={paginatedTodo.page <= 1}
            onClick={() => changePage(paginatedTodo.page - 1)}
          >
            {t("Previous", {
              key: "common.buttons.previous",
            })}
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={paginatedTodo.page >= totalPages}
            onClick={() => changePage(paginatedTodo.page + 1)}
          >
            {t("Next", {
              key: "common.buttons.next",
            })}
          </Button>
        </div>
      </div>
    </>
  );
};

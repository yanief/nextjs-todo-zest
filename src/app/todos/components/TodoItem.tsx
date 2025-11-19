"use client";

import Link from "next/link";
import type { Todo } from "@/types/todo";
import { Button } from "@/components/ui/Button";
import { useUIStore } from "@/stores/ui.store";
import { useUpdateTodo } from "../hooks/todoMutations/useUpdateTodo";
import { useDeleteTodo } from "../hooks/todoMutations/useDeleteTodo";
import { Trash2Icon } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import clsx from "clsx";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();
  const openModal = useUIStore((s) => s.openModal);
  const { t, direction } = useI18n();

  const toggleCompleted = () => {
    updateMutation.mutate({
      id: todo.id,
      patch: { completed: !todo.completed },
    });
  };

  const confirmDelete = () => {
    openModal({
      title: t("Delete todo?", {
        key: "todos.detail.deleteTitle",
      }),
      description: t("This action cannot be undone.", {
        key: "todos.detail.deleteDescription",
      }),
      confirmLabel: t("Delete", {
        key: "common.buttons.delete",
      }),
      cancelLabel: t("Cancel", {
        key: "common.buttons.cancel",
      }),
      onConfirm: () => deleteMutation.mutate(todo.id),
    });
  };
  const isRtl = direction === "rtl";
  return (
    <li className="flex items-center justify-between gap-3 rounded-md border border-zinc-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
      <div
        className={clsx(
          "flex flex-1 items-center gap-2",
          isRtl && "flex-row-reverse",
        )}
      >
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-zinc-300 text-blue-600"
          checked={todo.completed}
          onChange={toggleCompleted}
          aria-label={
            todo.completed
              ? t("Mark as active", {
                  key: "common.aria.toggle.markActive",
                })
              : t("Mark as completed", {
                  key: "common.aria.toggle.markCompleted",
                })
          }
        />
        <Link
          href={`/todos/${todo.id}`}
          className="flex-1 text-sm text-zinc-900 hover:underline dark:text-slate-100"
        >
          <span className={todo.completed ? "line-through text-zinc-400" : ""}>
            {todo.title}
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          className="text-xs text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-400/10"
          onClick={confirmDelete}
        >
          <span
            className={clsx(
              "flex items-center gap-1",
              isRtl && "flex-row-reverse",
            )}
          >
            <Trash2Icon className="h-[1rem]" />
            {t("Delete", {
              key: "common.buttons.delete",
            })}
          </span>
        </Button>
      </div>
    </li>
  );
}

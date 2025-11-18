"use client";

import Link from "next/link";
import type { Todo } from "@/types/todo";
import { Button } from "@/components/ui/Button";
import { useUpdateTodoMutation, useDeleteTodoMutation } from "../hooks/useTodoMutations";
import { useUIStore } from "@/stores/ui.store";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const updateMutation = useUpdateTodoMutation();
  const deleteMutation = useDeleteTodoMutation();
  const openModal = useUIStore((s) => s.openModal);

  const toggleCompleted = () => {
    updateMutation.mutate({ id: todo.id, patch: { completed: !todo.completed } });
  };

  const confirmDelete = () => {
    openModal({
      title: "Delete todo?",
      description: "This action cannot be undone.",
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
      onConfirm: () => deleteMutation.mutate(todo.id),
    });
  };

  return (
    <li className="flex items-center justify-between gap-3 rounded-md border border-zinc-200 bg-white px-3 py-2">
      <div className="flex flex-1 items-center gap-2">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-zinc-300 text-blue-600"
          checked={todo.completed}
          onChange={toggleCompleted}
          aria-label={todo.completed ? "Mark as active" : "Mark as completed"}
        />
        <Link
          href={`/todos/${todo.id}`}
          className="flex-1 text-sm text-zinc-900 hover:underline"
        >
          <span className={todo.completed ? "line-through text-zinc-400" : ""}>{todo.title}</span>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          className="text-xs text-red-600 hover:bg-red-50"
          onClick={confirmDelete}
        >
          Delete
        </Button>
      </div>
    </li>
  );
}



"use client";

import { Button } from "@/components/ui/Button";
import { PaginatedTodo } from "@/types/todo";
import { useRouter, useSearchParams } from "next/navigation";
import { TodoItem } from "./TodoItem";

export const TodoListDisplay = ({ paginatedTodo }: { paginatedTodo: PaginatedTodo; }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.push(`/todos?${params.toString()}`);
  };

  if (!paginatedTodo.items.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
        <p className="text-sm text-zinc-500">No todos yet.</p>
        <p className="text-xs text-zinc-400">Use the form above to create your first task.</p>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(paginatedTodo.total / paginatedTodo.pageSize));

  return (
    <>
      <ul className="flex flex-col gap-2">
        {paginatedTodo.items.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
        <span>
          Page {paginatedTodo.page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            disabled={paginatedTodo.page <= 1}
            onClick={() => changePage(paginatedTodo.page - 1)}
          >
            Previous
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={paginatedTodo.page >= totalPages}
            onClick={() => changePage(paginatedTodo.page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

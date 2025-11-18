"use client";

import type { AppError, PaginatedTodo, Todo, Result } from "@/types/todo";

export function optimisticUpdateList(
    lists: Result<PaginatedTodo, AppError> | undefined,
    updater: (items: Todo[]) => Todo[]
  ): Result<PaginatedTodo, AppError> | undefined {
    if (!lists || lists.type === "error") return lists;
    const updatedItems = updater(lists.data.items);
    return {
      ...lists,
      data: {
        ...lists.data,
        items: updatedItems,
      },
    };
  }
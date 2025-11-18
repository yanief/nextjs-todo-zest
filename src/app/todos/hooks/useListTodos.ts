"use client";

import { useQuery } from "@tanstack/react-query";
import { todoKeys } from "@/lib/query/keys";
import { todoRepository } from "@/repositories/todo.repository";
import type { AppError, PaginatedTodo } from "@/types/todo";
import type { Result } from "@/types/todo";

export interface ListTodosParams {
  page: number;
  pageSize: number;
  status: "all" | "active" | "completed";
  q?: string;
}

export function useListTodos(params: ListTodosParams) {
  return useQuery<Result<PaginatedTodo, AppError>>({
    queryKey: todoKeys.list(params),
    queryFn: () => todoRepository.list(params),
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
  });
}



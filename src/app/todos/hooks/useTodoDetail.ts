"use client";

import { useQuery } from "@tanstack/react-query";
import { todoKeys } from "@/lib/query/keys";
import { todoRepository } from "@/repositories/todo.repository";
import type { AppError, Todo } from "@/types/todo";
import type { Result } from "@/types/todo";

export function useTodoDetail(id: string) {
  return useQuery<Result<Todo, AppError>>({
    queryKey: todoKeys.detail(id),
    queryFn: () => todoRepository.get(id),
    enabled: Boolean(id),
  });
}



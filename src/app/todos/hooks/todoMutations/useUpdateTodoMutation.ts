"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoKeys } from "@/lib/query/keys";
import { todoRepository } from "@/repositories/todo.repository";
import type { AppError, PaginatedTodo, Todo, Result } from "@/types/todo";
import { useUIStore } from "@/stores/ui.store";
import { optimisticUpdateList } from "./optimisticUpdateList";

export function useUpdateTodoMutation() {
    const queryClient = useQueryClient();
    const addToast = useUIStore((s) => s.addToast);
  
    return useMutation({
      mutationFn: ({ id, patch }: { id: string; patch: Partial<Todo> }) => todoRepository.update(id, patch),
      onMutate: async ({ id, patch }) => {
        await queryClient.cancelQueries({ queryKey: todoKeys.all });
  
        const previousLists = queryClient.getQueriesData<Result<PaginatedTodo, AppError>>({
          queryKey: todoKeys.all,
        });
  
        previousLists.forEach(([key, data]) => {
          queryClient.setQueryData<Result<PaginatedTodo, AppError> | undefined>(
            key,
            (current) =>
              optimisticUpdateList(current, (items) =>
                items.map((t) => (t.id === id ? { ...t, ...patch } : t))
              ) ?? data
          );
        });
  
        const previousDetail = queryClient.getQueryData<Result<Todo, AppError>>(todoKeys.detail(id));
        if (previousDetail && previousDetail.type === "success") {
          queryClient.setQueryData<Result<Todo, AppError>>(todoKeys.detail(id), {
            ...previousDetail,
            data: { ...previousDetail.data, ...patch },
          });
        }
  
        return { previousLists, previousDetail };
      },
      onError: (_error, variables, context) => {
        if (context?.previousLists) {
          context.previousLists.forEach(([key, data]) => {
            queryClient.setQueryData(key, data);
          });
        }
        if (context?.previousDetail && variables?.id) {
          queryClient.setQueryData(todoKeys.detail(variables.id), context.previousDetail);
        }
        addToast("Failed to update todo", "error");
      },
      onSuccess: () => {
        addToast("Todo updated", "success");
      },
      onSettled: (_data, _error, variables) => {
        queryClient.invalidateQueries({ queryKey: todoKeys.all });
        if (variables?.id) {
          queryClient.invalidateQueries({ queryKey: todoKeys.detail(variables.id) });
        }
      },
    });
  }
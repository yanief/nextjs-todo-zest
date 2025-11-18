"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoKeys } from "@/lib/query/keys";
import { todoRepository } from "@/repositories/todo.repository";
import type { AppError, PaginatedTodo, Todo, Result } from "@/types/todo";
import { useUIStore } from "@/stores/ui.store";
import { optimisticUpdateList } from "./optimisticUpdateList";

export function useDeleteTodoMutation() {
    const queryClient = useQueryClient();
    const addToast = useUIStore((s) => s.addToast);
  
    return useMutation({
      mutationFn: (id: string) => todoRepository.delete(id),
      onMutate: async (id) => {
        await queryClient.cancelQueries({ queryKey: todoKeys.all });
  
        const previousLists = queryClient.getQueriesData<Result<PaginatedTodo, AppError>>({
          queryKey: todoKeys.all,
        });
  
        previousLists.forEach(([key, data]) => {
          queryClient.setQueryData<Result<PaginatedTodo, AppError> | undefined>(
            key,
            (current) =>
              optimisticUpdateList(current, (items) => items.filter((t) => t.id !== id)) ?? data
          );
        });
  
        const previousDetail = queryClient.getQueryData<Result<Todo, AppError>>(todoKeys.detail(id));
  
        return { previousLists, previousDetail, id };
      },
      onError: (_error, _variables, context) => {
        if (context?.previousLists) {
          context.previousLists.forEach(([key, data]) => {
            queryClient.setQueryData(key, data);
          });
        }
        if (context?.previousDetail && context.id) {
          queryClient.setQueryData(todoKeys.detail(context.id), context.previousDetail);
        }
        addToast("Failed to delete todo", "error");
      },
      onSuccess: () => {
        addToast("Todo deleted", "success");
      },
      onSettled: (_data, _error, id) => {
        queryClient.invalidateQueries({ queryKey: todoKeys.all });
        if (id) {
          queryClient.invalidateQueries({ queryKey: todoKeys.detail(id) });
        }
      },
    });
  }
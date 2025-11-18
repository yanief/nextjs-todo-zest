"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoKeys } from "@/lib/query/keys";
import { todoRepository } from "@/repositories/todo.repository";
import type { AppError, PaginatedTodo, Todo, Result } from "@/types/todo";
import { useUIStore } from "@/stores/ui.store";

type StatusFilter = "all" | "active" | "completed";

function optimisticUpdateList(
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

export function useCreateTodoMutation(status: StatusFilter, q?: string) {
  const queryClient = useQueryClient();
  const addToast = useUIStore((s) => s.addToast);

  return useMutation({
    mutationFn: (input: { title: string }) => todoRepository.create(input),
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: todoKeys.all });

      const previousLists = queryClient.getQueriesData<Result<PaginatedTodo, AppError>>({
        queryKey: todoKeys.all,
      });

      const optimistic: Todo = {
        id: "temp-" + Date.now().toString(),
        title: input.title,
        completed: false,
        createdAt: Date.now(),
      };

      previousLists.forEach(([key, data]) => {
        queryClient.setQueryData<Result<PaginatedTodo, AppError> | undefined>(
          key,
          (current) =>
            optimisticUpdateList(current, (items) => {
              return [optimistic, ...items];
            }) ?? data
        );
      });

      return { previousLists };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousLists) {
        context.previousLists.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
      addToast("Failed to create todo", "error");
    },
    onSuccess: () => {
      addToast("Todo created", "success");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });
}

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



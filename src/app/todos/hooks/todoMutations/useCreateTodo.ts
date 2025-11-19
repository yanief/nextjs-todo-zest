"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoKeys } from "@/lib/query/keys";
import { todoRepository } from "@/repositories/todo.repository";
import type { AppError, PaginatedTodo, Todo, Result } from "@/types/todo";
import { useUIStore } from "@/stores/ui.store";
import { optimisticUpdateList } from "./optimisticUpdateList";
import { useI18n } from "@/i18n/I18nProvider";

export function useCreateTodo() {
  const queryClient = useQueryClient();
  const addToast = useUIStore((s) => s.addToast);
  const { t } = useI18n();

  return useMutation({
    mutationFn: (input: { title: string }) => todoRepository.create(input),
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: todoKeys.all });

      const previousLists = queryClient.getQueriesData<
        Result<PaginatedTodo, AppError>
      >({
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
            }) ?? data,
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
      addToast(
        t("Failed to create todo", {
          key: "toasts.createError",
        }),
        "error",
      );
    },
    onSuccess: () => {
      addToast(
        t("Todo created", {
          key: "toasts.createSuccess",
        }),
        "success",
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });
}

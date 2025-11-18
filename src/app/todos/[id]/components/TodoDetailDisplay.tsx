"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useI18n } from "@/i18n/I18nProvider";
import { useUIStore } from "@/stores/ui.store";
import { Todo } from "@/types/todo";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useUpdateTodoMutation } from "../../hooks/todoMutations/useUpdateTodoMutation";
import { useDeleteTodoMutation } from "../../hooks/todoMutations/useDeleteTodoMutation";
import { SaveIcon, Trash2Icon, Undo2Icon } from "lucide-react";
import clsx from "clsx";

interface FormValues {
  title: string;
}

const useTodoDetailDisplay = () => {
  const updateMutation = useUpdateTodoMutation();
  const deleteMutation = useDeleteTodoMutation();
  const router = useRouter();
  const openModal = useUIStore((s) => s.openModal);

  const backToTodoList = () => router.push("/todos");

  return {
    updateTodo: (todo: Pick<Todo, "id" | "title">) => {
      updateMutation.mutate({
        id: todo.id,
        patch: { title: todo.title.trim() },
      });
    },
    deleteTodo: (todo: Todo) => {
      deleteMutation.mutate(todo.id, {
        onSuccess: () => backToTodoList(),
      });
    },
    openModal,
    backToTodoList,
    isUpdating: updateMutation.isPending,
  };
};

export function TodoDetailDisplay({ todo }: { todo: Todo }) {
  const { updateTodo, deleteTodo, isUpdating, openModal, backToTodoList } =
    useTodoDetailDisplay();
  const { t, direction } = useI18n();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { title: todo.title },
  });

  const onSubmit = (values: FormValues) => {
    if (!values.title.trim()) return;
    updateTodo({ id: todo.id, title: values.title });
  };

  const confirmDelete = () => {
    openModal({
      title: t("todos.detail.deleteTitle"),
      description: t("todos.detail.deleteDescription"),
      confirmLabel: t("common.buttons.delete"),
      cancelLabel: t("common.buttons.cancel"),
      onConfirm: () => deleteTodo(todo),
    });
  };

  const isRtl = direction === "rtl";

  return (
    <div className="flex flex-col gap-4">
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
        aria-label={t("todos.detail.titleLabel")}
      >
        <label
          className="mb-1 block text-xs font-medium text-zinc-600 dark:text-slate-300"
          htmlFor="title"
        >
          {t("todos.detail.titleLabel")}
        </label>
        <Input
          id="title"
          aria-describedby="title-help"
          {...register("title", { required: t("todos.form.error") })}
          error={errors.title?.message}
        />
        <p
          id="title-help"
          className="mt-1 text-[11px] text-zinc-400 dark:text-slate-400"
        >
          {t("todos.detail.helper")}
        </p>
        <div className={clsx("mt-3 flex gap-2", isRtl && "flex-row-reverse")}>
          <Button type="submit" disabled={isSubmitting || isUpdating}>
            <SaveIcon className="h-[1rem]" />
            {isUpdating ? t("common.aria.loading") : t("common.buttons.save")}
          </Button>
          <Button type="button" variant="secondary" onClick={backToTodoList}>
            <Undo2Icon className="h-[1rem]" />
            {t("common.buttons.back")}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className={clsx(
              "ml-auto text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-400/10",
            )}
            onClick={confirmDelete}
          >
            <Trash2Icon className="h-[1rem]" />
            {t("common.buttons.delete")}
          </Button>
        </div>
      </form>
    </div>
  );
}

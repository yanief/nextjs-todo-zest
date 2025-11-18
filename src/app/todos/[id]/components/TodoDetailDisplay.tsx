"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useUIStore } from "@/stores/ui.store";
import { Todo } from "@/types/todo";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useUpdateTodoMutation } from "../../hooks/todoMutations/useUpdateTodoMutation";
import { useDeleteTodoMutation } from "../../hooks/todoMutations/useDeleteTodoMutation";
import { FormValues } from "./TodoDetail";
import { SaveIcon, Trash2Icon, Undo2Icon } from "lucide-react";

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
      title: "Delete todo?",
      description: "This action cannot be undone.",
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
      onConfirm: () => deleteTodo(todo),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
        aria-label="Edit todo form"
      >
        <label
          className="mb-1 block text-xs font-medium text-zinc-600"
          htmlFor="title"
        >
          Title
        </label>
        <Input
          id="title"
          aria-describedby="title-help"
          {...register("title", { required: "Title is required" })}
          error={errors.title?.message}
        />
        <p id="title-help" className="mt-1 text-[11px] text-zinc-400">
          Update the title and click save.
        </p>
        <div className="mt-3 flex gap-2">
          <Button type="submit" disabled={isSubmitting || isUpdating}>
            <SaveIcon className="h-[1rem]" />
            {isUpdating ? "Saving..." : "Save"}
          </Button>
          <Button type="button" variant="secondary" onClick={backToTodoList}>
            <Undo2Icon className="h-[1rem]" />
            Back
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="ml-auto text-red-600 hover:bg-red-50"
            onClick={confirmDelete}
          >
            <Trash2Icon className="h-[1rem]" />
            Delete
          </Button>
        </div>
      </form>
    </div>
  );
}

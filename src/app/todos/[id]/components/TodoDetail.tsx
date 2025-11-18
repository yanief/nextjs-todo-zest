"use client";

import { useForm } from "react-hook-form";
import { match } from "ts-pattern";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { useTodoDetail } from "../../hooks/useTodoDetail";
import { useUpdateTodoMutation, useDeleteTodoMutation } from "../../hooks/useTodoMutations";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/stores/ui.store";

interface TodoDetailProps {
  id: string;
}

interface FormValues {
  title: string;
}

export function TodoDetail({ id }: TodoDetailProps) {
  const { data, isLoading } = useTodoDetail(id);
  const updateMutation = useUpdateTodoMutation();
  const deleteMutation = useDeleteTodoMutation();
  const router = useRouter();
  const openModal = useUIStore((s) => s.openModal);

  const content = match(data)
    .with({ type: "success" }, ({ data: todo }) => {
      const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<FormValues>({
        defaultValues: { title: todo.title },
      });

      const onSubmit = (values: FormValues) => {
        if (!values.title.trim()) return;
        updateMutation.mutate({ id: todo.id, patch: { title: values.title.trim() } });
      };

      const confirmDelete = () => {
        openModal({
          title: "Delete todo?",
          description: "This action cannot be undone.",
          confirmLabel: "Delete",
          cancelLabel: "Cancel",
          onConfirm: () =>
            deleteMutation.mutate(todo.id, {
              onSuccess: () => router.push("/todos"),
            }),
        });
      };

      return (
        <div className="flex flex-col gap-4">
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
            aria-label="Edit todo form"
          >
            <label className="mb-1 block text-xs font-medium text-zinc-600" htmlFor="title">
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
              <Button type="submit" disabled={isSubmitting || updateMutation.isPending}>
                {updateMutation.isPending ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.push("/todos")}
              >
                Back
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="ml-auto text-red-600 hover:bg-red-50"
                onClick={confirmDelete}
              >
                Delete
              </Button>
            </div>
          </form>
        </div>
      );
    })
    .with({ type: "error" }, ({ error }) => (
      <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
        Failed to load todo: {error.message}
      </div>
    ))
    .otherwise(() => null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Spinner />
      </div>
    );
  }

  return content;
}



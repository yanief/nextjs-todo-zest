"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { FormValues } from "./TodoList";
import { useCreateTodoMutation } from "../hooks/todoMutations/useCreateTodo";

export function AddTodoForm() {
  const createMutation = useCreateTodoMutation();

  const {
    register, handleSubmit, reset, formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { title: "" },
  });

  const onSubmit = (values: FormValues) => {
    if (!values.title.trim()) return;
    createMutation.mutate({ title: values.title.trim() }, { onSuccess: () => reset() });
  };

  return (
    <form
      className="flex flex-col gap-2 sm:flex-row"
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Create todo form"
    >
      <div className="flex-1">
        <label
          className="mb-1 block text-xs font-medium text-zinc-600"
          htmlFor="title"
        >
          New Todo
        </label>
        <Input
          id="title"
          placeholder="e.g. Buy groceries"
          aria-describedby="title-help"
          {...register("title", { required: "Title is required" })}
          error={errors.title?.message} />
        <p id="title-help" className="mt-1 text-[11px] text-zinc-400">
          Press “Add” to create. Title cannot be empty.
        </p>
      </div>
      <div className="pt-5 sm:pt-7">
        <Button type="submit" disabled={isSubmitting || createMutation.isPending}>
          {createMutation.isPending ? "Adding..." : "Add"}
        </Button>
      </div>
    </form>
  );
}

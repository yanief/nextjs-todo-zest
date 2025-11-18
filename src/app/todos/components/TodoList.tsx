"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { match } from "ts-pattern";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { Skeleton } from "@/components/ui/Skeleton";
import { useListTodos } from "../hooks/useListTodos";
import { useCreateTodoMutation } from "../hooks/useTodoMutations";
import { TodoItem } from "./TodoItem";

const PAGE_SIZE = 10;

interface FormValues {
  title: string;
}

export function TodoList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page") ?? "1");
  const status = (searchParams.get("status") as "all" | "active" | "completed") ?? "all";
  const q = searchParams.get("q") ?? "";

  const { data, isLoading, isFetching } = useListTodos({
    page,
    pageSize: PAGE_SIZE,
    status,
    q,
  });

  const createMutation = useCreateTodoMutation(status, q);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { title: "" },
  });

  const onSubmit = (values: FormValues) => {
    if (!values.title.trim()) return;
    createMutation.mutate({ title: values.title.trim() }, { onSuccess: () => reset() });
  };

  const changePage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.push(`/todos?${params.toString()}`);
  };

  const content = match(data)
    .with({ type: "success" }, ({ data }) => {
      if (!data.items.length) {
        return (
          <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
            <p className="text-sm text-zinc-500">No todos yet.</p>
            <p className="text-xs text-zinc-400">Use the form above to create your first task.</p>
          </div>
        );
      }

      const totalPages = Math.max(1, Math.ceil(data.total / data.pageSize));

      return (
        <>
          <ul className="flex flex-col gap-2">
            {data.items.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
            <span>
              Page {data.page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                disabled={data.page <= 1}
                onClick={() => changePage(data.page - 1)}
              >
                Previous
              </Button>
              <Button
                type="button"
                variant="secondary"
                disabled={data.page >= totalPages}
                onClick={() => changePage(data.page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      );
    })
    .with({ type: "error" }, ({ error }) => (
      <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
        Failed to load todos: {error.message}
      </div>
    ))
    .otherwise(() => null);

  return (
    <div className="flex flex-col gap-4">
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
            error={errors.title?.message}
          />
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

      {isLoading ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={idx} className="h-10 w-full" />
          ))}
        </div>
      ) : (
        <>
          {isFetching ? (
            <div className="mb-2 flex items-center gap-2 text-xs text-zinc-400">
              <Spinner />
              <span>Updating…</span>
            </div>
          ) : null}
          {content}
        </>
      )}
    </div>
  );
}



"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useI18n } from "@/i18n/I18nProvider";
import { PlusIcon } from "lucide-react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useCreateTodo } from "../hooks/todoMutations/useCreateTodo";

interface FormValues {
  title: string;
}

export function AddTodoForm() {
  const { t, direction } = useI18n();
  const createMutation = useCreateTodo();

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
    createMutation.mutate(
      { title: values.title.trim() },
      { onSuccess: () => reset() },
    );
  };

  const isRtl = direction === "rtl";

  return (
    <form
      className={clsx(
        "flex flex-col gap-2 sm:flex-row items-start",
        isRtl && "sm:flex-row-reverse",
      )}
      onSubmit={handleSubmit(onSubmit)}
      aria-label={t("Create todo form", {
        key: "todos.form.ariaLabel",
      })}
    >
      <div className="flex-1">
        <label
          className="mb-1 block text-xs font-medium text-zinc-600 dark:text-slate-300"
          htmlFor="title"
        >
          {t("New Todo", {
            key: "todos.form.label",
          })}
        </label>
        <Input
          id="title"
          placeholder={t("e.g. Buy groceries", {
            key: "todos.form.placeholder",
          })}
          aria-describedby="title-help"
          {...register("title", {
            required: t("Title is required", {
              key: "todos.form.error",
            }),
          })}
          error={errors.title?.message}
        />
        <p
          id="title-help"
          className="mt-1 text-[11px] text-zinc-400 dark:text-slate-400"
        >
          {t("Press \u201CAdd\u201D to create. Title cannot be empty.", {
            key: "todos.form.helper",
          })}
        </p>
      </div>
      <div className={clsx(isRtl && "self-start")}>
        <div className="mb-1 block text-xs font-medium text-transparent select-none">
          &nbsp;
        </div>
        <Button
          type="submit"
          disabled={isSubmitting || createMutation.isPending}
        >
          <span className="flex items-center gap-2">
            <PlusIcon className="h-[1rem]" />
            {createMutation.isPending
              ? t("Loading", {
                  key: "common.aria.loading",
                })
              : t("Add", {
                  key: "common.buttons.add",
                })}
          </span>
        </Button>
      </div>
    </form>
  );
}

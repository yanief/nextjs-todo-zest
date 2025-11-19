"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import clsx from "clsx";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

type StatusFilter = "all" | "active" | "completed";

export function TodoFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, direction } = useI18n();

  const status = (searchParams.get("status") as StatusFilter) ?? "all";
  const q = searchParams.get("q") ?? "";

  const updateParams = useCallback(
    (
      next: Partial<{
        status: StatusFilter;
        q: string;
        page: number;
      }>,
    ) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next.status) params.set("status", next.status);
      if (next.q !== undefined) params.set("q", next.q);
      if (next.page !== undefined) params.set("page", String(next.page));
      router.push(`/todos?${params.toString()}`);
    },
    [router, searchParams],
  );

  const isRtl = direction === "rtl";

  return (
    <div
      className={clsx(
        "flex flex-col gap-3 sm:flex-row items-start",
        isRtl && "sm:flex-row-reverse",
      )}
    >
      <div className="flex-1 w-full">
        <label
          className="mb-1 block text-xs font-medium text-zinc-600 dark:text-slate-300"
          htmlFor="search"
        >
          {t("Search", {
            key: "todos.filters.searchLabel",
          })}
        </label>
        <Input
          id="search"
          placeholder={t("Search todos...", {
            key: "todos.filters.searchPlaceholder",
          })}
          defaultValue={q}
          aria-describedby="search-help"
          onChange={(e) => updateParams({ q: e.target.value, page: 1 })}
        />
        <p
          id="search-help"
          className="mt-1 text-[11px] text-zinc-400 dark:text-slate-400"
        >
          {t("Filter by title. Updates results instantly.", {
            key: "todos.filters.searchHelp",
          })}
        </p>
      </div>
      <div className="w-full sm:w-40">
        <label
          className="mb-1 block text-xs font-medium text-zinc-600 dark:text-slate-300"
          htmlFor="status"
        >
          {t("Status", {
            key: "todos.filters.statusLabel",
          })}
        </label>
        <Select
          id="status"
          value={status}
          aria-label={t("Status", {
            key: "todos.filters.statusLabel",
          })}
          onChange={(e) =>
            updateParams({ status: e.target.value as StatusFilter, page: 1 })
          }
        >
          <option value="all">
            {t("All", {
              key: "todos.filters.options.all",
            })}
          </option>
          <option value="active">
            {t("Active", {
              key: "todos.filters.options.active",
            })}
          </option>
          <option value="completed">
            {t("Completed", {
              key: "todos.filters.options.completed",
            })}
          </option>
        </Select>
      </div>
    </div>
  );
}

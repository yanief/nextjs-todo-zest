"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

type StatusFilter = "all" | "active" | "completed";

interface TodoFiltersProps {
  pageSize: number;
}

export function TodoFilters({ pageSize }: TodoFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = (searchParams.get("status") as StatusFilter) ?? "all";
  const q = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? "1");

  const updateParams = useCallback(
    (next: Partial<{ status: StatusFilter; q: string; page: number }>) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next.status) params.set("status", next.status);
      if (next.q !== undefined) params.set("q", next.q);
      if (next.page !== undefined) params.set("page", String(next.page));
      router.push(`/todos?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex-1">
        <label className="mb-1 block text-xs font-medium text-zinc-600" htmlFor="search">
          Search
        </label>
        <Input
          id="search"
          placeholder="Search todos..."
          defaultValue={q}
          aria-describedby="search-help"
          onChange={(e) => updateParams({ q: e.target.value, page: 1 })}
        />
        <p id="search-help" className="mt-1 text-[11px] text-zinc-400">
          Filter by title. Updates results instantly.
        </p>
      </div>
      <div className="w-full sm:w-40">
        <label className="mb-1 block text-xs font-medium text-zinc-600" htmlFor="status">
          Status
        </label>
        <Select
          id="status"
          value={status}
          aria-label="Filter todos by status"
          onChange={(e) => updateParams({ status: e.target.value as StatusFilter, page: 1 })}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </Select>
      </div>
    </div>
  );
}



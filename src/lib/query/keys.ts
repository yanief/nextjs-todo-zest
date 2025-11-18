import type { Todo } from "@/types/todo";

export const todoKeys = {
  all: ["todos"] as const,
  list: (params: {
    page: number;
    pageSize: number;
    status: "all" | "active" | "completed";
    q?: string;
  }) => [...todoKeys.all, "list", params] as const,
  detail: (id: Todo["id"]) => [...todoKeys.all, "detail", id] as const,
};

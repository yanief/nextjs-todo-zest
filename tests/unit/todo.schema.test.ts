import { describe, it, expect } from "vitest";
import { PaginatedTodoSchema, TodoSchema } from "@/types/todo";

describe("TodoSchema", () => {
  it("accepts valid todo", () => {
    const result = TodoSchema.safeParse({
      id: "1",
      title: "Test",
      completed: false,
      createdAt: Date.now(),
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid todo", () => {
    const result = TodoSchema.safeParse({
      id: 123,
      title: "",
      completed: false,
      createdAt: "yesterday",
    });
    expect(result.success).toBe(false);
  });
});

describe("PaginatedTodoSchema", () => {
  it("validates paginated payload", () => {
    const result = PaginatedTodoSchema.safeParse({
      items: [
        {
          id: "1",
          title: "A",
          completed: false,
          createdAt: Date.now(),
        },
      ],
      total: 1,
      page: 1,
      pageSize: 10,
    });
    expect(result.success).toBe(true);
  });
});

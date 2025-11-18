import { describe, it, expect, beforeEach } from "vitest";
import { todoRepository } from "@/repositories/todo.repository";

describe("todoRepository", () => {
  beforeEach(() => {
    if (typeof window !== "undefined") {
      window.localStorage.clear();
    }
  });

  it("creates and lists todos", async () => {
    const created = await todoRepository.create({ title: "My Todo" });
    expect(created.type).toBe("success");
    if (created.type !== "success") return;

    const listed = await todoRepository.list({
      page: 1,
      pageSize: 10,
      status: "all",
    });

    expect(listed.type).toBe("success");
    if (listed.type !== "success") return;
    expect(listed.data.items[0].title).toBe("My Todo");
  });
});



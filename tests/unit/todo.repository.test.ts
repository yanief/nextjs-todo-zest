import { describe, it, expect, beforeEach } from "vitest";
import { todoRepository } from "@/repositories/todo.repository";
import type { Todo } from "@/types/todo";

async function seedTodos(titles: string[]) {
  const created: Todo[] = [];
  for (const title of titles) {
    const result = await todoRepository.create({ title });
    if (result.type === "success") {
      created.push(result.data);
    }
  }
  return created;
}

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

  it("applies status and search filters", async () => {
    const [first, second] = await seedTodos(["Alpha Task", "Beta Task"]);
    await todoRepository.update(second.id, { completed: true });

    const active = await todoRepository.list({
      page: 1,
      pageSize: 10,
      status: "active",
    });
    expect(active.type).toBe("success");
    if (active.type === "success") {
      expect(active.data.items).toHaveLength(1);
      expect(active.data.items[0].id).toBe(first.id);
    }

    const completed = await todoRepository.list({
      page: 1,
      pageSize: 10,
      status: "completed",
      q: "beta",
    });
    expect(completed.type).toBe("success");
    if (completed.type === "success") {
      expect(completed.data.items).toHaveLength(1);
      expect(completed.data.items[0].id).toBe(second.id);
    }
  });

  it("supports pagination", async () => {
    await seedTodos(["One", "Two", "Three"]);
    const page2 = await todoRepository.list({
      page: 2,
      pageSize: 2,
      status: "all",
    });
    expect(page2.type).toBe("success");
    if (page2.type === "success") {
      expect(page2.data.page).toBe(2);
      expect(page2.data.items).toHaveLength(1);
      expect(page2.data.total).toBe(3);
    }
  });

  it("updates an existing todo", async () => {
    const [todo] = await seedTodos(["Original"]);
    const updated = await todoRepository.update(todo.id, {
      title: "Updated Title",
    });
    expect(updated.type).toBe("success");
    if (updated.type === "success") {
      expect(updated.data.title).toBe("Updated Title");
    }
  });

  it("returns error when updating missing todo", async () => {
    const result = await todoRepository.update("missing", { title: "Nope" });
    expect(result.type).toBe("error");
    if (result.type === "error") {
      expect(result.error.type).toBe("NotFoundError");
    }
  });

  it("deletes todos", async () => {
    const [todo] = await seedTodos(["Temp"]);
    const deleted = await todoRepository.delete(todo.id);
    expect(deleted.type).toBe("success");

    const list = await todoRepository.list({
      page: 1,
      pageSize: 10,
      status: "all",
    });
    expect(list.type).toBe("success");
    if (list.type === "success") {
      expect(
        list.data.items.find((item) => item.id === todo.id),
      ).toBeUndefined();
    }
  });
});

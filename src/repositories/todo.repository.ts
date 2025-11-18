import { readFromStorage, writeToStorage } from "@/lib/storage/localStorageClient";
import { PaginatedTodoSchema, Result, Todo, TodoSchema, type AppError } from "@/types/todo";
import { z } from "zod";

const STORAGE_ARRAY_SCHEMA = z.array(TodoSchema);

type StatusFilter = "all" | "active" | "completed";

function createError(type: AppError["type"], message: string): AppError {
  return { type, message };
}

async function getAllTodos(): Promise<Result<Todo[], AppError>> {
  try {
    const raw = await readFromStorage();
    if (!raw) {
      return { type: "success", data: [] };
    }
    const decoded = STORAGE_ARRAY_SCHEMA.safeParse(raw);
    if (!decoded.success) {
      return { type: "error", error: createError("DecodeError", "Failed to decode todos from storage") };
    }
    return { type: "success", data: decoded.data };
  } catch {
    return { type: "error", error: createError("StorageError", "Failed to read from storage") };
  }
}

async function saveAllTodos(todos: Todo[]): Promise<Result<null, AppError>> {
  try {
    await writeToStorage(todos);
    return { type: "success", data: null };
  } catch {
    return { type: "error", error: createError("StorageError", "Failed to write to storage") };
  }
}

function applyStatusFilter(todos: Todo[], status: StatusFilter) {
  switch (status) {
    case "active":
      return todos.filter((t) => !t.completed);
    case "completed":
      return todos.filter((t) => t.completed);
    case "all":
    default:
      return todos;
  }
}

export interface TodoRepository {
  list(params: {
    page: number;
    pageSize: number;
    status: StatusFilter;
    q?: string;
  }): Promise<Result<z.infer<typeof PaginatedTodoSchema>, AppError>>;

  get(id: string): Promise<Result<Todo, AppError>>;
  create(input: { title: string }): Promise<Result<Todo, AppError>>;
  update(id: string, patch: Partial<Todo>): Promise<Result<Todo, AppError>>;
  delete(id: string): Promise<Result<null, AppError>>;
}

export const todoRepository: TodoRepository = {
  async list({ page, pageSize, status, q }) {
    const allResult = await getAllTodos();
    if (allResult.type === "error") return allResult;

    let items = allResult.data;
    if (q) {
      const lower = q.toLowerCase();
      items = items.filter((t) => t.title.toLowerCase().includes(lower));
    }
    items = applyStatusFilter(items, status);

    const total = items.length;
    const start = (page - 1) * pageSize;
    const pagedItems = items.slice(start, start + pageSize);

    const paginated = {
      items: pagedItems,
      total,
      page,
      pageSize,
    };

    const decoded = PaginatedTodoSchema.safeParse(paginated);
    if (!decoded.success) {
      return { type: "error", error: createError("DecodeError", "Failed to decode paginated todos") };
    }

    return { type: "success", data: decoded.data };
  },

  async get(id) {
    const allResult = await getAllTodos();
    if (allResult.type === "error") return allResult;
    const todo = allResult.data.find((t) => t.id === id);
    if (!todo) {
      return { type: "error", error: createError("NotFoundError", "Todo not found") };
    }
    const decoded = TodoSchema.safeParse(todo);
    if (!decoded.success) {
      return { type: "error", error: createError("DecodeError", "Failed to decode todo") };
    }
    return { type: "success", data: decoded.data };
  },

  async create({ title }) {
    const allResult = await getAllTodos();
    if (allResult.type === "error") return allResult;
    const now = Date.now();
    const todo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: now,
    };
    const todos = [...allResult.data, todo];
    const saveResult = await saveAllTodos(todos);
    if (saveResult.type === "error") return saveResult;
    return { type: "success", data: todo };
  },

  async update(id, patch) {
    const allResult = await getAllTodos();
    if (allResult.type === "error") return allResult;
    const idx = allResult.data.findIndex((t) => t.id === id);
    if (idx === -1) {
      return { type: "error", error: createError("NotFoundError", "Todo not found") };
    }
    const updated: Todo = { ...allResult.data[idx], ...patch };
    const todos = [...allResult.data];
    todos[idx] = updated;
    const saveResult = await saveAllTodos(todos);
    if (saveResult.type === "error") return saveResult;
    return { type: "success", data: updated };
  },

  async delete(id) {
    const allResult = await getAllTodos();
    if (allResult.type === "error") return allResult;
    const todos = allResult.data.filter((t) => t.id !== id);
    const saveResult = await saveAllTodos(todos);
    if (saveResult.type === "error") return saveResult;
    return { type: "success", data: null };
  },
};



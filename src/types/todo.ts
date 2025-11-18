import { z } from "zod";

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  completed: z.boolean().default(false),
  createdAt: z.number(),
});

export type Todo = z.infer<typeof TodoSchema>;

export const PaginatedTodoSchema = z.object({
  items: z.array(TodoSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export type PaginatedTodo = z.infer<typeof PaginatedTodoSchema>;

export type AppErrorType = "DecodeError" | "NotFoundError" | "StorageError";

export interface AppError {
  type: AppErrorType;
  message: string;
}

export type Result<T, E> =
  | { type: "success"; data: T }
  | { type: "error"; error: E };

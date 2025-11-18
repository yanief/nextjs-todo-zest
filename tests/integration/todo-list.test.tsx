import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoList } from "@/app/todos/components/TodoList";
import { todoRepository } from "@/repositories/todo.repository";
import { renderWithQueryClient } from "../utils/renderWithQueryClient";

const push = vi.fn();
let currentSearchParams = new URLSearchParams();

function setMockSearchParams(
  params: Record<string, string | number | undefined>,
) {
  currentSearchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      currentSearchParams.set(key, String(value));
    }
  });
}

function resetNavigationMocks() {
  push.mockReset();
  currentSearchParams = new URLSearchParams();
}

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => currentSearchParams,
}));

const baseResponse = {
  type: "success" as const,
  data: {
    items: [
      {
        id: "1",
        title: "Plan sprint",
        completed: false,
        createdAt: Date.now(),
      },
      { id: "2", title: "Ship app", completed: true, createdAt: Date.now() },
    ],
    total: 20,
    page: 1,
    pageSize: 10,
  },
};

describe("TodoList integration", () => {
  let listSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    resetNavigationMocks();
    setMockSearchParams({ page: 1, status: "all" });
    listSpy = vi.spyOn(todoRepository, "list").mockResolvedValue(baseResponse);
  });

  afterEach(() => {
    listSpy.mockRestore();
  });

  it("renders todos and pagination info", async () => {
    renderWithQueryClient(<TodoList />);

    expect(await screen.findByText("Plan sprint")).toBeInTheDocument();
    expect(screen.getByText(/Page 1 of 2/)).toBeInTheDocument();
  });

  it("navigates to next page", async () => {
    renderWithQueryClient(<TodoList />);
    await waitFor(() => screen.getByText("Plan sprint"));

    const nextButton = screen.getByRole("button", { name: "Next" });
    await userEvent.click(nextButton);

    expect(push).toHaveBeenCalled();
  });

  it("shows an error boundary message", async () => {
    listSpy.mockResolvedValueOnce({
      type: "error",
      error: { type: "StorageError", message: "boom" },
    });
    renderWithQueryClient(<TodoList />);

    expect(await screen.findByText(/Failed to load todos/)).toBeInTheDocument();
  });
});

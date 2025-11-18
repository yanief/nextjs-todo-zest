import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoDetailDisplay } from "@/app/todos/[id]/components/TodoDetailDisplay";
import { render } from "@testing-library/react";

const push = vi.fn();
const mutateUpdate = vi.fn();
const mutateDelete = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

vi.mock("@/app/todos/hooks/todoMutations/useUpdateTodoMutation", () => ({
  useUpdateTodoMutation: () => ({
    mutate: mutateUpdate,
    isPending: false,
  }),
}));

vi.mock("@/app/todos/hooks/todoMutations/useDeleteTodoMutation", () => ({
  useDeleteTodoMutation: () => ({
    mutate: mutateDelete,
    isPending: false,
  }),
}));

describe("TodoDetailDisplay integration", () => {
  beforeEach(() => {
    mutateUpdate.mockClear();
    mutateDelete.mockClear();
    push.mockClear();
  });

  it("submits updates with the latest title", async () => {
    render(
      <TodoDetailDisplay
        todo={{
          id: "1",
          title: "Deep dive",
          completed: false,
          createdAt: Date.now(),
        }}
      />,
    );

    const input = screen.getByDisplayValue("Deep dive");
    await userEvent.clear(input);
    await userEvent.type(input, "Refined plan");

    const saveButton = screen.getByRole("button", { name: "Save" });
    await userEvent.click(saveButton);

    expect(mutateUpdate).toHaveBeenCalledWith({
      id: "1",
      patch: { title: "Refined plan" },
    });
  });
});

import { describe, it, expect } from "vitest";
import { getTotalPages, paginate } from "@/lib/utils/pagination";

describe("paginate", () => {
  it("slices arrays according to page and size", () => {
    const result = paginate([1, 2, 3, 4], { page: 2, pageSize: 2 });
    expect(result.items).toEqual([3, 4]);
    expect(result.total).toBe(4);
    expect(result.page).toBe(2);
  });

  it("clamps to minimum page 1", () => {
    const result = paginate([1], { page: 0, pageSize: 1 });
    expect(result.page).toBe(1);
    expect(result.items).toEqual([1]);
  });
});

describe("getTotalPages", () => {
  it("returns 0 when page size invalid", () => {
    expect(getTotalPages(10, 0)).toBe(0);
  });

  it("calculates minimum of 1 page", () => {
    expect(getTotalPages(1, 10)).toBe(1);
    expect(getTotalPages(11, 10)).toBe(2);
  });
});

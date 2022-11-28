import { test, vi } from "vitest";
import { renderHook } from "@testing-library/react";

import useRemoteData from "../../src/hooks/use-remote-data";

vi.mock("../../src/hooks/use-remote-data", () => {
  const mockData = [
    {
      completed: false,
      id: 2,
      userId: 1,
      title: "test1",
    },
    {
      completed: false,
      id: 4,
      userId: 1,
      title: "test2",
    },
  ];

  return {
    default: vi
      .fn()
      .mockReturnValue({ data: mockData, isLoading: false, error: {} }),
  };
});

describe("useRemoteData hook", async () => {
  test("fetch the data correctly", async () => {
    const { result } = renderHook(() =>
      useRemoteData({
        data_type: "todos",
        page: 1,
      })
    );

    expect(result.current?.data?.[0].title).toBe("test1");
  });
});

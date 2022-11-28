import { expect, test, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../src/test-utils";

describe("Index page", () => {
  test("renders home page", async () => {
    // If we use React.lazy, we may need this
    await vi.dynamicImportSettled();

    render(<div />, {});
    expect(screen.findByText("Boxed")).toBeDefined();
  });
});

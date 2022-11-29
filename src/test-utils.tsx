// This is only for testing purpose. You should always use render method here in your test files.
import React from "react";
import { MantineProvider } from "@mantine/core";
import { render, renderHook, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";

import DashboardRoute from "./features/dashboard/dashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

interface TestProps {
  children?: React.ReactNode;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardRoute />,
  },
]);

export const lightWrapper: React.FC<TestProps> = ({ children }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MantineProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: lightWrapper, ...options });

const customRenderHook = (ui: RenderHook, options?: RenderHookOptions) =>
  renderHook(ui, { wrapper: lightWrapper, ...options });

type DefaultHookParams = Parameters<typeof renderHook>;
type RenderHook = DefaultHookParams[0];
type RenderHookOptions = DefaultHookParams[1];

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render, customRenderHook as renderHook };

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import { ThemeProvider } from "./theme-provider";
import DashboardRoute from "./features/dashboard/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardRoute />,
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

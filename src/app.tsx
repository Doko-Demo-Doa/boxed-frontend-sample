import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "./theme-provider";
import DashboardRoute from "./routes/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardRoute />,
  },
]);

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

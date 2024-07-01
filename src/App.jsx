import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./pages/Error";
import { HomePage } from "./pages/Home";
import { RootLayout } from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [{ path: "/", element: <HomePage /> }],
  },
]);

export const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

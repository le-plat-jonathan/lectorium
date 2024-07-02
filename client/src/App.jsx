import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";
import AccountPage from "./pages/Account";
import { ErrorPage } from "./pages/Error";
import { HomePage } from "./pages/Home";
import { LoginFormPage } from "./pages/LoginForm";
import { RootLayout } from "./pages/Root";
import { SignupForm } from "./pages/SignupForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "auth/login", element: <LoginFormPage /> },
      { path: "auth/signup", element: <SignupForm /> },
    ],
  },
  ,
  {
    path: "/user",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    // loader: checkAuthLoader,
    children: [{ path: "", element: <AccountPage /> }],
  },
]);

export const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>;
    </AuthProvider>
  );
};

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";
import AccountPage from "./pages/Account";
import { ErrorPage } from "./pages/Error";
import { HomePage } from "./pages/Home";
import { LoginFormPage } from "./pages/LoginForm";
import { RootLayout } from "./pages/Root";
import { SignupForm } from "./pages/SignupForm";
import Librairie from "./pages/Librairie";
import { CartProvider } from "./context/cartContext";
import { CreateBookPage } from "@/pages/createBookPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "auth/login", element: <LoginFormPage /> },
      { path: "auth/signup", element: <SignupForm /> },
      { path: "librairie", element: <Librairie /> },
      { path: "createBook", element: <CreateBookPage /> },
    ],
  },
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
    <CartProvider>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </CartProvider>
  );
};

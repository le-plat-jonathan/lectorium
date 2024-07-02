import { createBrowserRouter, RouterProvider } from "react-router-dom";
<<<<<<< HEAD
import { AuthProvider } from "./context/auth.context";
import AccountPage from "./pages/Account";
import { ErrorPage } from "./pages/Error";
import { HomePage } from "./pages/Home";
import { LoginFormPage } from "./pages/LoginForm";
import { RootLayout } from "./pages/Root";
import { SignupForm } from "./pages/SignupForm";
=======
import { ErrorPage } from "./pages/Error";
import { HomePage } from "./pages/Home";
import { RootLayout } from "./pages/Root";
>>>>>>> john

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
<<<<<<< HEAD
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
=======
    children: [{ path: "/", element: <HomePage /> }],
>>>>>>> john
  },
]);

export const App = () => {
<<<<<<< HEAD
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>;
    </AuthProvider>
  );
=======
  return <RouterProvider router={router}></RouterProvider>;
>>>>>>> john
};

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/index/App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignInPage } from "./routes/signIn/SignIn.page.tsx";
import { SignUpPage } from "./routes/signUp/SignUp.page.tsx";
import { ErrorPage } from "./routes/Error.page.tsx";
import { GlobalProvider } from "./components/shared/GlobalContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/signIn",
    element: <SignInPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signUp",
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>
);

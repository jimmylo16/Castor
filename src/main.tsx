import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/index/App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignInPage } from "./routes/signIn/SignIn.page.tsx";
import { SignUpPage } from "./routes/signUp/SignUp.page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [],
  },
  {
    path: "/signIn",
    element: <SignInPage />,
  },
  {
    path: "/signUp",
    element: <SignUpPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
